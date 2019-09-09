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
              <callPermissions @passBack='passBack' :parentData='formItem' :update_loading='update_loading'></callPermissions>
            </Col>
            <Col span="12">
              <callTimesLimit @passBack='passBack' :parentData='formItem' :update_loading='update_loading'></callTimesLimit>
            </Col>
            <Col span="12">
              <casePushOrder @passBack='passBack' :parentData='formItem' :update_loading='update_loading'></casePushOrder>
            </Col>
            <Col span="12">
              <callStartTime @passBack='passBack' :parentData='formItem' :update_loading='update_loading'></callStartTime>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title">
        <Upload
          :action="file_url"
          :show-upload-list="false"
          :headers="headers"
          :format="['xls', 'xlsx']"
          :max-size="1024"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-progress="handleProgress"
          :on-exceeded-size="handleMaxSize"
          :on-format-error="handleFormatError"
          :disabled="import_data_loading"
          :data="{}"
        >
          <Button
            icon="ios-cloud-upload-outline"
            type="dashed"
            size="small"
            long
            style="min-width: 80px;"
            :loading="import_data_loading"
          >
            <span v-if="!import_data_loading">导入查询</span>
            <span v-else>导入中...</span>
          </Button>
        </Upload>
      </p>
      <!-- 表格 -->
      <div>
        <Table :data="tableData" border :columns="tableColumns" stripe></Table>
      </div>
    </Card>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>
