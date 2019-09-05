<template>
  <div class="case_push_order">
    <!-- 操作区 -->
    <div class="button_wrap">
      <strong>请设置案件推送顺序</strong>
      <Button type="error" size="small">删除</Button>
      <Button type="warning" size="small">修改</Button>
      <Button type="success" size="small">增加</Button>
    </div>
    <!-- 展示区 -->
    <div class="list_item">
      <div class="list_wrap">
        <span>排序规则：</span>
        <Select v-model="rule" size="small" class="form_item" transfer style="min-width: 100px">
          <Option v-for="item in ruleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <i-switch size="large" @on-change='switch_change'>
          <span slot="open">升序</span>
          <span slot="close">降序</span>
        </i-switch>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>

