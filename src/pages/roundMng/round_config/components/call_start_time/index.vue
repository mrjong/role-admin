<template>
  <div class="call_start_time">
    <!-- 操作区 -->
    <div class="button_wrap">
      <strong>请设置下限跟进开启时间</strong>
      <Button type="error" size="small" disabled>删除</Button>
      <Button type="warning" size="small" :loading='update_loading_copy' @click.stop="handle_update">
        <span v-if="!update_loading_copy">修改</span>
        <span v-else>修改中...</span>
      </Button>
      <Button type="success" size="small" disabled>增加</Button>
    </div>
    <!-- 展示区 -->
    <div class="list_item">
      <div class="list_wrap">
        <Form ref="formItem" :model="formItem" :label-width="130" :rules="ruleValidate">
          <FormItem span="6" label='下限跟进开启时间:' prop="floorFollowTime" class="form_item">
            <TimePicker format="HH:mm" placeholder="选择时间" :editable='false' v-model="formItem.floorFollowTime" size='small' transfer :steps="[1, 15]" style="width: 112px"></TimePicker>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="less" src='./index.less'></style>

