<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="逾期天数:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="overdueDaysLt">
                  <Input size="small" clearable v-model.trim="formItem.overdueDaysLt"></Input>
                </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" d :lg="2" span="2">
                <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="overdueDaysBt">
                  <Input size="small" clearable v-model.trim="formItem.overdueDaysBt"></Input>
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="生成日期:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.createDate"
                format="yyyy-MM-dd"
                type="date"
                placement="bottom-start"
                placeholder="请选择日期"
                @on-change="changeDate"
                @on-ok="changeDate"
                @on-clear="clearDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
                :loading="query_loading"
              >
                <span v-if="!query_loading">检索</span>
                <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="exportData"
          v-if="export_case"
          :loading="export_case_loading"
        >
          <span v-if="!export_case_loading">导出数据</span>
          <span v-else>导出中...</span>
        </Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table border :data="tableData" :columns="tableColumns" stripe class="tableBox"></Table>
        <!-- 分页 -->
        <div class="vue-panel-page">
          <div style="float: right;">
            <Page
              :total="total"
              show-total
              size="small"
              :page-size-opts="[10, 20, 50, 100]"
              show-elevator
              show-sizer
              :page-size="pageSize"
              :current="pageNo"
              @on-page-size-change="changeSize"
              @on-change="changePage"
            ></Page>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import sysDictionary from "@/mixin/sysDictionary";
