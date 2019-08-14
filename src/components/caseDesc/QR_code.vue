<template>
  <div>
    <Modal
      class="jianmian"
      width="500"
      :value="model"
      class-name="jianmian_modal"
      @on-visible-change="del"
      title="二维码下载"
      :mask-closable="false"
    >
      <div class="imgtofile" ref="imgtofile">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <img :src="QR_CODE_INFO.qrCodeInfo" style="width: 300px; margin: 0 auto;" />
        <p class="qr_code_text">{{QR_CODE_INFO.userNmHid}}（{{QR_CODE_INFO.lastUserMblNo}}）</p>
        <p class="qr_code_text">金额：{{QR_CODE_INFO.totRepayAmt}}元</p>
      </div>
      <div slot="footer" class="gathering_footer">
        <Button size="small" @click="offlineScanPay_invalid" :loading="failure_loading">
          <span v-if="!failure_loading">二维码失效</span>
          <span v-else>失效中...</span>
        </Button>
        <Button type="primary" size="small" @click="toImage()" :loading="download_loading">
          <span v-if="!download_loading">二维码下载</span>
          <span v-else>下载中...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script src="./QR_code.js"></script>
<style lang="less">
@import "./index.less";
</style>
