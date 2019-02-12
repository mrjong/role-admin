<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon> 检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="角色名称:">
              <Input size="small" clearable v-model="formValidate.name" placeholder="请输入角色名称"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="状态:">
              <Select size="small" v-model="formValidate.status">
                <Option
                  v-for="item in roleStsList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formValidate')"
                style="width:80px"
                long
                size="small"
              >检索</Button>

              <Button
                size="small"
                type="ghost"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formValidate')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon> 检索结果
          <Button
                type="primary"
                @click.stop="addRole"
                class="fr header-btn"
                style="width:80px"
                size="small"
              >添加</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table border :data="tableData" :columns="tableColumns" stripe class="tableBox"></Table>
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
    <Modal v-model="modalSee" title="角色信息" @on-ok="ok">
          <Form
            v-if="!showPanel"
            ref="formValidate"
            :model="formValidate"
            :label-width="90"
            :rules="ruleValidate"
          >
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  label="角色名称:"
                >
                  <Input
                    size="small"
                    v-model="formValidateInfo.name"
                    placeholder=""
                    disabled
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="描述:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.desciption"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  label="创建时间:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.createtime"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="创建人:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.createUser"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  label="修改时间:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.updatetime"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="修改人:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.updateUser"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  span="6"
                  prop="mblNo"
                  label="角色状态:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.roleStatusName"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="角色类型:"
                >
                  <Input
                    disabled
                    size="small"
                    v-model="formValidateInfo.roleTypeName"
                    placeholder=""
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
      <div slot="footer">
        <Button size="small" @click="closeModal('1')">关闭</Button>
      </div>
    </Modal>
    <Modal
    v-model="modalChange"
    title="基本信息"
    >
    <p slot="header">
      <Icon type="filing"></Icon>
      <span>角色信息</span>
    </p>
    <Card class="vue-panel">
      <Form
        v-if="!showPanel"
        ref="formValidateChange"
        :model="formValidateChange"
        :label-width="90"
        :rules="ruleValidateChange"
      >
        <Row class="">
          <Col
            span="12"
          >
            <FormItem
              label="角色名称:"
              prop="name"
            >
              <Input
                size="small"
                clearable
                v-model="formValidateChange.name"
                placeholder=""
              ></Input>
            </FormItem>
          </Col>
          <Col
            span="12"
          >
            <FormItem
              label="描述:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidateChange.description"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row class="">
          <Col
            span="12"
          >
            <FormItem
              label="角色类型:"
              prop="roleType"
            >
              <Select
                size="small"
                v-model="formValidateChange.roleType"
              >
                <Option
                  v-for="item in roleTypList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col
            span="12"
          >
            <FormItem
              label="角色状态:"
              prop="roleStatus"
            >
              <Select
                size="small"
                v-model="formValidateChange.roleStatus"
              >
                <Option
                  v-for="item in roleStsList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <p slot="footer">
      <Button @click="closeModal('2')">取消</Button>
      <Button @click="modalChangeOk('formValidateChange')" type="primary">确定</Button>
    </p>
    </Modal>
    <Modal
      v-model="modalAddRole"
      title="基本信息"
    >
      <p slot="header">
        <Icon type="filing"></Icon>
        <span>角色信息</span>
      </p>
      <Card class="vue-panel">
        <Form
          v-if="!showPanel"
          ref="formValidateAdd"
          :model="formValidateAdd"
          :label-width="90"
          :rules="ruleValidateAdd"
        >
          <Row class="">
            <Col
              span="12"
            >
              <FormItem
                label="角色名称:"
                prop="name"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formValidateAdd.name"
                  placeholder=""
                ></Input>
              </FormItem>
            </Col>
            <Col
              span="12"
            >
              <FormItem
                label="描述:"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formValidateAdd.description"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class="">
            <Col
              span="12"
            >
              <FormItem
                label="角色类型:"
                prop="roleType"
              >
                <Select
                  size="small"
                  v-model="formValidateAdd.roleType"
                >
                  <Option
                    v-for="item in roleTypList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col
              span="12"
            >
              <FormItem
                label="角色状态:"
                prop="roleStatus"
              >
                <Select
                  size="small"
                  v-model="formValidateAdd.roleStatus"
                >
                  <Option
                    v-for="item in roleStsList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <p slot="footer">
        <Button @click="closeModal('3')">取消</Button>
        <Button @click="sureAddRole('formValidateAdd')" type="primary">确定</Button>
      </p>
    </Modal>
    <!-- 菜单分配 -->
    <div v-if="menuModal">
      <Modal v-model="menuModal" title="菜单" @on-ok="ok">
        <Row>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
            <label for="name">角色名称:</label>
            <Input size="small" clearable v-model="name" disabled id="name" style="width: auto"></Input>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <Tree
            :data="data5"
            :render="renderContent"
            multiple
            show-checkbox
            @on-select-change="selectNode"
            @on-check-change="checkChange"
          ></Tree>
          </Col>
        </Row>
        <div slot="footer">
          <Button size="small" @click="menuModalClose">关闭</Button>
          <Button size="small" type="primary" @click="menuUpdate">保存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
.tableBox {
  overflow-x: scroll;
  overflow-y: hidden;
  .tableMainW {
    min-width: 400px;
  }
}
.eachRow {
  .ivu-form-item {
    margin-bottom: 0;
  }
}
</style>
