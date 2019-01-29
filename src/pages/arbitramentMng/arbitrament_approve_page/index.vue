<template>

  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p
        slot="title"
        @click="showPanel=!showPanel"
      >
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
        检索条件
        <router-link to="/demo/demo_desc">
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >详情</Button>
        </router-link>
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="95"
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
            label="产品线:"
            prop="prdTyp"
          >
            <Select
              size="small"
              clearable
              placeholder="请选择产品线"
              v-model="formItem.prdTyp"
            >
              <Option
                v-for="item in getDirObj.PROD_TYPE"
                :value="item.itemCode"
                :key="item.itemName"
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
            label="案件编号:"
            prop="userNm"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.caseNo"
              placeholder="请输入案件编号"
            />
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
            label="账单号:"
            prop="billNo"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.billNo"
              placeholder="请输入账单号"
            />
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
            label="申请人:"
            prop="applyUserName"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.applyUserName"
              placeholder="请输入申请人"
            />
          </FormItem>
          </Col>

          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <!-- applyTimeLt & applyTimeGt -->
          <FormItem
            label="申请日期:"
            prop="mblNo"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="formItem.applyTimeLt"
              format="yyyy-MM-dd"
              type="datetimerange"
              placement="bottom-start"
              placeholder="请选择申请日期"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <!-- approvalTimeLt && approvalTimeBt -->
          <FormItem
            label="审核日期:"
            prop="mblNo"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="formItem.csDate"
              format="yyyy-MM-dd"
              type="datetimerange"
              placement="bottom-start"
              placeholder="请选择审核日期"
            ></DatePicker>
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
            label="审核状态:"
            prop="approvalState"
          >
            <Select
              size="small"
              clearable
              placeholder="请选择审核状态"
              v-model="formItem.approvalState"
            >
              <Option
                v-for="item in getDirObj.APPROVAL_STATE"
                :value="item.itemCode"
                :key="item.itemName"
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
        <router-link to="/buffet/buffet_add">
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >导出数据</Button>
        </router-link>
      </p>
      <!-- 表格 -->

      <div v-if="!showPanel2">
        <Table
          :data="tableData"
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
