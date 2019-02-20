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
              label="实际还款日期:"
            >
              <DatePicker
                size="small"
                style="width:100%"
                v-model="startRepayDateRange"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择实际还款时间区间"
                @on-change="changeActDate"
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
              label="应还款日期:"
            >
              <DatePicker
                size="small"
                style="width:100%"
                v-model="shouldRepayDate"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择应还款时间区间"
                @on-change="changeDueDate"
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
              label="还款状态:"
            >
              <Select
                size="small"
                v-model="formValidate.payOffSts"
              >
                <Option
                  v-for="item in getDirObj.PAY_OFF_STS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemDesc }}</Option>
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
              label="案件编码:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.caseNo"
                placeholder="请输入案件编码"
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
              span="6"
              prop="mblNo"
              label="经办人:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.opUserName"
                placeholder="请输入经办人姓名"
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
              label="电催中心:"
            >
              <Select
                size="small"
                v-model="formValidate.opCompayName">
                <Option
                v-for="item in opCompanyNameList"
                :value="item.name"
                :key="item.id"
                >{{item.name}}
                </Option>
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
              label="客户姓名:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.userNm"
                placeholder="请输入客户姓名"
              ></Input>
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
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            @click.stop="exportData"
          >导出数据</Button>
      </p>
      <!-- 表格 -->

      <div v-if="!showPanel2">
        <div class="panel-desc">
          <Row :gutter="5">

            <div class="panel-desc-title fl mr10">
              回款数(笔)：<span>{{summary.repayOrdDetailCount||0}}</span>
            </div>
            <div class="panel-desc-title fl mr10">
              还款金额(元)：<span>{{summary.sumRepayAmt||0.00}}</span>
            </div>
          </Row>
        </div>
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
  .tableBox {
    overflow-x: scroll ;
    overflow-y: hidden;
    .tableMainW {
      min-width: 400px;
    }
  }
</style>
