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
            label="案件编号:"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.caseNo"
              placeholder="请输入案件编号"
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
            label="消息类型:"
          >
            <Select size="small" filterable v-model="formItem.msgType" placeholder="请选择消息类型">
              <Option
                v-for="item in getDirObj.MSG_TYPE"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
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
            label="账单ID:"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.operIp"
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
            label="发送时间:"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="operTime"
              format="yyyy-MM-dd"
              type="daterange"
              placement="bottom-start"
              placeholder="请选择发送时间"
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
                <FormItem label="案件编号:">
                  <Input size="small" v-model="formValidateInfo.caseNo"  disabled></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="消息类型:">
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.msgTypeName"
                  ></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="接收标识:">
                  <Input disabled size="small" v-model="formValidateInfo.msgFlgName" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="消息内容:">
                  <Input disabled size="small" v-model="formValidateInfo.msgContent" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem label="账单ID:">
                  <Input disabled size="small" v-model="formValidateInfo.billNo" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="接收用户ID:">
                  <Input disabled size="small" v-model="formValidateInfo.receiveUserId" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="接收手机号掩码:">
                  <Input disabled size="small" v-model="formValidateInfo.receiveUserMobHid" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="内容类型:">
                  <Input disabled size="small" v-model="formValidateInfo.messageContentTypeName" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="消息提醒:">
                  <Input disabled size="small" v-model="formValidateInfo.messagePurposeName" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="消息备注:">
                  <Input disabled size="small" v-model="formValidateInfo.remark" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="消息发送人ID:">
                  <Input disabled size="small" v-model="formValidateInfo.sendUserId" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="消息发送人姓名:">
                  <Input disabled size="small" v-model="formValidateInfo.sendUserName" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="发送类型:">
                  <Input disabled size="small" v-model="formValidateInfo.messageSendTypeName" placeholder></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="消息发送时间:">
                  <Input disabled size="small" v-model="formValidateInfo.sendTime" placeholder></Input>
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
                <FormItem span="6" prop="mblNo" label="消息来源系统简称:">
                  <Input disabled size="small" v-model="formValidateInfo.srcSys" placeholder></Input>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow">
                <Col span="12">
                <FormItem span="6" prop="mblNo" label="存储对应接收标识内容:" >
                  <Input disabled size="small" v-model="formValidateInfo.msgFlgContent" placeholder></Input>
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
