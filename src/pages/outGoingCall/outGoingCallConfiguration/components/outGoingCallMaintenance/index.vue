<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px">
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="电催中心:" style="display: flex; align-items: center;">
            <Select size="small" clearable placeholder="请选择电催中心" v-model="formItem.isLock">
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="姓名:" style="display: flex; align-items: center;">
            <Select size="small" clearable placeholder="请选择姓名" v-model="formItem.isLock">
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="组别:" style="display: flex; align-items: center;">
            <Select size="small" clearable placeholder="请选择组别" v-model="formItem.isLock">
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
    <Card class="vue-panel-table">
      <p
        slot="title"
        style="display: flex;"
      >
        <span style="height:30px; flex: 1">检索结果</span>
        <span >
          <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle" type="primary">添加</Button>
          <Button size="small" style="width:80px" @click="showTask('export')" v-if="add_handle">导出</Button>
        </span>
      </p>
      <!-- 表格 -->
      <div >
        <Table
          border
          :data="tableData"
          :columns="tableColumns"
          stripe
          class="tableBox"
          :row-class-name="rowStyle"
        >
          <template slot-scope="{ row, index }" slot="handle" >
            <Button
              style="margin-right: 5px; background: #67C23A; color: #fff; border: none"
              @click="handleClick(row, 'open')">
              修改
            </Button>
            <Button
              style="margin-right: 5px; background: #F56C6C; color: #fff; border: none"
              @click="handleClick(row, 'close')">
              管理坐席
            </Button>
            <Button
              style="margin-right: 5px; background: #E6A23C; color: #fff; border: none"
              @click="handleClick(row, 'update')">
              故障调试
            </Button>
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
        <div class="fromModal">
          <Modal :value="dialogFormVisible" title="添加外呼"  class-name="role-modal" width="700px" >
            <Card class="vue-panel panel_list" :dis-hover="true" style="border: none; padding-left: 20px">
              <Form
                ref="formValidate"
                :model="formValidateInfo"
                :label-width="140"
                :rules="ruleValidate"
              >
                <Row class="eachRow" style="margin-bottom: 20px;">
                  <Col span="22">
                  <FormItem label="用户角色:" style="display: flex; align-items: center;" prop="executionNumber">
                    <Select clearable placeholder="请选择用户角色" v-model="formValidateInfo.executionNumber" size="small">
                      <Option
                        v-for="item in  getDirObj['EXECUTION_NUMBER']"
                        :value="item.itemCode"
                        :key="item.itemCode"
                      >{{ item.itemName }}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row class="eachRow" style="margin-bottom: 20px;">
                  <Col span="22">
                  <FormItem label="用户名称:" style="display: flex; align-items: center;" prop="executionNumber">
                    <Select clearable placeholder="请选择用户名称" v-model="formValidateInfo.executionNumber" size="small">
                      <Option
                        v-for="item in  getDirObj['EXECUTION_NUMBER']"
                        :value="item.itemCode"
                        :key="item.itemCode"
                      >{{ item.itemName }}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row class="eachRow" style="margin-bottom: 20px;">
                  <Col span="22">
                  <FormItem label="外呼方案:" style="display: flex; align-items: center;" prop="executionNumber">
                    <Select clearable placeholder="请选择外呼方案" v-model="formValidateInfo.executionNumber" size="small">
                      <Option
                        v-for="item in  getDirObj['EXECUTION_NUMBER']"
                        :value="item.itemCode"
                        :key="item.itemCode"
                      >{{ item.itemName }}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row class="eachRow" style="margin-bottom: 20px;">
                  <Col span="22">
                  <FormItem label="方案/专线:" style="display: flex; align-items: center;" prop="executionNumber">
                    <Select clearable placeholder="方案/专线" v-model="formValidateInfo.executionNumber" size="small">
                      <Option
                        v-for="item in  getDirObj['EXECUTION_NUMBER']"
                        :value="item.itemCode"
                        :key="item.itemCode"
                      >{{ item.itemName }}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row class="eachRow" style="margin-bottom: 20px;">
                  <Col span="22">
                  <FormItem label="坐席号:" style="display: flex; align-items: center;" prop="executionNumber">
                    <Input
                      size="small"
                      clearable
                      v-model="formValidateInfo.name"
                      :maxlength="20"
                      placeholder="请输入坐席号"
                    />
                  </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
            <div slot="footer">
              <Button type="primary" @click="closeModal('add')">添加</Button>
              <Button  @click="closeModal()">关闭</Button>
            </div>
          </Modal></div>
      </div>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

