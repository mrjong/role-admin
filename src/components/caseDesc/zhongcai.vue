<template>
  <div>
    <Modal
      title="申请仲裁"
      class="jianmian"
      width="90%"
      @on-visible-change="del"
      v-model="model"
      @on-ok="handleSubmit"
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
              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="订单号:"
                prop="defType"
              >
                <span class="desc-label">{{zhongcai_data.billNo}}</span>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="案件编号:"
                prop="defType"
              >
                <span class="desc-label">{{zhongcai_data.caseNo}}</span>
              </FormItem>
              </Col>

              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="身份证号:"
                prop="defType"
              >
                <span class="desc-label">{{zhongcai_data.idNoHid}}</span>
              </FormItem>
              </Col>

              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="客户姓名:"
                prop="defType"
              >
                <span class="desc-label">{{zhongcai_data.userNmHid}}</span>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="性别:"
                prop="userGender"
              >
                <Select
                  size="small"
                  clearable
                  placeholder="请选择性别"
                  v-model="formItem.userGender"
                >
                  <Option
                    v-for="item in getDirObj.GENDER"
                    :value="item.itemCode"
                    :key="item.itemName"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
              </Col>

              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="民族:"
                prop="userNation"
              >
                <Select
                  size="small"
                  placeholder="请选择民族"
                  v-model="formItem.userNation"
                >
                  <Option
                    v-for="item in getDirObj.NATION"
                    :value="item.itemCode"
                    :key="item.itemName"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="8"
                :lg="8"
              >
              <FormItem
                label="提前到期日期:"
                prop="standAgreeDate"
              >
                <DatePicker
                  size="small"
                  style="width:100%"
                  v-model="formItem.standAgreeDate"
                  format="yyyy-MM-dd"
                  type="date"
                  placement="bottom-start"
                  placeholder="请选择提前到期日期"
                ></DatePicker>
              </FormItem>
              </Col>

              <Col
                :xs="24"
                :sm="24"
                :md="16"
                :lg="16"
              >
              <FormItem
                label="打款凭证流水号:"
                prop="voucherNo"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.voucherNo"
                  placeholder="请输入打款凭证流水号"
                ></Input>
              </FormItem>
              </Col>

              <Col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
              >
              <FormItem
              class="mt5"
                label="身份证地址:"
                prop="idAddress"
              >
                <Input
                  type="textarea"
                  size="small"
                  clearable
                  v-model="formItem.idAddress"
                  placeholder="请输入身份证地址"
                ></Input>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
              >
              <FormItem
                span="6"
                 class="mt15"
                label="身份证正面:"
                prop="idCardFront"
              >
                <template>
                  <div
                    class="demo-upload-list"
                    v-for="item in uploadList"
                  >
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item,'upload')"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    v-if="uploadList.length ===0 "
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError"
                    type="drag"
                    :data="{
                    imgType: 'idCardFront',
                    caseNo:zhongcai_data.caseNo
                    }"
                    :headers="headers"
                    action="/admin/arb/upload"
                    style="display: inline-block;width:58px;"
                  >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon
                        size="20"
                        type="plus"
                      ></Icon>
                    </div>
                  </Upload>
                </template>
              </FormItem>
              </Col>

               <Col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
              >
              <FormItem
                span="6"
                 class="mt15"
                label="身份证反面:"
                prop="idCardOpposite"
              >
                <template>
                  <div
                    class="demo-upload-list"
                    v-for="item in uploadList1"
                  >
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item,'upload1')"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    v-if="uploadList1.length ===0 "
                    ref="upload1"
                    :show-upload-list="false"
                    :default-file-list="defaultList1"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
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
                      <Icon
                        size="20"
                        type="plus"
                      ></Icon>
                    </div>
                  </Upload>
                </template>
              </FormItem>
              </Col>

               <Col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
              >
              <FormItem
                span="6"
                 class="mt15"
                label="打款凭证:"
                prop="voucherImg"
              >
                <template>
                  <div
                    class="demo-upload-list"
                    v-for="item in uploadList2"
                  >
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item,'upload2')"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    v-if="uploadList2.length ===0 "
                    ref="upload2"
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
                      <Icon
                        size="20"
                        type="plus"
                      ></Icon>
                    </div>
                  </Upload>
                </template>
              </FormItem>
              </Col>

               <Col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
              >
              <FormItem
                span="6"
                 class="mt15"
                label="提前到期通知:"
                prop="standImg"
              >
                <template>
                  <div
                    class="demo-upload-list"
                    v-for="item in uploadList3"
                  >
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item,'upload3')"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    v-if="uploadList3.length ===0 "
                    ref="upload3"
                    :show-upload-list="false"
                    :default-file-list="defaultList3"
                    :on-success="handleSuccess3"
                    :format="['jpg','jpeg','png']"
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
                      <Icon
                        size="20"
                        type="plus"
                      ></Icon>
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

<script src="./zhongcai.js"></script>

<style lang="less">
@import "./index.less";
</style>
