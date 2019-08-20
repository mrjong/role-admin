import {
  black_list
} from "@/service/getData";
import util from "@/libs/util";
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: "blackList",
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
      blackTime: [],
      formItem: {
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
          title: "手机号",
          searchOperator: "=",
          key: "mblNoHid",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
        },
        {
          title: "拉黑时间",
          searchOperator: "=",
          key: "createTime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            const row = params.row;
            const callTime = row.createTime
              ? this.$options.filters['formatDate'](row.createTime, 'YYYY-MM-DD HH:mm:ss')
              : row.createTime;
            return h('span', callTime);
          }
        },
        {
          title: "呼叫类型",
          searchOperator: "=",
          key: "channelCodeName",
          className: "tableMainW",
          align: alignCenter,
          width: 300
        },
        {
          title: "关联账单号",
          searchOperator: "=",
          key: "billNo",
          className: "tableMainW",
          align: alignCenter,
          width: 300
        },
        {
          title: "号码来源",
          searchOperator: "like",
          key: "collectTypeName",
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
      this.formItem.startDate  = val1[0];
      this.formItem.endDate = val1[1];
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
      this.pageNo = 1;
      this.getList(type);
    },

    // 获取表格数据
    async getList(type) {
      console.log(this.formItem)
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      this.query_loading = true;
      let res;
      res = await black_list({
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
