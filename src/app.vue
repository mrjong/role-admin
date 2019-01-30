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
        <div class="tel-num">{{telNo}}</div>
        <div class="tel-desc">{{telStatus}}</div>
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
              <Icon type="ios-telephone"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fail: false,
      success: false,
      showTel: false,
      telNo: '***********',
      telStatus: '****',
      theme: this.$store.state.app.themeColor
    }
  },
  mounted() {

  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'changeCallData'
    ])
  },
  methods: {
    answer() {
      CallHelper.answer((data) => {
        console.log(data);
        this.success = false
        this.fail = true
      });
    },
    hangup() {
      CallHelper.hangup();
      this.fail = false
      this.success = false
    }
  },
  watch: {
    changeCallData(res) {
      if (res.msg) {
        console.log('电话状态======>', res)
        switch (res.msg) {
          case 'READY':
            // 坐席就绪
            this.showTel = false
            break;
          case 'RINGING':
            // 坐席振铃
            if (res.data) {
              const { direction, phoneNum } = res.data
              if (direction == 'ob') {
                // 呼出
                this.answer()
              } else if ("ib" == direction) {
                // 呼入
                this.fail = true
                this.success = true
              }
            }
            this.showTel = true
            break;
          case 'HANGUP':
            // 坐席挂机
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
