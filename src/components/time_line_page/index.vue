<template>
  <div class="panel_list">
    <p v-if="view_time" class="time_line_view_time">最近查看时间：{{view_time | formatDate}}</p>
    <p v-else class="time_line_view_time">最近无查看记录</p>
    <p class="time_line_view_time" v-if="login_count">总操作次数：{{login_count}}</p>
    <ul class="time_line_wrap" :style="{'padding-left': list.length>12? '55%': '45%'}">
      <li class="ivu-timeline-item" v-for="(item,index) in list" :key="index">
        <span
          :class="item.hasProgress?'timeline_line':'timeline_line_unproceed'"
          :style="{'visibility': index>0? 'visible': 'hidden'}"
        ></span>
        <span :class="item.hasProgress?'timeline_circle':'timeline_circle_unproceed'"></span>
        <div
          :class="(index + 1)%2 === 0?'timeline_dec_top':'timeline_dec_bottom'"
          v-if="item.hasProgress"
        >
          <p class="time">{{item.showTime}}</p>
          <p class="content">{{item.progressTitle}}</p>
          <p
            class="content"
            :class="[item.smsStatus === 'F'? 'message_error': item.smsStatus === 'S'? 'message_success': item.smsStatus === 'W'? 'message_sending': '']"
          >{{deal_message(item.smsStatus)}}</p>
        </div>
        <div :class="(index + 1)%2 === 0?'timeline_dec_top':'timeline_dec_bottom'" v-else>
          <p class="time">{{item.preShowTime}}</p>
          <p class="content">{{item.preProgressTitle}}</p>
          <p
            class="content"
            :class="[item.smsStatus === 'F'? 'message_error': item.smsStatus === 'S'? 'message_success': item.smsStatus === 'W'? 'message_sending': '']"
          >{{deal_message(item.smsStatus)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["time_line_data"],
  data() {
    return {
      list: [],
      view_time: null,
      login_count: null
    };
  },
  created() {
    this.list = this.time_line_data.list;
    this.view_time = this.time_line_data.lastViewTime;
    this.login_count = this.time_line_data.loginCount;
  },
  methods: {
    deal_message(statu) {
      switch (statu) {
        case "F":
          return "短信发送失败";
          break;
        case "S":
          return "短信发送成功";
          break;
        case "W":
          return "短信发送中";
          break;
        default:
          return null;
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.time_line_view_time {
  padding-left: 5px;
  font-size: 14px;
  color: #333;
}
.time_line_wrap > li:nth-child(1) {
  margin-left: 150px !important;
}
.time_line_wrap {
  // width: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px 0 50%;
  box-sizing: border-box;
  overflow-x: auto;
  height: 200px;
  flex-wrap: nowrap;
  .ivu-timeline-item {
    flex: 0 0 125px;
    min-height: 33px;
    list-style: none;
    position: relative;
    box-sizing: border-box;
    span {
      display: inline-block;
      // vertical-align: middle;
    }

    .timeline_dec_top {
      position: absolute;
      top: -50px;
      right: -70px;
      z-index: 100;
    }
    .timeline_dec_bottom {
      position: absolute;
      bottom: -50px;
      right: -70px;
      z-index: 100;
    }
    .timeline_circle {
      color: #2d8cf0;
      width: 13px;
      height: 13px;
      border: 1px solid transparent;
      border-radius: 50%;
      border-color: #2d8cf0;
      background-color: #fff;
      position: absolute;
      right: 0;
      top: 7px;
    }
    .timeline_circle_unproceed {
      color: #ddd;
      width: 13px;
      height: 13px;
      border: 1px solid transparent;
      border-radius: 50%;
      border-color: #ddd;
      background-color: #fff;
      position: absolute;
      right: 0;
      top: 7px;
    }
    .timeline_line {
      height: 1px;
      width: 100%;
      border-bottom: 1px solid #2d8cf0;
      background: #2d8cf0;
    }
    .timeline_line_unproceed {
      // height: 1px;
      width: 100%;
      border-bottom: 2px dashed #ddd;
      // background: #e8eaec;
    }
    .content,
    .time {
      font-size: 12px;
      color: #333;
      text-align: center;
      width: 150px;
    }
    .message_success {
      color: #1dd37c;
    }
    .message_error {
      color: #fe6666;
    }
    .message_sending {
      color: #61aaed;
    }
  }
}
</style>
