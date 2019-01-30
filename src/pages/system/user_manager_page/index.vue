<template>
  <div class="panel_list">
    <Row :gutter="8">
      <!-- 左侧树结构 -->
      <Col span="8" class="tree-col">
        <Card class="vue-panel tree-card">
          <p slot="title">
            <Icon :type="!showPanel?'chevron-down':'chevron-up'" @click="showPanel=!showPanel"></Icon>催收人员
            <!-- <router-link to="/demo/demo_desc">
              <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
            </router-link>-->
            <Button
              class="fr header-btn"
              type="primary"
              @click="setModalType('tableList')"
              style="width:90px"
              long
              size="small"
            >查看无效员工</Button>
            <Button
              class="fr header-btn"
              type="primary"
              @click="addOrganization({'leafType': '0'})"
              style="width:64px"
              long
              size="small"
            >添加机构</Button>
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            v-if="!showPanel"
            :load-data="loadData"
            @on-select-change="selectNode"
            @on-toggle-expand='expandNode'
          ></Tree>
        </Card>
      </Col>
      <!-- 无效员工列表 -->
      <Col span="16" class="table-col" v-if="modalType==='tableList'">
        <invalidEmployees></invalidEmployees>
      </Col>
      <!-- 查看机构详情 -->
      <Col span="16" class="detail-col" v-if="modalType === '01'">
        <organizationForm :parentData='parentData'></organizationForm>
      </Col>
      <!-- 查看公司详情 -->
      <Col span="16" class="detail-col" v-if="modalType === '02'">
        <componeyForm :parentData='parentData'></componeyForm>
      </Col>
      <!-- 查看部门详情 -->
      <Col span="16" class="detail-col" v-if="modalType === '03'">
        <departmentForm :parentData='parentData'></departmentForm>
      </Col>
      <!-- 查看员工详情 -->
      <Col span="16" class="detail-col" v-if="modalType === '04'">
        <staffForm :parentData='parentData'></staffForm>
      </Col>
      <!-- 新增员工 -->
      <Col span="16" class="detail-col" v-if="roleModal">
        <addRole :parentData="parentData"></addRole>
      </Col>
      <!-- 新增机构 -->
      <Col span="16" class="detail-col" v-if="organizationModal">
        <addOrganization :parentData="parentData"></addOrganization>
      </Col>
    </Row>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
.table-col,
.detail-col {
  position: relative;
  .ivu-modal-wrap,
  .ivu-modal-mask {
    position: absolute;
  }
}
.detail-col {
  position: relative;
  .ivu-form {
    overflow: hidden;
  }
}
</style>

