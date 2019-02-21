<template>

  <div class="panel_list p5">

    <Modal
      title="新增通讯录"
      v-model="modal7"
    >
      <Form
        ref="formItem2"
        :model="formItem2"
        :label-width="80"
        class="panel_list"
        :rules="ruleValidate2"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            span="24"
          >
          <FormItem
            span="6"
            label="手机号码:"
            prop="mblNo"
          >
            <Input
              size="small"
              clearable
              v-model="formItem2.mblNo"
              placeholder="请输入手机号码"
            ></Input>
          </FormItem>
          </Col>

          <Col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            span="24"
          >
          <FormItem
            span="6"
            label="姓名:"
            prop="userNm"
          >
            <Input
              size="small"
              clearable
              v-model="formItem2.userNm"
              placeholder="请输入姓名"
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            span="24"
          >
          <FormItem
            label="关系:"
            prop="callUserType"
          >
            <Select
              size="small"
              placeholder="请选择关系"
              v-model="formItem2.callUserType"
            >
              <Option
                v-for="item in getDirObj.CNT_REL_TYP"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>

        </Row>

      </Form>
      <div slot="footer">
        <Button
          type="ghost"
          size="small"
          @click="closeTxl"
        >关闭</Button>
        <Button
          type="primary"
          size="small"
          @click="saveTxl"
        >提交</Button>
      </div>
    </Modal>

    <!-- 弹层 -->
    <div
      class="case-left-container"
      :style="{paddingRight:showBtn?'25px':'370px'}"
    >
      <!-- 检索条件 -->
      <Card class="vue-panel case-desc">
        <p slot="title">
          {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid}} <Poptip
            :content="mingwenData"
            v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid"
          >
            <Icon
              class="eye-class"
              title="显示明文"
              type="eye"
              @click="syscommon_decrypt({
                type:'NAME',
                data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm
            })"
            ></Icon>
          </Poptip>（{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userGenderName}}/{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.age}}）
          <Button
            v-if="readType!=='read'"
            @click.stop="handOpen('zhongcai')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            :disabled="btnDisable"
          >申请仲裁</Button>
          <!-- <Button
            v-if="readType!=='read'"
            @click="handOpen('huankuan','申请还款')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            :disabled="btnDisable"
          >申请还款</Button> -->
          <Button
            v-if="readType!=='read'"
            @click.stop="handOpen('huakou')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            :disabled="btnDisable"
          >申请划扣</Button>

          <!-- <Button
            v-if="readType!=='read'"
            @click="handOpen('jianmian','申请减免')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            :disabled="btnDisable"
          >申请减免</Button> -->
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            v-if="readType!=='read'"
            @click.stop="nextCase(case_collect_case_list_data&&case_collect_case_list_data.downCaseNo)"
            :disabled="btnDisable||!case_collect_case_list_data||!case_collect_case_list_data.downCaseNo"
            size="small"
          >下一个</Button>
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            v-if="readType!=='read'"
            @click.stop="nextCase(case_collect_case_list_data&&case_collect_case_list_data.upCaseNo)"
            :disabled="btnDisable||!case_collect_case_list_data||!case_collect_case_list_data.upCaseNo"
            size="small"
          >上一个</Button>
        </p>
        <div
          class="panel-desc"
          v-if="!showPanel"
        >
          <Row :gutter="10">
            <Col span="12">
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              身份证号：<span>
                {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.idNoHid}}
                <Poptip
                  :content="mingwenData"
                  v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.idNoHid"
                >
                  <Icon
                    class="eye-class"
                    title="显示明文"
                    type="eye"
                    @click="syscommon_decrypt({
                type:'ID_CARD',
                data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.idNo
            })"
                  ></Icon>
                </Poptip>
              </span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              逾期应还金额：<span>
                {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.overdueAmt | money}}
              </span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              总逾期期数：<span>
                {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.overduePerdCount}}
              </span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
            <div class="panel-desc-title">
              家庭住址：<span>
                {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.address}}
              </span>
            </div>
            </Col>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
            >
            <div
              class="fl"
              v-for="(item,index) in case_detail_case_identity_info_Data.userImgList"
            >
              <div class="demo-upload-list">
                <img
                  :src="`/admin/img/mark/${item.imgPath}`"
                  style="vertical-align: top;"
                >
                <div
                  class="demo-upload-list-cover"
                  @click="handleView(`/admin/img/mark/${item.imgPath}`)"
                >
                  <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                </div>
              </div>
              <div class="text-center card-text">{{item.imgTypeName}}</div>
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
          <span class="qishu">{{case_detail_case_base_info_Data.prdTypName}}（{{case_detail_case_base_info_Data.perdCnt}}期）</span>
        </p>
        <!-- 表格 -->
        <div v-if="!showPanel2">
          <Form
            ref="formItem"
            :model="formItem"
            :label-width="80"
            :rules="ruleValidate"
          >
            <div class="panel-desc">
              <Row :gutter="5">

                <div class="panel-desc-title fl mr10">
                  账单号：<span>{{case_detail_case_base_info_Data.billNo}}</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  借款本金：<span>{{case_detail_case_base_info_Data.loanAmount | money}}</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  借款时间：<span>{{case_detail_case_base_info_Data.loanTime | formatDatetime}}</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  银行卡号：<span>{{case_detail_case_base_info_Data.crdNoHid}}
                    <Poptip
                      :content="mingwenData"
                      v-if="case_detail_case_base_info_Data&&case_detail_case_base_info_Data.crdNoHid"
                    >
                      <Icon
                        class="eye-class"
                        title="显示明文"
                        type="eye"
                        @click="syscommon_decrypt({
                type:'BANK_CARD',
                data:case_detail_case_base_info_Data&&case_detail_case_base_info_Data.crdNo
            })"
                      ></Icon>
                    </Poptip>
                  </span>
                </div>

                <div class="panel-desc-title fl mr10">
                  银行卡：<span>{{case_detail_case_base_info_Data.corgName}}</span>
                </div>

              </Row>
            </div>
          </Form>
          <Table
            :row-class-name="rowClassName"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_remark_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      :page-size="case_detail_remark_list_pageSize"
                      :current.sync="case_detail_remark_list_pageNo"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_repay_ord_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      :page-size="case_detail_repay_ord_list_pageSize"
                      :current.sync="case_detail_repay_ord_list_pageNo"
                      @on-page-size-change="changeSize(null,'case_detail_repay_ord_list')"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_user_repay_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      :page-size="case_detail_user_repay_list_pageSize"
                      :current.sync="case_detail_user_repay_list_pageNo"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_system_repay_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      :page-size="case_detail_system_repay_list_pageSize"
                      :current.sync="case_detail_system_repay_list_pageNo"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_bindcard_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      :page-size="case_detail_bindcard_list_pageSize"
                      :current.sync="case_detail_bindcard_list_pageNo"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_allot_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 30, 40]"
                      show-elevator
                      :page-size="case_detail_allot_list_pageSize"
                      :current.sync="case_detail_allot_list_pageNo"
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

                  <div class="fr">
                    <Page
                      :total="case_detail_siteletter_list_total"
                      show-total
                      size="small"
                      :page-size-opts="[10, 20, 50, 100]"
                      show-elevator
                      :page-size="case_detail_siteletter_list_pageSize"
                      :current.sync="case_detail_siteletter_list_pageNo"
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
            >
              <div class="panel-desc">
                <Row :gutter="10">
                  <Col
                    :xs="24"
                    :sm="24"
                    :md="24"
                    :lg="24"
                  >
                  <div class="panel-desc-title">
                    家庭住址：<span>
                      {{case_detail_address_info_Data&&case_detail_address_info_Data.usrProvAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.usrCityAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.usrDtlAddr}}
                    </span>
                  </div>
                  </Col>

                  <Col
                    :xs="24"
                    :sm="24"
                    :md="24"
                    :lg="24"
                  >
                  <div class="panel-desc-title">
                    工作地址：<span>
                      {{case_detail_address_info_Data&&case_detail_address_info_Data.workProvAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.workCityAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.workDtlAddr}}
                    </span>
                  </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
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
                    {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid}}
                    <Poptip
                      :content="mingwenData"
                      v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid"
                    >
                      <Icon
                        class="eye-class"
                        title="显示明文"
                        type="eye"
                        @click="syscommon_decrypt({
                type:'NAME',
                data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm
            })"
                      ></Icon>
                    </Poptip>
                    <span>（本人）</span>
                  </span>
                  <span
                    class="tel"
                    @click="handCall({
                         callUserType:'01',
                         userId:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userId,
                        userNmHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid,
                        userNm:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm,
                        mblNoHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid,
                        mblNo:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNo
                    },'call','01')"
                  >
                    <Tooltip
                      content="拨打"
                      placement="left"
                    >
                      {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid}}
                    </Tooltip>
                  </span>
                  <Poptip
                    :content="mingwenData"
                    v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid"
                  >
                    <Icon
                      class="eye-class"
                      title="显示明文"
                      type="eye"
                      @click="syscommon_decrypt({
                type:'MBL',
                data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNo
            })"
                    ></Icon>
                  </Poptip>
                  <span class="state" v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.callStateName">
                    {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.callStateName}}
                  </span>
                  <Tooltip
                    v-if="readType!=='read'"
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      @click="handCall({
                        callUserType:'01',
                         userId:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userId,
                        userNmHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid,
                        userNm:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm,
                        mblNoHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid,
                        mblNo:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNo
                    },null,'01')"
                      class="edit"
                      type="edit"
                    ></Icon>
                  </Tooltip>
                </div>
                <div
                  class="ivu-alert-copy ivu-alert-error"
                  v-for="(item,index) in case_detail_urgent_contact_Data"
                >
                  <span class="state-name">
                    紧急联系人
                  </span>
                  <span class="name">
                    {{item.cntUserNameHid}}
                    <Poptip
                      :content="mingwenData"
                      v-if="item&&item.cntUserNameHid"
                    >
                      <Icon
                        class="eye-class"
                        title="显示明文"
                        type="eye"
                        @click="syscommon_decrypt({
                type:'NAME',
                data:item&&item.cntUserName
            })"
                      ></Icon>
                    </Poptip>
                    <span>（{{item.cntRelTypName}}）</span>
                  </span>
                  <span
                    class="tel"
                    @click="handCall(item,'call','02')"
                  >
                    <Tooltip
                      content="拨打"
                      placement="left"
                    >
                      {{item.cntUserMblNoHid}}
                    </Tooltip>
                  </span>
                  <Poptip
                    :content="mingwenData"
                    v-if="item&&item.cntUserMblNoHid"
                  >
                    <Icon
                      class="eye-class"
                      title="显示明文"
                      type="eye"
                      @click="syscommon_decrypt({
                type:'MBL',
                data:item&&item.cntUserMblNo
            })"
                    ></Icon>
                  </Poptip>
                  <span
                    class="state"
                    v-if="item.callStateName"
                  >
                    {{item.callStateName}}
                  </span>
                  <Tooltip
                    v-if="readType!=='read'"
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      @click="handCall(item,null,'02')"
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

                        <div class="fr">
                          <Page
                            :total="case_detail_mail_statistics_list_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            :page-size="case_detail_mail_statistics_list_pageSize"
                            :current.sync="case_detail_mail_statistics_list_pageNo"
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

                        <div class="fr">
                          <Page
                            :total="case_detail_mail_detail_list_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            :page-size="case_detail_mail_detail_list_pageSize"
                            :current.sync="case_detail_mail_detail_list_pageNo"
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

                        <div class="fr">
                          <Page
                            :total="case_detail_mail_list_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            :page-size="case_detail_mail_list_pageSize"
                            :current.sync="case_detail_mail_list_pageNo"
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

                        <div class="fr">
                          <Page
                            :total="case_detail_mail_list_appended_total"
                            show-total
                            size="small"
                            :page-size-opts="[10, 20, 50, 100]"
                            show-elevator
                            :page-size="case_detail_mail_list_appended_pageSize"
                            :current.sync="case_detail_mail_list_appended_pageNo"
                            @on-page-size-change="changeSize('case_detail_mail_list_appended')"
                            @on-change="changePage('case_detail_mail_list_appended')"
                          ></Page>
                        </div>

                      </div>
                    </div>
                  </TabPane>
                  <Button
                    class="vue-back-btn header-btn mt5"
                    type="primary"
                    v-if="readType!=='read'"
                    size="small"
                    slot="extra"
                    @click.stop="addtxl"
                  >新增</Button>
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
                  prop="userNmHid"
                >
                  <Input
                    size="small"
                    v-model="formValidate.userNmHid"
                    placeholder="请输入沟通对象"
                  ></Input>
                </FormItem>
                <FormItem
                  label="关系"
                  prop="callUserType"
                >
                  <Select
                    size="small"
                    v-model="formValidate.callUserType"
                    placeholder="请输入选择关系"
                  >
                    <Option
                      v-for="item in getDirObj.CNT_REL_TYP"
                      :value="item.itemCode"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="拨打状态"
                  prop="collectResult"
                >
                  <Select
                    size="small"
                    v-model="formValidate.collectResult"
                    @on-change="SelectChange"
                    placeholder="请输入选择拨打状态"
                  >
                    <Option
                      v-for="item in collectcode_getCollectRelate_Data"
                      :value="item.code"
                      :key="item.code"
                    >{{ item.codeName }}</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="沟通状态"
                  prop="communicateResult"
                >
                  <Select
                    size="small"
                    v-model="formValidate.communicateResult"
                    placeholder="请输入选择沟通状态"
                  >
                    <Option
                      v-for="item in collectcode_getCollectRelate_childItem"
                      :value="item.codeKeyResult"
                      :key="item.codeKeyResult"
                    >{{ item.codeNameResult }}</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="承诺还款时间"
                  prop="date"
                >
                  <DatePicker
                    placement="top"
                    style="width:100%;"
                    size="small"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择承诺还款时间"
                    v-model="formValidate.promiseRepayDate"
                  ></DatePicker>
                </FormItem>
                <FormItem
                  label="备注"
                  prop="collectRmk"
                >
                  <Input
                    v-model="formValidate.collectRmk"
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
      v-model="modal.jianmian"
    >
      <jianmian></jianmian>
    </Modal>
    <zhongcai
      :getDirObj="getDirObj"
      v-on:passBack="passBack('zhongcai')"
      v-model="modal.zhongcai"
      v-if="modal.zhongcai"
      :zhongcai_data="zhongcai_set_data"
    >
    </zhongcai>
    <huakou
      v-on:passBack="passBack('huakou')"
      v-model="modal.huakou"
      v-if="modal.huakou"
      :prdTyp="prdTyp"
      :caseNo="caseNo"
      :userId="userId"
    >
    </huakou>

  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
</style>
