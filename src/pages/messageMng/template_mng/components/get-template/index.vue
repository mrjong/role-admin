<template>
  <div>
    <Form
      ref="formItem"
      :rules="formRules"
      :model="formItem"
      :label-width="95"
      style="padding: 10px 0"
    >
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="模板编号" prop="templCode">
            <Input size="small" clearable v-model.trim="formItem.templCode" placeholder="请输入模板编号" />
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="模板类型" prop="templType">
            <Select
              size="small"
              multiple
              clearable
              placeholder="请选择模板类型"
              v-model="formItem.templType"
            >
              <Option
                v-for="item in getParentCodeList"
                :value="item.itemCode"
                :key="item.itemName"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <div style="margin-top: 10px;text-align: center;">
        <slot :formItem="formItem" :validateFormData='validateFormData'></slot>
      </div>
    </Form>
  </div>
</template>

<script src='./index.js'></script>
