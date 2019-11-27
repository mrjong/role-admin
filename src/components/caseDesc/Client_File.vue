<template>
  <div>
    <Modal
      class="client_file"
      width="850"
      :value="ishow"
      footer-hide
      @on-visible-change="del"
      :mask-closable="false"
    >
      <p
        slot="header"
        style="color:#000;text-align:center;font-size: 20px;font-weight: 500; line-height: 14px;"
      >
        <span>客户档案</span>
      </p>
      <Row :gutter="10">
        <Col :md="12" :lg="12">
          <!-- 收入情况 -->
          <Card class="vue-panel case-desc income">
            <p slot="title">收入情况</p>
            <p
              class="income_wrap"
              v-for="val, key ,index in archives_queryIncome_data"
              :key="val+index"
              v-if="val"
            >
              <span class="income_title">{{deal_title('archives_queryIncome', key)}}</span>
              <span class="income_content">{{val}}</span>
            </p>
          </Card>
          <!-- 债务情况 -->
          <Card class="vue-panel case-desc debt">
            <p slot="title">债务情况</p>
            <!-- 还款习惯 -->
            <div class="debt_wrap">
              <span class="debt_empty_title"></span>
              <span>当前账单</span>
              <span>历史账单</span>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">最常还款天数</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.billRepayDays}}</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.hisRepayDays}}</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">最长逾期天数</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.billOverdueDays}}</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.hisOverdueDays}}</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">减免次数/金额</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.billDecreaseNum}}/{{archives_queryDebt_data && archives_queryDebt_data.billDecreaseAmt}}</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.hisDecreaseNum}}/{{archives_queryDebt_data && archives_queryDebt_data.hisDecreaseAmt}}</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">优惠券次数/金额</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.billCouponNum}}/{{archives_queryDebt_data && archives_queryDebt_data.billCouponAmt}}</div>
              <div class="debt_content">{{archives_queryDebt_data && archives_queryDebt_data.hisCouponNum}}/{{archives_queryDebt_data && archives_queryDebt_data.hisCouponAmt}}</div>
            </div>
            <!-- 共债信息 -->
            <p class="debt_information_title" @click="showPanel = !showPanel">
              共债信息
              <Icon
                style="margin-left: 10px; color: #5c6b77"
                size="20"
                :type="showPanel? 'md-arrow-dropdown-circle': 'md-arrow-dropup-circle'"
              />
            </p>
            <div :class="showPanel? 'debt_information_box': 'debt_information_box_empty'">
              <p class="debt_information_caseOrMoney">累计借贷{{archives_queryDebt_data.billNumAll}}+{{archives_queryDebt_data.otherOutStandCount}}笔，逾期{{archives_queryDebt_data.otherOverdueCount}}+{{archives_queryDebt_data.billOngoingNum}}笔，在用{{archives_queryDebt_data.billOngoingNum}}笔</p>
              <p class="debt_information_caseOrMoney">单笔平均借贷{{archives_queryDebt_data.otherLoanBal/archives_queryDebt_data.otherOutStandCount}}元</p>
              <div class="debt_information_wrap">
                <div class="debt_information_wrap_title">本平台：</div>
                <div class="debt_information_content">
                  <p>
                    <span class="debt_information_content_title">借贷/在用笔数</span>
                    <span class="debt_information_content_cont">{{archives_queryDebt_data.billNumAll}}笔/{{archives_queryDebt_data.billOngoingNum}}笔</span>
                  </p>
                </div>
              </div>
              <div class="debt_information_wrap">
                <div class="debt_information_wrap_title">其他平台：</div>
                <div class="debt_information_content">
                  <p>
                    <span class="debt_information_content_title">借贷笔数/金额</span>
                    <span class="debt_information_content_cont">{{archives_queryDebt_data.otherOutStandCount}}笔/{{archives_queryDebt_data.otherLoanBal}}元</span>
                  </p>
                  <p>
                    <span class="debt_information_content_title">逾期笔数/金额</span>
                    <span class="debt_information_content_cont">{{archives_queryDebt_data.otherOverdueCount}}笔/{{archives_queryDebt_data.otherOverdueAmt}}元</span>
                  </p>
                  <p>
                    <span class="debt_information_content_title">不良笔数/金额</span>
                    <span class="debt_information_content_cont">{{archives_queryDebt_data.otherOverdueMoreCount}}笔/{{archives_queryDebt_data.otherOverdueMoreAmt}}元</span>
                  </p>
                </div>
              </div>
              <div class="debt_information_wrap">
                <div class="debt_information_wrap_title">信用卡：</div>
                <div class="debt_information_content">
                  <p>
                    <span class="debt_information_content_title">最高额度</span>
                    <span class="debt_information_content_cont">{{archives_queryDebt_data.creditCardLimit}}元</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col :md="12" :lg="12">
          <!-- 外呼情况 -->
          <Card class="vue-panel case-desc outbound">
            <p slot="title">外呼情况</p>
            <div class="outbound_wrap">
              <span class="outbound_empty_title"></span>
              <span>触达人数</span>
              <span>外呼次数</span>
              <span>接通率%</span>
              <span>语音播报</span>
            </div>
            <div
              class="outbound_wrap"
              v-for="item, key ,index in archives_queryOutbound_data"
              :key="item+key"
            >
              <div class="outbound_title">{{item.collectType}}</div>
              <div class="outbound_content">{{item.reachNum}}</div>
              <div class="outbound_content">{{item.outBoundNum}}</div>
              <div class="outbound_content">{{item.connectPercentile}}</div>
              <div class="outbound_content">{{item.robotCallNum}}</div>
            </div>
          </Card>
          <!-- 历史沟通 -->
          <Card class="vue-panel case-desc history">
            <p slot="title">历史沟通</p>
            <div class="history_wrap">
              <span class="history_empty_title"></span>
              <span>沟通结果</span>
              <span>次数</span>
              <span>最近沟通时间</span>
              <span>沟通途径</span>
            </div>
            <div
              class="history_wrap"
              v-for="item, key, index in archives_queryLinkHistory_data"
              :key="item+index"
            >
              <div class="history_title">{{item.collectType}}</div>
              <div class="history_content">{{item.communicateResult}}</div>
              <div class="history_content">{{item.communicateNum}}</div>
              <div class="history_content">{{item.lastCallTime | formatDatetime}}</div>
              <div class="history_content">{{item.collectContect}}</div>
            </div>
          </Card>
          <!-- 交互信息 -->
          <Card class="vue-panel case-desc interaction">
            <p slot="title">交互信息</p>
            <div class="interaction_wrap">
              <div class="interaction_title">APP：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">累计登录</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.loginNum}}次</span>
                </p>
                <p>
                  <span class="interaction_content_title">本次逾期后登录</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.loginAfterOverdueNum}}次</span>
                </p>
                <p>
                  <span class="interaction_content_title">最后登录时间</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.lastLoginTime | formatDatetime}}</span>
                </p>
              </div>
            </div>
            <div class="interaction_wrap">
              <div class="interaction_title">投诉：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">投诉次数</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.complaintNum}}次</span>
                </p>
              </div>
            </div>
            <div class="interaction_wrap">
              <div class="interaction_title">400：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">来电次数</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.phoneCalls}}次</span>
                </p>
                <p>
                  <span class="interaction_content_title">最后来电时间</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.lastLoginTime | formatDatetime}}</span>
                </p>
              </div>
            </div>
            <div class="interaction_wrap">
              <div class="interaction_title">短信：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">短信次数</span>
                  <span class="interaction_content_cont">{{archives_queryInteractive_data.shortMessageNum}}次</span>
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script src='./Client_File.js'></script>

