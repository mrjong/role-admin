<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="95"
        :rules="ruleValidate"
      >
        <Row>
          <!-- <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:">
              <Input size="small" clearable v-model="formItem.userNm" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>
            <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="手机号:" prop="mblNo">
              <Input size="small" clearable v-model="formItem.mblNo" placeholder="请输入手机号"/>
            </FormItem>
          </Col>
           <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="身份证号:" prop="idNo">
              <Input size="small" clearable v-model="formItem.idNo" placeholder="请输入身份证号"/>
            </FormItem>
          </Col>-->
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品线:" prop="productTypes">
              <Select
                size="small"
                clearable
                multiple
                placeholder="请选择产品线"
                v-model="formItem.productTypes"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:" prop="userNm">
              <Input size="small" clearable v-model="formItem.caseNo" placeholder="请输入案件编号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:" prop="billNo">
              <Input size="small" clearable v-model="formItem.billNo" placeholder="请输入账单号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="申请人:" prop="opUserName">
              <Input size="small" clearable v-model="formItem.opUserName" placeholder="请输入申请人"/>
            </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <!-- applyTimeLt & applyTimeGt -->
            <FormItem label="申请日期:" prop="mblNo">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.applyTimeLt"
                format="yyyy-MM-dd"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择申请日期"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <!-- approvalTimeLt && approvalTimeBt -->
            <FormItem label="审核日期:" prop="mblNo">
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.approvalTimeLt"
                format="yyyy-MM-dd"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择审核日期"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="审核状态:" prop="approvalState">
              <Select size="small" clearable placeholder="请选择审核状态" v-model="formItem.approvalState">
                <Option
                  v-for="item in getDirObj.APPROVAL_STATE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:" prop="userName">
              <Input size="small" clearable v-model="formItem.userName" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
                :loading='query_loading'
              >
              <span v-if="!query_loading">检索</span>
              <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel2=!showPanel2">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>检索结果
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" border :columns="tableColumns" stripe></Table>
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
    </Card>
    <Modal
      class="jianmian"
      title="仲裁详情"
      width="90%"
      v-model="showModal1"
      @on-cancel="del"
      @on-ok="handleSubmit1"
    >
      <div class="alert-desc">
        <div class="panel-desc">
          <Form :label-width="120" class="panel_list">
            <Row :gutter="10">
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="订单号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.billNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="案件编号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.caseNo}}</span>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="身份证号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.idCardNoHid}}</span>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="客户姓名:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.userNameHid}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="性别:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.userGenderName}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="民族:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.userNation}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="提前到期日期:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.standAgreeDate}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16">
                <FormItem label="打款凭证流水号:" prop="defType">
                  <span class="desc-label">{{arb_detail_data&&arb_detail_data.voucherNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
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
                        :src="arb_detail_data&&prefix+arb_detail_data.idCardFront"
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
                        :src="arb_detail_data&&prefix+arb_detail_data.idCardOpposite"
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
                        :src="arb_detail_data&&prefix+arb_detail_data.voucherImg"
                        style="vertical-align: top;"
                      >
                      <div
                        class="demo-upload-list-cover"
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
                        :src="arb_detail_data&&prefix+arb_detail_data.standImg"
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
                </FormItem>
              </Col>
            </Row>
            <Row v-if="showModalType!=='edit'">
              <div class="alert-title">操作明细</div>
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
                      @on-page-size-change="changeSize_remark"
                      @on-change="changePage_remark"
                    ></Page>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        </div>
      </div>
      <div slot="footer" v-if="showModalType!=='edit'">
        <Button size="small" @click="del">关闭</Button>
      </div>
      <div slot="footer" v-if="showModalType==='edit'">
        <Button size="small" @click="arb_check('02')">通过</Button>
        <Button type="primary" size="small" @click="rejectFunc">驳回</Button>
      </div>
    </Modal>
    <Modal v-model="showModal2" width="800" title="提示" class-name="user_info_form_modal">
      <Form
        ref="recoverFormItem"
        :model="recoverFormItem"
        :label-width="120"
        :rules="ruleValidate2"
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
        <Button size="small" @click="del">取消</Button>
        <Button type="primary" size="small" @click="arb_checkTest">确定</Button>
      </div>
    </Modal>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    <zhongcai
      :getDirObj="getDirObj"
      v-on:passBack="passBack('zhongcai')"
      v-model="modal.zhongcai"
      v-if="modal.zhongcai"
      :zhongcai_data="zhongcai_set_data"
    ></zhongcai>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
.jianmian {
  .ivu-modal-body {
    padding: 0;
  }
  .alert-title {
    background-color: #f7f7f7;
    padding: 8px;
    font-size: 14px;
    border-radius: 3px;
  }
  .alert-desc {
    padding: 5px 0px;
  }
  .ivu-modal-close {
    top: 3px;
  }
}
</style>
