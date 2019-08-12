import {seats_config_add } from '@/service/getData';
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
      getDirList: ['SEAT_TYPE'],
      getDirObj: {},
      formData: this.updateChannel ? this.updateChannel : {},
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
      pageNo: 1,
      pageSize: 10,
      total: 0,
      add_handle: true, //添加
      dialogFormVisible: false,
      task_api: [
      ],
      phoneType: ''
    };

  },
  created() {
    console.log(this.updateChannel)
    // this.getList();
  },
  watch: {
    updateChannel: function (value) {
      debugger
      console.log(value)
    }
  },
  methods: {

    selectChannel(value) {
      console.log(value)
      this.formData.channelCode = value.value
      this.formData.channelName = value.label
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.createTime = [];
      this.$refs[name].resetFields();
      // this.getList();
    },
    async handleSubmit(flag) {
      console.log(this.formData)
      await seats_config_add(this.formData).then(res=>{
        console.log(res)
      })
      this.formData = {}
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
