<template>
  <div class="panel_list">
    <Row :gutter="8" class="detail-row">
      <!-- 左侧树结构 -->
      <Col span="8" class="tree-col">
        <Card class="vue-panel tree-card">
          <p slot="title">
            <Icon :type="!showPanel?'chevron-down':'chevron-up'" @click="showPanel=!showPanel"></Icon>菜单
            <!-- <router-link to="/demo/demo_desc">
              <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
            </router-link>-->
            <Button
              class="fr header-btn"
              type="primary"
              @click="getList()"
              style="width:80px"
              long
              size="small"
            >刷新</Button>
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            v-if="!showPanel"
            multiple
            @on-select-change="selectNode"
          ></Tree>
        </Card>
      </Col>
      <!-- 修改菜单项 -->
      <Col span="16" class="detail-col" v-if="modal === '1'">
        <Card class="vue-panel detail-card">
          <p slot="title">修改信息</p>
          <!-- 菜单项详情 -->
          <Form ref="menuFormItem" :model="menuFormItem" :label-width="90" :rules="ruleValidate1">
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
              <FormItem span="4" label="菜单名称:" prop="text">
                <Input size="small" clearable v-model="menuFormItem.text" placeholder="请输入菜单名称"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="位置:" prop="sort">
                <Input size="small" v-model="menuFormItem.sort" placeholder="请输入位置"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="URL:" prop="url">
                <Input size="small" v-model="menuFormItem.url" placeholder="请输入url"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="图标:">
                <Input size="small" v-model="menuFormItem.icon" placeholder="请选择图标"></Input>
                <Button type="primary" size="small" @click="showIconList">选择图标</Button>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
              <FormItem>
                <Button
                  type="primary"
                  @click="handleSubmit('menuFormItem')"
                  style="width:80px"
                  long
                  size="small"
                >确定</Button>
              </FormItem>
            </Col>
          </Form>
        </Card>
      </Col>
      <!-- 新建菜单项 -->
      <Col span="16" class="detail-col" v-if="modal === '0'">
        <Card class="vue-panel detail-card">
          <p slot="title">新建菜单项</p>
          <!-- 菜单项详情 -->
          <Form
            ref="menuAddFormItem"
            :model="menuAddFormItem"
            :label-width="90"
            :rules="ruleValidate2"
          >
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
              <FormItem span="4" label="菜单名称:" prop="text">
                <Input size="small" clearable v-model="menuAddFormItem.text" placeholder="请输入菜单名称"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="位置:" prop="sort">
                <Input size="small" v-model="menuAddFormItem.sort" placeholder="请输入位置"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="URL:" prop="url">
                <Input size="small" v-model="menuAddFormItem.url" placeholder="请输入url"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="图标:">
                <Input size="small" v-model="menuAddFormItem.icon" placeholder="请选择图标"></Input>
                <Button type="primary" size="small" @click="showIconList">选择图标</Button>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
              <FormItem>
                <Button type="ghost" size="small" @click="cancel">取消</Button>
                <Button type="primary" size="small" @click="ok">确定</Button>
              </FormItem>
            </Col>
          </Form>
        </Card>
      </Col>
      <!-- 选择图标 -->
      <div v-if="showIconFlag">
        <Modal
          v-model="showIconFlag"
          width="800"
          class-name="user_info_form_modal"
          :mask-closable="false"
        >
          <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
            <span>图标</span>
          </p>
          <IconList v-on:passBack="passBack"></IconList>
          <div slot="footer">
            <Button type="ghost" size="small" @click="selectIcon">关闭</Button>
            <Button
              type="primary"
              size="small"
              @click="selectIcon"
            >确定</Button>
          </div>
        </Modal>
      </div>
    </Row>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
.tdetail-row,
.detail-col {
  position: relative;
}
.tree-col {
  .ivu-tree {
    height: 620px;
    overflow-y: auto;
  }
}
.detail-col {
  position: relative;
  .ivu-form {
    overflow: hidden;
  }
}
</style>

