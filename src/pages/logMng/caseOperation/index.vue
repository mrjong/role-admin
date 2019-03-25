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
            <FormItem label="案件编号:">
              <Input size="small" clearable v-model.trim="formItem.caseNo" placeholder="请输入案件编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="操作类型:">
              <Select size="small" filterable clearable v-model="formItem.operType" placeholder="请选择操作类型">
                <Option
                  v-for="item in getDirObj.CASE_OPER_TYPE"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="操作时间:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.dateRange"
                format="yyyy-MM-dd"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择操作时间"
                @on-change="changeDate"
                @on-ok="changeDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="操作人IP:">
              <Input size="small" clearable v-model="formItem.operIp" placeholder="请输入操作人IP"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
                :loading="queryLoading"
              >
                <span v-if="!queryLoading">检索</span>
                <span v-else>检索...</span>
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
        <Modal v-model="modalSee" title="案件日志" class-name="role-modal" width="700px">
          <Card class="vue-panel panel_list" :dis-hover="true" style="border: none">
            <Form
              v-if="!showPanel"
              ref="formValidate"
              :model="formValidate"
              :label-width="90"
              :rules="ruleValidate"
            >
              <Row class="eachRow">
                <Col span="12">
                  <FormItem label="案件编号:">
                    <span class="desc-label-item">{{formValidateInfo.caseNo}}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="操作类型:">
                    <span class="desc-label-item">{{formValidateInfo.operTypeName}}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                  <FormItem label="操作描述:">
                    <span class="desc-label-item">{{formValidateInfo.operRemark}}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="操作人ID:">
                    <span class="desc-label-item">{{formValidateInfo.operUser}}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                  <FormItem label="操作人名称:">
                    <span class="desc-label-item">{{formValidateInfo.operName}}</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="操作时间:">
                    <span class="desc-label-item">{{formValidateInfo.operTime}}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                  <FormItem span="6" prop="mblNo" label="操作人IP:">
                    <span class="desc-label-item">{{formValidateInfo.operIp}}</span>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <div slot="footer">
            <Button size="small" @click="closeModal('1')">关闭</Button>
          </div>
        </Modal>
      </div>
    </Card>
  </div>
</template>
<script>
import { cases_operationList, cases_operationDetail } from "@/service/getData";
import sysDictionary from "@/mixin/sysDictionary";
import util from "@/libs/util";
export default {
  name: "caseOperation",
  mixins: [sysDictionary],
  data() {
    var alignCenter = "center";
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      showPanel: false,
      showPanel2: false,
      operTime: [],
      getDirList: ["CASE_OPER_TYPE"],
      getDirObj: {},
      modalSee: false,
      query: false,//查询权限
      detail: false,//查看权限
      queryLoading: false, //查询按钮loading
      formItem: {},
      ruleValidate: {},
      formValidate: {},
      formValidateInfo: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableColumns: [
        {
          title: "案件编号",
          align: alignCenter,
          width: widthVal,
          key: "caseNo"
        },
        {
          title: "枚举类型",
          key: "operTypeName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "操作描述",
          searchOperator: "=",
          key: "operRemark",
          className: "tableMainW",
          align: alignCenter,
          width: 250
        },
        {
          title: "操作人ID",
          searchOperator: "like",
          key: "operUser",
          className: "tableMainW",
          align: alignCenter,
          width: 250
        },
        {
          title: "操作人名称",
          key: "operName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "操作时间",
          searchOperator: "like",
          key: "operTime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let remarkDate = params.row.operTime;
            remarkDate = remarkDate
              ? this.$options.filters["formatDate"](
                  remarkDate,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : remarkDate;
            return h("span", remarkDate);
          }
        },
        {
          title: "操作人IP",
          searchOperator: "like",
          key: "operIp",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "操作",
          key: "edit",
          width: 180,
          fixed: "left",
          align: "center",
          render: (h, params) => {
            const obj = params.row;
            return h("div", [
              this.detail?h(
                "a",
                {
                  props: {},
                  on: {
                    click: () => {
                      this.handleDetail(obj);
                    }
                  }
                },
                "查看"
              ): h('span','无')
            ]);
          }
        }
      ]
    };
  },
  created() {
    let log_case_operation_form = window.sessionStorage.getItem('log_case_operation_form');
    if (log_case_operation_form) {
      this.formItem = JSON.parse(log_case_operation_form);
    }
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        case "detail": this.detail = true;
          break;
      }
    });
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val1) {
      this.formItem.beginOperDate = val1[0];
      this.formItem.endOperDate = val1[1];
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
      if (this.formItem.dateRange) {
        this.formItem.dateRange = [
          this.formItem.beginOperDate,
          this.formItem.endOperDate
        ]
      }
      window.sessionStorage.setItem('log_case_operation_form', JSON.stringify(this.formItem));
      this.pageNo = 1;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      };
      this.queryLoading = true;
      let res = await cases_operationList({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      });
      this.queryLoading = false;
      console.log(res);
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
      window.sessionStorage.removeItem('log_case_operation_form');
      this.$refs[name].resetFields();
    },
    //查看详情
    handleDetail(obj) {
      this.formValidateInfo = obj;
      this.formValidateInfo.operTime = this.$options.filters["formatDate"](
        this.formValidateInfo.operTime,
        "YYYY-MM-DD HH:mm:ss"
      );
      this.modalSee = true;
    },
    closeModal() {
      this.modalSee = false;
    }
  }
};
</script>
<style lang="less" scoped>
.role-modal .ivu-form-item-label {
  color: #000;
  font-weight: 500;
}
.desc-label-item {
  vertical-align: middle;
  line-height: 38px;
}
</style>
