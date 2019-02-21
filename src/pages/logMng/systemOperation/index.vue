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
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="耗时:">
            <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
            <FormItem prop="minOverdueAmt">
              <Input size="small" number clearable v-model="formItem.minDuration"></Input>
            </FormItem>
            </Col>
            <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
            <div class="text-center">-</div>
            </Col>
            <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
            <FormItem prop="maxOverdueAmt">
              <Input size="small" number clearable v-model="formItem.maxDuration"></Input>
            </FormItem>
            </Col>
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
            label="开始时间:"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="startTime"
              format="yyyy-MM-dd"
              type="daterange"
              placement="bottom-start"
              placeholder="请选择时间"
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
        <Modal v-model="modalSee" title="系统日志"  class="role-modal">
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
                <FormItem label="耗时:">
                  <Input size="small" v-model="formValidateInfo.duration"  disabled></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="开始时间:">
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.startTime"
                  ></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="结束时间:">
                  <Input disabled size="small" v-model="formValidateInfo.endTime" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="操作类型:">
                  <Input disabled size="small" v-model="formValidateInfo.operTypeName" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="执行参数:">
                  <Input disabled size="small" v-model="formValidateInfo.operParam" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="执行结果:">
                  <Input disabled size="small" v-model="formValidateInfo.operResult" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="操作描述:">
                  <Input disabled size="small" v-model="formValidateInfo.operDesc" placeholder ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="是否成功:">
                  <Input disabled size="small" v-model="formValidateInfo.isSuccess" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="用户ID:">
                  <Input disabled size="small" v-model="formValidateInfo.userId" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="用户名称:">
                  <Input disabled size="small" v-model="formValidateInfo.userName" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="用户IP:">
                  <Input disabled size="small" v-model="formValidateInfo.userIp" placeholder></Input>
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
