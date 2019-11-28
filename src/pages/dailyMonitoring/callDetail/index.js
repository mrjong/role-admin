import {
  call_record_list,
  call_record_export
} from "@/service/getData";
import util from "@/libs/util";
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: "overduePayment",
  mixins: [sysDictionary],
  data() {
    var alignCenter = "center";
    var widthVal = 150;
    var widthMidVal = 100;
    return {
      getDirList: ['SEAT_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      export_case: false, //导出权限
      query: false, //查询权限
      query_loading: false, //查询按钮loading
      export_case_loading: false, //导出按钮loading
      tab_flag: 'KT_CALL_DETAIL', //默认展示科天的
      dealTime: "",
      formItem: {
        dealTime: [],
        callStartDate: "",
        callEndDate: ""
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
          title: "呼叫日期",
          searchOperator: "=",
          key: "callTime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            const row = params.row;
            const callTime = row.callTime
              ? this.$options.filters['formatDate'](row.callTime, 'YYYY-MM-DD HH:mm:ss')
              : row.callTime;
            return h('span', callTime);
          }
        },
        {
          title: '分配时间',
          width: 150,
          key: 'allotDate',
          align: 'center',
          render: (h, params) => {
            let allotDate = params.row.allotDate;
            allotDate = allotDate
              ? this.$options.filters['formatDate'](allotDate, 'YYYY-MM-DD HH:mm:ss')
              : allotDate;
            return h('span', allotDate);
          }
        },
        {
          title: "外呼手机号",
          searchOperator: "=",
          key: "toCallMblHid",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "案件号",
          searchOperator: "=",
          key: "caseNo",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "账单号",
          searchOperator: "=",
          key: "billNo",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "用户ID",
          searchOperator: "like",
          key: "userId",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "通话来源",
          searchOperator: "like",
          key: "collectTypeName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "通话时长(s)",
          searchOperator: "like",
          key: "callDurat",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "通话结果",
          key: "callStatusName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "坐席姓名",
          searchOperator: "like",
          key: "callUserName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "电催中心",
          searchOperator: "like",
          key: "companyName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "组别",
          searchOperator: "like",
          key: "organizationName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "坐席工号",
          searchOperator: "like",
          key: "callno",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "坐席类型",
          searchOperator: "like",
          key: "seatTypeName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
      ]
    };
  },
  created() {
    let daily_monitoring_callDetail_form = window.sessionStorage.getItem(
      "daily_monitoring_callDetail_form"
    );
    if (daily_monitoring_callDetail_form) {
      this.formItem = JSON.parse(daily_monitoring_callDetail_form);
    }
    this.formItem.dealTime = [util.getToday(-1), util.getToday(0)];
    this.formItem.callStartDate = util.getToday(-1);
    this.formItem.callEndDate = util.getToday(0);
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
    tabClick(name) {
      this.tab_flag = name;
      this.tableData = [];
      this.total = 0;
      this.pageNo = 1;
      this.getList(name);
    },
    // 改变日期区间的格式之后进行处理
    changeDate(arr, type) {
      if (type === 'dealTime') {
        this.formItem.callStartDate = arr[0];
        this.formItem.callEndDate = arr[1];
      }
      if (type === 'allotDateCopy') {
        this.formItem.allotDateSt = arr[0];
        this.formItem.allotDateEd = arr[1];
      }
      // 日期格式单天和时间区间之间的差别在于range这里拿到的是一个长度唯二的数组，而单日侧直接是一个结果值
    },
    // 页码改变的回调
    changePage(pageNo) {
      //默认带入一个参数是当前的页码数
      console.log(pageNo, "当前的页码数量值");
      this.pageNo = pageNo;
      this.getList(this.tab_flag);
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList(this.tab_flag);
    },
    handleSubmit(name, type) {
      // 单独处理日期的缓存问题
      this.formItem.dealTime && (this.formItem.dealTime = [this.formItem.callStartDate,      this.formItem.callEndDate
      ]
      );
      this.formItem.allotDateCopy && (this.formItem.allotDateCopy = [this.formItem.allotDateSt,
      this.formItem.allotDateEd])
      window.sessionStorage.setItem(
        "daily_monitoring_callDetail_form",
        JSON.stringify(this.formItem)
      );
      this.pageNo = 1;
      this.getList(type);
    },
    // 导出
    async exportData(type) {
      if (this.tableData.length === 0) {
        this.$Message.info("当前无数据，无法导入");
        return;
      }
      this.export_case_loading = true;
      let res;
      let obj = {
        ...this.formItem
      };
      let options = {
        timeout: 120000,
        responseType: "blob"
      };
      // switch (type) {
      //   // 科天导出
      //   case 'KT_CALL_DETAIL':
      //     res = await kt_callDetail_exportDown(obj, options);
      //     util.dowloadfile("科天呼叫明细", res);
      //     break;
      //   // 容联导出
      //   case 'RL_CALL_DETAIL':
      //     res = await rl_callDetail_exportDown(obj, options);
      //     util.dowloadfile("容联呼叫明细", res);
      //     break;
      //   // 讯众导出
      //   case 'XZ_CALL_DETAIL':
      //     res = await xz_callDetail_exportDown(obj, options);
      //     util.dowloadfile("讯众呼叫明细", res);
      //     break;
      // }
      res = await call_record_export(obj, options);
      util.dowloadfile("呼叫明细", res);
      this.export_case_loading = false;
    },
    // 获取表格数据
    async getList(type) {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      if (!this.formItem.callStartDate) {
        this.$Message.error('请选择呼叫日期后再查询');
        return;
      }
      this.query_loading = true;
      let res;
      // switch (type) {
      //   // 科天
      //   case 'KT_CALL_DETAIL':
      //     res = await kt_callDetail_list({
      //       pageNum: this.pageNo,
      //       pageSize: this.pageSize,
      //       ...this.formItem
      //     });
      //     break;
      //   // 容联
      //   case 'RL_CALL_DETAIL':
      //     res = await rl_callDetail_list({
      //       pageNum: this.pageNo,
      //       pageSize: this.pageSize,
      //       ...this.formItem
      //     });
      //     break;
      //   // 讯众
      //   case 'XZ_CALL_DETAIL':
      //     res = await xz_callDetail_list({
      //       pageNum: this.pageNo,
      //       pageSize: this.pageSize,
      //       ...this.formItem
      //     });
      //     break;
      // };
      res = await call_record_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
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
      window.sessionStorage.removeItem("daily_monitoring_callDetail_form");
      this.formItem.dealTime = [util.getToday(-1), util.getToday(0)];
      this.formItem.callStartDate = util.getToday(-1);
      this.formItem.callEndDate = util.getToday(0);
      this.$refs[name].resetFields();
    }
  }
};
