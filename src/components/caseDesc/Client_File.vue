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
        <!-- 收入情况 -->
        <Col :md="12" :lg="12">
          <Card class="vue-panel case-desc income">
            <p slot="title">收入情况</p>
            <p class="income_wrap">
              <span class="income_title">职业：</span>
              <span class="income_content">销售</span>
            </p>
            <p class="income_wrap">
              <span class="income_title">工作单位：</span>
              <span class="income_content">随行付（北京）金融信息服务有限公司随行付（北京）金融信息服务有限公司</span>
            </p>
            <p class="income_wrap">
              <span class="income_title">户籍地址：</span>
              <span class="income_content">随行付（北京）金融信息服务有限公司随行付（北京）金融信息服务有限公司</span>
            </p>
            <p class="income_wrap">
              <span class="income_title">个人财产：</span>
              <span class="income_content">有房，有车</span>
            </p>
          </Card>
        </Col>
        <!-- 外呼情况 -->
        <Col :md="12" :lg="12">
          <Card class="vue-panel case-desc outbound">
            <p slot="title">外呼情况</p>
            <div class="outbound_wrap">
              <span class="outbound_empty_title"></span>
              <span>触达人数</span>
              <span>外呼次数</span>
              <span>接通率</span>
              <span>语音播报</span>
            </div>
            <div class="outbound_wrap">
              <div class="outbound_title">本人</div>
              <div class="outbound_content">1</div>
              <div class="outbound_content">22</div>
              <div class="outbound_content">33%</div>
              <div class="outbound_content">6</div>
            </div>
            <div class="outbound_wrap">
              <div class="outbound_title">紧急联系人</div>
              <div class="outbound_content">1</div>
              <div class="outbound_content">22</div>
              <div class="outbound_content">33%</div>
              <div class="outbound_content">6</div>
            </div>
            <div class="outbound_wrap">
              <div class="outbound_title">指定联系人</div>
              <div class="outbound_content">1</div>
              <div class="outbound_content">22</div>
              <div class="outbound_content">33%</div>
              <div class="outbound_content">6</div>
            </div>
          </Card>
        </Col>
        <!-- 债务情况 -->
        <Col :md="12" :lg="12">
          <Card class="vue-panel case-desc debt">
            <p slot="title">债务情况</p>
            <div class="debt_wrap">
              <span class="debt_empty_title"></span>
              <span>当前账单</span>
              <span>历史账单</span>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">逾期次数</div>
              <div class="debt_content">16</div>
              <div class="debt_content">25</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">最长还款天数</div>
              <div class="debt_content">16</div>
              <div class="debt_content">25</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">最长逾期天数</div>
              <div class="debt_content">16</div>
              <div class="debt_content">25</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">减免次数/金额</div>
              <div class="debt_content">16</div>
              <div class="debt_content">25</div>
            </div>
            <div class="debt_wrap">
              <div class="debt_title">优惠券次数/金额</div>
              <div class="debt_content">16</div>
              <div class="debt_content">25</div>
            </div>
          </Card>
        </Col>
        <!-- 历史沟通 -->
        <Col :md="12" :lg="12">
          <Card class="vue-panel case-desc history">
            <p slot="title">历史沟通</p>
            <div class="history_wrap">
              <span class="history_empty_title"></span>
              <span>沟通结果</span>
              <span>次数</span>
              <span>最近沟通时间</span>
              <span>沟通途径</span>
            </div>
            <div class="history_wrap">
              <div class="history_title">本人</div>
              <div class="history_content">承诺还款</div>
              <div class="history_content">25</div>
              <div class="history_content">2019-11-22 16:00</div>
              <div class="history_content">支付宝</div>
            </div>
            <div class="history_wrap">
              <div class="history_title">非本人</div>
              <div class="history_content">承诺还款</div>
              <div class="history_content">25</div>
              <div class="history_content">2019-11-22 16:00</div>
              <div class="history_content">支付宝</div>
            </div>
            <div class="history_wrap">
              <div class="history_title">非本人</div>
              <div class="history_content">承诺还款</div>
              <div class="history_content">25</div>
              <div class="history_content">2019-11-22 16:00</div>
              <div class="history_content">支付宝</div>
            </div>
          </Card>
        </Col>
        <!-- 交互信息 -->
        <Col :md="12" :lg="12">
          <Card class="vue-panel case-desc interaction">
            <p slot="title">交互信息</p>
            <p class="interaction_wrap">
              <div class="interaction_title">APP：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">累计登录</span>
                  <span class="interaction_content_cont">39次</span>
                </p>
                <p>
                  <span class="interaction_content_title">本次逾期后登录</span>
                  <span class="interaction_content_cont">8次</span>
                </p>
                <p>
                  <span class="interaction_content_title">最后登录时间</span>
                  <span class="interaction_content_cont">2019-11-22 18:00</span>
                </p>
              </div>
            </p>
            <p class="interaction_wrap">
              <div class="interaction_title">投诉：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">投诉次数</span>
                  <span class="interaction_content_cont">10次</span>
                </p>
              </div>
            </p>
            <p class="interaction_wrap">
              <div class="interaction_title">400：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">来电次数</span>
                  <span class="interaction_content_cont">10次</span>
                </p>
                <p>
                  <span class="interaction_content_title">最后来电时间</span>
                  <span class="interaction_content_cont">2019-11-22 18:00</span>
                </p>
              </div>
            </p>
            <p class="interaction_wrap">
              <div class="interaction_title">短信：</div>
              <div class="interaction_content">
                <p>
                  <span class="interaction_content_title">短信次数</span>
                  <span class="interaction_content_cont">10次</span>
                </p>
              </div>
            </p>
          </Card>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script src='./Client_File.js'></script>

<style lang="less">
.client_file {
  .ivu-modal-body {
    background: #f0f0f0;
    padding: 10px;
    .ivu-col {
      float: left;
    }
    span {
      display: inline-block;
    }
    .income, .outbound, .deby, .history {
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
    .income_title, .interaction_title {
      float: left;
      width: 90px;
      text-align: right;
      margin-right: 5px;
    }
    .income_content, .interaction_content {
      overflow: hidden;
    }
    // 外呼情况
    .outbound_wrap, .debt_wrap, .history_wrap {
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
      span, div {
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
      span:nth-of-type(4), div:nth-of-type(4) {
        flex: 2
      }
    }
  }
}
</style>
