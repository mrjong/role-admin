<style lang="less">
@import "./login.less";
</style>

<template>
  <div
    class="login"
    @keydown.enter="handleSubmit"
  >
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form
            ref="loginForm"
            :model="form"
            :rules="rules"
          >
            <FormItem prop="loginName">
              <Input
                clearable
                v-model="form.loginName"
                placeholder="请输入用户名"
              >
              <span slot="prepend">
                <Icon
                  :size="16"
                  type="person"
                ></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="loginPwd">
              <Input
                clearable
                type="password"
                v-model="form.loginPwd"
                placeholder="请输入密码"
              >
              <span slot="prepend">
                <Icon
                  :size="14"
                  type="locked"
                ></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button
                @click="handleSubmit"
                type="primary"
                long
              >登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import md5 from "js-md5"
import { login } from "@/service/getData"

export default {
  data() {
    return {
      form: {
        loginName: "",
        loginPwd: ""
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginPwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
                this.$Message.success('登录成功!');
            Cookies.set("user", this.form.loginName)
            Cookies.set("loginPwd", this.form.loginPwd)
            Cookies.set("SXF-TOKEN", '222222222222')
            this.$store.commit(
              "setAvator",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
            )
            Cookies.set("access", 1)
            window.VueRouter = this.$router
            this.$router.push({
              name: "home"
            })

        //   const res = await login({
        //     loginName: this.form.loginName,
        //     loginPwd: md5(this.form.loginPwd)
        //   })
        //   if (res && res.code === 1) {
        //     this.$Message.success('登录成功!');
        //     Cookies.set("user", this.form.loginName)
        //     Cookies.set("loginPwd", this.form.loginPwd)
        //     Cookies.set("SXF-TOKEN", res.data)
        //     this.$store.commit(
        //       "setAvator",
        //       "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
        //     )
        //     Cookies.set("access", 1)
        //     window.VueRouter = this.$router
        //     this.$router.push({
        //       name: "home"
        //     })
        //   } else {
        //     this.$Message.success(res.message);
        //   }
        }
      })
    }
  }
}
</script>

<style>
</style>
