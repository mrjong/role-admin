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
            label="任务名称:" style="display: flex; align-items: center;"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.jobName"
              placeholder="请输入任务名称"
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
            label="IP地址:" style="display: flex; align-items: center;"
          >
            <Input
              size="small"
              clearable
              v-model="formItem.ipAddress"
              placeholder="请输入操作人IP"
            ></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="任务状态:" style="display: flex; align-items: center;">
            <Select size="small" clearable placeholder="请选择任务状态" v-model="formItem.isLock">
              <Option
                v-for="item in getDirObj['TASK_STATUS']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="执行次数:" style="display: flex; align-items: center;">
            <Select size="small" clearable placeholder="请选择执行次数" v-model="formItem.executionNumber">
              <Option
                v-for="item in getDirObj['EXECUTION_NUMBER']"
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
    <Card class="vue-panel-table">
      <p
        slot="title"
        style="display: flex; justify-content: space-between;"
      >
        <span style="height:30px;">检索结果</span>
        <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">添加任务</Button>
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
            <Button
              v-if="row.isLock !=='1'"
              style="margin-right: 5px; background: #67C23A; color: #fff; border: none"
              @click="handleClick(row, 'open')">
              开始
            </Button>
            <Button
              v-if="row.isLock !=='0'"
              style="margin-right: 5px; background: #F56C6C; color: #fff; border: none"
              @click="handleClick(row, 'close')">
              关闭
            </Button>
            <Button
              v-if="row.isLock !=='1'"
              style="margin-right: 5px; background: #E6A23C; color: #fff; border: none"
              @click="handleClick(row, 'update')">
              修改
            </Button>
            <Button
              v-if="row.executionNumber !=='MANY'"
              style="margin-right: 5px; background: #409EFF; color: #fff; border: none"
              @click="handleClick(row, 'execute')">
              执行
            </Button>
            <Button
              v-if="row.isLock !=='1'"
              style="background: #909399; color: #fff; border: none"
              @click="handleClick(row, 'delete')">
              删除
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
        <Modal v-model="dialogFormVisible" :title="title+ '定时任务'"  class-name="role-modal" width="700px" >
          <Card class="vue-panel panel_list" :dis-hover="true" style="border: none; padding-left: 20px">
            <Form
              v-if="!showPanel"
              ref="formValidate"
              :model="formValidateInfo"
              :label-width="140"
              :rules="ruleValidate"
            >
              <Row class="eachRow" style="margin-bottom: 20px;">
                <Col span="22">
                <FormItem label="任务名称:" style="display: flex; align-items: center;" prop="jobName">
                  <Input  clearable v-model.trim="formValidateInfo.jobName" placeholder="请输入任务名称"/>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow" style="margin-bottom: 20px;">
                <Col span="22">
                <FormItem label="任务类名:" style="display: flex; align-items: center;" prop="jobClass">
                  <Input clearable v-model.trim="formValidateInfo.jobClass" placeholder="请输入任务类名"/>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow" style="margin-bottom: 20px;">
                <Col span="22">
                <FormItem label="执行次数:" style="display: flex; align-items: center;" prop="executionNumber">
                  <Select clearable placeholder="请选择执行次数" v-model="formValidateInfo.executionNumber">
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
                <FormItem label="任务方法名:" style="display: flex; align-items: center;" prop="jobMethod">
                  <Input clearable v-model.trim="formValidateInfo.jobMethod" placeholder="请输入任务方法名"/>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow" style="margin-bottom: 20px;">
                <Col span="22">
                <FormItem label="IP地址:" style="display: flex; align-items: center;" prop="ipAddress">
                  <Input clearable v-model.trim="formValidateInfo.ipAddress" placeholder="请输入IP地址"/>
                </FormItem>
                </Col>
              </Row>
              <Row class="eachRow" style="margin-bottom: 20px;">
                <Col span="22">
                <FormItem label="CRON表达式:" style="display: flex; align-items: center;" prop="cronExpression">
                  <Input clearable v-model.trim="formValidateInfo.cronExpression" placeholder="请输入cron表达式"/>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <div slot="footer">
            <Button type="primary" @click="closeModal(title)">{{title}}</Button>
            <Button  @click="closeModal()">关闭</Button>
          </div>
        </Modal></div>
      </div>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

