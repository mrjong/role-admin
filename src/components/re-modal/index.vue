<template>
  <div>
    <div v-if="data" class="modal_wrap">
      <Modal v-model="data" title="录音播放" @on-ok="ok" @on-cancel="cancel" :transfer="false">

      </Modal>
    </div>
  </div>
</template>

<style lang="less">
.video-player-box,
.video-js, #modal_wrap{
  width: 100%;
  box-sizing: border-box;
}
</style>

<script>
export default {
  props: ['data']
}
</script>
