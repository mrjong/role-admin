<template>
  <Tabs value="Common" style="background: #fff; border-radius: 4px;" >
    <TabPane label="常规分配" name="Common">
      <Common/>
    </TabPane>
    <TabPane label="D3分配" name="D3Allocation">
      <D3Allocation/>
    </TabPane>
  </Tabs>
</template>
<style lang="less" scoped>
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

