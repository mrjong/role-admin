export default {
  name: 'CALL_START_TIME',
  props: {
    parentData: {},
    update_loading: Boolean,
  },
  model: {
    prop: "parentData",
    event: "passBack"
  },
  data() {
    return {
      formItem: {},
      ruleValidate: {
        floorFollowTime: [
          { required: true, message: "请选择时间", trigger: "change", }
        ]
      },
      update_loading_copy: false,
    }
  },
  created() {
  },
  watch: {
    update_loading(val) {
      this.$set(this, 'update_loading_copy', false);
    },
    parentData() {
      this.parentData.floorFollowTime && this.$set(this.formItem, 'floorFollowTime', this.parentData.floorFollowTime);
    }
  },
  methods: {
    handle_update() {
      this.$refs.formItem.validate((valid) => {
        if (valid) {
          this.update_loading_copy = true;
          this.$emit('passBack', 'CALL_START_TIME', this.formItem);
        }
      });
    },
  },
}
