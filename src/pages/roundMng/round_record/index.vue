<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="95"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <!-- applyTimeLt & applyTimeGt -->
            <FormItem label="统计日期:" prop="mblNo">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="applyTime"
                clearable
                format="yyyy-MM-dd"
                type="daterange"
                @on-change="changeApplyTime"
                placement="bottom-start"
                placeholder="请选择统计日期"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:" prop="userNm">
              <Input size="small" clearable v-model="formItem.caseNo" placeholder="请输入案件编号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:" prop="billNo">
              <Input size="small" clearable v-model="formItem.billNo" placeholder="请输入账单号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="逾期天数:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="minOverdueDays">
                  <Input size="small" clearable v-model.trim="formItem.minOverdueDays"></Input>
                </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="maxOverdueDays">
                  <Input size="small" clearable v-model.trim="formItem.maxOverdueDays"></Input>
                </FormItem>
              </Col>
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
                v-model="formItem.opCompayUuid"
              >
                <Option
                  v-for="item in company_list_data"
                  :value="item.id"
                  :key="item.id"
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
                @on-change="departmentChange"
                placeholder="请选择组别"
                v-model="formItem.opOrganizationUuid"
              >
                <Option
                  v-for="item in department_list_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="经办人:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择经办人"
                v-model="formItem.opUserUuid"
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
            <FormItem span="6" label="达标情况:" prop="productTypes">
              <Select
                size="small"
                clearable
                multiple
                placeholder="请选择达标情况"
                v-model="formItem.productTypes"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
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
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          @click.stop="exportData"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          :loading='export_case_loading'
        >
          <span v-if="!export_case_loading">导出数据</span>
          <span v-else>导出中...</span>
        </Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          :data="tableData"
          border
          :columns="tableColumns"
          stripe
          @on-selection-change="changeSelect"
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
<style lang="less">
.arbitrament_detail {
  .ivu-modal-body {
    padding: 0;
  }
  .alert-title {
    background-color: #f7f7f7;
    padding: 8px;
    font-size: 14px;
    border-radius: 3px;
  }
  .ivu-modal-close {
    top: 3px;
  }
}
</style>