import formValidateFun from "@/mixin/formValidateFun";
import util from "@/libs/util";
import {
  monitor_overdueReports_list,
  monitor_overDueReports_exportDown
} from "@/service/getData";
export default {
  name: "overduePayment",
  mixins: [sysDictionary, formValidateFun],
  data() {
    var alignCenter = "center";
    var widthVal = 140;
    var widthMidVal = 100;
    return {
      showPanel: false,
      showPanel2: false,
      export_case: false, //导出权限
      query: false, //查询权限
      query_loading: false, //查询按钮loading
      export_case_loading: false, //导出按钮loading
      formItem: {
        createDate: "", //默认获取当前的日期时间需要进行转换
        overdueDaysLt: "",
        overdueDaysBt: ""
      },
      ruleValidate: {
        overdueDaysLt: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            trigger: "blur"
          },
          {
            validator: this.validate_yqts_start_two,
            trigger: "blur"
          }
        ],
        overdueDaysBt: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            trigger: "blur"
          },
          {
            validator: this.validate_yqts_end_two,
            trigger: "blur"
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          searchOperator: "=",
          align: alignCenter,
          key: "listIndex",
          fixed: "left"
        },
        {
          title: "案件编码",
          searchOperator: "=",
          key: "caseNo",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "案件状态",
          searchOperator: "=",
          key: "caseHandleStatus",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "产品线",
          searchOperator: "like",
          key: "prdTyp",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "账单号",
          key: "billNo",
          className: "tableMainW",
          align: alignCenter,
          width: 250
        },
        {
          title: "信用级别",
          searchOperator: "like",
          key: "creditLevel",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "申请日期",
          searchOperator: "like",
          key: "billRegDt",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "放款日期",
          searchOperator: "like",
          key: "ordSuccDt",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "逾期触发次数",
          searchOperator: "like",
          key: "overdueTotalCount",
          className: "caseCount",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "逾期累计天数",
          searchOperator: "like",
          key: "overdueTotalDays",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "分期期数",
          searchOperator: "like",
          key: "perdCnt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "未还期数",
          searchOperator: "like",
          key: "waitPerdNum",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "银行卡号",
          searchOperator: "like",
          key: "cardNoHid",
          className: "tableMainW",
          align: alignCenter,
          width: 150
        },
        {
          title: "银行名称",
          searchOperator: "like",
          key: "corpOrgNm",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "借款本金",
          searchOperator: "like",
          key: "billPrcpAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "订单总金额",
          searchOperator: "like",
          key: "billTotAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "每期应还本金",
          searchOperator: "like",
          key: "perdPrcpAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "服务费",
          searchOperator: "like",
          key: "billSerAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "利息",
          searchOperator: "like",
          key: "billItrtAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "每期应还总金额",
          searchOperator: "=",
          key: "perdTotAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "账单类型",
          searchOperator: "=",
          key: "billSts",
          className: "caseHandleStatus",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "用户身份证号",
          searchOperator: "like",
          key: "idNoHid",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "用户名",
          key: "usrNm",
          className: "",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "用户ID",
          searchOperator: "like",
          key: "usrId",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "用户手机号",
          searchOperator: "like",
          key: "mblNoHid",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "紧急联系人姓名",
          searchOperator: "like",
          key: "cntUsrNm",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "与用户的关系",
          searchOperator: "like",
          key: "cntRelTyp",
          className: "caseCount",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "紧急联系人手机号",
          searchOperator: "like",
          key: "cntMblNo",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "年龄",
          searchOperator: "like",
          key: "usrBirthDt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "性别",
          searchOperator: "like",
          key: "usrGender",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "户籍地址",
          searchOperator: "like",
          key: "idDtlAddr",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "逾期状态",
          searchOperator: "like",
          key: "billOvdtSts",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "实际还款时间",
          searchOperator: "like",
          key: "perpRepayDt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "当前逾期期数",
          searchOperator: "like",
          key: "perdNum",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "应还日期",
          searchOperator: "like",
          key: "perdDueDt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "逾期日期",
          searchOperator: "like",
          key: "perdOutDueDt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "逾期期数",
          searchOperator: "like",
          key: "perdAllNum",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "实际还款金额",
          searchOperator: "like",
          key: "perdTotRep",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "减免金额",
          searchOperator: "like",
          key: "drtFineAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "实收利息",
          searchOperator: "like",
          key: "perdItrtRep",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "实收罚息",
          searchOperator: "like",
          key: "perdFineRep",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "逾期天数",
          searchOperator: "like",
          key: "overdueDays",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "剩余本金",
          searchOperator: "like",
          key: "billRemainPrcpAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "放款次数",
          searchOperator: "like",
          key: "ordSuccCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "经办人",
          searchOperator: "like",
          key: "opUserName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let overdue_payment_form = window.sessionStorage.getItem('overdue_payment_form');
    if (overdue_payment_form) {
      this.formItem = JSON.parse(overdue_payment_form);
    }
    var createT = new Date();
    this.formItem.createDate = this.$options.filters["formatDate"](
      createT,
      "YYYY-MM-DD"
    );
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== "03") {
        return;
      }
      switch (item.url) {
        case "query":
          this.query = true;
          break;
        case "export":
          this.export_case = true;
          break;
      }
    });
    // this.getList();
  },
  methods: {
    //清空时间日期
    clearDate() {
      this.formItem.createDate = "";
      console.log(this.formItem.createDate);
    },
    // 改变日期区间的格式之后进行处理
    changeDate(val1, val2) {
      this.formItem.createDate = val1;
      this.pageNo = 1;
      // 日期格式单天和时间区间之间的差别在于range这里拿到的是一个长度唯二的数组，而单日侧直接是一个结果值
    },
    // 页码改变的回调
    changePage(pageNo) {
      //默认带入一个参数是当前的页码数
      console.log(pageNo, "当前的页码数量值");
      this.pageNo = pageNo;
      this.getList();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    handleSubmit(name) {
      window.sessionStorage.setItem('overdue_payment_form', JSON.stringify(this.formItem));
      this.pageNo = 1;
      this.getList();
    },
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info("当前无数据，无法导出");
        return;
      }
      this.export_case_loading = true;
      if (this.formItem.createDate) {
        this.formItem.createDate = this.$options.filters["formatDate"](
          this.formItem.createDate,
          "YYYY-MM-DD"
        );
      }
      let res = await monitor_overDueReports_exportDown(
        {
          ...this.formItem
        },
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      util.dowloadfile("逾期日报", res);
      this.export_case_loading = false;
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      this.query_loading = true;
      if (this.formItem.createDate) {
        this.formItem.createDate = this.$options.filters["formatDate"](
          this.formItem.createDate,
          "YYYY-MM-DD"
        );
      }
      let res = await monitor_overdueReports_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      });
      this.query_loading = false;
      if (res && res.code === 1) {
        let data = res.data;
        this.tableData = data.content;
        this.total = data.totalElements; //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      window.sessionStorage.removeItem('overdue_payment_form');
      this.formItem.createDate = this.$options.filters["formatDate"](
        new Date(),
        "YYYY-MM-DD"
      );
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less">
</style>
