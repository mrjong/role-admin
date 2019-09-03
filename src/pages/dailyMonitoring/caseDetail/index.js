import {
  divide_allot_user_list,
  divide_allot_user_export_list,
  getLeafTypeList
} from "@/service/getData";
import util from "@/libs/util";
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: "CaseDetail",
  mixins: [sysDictionary],
  data() {
    var alignCenter = "center";
    var widthVal = 150;
    var widthMidVal = 100;
    return {
      getDirList: ['PROD_CNT'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      export_case: false, //导出权限
      query: false, //查询权限
      query_loading: false, //查询按钮loading
      export_case_loading: false, //导出按钮loading
      perdAllotCounts: '{"12":4,"1":0,"3":1,"6":7}',
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      formItem: {},
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
          searchOperator: "like",
          key: "compayName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "组别",
          searchOperator: "like",
          key: "opOrganizationName",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "姓名",
          searchOperator: "=",
          key: "opUserName",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "预分案数量",
          searchOperator: "like",
          key: "expAllotCounts",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "实际分案数量",
          searchOperator: "like",
          key: "finaAllotCounts",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
      ]
    };
  },
  created() {
    this.formItem.currentDate = util.getToday(-2)
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
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
  },
  watch: {
    getDirObj: function (value) {
      value.PROD_CNT && value.PROD_CNT.forEach(item=>{
        this.tableColumns.push({
          title: item.itemDesc +"数量",
          key: item.itemCode,
          align: 'center',
          width: 200
        })
      })
    }
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val) {
      this.formItem.currentDate = val;
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
      // 单独处理日期的缓存问题
      this.pageNo = 1;
      this.getList(type);
    },
    // 导出
    async exportData() {
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
      res = await divide_allot_user_export_list(obj, options);
      util.dowloadfile("分案明细", res);
      this.export_case_loading = false;
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      this.formItem.currentDate = this.formItem.currentDate ?this.$options.filters['formatDate'](this.formItem.currentDate , 'YYYY-MM-DD') : ''
      this.query_loading = true;
      let res;
      res = await divide_allot_user_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
      this.query_loading = false;
      if (res && res.code === 1) {
        let data = res.data;
        this.tableData = data.content;
        this.tableData.forEach(item=>{
          let x = JSON.parse(item.perdAllotCounts && item.perdAllotCounts.replace(/(\d+):/g,"\"$1\":"));
          Object.assign(item, x);
        })
        console.log(this.tableData)
        this.total = data.totalElements; //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await getLeafTypeList({
        // status: "1",
        leafType: type,
        parentId: parent || ""
      });
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.company_list_data = res.data;
            break;
          case "03":
            this.department_list_data = res.data;
            break;
          case "04":
            this.collect_list_data = res.data;
            break;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      window.sessionStorage.removeItem("daily_monitoring_callDetail_form");
      this.$refs[name].resetFields();
    }
  }
};
