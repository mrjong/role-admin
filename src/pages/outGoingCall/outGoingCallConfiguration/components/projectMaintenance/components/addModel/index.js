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
        channelOne: [
          {
            required: true,
            message: '请选择第一优先渠道',
            trigger: 'change',
            type: 'array',
          }
        ],
      },
      ruleValidateLine:{
        planName: [
          {
            required: true,
            message: '请输入专线名称',
            trigger: 'blur',
          }
        ],
        specialLine: [
          {
            required: true,
            message: '请选择渠道类型',
            trigger: 'change',
          }
        ],
        callNoList: [
          {
            required: true,
            message: '请选择坐席',
            trigger: 'change',
            type: 'array'
          }
        ],
        // explicitList: [
        //   {
        //     required: true,
        //     message: '请选择号码',
        //     trigger: 'change',
        //     type: 'array'
        //   }
        // ],
      },
      add_handle: true, //添加
    };

  },
  watch: {
    rowData: function (value) {
      if(Object.keys(value).length !== 0){
        if(this.showAddModel.name==='project'){
          this.formDataProject = this.rowData
        } else {
          this.formDataLine = this.rowData
          this.getChannelType('update')
        }
      }
    },
    showAddModel: function (val) {
      if(val.type === 'update'){
        this.updateFlag = true
      } else {
        this.updateFlag = false
      }
      if(!this.formDataLine.specialLine && Object.keys(val).length !== 0){
        this.getChannelType('add')
      }
    }
  },
  created() {

  },
  methods: {
    async handleSubmitProject() {
      this.$refs['formDataProject'].validate((valid) => {
        if (valid) {
          if(!this.updateFlag){
            rout_plan_project_add(this.formDataProject).then(res=>{
              if (res.code === 1) {
                this.$emit("passBack", 'change');
                this.formDataProject= {
                  territorialCallStatus: '1',
                  phoneCallStatus: '1',
                  failureRateStatus: '1',
                  connectionRateStatus: '1',
                  planType: '1'
                }
              } else {
                this.$Message.error(res.message)
              }
            })
          } else {
            this.formDataProject.channelTwo.forEach((item, index)=>{
              if(item === 'null'){
                this.formDataProject.channelTwo.splice(index,1)
              }
            })
            rout_plan_project_update(this.formDataProject).then(res=>{
              if (res.code === 1) {
                this.$emit("passBack", 'change');
                this.formDataProject= {
                  territorialCallStatus: '1',
                  phoneCallStatus: '1',
                  failureRateStatus: '1',
                  connectionRateStatus: '1',
                  planType: '1'
                }
              } else {
                this.$Message.error(res.message)
              }
            })
          }
          this.$refs['formDataProject'].resetFields();
        } else {
          this.$Message.error('请检查必填项')
        }
      })
    },

    handleCancelProject() {
      this.numberList = []
      this.seatsList = []
      this.$emit("passBack");
      this.$refs['formDataProject'].resetFields();
      this.formDataProject= {
        territorialCallStatus: '1',
        phoneCallStatus: '1',
        failureRateStatus: '1',
        connectionRateStatus: '1',
        planType: '1'
      }
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
    },
    async handleSubmitLine() {
      this.$refs['formDataLine'].validate((valid) => {
        if (valid) {
          if (!this.updateFlag) {
            rout_plan_project_add(this.formDataLine).then(res => {
              if (res.code === 1) {
                this.$emit("passBack", 'change');
                this.$refs['formDataLine'].resetFields();
                this.formDataLine= { planType: '2'}
              } else {
                this.$Message.error(res.message)
              }
            })
          } else {
            this.formDataLine.explicitList.forEach((item, index)=>{
              if(item === 'null'){
                this.formDataLine.explicitList.splice(index,1)
              }
            })
            rout_plan_project_update(this.formDataLine).then(res => {
              if (res.code === 1) {
                this.$emit("passBack", 'change');
                this.$refs['formDataLine'].resetFields();
                this.formDataLine= { planType: '2'}
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        } else {
          this.$Message.error('请检查必填项')
        }
      })
    },

    handleCancelLine() {
      this.$emit("passBack");
      this.$refs['formDataLine'].resetFields();
      this.formDataLine= {
        planType: '2',
      }
    }
  }
};
