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
            <FormItem span="4" label="产品线:" prop="prodTypes">
              <Select
                size="small"
                clearable
                multiple
                placeholder="请选择产品线"
                v-model="formItem.prodTypes"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品期数:" prop="periodCounts">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择产品期数"
                v-model="formItem.periodCounts"
              >
                <Option
                  v-for="item in getDirObj.PROD_CNT"
                  :value="item.itemCode"
                  :key="item.itemCode"
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
            <FormItem span="6" label="信用级别:" prop="creditLevels">
              <Select
                size="small"
                clearable
                multiple
                placeholder="请选择信用级别"
                v-model="formItem.creditLevels"
              >
                <Option
                  v-for="item in getDirObj.CREDIT_LEVEL"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="沟通状态:" prop="collectSts">
              <Select size="small" clearable placeholder="请选择沟通状态" v-model="formItem.collectSts">
                <Option
                  v-for="item in getDirObj2"
                  :value="item.codeKey"
                  :key="item.codeKey"
                >{{ item.codeName }}</Option>
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
        <span style="margin-left: 10px;">总共{{summary.totalCount || 0}}笔案件，</span>
        <span>总共逾期金额{{summary.totalOverdueAmt || 0}}元</span>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          v-if="export_case"
          @click.stop="case_collect_case_list_export"
          :loading="export_case_loading"
        >
          <span v-if="!export_case_loading">导出数据</span>
          <span v-else>导出中...</span>
        </Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" :columns="tableColumns" stripe border></Table>
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
