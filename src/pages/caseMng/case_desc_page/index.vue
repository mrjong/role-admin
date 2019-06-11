<template>
  <div class="panel_list p5">
    <Modal title="新增通讯录" v-model="modal7">
      <Form
        ref="formItem2"
        :model="formItem2"
        :label-width="80"
        class="panel_list"
        :rules="ruleValidate2"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
            <FormItem span="6" label="手机号码:" prop="mblNo">
              <Input
                :maxlength="11"
                size="small"
                clearable
                v-model.trim="formItem2.mblNo"
                placeholder="请输入手机号码"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
            <FormItem span="6" label="姓名:" prop="userNm">
              <Input size="small" clearable v-model.trim="formItem2.userNm" placeholder="请输入姓名"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
            <FormItem label="关系:" prop="callUserType">
              <Select size="small" placeholder="请选择关系" transfer v-model="formItem2.callUserType">
                <Option
                  v-for="item in getDirObj.CONTACT_REL_TYPE"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button size="small" @click="closeTxl">关闭</Button>
        <Button type="primary" size="small" @click="saveTxl" :loading="add_txl_loading">
          <span v-if="!add_txl_loading">提交</span>
          <span v-else>添加中...</span>
        </Button>
      </div>
    </Modal>

    <!-- 弹层 -->
    <div class="case-left-container" :style="{paddingRight:showBtn?'25px':'385px'}">
      <!-- 检索条件 -->
      <Card class="vue-panel case-desc">
        <p slot="title">
          {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmClear}}
          <!-- <Poptip
            :content="mingwenData"
            v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid"
          >
            <Icon
              class="eye-class"
              title="显示明文"
              type="md-eye"
              @click.native="syscommon_decrypt({
                type:'NAME',
                data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm
            })"
            ></Icon>
          </Poptip>-->
          （{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userGenderName}}/{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.age}}）
          <!-- 信用进度按钮 -->
          <span
            v-if="case_detail_case_identity_info_Data.caseHandleStatus && case_detail_case_identity_info_Data.caseHandleStatus != 'OUT'"
            @click.stop="get_credit_process"
            style="line-height: 20px; height: 26px; display: inline-block; font-weight: 500; color: #2d8cf0; margin-left: 10px; font-size: 13px; cursor: pointer;"
          >
            <Icon :type="!credit_panel?'ios-arrow-dropup':'ios-arrow-dropdown'" size="20"></Icon>
            <span>信用进度</span>
          </span>
          <Button
            v-if="readType!=='read' && apply_arbitrament && case_detail_case_identity_info_Data.caseHandleStatus &&case_detail_case_identity_info_Data.caseHandleStatus != 'OUT'"
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
          >申请还款</Button>-->
          <Button
            v-if="readType!=='read' && apply_deduct && case_detail_case_identity_info_Data.caseHandleStatus &&case_detail_case_identity_info_Data.caseHandleStatus != 'OUT'"
            @click.stop="handOpen('huakou', case_collect_case_list_data&&case_collect_case_list_data.userId)"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            :disabled="btnDisable"
          >申请划扣</Button>

          <Button
            v-if="readType!=='read' && apply_remission && case_detail_case_identity_info_Data.caseHandleStatus &&case_detail_case_identity_info_Data.caseHandleStatus != 'OUT'"
            @click="handOpen('jianmian','申请减免')"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            :disabled="btnDisable"
          >申请减免</Button>
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
        <div class="panel-desc" v-if="!showPanel">
          <Row :gutter="10">
            <Col span="12">
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="panel-desc-title">
                  身份证号：
                  <span>
                    {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.idNoHid}}
                    <Poptip
                      :content="mingwenData"
                      v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.idNoHid"
                    >
                      <Icon
                        class="eye-class"
                        title="显示明文"
                        type="md-eye"
                        v-if="plaintext"
                        @click.native="syscommon_decrypt({type:'ID_CARD',data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.idNo})"
                      ></Icon>
                    </Poptip>
                  </span>
                </div>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="panel-desc-title">
                  逾期应还金额：
                  <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.overdueAmt | money}}</span>
                </div>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="panel-desc-title">
                  当前逾期期数：
                  <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.overduePerdCount}}</span>
                </div>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="panel-desc-title">
                  家庭住址：
                  <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.address}}</span>
                </div>
              </Col>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="fl" v-for="(item,index) in img_list">
                <div class="demo-upload-list">
                  <img
                    :src="item.imgPath? `/admin/img/mark/${item.imgPath}`: null"
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
            <Col :xs="24" :sm="24" :md="24" :lg="24" style="padding-top: 40px">
              <Spin fix v-if="time_loading">
                <Icon type="ios-loading" size="24" class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
              <TimeLine v-if="credit_panel" :time_line_data="time_line_data"></TimeLine>
            </Col>
          </Row>
        </div>
      </Card>
      <!-- 检索结果 -->
      <Card class="vue-panel-table">
        <p slot="title" @click="showPanel2=!showPanel2">
          <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>案件信息
          <span
            class="qishu"
          >{{case_detail_case_base_info_Data.prdTypName}}（{{case_detail_case_base_info_Data.perdCnt}}期）</span>
        </p>
        <!-- 表格 -->
        <div v-if="!showPanel2">
          <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
            <div class="panel-desc">
              <Row :gutter="5">
                <div class="panel-desc-title fl mr10">
                  账单号：
                  <span>{{case_detail_case_base_info_Data.billNo}}</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  借款本金：
                  <span>{{case_detail_case_base_info_Data.loanAmount | money}}</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  借款时间：
                  <span>{{case_detail_case_base_info_Data.loanTime | formatDatetime}}</span>
                </div>

                <div class="panel-desc-title fl mr10">
                  银行卡号：
                  <span>
                    {{case_detail_case_base_info_Data.crdNoHid}}
                    <Poptip
                      :content="mingwenData"
                      v-if="case_detail_case_base_info_Data&&case_detail_case_base_info_Data.crdNoHid"
                    >
                      <!-- <Icon
                        class="eye-class"
                        v-if
                        title="显示明文"
                        type="md-eye"
                        @click.native="syscommon_decrypt({
                type:'BANK_CARD',
                data:case_detail_case_base_info_Data&&case_detail_case_base_info_Data.crdNo
            })"
                      ></Icon>-->
                    </Poptip>
                  </span>
                </div>

                <div class="panel-desc-title fl mr10">
                  银行卡：
                  <span>{{case_detail_case_base_info_Data.corgName}}</span>
                </div>
              </Row>
            </div>
          </Form>
          <Table :row-class-name="rowClassName" :data="tableData" :columns="tableColumns" stripe></Table>
        </div>
      </Card>

      <!-- 检索结果 -->
      <Card class="vue-panel-table">
        <p>
          <Tabs @on-click="tabClick" type="card" size="small" :animated="false">
            <TabPane label="催收信息" name="case_detail_remark_list">
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
            <TabPane label="回款信息" name="case_detail_repay_ord_list">
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
            <TabPane label="用户主动还款" name="case_detail_user_repay_list">
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
            <TabPane label="系统代扣还款" name="case_detail_system_repay_list">
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
          <Tabs type="card" @on-click="tabClick" size="small" :animated="false">
            <TabPane label="用户绑卡信息" name="case_detail_bindcard_list">
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
            <TabPane label="操作记录" name="case_detail_allot_list">
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
            <TabPane label="站内信记录" name="case_detail_siteletter_list">
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
            <TabPane label="地址信息" name="case_detail_address_info">
              <div class="panel-desc">
                <Row :gutter="10">
                  <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="panel-desc-title">
                      家庭住址：
                      <span>{{case_detail_address_info_Data&&case_detail_address_info_Data.usrProvAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.usrCityAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.usrDtlAddr}}</span>
                    </div>
                  </Col>
                  <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="panel-desc-title">
                      工作地址：
                      <span>{{case_detail_address_info_Data&&case_detail_address_info_Data.workProvAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.workCityAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.workDtlAddr}}</span>
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
      <Tooltip v-if="showBtn" content="点击查看" placement="left">
        <div @click="isShow" class="txl-container">通讯录信息</div>
      </Tooltip>
      <div class="case-desc-alert">
        <transition name="slide
        ">
          <div v-show="!showBtn" class="heighti">
            <Card
              style="width:385px"
              class="heighti case-top-panel"
              :style="{height:!this.showBottom?'inherit':'calc(100% - 325px)'}"
            >
              <div>
                <div class="case-desc-close">
                  <Tooltip content="收起" placement="left">
                    <Icon @click.native="isShow" size="20" type="md-close"></Icon>
                  </Tooltip>
                </div>
                <div class="ivu-alert-copy ivu-alert-info">
                  <span class="name">
                    <span class="state-name">本人</span>
                    {{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmClear}}
                    <span>(本人)&nbsp;</span>
                  </span>
                  <span
                    class="tel"
                    @click="handCall({
                        callUserType:'00',
                        userId:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userId,
                        userNmHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid,
                        userNmClear:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmClear,
                        userNm:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm,
                        mblNoHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid,
                        mblNo:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNo
                    },'call','01')"
                  >
                    <Badge
                      :count="case_detail_case_identity_info_Data.callCount"
                      class-name="badge_wrap_myself"
                    >
                      <Tooltip
                        :content="all_opt?'拨打':'暂无权限拨打'"
                        placement="left"
                      >{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid}}</Tooltip>
                    </Badge>
                  </span>
                  <Poptip
                    :content="mingwenData"
                    v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid"
                  >
                    <Icon
                      class="eye-class"
                      title="显示明文"
                      type="md-eye"
                      v-if="plaintext"
                      @click.native="syscommon_decrypt(
                        {
                          type:'MBL',
                          data:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNo
                        }
                      )"
                    ></Icon>
                  </Poptip>
                  <span
                    class="state"
                    v-if="case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.callStateName"
                  >{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.callStateName}}</span>
                  <Tooltip
                    v-if="readType!=='read'"
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      @click.native="handCall({
                        callUserType:'00',
                        userId:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userId,
                        userNmHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmHid,
                        userNmClear:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNmClear,
                        userNm:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.userNm,
                        mblNoHid:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNoHid,
                        mblNo:case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.mblNo
                    },null,'01')"
                      class="edit"
                      type="md-create"
                      v-if="all_opt"
                    ></Icon>
                  </Tooltip>
                </div>
                <div
                  class="ivu-alert-copy ivu-alert-error"
                  v-for="(item,index) in case_detail_urgent_contact_Data"
                >
                  <span class="state-name">紧急联系人</span>
                  <span class="name">
                    {{item.cntUserNameClear}}
                    <span>({{item.cntRelTypName}})&nbsp;</span>
                  </span>
                  <span class="tel" @click="handCall(item,'call','02')">
                    <Badge :count="item.callCount" class-name="badge_wrap_myself">
                      <Tooltip
                        :content="all_opt?'拨打':'暂无权限拨打'"
                        placement="left"
                      >{{item.cntUserMblNoHid}}</Tooltip>
                    </Badge>
                  </span>
                  <Poptip :content="mingwenData" v-if="item&&item.cntUserMblNoHid">
                    <Icon
                      class="eye-class"
                      title="显示明文"
                      type="md-eye"
                      v-if="plaintext"
                      @click.native="syscommon_decrypt({type:'MBL', data:item&&item.cntUserMblNo})"
                    ></Icon>
                  </Poptip>
                  <span class="state" v-if="item.callStateName">{{item.callStateName}}</span>
                  <Tooltip
                    v-if="readType!=='read'"
                    class="edit-hover"
                    content="编辑"
                    placement="left"
                  >
                    <Icon
                      @click.native="handCall(item,null,'02')"
                      class="edit"
                      type="md-create"
                      v-if="all_opt"
                    ></Icon>
                  </Tooltip>
                </div>
              </div>
              <div class="heighti">
                <Tabs @on-click="tab_click_address" :animated="false" size="small">
                  <TabPane label="通话统计" name="case_detail_mail_statistics_list">
                    <div>
                      <Table
                        border
                        :loading="message_list_loading"
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
                  <TabPane label="通话明细" name="case_detail_mail_detail_list">
                    <div>
                      <Table
                        border
                        :loading="message_list_loading"
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
                  <TabPane label="通讯录" name="case_detail_mail_list">
                    <div>
                      <Table
                        border
                        :loading="message_list_loading"
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
                  <TabPane label="通话更新" name="case_detail_mail_list_appended">
                    <div>
                      <Table
                        border
                        :loading="message_list_loading"
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
                    v-if="readType!=='read' && all_opt"
                    size="small"
                    slot="extra"
                    @click.stop="addtxl"
                  >新增</Button>
                </Tabs>
              </div>
            </Card>
            <Card class="case-bottom-panel" :style="{bottom:this.showBottom?'0px':'-1000px'}">
              <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="100"
              >
                <FormItem label="沟通对象">
                  <Input
                    size="small"
                    clearable
                    v-model.trim="formValidate.userNmClear"
                    placeholder="请输入沟通对象"
                  ></Input>
                </FormItem>
                <FormItem label="关系" prop="callUserType">
                  <Select
                    size="small"
                    v-model="formValidate.callUserType"
                    @on-change='select_relation'
                    transfer
                    clearable
                    placeholder="请选择关系"
                  >
                    <Option
                      v-for="item,index in getDirObj.CONTACT_REL_TYPE"
                      :value="item.itemCode"
                      :key="item.itemCode+index"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>

                <FormItem label="拨打状态" prop="collectResult">
                  <Select
                    size="small"
                    v-model="formValidate.collectResult"
                    @on-change="SelectChange"
                    transfer
                    clearable
                    placeholder="请选择拨打状态"
                  >
                    <Option
                      v-for="item,index in collectcode_getCollectRelate_Data"
                      :value="item.codeKey"
                      :key="item.codeKey+index"
                    >{{ item.codeName }}</Option>
                  </Select>
                </FormItem>

                <FormItem label="沟通状态" prop="communicateResult">
                  <Select
                    size="small"
                    transfer
                    clearable
                    v-model="formValidate.communicateResult"
                    placeholder="请选择沟通状态"
                  >
                    <Option
                      v-for="item,index in collectcode_getCollectRelate_childItem"
                      :value="item.codeKeyResult"
                      :key="item.codeKeyResult+index"
                    >{{ item.codeNameResult }}</Option>
                  </Select>
                </FormItem>

                <FormItem label="承诺还款时间">
                  <DatePicker
                    placement="top"
                    style="width:100%;"
                    size="small"
                    transfer
                    clearable
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择承诺还款时间"
                    v-model="formValidate.promiseRepayDate"
                  ></DatePicker>
                </FormItem>
                <FormItem label="备注">
                  <Input
                    v-model.trim="formValidate.collectRmk"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 2}"
                    :maxlength="249"
                    clearable
                    placeholder="请输入备注，最大249个字符"
                  ></Input>
                </FormItem>
                <FormItem style="margin-top:10px">
                  <Button
                    type="primary"
                    size="small"
                    @click="handleSubmit('formValidate')"
                    :loading="add_collect_loading"
                  >
                    <span v-if="!add_collect_loading">提交</span>
                    <span v-else>提交中...</span>
                  </Button>
                  <Button size="small" @click="handleCancle(true)" style="margin-left: 8px">取消</Button>
                </FormItem>
              </Form>
            </Card>
          </div>
        </transition>
      </div>
    </div>
    <!-- 弹层 -->
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    <jianmian
      v-model="modal.jianmian"
      v-if="modal.jianmian"
      v-on:passBack="passBackBreaks"
      :edit_flag="true"
      :breaks_data="breaks_data"
    ></jianmian>
    <zhongcai
      :getDirObj="getDirObj"
      v-on:passBack="passBack('zhongcai')"
      v-model="modal.zhongcai"
      v-if="modal.zhongcai"
      :zhongcai_data="zhongcai_set_data"
    ></zhongcai>
    <huakou
      v-on:passBack="passBack('huakou')"
      v-model="modal.huakou"
      v-if="modal.huakou"
      :prdTyp="prdTyp"
      :caseNo="caseNo"
      :userId="userId"
    ></huakou>
    <div v-if="message_detail_flag" style="z-index: 1000">
      <Modal title="站内信信息" class="message_detail" v-model="message_detail_flag" :footer-hide="true">
        <Row>
          <Col :xs="24" :sm="24" :md="4" :lg="4" span="4">
            <p class="message_detail_title">发送时间：</p>
            <p class="message_detail_title">收件人：</p>
            <p class="message_detail_title">发送结果：</p>
            <p class="message_detail_title">发送内容：</p>
          </Col>
          <Col :xs="24" :sm="24" :md="18" :lg="18" span="18">
            <p class="message_detail_desc">{{message_detail_data.sendTime | formatDate}}</p>
            <p
              class="message_detail_desc"
            >{{message_detail_data.userName? message_detail_data.userName: ''}}</p>
            <p
              class="message_detail_desc"
            >{{message_detail_data.sendStatus? message_detail_data.sendStatus: ''}}</p>
            <p
              class="message_detail_desc"
            >{{message_detail_data.sendContent? message_detail_data.sendContent: ''}}</p>
          </Col>
        </Row>
      </Modal>
    </div>
    <!-- 容联、讯众软电话 -->
    <div class="tel-box" v-if="showMoorTel">
      <div class="tel-box-desc">
        <div class="tel-num">{{moorToCallMblHid}}</div>
        <div class="tel-desc">{{moorToCallUser}}</div>
        <div class="tel-btn-box">
          <!-- <div class="item success" v-if="success">
            <div class="icon-box" @click="answer">
              <Icon type="ios-call"></Icon>
            </div>
          </div>-->
          <div class="item fail">
            <div class="icon-box" @click="call_moor_hung_up" v-if="seatType === 'RL'">
              <Icon class="fail-icon" type="ios-call"></Icon>
            </div>
            <div class="icon-box" @click="call_xz_hung_off" v-else>
              <Icon class="fail-icon" type="ios-call"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
.fail-icon {
  transform: rotate(132deg);
}
.tel-box {
  position: fixed;
  left: 0;
  bottom: 20px;
  width: 110px;
  height: 100px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 1000;

  line-height: 25px;
  .tel-box-desc {
    padding: 5px;
    text-align: center;
    position: absolute;
    top: 0;
    width: 100px;
    left: 0;
    .tel-num {
      font-weight: 600;
      font-size: 16px;
    }
    .tel-desc {
      color: #fff;
      font-size: 12px;
    }
    .tel-btn-box {
      margin: 5px auto;
      display: flex;
      .item {
        flex: 1;
        cursor: pointer;
        .icon-box {
          font-size: 20px;
          width: 30px;
          display: inline-block;
          line-height: 30px;
          border-radius: 50%;
          height: 30px;
          color: #fff;
        }
        &.fail {
          .icon-box {
            background: rgb(234, 86, 66);
          }
        }
        &.success {
          .icon-box {
            background: rgb(117, 213, 114);
          }
        }
      }
    }
  }
}
</style>
