import {
  call_record_callDataList,
  getLeafTypeList,
  call_channel_list
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
      query: false, //查询权限
      query_loading: false, //查询按钮loading
      export_case_loading: false, //导出按钮loading
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      channelType: [],
      dealTime: "",
      formItem: {
        dealTime: [],
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
          key: "opCompayName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
        },
        {
          title: "组别",
          searchOperator: "=",
          key: "opOrganizationName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "姓名",
          searchOperator: "=",
          key: "userName",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "点击量",
          searchOperator: "=",
          key: "clickCount",
          className: "tableMainW",
          align: alignCenter,
          width: 200
        },
        {
          title: "呼出成功量",
          searchOperator: "like",
          key: "successCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "故障量",
          searchOperator: "like",
          key: "errorCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "接通量",
          searchOperator: "like",
          key: "connectCount",
          className: "tableMainW",
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: "通话时长",
          key: "callDurate",
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
    this.getChannelType()
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
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
      this.formItem.startDate = val1[0];
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
      if (this.formItem.dealTime) {
        this.formItem.dealTime = [
          this.formItem.startDate,
          this.formItem.endDate
        ];
      };
      this.pageNo = 1;
      this.getList(type);
    },
    // 获取表格数据
    async getList(type) {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      this.query_loading = true;
      if(!this.formItem.channelCode){
        this.formItem.type= ''
      }
      this.channelType.forEach(item=>{
        if(this.formItem.channelCode === item.channelCode){
          this.formItem.type = item.type
        }
      })
      let res;
      res = await call_record_callDataList({
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
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    //组别
    async getLeafTypeList(type, parent) {
      const res = await getLeafTypeList({
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

    getChannelType(){
      call_channel_list({type: 'ALL'}).then(res=>{
        if (res && res.code === 1) {
          this.channelType = res.data;
        } else {
          this.$Message.error(res.message);
        }
      })
    },

    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    }
  }
};
