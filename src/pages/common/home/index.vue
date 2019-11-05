<template>
  <div class="panel_list" style="padding: 10px;">

    <Row :gutter="10">
      <Col :xs="24" :sm="24" :md="16" :lg="16" style="margin-bottom: 30px; margin-right: 0px;">
        <!-- 今日案件 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 40px;">
          <Card class="board_wrap other_bg" :dis-hover='false'>
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">今日案件</p>
                <p class="board_content" :class="[today_case.index === 1? 'first': today_case.index === 999 || today_case.index === 998? 'last' : 'other' ]">{{today_case.caseCount}}</p>
              </div>
              <div class="board_middle">
                <p class="board_title">今日回款</p>
                <p class="board_content" :class="[today_case.index === 1? 'first': today_case.index === 999 || today_case.index === 998? 'last' : 'other' ]">{{today_case.repayCount}}</p>
              </div>
              <div class="board_right">
                <p class="board_title">今日回款率</p>
                <p class="board_content" :class="[today_case.index === 1? 'first': today_case.index === 999 || today_case.index === 998? 'last' : 'other' ]">{{today_case.collectRate}}%</p>
              </div>
            </div>
            <p class="order_line" :class="[today_case.index === 0? 'hidden': 'show', today_case.index === 1? 'first': today_case.index === 999 || today_case.index === 998? 'last' : 'other' ]">{{numTransform(today_case.index)}}</p>
            <Spin fix v-if="today_case_flag"></Spin>
          </Card>
        </Col>
        <!-- 昨日呼叫 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 10px;">
          <Card class="board_wrap last_bg" >
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">昨日呼叫次数</p>
                <p class="board_content" :class="[yesterday.index === 1? 'first': yesterday.index === 999 || yesterday.index === 998? 'last' : 'other' ]">{{yesterday.callCount}}</p>
              </div>
              <div class="board_middle">
                <p class="board_title">昨日接通次数</p>
                <p class="board_content" :class="[yesterday.index === 1? 'first': yesterday.index === 999 || yesterday.index === 998? 'last' : 'other' ]">{{yesterday.connectCount}}</p>
              </div>
              <div class="board_right">
                <p class="board_title">昨日接通率</p>
                <p class="board_content" :class="[yesterday.index === 1? 'first': yesterday.index === 999 || yesterday.index === 998? 'last' : 'other' ]">{{yesterday.connectRate}}%</p>
              </div>
            </div>
            <p class="order_line" :class="[yesterday.index === 0? 'hidden': 'show', yesterday.index === 1? 'first': yesterday.index === 999 || yesterday.index === 998? 'last' : 'other' ]">{{numTransform(yesterday.index)}}</p>
            <Spin fix v-if="yesterday_flag"></Spin>
          </Card>
        </Col>
        <!-- 本月统计 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 40px;">
          <Card class="board_wrap first_bg" >
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">{{new Date().getMonth()+1}}月累计案件</p>
                <p class="board_content"  :class="[this_month.index === 1? 'first': this_month.index === 999 || this_month.index === 998? 'last' : 'other' ]">{{this_month.caseCount}}</p>
              </div>
              <div class="board_middle">
                <p class="board_title">{{new Date().getMonth()+1}}月累计还款</p>
                <p class="board_content"  :class="[this_month.index === 1? 'first': this_month.index === 999 || this_month.index === 998? 'last' : 'other' ]">{{this_month.repayCount}}</p>
              </div>
              <div class="board_right">
                <p class="board_title">{{new Date().getMonth()+1}}月回款率</p>
                <p class="board_content" :class="[this_month.index === 1? 'first': this_month.index === 999 || this_month.index === 998? 'last' : 'other' ]">{{this_month.collectRate}}%</p>
              </div>
            </div>
            <p class="order_line" :class="[this_month.index === 0? 'hidden': 'show', this_month.index === 1? 'first': this_month.index === 999 || this_month.index === 998? 'last' : 'other' ]">{{numTransform(this_month.index)}}</p>
            <Spin fix v-if="this_month_flag"></Spin>
          </Card>
        </Col>
        <!-- 上月统计 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 10px;">
          <Card class="board_wrap first_bg" >
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">{{new Date().getMonth() ===0 ? 12 : new Date().getMonth()}}月累计案件</p>
                <p class="board_content" :class="[last_month.index === 1? 'first': last_month.index === 999 || last_month.index === 998? 'last' : 'other' ]">{{last_month.caseCount}}</p>
              </div>
              <div class="board_middle">
                <p class="board_title">{{new Date().getMonth() ===0 ? 12 : new Date().getMonth()}}月累计还款</p>
                <p class="board_content" :class="[last_month.index === 1? 'first': last_month.index === 999 || last_month.index === 998? 'last' : 'other' ]">{{last_month.repayCount}}</p>
              </div>
              <div class="board_right">
                <p class="board_title">{{new Date().getMonth() ===0 ? 12 : new Date().getMonth()}}月回款率</p>
                <p class="board_content" :class="[last_month.index === 1? 'first': last_month.index === 999 || last_month.index === 998? 'last' : 'other' ]">{{last_month.collectRate}}%</p>
              </div>
            </div>
            <p class="order_line" :class="[last_month.index === 0? 'hidden': 'show', last_month.index === 1? 'first': last_month.index === 999 || last_month.index === 998? 'last' : 'other' ]">{{numTransform(last_month.index)}}</p>
            <Spin fix v-if="last_month_flag"></Spin>
          </Card>
        </Col>
      </Col>
      <Col :xs="24" :sm="24" :md="8" :lg="8" style="margin-top: 0px;">
      <Card class="board_wrap first_bg" >
        <div class="flex_box_wrap">
          <div class="board_left">
            <p class="board_title">今日在催</p>
            <p class="board_content special">{{today_expire.caseCount}}</p>
          </div>
          <div class="board_middle">
            <p class="board_title">承诺还款</p>
            <p class="board_content special">{{today_expire.casePromiseCount}}</p>
          </div>
          <div class="board_right">
            <p class="board_title">今日未催收</p>
            <p class="board_content special">{{today_expire.caseNoDealCount}}</p>
          </div>
        </div>
        <p class="order_line" style='visibility:hidden'>没有排名</p>
        <Spin fix v-if="today_expire_flag"></Spin>
      </Card>
      </Col>
      <!-- 上上月统计 -->
      <Col :xs="24" :sm="24" :md="8" :lg="8" style="margin-top: 0px;">
      <Card class="board_wrap first_bg" >
        <div class="flex_box_wrap">
          <div class="board_left">
            <p class="board_title">{{new Date().getMonth()-1 ===0 ? 12 : new Date().getMonth() ===0 ? 11: new Date().getMonth()-1}}月累计案件</p>
            <p class="board_content" :class="[last_last_month.index === 1? 'first': last_last_month.index === 999 || last_month.index === 998? 'last' : 'other' ]">{{last_last_month.caseCount}}</p>
          </div>
          <div class="board_middle">
            <p class="board_title">{{new Date().getMonth()-1 ===0 ? 12 : new Date().getMonth() ===0 ? 11: new Date().getMonth()-1}}月累计还款</p>
            <p class="board_content" :class="[last_last_month.index === 1? 'first': last_last_month.index === 999 || last_month.index === 998? 'last' : 'other' ]">{{last_last_month.repayCount}}</p>
          </div>
          <div class="board_right">
            <p class="board_title">{{new Date().getMonth()-1 ===0 ? 12 : new Date().getMonth() === 0 ? 11: new Date().getMonth()-1}}月回款率</p>
            <p class="board_content" :class="[last_last_month.index === 1? 'first': last_last_month.index === 999 || last_last_month.index === 998? 'last' : 'other' ]">{{last_last_month.collectRate}}%</p>
          </div>
        </div>
        <p class="order_line" :class="[last_last_month.index === 0? 'hidden': 'show', last_last_month.index === 1? 'first': last_last_month.index === 999 || last_last_month.index === 998? 'last' : 'other' ]">{{numTransform(last_last_month.index)}}</p>
        <Spin fix v-if="last_last_month_flag"></Spin>
      </Card>
      </Col>
      <!-- 公告栏 -->
      <Col :xs="24" :sm="24" :md="12" :lg="12">
        <Card class="vue-panel-table" >
          <p slot="title" @click="showPanel1=!showPanel1">
            <Icon :type="!showPanel1?'chevron-down':'chevron-up'"></Icon>公告
            <Button
              class="fr vue-back-btn header-btn"
              type="primary"
              size="small"
              @click.stop="showAlert('1')"
              v-if="notice_add"
            >添加</Button>
          </p>
          <!-- 表格 -->
          <div v-if="!showPanel1">
            <Table
              v-if="announcement_list1.length>0"
              :show-header="false"
              :data="announcement_list1"
              :columns="tableColumns"
              stripe
              :height='300'
              border
              class="notice_table"
            ></Table>
            <div v-else class="home-no-data">暂无数据</div>
          </div>
        </Card>
      </Col>
      <!-- 客服电话 -->
      <!-- <Col :xs="24" :sm="24" :md="12" :lg="12">
        <Card class="vue-panel-table">
          <div class="service_tel_wrap">客服电话：4000887626</div>
        </Card>
      </Col>-->
      <!-- 罚息计算规则 -->
      <Col :xs="24" :sm="24" :md="12" :lg="12">
        <Card class="vue-panel-table" >
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>罚息计算规则
            <Button
              class="fr vue-back-btn header-btn"
              type="primary"
              size="small"
              @click.stop="showAlert('2')"
              v-if="charge_add"
            >添加</Button>
          </p>
          <!-- 表格 -->
          <div v-if="!showPanel2">
            <Table
              v-if="announcement_list2.length>0"
              :show-header="false"
              :data="announcement_list2"
              :columns="tableColumns2"
              stripe
              :height='300'
              border
              class="charge_table"
            ></Table>
            <div v-if="!announcement_list2||announcement_list2.length<=0" class="home-no-data">暂无数据</div>
          </div>
        </Card>
      </Col>
      <!-- <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Card class="vue-panel-table">
          <p slot="title" @click="showPanel3=!showPanel3">
            <Icon :type="!showPanel3?'chevron-down':'chevron-up'"></Icon>其他
            <Button
              class="fr vue-back-btn header-btn"
              type="primary"
              size="small"
              @click.stop="showAlert('3')"
              v-if="other_add"
            >添加</Button>
          </p>
          <div v-if="!showPanel3">
            <Table
              v-if="announcement_list3.length>0"
              :show-header="false"
              :data="announcement_list3"
              :columns="tableColumns3"
              stripe
              border
            ></Table>
            <div v-if="!announcement_list3||announcement_list3.length<=0" class="home-no-data">暂无数据</div>
          </div>
        </Card>
      </Col>-->
    </Row>
    <Modal v-model="look_over_flag" :footer-hide='true' :mask-closable='false'>
      <p slot="header" style="text-align: center; lineght: 30px; font-size: 16px;">公告</p>
      <p class="notice_detail_content">{{announcementContent}}</p>
      <p style="text-align: right; font-size: 14px; line-height: 26px;">{{createTime}}</p>
    </Modal>
    <CaseLoading :showCaseLoading="showCaseLoading" @passBack="passBack" />
    <IsConnection @passBack="passBack" />
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
