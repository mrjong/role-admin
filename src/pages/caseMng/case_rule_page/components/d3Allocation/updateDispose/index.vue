<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Drawer
      :value="showUpdateDispose"
      width="720"
      title="配置"
      :closable="false"
      :mask-closable="false"
      @on-close="closeDrawer"
      :styles="styles"
    >
      <Card class="vue-panel" style="margin-bottom: 30px;" :dis-hover="true">
        <Form
          ref="formItem"
          :model="formItem"
          :label-width="105"
          :rules="ruleValidate"
          :style="{'width': '100%', margin:'0'}"
        >
          <Row>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6" style="margin: 0 auto">
            <FormItem span="6" label="产品线:" prop="prodTypeList">
              <Select
                size="small"
                clearable
                placeholder="请选择产品线"
                v-model="formItem.prodTypeList"
              >
                <Option
                  v-for="item in getDirObj.DIVIDE_PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="2" :lg="2" span="6"><div style="width: 10%; height: 1px"></div></Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem label="产品期数:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择产品期数"
                v-model="formItem.perdCountList"
              >
                <Option
                  v-for="item in getDirObj.DIVIDE_PROD_CNT"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem label="到期期数:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择到期期数"
                v-model="formItem.perdThisCountList"
              >
                <Option
                  v-for="item in getDirObj.DIVIDE_PROD_NUM"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="2" :lg="2" span="6"><div style="width: 10%; height: 1px"></div></Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem label="逾期天数:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
              <FormItem prop="ovdudaysMin">
                <Input
                  size="small"
                  number
                  type="number"
                  clearable
                  v-model.trim="formItem.ovdudaysMin"
                ></Input>
              </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
              <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
              <FormItem prop="ovdudaysMax">
                <Input
                  size="small"
                  number
                  type="number"
                  clearable
                  v-model.trim="formItem.ovdudaysMax"
                ></Input>
              </FormItem>
              </Col>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem span="6" label="适用分案人员:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择适用分案人员"
                v-model="formItem.creditLevelList"
              >
                <Option
                  v-for="item in getDirObj.DIVIDE_CREDIT_LEVEL"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="2" :lg="2" span="6"><div style="width: 10%; height: 1px"></div></Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem label="适用分案日期:">
              <DatePicker
                type="daterange"
                v-model="formItem.date"
                @on-change="dateChange"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择适用分案日期"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem label="预设案件量时间:">
              <TimePicker
                type="time"
                v-model="formItem.date"
                @on-change="getChangeTime"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择预设案件量时间"
                style="width: 100%"
              ></TimePicker>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="2" :lg="2" span="6"><div style="width: 10%; height: 1px"></div></Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem label="接案截至时间:">
              <TimePicker
                type="time"
                v-model="formItem.date"
                @on-change="getChangeTime"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择接案截至时间"
                style="width: 100%"
              ></TimePicker>
            </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem span="6" label="余案分配方式:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择余案分配方式"
                v-model="formItem.creditLevelList"
              >
                <Option
                  v-for="item in getDirObj.DIVIDE_CREDIT_LEVEL"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
          <Button
            type="primary"
            @click="handleSubmit('formItem')"
            style="width:80px"
            long
            size="small"
            :loading="allot_loading"
          >
            <span v-if="!allot_loading">修改</span>
            <span v-else>修改中...</span>
          </Button>
          <Button
            size="small"
            style="width:80px;margin-left: 8px"
            @click="handleCancel('formItem')"
          >取消</Button>
        </div>
      </Card>
      <Card class="vue-panel"  :dis-hover="true">
        <p slot="title" style="display: flex; align-items: center;">
          <span style="flex: 1"></span>
          <span>
        <Button size="small" style="width:100px" v-if="add_handle" @click="exportScoreValue" type="primary">分案率值导入</Button>
      </span>
        </p>
        <Table border ref="selection" :columns="tableColumnsSeats" :data="tableDataSeats"   size="small" >

        </Table>
      </Card>
    </Drawer>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

