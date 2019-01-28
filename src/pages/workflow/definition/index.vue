<template>

  <div class="panel_list">
    <!-- 检索条件 -->
    <gongzuoliu
    v-on:passBack="passBack"
      v-model="parentData"
      v-if="visible1"
      :parentData="parentData"
      :backTypeList="backTypeList"
      :defTypeList="defTypeList"
    ></gongzuoliu>

    <Card class="vue-panel">
      <p
        slot="title"
        @click="showPanel=!showPanel"
      >
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
        检索条件
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handView"
        >添加</Button>
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>

          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            span="6"
            label="工作流编号:"
            prop="defCode"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.defCode"
              placeholder="请输入工作流编号"
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            span="6"
            label="工作流类型:"
            prop="defType"
          >
            <Select
              size="small"
              v-model="formItem.defType"
            >
              <Option
                v-for="item in defTypeList"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            span="6"
            label="驳回类型:"
            prop="backType"
          >
            <Select
              size="small"
              v-model="formItem.backType"
            >
              <Option
                v-for="item in backTypeList"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            span="6"
          >
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
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p
        slot="title"
        @click="showPanel2=!showPanel2"
      >
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
        检索结果
      </p>
      <!-- 表格 -->

      <div v-if="!showPanel2">
        <Table
          :data="tableData"
          border
          :columns="tableColumns"
          stripe
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
  </div>
</template>
<script src="./index.js"></script>
