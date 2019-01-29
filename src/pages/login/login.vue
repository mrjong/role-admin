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
  created() {
  },
  methods: {
    call() {

      // 初始化打电话
      let url = 'https://zx.ketianyun.com'
      let loginName = '01@suixingfu.com'
      let password = '123456'
      var config = {
        uname: loginName,
        pwd: password,
        debug: true,
        isAutoAnswer: true,
        stateListenerCallBack: stateCallback,
        forceAnswerWhenRing: false,
        autoReady: true,
        url: url
      };
      /**
* 设置状态监听回调
*/
      function stateCallback(data) {
        console.info(data);
        if (data.msg === "READY") {

        } else if (data.msg === "RINGING") {
          console.log('振铃', data.data.phoneNum)
          // document.getElementById('callnum').innerHTML = data.data.phoneNum;
        } else if (data.msg === "HANGUP") {
          console.log('挂断')
          // document.getElementById('calluuid').innerHTML = '';
          // document.getElementById('msg').innerHTML = '';
          // document.getElementById('callnum').innerHTML = '';
        }
      }
      /**
* 初始化方法回调是否成功
*/
      function initCallback(data) {
        console.info('---------------------');
        if (data.successChange) {
          //显示本机号码
          // document.getElementById('agentnum').innerHTML = data.data.agentnumber;
          //电话条ready状态变更
          //CallHelper.ready();
          console.log('您已登录成功！');
        } else {
          console.log('登录失败，请联系管理员！');
        }
      }

      CallHelper.init(config, initCallback);
    },
    handleSubmit() {
<<<<<<< HEAD
      // this.$Message.success('登录成功!');
      // Cookies.set("user", '22222222222')
      // Cookies.set("loginPwd", '22222222')
      // Cookies.set("SXF-TOKEN", '22222222222222222')
      // this.$store.commit(
      //   "setAvator",
      //   "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
      // )
      // this.call()
      // Cookies.set("access", 1)
      // window.$router = this.$router
      // this.$router.push({
      //   name: "home"
      // })
      // return
=======
>>>>>>> 5cd67655c05f1656fad9678f46af6a4997d0e91f
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await login({
            loginName: this.form.loginName,
            loginPwd: this.form.loginPwd
          })
          if (res && res.code === 1) {
            this.$Message.success('登录成功!');
            Cookies.set("user", this.form.loginName)
            Cookies.set("loginPwd", this.form.loginPwd)
            Cookies.set("SXF-TOKEN", res.data)
            this.$store.commit(
              "setAvator",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
            )
            this.call()
            Cookies.set("access", 1)
            window.$router = this.$router
            this.$router.push({
              name: "home"
            })
          } else {
            this.$Message.error(res.message);
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
