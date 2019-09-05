<template>
  <div class="panel_list round_config_wrap">
    <Card class="vue-panel">
      <Tabs
        @on-click="tabClick"
        size="small"
        :animated="true"
        style="background: #fff; border-radius: 4px;"
      >
        <TabPane label="M1轮次维护" name="call_permissions">
          <Row>
            <Col span="12">
              <callPermissions />
            </Col>
            <Col span="12">
              <callTimesLimit></callTimesLimit>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>
