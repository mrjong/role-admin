<template>
  <Tabs :value="name" style="background: #fff; border-radius: 4px;">
    <TabPane label="系统任务" name="SYSTEM_TASK">
      <SYSTEM_TASK></SYSTEM_TASK>
    </TabPane>
    <TabPane label="手动任务" name="HANDLE_TASK">
      <HANDLE_TASK></HANDLE_TASK>
    </TabPane>
  </Tabs>
</template>

<script src='./index.js'></script>

<style lang="less" scoped>
/deep/ .ivu-tabs-tabpane {
  background: #f0f0f0;
}
/deep/ .ivu-tabs-bar {
  border-bottom: 1px solid #dcdee2;
  margin-bottom: 0px;
}
/deep/ .ivu-tabs-nav .ivu-tabs-tab {
  height: 60px;
  line-height: 60px;
  padding: 0 16px;
}
</style>

