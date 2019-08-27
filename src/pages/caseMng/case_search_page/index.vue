<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
        <!-- <router-link to="/demo/demo_desc">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
        </router-link>-->
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
            <FormItem span="6" label="案件处理状态:" prop="caseHandleStatus">
              <Select
                clearable
                size="small"
                placeholder="请选择案件状态"
                v-model="formItem.caseHandleStatus"
              >
                <Option
                  v-for="item in getDirObj.CASE_HANDLE_STATUS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品线:">
              <Select
                size="small"
                clearable
                placeholder="请选择产品线"
                multiple
                v-model="formItem.prodTypes"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品期数:">
              <Select
                size="small"
                clearable
                placeholder="请选择产品期数"
                multiple
                v-model="formItem.periodCounts"
              >
                <Option
                  v-for="item in getDirObj.PROD_CNT"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:" prop="userNm">
              <Input size="small" clearable v-model.trim="formItem.userNm" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="身份证号:" prop="idNo">
              <Input size="small" clearable v-model.trim="formItem.idNo" placeholder="请输入身份证号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="手机号:" prop="mblNo">
              <Input size="small" clearable v-model.trim="formItem.mblNo" placeholder="请输入手机号"/>
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
            <FormItem label="逾期应还金额:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="minOverdueAmt">
                  <Input size="small" clearable v-model.trim="formItem.minOverdueAmt"></Input>
                </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="maxOverdueAmt">
                  <Input size="small" clearable v-model.trim="formItem.maxOverdueAmt"></Input>
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:" prop="id">
              <Input size="small" clearable v-model.trim="formItem.id" placeholder="请输入案件编号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:" prop="billNo">
              <Input size="small" clearable v-model.trim="formItem.billNo" placeholder="请输入账单号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="还款状态:">
              <Select size="small" v-model="formItem.caseStatus" clearable>
                <Option
                  v-for="item in getDirObj.PAY_OFF_STS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="最后催收时间:">
              <DatePicker
                type="daterange"
                v-model="formItem.collect_Date"
                @on-change="dateChange($event, 'collect_Date')"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择最后催收时间"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="分配日期:">
              <DatePicker
                type="daterange"
                v-model="formItem.distribute_Date"
                @on-change="dateChange($event, 'distribute_Date')"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择分配日期"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="APP登录时间:">
              <DatePicker
                type="daterange"
                v-model="formItem.login_Date"
                @on-change="dateChange($event, 'login_Date')"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择登录时间"
                style="width: 100%"
              ></DatePicker>
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
                placeholder="请选择组别"
                @on-change="departmentChange"
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
          <FormItem label="登录状态:">
            <Select
              size="small"
              clearable
              filterable
              placeholder="请选择登录状态"
              v-model="formItem.appLoginStatus"
            >
              <Option
                v-for="(item,index) in getDirObj.APP_LOGIN_STATUS"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="拨打状态:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择拨打状态"
                v-model="formItem.talkResult"
              >
               <Option
                  v-for="(item,index) in call_status_list"
                  :value="item.codeKey"
                  :key="item.codeKey + index"
                >{{ item.codeName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="沟通结果:" prop="collectResult">
              <Select size="small" clearable placeholder="请选择沟通结果" v-model="formItem.collectResult">
                <Option
                  v-for="item in collect_status_list"
                  :value="item.codeKey"
                  :key="item.codeKey"
                >{{ item.codeName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="渠道来源:">
              <Select size="small" v-model="formItem.channelCode" clearable>
                <Option
                  v-for="item in case_detail_one_channel_list"
                  :value="item.channelOneCode"
                  :key="item.channelOneCode"
                >{{ item.channelOneName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                style="width:80px"
                long
                size="small"
                :loading="queryLoading"
                @click="handleSubmit('formItem')"
              >
                <span v-if="!queryLoading">检索</span>
                <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
              <Button
                size="small"
                v-if="import_search"
                icon="ios-cloud-download-outline"
                type="primary"
                style="min-width:80px;margin-left: 8px"
                @click="download_import"
                :loading="download_import_data"
              >
                <span v-if="!download_import_data">下载导入查询模板</span>
                <span v-else>下载中...</span>
              </Button>
              <Upload
                v-if="import_search"
                :action="file_url"
                :show-upload-list="false"
                :headers="headers"
                :format="['xls', 'xlsx']"
                :max-size="1024"
                :on-error="handleError"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-exceeded-size="handleMaxSize"
                :on-format-error="handleFormatError"
                :disabled="import_data_loading"
                style="display: inline-block; margin-left:8px"
                :data="{
                  pageType: 1
                }"
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
              <span style="line-height: 24px;color: #ed4014" v-if="import_search">（*导入查询和条件查询的数据没有关联）</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <span style="margin-left: 10px; font-weight: 400">案件数（笔）: {{totalCase}}，</span>
        <span style="font-weight: 400">案件金额（元）: {{totalOverdueAmt | money}}</span>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          style="min-width: 80px"
          v-if="export_case"
          :loading="exportLoading"
          @click.stop="query_export"
        >
          <span v-if="!exportLoading">导出数据</span>
          <span v-else>导出中...</span>
        </Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" border :columns="tableColumns" stripe @on-selection-change="changeSelect"></Table>
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
