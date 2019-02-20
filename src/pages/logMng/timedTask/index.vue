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
            label="任务名称:"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.jobName"
              placeholder="请输入任务名称"
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
            label="IP地址:"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.ipAddress"
              placeholder="请输入操作人IP"
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
            label="创建时间:"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="createTime"
              format="yyyy-MM-dd"
              type="date"
              placement="bottom-start"
              placeholder="请选择创建时间"
              @on-change="changeDate"
              @on-ok="changeDate"
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
        <Modal v-model="modalSee" title="案件日志"  class="role-modal">
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
                <FormItem label="任务名称:">
                  <Input size="small" v-model="formValidateInfo.jobName"  disabled></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="任务类名:">
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.jobClass"
                  ></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="IP地址:">
                  <Input disabled size="small" v-model="formValidateInfo.ipAddress" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="cron表达式:">
                  <Input disabled size="small" v-model="formValidateInfo.cronExpression" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="是否开启:">
                  <Input disabled size="small" v-model="formValidateInfo.status" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="创建人:">
                  <Input disabled size="small" v-model="formValidateInfo.createUser" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="创建时间:">
                  <Input disabled size="small" v-model="formValidateInfo.createTime" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="修改人:">
                  <Input disabled size="small" v-model="formValidateInfo.updateUser" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="修改时间:">
                  <Input disabled size="small" v-model="formValidateInfo.updateTime" placeholder></Input>
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
  .tableBox {
    overflow-x: scroll ;
    overflow-y: hidden;
    .tableMainW {
      min-width: 400px;
    }
  }
  /*.ivu-form-item-content{*/
  /*margin-left: 0 !important;*/
  /*}*/
</style>
