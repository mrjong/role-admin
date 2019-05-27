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
                <p class="board_content other">{{today_case}}</p>
              </div>
              <div class="board_middle">
                <p class="board_title">今日回款</p>
                <p class="board_content other">{{today_return_money}}</p>
              </div>
              <div class="board_right">
                <p class="board_title">今日回款率</p>
                <p class="board_content other">{{today_return_rate}}%</p>
              </div>
            </div>
            <p class="order_line other">组内第3名</p>
          </Card>
        </Col>
        <!-- 今日呼叫 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 10px;">
          <Card class="board_wrap last_bg" >
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">今日呼叫次数</p>
                <p class="board_content last">288</p>
              </div>
              <div class="board_middle">
                <p class="board_title">今日接通次数</p>
                <p class="board_content last">168</p>
              </div>
              <div class="board_right">
                <p class="board_title">今日接通率</p>
                <p class="board_content last">58%</p>
              </div>
            </div>
            <p class="order_line last">组内倒数第一名</p>
          </Card>
        </Col>
        <!-- 本月统计 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 40px;">
          <Card class="board_wrap first_bg" >
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">本月累计案件</p>
                <p class="board_content first">288</p>
              </div>
              <div class="board_middle">
                <p class="board_title">本月累计还款</p>
                <p class="board_content first">168</p>
              </div>
              <div class="board_right">
                <p class="board_title">本月回款率</p>
                <p class="board_content first">50%</p>
              </div>
            </div>
            <p class="order_line first">组内第一名</p>
          </Card>
        </Col>
        <!-- 上月统计 -->
        <Col :xs="24" :sm="24" :md="11" :lg="11" style="margin-right: 10px;">
          <Card class="board_wrap first_bg" >
            <div class="flex_box_wrap">
              <div class="board_left">
                <p class="board_title">上月累计案件</p>
                <p class="board_content first">288</p>
              </div>
              <div class="board_middle">
                <p class="board_title">上月累计还款</p>
                <p class="board_content first">168</p>
              </div>
              <div class="board_right">
                <p class="board_title">上月回款率</p>
                <p class="board_content first">50%</p>
              </div>
            </div>
            <p class="order_line first">组内第一名</p>
          </Card>
        </Col>
      </Col>
      <!-- 今日到期 -->
      <Col :xs="24" :sm="24" :md="8" :lg="8" style="margin-top: 0px;">
        <Card class="board_wrap first_bg" >
          <div class="flex_box_wrap">
            <div class="board_left">
              <p class="board_title">今日到期</p>
              <p class="board_content special">288</p>
            </div>
            <div class="board_middle">
              <p class="board_title">承诺还款</p>
              <p class="board_content special">288</p>
            </div>
            <div class="board_right">
              <p class="board_title">今日未催收</p>
              <p class="board_content special">66</p>
            </div>
          </div>
          <p class="order_line first">组内第一名</p>
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
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
