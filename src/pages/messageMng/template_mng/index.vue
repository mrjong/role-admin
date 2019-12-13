<template>
  <div class="panel_list message_mng_wrap">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanelForm=!showPanelForm">
        检索条件
        <Icon
          size="18"
          style="margin-left: 10px"
          :type="!showPanelForm?'md-arrow-round-down':'md-arrow-round-up'"
        ></Icon>
      </p>
      <Form
        v-show="!showPanelForm"
        ref="formItem"
        :rules="formRules"
        :model="formItem"
        :label-width="95"
        style="padding: 10px 0"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="4" label="模板类型:" prop="templType">
              <Select
                size="small"
                clearable
                placeholder="请选择模板类型"
                v-model.trim="formItem.templType"
              >
                <Option
                  v-for="item in getDirObj.MSG_TEMPL_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="模板名称:" prop="templName">
              <Input
                size="small"
                clearable
                v-model.trim="formItem.templName"
                placeholder="请输入模板名称"
              />
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="模板状态:" prop="templStatus">
              <Select clearable size="small" placeholder="请选择模板状态" v-model.trim="formItem.templStatus">
                <Option
                  v-for="item in getDirObj['MSG_TEMPL_STATUS']"
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
                @click="clearForm()"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>

    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title" @click.stop="showPanelTable=!showPanelTable">
        检索结果
        <Icon
          :type="!showPanelTable?'md-arrow-round-down':'md-arrow-round-up'"
          size="18"
          style="margin-left: 10px"
        ></Icon>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="getTemplateFlag = !getTemplateFlag"
        >获取模板</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanelTable">
        <Table :data="tableData" border :columns="tableColumns" stripe></Table>
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

    <!-- 参数配置modal -->
    <div v-if="parameterFlag">
      <Modal
        v-model="parameterFlag"
        width="550"
        class-name="user_info_form_modal"
        :closable="false"
        footer-hide
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 16px; font-weight: 500">
          <span>请配置参数</span>
        </p>
        <configParameter :dataSource='currentRow'>
          <template v-slot:default="slotProps">
            <Button size="small" @click="handleCancelParameter" style="margin-right: 25px;">取消</Button>
            <Button type="primary" size="small" @click="handleSubmitModalprops(slotProps, 'configParams')" :loading='isBtnLoading'>确定</Button>
          </template>
        </configParameter>
      </Modal>
    </div>
    <!-- 获取模板modal -->
    <div v-if="getTemplateFlag">
      <Modal
        v-model="getTemplateFlag"
        width="400"
        class-name="user_info_form_modal"
        :closable="false"
        footer-hide
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 16px; font-weight: 500">
          <span>获取模板</span>
        </p>

        <getTemplate :getParentCodeList='getDirObj.MSG_TEMPL_TYPE'>
          <template v-slot:default="slotProps">
            <Button size="small" @click="handleCancelTemplate" style="margin-right: 25px;">取消</Button>
            <Button type="primary" size="small" @click="handleSubmitModalprops(slotProps, 'getTemplate')" :loading='isBtnLoading'>确定</Button>
          </template>
        </getTemplate>
      </Modal>
    </div>
    <!-- 创建任务modal -->
    <div v-if="createTaskFlag">
      <Modal
        v-model="createTaskFlag"
        width="550"
        class-name="user_info_form_modal"
        :closable="false"
        footer-hide
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 16px; font-weight: 500">
          <span>创建任务</span>
        </p>

        <newTask>
          <template v-slot:default="slotProps">
            <Button size="small" @click="handleCancelCreateTask" style="margin-right: 25px;">取消</Button>
            <Button type="primary" size="small" @click="handleSubmitModalprops(slotProps, 'createTask')" :loading='isBtnLoading'>确定</Button>
          </template>
        </newTask>
      </Modal>
    </div>
  </div>
</template>
<script src='./index.js'></script>

<style lang="less" scoped>
/deep/ .ivu-form-item {
  margin-bottom: 14px;
}
/deep/ .ivu-radio-wrapper {
  min-width: 72px;
}
</style>


