export default {
  name: 'get-template',
  props: {
    getParentCodeList: Array,
  },
  data() {
    return {
      formRules: {
        templType: [{ required: true, message: '请选择模板类型', trigger: 'change' },],
        templCode: [{ required: true, message: '请填写模板编号', trigger: 'blur' },]
      },
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
