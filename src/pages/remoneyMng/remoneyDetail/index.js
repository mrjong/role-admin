
export default {
  name: 'remoney_detail',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      stateList: [
        {
          value: 'part',
          label: '部分还款'
        },
        {
          value: 'all',
          label: '已结清'
        },
      ],
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    }
  }
}
