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
      allotStatus: '',
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
    async handleSubmit() {
      let checkFlag = false
      this.divideStarVoList.forEach(item=>{
        if(!item.allotCounts){
          checkFlag = true
        }
      })
      if(checkFlag) {
        this.$Message.error('请填写相关值')
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
      } else {
        this.showFlag = false
        this.$emit("passBack");
        this.$Message.error(res.message)
      }
    }
  }
};
