import {rout_plan_project_add, rout_plan_project_update, call_channel_list, rout_explicit_getExplicitList, rout_seatpool_getCallNos } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'AddModel',
  mixins: [sysDictionary],
  props: ['rowData',"showAddModel" ],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      getDirList: ['SEAT_TYPE'],
      getDirObj: {},
      project: [],
      addLoading: false,
      updateFlag: false,
      channelType: [],
      seatsList: [],
      numberList: [],
      formDataProject: {
        planType: '1',
        territorialCallStatus: '1',
        phoneCallStatus: '1',
        failureRateStatus: '1',
        connectionRateStatus: '1',
      },
      formDataLine: {
        planType: '2',
      },
      ruleValidateProject:{
        planName: [
          {
            required: true,
            message: '请输入方案名称',
            trigger: 'blur',
          }
        ],
        // channelOne: [
        //   {
        //     required: true,
        //     message: '请选择第一优先渠道',
        //     trigger: 'change',
        //   }
        // ],
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
    rowData: function (value) {
      if(Object.keys(value).length !== 0){
        this.updateFlag = true
        if(this.showAddModel==='project'){
          this.formDataProject = this.rowData
        } else {
          this.formDataLine = this.rowData
          this.getChannelType('update')
        }
      } else {
        debugger
        this.updateFlag = false
      }
    },
    showAddModel: function (val) {
      if(!this.formDataLine.specialLine && val !==''){
        this.getChannelType('add')
        this.updateFlag = false
      }
    }
  },
  created() {

  },
  methods: {
    async handleSubmit(flag) {
      this.numberList = []
      this.seatsList = []
      if(flag === 'Submit'){
        if(!this.updateFlag){
          const res = await rout_plan_project_add(this.formDataProject);
          if (res.code === 1) {
            this.$emit("passBack", 'change');
          } else {
            this.$Message.error(res.message)
          }
        } else {
          const res = await rout_plan_project_update(this.formDataProject);
          if (res.code === 1) {
            this.$emit("passBack", 'change');
          } else {
            this.$Message.error(res.message)
          }
        }
      } else {
        this.$emit("passBack");
      }
      this.formDataProject= {
        planType: '1',
        territorialCallStatus: '1',
        phoneCallStatus: '1',
        failureRateStatus: '1',
        connectionRateStatus: '1',
      }
      // this.formDataProject = {}
    },
    getChannelType(flag) {
      let objPam = {type: 'ALL'}
      if(flag !== 'update'){
        objPam.specialStatus = '0'
      }
      call_channel_list({...objPam}).then(res=>{
        if (res && res.code === 1) {
          this.channelType = res.data;
          if(flag === 'update'){
            res.data.forEach(item=>{
              if(this.formDataLine.specialLine === item.channelCode){
                debugger
                this.numberList = item.explicitPoolDomains
                this.seatsList = item.fcsSeatPoolDomains
              }
            })
          }
        } else {
          this.$Message.error(res.message);
        }
      })
    },

    getChangeChannel(val) {
      this.numberList = []
      this.seatsList = []
      if(val){
        this.channelType.forEach(item=>{
          if(val === item.channelCode){
            this.numberList = item.explicitPoolDomains
            this.seatsList = item.fcsSeatPoolDomains
          }
        })
      }
      console.log(this.numberList)
    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },

    async handleSubmitLine(flag) {
      if(flag === 'Submit'){
        if(!this.updateFlag){
          const res = await rout_plan_project_add(this.formDataLine);
          if (res.code === 1) {
            this.$emit("passBack", 'change');
          } else {
            this.$Message.error(res.message)
          }
        } else {
          const res = await rout_plan_project_update(this.formDataLine);
          if (res.code === 1) {
            this.$emit("passBack", 'change');
          } else {
            this.$Message.error(res.message)
          }
        }
      } else {
        this.$emit("passBack");
      }
      this.formDataLine= {
        planType: '2',
      }
    }
  }
};
