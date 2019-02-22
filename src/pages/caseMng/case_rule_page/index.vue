<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form v-if="!showPanel" ref="formItem" :model="formItem" :label-width="95">
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="4" label="产品线:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择产品线"
                v-model="formItem.prodTypeList"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="规则状态:">
              <Select clearable size="small" placeholder="请选择规则状态" v-model="formItem.status">
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
              >检索</Button>
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
      <p slot="title">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handeldBtnClick('2')"
        >添加</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handleBtnDistribute"
        >一键分配</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
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
    <div v-if="recycleFlag">
      <Modal
        v-model="recycleFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false">
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>启用</span>
        </p>
        <Form
          ref="startFormItem"
          :model="startFormItem"
          :label-width="95"
          :rules="ruleValidate1"
          style="height: 200px"
        >
          <FormItem span="6" label="有效时间:" prop="date">
            <DatePicker
              v-model="startFormItem.date"
              format="yyyy-MM-dd"
              type="daterange"
              placeholder="请选择有效时间"
              size="small"
              style="width: 300px"
              @on-change="dateChange"
            ></DatePicker>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button   size="small" @click="cancel('1')">取消</Button>
          <Button type="primary" size="small" @click="ok('1', 'startFormItem')">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 案件停用modal -->
    <div v-if="stopFlag">
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
          <template
            slot="desc"
          >停用后，此规则将失效，是否继续？</template>
        </Alert>
        <div slot="footer">
          <Button   size="small" @click="cancel('2')">取消</Button>
          <Button type="primary" size="small" @click="ok('2', 'startFormItem')">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 查看分案规则修改记录 -->
    <div v-if="parentData.updateRecordFlag">
      <caseUpdateRecord v-if="parentData.updateRecordFlag" v-model="parentData" ></caseUpdateRecord>
    </div>
  </div>
</template>
<script src='./index.js'></script>

