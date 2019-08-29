<template>
    <Modal
      :value="true"
      :footer-hide="true"
      :closable=" false"
      width="60%"
      >
      <div class="content">
        <h3>系统将按照率值由高到低排列，请预估若您所处的段位，并设置若您在此段位次日想接收的新案件数量</h3>
        <p>平常时间：王者（默认12，可区间8-16）；钻石（默认8，可区间4-12）；青铜（默认4，可区间0-8）</p>
        <p>高峰时间：王者（默认18，可区间12-24）；钻石（默认12，可区间6-18）；青铜（默认6，可区间0-12）</p>
        <p>说明：上述值取值“维护结案数量”页面的数据</p>
        <div></div>
      </div>

    </Modal>
</template>

<script src="./index.js"></script>
<style src="./index.less" scoped></style>
