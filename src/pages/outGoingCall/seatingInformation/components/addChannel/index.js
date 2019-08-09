import { } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'AddChannel',
  mixins: [sysDictionary],
  props: ["showAddChannel", 'updateChannel'],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;

    return {
      getDirList: ['EXECUTION_NUMBER', 'TASK_STATUS'],
      getDirObj: {},
      formData: this.updateChannel ? this.updateChannel : {},
      value3: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        paddingTop: '53px',
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
      formValidate: {},
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
      task_api: [
      ],
      phoneType: ''
    };

  },
  created() {
    // this.getList();
  },
  methods: {

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
    handleSubmit(flag) {
      console.log(this.formData)
      this.$emit("passBack", flag);
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
