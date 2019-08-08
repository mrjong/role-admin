<template>
  <Modal
    :value="showPhone"
    :footer-hide="true"
    @on-cancel="handle_cancel"
    >
    <div class="tel-box-desc">
      <div class="tel-btn-box" style="display: flex">
        <Input  placeholder="please enter your number" style="margin-right: 20px" />
        <div class="item success"  v-if="success">
          <div class="icon-box" @click="answer" >
            <Icon type="ios-call"></Icon>
          </div>
        </div>
        <div class="item fail" v-else>
          <div class="icon-box" @click="hangup" >
            <Icon class="fail-icon" type="ios-call"></Icon>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

