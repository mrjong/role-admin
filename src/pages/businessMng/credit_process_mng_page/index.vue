<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件号:">
              <Input size="small" clearable v-model.trim="formValidate.caseNo" placeholder="请输入案件号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="操作日期:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formValidate.applyDate"
                format="yyyy-MM-dd"
                type="datetimerange"
                clearable
                placement="bottom-start"
                placeholder="请选择操作日期"
                @on-change="changeApplyDate"
              ></DatePicker>
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
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanelTable=!showPanelTable">
        <Icon :type="!showPanelTable?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          @click.stop="exportData"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          v-if="export_case"
          :loading='export_case_loading'
        >
          <span v-if="!export_case_loading">导出数据</span>
          <span v-else>导出中...</span>
        </Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanelTable">
        <Table border :data="tableData" @on-selection-change="changeSelect" :columns="tableColumns" stripe class="tableBox"></Table>
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

<script src='./index.js'></script>
