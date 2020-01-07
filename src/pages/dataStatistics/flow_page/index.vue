<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel = !showPanel">
        <Icon :type="!showPanel ? 'chevron-down' : 'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
        :label-width="90"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="操作日期:">
              <DatePicker
                size="small"
                style="width:100%"
                format="yyyy-MM-dd"
                type="datetimerange"
                v-model="formValidate.time"
                clearable
                placement="bottom-start"
                placeholder="请选择操作日期"
                @on-change="changeApplyDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="一级渠道:">
              <Select
                size="small"
                clearable
                placeholder="请选择状态"
                v-model="formValidate.channelOne"
                @on-open-change="channelOneOpen"
                v-if="channel_auth"
              >
                <Option
                  v-for="item in channelList1"
                  :value="item.channelCode"
                  :key="item.channelCode"
                  >{{ item.channelName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="二级渠道:">
              <Select
                size="small"
                clearable
                placeholder="请选择状态"
                v-model="formValidate.channelTwo"
                @on-open-change="channelTwoOpen"
                v-if="channel_auth"
              >
                <Option
                  v-for="item in channelList2"
                  :value="item.channelCode"
                  :key="item.channelCode"
                  >{{ item.channelName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="三级渠道:">
              <Select
                size="small"
                clearable
                placeholder="请选择状态"
                v-model="formValidate.channelThree"
                @on-open-change="channelThreeOpen"
                v-if="channel_auth"
              >
                <Option
                  v-for="item in channelList3"
                  :value="item.channelCode"
                  :key="item.channelCode"
                  >{{ item.channelName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formValidate')"
                style="width:80px"
                long
                size="small"
                :loading="query_loading"
              >
                <span v-if="!query_loading">检索</span>
                <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formValidate')"
                >重置</Button
              >
              <Button
                size="small"
                v-if="export_auth"
                icon="ios-cloud-download-outline"
                type="primary"
                style="min-width:80px;margin-left: 8px"
                @click="export_table"
                :loading="export_table_loading"
              >
                <span v-if="!export_table_loading">导出</span>
                <span v-else>导出...</span>
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanelTable = !showPanelTable">
        <Icon :type="!showPanelTable ? 'chevron-down' : 'chevron-up'"></Icon
        >检索结果
      </p>
      <!-- 表格 -->
      <div v-if="!showPanelTable">
        <Table
          border
          :data="tableData"
          :loading="query_loading"
          :columns="tableColumns"
          stripe
          class="tableBox"
        ></Table>
        <!-- 分页 -->
        <div class="vue-panel-page">
          <div style="float: right;">
            <Page
              :total="total"
              show-total
              size="small"
              :page-size-opts="[10, 20, 50, 100]"
              show-elevator
              show-sizer
              :page-size="pageSize"
              :current="pageNo"
              @on-page-size-change="changeSize"
              @on-change="changePage"
            ></Page>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script src="./index.js"></script>
