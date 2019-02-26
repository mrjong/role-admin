<template>
  <div class="panel_list">
    <Row :gutter="10">
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Card class="vue-panel-table">
          <p slot="title" @click="showPanel1=!showPanel1">
            <Icon :type="!showPanel1?'chevron-down':'chevron-up'"></Icon>公告
            <Button
              class="fr vue-back-btn header-btn"
              type="primary"
              size="small"
              @click.stop="showAlert('1')"
            >添加</Button>
          </p>
          <!-- 表格 -->
          <div v-if="!showPanel1">
            <Table
              v-if="announcement_list1.length>0"
              :show-header="false"
              :data="announcement_list1"
              :columns="tableColumns"
              stripe
              border
            ></Table>
            <div v-else class="home-no-data">暂无数据</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Card class="vue-panel-table">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>罚息计算规则
            <Button
              class="fr vue-back-btn header-btn"
              type="primary"
              size="small"
              @click.stop="showAlert('2')"
            >添加</Button>
          </p>
          <!-- 表格 -->
          <div v-if="!showPanel2">
            <Table
              v-if="announcement_list2.length>0"
              :show-header="false"
              :data="announcement_list2"
              :columns="tableColumns2"
              stripe
              border
            ></Table>
            <div v-if="!announcement_list2||announcement_list2.length<=0" class="home-no-data">暂无数据</div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Card class="vue-panel-table">
          <p slot="title" @click="showPanel3=!showPanel3">
            <Icon :type="!showPanel3?'chevron-down':'chevron-up'"></Icon>其他
            <Button
              class="fr vue-back-btn header-btn"
              type="primary"
              size="small"
              @click.stop="showAlert('3')"
            >添加</Button>
          </p>
          <!-- 表格 -->
          <div v-if="!showPanel3">
            <Table
              v-if="announcement_list3.length>0"
              :show-header="false"
              :data="announcement_list3"
              :columns="tableColumns3"
              stripe
              border
            ></Table>
            <div v-if="!announcement_list3||announcement_list3.length<=0" class="home-no-data">暂无数据</div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
