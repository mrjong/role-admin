import { archives_queryIncome, archives_queryOutbound, archives_queryDebt, archives_queryLinkHistory, archives_archives_queryIncome } from '@/service/case-detail-api';

export default {
  name: 'client-file',
  props: ['ishow', 'userId', 'caseNo', 'billNo'],
  data() {
    return {
      showPanel: true,
      archives_queryIncome_data: {},//收入情况
      archives_queryOutbound_data: [],//外呼情况
      archives_queryDebt_data: [],//债务情况
      archives_queryLinkHistory_data: [],//历史沟通
    }
  },
  created() {
    console.log(this.ishow);
    this.archives_queryIncome();
    this.archives_queryOutbound();
    this.archives_queryDebt();
    this.archives_queryLinkHistory();
  },
  methods: {
    del() {
      this.$emit('passBack', 'Client_File')
    },
    deal_title(type, name) {
      let titleName = null;
      switch (type) {
        case 'archives_queryIncome':
          name === 'workInfo' && (titleName = '职业：');
          name === 'workDtlAddr' && (titleName = '工作地址：');
          name === 'idDtlAddr' && (titleName = '户籍地址：');
          name === 'property' && (titleName = '个人财产：');
          return titleName;
        default:
          break;
      }
    },
    // 收入情况
    archives_queryIncome() {
      archives_queryIncome({
        userId: this.userId,
      }).then((res) => {
        if (res.code === 1) {
          this.archives_queryIncome_data = res.data;
        } else {
          this.$Message.error(res.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 外呼情况
    archives_queryOutbound() {
      archives_queryOutbound({
        userId: this.userId,
      }).then(res => {
        if (res.code === 1) {
          this.archives_queryOutbound_data = res.data;
        } else {
          this.$Message.error(res.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //债务情况
    archives_queryDebt() {
      archives_queryDebt({
        userId: this.userId,
        billNo: this.billNo
      }).then(res => {
        if (res.code === 1) {
          this.archives_queryDebt_data = res.data;
        } else {
          this.$Message.error(res.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //历史沟通
    archives_queryLinkHistory() {
      archives_queryLinkHistory({
        userId: this.userId,
      }).then(res => {
        if (res.code === 1) {
          this.archives_queryLinkHistory_data = res.data;
        } else {
          this.$Message.error(res.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //交互信息
    archives_queryInteractive() {},
  },
}
