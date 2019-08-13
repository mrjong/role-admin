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
      project: [],
      addLoading: false,
      formDataProject: {
        planType: '1',
        territorialCallStatus: 1,
        phoneCallStatus: 1,
        failureRateStatus: 1,
        connectionRateStatus: 1,
      },
      formDataLine: {},
      ruleValidateProject:{
        planName: [
          {
            required: true,
            message: '请输入方案名称',
            trigger: 'blur',
          }
        ],
        channelOne: [
          {
            required: true,
            message: '请选择第一优先渠道',
            trigger: 'change',
          }
        ],
      },
      ruleValidateLine:{
        specialLine: [
          {
            required: true,
            message: '请输入专线名称',
            trigger: 'blur',
          }
        ],
        seatType: [
          {
            required: true,
            message: '请选择渠道',
            trigger: 'change',
          }
        ],
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
    showAddModel: function (value) {
      console.log(value)
    }
  },
  created() {
    // this.getList();
  },
  methods: {
    async handleSubmit(flag) {
      const res = await rout_plan_project_add(this.formData);
      if (res.code === 1) {
        console.log(res.data)
        this.$emit("passBack", flag);
        // this.projectList = res.data
      } else {
        this.$Message.error(res.message)
      }

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
