<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel = !showPanel">
        <Icon :type="!showPanel ? 'chevron-down' : 'chevron-up'"></Icon>检索条件
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
              <Input
                size="small"
                clearable
                v-model.trim="formValidate.name"
                placeholder="请输入角色名称"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="状态:">
              <Select
                size="small"
                v-model="formValidate.status"
                placeholder="请选择状态"
              >
                <Option
                  v-for="item in status"
                  :value="item.code"
                  :key="item.code"
                  >{{ item.name }}</Option
                >
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
                :loading="query_loading"
              >
                <span v-if="!query_loading">检索</span>
                <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formValidate')"
                >重置</Button
              >
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2 = !showPanel2">
        <Icon :type="!showPanel2 ? 'chevron-down' : 'chevron-up'"></Icon
        >检索结果
        <Button
          type="primary"
          @click.stop="addRole"
          class="fr header-btn"
          style="width:80px"
          size="small"
          v-if="add"
          >添加</Button
        >
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          border
          :data="tableData"
          :columns="tableColumns"
          stripe
          class="tableBox"
        ></Table>
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

    <!-- 查看弹窗 -->
    <Modal v-model="modalSee" title="角色信息" @on-ok="ok" class="role-modal">
      <Card class="vue-panel panel_list" :dis-hover="true">
        <Form
          v-if="!showPanel"
          ref="formValidate"
          :model="formValidate"
          :label-width="90"
          :rules="ruleValidate"
        >
          <Row class="eachRow">
            <Col span="12">
              <FormItem label="角色名称:">
                <Input
                  size="small"
                  v-model="formValidateInfo.roleName"
                  placeholder="请输入角色名称"
                  disabled
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class="eachRow">
            <Col span="12">
              <FormItem label="创建时间:">
                <Input
                  disabled
                  size="small"
                  v-model="formValidateInfo.createTime"
                  placeholder
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="创建人:">
                <Input
                  disabled
                  size="small"
                  v-model="formValidateInfo.creator"
                  placeholder
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class="eachRow">
            <Col span="12">
              <FormItem label="修改时间:">
                <Input
                  disabled
                  size="small"
                  v-model="formValidateInfo.updateTime"
                  placeholder
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="修改人:">
                <Input
                  disabled
                  size="small"
                  v-model="formValidateInfo.updator"
                  placeholder
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class="eachRow">
            <Col span="12">
              <FormItem span="6" prop="mblNo" label="角色状态:">
                <Input
                  disabled
                  size="small"
                  v-model="formValidateInfo.sts"
                  placeholder
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <div slot="footer">
        <Button size="small" @click="closeModal('1')">关闭</Button>
      </div>
    </Modal>

    <!-- 修改弹窗 -->
    <Modal v-model="modalChange" title="基本信息" class="role-modal">
      <p slot="header">
        <Icon type="filing"></Icon>
        <span>角色信息</span>
      </p>
      <Card class="vue-panel" :dis-hover="true">
        <Form
          v-if="!showPanel"
          ref="formValidateChange"
          :model="formValidateChange"
          :label-width="90"
          :rules="ruleValidateChange"
        >
          <Row class>
            <Col span="12">
              <FormItem label="角色名称:" prop="roleName">
                <Input
                  size="small"
                  clearable
                  v-model="formValidateChange.roleName"
                  placeholder="请输入角色名称"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class>
            <Col span="12">
              <FormItem label="角色状态:" prop="roleStatus">
                <Select
                  size="small"
                  v-model="formValidateChange.roleStatus"
                  placeholder="请选择角色状态"
                >
                  <Option
                    v-for="item in status"
                    :value="item.code"
                    :key="item.code"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <p slot="footer">
        <Button @click="closeModal('2')">取消</Button>
        <Button
          @click="modalChangeOk('formValidateChange')"
          type="primary"
          :loading="update_loading"
        >
          <span v-if="!update_loading">确定</span>
          <span v-else>修改中...</span>
        </Button>
      </p>
    </Modal>
    <Modal v-model="modalAddRole" title="基本信息" class="role-modal">
      <p slot="header">
        <Icon type="filing"></Icon>
        <span>角色信息</span>
      </p>
      <Card class="vue-panel" :dis-hover="true">
        <Form
          v-if="!showPanel"
          ref="formValidateAdd"
          :model="formValidateAdd"
          :label-width="90"
          :rules="ruleValidateAdd"
        >
          <Row class>
            <Col span="12">
              <FormItem label="角色名称:" prop="roleName">
                <Input
                  size="small"
                  clearable
                  v-model="formValidateAdd.roleName"
                  placeholder="请输入角色名称"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class>
            <Col span="12">
              <FormItem label="角色状态:" prop="roleStatus">
                <Select size="small" v-model="formValidateAdd.roleStatus">
                  <Option
                    v-for="item in status"
                    :value="item.code"
                    :key="item.code"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <p slot="footer">
        <Button @click="closeModal('3')">取消</Button>
        <Button
          @click="sureAddRole('formValidateAdd')"
          type="primary"
          :loading="add_loading"
        >
          <span v-if="!add_loading">确定</span>
          <span v-else>添加中...</span>
        </Button>
      </p>
    </Modal>
    <!-- 菜单分配 -->
    <div v-if="menuModal">
      <Modal v-model="menuModal" title="菜单" @on-ok="ok">
        <Row>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
            <label for="roleName">角色名称:</label>
            <Input
              size="small"
              clearable
              v-model="roleName"
              disabled
              id="name"
              style="width: auto"
            ></Input>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <Tree
              :data="data5"
              ref="tree"
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
          <Button
            size="small"
            type="primary"
            @click="menuUpdate"
            :loading="allot_loading"
            v-if="allot_submit"
          >
            <span v-if="!allot_loading">保存</span>
            <span v-else>保存中...</span>
          </Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
.eachRow {
  .ivu-form-item {
    margin-bottom: 0;
  }
}
.role-modal {
  .vue-panel {
    border: none;
  }
  .ivu-form {
    min-height: 200px;
  }
}
</style>
