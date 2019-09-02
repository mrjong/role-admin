import { mapGetters } from "vuex";
import {
  cases_allot_take_case,
} from '@/service/getData';
export default {
  components: {

  },
  watch: {
    changeWebSocketData(val) {
      this.webSocketData = val
      console.log(val)
      this.showIsConnection = true
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["changeWebSocketData"])
  },
  name: 'isConnection',
  data() {
    return {
      submit_loading: false,
      webSocketData: {},
      showIsConnection: false,
    };
  },
  created() {
  },
  methods: {
    async handleSubmit() {
      if(this.webSocketData.template === 'SYS_MSG_CASE_ALLOT_NO'){
        this.showIsConnection = false
        return
      }
      let params =JSON.parse(this.webSocketData.params)
      const res = await cases_allot_take_case({
        ...params
      });
      if (res.code === 1) {
        this.showIsConnection = false
        this.$Message.success('接案成功');
      } else {
        this.$Message.error(res.message);
      }
    },

  }
};
