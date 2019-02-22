<template>
  <div
    id="main"
    class="app-main"
  >
    <div
      class="tel-box"
      v-if="showTel"
    >
      <div class="tel-box-desc">
        <div class="tel-num">{{telNoHid}}</div>
        <div class="tel-desc">{{usrNameHid}}</div>
        <div class="tel-btn-box">
          <div
            class="item success"
            v-if="success"
          >
            <div
              class="icon-box"
              @click="answer"
            >
              <Icon type="ios-telephone"></Icon>
            </div>
          </div>
          <div
            class="item fail"
            v-if="fail"
          >
            <div
              class="icon-box"
              @click="hangup"
            >
              <Icon
                class="fail-icon"
                type="ios-telephone"
              ></Icon>
            </div>
          </div>
        </div>
      </div>

      <!-- <video
        src="@/libs/ring.wav"
        controls="controls"
      >
        您的浏览器不支持 video 标签。
      </video> -->
    </div>
    <router-view></router-view>
    <video
      loop
      ref="ring"
      preload="auto"
      src="src/libs/ring.wav"
    >
    </video>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import ring from '@/libs/ring.wav'
export default {
  data() {
    return {
      fail: false,
      success: false,
      showTel: false,
      telNoHid: '***********',
      usrNameHid: '****',
      theme: this.$store.state.app.themeColor
    }
  },
    created() {
    if (localStorage.getItem('callData')) {
      this.call(JSON.parse(localStorage.getItem('callData')))
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'changeCallData'
    ])
  },

  methods: {
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
      this.$store.commit('changeCallData', data)
    },
    /**
    * 初始化方法回调是否成功
    */
    initCallback(data) {
      if (data.successChange) {
        console.log('您已登录成功！app.vue');
      } else {
        this.$Message.error('登录失败，请联系管理员！');
      }
    },
    answer() {
      CallHelper.answer((data) => {
        console.log(data);
        this.success = false
        this.fail = true
      });
    },
    hangup() {
        this.showTel =false
      CallHelper.hangup();
      this.fail = false
      this.success = false
      // 清空展示
      localStorage.removeItem('callObj')
    },
    play() {
      this.$refs.ring.play()
    },
    pause1() {
      this.$refs.ring.pause();
    }
  },

  watch: {
    changeCallData(res) {
      if (res.msg) {
        console.log('电话状态======>', res)
        this.pause1()
        switch (res.msg) {
          case 'READY':
            // 坐席就绪
            this.showTel = false
            break;
          case 'RINGING':
            console.log(localStorage.getItem('callObj'))
            if (localStorage.getItem('callObj')) {
              let callObj = JSON.parse(localStorage.getItem('callObj'))
              console.log(callObj)
              this.telNoHid = callObj.telNoHid || this.telNoHid
              this.usrNameHid = callObj.usrNameHid || this.usrNameHid
            }
            // 坐席振铃
            if (res.data) {
              const { direction, phoneNum } = res.data
              if (direction == 'ob') {
                // 呼出
                this.answer()
              } else if ("ib" == direction) {
                // 呼入
                this.play()
                this.fail = true
                this.success = true
              }
            }
            this.showTel = true
            break;
          case 'HANGUP':
            // 坐席挂机
            localStorage.removeItem('callObj')
            this.showTel = false
            this.fail = false
            this.success = false
            break;

          default:
            break;
        }
      } else {
        this.$Message.error('拨打电话初始化异常')
      }
    }
  },
  beforeDestroy() { },
}
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
  width: 100px;
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
</style>
