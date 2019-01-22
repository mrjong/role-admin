<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title">催收公司
        <Button
          class="fr header-btn"
          type="primary"
          @click="setPassWordStatus('formItem')"
          style="width:64px"
          long
          size="small"
        >密码重置</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="setStatus('formItem')"
          style="width:64px"
          long
          size="small"
        >状态变更</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="setFormStatus('1')"
          style="width:64px"
          long
          size="small"
        >修改</Button>
      </p>
      <Form ref="staffFormItem" :model="staffFormItem" :label-width="90" :rules="ruleValidate">
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="账号:" prop="loginName">
            <Input
              size="small"
              clearable
              v-model="staffFormItem.loginName"
              placeholder="请输入公司名称"
              disabled
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="用户名称:" prop="name">
            <Input
              size="small"
              clearable
              v-model="staffFormItem.name"
              placeholder="请输入用户名称"
              :disabled="!formDisabled"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="角色:" span="4" prop="roleName">
            <Select
              size="small"
              v-model="staffFormItem.roleName"
              filterable
              clearable
              placeholder="请选择公司"
              :disabled="!formDisabled"
            >
              <Option
                v-for="item in phoneCallList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="公司:" span="4" prop="companyName">
            <Select
              size="small"
              v-model="staffFormItem.companyName"
              filterable
              clearable
              placeholder="请选择公司"
              :disabled="!formDisabled"
            >
              <Option
                v-for="item in phoneCallList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-show="formDisabled">
          <FormItem label="部门:" span="4" prop="departName">
            <Select
              size="small"
              v-model="staffFormItem.departName"
              filterable
              clearable
              placeholder="请选择上级机构"
              :disabled="!formDisabled"
            >
              <Option
                v-for="item in phoneCallList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="坐席名称:">
            <Input size="small" v-model="staffFormItem.seatType" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="坐席号:">
            <Input size="small" v-model="staffFormItem.callno" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="手机号:">
            <Input size="small" v-model="staffFormItem.mobile" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="邮箱:">
            <Input size="small" v-model="staffFormItem.email" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建人:">
            <Input size="small" v-model="staffFormItem.createUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建时间:">
            <Input size="small" v-model="staffFormItem.createTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改人:">
            <Input size="small" v-model="staffFormItem.updateUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改时间:">
            <Input size="small" v-model="staffFormItem.updateTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="staffFormItem.remark"
              :disabled="!formDisabled"
              placeholder="请输入100字以内"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="6" v-if="formDisabled">
          <FormItem>
            <Button
              size="small"
              type="ghost"
              style="width:80px;margin-right: 8px"
              @click="cancelStatus()"
            >取消</Button>
            <Button
              type="primary"
              @click="handleSubmit('staffFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>
    </Card>
    <!-- 状态重置modal框 -->
    <div v-if="modal">
      <Modal
        v-model="modal"
        @on-ok="ok"
        @on-cancel="cancel"
        width="500"
        :transfer="false"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>状态变更</span>
        </p>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="4">
          <label for="acount">账号：</label>
          <Input
            size="small"
            v-model="staffFormItem.loginName"
            disabled
            id="acount"
            style="width: auto"
          ></Input>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" style="margin-left: 20px;">
          <label for="radio">状态：</label>
          <RadioGroup v-model="status" id="radio" span="4">
            <Radio label="0">正常</Radio>
            <Radio label="1">冻结</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button type="ghost" size="small" @click="ok">取消</Button>
          <Button type="primary" size="small" @click="cancel">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 密码重置modal框 -->
    <div v-if="modal2">
      <Modal
        v-model="modal2"
        @on-ok="ok2"
        @on-cancel="cancel2"
        width="500"
        :transfer="false"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>密码重置</span>
        </p>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="4">
          <label for="acount">账号：</label>
          <Input
            size="small"
            v-model="staffFormItem.loginName"
            disabled
            id="acount"
            style="width: auto"
          ></Input>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="4">
          <p>重置后该账户登录密码将更改为初始密码，是否确认重置密码?</p>
        </Col>
        <div slot="footer">
          <Button type="ghost" size="small" @click="ok2">取消</Button>
          <Button type="primary" size="small" @click="cancel2">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formDisabled: false,
      modal: false,
      modal2: false,
      status: "0",
      staffFormItem: {
        name: "",
        loginName: "",
        companyName: "",
        departName: "",
        roleName: "",
        seatType: "",
        mobile: "",
        callno: "",
        email: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        remark: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }
        ],
        roleName: [
          {
            required: true,
            message: "请选择角色类型",
            trigger: "change"
          }
        ],
        companyName: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        departName: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ]
      },
      phoneCallList: [
        {
          value: "1",
          label: "测试1"
        },
        {
          value: "2",
          label: "测试2"
        },
        {
          value: "3",
          label: "测试3"
        }
      ]
    };
  },
  methods: {
    // 设置表单编辑状态
    setFormStatus(type) {
      this.formDisabled = true;
    },
    // 设置状态变更
    setStatus() {
      this.modal = true;
    },
    // 密码重置modal
    setPassWordStatus () {
      this.modal2 = true;
    },
    // 恢复表单的不可用状态
    cancelStatus() {
      this.formDisabled = false;
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          this.$Message.success("ok");
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.modal = false;
    },
    cancel() {
      this.modal = false;
    },
    ok2() {
      // this.$Message.info('Clicked ok');
      this.modal2 = false;
    },
    cancel2() {
      this.modal2 = false;
    }
  }
};
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
