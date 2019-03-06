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
              <Input size="small" number clearable v-model.trim="formItem.minDuration"></Input>
            </FormItem>
            </Col>
            <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
            <div class="text-center">-</div>
            </Col>
            <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
            <FormItem prop="maxOverdueAmt">
              <Input size="small" number clearable v-model.trim="formItem.maxDuration"></Input>
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
              v-model.trim="formItem.userName"
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
              :loading='queryLoading'
            >
              <span v-if="!queryLoading">检索</span>
              <span v-else>检索...</span>
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
        <Modal v-model="modalSee" title="系统日志"  class-name="role-modal" width="720px">
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
                  <span class="desc-label-item">{{formValidateInfo.duration}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="开始时间:">
                  <span class="desc-label-item">{{formValidateInfo.startTime}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="结束时间:">
                  <span class="desc-label-item">{{formValidateInfo.endTime}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="操作类型:">
                  <span class="desc-label-item">{{formValidateInfo.operTypeName}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="用户ID:">
                  <span class="desc-label-item">{{formValidateInfo.userId}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="用户名称:">
                  <span class="desc-label-item">{{formValidateInfo.userName}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="操作描述:">
                  <span class="desc-label-item">{{formValidateInfo.operDesc}}</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="是否成功:">
                  <span class="desc-label-item">{{formValidateInfo.isSuccessName}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="用户IP:">
                  <span class="desc-label-item">{{formValidateInfo.userIp}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="24">
                <FormItem label="执行参数:">
                  <span class="desc-label-item">{{formValidateInfo.operParam}}</span>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="24">
                <FormItem label="执行结果:">
                  <span class="desc-label-item">{{formValidateInfo.operResult}}</span>
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
