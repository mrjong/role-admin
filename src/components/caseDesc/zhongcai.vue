<template>
  <div>
    <Modal
      :title="arbitrateTitle"
      class="jianmian"
      width="600"
      @on-visible-change="del"
      :value="model"
      :mask-closable="false"
    >
      <div class="alert-desc">
        <div class="panel-desc">
          <Form
            ref="formItem"
            :model="formItem"
            :label-width="120"
            class="panel_list"
            :rules="ruleValidate"
          >
            <Row :gutter="10">
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="客户姓名:" prop="defType">
                  <span class="desc-label">{{zhongcai_data.userNmHid}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="身份证号:" prop="defType">
                  <span class="desc-label">{{zhongcai_data.idNoHid}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="订单号:" prop="defType">
                  <span class="desc-label">{{zhongcai_data.billNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="案件编号:" prop="defType">
                  <span class="desc-label">{{zhongcai_data.caseNo}}</span>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="性别:" prop="userGender">
                  <Select size="small" clearable placeholder="请选择性别" v-model="formItem.userGender">
                    <Option
                      v-for="item in getDirObj.GENDER"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem label="民族:" prop="userNation">
                  <Select size="small" placeholder="请选择民族" v-model="formItem.userNation">
                    <Option
                      v-for="item in getDirObj.NATION"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <FormItem label="提前到期日期:" prop="standAgreeDate">
                  <DatePicker
                    size="small"
                    :editable='false'
                    style="width:100%"
                    v-model="formItem.standAgreeDate"
                    format="yyyy-MM-dd"
                    type="date"
                    placement="bottom-start"
                    placeholder="请选择提前到期日期"
                  ></DatePicker>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <FormItem label="打款凭证流水号:" prop="voucherNo">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.voucherNo"
                    placeholder="请输入打款凭证流水号"
                  ></Input>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <FormItem class="mt5" label="身份证地址:" prop="idAddress">
                  <Input
                    type="text"
                    size="small"
                    clearable
                    v-model="formItem.idAddress"
                    placeholder="请输入身份证地址"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem span="6" class="mt15" label="身份证正面:" prop="idCardFront">
                  <template>
                    <div class="demo-upload-list" v-for="item in uploadList">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
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
                      v-show="uploadList.length ===0"
                      ref="upload"
                      :show-upload-list="false"
                      :default-file-list="defaultList"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :on-format-error="handleFormatError"
                      type="drag"
                      :on-exceeded-size="handleMaxSize"
                      :max-size="1024*9.9"
                      :data="{
                    imgType: 'idCardFront',
                    caseNo:zhongcai_data.caseNo
                    }"
                      :headers="headers"
                      action="/admin/arb/upload"
                      style="display: inline-block;width:58px;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon size="20" type="md-add"></Icon>
                      </div>
                    </Upload>
                  </template>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem span="6" class="mt15" label="身份证反面:" prop="idCardOpposite">
                  <template>
                    <div class="demo-upload-list" v-for="item in uploadList1">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon
                            type="ios-trash-outline"
                            @click.native="handleRemove1(item,'upload1')"
                          ></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload
                      v-show="uploadList1.length ===0 "
                      ref="upload1"
                      :max-size="1024*9.9"
                      :show-upload-list="false"
                      :default-file-list="defaultList1"
                      :on-success="handleSuccess1"
                      :format="['jpg','jpeg','png']"
                      :on-exceeded-size="handleMaxSize"
                      :on-format-error="handleFormatError"
                      type="drag"
                      :data="{
                    imgType: 'idCardOpposite',
                    caseNo:zhongcai_data.caseNo
                    }"
                      :headers="headers"
                      action="/admin/arb/upload"
                      style="display: inline-block;width:58px;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon size="20" type="md-add"></Icon>
                      </div>
                    </Upload>
                  </template>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem span="6" class="mt15" label="打款凭证:" prop="voucherImg">
                  <template>
                    <div class="demo-upload-list" v-for="item in uploadList2">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url?item.url:''">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon
                            type="ios-trash-outline"
                            @click.native="handleRemove2(item,'upload2')"
                          ></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload
                      v-show="uploadList2.length ===0 "
                      ref="upload2"
                      :on-exceeded-size="handleMaxSize"
                      :max-size="1024*9.9"
                      :show-upload-list="false"
                      :default-file-list="defaultList2"
                      :on-success="handleSuccess2"
                      :format="['jpg','jpeg','png']"
                      :on-format-error="handleFormatError"
                      type="drag"
                      :data="{
                    imgType: 'voucherImg',
                    caseNo:zhongcai_data.caseNo
                    }"
                      :headers="headers"
                      action="/admin/arb/upload"
                      style="display: inline-block;width:58px;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon size="20" type="md-add"></Icon>
                      </div>
                    </Upload>
                  </template>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="12" :lg="12">
                <FormItem span="6" class="mt15" label="提前到期通知:" prop="standImg">
                  <template>
                    <div class="demo-upload-list" v-for="item in uploadList3">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon
                            type="ios-trash-outline"
                            @click.native="handleRemove3(item,'upload3')"
                          ></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload
                      :on-exceeded-size="handleMaxSize"
                      v-show="uploadList3.length ===0 "
                      ref="upload3"
                      :show-upload-list="false"
                      :default-file-list="defaultList3"
                      :on-success="handleSuccess3"
                      :format="['jpg','jpeg','png']"
                      :max-size="1024*9.9"
                      :on-format-error="handleFormatError"
                      type="drag"
                      :data="{
                    imgType: 'standImg',
                    caseNo:zhongcai_data.caseNo
                    }"
                      :headers="headers"
                      action="/admin/arb/upload"
                      style="display: inline-block;width:58px;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon size="20" type="md-add"></Icon>
                      </div>
                    </Upload>
                  </template>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button size="small" @click="del">关闭</Button>
        <Button type="primary" size="small" @click="handleSubmit" :loading='zhongcai_loading'>
          <span v-if='!zhongcai_loading'>提交</span>
          <span v-else>提交中...</span>
        </Button>
      </div>
    </Modal>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script src="./zhongcai.js"></script>

<style lang="less">
@import "./index.less";
</style>
