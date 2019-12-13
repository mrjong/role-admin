<template>
  <div>
    <Form
      ref="formItem"
      :model="formItem"
      :label-width="95"
      style="padding: 10px 0"
    >
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem
            v-for="(item, index) in formItem.parameterList"
            :key="index"
            :label="item.key+':'"
            :prop="'parameterList.'+index+'.source'"
            :rules="[{required: true, message: '请选择', trigger:'change'},]"
            style="margin-bottom: 8px"
          >
            <Select
              size="small"
              @on-change='selectChange'
              placeholder="请选择"
              style="width:40%; display: inline-block"
              v-model="item.source"
            >
              <Option
                v-for="item in getDirObj.MSG_PARAM_SOURCE"
                :value="item.itemCode"
                :key="item.itemName"
              >{{ item.itemName }}</Option>
            </Select>
            <Select
              size="small"
              style="width:40%; display: inline-block"
              placeholder="请选择"
              v-model="item.partExpression"
            >
              <Option
                v-for="item in childrenList"
                :value="item.itemCode"
                :key="item.itemName"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <div style="margin-top: 10px;text-align: center;">
        <slot :formItem="formItem" :validateFormData="validateFormData"></slot>
      </div>
    </Form>
  </div>
</template>

<script src='./index.js'></script>
