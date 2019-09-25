import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'CASE_PUSH_ORDER',
  mixins: [sysDictionary],
  props: {
    parentData: {}
  },
  model: {
    prop: "parentData",
    event: "passBack"
  },
  data() {
    return {
      getDirList: ['CASE_SORT_RULE'],
      getDirObj: {},
      sortCode: 'OVERDUE_DAYS',
      formItem: {
        configSortList: [],
      },
      isAsc: '1',
      order: 'up',
    }
  },
  created() {

  },
  watch: {
    parentData() {
      this.parentData.configSortList && this.$set(this, 'isAsc', this.parentData.configSortList[0].isAsc === '1' ? true : false);
      this.parentData.configSortList && this.$set(this.formItem, 'configSortList', this.parentData.configSortList);
    }
  },
  methods: {
    switch_change(flag) {
      this.$set(this.formItem.configSortList[0], 'isAsc', flag ? '1' : '0');
      this.$set(this.formItem.configSortList[0], 'sortCode', this.sortCode);
      this.$emit('passBack', 'CASE_PUSH_ORDER', this.formItem)
    }
  },
}
