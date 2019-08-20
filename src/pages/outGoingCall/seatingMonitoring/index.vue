<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="呼叫类型:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择呼叫类型"
                v-model="formItem.channelCode"
              >
                <Option
                  v-for="(item, index) in channelType"
                  :value="item.channelCode"
                  :key="index"
                >{{ item.channelName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="电催中心:">
            <Select
              size="small"
              clearable
              filterable
              placeholder="请选择电催中心"
              @on-change="companyChange"
              v-model="formItem.opCompanyId"
            >
              <Option
                v-for="(item, index) in company_list_data"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="组别:">
            <Select
              size="small"
              clearable
              filterable
              placeholder="请选择组别"
              @on-change="departmentChange"
              v-model="formItem.opOrganizationId"
            >
              <Option
                v-for="(item, index) in department_list_data"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="姓名:">
            <Select
              size="small"
              clearable
              filterable
              placeholder="请选择姓名"
              v-model="formItem.loginName"
            >
              <Option
                v-for="(item,index) in collect_list_data"
                :value="item.id"
                :key="item.id + index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="查询周期:">
            <DatePicker
              size="small"
              style="width:100%"
              v-model="formItem.dealTime"
              format="yyyy-MM-dd"
              type="daterange"
              placement="bottom-start"
              placeholder="请选择呼叫时间"
              :confirm='false'
              @on-change="changeDate"
            ></DatePicker>
          </FormItem>
          </Col>
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
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table border :data="tableData" :columns="tableColumns" stripe class="tableBox"></Table>
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

