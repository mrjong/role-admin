import {
  divide_allot_user_getDivideUserByUserId,
  divide_allot_user_upDivideRuleUser
} from '@/service/getData';
export default {
  components: {

  },
  name: 'caseLoading',
  props: ['showCaseLoading'],
  data() {
    return {
      submit_loading: false,
      allotStatus: '',   //是否设置接案量
      isPeak: '',  //是高峰期还是平常期
      showFlag: false,
      divideStarVoList: [
        // {
        //   starName: '王者',
        //   starCode: '1',
        //   normAllotCounts: '12',
        //   normCountsSta: '2',
        //   normCountsEnd: '24',
        //   peakAllotCounts: '23',
        //   peakCountsSta: '4',
        //   peakCountsEnd: '30'
        // },
        // {
        //   starName: '钻石',
        //   starCode: '2',
        //   normAllotCounts: '12',
        //   normCountsSta: '2',
        //   normCountsEnd: '24',
        //   peakAllotCounts: '23',
        //   peakCountsSta: '4',
        //   peakCountsEnd: '30'
        // },
        // {
        //   starName: '青铜',
        //   starCode: '3',
        //   normAllotCounts: '12',
        //   normCountsSta: '2',
        //   normCountsEnd: '24',
        //   peakAllotCounts: '23',
        //   peakCountsSta: '4',
        //   peakCountsEnd: '30'
        // },
      ],
      formItem: {
        divideStarVoList: [
          {
            starName: ''
          }
        ]
      },

    };
  },
  created() {

  },
  watch: {
    showCaseLoading(val) {
      if(val){
        this.showFlag = false
        this.get_divide_star_list();
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit("passBack");
    },
    //更改默认值
    changeAllotCounts(val, item) {
      if(this.isPeak === '1'){
        //高峰期
        if(val.target.value< parseFloat(item.peakCountsSta) || val.target.value> parseFloat(item.peakCountsEnd) ){
          item.descError = '区间应在' + item.peakCountsSta+ '到' + item.peakCountsEnd +'之间'
        } else {
          item.descError = ''
        }
      } else {
        //平时期
        if(val.target.value< parseFloat(item.normCountsSta) || val.target.value> parseFloat(item.normCountsEnd) ){
          item.descError = '区间应在' + item.normCountsSta+ '到' + item.normCountsEnd +'之间'
        } else {
          item.descError = ''
        }
      }
      console.log(val.target.value)
      console.log(item)
    },
    async handleSubmit() {
      let checkFlag = false
      this.divideStarVoList.forEach(item=>{
        if(item.descError) {
          checkFlag = true
        }
      })
      if(checkFlag){
        return
      }
      const res = await divide_allot_user_upDivideRuleUser({
        divideStarVoList: this.divideStarVoList,
        allotStatus: this.allotStatus
      },{
        transformRequest: [
          function(data) {
            return JSON.stringify(data); //利用对应方法转换格式
          }
        ]
      });
      if (res.code === 1) {
        this.$emit("passBack");
        this.$Message.success('设置成功');
      } else {
        this.$Message.error(res.message);
      }
    },
    async get_divide_star_list() {
      const res = await divide_allot_user_getDivideUserByUserId();
      if (res.code === 1) {
        this.showFlag = true
        this.divideStarVoList = res.data.divideStarVoList
        this.allotStatus= res.data.allotStatus
        this.isPeak= res.data.isPeak
      } else {
        this.showFlag = false
        this.$emit("passBack");
        this.$Message.error(res.message)
      }
    }
  }
};
