<template>
  <div class="panel_list">
    <Split mode="vertical">
            <div slot="top" class="demo-split-pane">
                Top Pane
            </div>
            <div slot="bottom" class="demo-split-pane">
                Bottom Pane
            </div>
    </Split>
    <Card class="vue-panel">
      <Tabs @on-click="tabClick" size="small" :animated="true" style="background: #fff; border-radius: 4px;">
          <TabPane label="M1轮次维护" name="call_permissions">
            <callPermissions/>
          </TabPane>
        </Tabs>
    </Card>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less">
