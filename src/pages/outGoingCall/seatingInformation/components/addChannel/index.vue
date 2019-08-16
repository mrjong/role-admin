<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Modal
      :value="showAddChannel"
      width="720"
      :closable="false"
    >
      <Form :model="formData" style="padding-top: 50px; padding-left: 20px" :rules="ruleValidate" ref="formData" :label-width="80">
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="渠道名称:"  prop="channelCode">
              <Select @on-change="selectChannel" placeholder="请选择渠道名称" style="margin-right: 20px; width: 70%" :label-in-value="true" v-model="formData.channelCode">
                <Option
                  v-for="(item, index) in getDirObj['SEAT_TYPE']"
                  :value="item.itemCode"
                  :key="index"
                >{{ item.itemName }}</Option>
              </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="渠道类型:" prop="channelSecondaryName">
              <Input v-model="formData.channelSecondaryName" placeholder="请输入渠道类型" style="margin-right: 20px; width: 70%"/>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="24">
          <FormItem label="号码类型:"  prop="explicitType">
            <RadioGroup v-model="formData.explicitType" style=" margin-top: 3px;">
              <Radio label="2">
                <span>固话</span>
              </Radio>
              <Radio label="1">
                <span>手机号</span>
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
          <Col span="22">
          <FormItem label="地域盲区:" prop="areas">
              <Select  placeholder="请选择地域盲区" style="margin-right: 20px" v-model="formData.areas" multiple>
                <Option
                  v-for="(item, index) in getDirObj['PROVINCE_AREA']"
                  :value="item.itemCode"
                  :key="index"
                >{{ item.itemName }}
                </Option>
              </Select>
            <div>说明：被叫号码归属地为地域盲区，则呼叫时自动排除此线路。</div>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button size="small"
                style="width:80px; height: 30px"
                @click="handleCancel('Cancel')"
        >取消</Button>
        <Button size="small"
                style="width:80px; height: 30px"
                @click="handleSubmit('Submit')"
                type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

