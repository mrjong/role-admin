export default {
  name: 'CALL_TIMES_LIMIT',
  props: {
    parentData: {},
    update_loading: Boolean,
  },
  model: {
    prop: "parentData",
    event: "passBack"
  },
  data () {
    return {
      call_times_limit_checkbox: ['01', '02', '03'],
      ruleValidate: {},
      formItem:{
      },
      update_loading_copy: false,//修改loading
    }
  },
  mounted () {
  },
  watch: {
    update_loading(val) {
      this.$set(this, 'update_loading_copy', false);
    },
    parentData() {
      this.parentData.debtorCallCeil && this.$set(this.formItem, 'debtorCallCeil', Number(this.parentData.debtorCallCeil));
      this.parentData.urgencyCallCeil && this.$set(this.formItem, 'urgencyCallCeil', Number(this.parentData.urgencyCallCeil));
      this.parentData.contactCallCeil && this.$set(this.formItem, 'contactCallCeil', Number(this.parentData.contactCallCeil));
    }
  },
  methods: {
    input_blur(val, type) {
      console.log(val)
      if (!val || val === '') {
        this.formItem[type] = 0;
        return
      };
      // this.$set(this.formItem, type, String(val))
    },
    handle_update() {
      this.update_loading_copy = true;
      this.$emit('passBack', 'CALL_TIMES_LIMIT', this.formItem);
    },
  },
}
