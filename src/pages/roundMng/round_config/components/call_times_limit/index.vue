<template>
  <div class="call_times_limit">
    <!-- 操作区 -->
    <div class="button_wrap">
      <strong>请设置单个号码拨打次数上限</strong>
      <Button type="error" size="small">删除</Button>
      <Button type="warning" size="small">修改</Button>
      <Button type="success" size="small">增加</Button>
    </div>
    <!-- 展示区 -->
    <div class="list_item">
      <div class="list_wrap">
        <Form ref="formItem" :model="formItem" :label-width="10" :rules="ruleValidate">
          <CheckboxGroup v-model="call_times_limit_checkbox">
            <Checkbox label="01" class="call_user_type">
              本人
              <FormItem span="6" prop="caseHandleStatus" class="form_item">
                <InputNumber size="small" :max="10" :min="0" v-model="formItem.benren"></InputNumber>
              </FormItem>
            </Checkbox>
            <Checkbox label="02" class="call_user_type">
              紧连
              <FormItem span="6" prop="caseHandleStatus" class="form_item">
                <InputNumber size="small" :max="10" :min="0" v-model="formItem.benren"></InputNumber>
              </FormItem>
            </Checkbox>
            <Checkbox label="03" class="call_user_type">
              通讯录
              <FormItem span="6" prop="caseHandleStatus" class="form_item">
                <InputNumber size="small" :max="10" :min="0" v-model="formItem.benren"></InputNumber>
              </FormItem>
            </Checkbox>
          </CheckboxGroup>
        </Form>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>

