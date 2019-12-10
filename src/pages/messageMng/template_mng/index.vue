<template>
  <div class="panel_list">
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
        v-if="!showPanelForm"
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
                multiple
                clearable
                placeholder="请选择模板类型"
                v-model="formItem.templType"
              >
                <Option
                  v-for="item in getDirObj.DIVIDE_PROD_TYPE"
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
              <Select clearable size="small" placeholder="请选择模板状态" v-model="formItem.templStatus">
                <Option
                  v-for="item in getDirObj['01_02_EFFECT_INVAL']"
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
                @click="clearForm('formItem')"
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
          @click.stop="handeldBtnClick('2')"
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

    <!-- 案件启用modal -->
    <div v-if="parameterFlag">
      <Modal
        v-model="parameterFlag"
        width="800"
        class-name="user_info_form_modal"
        :closable="false"
        footer-hide
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 16px; font-weight: 500">
          <span>请配置参数</span>
        </p>
        <configParameter>
          <template v-slot:default="slotProps">
            <Button size="small" @click>取消</Button>
            <Button type="primary" size="small" @click>确定</Button>
          </template>
        </configParameter>
      </Modal>
    </div>
    <!-- 案件停用modal -->
    <!-- <div v-if="stopFlag">
      <Modal
        v-model="stopFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>停用</span>
        </p>
        <Alert show-icon type="warning">
          <template slot="desc">停用后，此规则将失效，是否继续？</template>
        </Alert>
        <div slot="footer">
          <Button size="small" @click="cancel('2')">取消</Button>
          <Button type="primary" size="small" @click="ok('2', 'startFormItem')">确定</Button>
        </div>
      </Modal>
    </div>-->
    <!-- 查看分案规则修改记录 -->
    <!-- <div v-if="parentData.updateRecordFlag">
      <caseUpdateRecord v-if="parentData.updateRecordFlag" v-model="parentData"></caseUpdateRecord>
    </div>-->
  </div>
</template>
<script src='./index.js'></script>


