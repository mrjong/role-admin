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
import { login, call_kt_get_seat } from "@/service/getData"

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
    async call_kt_get_seat(data) {
      const res = await call_kt_get_seat({
        loginName: this.form.loginName
      })
      console.log(res)
      if (res.code === 1) {
        if (res.data.seatType === 'KT') {
          sessionStorage.setItem('seatType', 'KT');
          this.call(res.data);
          this.loginSuccess(data);
        } else {
          sessionStorage.setItem('seatType', 'RL')
          this.loginSuccess(data)
        }
      } else {
        this.$Message.error(res.message)
      }
    },
    call(obj) {
      sessionStorage.setItem('callData', JSON.stringify(obj))
      var config = {
        uname: obj.loginName,
        pwd: obj.password,
        debug: true,
        isAutoAnswer: false,
        stateListenerCallBack: this.stateCallback,
        forceAnswerWhenRing: false, // 是否振铃自动接通
        autoReady: true,
        url: obj.url
      };
      CallHelper.init(config, this.initCallback);

    },
    /**
* 设置状态监听回调
*/
    stateCallback(data) {
      this.$store.commit('changeCallData', data)
    },
    /**
    * 初始化方法回调是否成功
    */
    initCallback(data) {
      if (data.successChange) {
        console.log('您已登录成功！');
      } else {
        console.log('登录失败，请联系管理员！');
      }
    },
    loginSuccess(res) {
      this.$Message.success('登录成功!');
      window.$router = this.$router
      this.$router.push({
        path: "home"
      })
    },
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await login({
            loginName: this.form.loginName,
            loginPwd: this.form.loginPwd
          })
          if (res && res.code === 1) {
            Cookies.set("user", this.form.loginName)
            Cookies.set("loginPwd", this.form.loginPwd)
            Cookies.set("SXF-TOKEN", res.data)
            this.$store.commit(
              "setAvator",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
            )

            // this.call_kt_get_seat()
            Cookies.set("access", 1)
            this.call_kt_get_seat(res)
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
