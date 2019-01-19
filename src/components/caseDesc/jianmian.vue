<template>
  <div>
    <div class="alert-title">逾期信息</div>
    <div class="alert-desc">
      <div class="panel-desc">
        <Row :gutter="10">
          <Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <div class="panel-desc-title">
            身份证号：<span>360732199105251538</span>
          </div>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <div class="panel-desc-title">
            逾期应还金额：<span>675.00</span>
          </div>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <div class="panel-desc-title">
            总逾期期数：<span>2018-09-10 15:25:16</span>
          </div>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <div class="panel-desc-title">
            家庭住址：<span>甘肃省兰州市兰州市城关区南昌路1852号703室</span>
          </div>
          </Col>
          </Col>
          <Col>

          </Col>

        </Row>
      </div>
    </div>
    <div class="alert-title">减免信息</div>
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
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              span="6"
              label="还款期数:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入还款期数"
              ></Input>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              span="6"
              label="还款金额:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入还款金额"
              ></Input>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              label="还款时间:"
              prop="addtime"
            >
              <DatePicker
                size="small"
                style="width:100%"
                v-model="formItem.addtime"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择还款时间"
              ></DatePicker>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              label="还款方式:"
              prop="buffet_id"
            >
              <Select
                size="small"
                placeholder="请选择还款方式"
                v-model="formItem.productTime"
              >
                <Option
                  v-for="item in productTimeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              span="6"
              label="识别码/后四位:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="无法识别请输入0000"
              ></Input>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              span="6"
              label="还款人姓名:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入还款人姓名"
              ></Input>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              span="6"
              label="还款人手机号:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入还款人手机号"
              ></Input>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              label="还款银行:"
              prop="buffet_id"
            >
              <Select
                size="small"
                placeholder="请选择还款银行"
                v-model="formItem.productTime"
              >
                <Option
                  v-for="item in productTimeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              span="6"
            >
            <FormItem
              span="6"
              label="还款卡号:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入还款卡号"
              ></Input>
            </FormItem>
            </Col>
            <Col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              span="12"
            >
            <FormItem
              span="6"
              label="线下还款标记:"
              prop="buffet_id"
            >
              <Input
                type="textarea"
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入线下还款标记"
              ></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
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
                      <!-- <Icon
                        type="ios-eye-outline"
                        @click.native="handleView(item.name)"
                      ></Icon> -->
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
                    <Icon size="20" type="plus"></Icon>
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
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script src="./jianmian.js"></script>

<style lang="less">
@import "./index.less";
</style>
