<template>
  <div class="panel_list">
    <Row :gutter="8" class="detail-row">
      <!-- 左侧树结构 -->
      <Col span="8" class="tree-col">
        <Card class="vue-panel tree-card">
          <p slot="title">
            <Icon :type="!showPanel?'chevron-down':'chevron-up'" @click="showPanel=!showPanel"></Icon>菜单
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
      <Col span="16" class="detail-col">
        <Card class="vue-panel detail-card" v-show="detailFlag">
          <p slot="title">基本信息</p>
          <!-- 菜单项详情 -->
          <Form ref="menuFormItem" :model="menuFormItem" :label-width="90" :rules="ruleValidate1">
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
              <FormItem span="4" label="字典项名称:" prop="itemName">
                <Input
                  size="small"
                  clearable
                  v-model.trim="menuFormItem.itemName"
                  placeholder="请输入字典项名称"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="字典项代码:" prop="itemCode">
                <Input size="small" v-model.trim="menuFormItem.itemCode" placeholder="请输入字典项代码"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="字典项描述:">
                <Input size="small" v-model.trim="menuFormItem.itemDesc" placeholder="请输入字典项描述"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
              <FormItem span="4" label="排序号:">
                <Input size="small" v-model.trim="menuFormItem.sort" placeholder="请输入排序号"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
              <FormItem>
                <Button
                  type="primary"
                  @click="handleSubmit('menuFormItem', 1)"
                  style="width:80px"
                  long
                  size="small"
                >确定</Button>
              </FormItem>
            </Col>
          </Form>
        </Card>
      </Col>
      <!-- 新建模态框 -->
      <div v-if="modal">
        <Modal
          v-model="modal"
          @on-cancel="cancel"
          width="500"
          :transfer="false"
          :mask-closable="false"
        >
          <p slot="header" style="color:#333; font-size: 20px; font-weight: 600;line-height: 12px;">
            <span>新建节点</span>
          </p>
          <Form ref="newMenuItem" :model="newMenuItem" :label-width="90" :rules="ruleValidate1">
            <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
              <FormItem span="4" label="字典项名称:" prop="itemName">
                <Input
                  size="small"
                  v-model="newMenuItem.itemName"
                  id="acount"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
              <FormItem span="4" label="级别:" prop="depth">
                <Input
                  size="small"
                  v-model="newMenuItem.depth"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
              <FormItem span="4" label="字典代码:" prop="itemCode">
                <Input
                  size="small"
                  v-model="newMenuItem.itemCode"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
              <FormItem span="4" label="字典描述:" prop="itemDesc">
                <Input
                  size="small"
                  v-model="newMenuItem.itemDesc"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
              <FormItem span="4" label="排序号:" prop="sort">
                <Input size="small" v-model="newMenuItem.sort" style="width: auto"></Input>
              </FormItem>
            </Col>
          </Form>
          <div slot="footer">
            <Button size="small" @click="cancel">取消</Button>
            <Button type="primary" size="small" @click="handleSubmit('newMenuItem', 0)">确定</Button>
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
  /deep/  .ivu-tree {
    height: 620px;
    overflow-y: auto;
  }
}
/deep/ .ivu-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/deep/ .detail-col {
  position: relative;
  .ivu-form {
    overflow: hidden;
  }
}
</style>

