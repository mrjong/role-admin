<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px">
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="90"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="6"
          >
          <FormItem
            label="任务名称:" style="display: flex; align-items: center;"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.taskName"
              placeholder="请输入任务名称"
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="6"
          >
          <FormItem
            label="开始时间:"
            style="display: flex; align-items: center;"
          >
            <DatePicker
              size="small"
              style="width:100%"
              v-model="formItem.startTimeArray"
              format="yyyy-MM-dd"
              type="daterange"
              placement="bottom-start"
              placeholder="请选择创建时间"
              @on-change="changeDate"
              @on-ok="changeDate"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="6">
          <FormItem label="执行状态:" style="display: flex; align-items: center;">
            <Select size="small" clearable placeholder="请选择执行状态" v-model="formItem.executionSts">
              <Option
                v-for="item in getDirObj['EXECUTION_STS']"
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
              style="width:80px; margin-left: 20px"
              long
              size="small"
              :loading='queryLoading'
            >
              <span v-if="!queryLoading">检索</span>
              <span v-else>检索...</span>
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
    <Card class="vue-panel-table" >
      <p
        slot="title"
        style="display: flex; justify-content: space-between;"
      >
        <span style="height:30px;">检索结果</span>
      </p>
      <!-- 表格 -->
      <div>
        <Table
          border
          :data="tableData"
          :columns="tableColumns"
          stripe
          class="tableBox"
          :row-class-name="rowStyle"
        >
        </Table>
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
<style src="./index.less" lang="less" scoped></style>

