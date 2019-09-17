<template>
  <div>
    <Spin fix style="z-index: 1000;" v-if="spin_flag">
      <p class="spin">
        <span
          class="letter"
          :style="{'animation-delay': index === '0' || index === text.length -1? '0s': index/(2*text.length - 2) + 's'}"
          v-for="item,index in text"
          :key="item+index"
        >{{item}}</span>
      </p>
      <p class="fixed_text">系统准备案件中...</p>
      <div class="spin_dot dot_1"></div>
      <div class="spin_dot dot_2"></div>
      <div class="spin_dot dot_3"></div>
    </Spin>
  </div>
</template>

<script src='./index.js'></script>
<style src='./index.less'></style>
