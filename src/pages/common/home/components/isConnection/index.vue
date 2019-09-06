<template>
    <Modal
      :value="showIsConnection"
      :footer-hide="true"
      :closable=" false"
      :mask-closable='false'
      >
      <div class="content">
        <!--<div> 昨日回款率排名：{{}}。</div>-->
        <div> {{webSocketData.msgContent}}</div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
          <Button
            type="primary"
            @click="handleSubmit()"
            style="width:80px"
            long
            size="small"
            :loading='submit_loading'
          >
            <span v-if="webSocketData.template !== 'SYS_MSG_CASE_ALLOT_NO'">我要接案</span>
            <span v-else>知道了</span>
          </Button>
        </div>
      </div>
    </Modal>
</template>

<script src="./index.js"></script>
<style src="./index.less" scoped  lang="less"></style>
