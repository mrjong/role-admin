<template>
  <div>
    <Form
      ref="formItem"
      :model="formItem"
      :label-width="105"
      style="padding: 10px 0"
    >
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem
            v-for="(item, index) in formItem.parameterList"
            :key="index"
            :label="item.key+':'"
            :prop="'parameterList.'+index+'.partExpression'"
            :rules="[{required: true, message: '请选择', trigger:'change'},]"
            style="margin-bottom: 8px"
          >
            <Select
              size="small"
              @on-change='selectChange($event, index)'
              placeholder="请选择"
              transfer
              style="width:40%; display: inline-block"
              v-model="item.source"
            >
              <Option
                v-for="childrenItem in getDirObj.MSG_PARAM_SOURCE"
                :value="childrenItem.itemCode"
                :key="childrenItem.itemName"
              >{{ childrenItem.itemName }}</Option>
            </Select>
            <Select
              size="small"
              transfer
              style="width:40%; display: inline-block"
              placeholder="请选择"
              v-model="item.partExpression"
            >
              <Option
                v-for="childrenItem in childrenList[`list${index}`]"
                :value="childrenItem.itemCode"
                :key="childrenItem.itemName"
              >{{ childrenItem.itemName }}</Option>
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
