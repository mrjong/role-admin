<template>
  <div class="panel_list">
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="exportData"
        >导出数据</Button>
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
import {
  monitor_collectRate_list,
  monitor_collectRate_exportDown
} from "@/service/getData";
import util from "@/libs/util";
export default {
  name: "overduePayment",
  //mixins: [sysDictionary, formValidateFun],
  data() {
    var alignCenter = "center";
    var widthVal = 140;
    var widthMidVal = 100;
    return {
      showPanel: false,
      showPanel2: false,
      modal12: false,
      inputGrid: "",
      modal11: false,
      formItem: {
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
            validator: this.validate_yqts_start,
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
            validator: this.validate_yqts_end,
            trigger: "blur"
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 10,
      tableData: [
        // {
        //   upRoleName:'',//所属组别 upUserName
        //   opUserName: '', //处理人
        //   allotCaseCount:'', // 当月分配案件数量
        //   repayCount:'', //当月还款笔数
        //   repayCountRate:'',// 当月笔数回收率  %
        //   allotCaseAmt:'', //当月分配案件金额
        //   repayAmt:'',//当月回款金额
        //   collectRate:'',//当月金额回收率 %
        //   lastCollectRate:'',//上月金额回收率 %
        // },
      ],
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          searchOperator: "=",
          align: alignCenter,
          key: "listIndex",
          fixed: 'left',
        },
        {
          title: "所属组别",
          searchOperator: "=",
          key: "upRoleName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "处理人",
          searchOperator: "=",
          key: "opUserName",
          className: "caseHandleStatus",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "当月分配案件数量",
          searchOperator: "like",
          key: "allotCaseCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "当月还款笔数",
          key: "repayCount",
          className: "billNo",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "当月笔数回收率",
          searchOperator: "like",
          key: "repayCountRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "当月分配案件金额",
          searchOperator: "like",
          key: "allotCaseAmt",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "当月回款金额",
          searchOperator: "like",
          key: "repayAmt",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "当月金额回收率",
          searchOperator: "like",
          key: "collectRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "上月金额回收率",
          searchOperator: "like",
          key: "lastCollectRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val1, val2) {
      this.formItem.defaultDate = val1;
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
      this.pageNo = 1;
      this.getList();
    },
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info("当前无数据，无法导入");
        return;
      }
      let res = await monitor_collectRate_exportDown(
        {},
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      util.dowloadfile("催款回收率", res);
    },
    // 获取表格数据
    async getList() {
      let res = await monitor_collectRate_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      if (res && res.code === 1) {
        this.$Message.success("请求成功!");
        let data = res.data;
        data.content.map((val, key)=>{
          val.lastCollectRate = val.lastCollectRate + '%';
          val.repayCountRate = val.repayCountRate + '%';
          val.collectRate = val.collectRate + '%';
        })
        this.tableData = data.content;
        this.total = data.totalElements; //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.formValidate = {};
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less">
</style>
