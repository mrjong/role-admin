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
            <FormItem span="6" label="产品线:" prop="productTypes">
              <Select
                size="small"
                clearable
                multiple
                placeholder="请选择产品线"
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
            <FormItem label="申请人:" prop="opUserName">
              <Input size="small" clearable v-model="formItem.opUserName" placeholder="请输入申请人"/>
            </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <!-- applyTimeLt & applyTimeGt -->
            <FormItem label="申请日期:" prop="mblNo">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="applyTime"
                clearable
                format="yyyy-MM-dd"
                type="daterange"
                @on-change="changeApplyTime"
                placement="bottom-start"
                placeholder="请选择申请日期"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <!-- approvalTimeLt && approvalTimeBt -->
            <FormItem label="审核日期:" prop="mblNo">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="approvalTime"
                format="yyyy-MM-dd"
                type="daterange"
                clearable
                @on-change="changeApprovalTime"
                placement="bottom-start"
                placeholder="请选择审核日期"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="仲裁状态:" prop="approvalState">
              <Select size="small" clearable placeholder="请选择仲裁状态" v-model="formItem.approvalState">
                <Option
                  v-for="item in getDirObj.APPROVAL_STATE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:" prop="userName">
              <Input size="small" clearable v-model="formItem.userName" placeholder="请输入客户姓名"/>
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
          @click.stop="apply_execute"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          v-if="execution"
          :loading='apply_loading'
        >
          <span v-if="!apply_loading">申请执行</span>
          <span v-else>执行中...</span>
        </Button>
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
    <arbitrament-deatil v-model="arbitrament_modal" :arbitrament_data='arbitrament_data' v-if="arbitrament_modal" v-on:passBack='passBack'></arbitrament-deatil>

    <!-- 上传文件的modal -->
    <div v-if="upload_modal">
      <Modal title="上传文件" v-model="upload_modal" :mask-closable="false">
        <Upload
          type="drag"
          :action="prefix_pdf_file"
          :before-upload="handleUpload"
          ref="upload"
          :show-upload-list="true"
          :on-error="file_error"
          :on-success="file_success"
          :on-progress="file_progress"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :max-size="5120"
          :data="file_data"
          :headers="headers"
          :format="['pdf']"
          :disabled="file_disabled"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>
              点击或者拖拽文件到此进行文件上传
              <span style="color: #ed4014">（*仅限上传PDF格式文件,上传最大数量为1）</span>
            </p>
            <p>文件命名格式：<span style="color: #ed4014">（2018）衢仲网字第1117号_张三_裁决书.pdf</span></p>
          </div>
        </Upload>
        <div class="file_list_wrap" v-for="(item,index) in file_list" v-if="show_file_list">
          {{item.name}}
          <span @click="handleRemoveFile" style="float: right">
            <Icon size="20" type="ios-close"/>
          </span>
          <!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
        </div>
        <div slot="footer">
          <Button size="small" @click="credit_pdf_data" :loading="upload_loading" type="primary">
            <span v-if="!upload_loading">提交</span>
            <span v-else>上传中...</span>
          </Button>
          <Button size="small" @click="cancel">取消</Button>
        </div>
      </Modal>
    </div>
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
