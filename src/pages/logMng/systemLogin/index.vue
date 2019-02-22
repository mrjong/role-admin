<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p
        slot="title"
        @click="showPanel=!showPanel"
      >
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
        检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="用户IP:"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.userIp"
              placeholder="请输入用户IP"
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="用户名称:"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.userName"
              placeholder="请输入用户名称"
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="登录时间:"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="loginTime"
              format="yyyy-MM-dd"
              type="daterange"
              placement="bottom-start"
              placeholder="请选择时间"
              @on-change="changeDate1"
              @on-ok="changeDate1"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="登出时间:"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="logoutTime"
              format="yyyy-MM-dd"
              type="daterange"
              placement="bottom-start"
              placeholder="请选择时间"
              @on-change="changeDate2"
              @on-ok="changeDate2"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            span="6"
          >
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formItem')"
              style="width:80px"
              long
              size="small"
            >检索</Button>
            <Button
              size="small"
              type="ghost"
              style="width:80px;margin-left: 8px"
              @click="clearForm('formItem')"
            >重置</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p
        slot="title"
        @click="showPanel2=!showPanel2"
      >
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
        检索结果
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          border
          :data="tableData"
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
        <Modal v-model="modalSee" title="系统登录/退出日志管理"  class-name="role-modal" width="720px">
          <Card class="vue-panel panel_list" :dis-hover="true" style="border: none">
            <Form
              v-if="!showPanel"
              ref="formValidate"
              :model="formValidate"
              :label-width="90"
              :rules="ruleValidate"
            >
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="用户IP:">
                  <span class="desc-label-item">{{formValidateInfo.userIp}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="用户ID:">
                  <span class="desc-label-item">{{formValidateInfo.userId}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="用户名称:">
                  <span class="desc-label-item">{{formValidateInfo.userName}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="登录时间:">
                  <span class="desc-label-item">{{formValidateInfo.loginTime}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="退出时间:">
                  <span class="desc-label-item">{{formValidateInfo.logoutTime}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="描述:">
                  <span class="desc-label-item">{{formValidateInfo.rmk}}</span>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <div slot="footer">
            <Button size="small" @click="closeModal('1')">关闭</Button>
          </div>
        </Modal>
      </div>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
  .role-modal .ivu-modal-body {
    margin-left: -16px ;
  }
  .role-modal .ivu-form-item-label{
    color: #000;
    font-weight: 500;
  }
  .desc-label-item {
    vertical-align: middle;
    line-height: 38px;
  }
  /*.ivu-form-item-content{*/
  /*margin-left: 0 !important;*/
  /*}*/
</style>
