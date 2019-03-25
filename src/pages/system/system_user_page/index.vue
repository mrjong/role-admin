<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="60"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="姓名:" prop="name">
              <Input size="small" clearable v-model.trim="formItem.name" placeholder="请输入姓名"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账号:" prop="loginName">
              <Input size="small" clearable v-model.trim="formItem.loginName" placeholder="请输入账号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="状态:" prop="state">
              <Select size="small" placeholder="请选择状态" v-model="formItem.state">
                <Option
                  v-for="item in getDirObj['1_0_AVAILABLE_DISABLE']"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
                :loading="query_loading"
              >
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
    <Card class="vue-panel-table collection_recording">
      <p slot="title">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索结果
        <!-- <router-link to="/buffet/buffet_add">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">导出数据</Button>
        </router-link>-->
        <Button
          class="fr header-btn"
          type="primary"
          @click="handleDelAll"
          style="width:80px"
          long
          size="small"
          v-if="reset_pwd"
        >重置密码</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="handleAdd('0')"
          style="width:80px"
          long
          size="small"
          v-if="add"
        >添加</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          :data="tableData"
          @on-selection-change="selectOne"
          @on-select-all="selectOne"
          :columns="tableColumns"
          stripe
          border
        ></Table>
        <!-- 分页 -->
        <div class="vue-panel-page">
          <div class="fr">
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
      </div>
    </Card>
    <Remodal
      v-model="parentData"
      :getDirObj="getDirObj"
      v-if="parentData.modal"
    ></Remodal>
  </div>
</template>
<script src="./index.js"></script>
