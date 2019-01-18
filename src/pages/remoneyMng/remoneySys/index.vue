<template>
  <Form
    ref="formValidate"
    :model="formValidate"
    :rules="ruleValidate"
    :label-width="80">
    <Form-item label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
    </Form-item>
    <Form-item label="邮箱" prop="mail">
      <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
    </Form-item>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          name: '',
          mail: '',
        },
        ruleValidate: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入个人介绍', trigger: 'blur' },
            { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
