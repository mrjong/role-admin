<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="loginName">
              <Input clearable v-model.trim="form.loginName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="loginPwd">
              <Input clearable type="password" v-model.trim="form.loginPwd" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="ios-lock"></Icon>
                </span>
              </Input>
            </FormItem>

            <FormItem prop="loginPic" class="imageCode">
              <Input
                clearable
                :maxlength="5"
                type="text"
                v-model="form.loginPic"
                placeholder="请输入图片验证码"
              >
                <span slot="prepend">
                  <Icon :size="14" type="ios-image"></Icon>
                </span>
              </Input>
              <div class="image-box">
                <img @click="login_code" :src="imageShow" alt>
              </div>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long :loading='login_loading'>
                <span v-if="!login_loading">登录</span>
                <span v-else>登录中...</span>
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { login, call_kt_get_seat, login_code } from "@/service/getData";

export default {
  data() {
    return {
      imageShow: "",
      key: "",
      login_loading: false,//登录按钮loading
      form: {
        loginName: "",
        loginPwd: "",
        loginPic: ""
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        loginPic: [
          { required: true, message: "请输入图片验证码", trigger: "blur" },
          {
            min: 5,
            type: "string",
            message: "长度不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.login_code();
    localStorage.removeItem("callData");
    localStorage.removeItem("callObj");
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=false");
    });
  },
  methods: {
    passWord() {
      let key = CryptoJS.enc.Hex.parse("63666262663331373130363634393864");
      let iv = CryptoJS.enc.Hex.parse("38313837386662346131393061333035");
      let enc = CryptoJS.AES.encrypt(this.form.loginPwd, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString();
      return enc;
    },
    async login_code() {
      const res = await login_code();
      if (res.code === 1) {
        this.imageShow = res.data.base64Code;
        this.key = res.data.key;
        this.form.loginPic = "";
      } else {
        this.$Message.error(res.message);
      }
    },
    async call_kt_get_seat(data) {
      const res = await call_kt_get_seat({
        loginName: this.form.loginName
      });
      console.log(res);
      if (res.code === 1) {
        if (res.data.seatType === "KT") {
          sessionStorage.setItem("seatType", "KT");
          localStorage.setItem("callData", JSON.stringify(res.data));
          this.call(res.data);
        } else if (res.data.seatType === "XZ") {
          sessionStorage.setItem("seatType", "XZ");
        } else if (res.data.seatType === "RL") {
          sessionStorage.setItem("seatType", "RL");
        }
        this.loginSuccess(data);
      } else {
        this.$Message.error(res.message);
      }
    },
    call(obj) {
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
      this.$store.commit("changeCallData", data);
    },
    /**
     * 初始化方法回调是否成功
     */
    initCallback(data) {
      if (data.successChange) {
        console.log("您已登录成功！");
      } else {
        // this.$Message.error('登录失败，请联系管理员！');
      }
    },
    loginSuccess(res) {
      this.$Message.success("登录成功!");
      window.$router = this.$router;
      this.$router.push({
        path: "/home/home/home"
      });
    },
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.login_loading = true;
          const res = await login({
            loginName: this.form.loginName,
            loginPwd: this.passWord(),
            code: this.form.loginPic,
            key: this.key
          });
          this.login_loading = false;
          if (res && res.code === 1) {
            Cookies.set("user", this.form.loginName);
            // Cookies.set("loginPwd", this.form.loginPwd);
            Cookies.set("SXF-TOKEN", res.data.token);
            Cookies.set("userType", res.data.userType);
            this.$store.commit(
              "setAvator",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
            );

            // this.call_kt_get_seat()
            Cookies.set("access", 1);
            this.call_kt_get_seat(res);
          } else if (res && res.code === 3010010) {
            this.login_code();

            this.$Message.error(res.message);
          } else {
            this.$Message.error(res.message);
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.imageCode {
  position: relative;
  padding-right: 130px;
  .image-box {
    position: absolute;
    top: 2px;
    right: -130px;
    z-index: 2;
    height: 30px;
    img {
      cursor: pointer;
      height: 100%;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
}
</style>
