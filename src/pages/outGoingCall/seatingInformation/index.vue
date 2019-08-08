<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px">
        <p slot="title">
          检索条件
        </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="渠道名称:" >
            <Select size="small" clearable placeholder="请选择呼叫类型" v-model="formItem.isLock" style="margin-top: 5px">
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="渠道类型:" >
            <Select size="small" clearable placeholder="请选择渠道类型" v-model="formItem.isLock" style="margin-top: 5px">
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="18"
            :lg="18"
            span="6"
          >
          <FormItem>
            <div  style="margin-top: 1px">
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
            </div>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p
        slot="title"
        style="display: flex;"
      >
        <span style="height:30px; flex: 1">检索结果</span>
        <span >
          <Button size="small"
                  style="width:80px"
                  @click="showAddChannel=true"
                  v-if="add_handle" type="primary">添加
          </Button>
          <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">导出</Button>
        </span>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          border
          :data="tableData"
          :columns="tableColumns"
          stripe
          class="tableBox"
          :row-class-name="rowStyle"
        >
          <template slot-scope="{ row, index }" slot="handle" >
              <div style="padding: 5px">
                <Button
                  style="width: 80px"
                  size="small"
                  @click="handleClick(row, 'update')">
                  修改
                </Button>
                <Button
                  style="width: 80px"
                  size="small"
                  @click="handleClick(row, 'seatsMg')">
                  管理坐席
                </Button>
                <Button
                  style="width: 80px"
                  size="small"
                  @click="handleClick(row, 'faultDebugger')">
                  故障调试
                </Button>
              </div>

          </template>
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
        <AddChannel :showAddChannel="showAddChannel" @passBack="passBack"/>
        <SeatsMg :showSeatsMg="showSeatsMg" @passBack="passBack"/>
        <Phone :showPhone="showPhone" @passBack="passBack"/>
      </div>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

