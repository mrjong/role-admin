<template>
    <Modal
      :value="showIsConnection"
      :footer-hide="true"
      :closable=" false"

      >
      <div class="content">
        <div> 昨日回款率排名：{{}}。</div>
        <div v-if="isRecdCase==='1'"> 按照您的意向，共有{{finaAllotCounts}}笔案件需要接收，请操作！</div>
        <div v-else> 今日没有可分配的案件，加油吧，少年！</div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
          <Button
            type="primary"
            @click="handleSubmit('formItem')"
            style="width:80px"
            long
            size="small"
            :loading='submit_loading'
          >
            <span>{{isRecdCase==='1'? '知道了': '我要接案'}}</span>
          </Button>
        </div>
      </div>
    </Modal>
</template>

<script src="./index.js"></script>
<style src="./index.less" scoped  lang="less"></style>
