<template>

  <div class="panel_list p5">
    <div
      class="case-left-container"
      :style="{paddingRight:showBtn?'25px':'370px'}"
    >
      <!-- 检索条件 -->
      <Card class="vue-panel">
        <p
          slot="title"
          @click="showPanel=!showPanel"
        >
          <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
          张三（男/22）

          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请减免</Button>
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请划扣</Button>
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请还款</Button>
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请仲裁</Button>

          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >下一个</Button>
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >上一个</Button>
        </p>
        <div class="panel-desc">
          <Row :gutter="10">
            <Col span="12">
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              身份证号：<span>360732199105251538</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              逾期应还金额：<span>675.00</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              总逾期期数：<span>2018-09-10 15:25:16</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              家庭住址：<span>甘肃省兰州市兰州市城关区南昌路1852号703室</span>
            </div>
            </Col>
            </Col>
            <Col>
            <Col
              :xs="8"
              :sm="8"
              :md="8"
              :lg="8"
            >
            <div class="demo-upload-list"><img
                src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
                style="vertical-align: top;"
              >
              <div class="demo-upload-list-cover">
                  <i class="ivu-icon ivu-icon-ios-eye-outline"></i> 
                  </div>
            </div>
            </Col>
            </Col>

          </Row>
        </div>
      </Card>
      <!-- 检索结果 -->
      <Card class="vue-panel-table">
        <p
          slot="title"
          @click="showPanel2=!showPanel2"
        >
          <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
          案件信息
          <span class="qishu">还到（12期）</span>
        </p>
        <!-- 表格 -->
        <div v-if="!showPanel2">
          <Form
            v-if="!showPanel"
            ref="formItem"
            :model="formItem"
            :label-width="80"
            :rules="ruleValidate"
          >
            <div class="panel-desc">
              <Row :gutter="5">
                <Col
                  :xs="12"
                  :sm="12"
                  :md="6"
                  :lg="6"
                >
                <div class="panel-desc-title">
                  账单号：<span>BIL2018091015251600028780</span>
                </div>
                </Col>
                <Col
                  :xs="12"
                  :sm="12"
                  :md="4"
                  :lg="4"
                >
                <div class="panel-desc-title">
                  借款本金：<span>675.00</span>
                </div>
                </Col>
                <Col
                  :xs="12"
                  :sm="12"
                  :md="6"
                  :lg="6"
                >
                <div class="panel-desc-title">
                  借款时间：<span>2018-09-10 15:25:16</span>
                </div>
                </Col>
                <Col
                  :xs="12"
                  :sm="12"
                  :md="4"
                  :lg="4"
                >
                <div class="panel-desc-title">
                  银行卡号：<span>622253******6484</span>
                </div>
                </Col>
                <Col
                  :xs="12"
                  :sm="12"
                  :md="4"
                  :lg="4"
                >
                <div class="panel-desc-title">
                  银行卡：<span>交通银行</span>
                </div>
                </Col>

              </Row>
            </div>
          </Form>
          <Table
            :data="tableData"
            :columns="tableColumns"
            stripe
          ></Table>
        </div>
      </Card>

      <!-- 检索结果 -->
      <Card class="vue-panel-table">
        <p>
          <Tabs
            type="card"
            size="small"
            :animated="false"
          >
            <TabPane label="催收信息">
              <div>
                <Table
                  :data="tableData"
                  :columns="tableColumns"
                  stripe
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
            </TabPane>
            <TabPane label="回款信息">标签二的内容</TabPane>
            <TabPane label="用户主动还款">标签三的内容</TabPane>
            <TabPane label="用户主动还款">系统代扣还款</TabPane>
          </Tabs>
        </p>
      </Card>

      <!-- 检索结果 -->
      <Card class="vue-panel-table">
        <p>

          <Tabs
            type="card"
            size="small"
            :animated="false"
          >
            <TabPane label="用户绑卡信息">
              <div>
                <Table
                  :data="tableData"
                  :columns="tableColumns"
                  stripe
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
            </TabPane>
            <TabPane label="分配信息">标签二的内容</TabPane>
            <TabPane label="站内信记录">标签三的内容</TabPane>
            <TabPane label="合同信息">系统代扣还款</TabPane>
            <TabPane label="地址信息">系统代扣还款</TabPane>
          </Tabs>
        </p>
      </Card>
    </div>
    <div class="panel-case-right">
      <Tooltip
        v-if="showBtn"
        content="点击查看"
        placement="left"
      >

        <div
          @click="isShow"
          class="txl-container"
        >
          通讯录信息
        </div>
      </Tooltip>
      <div class="case-desc-alert">
        <transition name="slide
        ">
          <div
            v-show="!showBtn"
            class="heighti"
          >
            <Card
              style="width:370px"
              class="heighti case-top-panel"
            >
              <div>
                <div
                  @click="isShow"
                  class="case-desc-close"
                >
                  <Tooltip
                    content="收起"
                    placement="left"
                  >
                    <Icon type="close-round"></Icon>
                  </Tooltip>
                </div>
                <div class="ivu-alert-copy ivu-alert-info">
                  <span class="name">
                    <span class="state-name">
                      本人
                    </span>
                    谢晓峰<span>（本人）</span>
                  </span>
                  <span class="tel">
                    <Tooltip
                      content="拨打"
                      placement="left"
                    >
                      138900000000
                    </Tooltip>
                  </span>
                  <span class="state">
                    关机
                  </span>
                  <Tooltip
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      class="edit"
                      type="edit"
                    ></Icon>
                  </Tooltip>
                </div>
                <div class="ivu-alert-copy ivu-alert-error">
                  <span class="state-name">
                    紧急联系人
                  </span>
                  <span class="name">
                    谢晓峰<span>（配偶）</span>
                  </span>
                  <span class="tel">
                    <Tooltip
                      content="拨打"
                      placement="left"
                    >
                      138900000000
                    </Tooltip>
                  </span>
                  <span class="state">
                    关机
                  </span>
                  <Tooltip
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      class="edit"
                      type="edit"
                    ></Icon>
                  </Tooltip>
                </div>
                <div class="ivu-alert-copy ivu-alert-error">
                  <span class="state-name">
                    紧急联系人
                  </span>
                  <span class="name">
                    谢晓峰<span>（同学）</span>
                  </span>
                  <span class="tel">
                    <Tooltip
                      content="拨打"
                      placement="left"
                    >
                      138900000000
                    </Tooltip>
                  </span>
                  <span class="state">
                    关机
                  </span>
                  <Tooltip
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      class="edit"
                      type="edit"
                    ></Icon>
                  </Tooltip>
                </div>
              </div>
              <div class="heighti">

                <Tabs
                  :animated="false"
                  size="small"
                >
                  <TabPane label="通话统计">
                    <div>
                      <Table
                        :data="tableData"
                        :columns="tableColumns"
                        stripe
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
                            :page-size="pageSize"
                            :current="pageNo"
                            @on-page-size-change="changeSize"
                            @on-change="changePage"
                          ></Page>
                        </div>

                      </div>
                    </div>
                  </TabPane>
                  <TabPane label="通话明细">通话记录明细</TabPane>
                  <TabPane label="通讯录">通讯录</TabPane>
                  <TabPane label="通话更新">通话记录更新</TabPane>
                  <Button
                    class="fr vue-back-btn header-btn"
                    type="primary"
                    @click="handleTabsAdd"
                    size="small"
                    slot="extra"
                  >增加</Button>
                </Tabs>
              </div>
            </Card>
            <Card>
              <div class="case-bottom-panel">9999999999</div>
            </Card>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
