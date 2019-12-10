export default {
  name: 'get-template',
  props: {
    getParentCodeList: Array,
  },
  data() {
    return {
      formRules: {},
      formItem: {},
    }
  },
  methods: {
    // 表单校验
    validateFormData() {
      return this.$refs.formItem.validate();
    },
  },
}
