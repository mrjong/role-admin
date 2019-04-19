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
            <FormItem label="实际还款日期:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formValidate.startRepayDateRange"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择实际还款时间区间"
                @on-change="changeActDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="应还款日期:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formValidate.shouldRepayDate"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择应还款时间区间"
                @on-change="changeDueDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="还款状态:">
              <Select size="small" v-model="formValidate.payOffSts">
                <Option
                  v-for="item in getDirObj.PAY_OFF_STS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemDesc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编码:">
              <Input
                size="small"
                clearable
                v-model.trim="formValidate.caseNo"
                placeholder="请输入案件编码"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:">
              <Input size="small" clearable v-model.trim="formValidate.billNo" placeholder="请输入账单号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="电催中心:">
              <Select size="small" v-model="formValidate.opCompayUuid" clearable
                filterable placeholder="请选择电催中心" @on-change='companyChange'>
                <Option
                  v-for="item in company_list_data"
                  :value="item.id"
                  :key="item.id"
                >{{item.name}}</Option>
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
                @on-change='departmentChange'
                v-model="formValidate.opOrganizationUuid"
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
                v-model="formValidate.opUserUuid"
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
            <FormItem label="客户姓名:">
              <Input
                size="small"
                clearable
                v-model.trim="formValidate.userNm"
                placeholder="请输入客户姓名"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="分配时间:">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formValidate.allotDate"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择分配时间区间"
                @on-change="changeAllotDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formValidate')"
                style="width:80px"
                long
                size="small"
                :loading='query_loading'
              >
              <span v-if="!query_loading">检索</span>
              <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formValidate')"
              >重置</Button>
              <Upload
                :action="file_url"
                :show-upload-list="false"
                :headers="headers"
                :format="['xls', 'xlsx']"
                :max-size="1024"
                :on-success="handleSuccess"
                :on-error='handleError'
                :on-progress="handleProgress"
                :on-exceeded-size="handleMaxSize"
                :on-format-error="handleFormatError"
                :disabled="import_data_loading"
                style="display: inline-block; margin-left:8px"
                :data='{
                  pageType: 3
                }'
              >
                <Button
                  icon="ios-cloud-upload-outline"
                  type="primary"
                  size="small"
                  style="min-width: 80px;"
                  :loading="import_data_loading"
                >
                  <span v-if="!import_data_loading">导入查询</span>
                  <span v-else>导入中...</span>
                </Button>
              </Upload>
              <span style="line-height: 24px;color: #ed4014">（*导入查询和条件查询的数据没有关联）</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="exportData"
          v-if="export_case"
        >导出数据</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <div class="panel-desc">
          <Row :gutter="5">
            <div class="panel-desc-title fl mr10">回款数(笔)：
              <span>{{summary.repayOrdDetailCount||total}}</span>
            </div>
            <div class="panel-desc-title fl mr10">还款金额(元)：
              <span>{{summary.sumRepayAmt||0.00}}</span>
            </div>
          </Row>
        </div>
        <Table border :data="tableData" :columns="tableColumns" @on-selection-change="changeSelect" stripe class="tableBox"></Table>
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
.tableBox {
  .tableMainW {
    min-width: 400px;
  }
}
</style>
