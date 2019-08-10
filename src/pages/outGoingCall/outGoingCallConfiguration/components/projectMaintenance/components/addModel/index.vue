<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Modal
      :value="showAddModel==='project'"
      width="720"
      :closable="false"
      title="添加方案"
      @on-ok="handleSubmit('Submit')"
      @on-cancel="handleSubmit('Cancel')"
    >
      <Form :model="formData" style="padding: 5%" label-position="left" :label-width="100">
        <Row :gutter="32">
          <Col span="16">
          <FormItem label="方案名称:">
              <Input size="small" clearable v-model="formData.planName" placeholder="请输入方案名称"/>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="第一优先渠道:" >
            <div style="display: flex; align-items: center;">
              <CheckboxGroup v-model="formData.channelOne" >
                <Checkbox :label="item.itemCode" v-for="item in getDirObj['SEAT_TYPE']">
                  <span>{{ item.itemName }}</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="第二选择渠道:" >
            <CheckboxGroup v-model="formData.channelTwo">
              <Checkbox :label="item.itemCode" v-for="item in getDirObj['SEAT_TYPE']">
                <span>{{ item.itemName }}</span>
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="属地外呼:" :label-width="120">
            <div style="display: flex; align-items: center; padding-top: 7px">
              <i-switch v-model="formData.territorialCallStatus" :true-value="1" :false-value="0">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="优先手机号码外呼:" :label-width="120">
            <div style="display: flex; align-items: center; padding-top: 7px">
              <i-switch  v-model="formData.phoneCallStatus" :true-value="1" :false-value="0">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
        </Row>
          <Row :gutter="32">
          <Col span="12">
          <FormItem label="15天渠道故障率:" :label-width="120">
            <div style="display: flex; align-items: center; padding-top: 7px">
              <i-switch  v-model="formData.failureRateStatus" :true-value="1" :false-value="0">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="30天渠道接通率:" :label-width="120">
            <div style="display: flex; align-items: center; padding-top: 7px">
              <i-switch  v-model="formData.connectionRateStatus" :true-value="1" :false-value="0">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal
      :value="showAddModel==='line'"
      width="520"
      :closable="false"
      title="添加专线"
      :footer-hide="true"
      @on-ok="handleSubmit('Submit')"
      @on-cancel="handleSubmit('Cancel')"
    >
      <Form :label-width="80" :model="formData2" style="padding: 5%">
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="专线名称:">
            <Input size="small" clearable v-model="formData.specialLine" placeholder="请输入专线名称"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="选择渠道:">
            <Select size="small" clearable placeholder="请选择渠道" v-model="formData.isLock" >
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="选择坐席:" >
            <Select size="small" clearable placeholder="请选择坐席" v-model="formData.isLock" >
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="选择号码:" >
            <Select size="small" clearable placeholder="请选择号码" v-model="formData.isLock" >
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row >
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="12" style="display: flex; justify-content: space-around">
            <Button
              type="primary"
              @click="handleSubmit('Submit')"
              style="width:80px; margin-left: 20px"
              long
              size="small"
              :loading='addLoading'
            >
              <span v-if="!addLoading">确定</span>
              <span v-else>确定...</span>
            </Button>
            <Button
              size="small"
              style="width:80px;margin-left: 8px"
              @click="handleSubmit('Cancel')"
            >取消</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
