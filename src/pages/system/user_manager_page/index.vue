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
              @click="addOrganization('formItem')"
              style="width:64px"
              long
              size="small"
            >添加机构</Button>
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            v-if="!showPanel"
            @on-select-change="selectNode"
          ></Tree>
        </Card>
      </Col>
      <!-- 无效员工列表 -->
      <Col span="16" class="table-col" v-if="modalType==='tableList'">
        <!-- 检索条件 -->
        <Card class="vue-panel">
          <p slot="title">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索条件
            <!-- <router-link to="/demo/demo_desc">
              <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
            </router-link>-->
          </p>
          <Form
            v-if="!showPanel2"
            ref="formItem"
            :model="formItem"
            :label-width="90"
            :rules="ruleValidate"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8" span="4">
                <FormItem label="公司名称:" prop="device_id">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.componey_name"
                    placeholder="请输入公司名称"
                  />
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8" span="4">
                <FormItem label="用户名称:">
                  <Input size="small" clearable v-model="formItem.name" placeholder="请输入用户名称"></Input>
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
                  >检索</Button>
                  <Button
                    size="small"
                    type="ghost"
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
            <Icon :type="!showPanel3?'chevron-down':'chevron-up'" @click="showPanel3=!showPanel3"></Icon>检索结果
            <!-- <router-link to="/buffet/buffet_add">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">导出数据</Button>
            </router-link>-->
            <Button
              class="fr header-btn"
              type="primary"
              @click="handleAdd('formItem')"
              style="width:80px"
              long
              size="small"
            >添加</Button>
          </p>
          <!-- 表格 -->
          <div v-if="!showPanel3">
            <Table :data="tableData" :columns="tableColumns" stripe width="800" size="small"></Table>
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
          </div>
        </Card>
        <div v-if="modal1">
          <Modal
            v-model="modal1"
            @on-ok="ok"
            @on-cancel="cancel"
            width="500"
            :transfer="false"
            :mask-closable="false"
          >
            <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
              <span>状态变更</span>
            </p>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
              <label for="acount">账号：</label>
              <Input size="small" v-model="acount" disabled id="acount" style="width: auto"></Input>
            </Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" style="margin-left: 20px;">
              <label for="radio">状态：</label>
              <RadioGroup v-model="status" id="radio" span="4">
                <Radio label="0">可用</Radio>
                <Radio label="1">冻结</Radio>
              </RadioGroup>
            </Col>
            <div slot="footer">
              <Button type="ghost" size="small" @click="ok">取消</Button>
              <Button type="primary" size="small" @click="cancel">确定</Button>
            </div>
          </Modal>
        </div>
      </Col>
      <!-- 查看机构详情 -->
      <Col span="16" class="detail-col" v-if="modalType === '1'">
        <Card class="vue-panel detail-card">
          <p slot="title">
            催收人员
            <Button
              class="fr header-btn"
              type="primary"
              @click="setModalType('tableList')"
              style="width:90px"
              long
              size="small"
            >修改</Button>
            <Button
              class="fr header-btn"
              type="primary"
              @click="addOrganization('formItem')"
              style="width:64px"
              long
              size="small"
            >状态变更</Button>
          </p>
          <Form
            ref="organizationFormItem"
            :model="organizationFormItem"
            :label-width="90"
            :rules="ruleValidate"
          >
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="机构名称:" prop="name">
                  <Input size="small" clearable v-model="organizationFormItem.name" placeholder="请输入机构名称"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="机构负责人:" prop="person">
                  <Input size="small" clearable v-model="organizationFormItem.person" placeholder="请输入机构负责人"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="系统角色:" span="4" prop="role">
                  <Select
                    size="small"
                    v-model="organizationFormItem.role"
                    filterable
                    clearable
                    placeholder="请选择系统角色"
                  >
                    <Option
                      v-for="item in productTimeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="创建人:">
                  <Input size="small" v-model="organizationFormItem.createUser" disabled></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="创建时间:">
                  <Input size="small" v-model="organizationFormItem.createTime" disabled></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="修改人:">
                  <Input size="small" v-model="organizationFormItem.updateUser" disabled></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="修改时间:">
                  <Input size="small" v-model="organizationFormItem.updateTime" disabled></Input>
                </FormItem>
              </Col>
          </Form>
        </Card>
      <!-- <div slot="footer">
        <Button type="ghost" size="small" @click="del">关闭</Button>
        <Button type="primary" size="small" @click="del" v-if="model.type !== '1'">修改</Button>
      </div> -->
        <!-- </Card> -->
      </Col>
      <!--  -->
    </Row>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
.table-col {
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

