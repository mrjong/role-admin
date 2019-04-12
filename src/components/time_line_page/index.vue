<template>
  <div class="panel_list">
    <ul class="time_line_wrap">
      <li class="ivu-timeline-item" v-for="(item,index) in list" :key="index">
        <span class="timeline_line" :style="{'visibility': index>0? 'visible': 'hidden'}"></span>
        <span class="timeline_circle"></span>
        <div :class="(index + 1)%2 === 0?'timeline_dec_top':'timeline_dec_bottom'">
          <p class="time">2011年10月5日</p>
          <p class="content">史蒂夫·乔布斯去世</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [1,2,3,4,5,6,7]
    }
  }
};
</script>

<style lang="less" scoped>
.time_line_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px 0 20px;
  overflow-x: auto;
  height: 200px;
  .ivu-timeline-item {
    flex: 1;
    max-width: 200px;
    list-style: none;
    position: relative;
    span {
      display: inline-block;
    }
    .timeline_dec_top {
      position: absolute;
      top: -50px;
      right: -30%;
      z-index: 100;
    }
    .timeline_dec_bottom {
      position: absolute;
      bottom: -50px;
      right: -30%;
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
    .timeline_line {
      height: 2px;
      width: 100%;
      background: #e8eaec;
    }
  }
}
</style>
