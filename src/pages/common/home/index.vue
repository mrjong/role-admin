<template>

  <div class="panel_list">
    <!-- 检索结果 -->
    <Row :gutter="10">
      <Col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
      >
      <Card class="vue-panel-table">
        <p
          slot="title"
          @click="showPanel2=!showPanel2"
        >
          <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
          公告
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加</Button>
        </p>
        <!-- 表格 -->

        <div v-if="!showPanel2">
          <Table
            v-if="tableData.length>0"
            :show-header="false"
            :data="tableData"
            :columns="tableColumns"
            stripe
          ></Table>
          <div
            v-if="!tableData||tableData.length<=0"
            class="home-no-data"
          >
            暂无数据
          </div>
        </div>
      </Card>
      </Col>
      <Col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
      >
      <Card class="vue-panel-table">
        <p
          slot="title"
          @click="showPanel2=!showPanel2"
        >
          <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
          罚息计算规则
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加</Button>
        </p>
        <!-- 表格 -->

        <div v-if="!showPanel2">
          <Table
            v-if="tableData.length>0"
            :show-header="false"
            :data="tableData"
            :columns="tableColumns"
            stripe
          ></Table>
          <div
            v-if="!tableData||tableData.length<=0"
            class="home-no-data"
          >
            暂无数据
          </div>
        </div>
      </Card>
      </Col>
      <Col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
      >
      <Card class="vue-panel-table">
        <p
          slot="title"
          @click="showPanel2=!showPanel2"
        >
          <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
          其他
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加</Button>
        </p>
        <!-- 表格 -->

        <div v-if="!showPanel2">
          <Table
            v-if="tableData.length>0"
            :show-header="false"
            :data="tableData"
            :columns="tableColumns"
            stripe
          ></Table>
          <div
            v-if="!tableData||tableData.length<=0"
            class="home-no-data"
          >
            暂无数据
          </div>
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
