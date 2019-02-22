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
      <Card class="vue-panel detail-card" v-if="detailFlag">
        <p slot="title">基本信息</p>
        <!-- 菜单项详情 -->
        <Form ref="menuFormItem" :model="menuFormItem" :label-width="90" :rules="ruleValidate1">
          <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="字典项名称:" prop="text">
            <Input size="small" clearable v-model="menuFormItem.itemName" placeholder="请输入字典项名称"></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="字典项代码:" prop="sort">
            <Input size="small" v-model="menuFormItem.itemCode" placeholder="请输入字典项代码"></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="字典项描述:">
            <Input size="small" v-model="menuFormItem.itemDesc" placeholder="请输入字典项描述"></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="排序号:">
            <Input size="small" v-model="menuFormItem.sort" placeholder="请输入排序号"></Input>
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
      <!-- 新建模态框 -->
      <div v-if="modal">
        <Modal
          v-model="modal"
          @on-ok="ok"
          @on-cancel="cancel"
          width="500"
          :transfer="false"
          :mask-closable="false"
        >
          <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
            <span>新建节点</span>
          </p>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
          <label for="acount">节点名称：</label>
          <Input size="small" v-model="newMenuItem.itemName" id="acount" style="width: auto;margin-bottom: 10px"></Input>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
            <label for="acount">级别：</label>
            <Input size="small" v-model="newMenuItem.depth"  style="width: auto;margin-bottom: 10px;"></Input>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
            <label for="acount">字典描述：</label>
            <Input size="small" v-model="newMenuItem.depth"  style="width: auto;margin-bottom: 10px;"></Input>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
            <label for="acount">字典代码：</label>
            <Input size="small" v-model="newMenuItem.depth"  style="width: auto;margin-bottom: 10px;"></Input>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="4">
            <label for="acount">排序号：</label>
            <Input size="small" v-model="newMenuItem.sort"  style="width: auto"></Input>
          </Col>
          <div slot="footer">
            <Button   size="small" @click="cancel">取消</Button>
            <Button type="primary" size="small" @click="ok">确定</Button>
          </div>
        </Modal>
      </div>
    </Row>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
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
  .ivu-modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .detail-col {
    position: relative;
    .ivu-form {
      overflow: hidden;
    }
  }
</style>

