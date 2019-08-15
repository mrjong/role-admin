import {
  hitch_list,
  call_record_export
} from "@/service/getData";
import util from "@/libs/util";
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: "hitch",
  mixins: [sysDictionary],
  data() {
    var alignCenter = "center";
    var widthVal = 300;
    var widthMidVal = 100;
    return {
      getDirList: ['SEAT_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      query: false, //查询权限
      query_loading: false, //查询按钮loading
      dealTime: [],
      formItem: {
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
          title: "渠道名称",
          searchOperator: "=",
          key: "channelCodeName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "故障时间",
          searchOperator: "=",
          key: "createTime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            const row = params.row;
            const callTime = row.createTime
              ? this.$options.filters['formatDate'](row.createTime, 'YYYY-MM-DD HH:mm:ss')
              : row.callTime;
            return h('span', callTime);
          }
        },
        {
          title: "开启时间",
          searchOperator: "=",
          key: "endTime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            const row = params.row;
            const callTime = row.endTime
              ? this.$options.filters['formatDate'](row.endTime, 'YYYY-MM-DD HH:mm:ss')
              : row.callTime;
            return h('span', callTime);
          }
        },
        {
          title: "故障时长",
          searchOperator: "=",
          key: "durationSecond",
          className: "tableMainW",
          align: alignCenter,
          render: (h, params) => {
            return h('span', params.row.durationSecond+ '秒');
          }
        },
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
      this.getList();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    handleSubmit(name, type) {
      this.pageNo = 1;
      console.log(this.formItem)
      this.getList(type);
    },

    // 获取表格数据
    async getList() {
      // if (!this.query) {
      //   this.$Message.error("很抱歉，暂无权限查询");
      //   return;
      // }
      this.query_loading = true;
      let res;
      res = await hitch_list({
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
      this.dealTime = []
      this.$refs[name].resetFields();
    }
  }
};
