<template>
  <div>
    <Modal
      v-model="model.modal"
      width="800"
      class-name="user_info_form_modal"
      :mask-closable="false"
      @on-visible-change="del"
    >
      <p
        slot="header"
        style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;"
      >
        <span>用户信息</span>
      </p>
      <div style="text-align:center">
        <!-- 用户信息 -->
        <Card class="vue-panel panel_list" :dis-hover="true">
          <Form
            v-if="!showPanel"
            ref="formData"
            :model="formData"
            :label-width="90"
            :rules="ruleValidate"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="姓名:" prop="name">
                  <Input
                    size="small"
                    :clearable="model.type !== '1' ? true : false"
                    v-model="formData.name"
                    placeholder="请输入姓名"
                    :disabled="model.type === '1' ? true : false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="账号:" prop="loginName">
                  <Input
                    size="small"
                    :clearable="model.type !== '1' ? true : false"
                    v-model="formData.loginName"
                    placeholder="请输入账号"
                    :maxlength="10"
                    :disabled="model.type != '0' ? true : false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="账户状态:" span="4" prop="sts">
                  <Select
                    size="small"
                    v-model="formData.sts"
                    filterable
                    :clearable="model.type === '1' ? false : true"
                    placeholder="请选择账户状态"
                    :disabled="model.type === '1' ? true : false"
                  >
                    <Option
                      v-for="item in status"
                      :value="item.code"
                      :key="item.code"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="合作平台:" prop="platform">
                  <Input
                    size="small"
                    :clearable="model.type !== '1' ? true : false"
                    v-model="formData.platform"
                    placeholder="请输入合作平台名称"
                    :disabled="model.type === '1' ? true : false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="电话:" prop="mobile">
                  <Input
                    size="small"
                    :clearable="model.type !== '1' ? true : false"
                    v-model="formData.mobile"
                    placeholder="请输入电话号"
                    :disabled="model.type === '1' ? true : false"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="系统角色:" span="4" prop="roleIds">
                  <Select
                    size="small"
                    v-model="formData.roleIds"
                    multiple
                    :clearable="model.type !== '1' ? true : false"
                    placeholder="请选择系统角色"
                    :disabled="model.type === '1' ? true : false"
                  >
                    <Option
                      v-for="item in rolesData"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.roleName }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="渠道:" span="4" prop="channels">
                  <Select
                    size="small"
                    v-model="formData.channels"
                    multiple
                    :clearable="model.type !== '1' ? true : false"
                    placeholder="请选择渠道"
                    :disabled="model.type === '1' ? true : false"
                  >
                    <Option
                      v-for="item in channelsList"
                      :value="item.channelCode"
                      :key="item.channelCode"
                      >{{ item.channelName }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem
                  span="4"
                  label="修改人:"
                  prop="updateUser"
                  v-if="model.type !== '0'"
                >
                  <Input
                    size="small"
                    v-model="formData.updateUser"
                    placeholder="请输入修改人"
                    :disabled="true"
                  ></Input>
                </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
                v-if="model.type !== '0'"
              >
                <FormItem span="4" label="创建人:" prop="createUser">
                  <Input
                    size="small"
                    v-model="formData.createUser"
                    placeholder="请输入创建人"
                    :disabled="true"
                  ></Input>
                </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
                v-if="model.type !== '0'"
              >
                <FormItem
                  span="4"
                  label="修改时间:"
                  prop="updateTime"
                  class="text-left"
                >
                  <Input
                    size="small"
                    v-model="formData.updateTime"
                    disabled
                  ></Input>
                </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
                v-if="model.type !== '0'"
              >
                <FormItem
                  span="4"
                  label="创建时间:"
                  prop="createtime"
                  class="text-left"
                >
                  <Input
                    size="small"
                    v-model="formData.createTime"
                    disabled
                  ></Input>
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
          @click="handleSubmit('formData', model.type)"
          v-if="model.type !== '1'"
          :loading="button_loading"
        >
          <span v-if="!button_loading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import api from "@/service";
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
        callback(new Error("4到10位（字母，数字，下划线，减号）"));
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
      button_loading: false, //保存按钮loading
      rolesData: [],
      channelsList: [],
      formData: {},
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
            // validator: validateID,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: this.GLOBAL.mblNo,
            message: "请输入正确手机号",
            trigger: "blur",
            required: true
          }
        ],
        sts: [
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
        ],
        channels: [
          {
            required: true,
            message: "请选择渠道",
            trigger: "change",
            type: "array"
          }
        ]
      },

      status: [
        {
          name: "有效",
          code: "1"
        },
        {
          name: "无效",
          code: "0"
        }
      ]
    };
  },
  props: {
    model: {}
  },
  created() {
    if (this.model.type === "1" || this.model.type === "2") {
      const {
        id,
        name,
        loginName,
        sts,
        mbl,
        company,
        roleIds,
        channels,
        creator,
        updator,
        createTime,
        updateTime
      } = this.model.userData;
      //查看或修改用户
      this.formData = {
        id,
        name,
        loginName,
        sts,
        channels,
        mobile: mbl,
        platform: company,
        roleIds,
        createUser: creator,
        updateUser: updator
      };
      this.formData.createTime = createTime
        ? this.$options.filters["formatDate"](createTime, "YYYY-MM-DD HH:mm:ss")
        : createTime;
      this.formData.updateTime = updateTime
        ? this.$options.filters["formatDate"](updateTime, "YYYY-MM-DD HH:mm:ss")
        : updateTime;
      if (!this.formData.roleIds) {
        this.formData.roleIds = [];
      }
    }
    this.system_role_list();
    this.query_channels();
  },
  methods: {
    // 获取系统角色列表数据
    async system_role_list() {
      const res = await api.system_role_list({
        sts: "1",
        pageNum: 1,
        pageSize: 100
      });
      if (res.code === "0000") {
        this.rolesData = res.data.list;
      } else {
        this.$Message.error(res.msg);
      }
    },
    // 获取渠道列表数据
    async query_channels() {
      const res = await api.system_user_channels();
      if (res.code === "0000") {
        let arr = res.data || [];
        arr.unshift({
          channelId: "000",
          channelCode: "ALL",
          channelName: "任意渠道"
        });
        this.channelsList = arr;
      } else {
        this.$Message.error(res.msg);
      }
    },
    handleSubmit(name, type) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (type === "0") {
            //新增用户
            this.system_user_add();
          } else {
            //修改用户
            this.system_user_update();
          }
        }
      });
    },

    async system_user_update() {
      this.button_loading = true;
      const {
        id,
        name,
        sts,
        mobile,
        platform,
        roleIds,
        channels
      } = this.formData;

      const res = await api.system_user_update({
        id,
        name,
        sts,
        company: platform,
        mbl: mobile,
        roles: roleIds,
        channels
      });
      this.button_loading = false;
      if (res.code === "0000") {
        this.$Message.success("修改成功");
        this.$emit("passBack", { action: true });
      } else {
        this.$Message.error(res.msg);
      }
    },
    async system_user_add() {
      this.button_loading = true;
      const {
        name,
        loginName,
        sts,
        mobile,
        platform,
        roleIds,
        channels
      } = this.formData;
      const res = await api.system_user_add({
        name,
        loginName,
        sts,
        mbl: mobile,
        company: platform,
        roles: roleIds,
        channels
      });
      this.button_loading = false;
      if (res.code === "0000") {
        this.$Message.success("添加成功");
        this.$emit("passBack", { action: true });
      } else {
        this.$Message.error(res.msg);
      }
    },
    del(type) {
      this.$emit("passBack", { action: false });
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formData = {};
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
