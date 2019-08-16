import {seats_config_add, seats_config_update,  } from '@/service/getData';
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
      getDirList: ['SEAT_TYPE', 'PROVINCE_AREA'],
      getDirObj: {},
      formData: {},
      updateFlag: false,
      ruleValidate:{
        channelCode: [
          {
            required: true,
            message: '请选择渠道名称',
            trigger: 'change',
          }
        ],
        // channelSecondaryName: [
        //   {
        //     required: true,
        //     message: '请输入渠道类型',
        //     trigger: 'blur',
        //   }
        // ],
        explicitType: [
          {
            required: true,
            message: '请选择号码类别',
            trigger: 'change',
          }
        ],
        // areas: [
        //   {
        //     required: true,
        //     message: '请选择地域盲区',
        //     trigger: 'change',
        //   }
        // ],
      },
      add_handle: true, //添加
    };

  },
  created() {

  },
  watch: {
    updateChannel: function (value) {
      if(Object.keys(value).length !== 0){
        this.updateFlag = true
        this.formData = value
      } else {
        this.updateFlag = false
      }
    }
  },
  methods: {
    selectChannel(value) {
      if (value) {
        this.formData.channelCode = value.value
        this.formData.channelName = value.label
      }
    },
    async handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (!this.updateFlag) {
            seats_config_add(this.formData).then(res => {
              if (res.code === 1) {
                this.$emit("passBack", 'change');
                this.$refs['formData'].resetFields();
                this.formData = {}
              } else {
                this.$Message.error(res.message);
              }
            })
          } else {
            seats_config_update(this.formData).then(res => {
              if (res.code === 1) {
                this.$emit("passBack", 'change');
                this.$refs['formData'].resetFields();
              } else {
                this.$Message.error(res.message);
              }
            })
          }
        } else {
          this.$Message.error('请检查必填项');
        }
      })
    },
    handleCancel() {
      this.$emit("passBack");
    }
  }
};
