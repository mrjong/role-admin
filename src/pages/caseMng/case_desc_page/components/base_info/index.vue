<template>
  <div>
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
        <!-- 客户档案 -->
        <Button
          @click="handOpen('Client_File')"
          class="vue-back-btn header-btn"
          style="vertical-align: top"
          size="small"
          type="primary"
          :disabled='!userId'
          ghost
        >客户档案</Button>
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
          v-if="readType!=='read' && APPLY_QR_CODE && case_detail_case_identity_info_Data.caseHandleStatus &&case_detail_case_identity_info_Data.caseHandleStatus != 'OUT'"
          @click="handOpen('gathering')"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          :disabled="btnDisable"
        >收款二维码</Button>
        <Button
          v-if="readType!=='read' && apply_arbitrament && case_detail_case_identity_info_Data.caseHandleStatus &&case_detail_case_identity_info_Data.caseHandleStatus != 'OUT'"
          @click.stop="handOpen('zhongcai')"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          :disabled="btnDisable"
        >申请仲裁</Button>
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
          v-if="readType!=='read' && collectCategory"
          @click.stop="nextCase(next_case_list)"
          :disabled="btnDisable||!next_case_list"
          size="small"
        >下一个</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          v-if="readType!=='read' && !collectCategory"
          @click.stop="nextCase(case_collect_case_list_data&&case_collect_case_list_data.downCaseNo)"
          :disabled="btnDisable||!case_collect_case_list_data||!case_collect_case_list_data.downCaseNo"
          size="small"
        >下一个</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          v-if="readType!=='read' && !collectCategory"
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
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.usrMarried"
            >
              <div class="panel-desc-title">
                婚姻状况：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.usrMarried}}</span>
              </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.haveChildren"
            >
              <div class="panel-desc-title">
                有无子女：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.haveChildren}}</span>
              </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.jobType"
            >
              <div class="panel-desc-title">
                工作类型：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.jobType}}</span>
              </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.incomeRange"
            >
              <div class="panel-desc-title">
                收入区间：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.incomeRange}}</span>
              </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.eduDegree"
            >
              <div class="panel-desc-title">
                学历：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.eduDegree}}</span>
              </div>
            </Col>
            <!-- <Col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="panel-desc-title">
                逾期应还金额：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.overdueAmt | money}}</span>
              </div>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="panel-desc-title">
                借款渠道：
                <span>{{case_detail_address_info_Data&&case_detail_address_info_Data.channelOneName}}</span>
              </div>
            </Col>-->
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.address"
            >
              <div class="panel-desc-title">
                家庭住址：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.address}}</span>
              </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.habitation"
            >
              <div class="panel-desc-title">
                居住住址：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.habitation}}</span>
              </div>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              v-if="case_detail_case_identity_info_Data.equipment"
            >
              <div class="panel-desc-title">
                手机型号：
                <span>{{case_detail_case_identity_info_Data&&case_detail_case_identity_info_Data.equipment}}</span>
              </div>
            </Col>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <div class="fl" v-for="(item,index) in img_list">
              <div class="demo-upload-list">
                <img
                  :src="item.imgPath? `/admin/img/mark/${item.imgPath}`: null"
                  style="vertical-align: top;"
                />
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
    <!-- 弹层 -->
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
    <!-- 客户档案 -->
    <clientfile :ishow="modal.Client_File" :userId='userId' @passBack='passBack' v-if="modal.Client_File"></clientfile>
    <!-- 新建收款二维码 -->
    <gathering
      v-model="modal.gathering"
      v-if="modal.gathering"
      v-on:passBack="passBackBreaks"
      :edit_flag="true"
      :breaks_data="breaks_data"
    ></gathering>
    <!-- 收款详情 -->
    <QRdetail
      v-model="modal.QR_code_detail"
      v-if="modal.QR_code_detail"
      v-on:passBack="passBackBreaks"
      :edit_flag="true"
      :breaks_data="breaks_data"
    ></QRdetail>
    <!-- 二维码下载页 -->
    <QRcode
      v-model="modal.QR_CODE"
      v-if="modal.QR_CODE"
      v-on:passBack="passBackBreaks"
      :breaks_data="breaks_data"
    ></QRcode>
    <!-- 减免 -->
    <jianmian
      v-model="modal.jianmian"
      v-if="modal.jianmian"
      v-on:passBack="passBackBreaks"
      :edit_flag="true"
      :breaks_data="breaks_data"
    ></jianmian>
    <!-- 仲裁 -->
    <zhongcai
      :getDirObj="getDirObj"
      v-on:passBack="passBack('zhongcai')"
      v-model="modal.zhongcai"
      v-if="modal.zhongcai"
      :zhongcai_data="zhongcai_set_data"
    ></zhongcai>
    <!-- 划扣 -->
    <huakou
      v-on:passBack="passBack('huakou')"
      v-model="modal.huakou"
      v-if="modal.huakou"
      :prdTyp="prdTyp"
      :caseNo="caseNo"
      :userId="userId"
    ></huakou>
  </div>
</template>

<script src='./index.js'></script>
