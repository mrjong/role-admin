<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Modal
     :value="showAddModel.name==='project'"
      width="720"
      :closable="false"
      title="添加/修改方案"
    >
      <Form ref="formDataProject" :model="formDataProject" style="padding: 5%" label-position="left" :label-width="100"  :rules="ruleValidateProject">
        <Row :gutter="32">
          <Col span="16">
          <FormItem label="方案名称:" prop="planName">
              <Input size="small" clearable v-model="formDataProject.planName" placeholder="请输入方案名称"/>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="第一优先渠道:" prop="channelOne">
            <div style="display: flex; align-items: center;">
              <CheckboxGroup v-model="formDataProject.channelOne" >
                <Checkbox :label="item.itemCode" v-for="item in getDirObj['SEAT_TYPE']" :key="item.itemCode">
                  <span>{{ item.itemName }}</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="第二选择渠道:" >
            <CheckboxGroup v-model="formDataProject.channelTwo">
              <Checkbox :label="item.itemCode" v-for="item in getDirObj['SEAT_TYPE']" :key="item.itemCode">
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
              <i-switch v-model="formDataProject.territorialCallStatus" :true-value="'1'" :false-value="'0'">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="优先手机号码外呼:" :label-width="120">
            <div style="display: flex; align-items: center; padding-top: 7px">
              <i-switch  v-model="formDataProject.phoneCallStatus" :true-value="'1'" :false-value="'0'" >
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
              <i-switch  v-model="formDataProject.failureRateStatus" :true-value="'1'" :false-value="'0'">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="30天渠道接通率:" :label-width="120">
            <div style="display: flex; align-items: center; padding-top: 7px">
              <i-switch  v-model="formDataProject.connectionRateStatus" :true-value="'1'" :false-value="'0'">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button size="small"
                style="width:80px; height: 30px"
                @click="handleCancelProject()"
                >取消</Button>
        <Button size="small"
                style="width:80px; height: 30px"
                @click="handleSubmitProject()"
                type="primary">确定</Button>
      </div>
    </Modal>
    <Modal
      :value="showAddModel.name==='line'"
      width="520"
      :closable="false"
      title="添加/修改专线"
      :footer-hide="true"
    >
      <Form :label-width="80" :model="formDataLine" style="padding: 5%" :rules="ruleValidateLine" ref="formDataLine">
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="专线名称:" prop="planName">
            <Input size="small" clearable v-model="formDataLine.planName" placeholder="请输入专线名称"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="选择渠道:" prop="specialLine">
            <Select
              size="small"
              v-model="formDataLine.specialLine"
              filterable
              clearable
              placeholder="请选择渠道类型"
              @on-change="getChangeChannel"
            >
              <Option
                v-for="item in channelType"
                :value="item.channelCode"
                :key="item.channelCode"
              >{{ item.channelName }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="选择坐席:" prop="callNoList">
            <Select size="small" clearable placeholder="请选择坐席" v-model="formDataLine.callNoList" multiple>
              <Option
                v-for="item in seatsList"
                :value="item.seatNo"
                :key="item.seatNo"
              >{{ item.seatNo }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem label="选择号码:" prop="explicitList">
            <Select size="small" clearable placeholder="请选择号码" v-model="formDataLine.explicitList" multiple>
              <Option
                v-for="item in numberList"
                :value="item.explicitNumber"
                :key="item.explicitNumber"
              >{{ item.explicitNumber }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row >
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="12" style="display: flex; justify-content: space-around">
            <Button
              type="primary"
              @click="handleSubmitLine()"
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
              @click="handleCancelLine()"
            >取消</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>
