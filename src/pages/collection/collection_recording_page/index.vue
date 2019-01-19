<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
        <router-link to="/demo/demo_desc">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
        </router-link>
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
            <FormItem span="6" label="产品线:" prop="buffet_id">
              <Select size="small" v-model="formItem.productLine">
                <Option
                  v-for="item in productLineList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <!-- <Input size="small" clearable v-model="formItem.buffet_name" placeholder="请输入餐柜名称"></Input> -->
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="案件编号:" prop="buffet_id">
              <Input size="small" clearable v-model="formItem.case_id" placeholder="请输入案件编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="账单号:" prop="buffet_id">
              <Input size="small" clearable v-model="formItem.bill_number" placeholder="请输入账单号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:" prop="device_id">
              <Input size="small" clearable v-model="formItem.client_name" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="身份证号:" prop="buffet_id">
              <Input size="small" clearable v-model="formItem.id_card" placeholder="请输入身份证号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="催收员:" prop="buffet_id">
              <Select size="small" v-model="formItem.debt_collector" filterable clearable>
                <Option
                  v-for="item in productTimeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="呼叫电话:" prop="address">
              <Input size="small" clearable v-model="formItem.call_number" placeholder="请输入呼叫电话"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="催收时间:" prop="addtime">
              <!-- <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.addtime"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择催收时间"
              ></DatePicker>-->
              <DatePicker
                size="small"
                type="daterange"
                :start-date="new Date(1991, 4, 14)"
                placement="bottom-start"
                placeholder="请选择催收时间"
                style="width: 100%"
                v-model="formItem.addtime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
              >检索</Button>
              <Button
                size="small"
                type="ghost"
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
        <router-link to="/buffet/buffet_add">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">导出数据</Button>
        </router-link>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          :data="tableData"
          :columns="tableColumns"
          stripe
          width="1200"
          size="small"
          align="center"
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
    <!-- modal -->
    <div v-if="modal1" class="modal_wrap">
      <Modal v-model="modal1" title="录音播放" @on-ok="ok" @on-cancel="cancel" :transfer='false'>
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

<style lang="less">
.video-player-box,
.video-js, #modal_wrap{
  width: 100%;
  box-sizing: border-box;
}
</style>



