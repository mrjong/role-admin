<template>
  <div>
    <Modal
      v-model="model.modal"
      width="800"
      class-name="add_role_form_modal"
      :mask-closable="false"
      @on-visible-change="del"
    >
      <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
        <span>配置信息</span>
      </p>
      <div style="text-align:center">
        <!-- 用户信息 -->
        <Card class="vue-panel" :dis-hover="true">
          <!-- <p slot="title" style="text-align: left">添加内容</p> -->
          <Form
            v-if="!showPanel"
            ref="formItem"
            :model="formItem"
            :label-width="90"
            :rules="ruleValidate"
            class="add_role_form"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="员工姓名:" prop="empno">
                  <Select
                    v-model="formItem.empno"
                    filterable
                    clearable
                    placeholder="请选择员工"
                    size="small"
                    @on-change='changeUser'
                  >
                    <Option
                      v-for="item in userList"
                      :value="item.loginName"
                      :key="item.loginName"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="登录账号:" prop="loginId">
                  <Input size="small" disabled v-model="formItem.loginId" placeholder="请输入登录账号"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="坐席类型:" span="4">
                  <Select
                    size="small"
                    v-model="formItem.seatType"
                    filterable
                    clearable
                    placeholder="请选择坐席类型"
                  >
                    <Option
                      v-for="item in getDirObj['SEAT_TYPE']"
                      :value="item.itemCode"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="坐席编号:">
                  <Input size="small" clearable v-model="formItem.callno" placeholder="请输入坐席编号"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div slot="footer">
        <Button type="ghost" size="small" @click="del('1')">关闭</Button>
        <Button type="primary" size="small" @click="call_employee_update('0')">提交</Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import tablePage from "@/mixin/tablePage";
import sysDictionary from "@/mixin/sysDictionary";
import { call_employee_update, call_employee_user } from "@/service/getData";
export default {
  props: { model: {} },
  model: {
    prop: "model",
    event: "childPassBack"
  },
  mixins: [sysDictionary, tablePage],
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
      getDirList: ["SEAT_TYPE"],
      getDirObj: {},
      showPanel: false,
      childrenData: {},
      childrenModel: false,
      userList: [],
      ruleValidate: {
        empno: [
          {
            required: true,
            message: "请选择员工",
            trigger: "change"
          }
        ],
        loginId: [
          {
            required: true,
            message: "请输入登陆账号",
            trigger: "blur"
          }
        ]
      },
      formItem: {
        callno: "",
        empno: "",
        loginId: "",
        status: "",
        seatType: "",
        id: ""
      }
    };
  },
  watch: {
    model: function() {
      // 监听父组件的变化
      this.childrenData = this.parentData2;
    }
  },
  created() {
    console.log(this.model);
    this.formItem = {
      id: this.model.data.id,
      callno: this.model.data.callno,
      loginId: this.model.data.loginId,
      status: this.model.data.status,
      seatType: this.model.data.seatType,
      empno: this.model.data.loginId,
    };
    this.call_employee_user();
  },
  methods: {
    // 添加坐席关系
    async call_employee_update() {
      const res = await call_employee_update(this.formItem);
      console.log(res);
      if (res.code==1) {
        this.del("0");
      } else {
        this.$Message.error("查询条件格式有误，请重新填写");
      }
    },
    // 查询关联人员
    async call_employee_user() {
      const res = await call_employee_user({userType: ''});
      if (res.code === 1) {
        this.userList = res.data;
      } else {
         this.$Message.error(res.message);
      }
    },
    // 关闭回调
    del(type) {
      if (type === "0") {
        this.childrenData = {
          modal: false,
          type: "ok"
        };
      } else if (type === "1") {
        this.childrenData = {
          modal: false,
          type: "close"
        };
      }
      this.$emit("childPassBack", this.childrenData);
    },
    // 配置人员的回调
    changeUser(value) {
      console.log(value);
      this.formItem.loginId = value;
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
.add_role_form_modal {
  .vue-panel {
    border: none;
  }
  .add_role_form {
    min-height: 200px;
  }
}
</style>
