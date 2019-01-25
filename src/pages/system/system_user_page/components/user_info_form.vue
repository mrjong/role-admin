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
        style="color:#333; font-size: 20px; font-weight: 600"
      >
        <span>用户信息</span>
      </p>
      <div style="text-align:center">
        <!-- 用户信息 -->
        <Card
          class="vue-panel panel_list"
          :dis-hover="true"
        >
          <!-- <p slot="title" style="text-align: left">用户信息</p> -->
          <Form
            v-if="!showPanel"
            ref="formItem"
            :model="formItem"
            :label-width="90"
            :rules="ruleValidate"
            disabled
          >
            <Row>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
              >
              <FormItem
                span="4"
                label="姓名:"
                prop="name"
                disabled
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.name"
                  placeholder="请输入姓名"
                  :disabled="model.type === '1'? true: false"
                ></Input>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
              >
              <FormItem
                span="4"
                label="账号:"
                prop="loginName"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.loginName"
                  placeholder="请输入账号"
                  :disabled="model.type === '1'? true: false"
                ></Input>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
              >
              <FormItem
                label="账户状态:"
                span="4"
                prop="state"
              >
                <Select
                  size="small"
                  v-model="formItem.state"
                  filterable
                  clearable
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

              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
              >
              <FormItem
                span="4"
                label="邮箱:"
                prop="email"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.email"
                  placeholder="请输入邮箱"
                  :disabled="model.type === '1'? true: false"
                ></Input>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="10"
                :lg="10"
                span="4"
              >
              <FormItem
                span="4"
                label="电话:"
                prop="mobile"
              >
                <Input
                  size="small"
                  clearable
                  v-model="formItem.mobile"
                  placeholder="请输入电话号"
                  :disabled="model.type === '1'? true: false"
                ></Input>
              </FormItem>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                span="4"
              >
              <FormItem
                label="系统角色:"
                span="4"
                prop="roleIds"
              >
                <Select
                  size="small"
                  v-model="formItem.roleIds"
                  filterable
                  multiple
                  clearable
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
            </Row>
          </Form>
        </Card>
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
          @click="handleSubmit('formItem')"
          v-if="model.type !== '1'"
        >保存</Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import { system_user_add, system_role_list, system_user_update } from "@/service/getData";
export default {
  model: {
    prop: "model",
    event: "passBack"
  },
  data() {
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
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: this.GLOBAL.email,
            message: '请输入正确邮箱号',
            trigger: 'blur'
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
            type: 'array'
          }
        ],


      },
      formItem: {
      },
    };
  },
  props: {
    model: {},
    getDirObj: {},
    parentData: {}

  },
  watch: {
    model: function () {
      // 监听父组件的变化
      this.childrenData = this.model;
    }
  },
  created() {
    console.log(this.model);
    this.system_role_list()

  },
  methods: {
    // 获取表格数据
    async system_role_list() {
      const res = await system_role_list({
        roleType: '01',
        status: '1'
      });
      if (res.code === 1) {
        this.rolesData = res.data.content
        setTimeout(() => {
          this.formItem = {
            ...this.parentData.userData,
            state: this.parentData.userData.roleStatus
          }

        }, 500)
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.parentData.type != '0') {
            this.system_user_update()
          } else {
            this.system_user_add()
          }
        }
      });
    },

    async system_user_update() {
      const res = await system_user_update({
        ...this.formItem,
        userType: '01'
      })
      if (res.code === 1) {
        this.$Message.success('修改成功');
        setTimeout(() => {
          this.del()
        })
      } else {
        this.$Message.error(res.message);
      }

    },
    async system_user_add() {
      const res = await system_user_add({
        ...this.formItem,
        userType: '01'
      })
      if (res.code === 1) {
        this.$Message.success('添加成功');
        setTimeout(() => {
          this.del()
        })
      } else {
        this.$Message.error(res.message);
      }

    },
    del() {
      this.childrenData = this.model;
      this.childrenData.modal = false;
      console.log(this.childrenData);
      this.$emit("passBack", this.childrenData);
      // this.$emit("getChildrenStatus", this.childrenData);
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

 <style lang="less">
.ivu-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.user_info_form_modal {
  .vue-panel {
    border: none;
  }
}
</style>
