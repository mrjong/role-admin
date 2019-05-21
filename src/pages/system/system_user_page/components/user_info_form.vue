<template>
  <div>
    <Modal
      v-model="model.modal"
      width="800"
      class-name="user_info_form_modal"
      :mask-closable="false"
      @on-visible-change="del"
    >
      <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
        <span>用户信息</span>
      </p>
      <div style="text-align:center">
        <!-- 用户信息 -->
        <Card class="vue-panel panel_list" :dis-hover="true">
          <!-- <p slot="title" style="text-align: left">用户信息</p> -->
          <Form
            v-if="!showPanel"
            ref="formItem"
            :model="formItem"
            :label-width="90"
            :rules="ruleValidate"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="姓名:" prop="name">
                  <Input
                    size="small"
                    :clearable="model.type !== '1'? true: false"
                    v-model="formItem.name"
                    placeholder="请输入姓名"
                    :disabled="model.type === '1'? true: false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="账号:" prop="loginName">
                  <Input
                    size="small"
                    :clearable="model.type !== '1'? true: false"
                    v-model="formItem.loginName"
                    placeholder="请输入账号"
                    :maxlength="10"
                    :disabled="model.type != '0'? true: false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="账户状态:" span="4" prop="state">
                  <Select
                    size="small"
                    v-model="formItem.state"
                    filterable
                    :clearable="model.type === '1'? false: true"
                    placeholder="请选择账户状态"
                    :disabled="model.type === '1'? true: false"
                  >
                    <Option
                      v-for="item in getDirObj['1_0_AVAILABLE_DISABLE']"
                      :value="item.itemCode"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>

              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="邮箱:" prop="email">
                  <Input
                    size="small"
                    :clearable="model.type !== '1'? true: false"
                    v-model="formItem.email"
                    placeholder="请输入邮箱"
                    :disabled="model.type === '1'? true: false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="电话:" prop="mobile">
                  <Input
                    size="small"
                    :clearable="model.type !== '1'? true: false"
                    v-model="formItem.mobile"
                    placeholder="请输入电话号"
                    :disabled="model.type === '1'? true: false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="系统角色:" span="4" prop="roleIds">
                  <Select
                    size="small"
                    v-model="formItem.roleIds"
                    multiple
                    :clearable="model.type !== '1'? true: false"
                    placeholder="请选择系统角色"
                    :disabled="model.type === '1'? true: false"
                  >
                    <Option
                      v-for="item in rolesData"
                      :value="item.id"
                      :key="item.id"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="model.type !== '0'">
                <FormItem span="4" label="创建人:" prop="createUser">
                  <Input
                    size="small"
                    v-model="formItem.createUser"
                    placeholder="请输入创建人"
                    :disabled="true"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if>
                <FormItem span="4" label="修改人:" prop="updateUser" v-if="model.type !== '0'">
                  <Input
                    size="small"
                    v-model="formItem.updateUser"
                    placeholder="请输入修改人"
                    :disabled="true"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="model.type !== '0'">
                <FormItem span="4" label="修改时间:" prop="updateTime" class="text-left">
                  <Input size="small" v-model="formItem.updateTime" disabled></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="model.type !== '0'">
                <FormItem span="4" label="创建时间:" prop="createtime" class="text-left">
                  <Input size="small" v-model="formItem.createTime" disabled></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div slot="footer">
        <Button size="small" @click="del">关闭</Button>
        <Button
          type="primary"
          size="small"
          @click="handleSubmit('formItem', model.type)"
          v-if="model.type !== '1'"
          :loading='button_loading'
        >
          <span v-if="!button_loading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import {
  system_user_add,
  system_role_list,
  system_user_update
} from "@/service/getData";
export default {
  model: {
    prop: "model",
    event: "passBack"
  },
  data() {
    const blank = /^\S*$/;
    const validateID = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else if (!blank.test(value)) {
        callback(new Error("不能包含有空格"));
      } else if (!this.GLOBAL.loginCount.test(value)) {
        callback(new Error('4到10位（字母，数字，下划线，减号）'))
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    return {
      showPanel: false,
      childrenData: {},
      childrenModel: false,
      button_loading: false,//保存按钮loading
      rolesData: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        loginName: [
          {
            required: true,
            validator: validateID,
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: this.GLOBAL.email,
            message: "请输入正确邮箱号",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: this.GLOBAL.mblNo,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "请选择用户状态",
            trigger: "change"
          }
        ],
        roleIds: [
          {
            required: true,
            message: "请选择系统角色",
            trigger: "change",
            type: "array"
          }
        ]
      },
      formItem: {
        roleIds: []
      }
    };
  },
  props: {
    model: {},
    getDirObj: {},
  },
  watch: {
    model: function() {
      // 监听父组件的变化
      this.childrenData = this.model;
    }
  },
  created() {
    console.log(this.model.userData);
    if (this.model.type === "1" || this.model.type === "2") {
      // this.formItem = this.model.userData;
      this.formItem = {
        name: this.model.userData.name,
        loginName: this.model.userData.loginName,
        state: this.model.userData.state,
        email: this.model.userData.email,
        mobile: this.model.userData.mobile,
        roleIds: this.model.userData.roleIds,
        createUser: this.model.userData.createUser,
        updateUser: this.model.userData.updateUser,
        createTime: this.model.userData.createTime,
        updateTime: this.model.userData.createTime,
        uuid: this.model.userData.uuid,
      }
      this.formItem.createTime = this.model.userData.createTime
          ? this.$options.filters["formatDate"](
              this.model.userData.createTime,
              "YYYY-MM-DD HH:mm:ss"
            )
          : this.model.userData.createTime;
      this.formItem.updateTime = this.model.userData.updateTime
          ? this.$options.filters["formatDate"](
              this.model.userData.updateTime,
              "YYYY-MM-DD HH:mm:ss"
            )
          : this.model.userData.updateTime;
      if (!this.formItem.roleIds) {
        this.formItem.roleIds = [];
      }
      this.formItem.state = String(this.formItem.state);
    }
    this.system_role_list();
  },
  methods: {
    // 系统角色回调
    roleSelect(arr) {
      console.log(arr);
      console.log(this.formItem.roleIds);
    },
    // 获取表格数据
    async system_role_list() {
      const res = await system_role_list({
        roleType: "01",
        status: "1",
        pageNo: 1,
        pageSize: 100000
      });
      if (res.code === 1) {
        this.rolesData = res.data.content;
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSubmit(name, type) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (type === "0") {
            this.system_user_add();
          } else {
            this.system_user_update();
          }
        }
      });
    },

    async system_user_update() {
      this.button_loading = true;
      const res = await system_user_update({
        ...this.formItem,
        userType: "01"
      });
      this.button_loading = false;
      if (res.code === 1) {
        this.$Message.success("修改成功");
        this.$emit('passBack', {action: true});
      } else {
        this.$Message.error(res.message);
      }
    },
    async system_user_add() {
      this.button_loading = true;
      const res = await system_user_add({
        ...this.formItem,
        userType: "01"
      });
      this.button_loading = false;
      if (res.code === 1) {
        this.$Message.success("添加成功");
        this.$emit('passBack', {action: true});
      } else {
        this.$Message.error(res.message);
      }
    },
    del(type) {
      this.$emit("passBack", {action: false});
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    }
  }
};
</script>

 <style lang="less" scoped>
.user_info_form_modal {
  .vue-panel {
    border: none;
  }
  .ivu-form {
    min-height: 250px;
  }
}
</style>
