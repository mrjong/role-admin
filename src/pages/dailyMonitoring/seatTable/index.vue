<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="处理日期:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="startRepayDateRange"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择处理时间"
                @on-change="changeActDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="坐席:">
              <Select size="small" v-model="formValidate.agent">
                <Option
                  v-for="item in groupSeatList"
                  :value="item.agent"
                  :key="item.agent"
                >{{ item.agentName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="组别:">
              <Select size="small" v-model="formValidate.parentRoleId" @on-change="toGetSeat">
                <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formValidate')"
                style="width:80px"
                long
                size="small"
              >检索</Button>
              <Button
                size="small"
                type="ghost"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formValidate')"
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
  monitor_agentState_list,
  monitor_agentState_exportDown,
  monitor_groupList,
  monitor_getAgentList
} from "@/service/getData";
import util from "@/libs/util";
export default {
  name: "seatTable",
  data() {
    var alignCenter = "center";
    var widthVal = 180;
    var widthMidVal = 100;
    return {
      showPanel: false,
      showPanel2: false,
      groupSeatList: [],
      groupList: [],
      modal12: false,
      modal11: false,
      startRepayDateRange: [], //实际还款日期区间
      shouldRepayDate: [],
      formValidate: {
        startDate: "", // 实际还款起始日期
        endDate: "", //实际还款结束日期
        agent: "", // 坐席
        parentRoleId: "" //组别
      },
      ruleValidate: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        // {
        //   agentName:'', //催收员
        //   dialout: '', // 外呼数
        //   effectiveLink:'', // 有效接通数
        //   linkRate: '', // 接通率
        //   onlineTimeStr:'', // 在线总时长
        //   effectiveTalkTimeStr: '',//有效接通总时长
        //   caseCount: '',// 在案量
        //   caseAmountCount:'',//载案金
        //   memberProcessRate:'',//用户处理率
        //   dialoutMemberRate:'',//外呼覆盖率
        //   linkMemberRate:'',//接通覆盖率
        //   repayOrderCount:'',//还款笔数
        //   linkRepayRate:'',//接通还款率
        //   avgProcessCount:'',//每1H处理量
        //   repayAmountCount:'',//还款本金
        //   repayCountRate:'',//笔数还款率
        //   repayAmountRate:''//金额还款率
        // },
      ],
      tableColumns: [
        {
          title: "id",
          type: "index",
          width: 60,
          searchOperator: "=",
          align: alignCenter,
          key: "listIndex",
          fixed: 'left',
        },
        {
          title: "催收员",
          searchOperator: "=",
          key: "agentName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "外呼数",
          searchOperator: "=",
          key: "dialout",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "有效接通数",
          searchOperator: "like",
          key: "effectiveLink",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "接通率",
          key: "linkRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "在线总时长",
          searchOperator: "like",
          key: "onlineTimeStr",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "还款期数",
          searchOperator: "like",
          key: "perdCnt",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "有效接通总时长",
          searchOperator: "like",
          key: "effectiveTalkTimeStr",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "在案量",
          searchOperator: "like",
          key: "caseCount",
          className: "caseCount",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "载案金",
          searchOperator: "like",
          key: "caseAmountCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "用户处理率",
          searchOperator: "like",
          key: "memberProcessRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "外呼覆盖率",
          searchOperator: "like",
          key: "dialoutMemberRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "接通覆盖率",
          searchOperator: "like",
          key: "linkMemberRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "还款笔数",
          searchOperator: "like",
          key: "repayOrderCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "接通还款率",
          searchOperator: "like",
          key: "linkRepayRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "每1H处理量",
          searchOperator: "like",
          key: "avgProcessCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "还款本金",
          searchOperator: "like",
          key: "repayAmountCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "笔数还款率",
          searchOperator: "like",
          key: "repayCountRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "金额还款率",
          searchOperator: "like",
          key: "repayAmountRate",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        }
      ]
    };
  },
  created() {
    // 此处注意刁颖顺序，因为是两级联动关系，必须等到拿到组别之后，在进行坐席接口调用
    //this.getSeatTableList();
    this.groupListArr();
    this.getList();
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeActDate(val1, val2) {
      this.formValidate.startDate = val1[0];
      this.formValidate.endDate = val1[1];
      console.log("123", this.formValidate);
      //this.formValidate.startAndend[1].Date('yyyy-MM-dd');
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
    toGetSeat(val) {
      this.getSeatTableList(val);
    },
    async groupListArr() {
      let res = await monitor_groupList({});
      if (res && res.code === 1) {
        this.groupList = res.data;
        console.log(this.groupList);
      }
    },
    async getSeatTableList(id) {
      //this.groupSeatList = [];
      console.log(id, "idiiidiididdiidi");
      let res = await monitor_getAgentList({
        parentRoleId: id
      });
      if (res && res.code === 1) {
        this.groupSeatList = res.data;
      }
    },
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info("当前无数据，无法导入");
        return;
      }
      let res = await monitor_agentState_exportDown(
        {
          ...this.formValidate
        },
        {
          timeout: 90000,
          responseType: "blob"
        }
      );
      util.dowloadfile("坐席报表", res);
    },
    // 获取表格数据
    async getList() {
      let res = await monitor_agentState_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formValidate
      });
      console.log(res);
      if (res && res.code === 1) {
        this.$Message.success("请求成功!");
        let data = res.data;
        this.tableData = data.content;
        this.total = data.totalElements; //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
        this.$Message.error(res.message);
      }
      // 试着处理数据和分页组件之间的关系,
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formValidate = {};
      this.startRepayDateRange = "";
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less">
</style>
