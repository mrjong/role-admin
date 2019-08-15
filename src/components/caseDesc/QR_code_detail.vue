<template>
  <div>
    <Modal
      class="jianmian"
      width="1380"
      :value="model"
      @on-visible-change="del"
      title="二维码详情"
      class-name="jianmian_modal"
      :mask-closable="false"
    >
      <div class="alert-title">逾期信息</div>
      <div class="alert-desc">
        <div class="panel-desc">
          <Row :gutter="10">
            <Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <div class="panel-desc-title">
                  账单号：
                  <span>{{overdue_info.billNo}}</span>
                </div>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <div class="panel-desc-title">
                  客户姓名：
                  <span>{{overdue_info.userNameHid}}</span>
                </div>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <div class="panel-desc-title">
                  手机号：
                  <span>{{overdue_info.mblNoHid}}</span>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
      <Row :gutter="0">
        <!-- 减免信息 -->
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="alert-title">减免标记</div>
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
                  <Col :xs="24" :sm="24" :md="14" :lg="14" span="6" style="margin-bottom: 10px;">
                    <FormItem span="6" label="减免原因:" prop="reliefReason">
                      <Select
                        size="small"
                        placeholder="请选择减免原因"
                        clearable
                        v-model="formItem.reliefReason"
                        disabled
                      >
                        <Option
                          v-for="item in getDirObj.RELIEF_REASON"
                          :value="item.itemCode"
                          :key="item.itemCode"
                        >{{ item.itemName }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="14" :lg="14" :span="16">
                    <FormItem span="6" label="减免标记:">
                      <Input
                        type="textarea"
                        size="small"
                        clearable
                        :rows="2"
                        :maxlength="100"
                        v-model="formItem.reliefRemark"
                        placeholder="请输入100字以内的减免标记"
                        disabled
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="24" :lg="24" span="8">
                    <FormItem span="6" label="减免附件:">
                      <template>
                        <div class="demo-upload-list" v-for="item in uploadList">
                          <template v-if="item.url">
                            <img :src="'/admin/relief/relieford/images/'+item.url" />
                            <div class="demo-upload-list-cover">
                              <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            </div>
                          </template>
                          <template v-else>
                            暂无附件
                          </template>
                        </div>
                      </template>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
            <Table
              border
              :data="tableData"
              :columns="tableColumns"
              stripe
              width="620"
              style="margin: 10px auto"
            ></Table>
          </div>
        </Col>
        <!-- 还款信息 -->
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="alert-title">还款信息</div>
          <div class="alert-desc">
            <Table
              border
              :data="tableData_repayment"
              :columns="tableColumns_repayment"
              stripe
              class="repayment_table"
              style="margin: 10px auto"
            >
            </Table>
          </div>
        </Col>
      </Row>
      <div slot="footer" class="gathering_footer">
        <Button size="small" @click="del('ok')">查看二维码</Button>
        <Button
          type="primary"
          size="small"
          @click="offlineScanPay_invalid()"
          :loading="jianmian_loading"
        >
          <span v-if="!jianmian_loading">二维码失效</span>
          <span v-else>失效中...</span>
        </Button>
        <span style="font-size:14px; color: #333; line-height: 24px; margin-left: 10px;">还款总额：{{breaks_data.data.totRepayAmt?(breaks_data.data.totRepayAmt).toFixed(2): 0}} 元</span>
      </div>
    </Modal>
    <Modal title="查看图片" v-model="visible">
      <img :src="prefix+imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>

<script src="./QR_code_detail.js"></script>
<style lang="less">
@import "./index.less";
</style>
