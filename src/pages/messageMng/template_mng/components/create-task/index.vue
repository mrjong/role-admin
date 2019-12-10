<template>
  <div>
    <Form
      ref="formItem"
      :rules="formRules"
      :model="formItem"
      :label-width="85"
      style="padding: 10px 0"
    >
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="任务类型" prop="jobType">
            <RadioGroup v-model="formItem.jobType" size="large">
              <Radio label="系统任务"></Radio>
              <Radio label="手动任务"></Radio>
              <!-- <Radio :label="item.itemCode" :key="index" v-for="item in getParentCodeList">{{ item.itemName }}</Radio> -->
            </RadioGroup>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="任务名称" prop="jobName">
            <Input
              size="small"
              clearable
              v-model.trim="formItem.jobName"
              style="width: 70%"
              placeholder="请输入任务名称"
            />
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="使用场景" prop="jobScene">
            <RadioGroup v-model="formItem.jobScene" size="large">
              <Radio label="实时"></Radio>
              <Radio label="定时"></Radio>
              <!-- <Radio :label="item.itemCode" :key="index" v-for="item in getParentCodeList">{{ item.itemName }}</Radio> -->
            </RadioGroup>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="选择节点" prop="triggerNode">
            <RadioGroup v-model="formItem.triggerNode" size="large">
              <Radio label="仲裁状态"></Radio>
              <Radio label="信用进度状态"></Radio>
              <!-- <Radio :label="item.itemCode" :key="index" v-for="item in getParentCodeList">{{ item.itemName }}</Radio> -->
            </RadioGroup>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="发送时间" prop="jobTime">
            <RadioGroup v-model="formItem.jobTime" size="large">
              <Radio label="立即发送"></Radio>
              <Radio label="指定时间"></Radio>
              <TimePicker format="HH:mm" placeholder="Select time"></TimePicker>
              <!-- <Radio :label="item.itemCode" :key="index" v-for="item in getParentCodeList">{{ item.itemName }}</Radio> -->
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div style="margin-top: 10px;text-align: center;">
      <slot :formItem="formItem" :validateFormData="validateFormData"></slot>
    </div>
  </div>
</template>

<script src='./index.js'></script>
