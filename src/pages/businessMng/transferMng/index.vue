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
      </p>
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
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
              label="产品线:"
            >
              <Select
                size="small"
                v-model="formValidate.prdTyp"
                placeholder="请选择产品线"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
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
              label="案件号:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.caseNo"
                placeholder="请输入案件号"
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
              label="账单号:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.billNo"
                placeholder="请输入账单号"
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
              label="订单状态:"
            >
              <Select
                size="small"
                v-model="formValidate.repayOrdSts"
                placeholder="请选择订单状态"
              >
                <Option
                  v-for="item in getDirObj.REPAY_ORD_STS"
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
              label="申请日期:"
            >
              <DatePicker
                size="small"
                style="width:100%"
                v-model="applyDate"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择申请日期区间"
                @on-change="changeApplyDate"
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
              label="申请流水号:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.applyNo"
                placeholder="请输入流水号"
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
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
</style>
