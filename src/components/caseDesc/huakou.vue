<template>
  <div>
    <Modal
      title="申请划扣"
      class="jianmian"
      width="90%"
      @on-visible-change="del"
      v-model="model"
      @on-ok="handleSubmit"
    >
      <div class="alert-title">逾期信息</div>
      <div class="alert-desc">
        <div class="panel-desc">
          <Row :gutter="10">
            <Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              账单号：<span>{{repayinfo_getApplyInfo_data.billNo}}</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              客户姓名：<span>{{repayinfo_getApplyInfo_data.userName}}</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              手机号：<span>{{repayinfo_getApplyInfo_data.mblNo}}</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              产品期数：<span>{{repayinfo_getApplyInfo_data.perdNum}}</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              逾期期数：<span>{{repayinfo_getApplyInfo_data.ovduPerdNum}}</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              账单总金额：<span>{{repayinfo_getApplyInfo_data.billTotAmt | money}}</span>
            </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
            >
            <div class="panel-desc-title">
              逾期应还金额：<span>{{repayinfo_getApplyInfo_data.overdueAmt | money}}</span>
            </div>
            </Col>
            </Col>
            <Col>

            </Col>

          </Row>
        </div>
      </div>
      <div class="alert-title">减免信息</div>
      <div class="alert-desc">
        <div class="panel-desc">
          <Form
            ref="formItem"
            :model="formItem"
            :label-width="100"
            class="panel_list"
            :rules="ruleValidate"
          >
            <Row>
              <Col
                :xs="24"
                :sm="24"
                :md="6"
                :lg="6"
                span="6"
              >
              <FormItem
                span="6"
                label="还款金额:"
                prop="repayAmount"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.repayAmount"
                  placeholder="请输入还款金额"
                ></Input>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="6"
                :lg="6"
                span="6"
              >
              <FormItem
                span="6"
                label="还款账户:"
                prop="agrNo"
              >
                <Select
                  size="small"
                  :label-in-value="true"
                  placeholder="请选择还款账户"
                  @on-change="selData"
                  v-model="formItem.agrNo"
                >
                  <Option
                    v-for="item in repayinfo_getCardNos_data"
                    :value="item.agrNo"
                    :key="item.agrNo"
                  >{{ item.cardNoHid }}</Option>
                </Select>
              </FormItem>
              </Col>

              <Col
                :xs="24"
                :sm="24"
                :md="6"
                :lg="6"
                span="6"
                class="mt5"
              >
              <FormItem
                span="6"
                label="申请备注:"
                prop="applayRemarks"
              >
                <Input
                  size="small"
                  clearable
                  type="textarea"
                  v-model="formItem.applayRemarks"
                  placeholder="请输入申请备注"
                ></Input>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button
          type="ghost"
          size="small"
          @click="del"
        >关闭</Button>
        <Button
          type="primary"
          size="small"
          @click="handleSubmit"
        >提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script src="./huakou.js"></script>

<style lang="less">
@import "./index.less";
</style>
