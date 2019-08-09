import { } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'SeatsMg',
  mixins: [sysDictionary],
  props: ["showSeatsMg"],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;

    return {
      getDirList: ['EXECUTION_NUMBER', 'TASK_STATUS'],
      getDirObj: {},
      queryLoading: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        paddingTop: '23px',
        position: 'static',
      },
      ruleValidate:{
        jobName: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'blur',
          }
        ],
        jobClass: [
          {
            required: true,
            message: '请输入任务类名',
            trigger: 'blur',
          }
        ],
        jobMethod: [
          {
            required: true,
            message: '请输入任务方法名',
            trigger: 'blur',

          }
        ],
        ipAddress: [
          {
            required: true,
            message: '请输入IP地址',
            trigger: 'blur'
          }
        ],
        cronExpression: [
          {
            required: true,
            message: '请输入CRON表达式',
            trigger: 'blur',

          }
        ],
        executionNumber: [
          {
            required: true,
            message: '请选择执行次数',
            trigger: 'change',
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'},
        {name: '333'}
      ],
      formData: {},
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '坐席编号',
          key: 'name',
        },
      ],
      tableColumns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '坐席号码',
          key: 'name',
        },
        {
          title: '归属地',
          key: 'address',
        },
      ],
      add_handle: true, //添加
      dialogFormVisible: false,
      title: '',
      task_api: [
      ],
      phoneType: ''
    };

  },
  created() {
    // this.getList();
  },
  methods: {

    handleSubmit(name) {
      this.pageNo = 1;
      this.getList();
    },
    // 获取表格数据
    async getList() {

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
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.createTime = [];
      this.$refs[name].resetFields();
      // this.getList();
    },
    handleSubmit(flag) {
      this.$emit("passBack", flag);
    },
    closeDrawer() {
      this.$emit("passBack");
    },
    change() {

    },
    closeModal(flag){

    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },
    open(content='', text='', data= {}){

    },

    showTask(flag, data) {

    },
  }
};
