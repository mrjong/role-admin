<template>
  <div class="heighti case-top-panel">
    <Card
      style="width: 500px"
      class="heighti case-top-panel"
      :style="{height:!this.showBottom?'inherit':'calc(100% - 325px)'}"
    >
      <Spin size="large" fix v-if="!DY_IS_CALL"></Spin>
      <div>
        <div class="case-desc-close">
          <div class="round_info" style="display: inline-block" v-if="collectCategory">
            <span>
              当日轮次：
              <em>{{round_info_data.todayRounds}}</em>
            </span>
            <Poptip confirm title="确认要结束本轮呼叫轮次吗？" @on-ok="rounds_over">
              <Button
                size="small"
                type="error"
                :disabled="(!round_info_data.endable || remark_flag)"
              >结束</Button>
            </Poptip>
            <span>
              本轮可触达联系人数量：
              <em>{{round_info_data.availiableAbs}}</em>
            </span>
            <span>
              总轮次：
              <em>{{round_info_data.totalRounds}}</em>
            </span>
          </div>
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
            :class="{'tel': true, 'readonly': !all_opt || (round_info_data.callAccess && !round_info_data.callAccess.debtorCallable)}"
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
                :content="all_opt && round_info_data.callAccess && round_info_data.callAccess.debtorCallable?'拨打':'暂无权限拨打'"
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
          <Tooltip v-if="readType!=='read'" class="edit-hover" content="编辑" placement="left">
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
          v-for="(item,index) in case_detail_urgent_contact_Data.userContactList"
        >
          <span
            class="state-name"
          >{{item.channelSource === '5'? '本人（变更）': item.channelSource === '10'? '本人（人审）':'紧急联系人'}}</span>
          <span class="name">
            {{item.cntUserNameClear}}
            <span>({{item.cntRelTypName}})&nbsp;</span>
          </span>
          <span
            :class="{'tel': true, 'readonly': !all_opt || (round_info_data.callAccess && (!item.channelSource?!round_info_data.callAccess.urgencyCallable: !round_info_data.callAccess.debtorCallable))}"
            @click="handCall(item,'call', item.cntRelTyp === '00'? '01': '02')"
          >
            <Badge :count="item.callCount" class-name="badge_wrap_myself">
              <Tooltip
                :content="all_opt && round_info_data.callAccess && round_info_data.callAccess.urgencyCallable?'拨打':'暂无权限拨打'"
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
          <Tooltip v-if="readType!=='read'" class="edit-hover" content="编辑" placement="left">
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
          <!-- <TabPane label="通话统计" name="case_detail_mail_statistics_list">
            <div>
              <Table
                border
                :loading="message_list_loading"
                max-height="500"
                :data="case_detail_mail_statistics_list_tableData"
                :columns="case_detail_mail_statistics_list_tableColumns"
                stripe
              ></Table>
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_mail_statistics_list_total"
                    show-total
                    show-sizer
                    size="small"
                    transfer
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_mail_statistics_list_pageSize"
                    :current.sync="case_detail_mail_statistics_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_mail_statistics_list')"
                    @on-change="changePage($event, 'case_detail_mail_statistics_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>-->
          <!-- <TabPane label="通话明细" name="case_detail_mail_detail_list">
            <div>
              <Table
                border
                :loading="message_list_loading"
                :data="case_detail_mail_detail_list_tableData"
                :columns="case_detail_mail_detail_list_tableColumns"
                max-height="500"
                stripe
              ></Table>
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_mail_detail_list_total"
                    show-total
                    show-sizer
                    size="small"
                    transfer
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_mail_detail_list_pageSize"
                    :current.sync="case_detail_mail_detail_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_mail_detail_list')"
                    @on-change="changePage($event, 'case_detail_mail_detail_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>-->
          <TabPane label="联系人" name="case_detail_mail_list">
            <div>
              <Table
                border
                :loading="message_list_loading"
                :data="case_detail_mail_list_tableData"
                :columns="case_detail_mail_list_tableColumns"
                max-height="500"
                stripe
              ></Table>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_mail_list_total"
                    show-total
                    show-sizer
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    transfer
                    :page-size="case_detail_mail_list_pageSize"
                    :current.sync="case_detail_mail_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_mail_list')"
                    @on-change="changePage($event, 'case_detail_mail_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane
            class="call_update"
            :icon="case_detail_urgent_contact_Data.isMailAppend || case_detail_mail_list_appended_tableData.length >0? 'md-person-add': ''"
            label="联系人更新"
            name="case_detail_mail_list_appended"
          >
            <div>
              <Table
                border
                :loading="message_list_loading"
                :data="case_detail_mail_list_appended_tableData"
                :columns="case_detail_mail_list_appended_tableColumns"
                stripe
                max-height="500"
              ></Table>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_mail_list_appended_total"
                    show-total
                    show-sizer
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    transfer
                    :page-size="case_detail_mail_list_appended_pageSize"
                    :current.sync="case_detail_mail_list_appended_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_mail_list_appended')"
                    @on-change="changePage($event, 'case_detail_mail_list_appended')"
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
    <Card
      class="case-bottom-panel"
      :style="{bottom:this.showBottom?'0px':'-1000px', width: '480px'}"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
        v-show="showBottom"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="沟通对象">
              <Input
                size="small"
                clearable
                v-model.trim="formValidate.userNmClear"
                placeholder="请输入沟通对象"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="沟通途径" prop='collectFlg'>
              <Select
                clearable
                size="small"
                placeholder="请选择沟通途径"
                @on-change='collectFlgChange'
                v-model="formValidate.collectFlg"
              >
                <Option
                  v-for="item in getDirObj.CONTACT_METHOD"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="关系" prop="callUserType">
              <Select
                size="small"
                v-model="formValidate.callUserType"
                @on-change="select_relation"
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
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="isCollectResult">
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
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="沟通状态" prop="communicateResult">
              <Select
                size="small"
                transfer
                clearable
                @on-change='communicateResultChange'
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
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="isPromiseRepayDate">
            <FormItem label="承诺还款时间" prop='promiseRepayDate'>
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
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="个人资产">
              <Select
                size="small"
                v-model="formValidate.propertyList"
                transfer
                clearable
                multiple
                placeholder="请选择个人资产"
              >
                <Option
                  v-for="item,index in getDirObj.PERSONAL_PROPERTY"
                  :value="item.itemCode"
                  :key="item.itemCode+index"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="不良嗜好">
              <Select
                size="small"
                v-model="formValidate.badHabitsList"
                transfer
                clearable
                multiple
                placeholder="请选择不良嗜好"
              >
                <Option
                  v-for="item,index in getDirObj.BAD_HABITS"
                  :value="item.itemCode"
                  :key="item.itemCode+index"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
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
          </Col>
        </Row>
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
    <!-- 新增联系人 -->
    <Modal title="新增联系人" v-model="address_list_modal" :mask-closable="false">
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="80"
        class="panel_list"
        :rules="addRuleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
            <FormItem span="6" label="电话号码:" prop="mblNo">
              <Input
                :maxlength="15"
                size="small"
                clearable
                v-model.trim="formItem.mblNo"
                placeholder="请输入手机号或座机号"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
            <FormItem span="6" label="姓名:" prop="userNm">
              <Input size="small" clearable v-model.trim="formItem.userNm" placeholder="请输入姓名"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
            <FormItem label="关系:" prop="callUserType">
              <Select size="small" placeholder="请选择关系" transfer v-model="formItem.callUserType">
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
    <!-- 容联、讯众软电话 -->
    <div class="tel-box" v-if="showMoorTel" :style="xZStyle && 'width: 210px'">
      <div class="tel-box-desc" :style="xZStyle && 'width: 200px'">
        <div
          class="tel-num"
          :style="xZStyle && 'display: inline-block; marginRight: 20px'"
        >{{moorToCallMblHid}}</div>
        <div class="tel-desc" :style="xZStyle && 'display: inline-block'">{{moorToCallUser}}</div>
        <div class="tel-desc">{{xZStatus}}</div>
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

<script src='./index.js'></script>
