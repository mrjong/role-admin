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
        :label-width="80"
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
            <FormItem label="催收时间:">
              <DatePicker
                size="small"
                style="width:100%"
                format="yyyy-MM-dd"
                v-model="formItem.csDate"
                type="daterange"
                placement="bottom-start"
                @on-change="dateChange"
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
            <FormItem label="经办人:">
              <Select
                size="small"
                filterable
                v-model="formItem.opUserUuid"
                clearable
                placeholder="请选择经办人"
              >
                <Option
                  v-for="(item, index) in getLeafTypeList_data"
                  :value="item.id"
                  :key="item.id + index"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="电催中心:">
              <Select
                size="small"
                filterable
                v-model="formItem.opCompayUuid"
                @on-change='companyChange'
                clearable
                placeholder="请选择电催中心"
              >
                <Option
                  v-for="item in getLeafTypeList2_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                :loading="query_loading"
                size="small"
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
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="case_collect_collect_export"
          v-if="export_case"
          :loading="export_case_loading"
        >
          <span v-if="!export_case_loading">导出数据</span>
          <span v-else>导出中...</span>
        </Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" :columns="tableColumns" stripe></Table>
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
    <div v-if="modal1">
      <Modal v-model="modal1" title="录音播放" @on-ok="ok" @on-cancel="cancel" draggable>
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
      </Modal>
    </div>
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
</style>
