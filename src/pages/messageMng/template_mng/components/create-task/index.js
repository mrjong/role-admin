export default {
  name: 'get-template',
  props: {
    getParentCodeList: Array,
  },
  data() {
    return {
      formRules: {
        jobType: [{required: true, message: '请选择任务类型', trigger:'change'},],
        jobName: [{required: true, message: '请填写任务名称', trigger:'blur'},],
        jobScene: [{required: true, message: '请选择使用场景', trigger:'change'},],
        triggerNode: [{required: true, message: '请选择节点', trigger:'change'},],
        jobTime: [{required: true, message: '请选择发送时间', trigger:'change'},],
      },
      formItem: {},
    }
  },
  methods: {
    // 表单校验
    validateFormData() {
      debugger
      return this.$refs.formItem.validate();
    },
  },
}
