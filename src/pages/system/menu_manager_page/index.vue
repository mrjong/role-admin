<template>
  <div class="panel_list">
    <Row :gutter="8">
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
              @click="setModalType('tableList')"
              style="width:80px"
              long
              size="small"
            >刷新</Button>
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            v-if="!showPanel"
            show-checkbox
            multiple
            @on-select-change="selectNode"
          ></Tree>
        </Card>
      </Col>
      <Col span="16" class="detail-col">
        <Card class="vue-panel detail-card" v-if="detailFlag">
          <p slot="title">基本信息</p>
          <!-- 菜单项详情 -->
          <Form
            ref="menuFormItem"
            :model="menuFormItem"
            :label-width="90"
            :rules="ruleValidate1"
            v-if="type === '1'"
          >
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
              <FormItem span="4" label="菜单名称:" prop='text'>
                <Input
                  size="small"
                  clearable
                  v-model="menuFormItem.text"
                  placeholder="请输入菜单名称"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="位置:" prop='sort'>
                <Input
                  size="small"
                  v-model="menuFormItem.sort"
                  placeholder="请输入位置"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="URL:">
                <Input
                  size="small"
                  v-model="menuFormItem.url"
                  placeholder="请输入url"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="图标:">
                <Input
                  size="small"
                  v-model="menuFormItem.icon"
                  placeholder="请输入图标"
                ></Input>
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
    </Row>
  </div>
</template>
<script src="./index.js"></script>
