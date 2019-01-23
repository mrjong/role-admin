<template>

  <div class="panel_list p5">
    <!-- 弹层 -->
    <Modal
      title="查看图片"
      v-model="visible"
    >
      <img
        :src="imgName"
        v-if="visible"
        style="width: 100%"
      >
    </Modal>
    <Modal
      class="jianmian"
      width="90%"
      v-model="visible1"
    >
      <jianmian></jianmian>
    </Modal>
    <!-- 弹层 -->
    <div
      class="case-left-container"
      :style="{paddingRight:showBtn?'25px':'370px'}"
    >
      <!-- 检索条件 -->
      <Card class="vue-panel case-desc">
        <p
          slot="title"
          @click="showPanel=!showPanel"
        >
          <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
          张三（男/22）
          <Button
            @click="handOpen('zhongcai','申请仲裁')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请仲裁</Button>
          <Button
            @click="handOpen('huankuan','申请还款')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请还款</Button>
          <Button
            @click="handOpen('huakou','申请划扣')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请划扣</Button>

          <Button
            @click="handOpen('jianmian','申请减免')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >申请减免</Button>
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
            <Col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
            >
            <div class="fl">
              <div class="demo-upload-list">
                <img
                  src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg"
                  style="vertical-align: top;"
                >
                <div
                  class="demo-upload-list-cover "
                  @click="handleView('http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg')"
                >
                  <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                </div>
              </div>
              <div class="text-center card-text">身份证正面</div>
            </div>
            <div class="fl">
              <div class="demo-upload-list">
                <img
                  src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
                  style="vertical-align: top;"
                >
                <div
                  class="demo-upload-list-cover"
                  @click="handleView('https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar')"
                >
                  <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                </div>
              </div>
              <div class="text-center card-text">身份证反面</div>
            </div>
            <div class="fl">
              <div class="demo-upload-list">
                <img
                  src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
                  style="vertical-align: top;"
                >
                <div
                  class="demo-upload-list-cover"
                  @click="handleView('https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar')"
                >
                  <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                </div>
              </div>
              <div class="text-center card-text">活体认证照片</div>
            </div>

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

                <div class="panel-desc-title fl mr10">
                  账单号：<span>BIL2018091015251600028780</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  借款本金：<span>675.00</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  借款时间：<span>2018-09-10 15:25:16</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  银行卡号：<span>622253******6484</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  银行卡：<span>交通银行</span>
                </div>

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
            @on-click="tabClick"
            type="card"
            size="small"
            :animated="false"
          >
            <TabPane
              label="催收信息"
              name="case_detail_remark_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_remark_list_tableData"
                  :columns="case_detail_remark_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_remark_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_remark_list_pageSize"
                      :current="case_detail_remark_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_remark_list')"
                      @on-change="changePage('case_detail_remark_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane
              label="回款信息"
              name="case_detail_repay_ord_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_repay_ord_list_tableData"
                  :columns="case_detail_repay_ord_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_repay_ord_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_repay_ord_list_pageSize"
                      :current="case_detail_repay_ord_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_repay_ord_list')"
                      @on-change="changePage('case_detail_repay_ord_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane
              label="用户主动还款"
              name="case_detail_user_repay_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_user_repay_list_tableData"
                  :columns="case_detail_user_repay_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_user_repay_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_user_repay_list_pageSize"
                      :current="case_detail_user_repay_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_user_repay_list')"
                      @on-change="changePage('case_detail_user_repay_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane
              label="系统代扣还款"
              name="case_detail_system_repay_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_system_repay_list_tableData"
                  :columns="case_detail_system_repay_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_system_repay_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_system_repay_list_pageSize"
                      :current="case_detail_system_repay_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_system_repay_list')"
                      @on-change="changePage('case_detail_system_repay_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
          </Tabs>
        </p>
      </Card>

      <!-- 检索结果 -->
      <Card class="vue-panel-table">
        <p>

          <Tabs
            type="card"
            @on-click="tabClick"
            size="small"
            :animated="false"
          >
            <TabPane
              label="用户绑卡信息"
              name="case_detail_bindcard_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_bindcard_list_tableData"
                  :columns="case_detail_bindcard_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_bindcard_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_bindcard_list_pageSize"
                      :current="case_detail_bindcard_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_bindcard_list')"
                      @on-change="changePage('case_detail_bindcard_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane
              label="分配信息"
              name="case_detail_allot_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_allot_list_tableData"
                  :columns="case_detail_allot_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_allot_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_allot_list_pageSize"
                      :current="case_detail_allot_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_allot_list')"
                      @on-change="changePage('case_detail_allot_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane
              label="站内信记录"
              name="case_detail_siteletter_list"
            >
              <div>
                <Table
                  border
                  :data="case_detail_siteletter_list_tableData"
                  :columns="case_detail_siteletter_list_tableColumns"
                  stripe
                ></Table>
                <!-- 分页 -->
                <div class="vue-panel-page">

                  <div style="float: right;">
                    <Page
                      :total="case_detail_siteletter_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      show-sizer
                      :page-size="case_detail_siteletter_list_pageSize"
                      :current="case_detail_siteletter_list_pageNo"
                      @on-page-size-change="changeSize('case_detail_siteletter_list')"
                      @on-change="changePage('case_detail_siteletter_list')"
                    ></Page>
                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane
              label="地址信息"
              name="case_detail_address_info"
            >系统代扣还款</TabPane>
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
              :style="{height:!this.showBottom?'inherit':'calc(100% - 325px)'}"
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
                  <span
                    class="tel"
                    @click="handCall"
                  >
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
                  <span
                    class="tel"
                    @click="handCall"
                  >
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
                  <span
                    class="tel"
                    @click="handCall"
                  >
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
                  @on-click="tabClick"
                  :animated="false"
                  size="small"
                >
                  <TabPane
                    label="通话统计"
                    name="case_detail_mail_statistics_list"
                  >
                    <div>
                      <Table
                        border
                        :data="case_detail_mail_statistics_list_tableData"
                        :columns="case_detail_mail_statistics_list_tableColumns"
                        stripe
                      ></Table>
                      <!-- 分页 -->
                      <div class="vue-panel-page">

                        <div style="float: right;">
                          <Page
                            :total="case_detail_mail_statistics_list_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            show-sizer
                            :page-size="case_detail_mail_statistics_list_pageSize"
                            :current="case_detail_mail_statistics_list_pageNo"
                            @on-page-size-change="changeSize('case_detail_mail_statistics_list')"
                            @on-change="changePage('case_detail_mail_statistics_list')"
                          ></Page>
                        </div>

                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    label="通话明细"
                    name="case_detail_mail_detail_list"
                  >
                    <div>
                      <Table
                        border
                        :data="case_detail_mail_detail_list_tableData"
                        :columns="case_detail_mail_detail_list_tableColumns"
                        stripe
                      ></Table>
                      <!-- 分页 -->
                      <div class="vue-panel-page">

                        <div style="float: right;">
                          <Page
                            :total="case_detail_mail_detail_list_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            show-sizer
                            :page-size="case_detail_mail_detail_list_pageSize"
                            :current="case_detail_mail_detail_list_pageNo"
                            @on-page-size-change="changeSize('case_detail_mail_detail_list')"
                            @on-change="changePage('case_detail_mail_detail_list')"
                          ></Page>
                        </div>

                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    label="通讯录"
                    name="case_detail_mail_list"
                  >
                    <div>
                      <Table
                        border
                        :data="case_detail_mail_list_tableData"
                        :columns="case_detail_mail_list_tableColumns"
                        stripe
                      ></Table>
                      <!-- 分页 -->
                      <div class="vue-panel-page">

                        <div style="float: right;">
                          <Page
                            :total="case_detail_mail_list_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            show-sizer
                            :page-size="case_detail_mail_list_pageSize"
                            :current="case_detail_mail_list_pageNo"
                            @on-page-size-change="changeSize('case_detail_mail_list')"
                            @on-change="changePage('case_detail_mail_list')"
                          ></Page>
                        </div>

                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    label="通话更新"
                    name="case_detail_mail_list_appended"
                  >
                    <div>
                      <Table
                        border
                        :data="case_detail_mail_list_appended_tableData"
                        :columns="case_detail_mail_list_appended_tableColumns"
                        stripe
                      ></Table>
                      <!-- 分页 -->
                      <div class="vue-panel-page">

                        <div style="float: right;">
                          <Page
                            :total="case_detail_mail_list_appended_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            show-sizer
                            :page-size="case_detail_mail_list_appended_pageSize"
                            :current="case_detail_mail_list_appended_pageNo"
                            @on-page-size-change="changeSize('case_detail_mail_list_appended')"
                            @on-change="changePage('case_detail_mail_list_appended')"
                          ></Page>
                        </div>

                      </div>
                    </div>
                  </TabPane>
                  <Button
                    class="fr vue-back-btn header-btn"
                    type="primary"
                    size="small"
                    slot="extra"
                  >增加</Button>
                </Tabs>
              </div>
            </Card>
            <Card
              class="case-bottom-panel"
              :style="{bottom:this.showBottom?'0px':'-1000px'}"
            >

              <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="100"
              >
                <FormItem
                  label="沟通对象"
                  prop="name"
                >
                  <Input
                    size="small"
                    disabled
                    v-model="formValidate.name"
                    placeholder="请输入沟通对象"
                  ></Input>
                </FormItem>
                <FormItem
                  label="关系"
                  prop="city"
                >
                  <Select
                    size="small"
                    v-model="formValidate.city"
                    placeholder="请输入选择关系"
                  >
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="拨打状态"
                  prop="city"
                >
                  <Select
                    size="small"
                    v-model="formValidate.city"
                    placeholder="请输入选择拨打状态"
                  >
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="沟通状态"
                  prop="collectSts"
                >
                  <Select
                    size="small"
                    v-model="formValidate.collectSts"
                    placeholder="请输入选择沟通状态"
                  >
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="承诺还款时间"
                  prop="date"
                >
                  <DatePicker
                    style="width:100%;"
                    size="small"
                    type="date"
                    placeholder="请选择承诺还款时间"
                    v-model="formValidate.date"
                  ></DatePicker>
                </FormItem>
                <FormItem
                  label="备注"
                  prop="desc"
                >
                  <Input
                    v-model="formValidate.desc"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="请输入备注"
                  ></Input>
                </FormItem>
                <FormItem style="margin-top:10px">
                  <Button
                    type="primary"
                    size="small"
                    @click="handleSubmit('formValidate')"
                  >提交</Button>
                  <Button
                    type="ghost"
                    size="small"
                    @click="handleCancle()"
                    style="margin-left: 8px"
                  >取消</Button>
                </FormItem>
              </Form>
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
