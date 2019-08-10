import {rout_plan_project_add } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'AddModel',
  mixins: [sysDictionary],
  props: ["showAddModel"],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;

    return {
      getDirList: ['SEAT_TYPE'],
      getDirObj: {},
      project: ['苹果'],
      addLoading: false,
      formData: {
        planType: '1',
        territorialCallStatus: 1,
        phoneCallStatus: 1,
        failureRateStatus: 1,
        connectionRateStatus: 1,
      },
      formData2: {

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
      add_handle: true, //添加
      dialogFormVisible: false,
      title: '',
      task_api: [
      ],
      phoneType: ''
    };

  },
  watch: {
    showAddModel: function () {

    }
  },
  created() {
    // this.getList();
  },
  methods: {
    async handleSubmit(flag) {
      console.log(this.formData)
      const res = await rout_plan_project_add(this.formData);
      if (res.code === 1) {
        console.log(res.data)
        // this.projectList = res.data
      } else {
        this.$Message.error(res.message)
      }
      this.$emit("passBack", flag);
    },
    // getChannelTwo(data) {
    // },
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
