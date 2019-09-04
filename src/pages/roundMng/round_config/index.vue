<template>
  <div class="panel_list">
    <Card class="vue-panel">
      <Tabs @on-click="tabClick" size="small" :animated="true" style="background: #fff; border-radius: 4px;">
          <TabPane label="拨打权限" name="call_permissions">
            <callPermissions/>
          </TabPane>
        </Tabs>
    </Card>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less">
