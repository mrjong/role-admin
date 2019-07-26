<template>
  <div>
    <!-- 仲裁详情的modal -->
    <Modal
      class="arbitrament_detail"
      title="仲裁详情"
      width="670"
      v-model="model"
      @on-visible-change="del"
    >
      <div class="alert-desc">
        <div class="panel-desc">
          <Form :label-width="120" class="panel_list">
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="客户姓名:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.userNameHid}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="性别:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.userGenderName}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="民族:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.userNation}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="身份证号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.idCardNoHid}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="订单号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.billNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="案件编号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.caseNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="提前到期日期:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.standAgreeDate}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="打款凭证流水号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.voucherNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="身份证地址:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.idAddress}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <FormItem label="图片信息:" prop="defType">
                  <div class="fl">
                    <div
                      class="demo-upload-list"
                      style="width:100px;height:100px;line-height: 100px;"
                    >
                      <img
                        :src="arb_detail_data.idCardFront?prefix+arb_detail_data.idCardFront:''"
                        style="vertical-align: top;"
                      >
                      <div
                        class="demo-upload-list-cover"
                        @click="handleView(prefix+arb_detail_data.idCardFront)"
                      >
                        <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                      </div>
                    </div>
                    <div class="text-center card-text">身份证正面</div>
                  </div>

                  <div class="fl">
                    <div
                      class="demo-upload-list"
                      style="width:100px;height:100px;line-height: 100px;"
                    >
                      <img
                        :src="arb_detail_data.idCardOpposite?prefix+arb_detail_data.idCardOpposite: ''"
                        style="vertical-align: top;"
                      >
                      <div
                        class="demo-upload-list-cover"
                        @click="handleView(arb_detail_data&&prefix+arb_detail_data.idCardOpposite)"
                      >
                        <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                      </div>
                    </div>
                    <div class="text-center card-text">身份证反面</div>
                  </div>

                  <div class="fl">
                    <div
                      class="demo-upload-list"
                      style="width:100px;height:100px;line-height: 100px;"
                    >
                      <img
                        :src="arb_detail_data.pdfImg?arb_detail_data.pdfImg: arb_detail_data.voucherImg?prefix+arb_detail_data.voucherImg: ''"
                        style="vertical-align: top;"
                      >
                      <div
                        class="demo-upload-list-cover"
                        v-if="arb_detail_data.pdfImg"
                        @click="handleView(arb_detail_data&&arb_detail_data.pdfImg)"
                      >
                        <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                      </div>
                      <div
                        class="demo-upload-list-cover"
                        v-else
                        @click="handleView(arb_detail_data&&prefix+arb_detail_data.voucherImg)"
                      >
                        <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                      </div>

                    </div>
                    <div class="text-center card-text">打款凭证</div>
                  </div>

                  <div class="fl">
                    <div
                      class="demo-upload-list"
                      style="width:100px;height:100px;line-height: 100px;"
                    >
                      <img
                        :src="arb_detail_data.standImg?prefix+arb_detail_data.standImg:''"
                        style="vertical-align: top;"
                      >
                      <div
                        class="demo-upload-list-cover"
                        @click="handleView(arb_detail_data&&prefix+arb_detail_data.standImg)"
                      >
                        <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                      </div>
                    </div>
                    <div class="text-center card-text">提前到期通知</div>
                  </div>
                  <div class="fl">
                    <div
                      class="demo-upload-list"
                      style="width:100px;height:100px;line-height: 100px;"
                    >
                      <img
                        :src="arb_detail_data.creditorImg?prefix+arb_detail_data.creditorImg:''"
                        style="vertical-align: top;"
                      >
                      <div
                        class="demo-upload-list-cover"
                        @click="handleView(arb_detail_data&&prefix+arb_detail_data.creditorImg)"
                      >
                        <i class="ivu-icon ivu-icon-ios-eye-outline"></i>
                      </div>
                    </div>
                    <div class="text-center card-text">债权转让通知</div>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row v-if="show_table">
              <div class="alert-title">回款信息</div>
              <Table
                border
                :data="returned_money_list_tableData"
                :columns="returned_money_list_tableColumns"
                width="590"
                style="margin: 0 auto"
                no-data-text='申请仲裁后暂无回款'
                stripe
              ></Table>
              <div class="alert-title">操作明细</div>
              <div>
                <Table
                  border
                  :data="case_detail_remark_list_tableData"
                  :columns="case_detail_remark_list_tableColumns"
                  width="590"
                  style="margin: 0 auto"
                  stripe
                ></Table>
                <!-- 分页
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
                      @on-page-size-change="changeSize_remark"
                      @on-change="changePage_remark"
                    ></Page>
                  </div>
                </div>-->
              </div>
            </Row>
          </Form>
        </div>
      </div>
      <div slot="footer" v-if="showModalType!=='edit'">
        <Button size="small" @click="del">关闭</Button>
      </div>
      <div slot="footer" v-if="showModalType==='edit'">
        <Button size="small" @click="arb_check('02')" :loading="audit_loading">
          <span v-if="!audit_loading">通过</span>
          <span v-else>审核中...</span>
        </Button>
        <Button type="primary" size="small" @click="rejectFunc">驳回</Button>
      </div>
    </Modal>
    <!-- 驳回modal -->
    <Modal v-model="reject_modal" width="800" title="提示" class-name="user_info_form_modal">
      <Form
        ref="recoverFormItem"
        :model="recoverFormItem"
        :label-width="120"
        :rules="reject_ruleValidate"
      >
        <FormItem span="4" label="驳回原因:" prop="approvalRemark">
          <Input
            type="textarea"
            size="small"
            :maxlength="30"
            v-model="recoverFormItem.approvalRemark"
            placeholder="请输入30字以内"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="small" @click="reject_modal = false">取消</Button>
        <Button type="primary" size="small" @click="arb_checkTest" :loading="reject_loading">
          <span v-if="!reject_loading">确定</span>
          <span v-else>驳回中...</span>
        </Button>
      </div>
    </Modal>
    <!-- 查看图片的modal -->
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
.arbitrament_detail {
  .ivu-table-overflowX, .ivu-table-tip {
    overflow: hidden;
  }
}
</style>

