<template>
  <div class="call_permissions">
    <!-- 操作区 -->
    <div class="button_wrap">
      <strong>请设置拨打权限</strong>
      <Button type="error" size="small">删除</Button>
      <Button type="warning" size="small">修改</Button>
      <Button type="success" size="small">增加</Button>
    </div>
    <!-- 展示区 -->
    <div class="list_wrap">
      <div class="list_item">
        <div class="flex_item">
          <Icon type="md-remove-circle" size='24' style="cursor: pointer; margin-right: 6px;color: #ed4014"/>
          <span>
            逾期天数：
            <em>1 —— 2</em>
          </span>
        </div>
        <div class="flex_item">
          <span class="call_user_type">
            <Icon type="md-checkmark" size='20' style="margin-right: 6px; color: #19be6b"/>
            <span>本人</span>
          </span>
        </div>
      </div>
      <div class="list_item">
        <div class="flex_item">
          <Icon type="md-remove-circle" size='24' style="cursor: pointer; margin-right: 6px;color: #ed4014"/>
          <span>
            逾期天数：
            <em>3 —— 31</em>
          </span>
        </div>
        <div class="flex_item">
          <span class="call_user_type">
            <Icon type="md-checkmark" size='20' style="margin-right: 6px; color: #19be6b"/>
            <span>本人</span>
          </span>
          <span class="call_user_type">
            <Icon type="md-checkmark" size='20' style="margin-right: 6px; color: #19be6b"/>
            <span>紧连</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 子组件 -->
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>

