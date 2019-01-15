<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input clearable v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input clearable type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import { login } from "@/service/getData"

export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await login({
            username: this.form.userName,
            password: this.form.password
          })
          if (res && res.code === 200) {
            Cookies.set("user", this.form.userName)
            Cookies.set("password", this.form.password)
            Cookies.set("token", res.data.token)
            this.$store.commit(
              "setAvator",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
            )
            if (res && res.data && res.data.role === 1) {
              Cookies.set("access", 1)
            } else {
              Cookies.set("access", 0)
            }
            window.VueRouter=this.$router
            this.$router.push({
              name: "home_index"
            })
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
