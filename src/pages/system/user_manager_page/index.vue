<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Row :gutter="8">
      <Col span="8">
        <Card class="vue-panel">
          <p slot="title">
            <Icon :type="!showPanel?'chevron-down':'chevron-up'" @click="showPanel=!showPanel"></Icon>催收人员
            <!-- <router-link to="/demo/demo_desc">
              <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
            </router-link>-->
          </p>
          <Tree :data="data5" :render="renderContent" v-if="!showPanel"></Tree>
        </Card>
      </Col>
      <Col span="16">
        <Card class="vue-panel">
          <p slot="title">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索条件
            <!-- <router-link to="/demo/demo_desc">
              <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
            </router-link> -->
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
      </Col>
    </Row>
  </div>
</template>
<script src="./index.js"></script>
