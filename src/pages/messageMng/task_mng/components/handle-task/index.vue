<template>
  <div class="panel_list message_mng_wrap">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <!-- <p slot="title" @click="showPanelForm=!showPanelForm">
        检索条件
        <Icon
          size="18"
          style="margin-left: 10px"
          :type="!showPanelForm?'md-arrow-round-down':'md-arrow-round-up'"
        ></Icon>
      </p> -->
      <Form
        v-if="!showPanelForm"
        ref="formItem"
        :rules="formRules"
        :model="formItem"
        :label-width="95"
        style="padding: 10px 0"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6">
            <FormItem label="任务名称：" prop="jobName">
              <Input size="small" clearable v-model.trim="formItem.jobName" placeholder="请输入任务名称" />
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="模板编号:" prop="templCode">
              <Input
                size="small"
                clearable
                v-model.trim="formItem.templCode"
                placeholder="请输入模板编号"
              />
            </FormItem>
          </Col>
          <!-- <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="任务状态:" prop="jobStatus">
              <Select clearable size="small" placeholder="请选择任务状态" v-model="formItem.jobStatus">
                <Option
                  v-for="item in getDirObj['DIVIDE_PROD_TYPE']"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col> -->
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
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
                @click="clearForm('formItem')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>

    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title" @click.stop="showPanelTable=!showPanelTable">
        检索结果
        <Icon
          :type="!showPanelTable?'md-arrow-round-down':'md-arrow-round-up'"
          size="18"
          style="margin-left: 10px"
        ></Icon>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanelTable">
        <Table :data="tableData" border :loading='tableLoading' :columns="tableColumns" stripe></Table>
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
