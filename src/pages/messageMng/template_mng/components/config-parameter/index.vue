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
          <FormItem
            v-for="(item, index) in parameterList"
            :key="index"
            :label="item.opUserName+':'"
            :prop="'staffList.'+index+'.collectRate'"
            :rules="[{required: true, message: '回款率不能为空', trigger:'change'},]"
            style="margin-bottom: 8px"
          >
            <Select
              size="small"
              multiple
              clearable
              placeholder="请选择模板类型"
              v-model="formItem.templType"
            >
              <Option
                v-for="item in getDirObj.DIVIDE_PROD_TYPE"
                :value="item.itemCode"
                :key="item.itemName"
              >{{ item.itemName }}</Option>
            </Select>
            <Select
              size="small"
              multiple
              clearable
              placeholder="请选择模板类型"
              v-model="formItem.templType"
            >
              <Option
                v-for="item in getDirObj.DIVIDE_PROD_TYPE"
                :value="item.itemCode"
                :key="item.itemName"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <div style="margin-top: 10px;text-align: center;">
        <slot :formItem="formItem"></slot>
      </div>
    </Form>
  </div>
</template>

<script src='./index.js'></script>
