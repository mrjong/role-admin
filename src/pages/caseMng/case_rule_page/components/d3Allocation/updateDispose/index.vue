<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Drawer
      :value="showUpdateDispose"
      width="60%"
      :title="titleDesc"
      :mask-closable="false"
      @on-close="closeDrawer"
      :styles="styles"
      :closable="false"
    >
      <Card class="vue-panel" style="margin-bottom: 30px;" :dis-hover="true">
        <div style="display: flex">
          <Form
            ref="formItem"
            :model="formItem"
            :label-width="105"
            :rules="ruleValidate"
            :style="{'width': '100%', margin:'0', flex: '1'}"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6" style="margin: 0 auto">
              <FormItem span="6" label="产品线:" prop="prodTypeList">
                <Select
                  size="small"
                  clearable
                  multiple
                  placeholder="请选择产品线"
                  v-model="formItem.prodTypeList"
                  :disabled="formItem.disabled"
                >
                  <Option
                    v-for="item in getDirObj.DIVIDE_PROD_TYPE"
                    :value="item.itemCode"
                    :key="item.itemName"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem label="产品期数:">
                <Select
                  size="small"
                  multiple
                  clearable
                  placeholder="请选择产品期数"
                  v-model="formItem.perdCountList"
                  :disabled="formItem.disabled"
                >
                  <Option
                    v-for="item in getDirObj.DIVIDE_PROD_CNT"
                    :value="item.itemCode"
                    :key="item.itemName"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem label="到期期数:">
                <Select
                  size="small"
                  multiple
                  clearable
                  placeholder="请选择到期期数"
                  v-model="formItem.perdThisCountList"
                  :disabled="formItem.disabled"
                >
                  <Option
                    v-for="item in getDirObj.DIVIDE_PROD_NUM"
                    :value="item.itemCode"
                    :key="item.itemName"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem label="逾期天数:">
                <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="ovdudaysMin">
                  <Input
                    size="small"
                    number
                    type="number"
                    clearable
                    v-model.trim="formItem.ovdudaysMin"
                    :disabled="formItem.disabled"
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
                    :disabled="formItem.disabled"
                  ></Input>
                </FormItem>
                </Col>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem label="适用分案日期:">
                <DatePicker
                  type="date"
                  v-model="formItem.effectMinDt"
                  @on-change="dateChange"
                  format="yyyy-MM-dd"
                  :editable="false"
                  size='small'
                  clearable
                  placeholder="请选择适用分案日期"
                  :disabled="formItem.disabled"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem label="预设案件量时间:">
                <DatePicker
                  v-model="formItem.collectDateSta"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  @on-change="getChangeDate($event, 'collectDateSta')"
                  :editable="false"
                  size='small'
                  clearable
                  placeholder="请选择预设案件量时间"
                  :disabled="formItem.disabled"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem label="接案截至时间:">
                <DatePicker
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="formItem.collectDateEnd"
                  @on-change="getChangeDate($event, 'collectDateEnd')"
                  :editable="false"
                  size='small'
                  clearable
                  placeholder="请选择接案截至时间"
                  :disabled="formItem.disabled"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem span="6" label="余案分配方式:">
                <Select
                  size="small"
                  clearable
                  placeholder="请选择余案分配方式"
                  v-model="formItem.remainAllotType"
                  :disabled="formItem.disabled"
                >
                  <Option
                    v-for="item in getDirObj.REMAIN_ALLOT_TYPE"
                    :value="item.itemCode"
                    :key="item.itemName"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="20" :lg="20" span="6">
              <FormItem span="6" label="适用分案人员:">
                <Select
                  size="small"
                  multiple
                  clearable
                  placeholder="请选择适用分案人员"
                  :disabled="formItem.disabled"
                  v-model="formItem.opOrganizationList"
                >
                  <Option
                    v-for="item in department_list_data"
                    :value="item.id"
                    :key="item.id"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
          </Form>
          <Card class="vue-panel"  :dis-hover="true"style="width: 50%">
            <p slot="title" style="display: flex; align-items: center;">
              <span style="flex: 1"></span>
              <span>
          <Button
            size="small"
            v-if="import_search"
            icon="ios-cloud-download-outline"
            type="primary"
            style="min-width:80px;margin-left: 8px"
            @click="download_import"
            :disabled="formItem.disabled"
            :loading="download_import_data"
          >
              <span v-if="!download_import_data">下载导入模板</span>
              <span v-else>下载中...</span>
            </Button>
          <Upload
            v-if="import_search"
            :action="file_url"
            :show-upload-list="false"
            :headers="headers"
            :format="['xls', 'xlsx']"
            :max-size="1024"
            :on-error="handleError"
            :on-success="handleSuccess"
            :on-progress="handleProgress"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :disabled="import_data_loading"
            style="display: inline-block; margin-left:8px"
            :data="{ pageType: 1}"
          >
            <Button
              icon="ios-cloud-upload-outline"
              type="primary"
              size="small"
              style="min-width: 80px;"
              :loading="import_data_loading"
              :disabled="formItem.disabled"
            >
              <span v-if="!import_data_loading">导入</span>
              <span v-else>导入中...</span>
            </Button>
          </Upload>
        </span>
            </p>
            <Table border ref="selection" :columns="tableColumns" :data="tableData"   size="small" width="300px"></Table>
          </Card>
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
          <Button
            type="primary"
            @click="handleSubmit('formItem')"
            style="width:80px"
            long
            size="small"
            :loading="update_loading"
            :disabled="formItem.disabled"
          >
            <span v-if="!update_loading">修改</span>
            <span v-else>修改中...</span>
          </Button>
          <Button
            size="small"
            style="width:80px;margin-left: 8px"
            @click="handleCancel('formItem')"
          >取消</Button>
        </div>
      </Card>

    </Drawer>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

