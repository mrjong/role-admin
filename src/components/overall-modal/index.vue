<template>
  <div>
    <Modal
      :title="title"
      footer-hide
      :value="modal_flag"
      @on-visible-change="passBack"
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <slot></slot>
      <slot name="footer"></slot>
    </Modal>
  </div>
</template>

<script src='./index.js'></script>

<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
