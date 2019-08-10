<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Modal
      :value="showAddChannel"
      width="720"
      :closable="false"
      @on-ok="handleSubmit('Submit')"
      @on-cancel="handleSubmit('Cancel')"
    >
      <Form :model="formData" style="padding-top: 50px; padding-left: 20px">
        <Row :gutter="32">
          <Col span="10">
          <FormItem label="渠道名称:" label-position="top">
            <div style="display: flex; align-items: center;">
              <Select v-model="formData.channelName" placeholder="please choose the approver" style="margin-right: 20px">
                <Option
                  v-for="item in getDirObj['SEAT_TYPE']"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
          </FormItem>
          </Col>
          <Col span="14">
          <FormItem label="渠道类型:" label-position="top">
            <div style="display: flex; align-items: center;">
              <Input v-model="formData.channelSecondaryName" placeholder="please " style="margin-right: 20px; width: 70%"/>
              <i-switch>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="24">
          <FormItem label="号码类型:" label-position="top">
            <RadioGroup v-model="formData.explicitType" style="display: flex; margin-top: 3px;">
              <Radio label="1">
                <span>固话</span>
              </Radio>
              <Radio label="2">
                <span>手机电话</span>
              </Radio>
              <Radio label="3">
                <span>虚拟号码</span>
              </Radio>
            </RadioGroup>
            <div>说明：渠道提供的外显号码的类型</div>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="24">
          <FormItem label="地域盲区:" label-position="top">
            <div style="display: flex; align-items: center;">
              <Select v-model="formData.areas" placeholder="please choose the approver" style="margin-right: 20px">
                <Option value="jobs">北京</Option>
                <Option value="ive">云南</Option>
              </Select>
              <i-switch style="width: 53px" :true-value="1" :false-value="0" >
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </div>
            <div>说明：被叫号码归属地为地域盲区，则呼叫时自动排除此线路。</div>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

