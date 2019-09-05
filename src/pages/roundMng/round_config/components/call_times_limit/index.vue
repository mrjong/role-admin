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
        <CheckboxGroup v-model="call_times_limit_checkbox">
          <Checkbox label="01" class="call_user_type">本人</Checkbox>
          <Checkbox label="02" class="call_user_type">紧连</Checkbox>
          <Checkbox label="03" class="call_user_type">通讯录</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>

