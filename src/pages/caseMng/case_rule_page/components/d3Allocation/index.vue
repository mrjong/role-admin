<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <Form  ref="formItem" :model="formItem" :label-width="95" style="padding: 10px 0">
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="适用分案日期:">
            <DatePicker
              type="date"
              v-model="formItem.effectMinDt"
              format="yyyy-MM-dd"
              @on-change="dateChange"
              :editable="false"
              size='small'
              clearable
              placeholder="请选择适用分案日期"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
          <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')" style="width:80px" long size="small" :loading="query_loading">
              <span v-if="!query_loading">检索</span>
              <span v-else>检索中...</span>
            </Button>
            <Button
              size="small"
              style="width:80px;margin-left: 8px"
              @click="clearForm('formItem')"
            >重置</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title">
        检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handeldBtnClick('2')"
          v-if="disposed"
        >配置</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handleBtnCaseCount"
          v-if="accept_case"
        >维护接案数量</Button>
      </p>
      <!-- 表格 -->
      <Table :data="tableData" border :columns="tableColumns" stripe>

      </Table>
      <!-- 分页 -->
      <div class="vue-panel-page">
        <div style="float: right;">
          <Page
            :total="total"
            show-total
            size="small"
            :page-size-opts="[10, 20, 50, 100]"
            show-elevator
            show-sizer
            :page-size="pageSize"
            :current="pageNo"
            @on-page-size-change="changeSize"
            @on-change="changePage"
          ></Page>
        </div>
      </div>
    </Card>
    <Safeguard :showSafeguard="showSafeguard" @passBack="passBack"/>
    <AddDispose :showAddDispose="showAddDispose" @passBack="passBack"/>
    <UpdateDispose :showUpdateDispose="showUpdateDispose" @passBack="passBack" :updateData="updateData"/>
  </div>
</template>
<script src='./index.js'></script>

