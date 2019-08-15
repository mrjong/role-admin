import {callOut, hangUp, retriveCall, holdCall, makeIdle} from '@/libs/news_crowd'


export default {
  props: ["showPhone"],
  data() {

    return {
      phoneNumber: '',
      success: true,
    }

  },
  created() {
    // this.getList();
  },
  methods: {
    callOut() {
      if(!this.phoneNumber){
        this.$Message.error('请输入手机号')
        return
      }
      this.success=false
      callOut(this.phoneNumber)
    },

    hangup() {
      this.success=true
      hangUp()
    },
    handle_cancel(){
      this.$emit("passBack");
    },


  }
};
