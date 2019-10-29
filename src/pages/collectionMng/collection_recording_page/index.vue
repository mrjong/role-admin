<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="95"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品线:" prop="prdTyp">
              <Select size="small" clearable placeholder="请选择产品线" v-model="formItem.prdTyp">
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:" prop="userNm">
              <Input size="small" clearable v-model.trim="formItem.userNm" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="身份证号:" prop="idNo">
              <Input size="small" clearable v-model.trim="formItem.idNo" placeholder="请输入身份证号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="催收电话:" prop="mblNo">
              <Input size="small" clearable v-model.trim="formItem.mblNo" placeholder="请输入催收电话"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <!-- beginDate endDate -->
            <FormItem label="催收时间:" prop="mblNo">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.csDate"
                format="yyyy-MM-dd"
                type="daterange"
                @on-change="dateChange"
                placement="bottom-start"
                placeholder="请选择催收时间"
                clearable
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:" prop="caseNo">
              <Input size="small" clearable v-model.trim="formItem.caseNo" placeholder="请输入案件编号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:" prop="billNo">
              <Input size="small" clearable v-model.trim="formItem.billNo" placeholder="请输入账单号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="电催中心:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择电催中心"
                @on-change="companyChange"
                v-model="formItem.opCompayUuid"
              >
                <Option
                  v-for="item in company_list_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="组别:">
              <Select
                size="small"
                clearable
                filterable
                @on-change="departmentChange"
                placeholder="请选择组别"
                v-model="formItem.opOrganizationUuid"
              >
                <Option
                  v-for="item in department_list_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="经办人:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择经办人"
                v-model="formItem.opUserUuid"
              >
                <Option
                  v-for="(item,index) in collect_list_data"
                  :value="item.id"
                  :key="item.id + index"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="沟通状态:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择沟通状态"
                v-model="formItem.collectSts"
              >
                <Option
                  v-for="(item,index) in collect_status_list"
                  :value="item.codeKey"
                  :key="item.codeKey + index"
                >{{ item.codeName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="拨打状态:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择拨打状态"
                v-model="formItem.talkResult"
              >
               <Option
                  v-for="(item,index) in call_status_list"
                  :value="item.codeKey"
                  :key="item.codeKey + index"
                >{{ item.codeName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="质检结果:" prop="vqcResult">
            <Select size="small" clearable placeholder="请选择质检结果" v-model="formItem.vqcResult">
              <Option
                v-for="item in getDirObj.PROD_TYPE"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="质检得分:">
            <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
            <FormItem prop="vqcScoreStart">
              <Input size="small" clearable v-model.trim="formItem.vqcScoreStart"></Input>
            </FormItem>
            </Col>
            <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
            <div class="text-center">-</div>
            </Col>
            <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
            <FormItem prop="vqcScoreStart">
              <Input size="small" clearable v-model.trim="formItem.vqcScoreEnd"></Input>
            </FormItem>
            </Col>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="违规级别:" prop="ruleLevel">
            <Select size="small" clearable placeholder="请选择违规级别" v-model="formItem.ruleLevel">
              <Option
                v-for="item in getDirObj.PROD_TYPE"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="问题类别:" prop="ruleName">
            <Select size="small" clearable placeholder="请选择问题类别" v-model="formItem.ruleName">
              <Option
                v-for="item in getDirObj.PROD_TYPE"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="录音编号:" prop="recordNumber">
            <Input size="small" clearable v-model.trim="formItem.recordNumber" placeholder="请输入录音编号"/>
          </FormItem>
          </Col>
          <!--<Col :xs="24" :sm="24" :md="6" :lg="6" span="6">-->
          <!--<FormItem label="稽核人:" prop="billNo">-->
            <!--<Input size="small" clearable v-model.trim="formItem.billNo" placeholder="请输入稽核人"/>-->
          <!--</FormItem>-->
          <!--</Col>-->
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
                :loading="query_loading"
              >
                <span v-if="!query_loading">检索</span>
                <span v-else>检索中...</span>
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
    <!-- 检索结果 -->
    <Card class="vue-panel-table collection_recording">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" border :columns="tableColumns" stripe size="small" align="center"></Table>
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
    <!-- modal -->
    <div v-if="modal1">
      <Modal
        v-model="modal1"
        class-name="modal_wrap_play"
        title="录音播放"
        @on-ok="ok"
        @on-cancel="cancel"
        draggable
      >
        <video-player
          class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          customEventName="customstatechangedeventname"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied"
        ></video-player>
        <p style="text-align: center; font-size: 14px; color: #2d8cf0; font-weight: 500;margin-top: 20px">账单号：{{billNo}}</p>
      </Modal>
    </div>
    <ReportModal :dataId="dataId" @passBask="passBask"/>
  </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
.video-player-box,
.video-js,
#modal_wrap {
  width: 100%;
  box-sizing: border-box;
}
.video-player-box {
  display: flex;
  justify-content: center
}

</style>