<style lang="less">
.client_file {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 20px;
  }
  .grid-col {
    width: 49%;
    display: inline-block;
  }
  .grid-col:nth-of-type(2n + 1) {
    margin-right: 10px;
    float: left;
  }
  .grid-col:nth-of-type(2n),
  .grid-col:nth-of-type(5) {
    float: right;
  }
  .ivu-modal-body {
    background: #f0f0f0;
    padding: 10px;
    span {
      display: inline-block;
    }
    .income,
    .outbound,
    .deby,
    .history {
      margin-bottom: 10px;
    }
    // 收入情况
    .income {
      span {
        display: block;
      }
    }
    .income_wrap {
      margin-bottom: 8px;
    }
    .income_title,
    .interaction_title,
    .debt_information_wrap_title {
      float: left;
      width: 90px;
      text-align: right;
      margin-right: 5px;
    }
    .income_content,
    .interaction_content,
    .debt_information_content {
      overflow: hidden;
    }
    // 外呼情况
    .outbound_wrap,
    .debt_wrap,
    .history_wrap {
      display: flex;
      align-items: center;
      border-bottom: 1px dashed #ccc;
      padding: 10px 0;
      &:nth-of-type(1) {
        border: none;
      }
      span {
        font-size: 14px;
        font-weight: 500;
        flex: 1;
        text-align: center;
      }
      div {
        flex: 1;
        text-align: center;
      }
      .outbound_title,
      .outbound_empty_title {
        text-align: left;
        font-size: 14px;
        font-weight: 500;
      }
    }
    // 债务情况
    .debt_wrap {
      span,
      div {
        flex: 1;
        text-align: center;
      }
      .debt_title {
        text-align: right;
        font-size: 14px;
        font-weight: 500;
      }
    }
    // 历史记录
    .history_wrap {
      span:nth-of-type(4),
      div:nth-of-type(4) {
        flex: 2;
      }
    }
    // 共债信息
    .debt_information_title {
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #000;
      padding: 10px;
    }
    .debt_information_box {
      .debt_information_caseOrMoney {
        padding-left: 24px;
        line-height: 26px;
      }
    }
    .debt_information_box_empty {
      height: 0;
      overflow: hidden;
    }
    .debt_information_wrap_title,
    .interaction_title {
      width: 100px;
      font-weight: 500;
      color: #000;
    }
    .interaction_content,
    .debt_information_content {
      line-height: 24px;
    }
    .interaction_content_title,
    .debt_information_content_title {
      margin-right: 10px;
    }
  }
}
</style>
