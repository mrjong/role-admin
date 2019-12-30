<template>
  <div id="main" class="app-main">
    <div class="tel-box" v-if="showTel">
      <div class="tel-box-desc">
        <div class="tel-num">{{ telNoHid }}</div>
        <div class="tel-desc">{{ usrNameHid }}</div>
        <div class="tel-btn-box">
          <div class="item success" v-if="success">
            <div class="icon-box" @click="answer">
              <Icon type="ios-call"></Icon>
            </div>
          </div>
          <div class="item fail" v-if="fail">
            <div class="icon-box" @click="hangup">
              <Icon class="fail-icon" type="ios-call"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <spinModal :spin_data="spin_data"></spinModal>
    <router-view></router-view>
    <video
      loop
      ref="ring"
      preload="auto"
      style="position: absolute"
      src="src/libs/ring.wav"
    ></video>
    <audio
      id="playaudio"
      src="./libs/ring1.wav"
      loop="loop"
      style="display: none"
    ></audio>
    <video id="my-video" muted="muted" style="display:none"></video>
    <video id="peer-video" style="display:none"></video>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import spinModal from "@/components/spin_modal";
export default {
  components: {
    spinModal
  },
  data() {
    return {
      fail: false,
      success: false,
      showTel: false,
      spin_data: {},
      telNoHid: "***********",
      usrNameHid: "****",
      theme: this.$store.state.app.themeColor,
      text: "系统准备案件中...",
      DY_script: null
    };
  },

  mounted() {},
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "changeCallData",
      "changeSpinData",
      "changeInitDY",
      "changeDYScript"
    ])
  },

  methods: {},
  watch: {}
};
</script>

<style lang="less">
@import "./assets/styles/main.less";

html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.fail-icon {
  transform: rotate(132deg);
}
.tel-box {
  position: fixed;
  left: 0;
  bottom: 20px;
  width: 110px;
  height: 100px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 1000;

  line-height: 25px;
  .tel-box-desc {
    padding: 5px;
    text-align: center;
    position: absolute;
    top: 0;
    width: 100px;
    left: 0;
    .tel-num {
      font-weight: 600;
      font-size: 16px;
    }
    .tel-desc {
      color: #fff;
      font-size: 12px;
    }
    .tel-btn-box {
      margin: 5px auto;
      display: flex;
      .item {
        flex: 1;
        cursor: pointer;
        .icon-box {
          font-size: 20px;
          width: 30px;
          display: inline-block;
          line-height: 30px;
          border-radius: 50%;
          height: 30px;
          color: #fff;
        }
        &.fail {
          .icon-box {
            background: rgb(234, 86, 66);
          }
        }
        &.success {
          .icon-box {
            background: rgb(117, 213, 114);
          }
        }
      }
    }
  }
}
.notice-info {
  background: #409eff;
  border: none;
}
.notice-error {
  background: #ff6666;
  border: none;
}
.notice-success {
  // background: #67c23a;
  background: rgb(138, 204, 120);
  border: none;
}
.notice-success,
.notice-error,
.notice-info {
  .el-notification__title {
    color: #fff;
  }
  .el-notification__icon {
    color: #fff;
    line-height: 52px;
    height: 52px;
    font-size: 28px;
  }
  .el-icon-close {
    color: #fff;
  }
}
</style>
