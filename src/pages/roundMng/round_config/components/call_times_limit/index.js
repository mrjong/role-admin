export default {
  props: {
    parentData: {}
  },
  model: {
    prop: "parentData",
    event: "passBack"
  },
  data () {
    return {
      call_times_limit_checkbox: ['01', '02', '03'],
      ruleValidate: {},
      formItem:{},
    }
  },
  created () {
    console.log(this.parentData);
    this.formItem.debtorCallCeil = this.parentData.debtorCallCeil && Number(this.parentData.debtorCallCeil);
    this.formItem.urgencyCallCeil = this.parentData.urgencyCallCeil && Number(this.parentData.urgencyCallCeil);
    this.formItem.contactCallCeil = this.parentData.contactCallCeil && Number(this.parentData.contactCallCeil);
  },
  methods: {

  },
}
