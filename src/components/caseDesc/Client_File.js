import { queryInteractive, archives_queryOutbound, archives_queryDebt, archives_queryLinkHistory, archives_queryInteractive } from '@/service/case-detail-api';

export default {
  name: 'client-file',
  props: ['ishow', 'userId'],
  data() {
    return {
      showPanel: true
    }
  },
  created() {
    console.log(this.ishow)
  },
  methods: {
    del() {
      this.$emit('passBack', 'Client_File')
    },
    // 收入情况
    queryInteractive() {},
    // 外呼情况
    archives_queryOutbound() {},
    //债务情况
    archives_queryDebt() {},
    //历史沟通
    archives_queryLinkHistory() {},
    //交互信息
    archives_queryInteractive() {},
  },
}
