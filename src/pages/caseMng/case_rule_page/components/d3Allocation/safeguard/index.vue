<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Drawer
      :value="showSafeguard"
      width="720"
      title="维护接案数量"
      :mask-closable="false"
      @on-close="closeDrawer"
      :closable="false"
      :styles="styles"
    >
      <Card class="vue-panel" style="margin-bottom: 30px;" :dis-hover="true">
        <div style="margin-bottom: 30px">1. 请设置各档位催收员可配接收案件的数量  <span style="color: red">说明：仅可填写正整数</span></div>
        <Table border ref="selection" :columns="tableColumns" :data="tableData" size="small" ></Table>
        <div style="margin: 30px 0px 10px; display: flex; " >
          <span>2. 请选择高期期时间段</span>
          <div style=" display: flex; flex: 1;">
            <div style="margin-left: 30px">每月</div>
            <div v-if="!showEdit">{{peakDayVo.peakDaySta}}</div>
            <Input
              size="small"
              number
              type="number"
              v-model="peakDayVo.peakDaySta"
              on-change="changePeakStart"
              clearable
              style="width: 20%"
              v-else
            ></Input>
            <div class="text-center">-</div>
            <div v-if="!showEdit">{{peakDayVo.peakDayEnd}}</div>
            <Input
              size="small"
              number
              v-model="peakDayVo.peakDayEnd"
              on-change="changePeakEnd"
              type="number"
              clearable
              style="width: 20%"
              v-else
            ></Input>号
          </div>
        </div>
        <div style="color: #c5c5c5">说明：除此时间段，其他均列为日常期。</div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
          <Button
            type="primary"
            @click="showEdit=true"
            style="width:80px"
            long
            size="small"
          >
            修改
          </Button>
          <Button
            size="small"
            style="width:80px;margin-left: 8px"
            @click="handleSubmit('formItem')"
            :loading="allot_loading"
          >
            <span v-if="!allot_loading">保存</span>
            <span v-else>保存中...</span>
          </Button>
          <Button
            size="small"
            style="width:80px;margin-left: 8px"
            @click="handleCancel('formItem')"
          >取消</Button>
        </div>
      </Card>
    </Drawer>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

