import {
  call_record_list,
  call_record_export
} from "@/service/getData";
import util from "@/libs/util";
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: "seatingMonitoring",
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
      export_case: true, //导出权限
      query: false, //查询权限
      query_loading: false, //查询按钮loading
      export_case_loading: false, //导出按钮loading
      tab_flag: 'KT_CALL_DETAIL', //默认展示科天的
      dealTime: "",
      formItem: {
        dealTime: [],
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
          title: "电催中心",
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
          title: "组别",
          searchOperator: "=",
          key: "toCallMblHid",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "姓名",
          searchOperator: "=",
          key: "caseNo",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "点击量",
          searchOperator: "=",
          key: "billNo",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "呼出成功量",
          searchOperator: "like",
          key: "userId",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "故障量",
          searchOperator: "like",
          key: "collectTypeName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "接通量",
          searchOperator: "like",
          key: "callDurat",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "通话时长",
          key: "callStatusName",
          className: "tableMainW",
          align: alignCenter,
        }
      ]
    };
  },
  created() {
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
    changeDate(val1, val2) {
      this.formItem.callStartDate = val1[0];
      this.formItem.callEndDate = val1[1];
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
      if (this.formItem.dealTime) {
        this.formItem.dealTime = [
          this.formItem.callStartDate,
          this.formItem.callEndDate
        ];
      };
      window.sessionStorage.setItem(
        "daily_monitoring_callDetail_form",
        JSON.stringify(this.formItem)
      );
      this.pageNo = 1;
      this.getList(type);
    },
    // 导出
    async exportData(type) {
      // if (this.tableData.length === 0) {
      //   this.$Message.info("当前无数据，无法导入");
      //   return;
      // }
      // this.export_case_loading = true;
      // let res;
      // let obj = {
      //   ...this.formItem
      // };
      // let options = {
      //   timeout: 120000,
      //   responseType: "blob"
      // };
      // res = await call_record_export(obj, options);
      // util.dowloadfile("呼叫明细", res);
      // this.export_case_loading = false;
    },
    // 获取表格数据
    async getList(type) {
      // if (!this.query) {
      //   this.$Message.error("很抱歉，暂无权限查询");
      //   return;
      // }
      this.query_loading = true;
      let res;
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
      this.$refs[name].resetFields();
    }
  }
};
