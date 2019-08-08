import { } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'projectMaintenance',
  mixins: [sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;

    return {
      getDirList: ['EXECUTION_NUMBER', 'TASK_STATUS'],
      getDirObj: {},
      createTime: [],
      queryLoading: false,
      formItem: {
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
      formValidate: {},
      formValidateInfo: {
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
      ],
      tableColumns: [
        {
          title: '渠道名称',
          align: alignCenter,
          width: widthVal,
          key: 'jobName'
        },
        {
          title: '状态',
          key: 'isLockName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '号码类型',
          key: 'cronExpression',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '坐席数量',
          key: 'jobClass',
          className: 'tableMainW',
          align: alignCenter,
          width: 300,
          tooltip: true
        },
        {
          title: '号码数量',
          key: 'jobMethod',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '地域盲区',
          key: 'ipAddress',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '创建时间',
          key: 'executionNumberName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '操作',
          slot: 'handle',
          key: 'edit',
          className: 'tableMainHandle',
          width: 280,
          fixed: 'left',
          align: 'center',
        }
      ],
      add_handle: true, //添加
      dialogFormVisible: false,
      title: '',
      task_api: [

      ]
    };

  },
  created() {
    // this.getList();
  },
  methods: {

    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo,'当前的页码数量值');
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
    // 获取表格数据
    async getList() {

    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.createTime = [];
      this.$refs[name].resetFields();
      // this.getList();
    },
    handleClick(originalData, flag) {
      let data = JSON.parse(JSON.stringify(originalData))
      switch(flag) {
        case 'open':

          break;
        case 'close':

          break;
        case 'update':

          break;
        case 'execute':

          break;
        case 'delete':

          break;
      }
    },
    closeModal(flag){
      this.dialogFormVisible = false
    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },
    open(content='', text='', data= {}){

    },

    showTask(flag, data) {
      if(flag==='add'){
        this.dialogFormVisible = true
      }
    },
  }
};
