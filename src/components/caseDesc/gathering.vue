<template>
  <div>
    <Modal
      class="jianmian"
      width="1380"
      :value="model"
      @on-visible-change="del"
      title="二维码生成"
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
                        :clearable="edit_flag"
                        v-model="formItem.reliefReason"
                        :disabled="!edit_flag"
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
                        :clearable="edit_flag"
                        :rows="2"
                        :maxlength="100"
                        v-model="formItem.reliefRemark"
                        placeholder="请输入100字以内的减免标记"
                        :disabled="!edit_flag"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="24" :lg="24" span="8" v-if="edit_flag">
                    <FormItem span="6" label="减免附件:">
                      <template>
                        <div class="demo-upload-list" v-for="item in uploadList">
                          <template v-if="item.status === 'finished'">
                            <img :src="item.url" />
                            <div class="demo-upload-list-cover" v-if="edit_flag">
                              <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                              <Icon
                                type="ios-trash-outline"
                                @click.native="handleRemove(item,'upload')"
                              ></Icon>
                            </div>
                          </template>
                          <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                          </template>
                        </div>
                        <Upload
                          ref="upload"
                          :show-upload-list="false"
                          :default-file-list="defaultList"
                          :on-success="handleSuccess"
                          :format="['jpg','jpeg','png']"
                          :max-size="5120"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :before-upload="handleBeforeUpload"
                          :disabled="!edit_flag"
                          type="drag"
                          :data="{caseNo:breaks_data.caseNo}"
                          :headers="headers"
                          v-show="uploadList.length === 0"
                          action="/admin/relief/relieford/upload"
                          style="display: inline-block;width:58px;"
                        >
                          <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon size="28" type="md-add" />
                          </div>
                        </Upload>
                      </template>
                    </FormItem>
                  </Col>

                  <Col :xs="24" :sm="24" :md="24" :lg="24" span="24" style="margin-bottom: 5px;">
                    <div class="alert-title" style="margin: 0 -10px">减免信息</div>
                  </Col>
                  <Col :xs="24" :sm="24" :md="7" :lg="7" span="7">
                    <FormItem label="减免类型:" prop="reliefType">
                      <Select
                        size="small"
                        placeholder="请选择减免类型"
                        v-model="formItem.reliefType"
                        :disabled="!edit_flag"
                        clearable
                        transfer
                        label-in-value
                        @on-change="reliefTypeSelectChange"
                      >
                        <Option
                          v-for="item in getDirObj.RELIEF_TYPE"
                          :value="item.itemCode"
                          :key="item.itemCode"
                        >{{ item.itemName }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="7" :lg="7" span="7" v-if="edit_flag">
                    <FormItem label="减免期数:" prop="perdNum">
                      <Select
                        size="small"
                        placeholder="请选择减免期数"
                        v-model="formItem.perdNum"
                        clearable
                        :disabled="!edit_flag"
                        label-in-value
                        transfer
                        @on-change="perdNumSelectChange"
                      >
                        <Option
                          v-for="item in relief_counts"
                          :value="item.itemCode"
                          :key="item.itemCode"
                        >{{ item.itemName }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="7" :lg="7" span="7" v-if="!edit_flag">
                    <FormItem label="减免期数:">
                      <Input
                        size="small"
                        type="number"
                        number
                        disabled
                        v-model="formItem.perdNum"
                        placeholder="请输入减免期数"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="7" :lg="7" span="5">
                    <FormItem span="6" label="减免金额:" prop="reliefAmt">
                      <Input
                        size="small"
                        clearable
                        type="number"
                        number
                        @on-blur="reliefAmt_blur(formItem.reliefAmt)"
                        v-model="formItem.reliefAmt"
                        placeholder="请输入金额"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="2" :lg="2" span="2" class="add_col">
                    <Button
                      class="fr vue-back-btn header-btn"
                      type="success"
                      size="small"
                      @click="handelAdd"
                      v-if="edit_flag"
                    >添加</Button>
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
              v-if="edit_flag"
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
              v-if="edit_flag"
            >
              <template slot-scope="{ row, column, index }" slot="repayAmt">
                <div v-if="row.reliefAmt == 0">
                  <Input
                    size="small"
                    clearable
                    type="number"
                    number
                    @on-blur="repayAmt_blur(row, index, $event)"
                    v-model="row.repayAmt"
                    placeholder="还款金额"
                    :class="{'ivu-form-item-error': row.error_flag}"
                  ></Input>
                  <div v-if="row.error_flag" class="error-tip">{{error_text}}</div>
                </div>
                <div v-else>{{Number(row.repayAmt).toFixed(2)}}</div>
              </template>
            </Table>
          </div>
        </Col>
      </Row>
      <div slot="footer" class="gathering_footer">
        <Button size="small" @click="del">关闭</Button>
        <Button
          type="primary"
          size="small"
          @click="handleSubmit('formItem')"
          :loading="jianmian_loading"
        >
          <span v-if="!jianmian_loading">生成</span>
          <span v-else>生成中...</span>
        </Button>
        <span style="font-size:14px; color: #333; line-height: 24px; margin-left: 10px;">还款总额：{{(totRepayAmt).toFixed(2)}}</span>
      </div>
    </Modal>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>

<script src="./gathering.js"></script>
<style lang="less">
@import "./index.less";
</style>
