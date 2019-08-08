<template>
  <Tabs value="TimedTask" style="background: #fff; border-radius: 4px;" >
    <TabPane label="外呼管理" name="TimedTask">
      <OutGoingCallMaintenance/>
    </TabPane>
    <TabPane label="方案管理" name="TaskDetails">
      <ProjectMaintenance/>
    </TabPane>
  </Tabs>
</template>
<style type="less" scoped>
  /deep/ .ivu-tabs-tabpane{
    background: #F0F0F0;
  }
  /deep/ .ivu-tabs-bar {
    border-bottom: 1px solid #dcdee2;
    margin-bottom: 0px;
  }
  /deep/ .ivu-tabs-nav .ivu-tabs-tab{
    height: 60px;
    line-height: 60px;
    padding: 0 16px;
  }
</style>
<script src='./index.js'></script>

