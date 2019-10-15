<template>
  <div id="main" class="app-main">
    <div class="tel-box" v-if="showTel">
      <div class="tel-box-desc">
        <div class="tel-num">{{telNoHid}}</div>
        <div class="tel-desc">{{usrNameHid}}</div>
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
    <spinModal :spin_data='spin_data'></spinModal>
    <router-view></router-view>
    <video loop ref="ring" preload="auto" style="position: absolute" src="src/libs/ring.wav"></video>
    <audio id="playaudio" src="./libs/ring1.wav" loop="loop" style="display: none"></audio>
    <video id="my-video" muted="muted" style="display:none"></video>
    <video id="peer-video" style="display:none"></video>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import util from "@/libs/util";
import { callout_hung_off, callout_fixed_hung_off} from "@/service/getData";
import spinModal from '@/components/spin_modal';
import Cookie from 'js-cookie';
export default {
  components: {
    spinModal,

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
    };
  },
  async created() {
    // this.$Message.config({
    //   duration: 2
    // });
    const h = this.$createElement;
    let callData = JSON.parse(localStorage.getItem("callData"));
    if (callData && callData.seatType === "KT" && callData.callType === "1") {
      this.call(callData);
    }

    let websocket = window.sessionStorage.getItem("websocket");
    if (websocket) {
      util.websocket();
      if (document.hidden !== undefined) {
        document.addEventListener("visibilitychange", () => {
          // true 表示离开  false表示回来，再进行初始化
          util.websocket();
        });
      }
    }
  },
  mounted() {
      if(window.location.href.indexOf("/case_desc_page?") !== -1 && sessionStorage.getItem('callSeat')){
        this.$nextTick(() =>{
          this.initDy()
        })
        if (document.hidden !== undefined) {
          document.addEventListener("visibilitychange", () => {
            console.log(document.hidden)
            if(!document.hidden){
              this.initDy()
              let nodeA = document.getElementById("dyCti")
              let callData = sessionStorage.getItem('callSeat') ? JSON.parse(sessionStorage.getItem('callSeat')) : this.token
              nodeA.src =
                `https://cti.duyansoft.com/ctibar.html?account_id=${callData.seatNo}&token=${callData.callToken}&nomsb=true&noNumberInput=true&noOpBtn=true&nopo=true&noNumberSelect=true`
              nodeA.height = 40
            }
          });
        }
      }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["changeCallData", 'changeSpinData'])
  },

  methods: {
    loadJs(url) {
      var se = document.createElement('script')
      se.id = 'dySdkScript'
      se.setAttribute('url', url)
      se.setAttribute('ctype', 'mini')
      se.src = "https://cti.duyansoft.com/syui/dysdk/dysdk2.js"
      // js 加载后执行
      se.onload = () => {
        DYSDK.init({stopBeforeunload:true});
        let nodeA = document.getElementById("dyCti")
        if (nodeA.parentNode.childNodes[1]) {
          nodeA.parentNode.removeChild(nodeA.parentNode.childNodes[1])
        }
        nodeA.height = 40
        nodeA.parentNode.style =
          'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); display: none'
        let that = this
        DYSDK.ctiLogined(function (data) {
          console.log('登录回调')
          console.log(DYSDK)
          console.log(data);
        });

        // 接通电话的回调函数，返回电话号码等信息
        DYSDK.callConfirm(function (data) {
          console.log('接通电话的回调函数')
          console.log(data)
        });

        // 拨打电话失败的回调函数，返回电话号码等信息
        DYSDK.callFail(function (data) {
          console.log('拨打电话失败')
          that.duyanHungOff(data.uuid, nodeA)
          console.log(data)
        });

        // 电话结束的回调函数，返回电话号码等信息
        DYSDK.callEnd(function (data) {
          console.log("电话结束")
          that.duyanHungOff(data.uuid, nodeA)
          console.log(data)
        });
        // 正在拨打中的回调函数，返回电话号码等信息
        DYSDK.callConnecting(function (data) {
          console.log("正在拨打中的回调函数");
          sessionStorage.setItem('callId', data.uuid)
          if(data.errorCode){
            that.duyanHungOff(data.uuid, nodeA)
            that.$Message.error({
              content: data.errorCode,
              duration: 6
            })
          }
          console.log(data)
        });
        DYSDK.ready(function(data){
        })

        DYSDK.getPhonelines((data) => {
          console.log(data)
        })
      }
      document.body.appendChild(se);
    },
    initDy() {
      //加载度言
      let duyanData = sessionStorage.getItem('callSeat') ? JSON.parse(sessionStorage.getItem('callSeat')) : this.token
      this.loadJs(`https://cti.duyansoft.com/ctibar.html?account_id=${duyanData.seatNo}&token=${duyanData.callToken}&nomsb=true&noNumberInput=true&noOpBtn=true&nopo=true&noNumberSelect=true`)
    },
    duyanHungOff(uid, dom) {
      callout_fixed_hung_off({
        id: sessionStorage.getItem('recordIdDY'),
        actionId: uid
      }).then(res=>{
        setTimeout(()=>{
          dom.parentNode.style =
            'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); display: none'
        },300)
      })
    },

    call(obj) {
      var config = {
        uname: obj.loginName,
        pwd: obj.password,
        debug: true,
        isAutoAnswer: true,
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
        localStorage.removeItem("callObj");
        console.log("您已登录成功！app.vue");
      } else {
        // this.$Message.error('登录失败，请联系管理员！');
      }
    },

    answer() {
      CallHelper.answer(data => {
        console.log(data);
        this.success = false;
        this.fail = true;
      });
    },
    hangup() {
      let callData = JSON.parse(localStorage.getItem("callData"));
      if (callData.callType === "2") {
        this.callout_kt_hung_off();
      }
      this.showTel = false;
      CallHelper.hangup();
      this.fail = false;
      this.success = false;
      // 清空展示
      localStorage.removeItem("callObj");
    },
    play() {
      this.$refs.ring.play();
    },
    pause1() {
      this.$refs.ring.pause();
    },
    // 科天新路由模式的挂断
    async callout_kt_hung_off() {
      let callData = JSON.parse(localStorage.getItem("callData"));
      const res = await callout_hung_off({
        seatType: callData.seatType, //坐席类型
        actionId: callData.actionId,
        callno: callData.seatNo //坐席号
      });
      if (res.code === 1) {
      } else {
        this.$Message.error(res.message);
      }
    },

  },
  watch: {
    changeSpinData(res) {
      this.spin_data = res;
    },
    changeCallData(res) {
      if (res.msg) {
        console.log("电话状态======>", res);
        this.pause1();
        switch (res.msg) {
          case "READY":
            // 坐席就绪
            this.showTel = false;
            localStorage.removeItem("callObj");
            break;
          case "RINGING":
            // 坐席振铃
            if (res.data) {
              const { direction, phoneNum } = res.data;
              if (direction == "ob") {
                // 呼出
                console.log(localStorage.getItem("callObj"));
                if (localStorage.getItem("callObj")) {
                  let callObj = JSON.parse(localStorage.getItem("callObj"));
                  console.log(callObj);
                  this.telNoHid = callObj.telNoHid || "***********";
                  this.usrNameHid = callObj.usrNameHid || "***";
                }
                this.answer();
              } else if ("ib" == direction) {
                // 呼入
                (this.telNoHid = res.data.phoneNum || "***********"),
                  (this.usrNameHid = res.data.area || "***"),
                  this.play();
                this.fail = true;
                this.success = true;
              }
            }
            this.showTel = true;
            break;
            // 触达第二端
          case 'ANSWERED':
            Cookie.get('collectCategory') === 'M01' && this.$store.commit("changeCallRecord", {
              seatType: 'KT',
              status: '0'
            });
            break;
            // 接听状态
          case "REALTIME":
            Cookie.get('collectCategory') === 'M01' && this.$store.commit("changeCallRecord", {
              seatType: 'KT',
              status: '1'
            });
            break;
          case "HANGUP":
            // 坐席挂机
            let callData = JSON.parse(localStorage.getItem("callData"));
            if (callData.callType === "2") {
              this.callout_kt_hung_off();
            }
            localStorage.removeItem("callObj");
            this.showTel = false;
            this.fail = false;
            this.success = false;
            break;

          default:
            localStorage.removeItem("callObj");
            break;
        }
        localStorage.removeItem("callObj");
      } else {
        this.$Message.error("拨打电话初始化异常");
      }
    }
  },
  beforeDestroy() {}
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
