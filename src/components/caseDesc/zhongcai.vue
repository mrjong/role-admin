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
            :label-width="100"
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
                label="身份证号:"
                prop="defType"
              >
                <span class="desc-label">360732199105251538</span>
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
                <span class="desc-label">360732199105251538</span>
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
                <span class="desc-label">360732199105251538</span>
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
                <span class="desc-label">360732199105251538</span>
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
                prop="defType"
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
                prop="defType"
              >
                <Select
                  size="small"
                  placeholder="请选择民族"
                  v-model="formItem.defType"
                >
                  <Option
                    v-for="item in defTypeList"
                    :value="item.itemCode"
                    :key="item.itemCode"
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
                prop="defType"
              >
                <DatePicker
                  size="small"
                  style="width:100%"
                  v-model="formItem.addtime"
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
                prop="defType"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.repayAmount"
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
                label="身份证地址:"
                prop="defType"
              >
                <Input
                  type="textarea"
                  size="small"
                  clearable
                  v-model="formItem.repayAmount"
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
                label="还款凭证:"
                prop="buffet_id"
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
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item)"
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
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:58px;"
                  >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon
                        size="20"
                        type="plus"
                      ></Icon>
                    </div>
                  </Upload>
                  <Modal
                    title="View Image"
                    v-model="visible"
                  >
                    <img
                      :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                      v-if="visible"
                      style="width: 100%"
                    >
                  </Modal>
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
