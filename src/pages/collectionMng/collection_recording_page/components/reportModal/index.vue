<template>
  <div>
    <Modal
      :value="JSON.stringify(dataReport) !== '{}'"
      class-name="user_info_form_modal"
      :mask-closable="false"
      @on-cancel="del"
      :footer-hide="true"
    >
      <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
        <span>质检报告</span>
      </p>
      <div>
        <!-- 用户信息 -->
        <Card class="vue-panel panel_list" :dis-hover="true">
          <p class="base_info">基本信息</p>
          <div class="base_content">
            <div><label>录音编码:</label><span>12131231</span> </div>
            <div><label>数据集名称:</label><span>12131231</span> </div>
          </div>
          <div class="base_content">
            <div><label>质检结果:</label><span>12131231</span> </div>
            <div><label>质检得分:</label><span>12131231</span> </div>
          </div>
          <div class="base_content">
            <div ><label>违规级别:</label><span>12131231</span> </div>
            <div ><label>质检时间:</label><span>12131231</span> </div>
          </div>
          <div class="base_content">
            <div ><label>稽核人:</label><span>12131231</span> </div>
          </div>
          <p class="base_info" style="margin-top: 20px">质检明细</p>
        </Card>
        <Table :data="tableData" border :columns="tableColumns" stripe size="small" align="center" style="margin-bottom: 20px"></Table>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>

<style lang="less" scoped>
  .user_info_form_modal {
    .vue-panel {
      border: none;
    }
    .ivu-form {
      min-height: 250px;
    }
  }
  /deep/ .ivu-modal {
    top: 20%;
  }
  .base_info {
    color: #000000;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .base_content {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    padding-right: 10%;
    margin-bottom: 5px;
  }
  /deep/ .ivu-modal-body {
    padding-top: 10px;
  }

</style>
