export default {
  data() {
    return {
      sortCode: '',
      isAsc: '1',
      order: 'up',
      ruleList: [
        {
          label: '逾期天数',
          value: '1'
        },
        {
          label: '拨打轮次',
          value: '2'
        },
      ]
    }
  },
  methods: {
    switch_change(flag) {

    }
  },
}
