<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title">
        <Tabs type="card" @on-click="tabClick" size="small" :animated="false">
          <TabPane label="申请数据" name="reduce_mng_apply_data">
          </TabPane>
          <TabPane label="反馈结果" name="reduce_mng_feedback">
          </TabPane>
        </Tabs>
      </p>
      <!-- <p @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p> -->
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="产品线:">
              <Select size="small" v-model="formValidate.prdTyp" placeholder="请选择产品线">
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:">
              <Input size="small" clearable v-model.trim="formValidate.caseNo" placeholder="请输入案件编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:">
              <Input size="small" clearable v-model.trim="formValidate.billNo" placeholder="请输入账单号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:">
              <Input
                size="small"
                clearable
                v-model.trim="formValidate.applyNo"
                placeholder="请输入客户姓名"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6" v-if="tab_flag === 'reduce_mng_feedback'">
            <FormItem label="减免状态:">
              <Select size="small" v-model="formValidate.repayOrdSts" placeholder="请选择减免状态">
                <Option
                  v-for="item in getDirObj.REPAY_ORD_STS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="减免类型:">
              <Select size="small" v-model="formValidate.repayOrdSts" placeholder="请选择减免类型">
                <Option
                  v-for="item in getDirObj.RELIEF_TYPE"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
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
    <!-- 申请数据的表格 -->
    <Card class="vue-panel-table" v-if="tab_flag === 'reduce_mng_apply_data'">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="success"
          size="small"
          @click.stop="submit_flag = !submit_flag"
        >提交</Button>
        <Button
          class="fr vue-back-btn header-btn"
          size="small"
          type='error'
          @click.stop="reject_flag = !reject_flag"
        >驳回</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table border :data="reduce_mng_apply_tableData" :columns="reduce_mng_apply_tableColumns" stripe class="tableBox" @on-selection-change="changeSelect"></Table>
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
    <!-- 批量提交的modal -->
    <div v-if="submit_flag">
      <Modal
        v-model="submit_flag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
          <span>提示</span>
        </p>
        <Alert show-icon type="warning">
          <template
            slot="desc"
          >该操作将对所有结果审核通过，您确认要继续操作么?</template>
        </Alert>
        <div slot="footer">
          <Button size="small" @click="cancel('1')">取消</Button>
          <Button type="primary" size="small" @click="relief_relieford_reviewrelief" :loading="submit_loading">
            <span v-if="!submit_loading">确定</span>
            <span v-else>提交中...</span>
          </Button>
        </div>
      </Modal>
    </div>
    <!-- 批量驳回的modal -->
    <div v-if="reject_flag">
      <Modal
        v-model="reject_flag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>驳回</span>
        </p>
        <Form ref="rejectFormItem" :model="rejectFormItem" :label-width="90" :rules="rejectRuleValidate">
          <FormItem span="4" label="驳回原因:" prop="refuseReason">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model.trim="rejectFormItem.refuseReason"
              placeholder="请输入100字以内"
            ></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button size="small" @click="cancel('2')">取消</Button>
          <Button
            type="primary"
            size="small"
            @click="rejectHandleSubmit('rejectFormItem')"
            :loading="reject_loading"
          >
            <span v-if="!reject_loading">确定</span>
            <span v-else>驳回中...</span>
          </Button>
        </div>
      </Modal>
    </div>
    <!-- 反馈结果的表格 -->
    <Card class="vue-panel-table" v-if="tab_flag === 'reduce_mng_feedback'">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table border :data="reduce_mng_feedback_tableData" :columns="reduce_mng_feedback_tableColumns" stripe class="tableBox"></Table>
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
    <!-- 申请数据的详情 -->
    <ApplyDetail v-model="modal.apply" v-if="modal.apply" v-on:passBack="passBack('apply')" :apply_data='apply_data'></ApplyDetail>
    <!-- 反馈结果的详情 -->
    <FeedbackDetail v-model="modal.feedback" v-if="modal.feedback" v-on:passBack="passBack('feedback')"></FeedbackDetail>
    <!-- 修改减免组件 -->
    <jianmian v-model="modal.breaks" v-if="modal.breaks" v-on:passBack="passBackBreaks" :edit_flag='false' :breaks_data='breaks_data'></jianmian>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
</style>
