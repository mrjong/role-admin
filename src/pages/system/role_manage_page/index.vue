<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p
        slot="title"
        @click="showPanel=!showPanel"
      >
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
        检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formValidate"
        :model="formValidate"
        :label-width="90"
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
              label="角色名称:"
            >
              <Input
                size="small"
                clearable
                v-model="formValidate.usrNm"
                placeholder="请输入角色名称"
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
              label="状态:"
            >
              <Select
                size="small"
                v-model="formValidate.Sts"
              >
                <Option
                  v-for="item in orderStsList"
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
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formValidate')"
                style="width:80px"
                long
                size="small"
              >检索</Button>
              <Button
                size="small"
                type="ghost"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formValidate')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p
        slot="title"
        @click="showPanel2=!showPanel2"
      >
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
        检索结果
      </p>
      <!-- 表格 -->

      <div v-if="!showPanel2">
        <Table
          border
          :data="tableData"
          :columns="tableColumns"
          stripe
          class="tableBox"
        ></Table>
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
    v-model="modalSee"
    title="基本信息"
    @on-ok="ok">
      <p slot="header">
        <Icon type="filing"></Icon>
        <span>角色信息</span>
      </p>
        <Card class="vue-panel">
          <p
            slot="title"
          >
            基本信息
          </p>
          <Form
            v-if="!showPanel"
            ref="formValidate"
            :model="formValidate"
            :label-width="90"
            :rules="ruleValidate"
          >
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  label="角色名称:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.caseNo"
                    placeholder="催收经理"
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="描述:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.billNo"
                    placeholder="催收经理"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  span="6"
                  prop="mblNo"
                  label="创建时间:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.opUserName"
                    placeholder="2018-1-09 7：09：12"
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="创建人:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.userNm"
                    placeholder="超级管理员"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  label="修改时间:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.caseNo"
                    placeholder="2018-09-08"
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="修改人:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.billNo"
                    placeholder="催收经理"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row class="eachRow">
              <Col
                span="12"
              >
                <FormItem
                  span="6"
                  prop="mblNo"
                  label="角色状态:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.opUserName"
                    placeholder="有效"
                  ></Input>
                </FormItem>
              </Col>
              <Col
                span="12"
              >
                <FormItem
                  label="角色类型:"
                >
                  <Input
                    size="small"
                    clearable
                    v-model="formValidate.userNm"
                    placeholder="超级管理员"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      <div slot="footer">
        <Button  size="small" long :loading="modal_loading" @click="closeModalSee">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="modalChange"
      title="基本信息"
      @on-ok="ok">
      <p slot="header">
        <Icon type="filing"></Icon>
        <span>角色信息</span>
      </p>
      <Card class="vue-panel">
        <p
          slot="title"
        >
          基本信息
        </p>
        <Form
          v-if="!showPanel"
          ref="formValidate"
          :model="formValidate"
          :label-width="90"
          :rules="ruleValidate"
        >
          <Row class="eachRow">
            <Col
              span="12"
            >
              <FormItem
                label="角色名称:"
                prop="changeRoleNm"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formValidate.caseNo"
                  placeholder="催收经理"
                ></Input>
              </FormItem>
            </Col>
            <Col
              span="12"
            >
              <FormItem
                label="账户状态:"
                prop="changeSts"
              >
                <Select
                  size="small"
                  v-model="formValidate.payOffSts"
                >
                  <Option
                    v-for="item in payOffStsList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row class="eachRow">
            <Col
              span="12"
            >
              <FormItem
                label="描述:"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formValidate.billNo"
                ></Input>
              </FormItem>
            </Col>
            <Col
              span="12"
            >
              <FormItem
                label="角色类型:"
                prop="changeRoleTyp"
              >
                <Select
                  size="small"
                  v-model="formValidate.payOffSts"
                >
                  <Option
                    v-for="item in payOffStsList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <div slot="footer">
        <Button  size="small" long :loading="modal_loading" @click="closeModalSee">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
  .tableBox {
    overflow-x: scroll ;
    overflow-y: hidden;
    .tableMainW {
      min-width: 400px;
    }
  }
  .eachRow{
    .ivu-form-item{
      margin-bottom: 0;
    }
  }
</style>
