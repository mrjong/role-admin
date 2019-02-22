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
        <span>添加内容</span>
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
                <FormItem label="坐席类型:" span="4" prop="seatType">
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
                <FormItem span="4" label="坐席编号:" prop="callno">
                  <Input size="small" clearable v-model="formItem.callno" placeholder="请输入坐席编号"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="登陆账号:" prop="loginId">
                  <Input size="small" clearable v-model="formItem.loginId" placeholder="请输入登陆账号"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="员工编号:" prop="empno">
                  <Input size="small" clearable v-model="formItem.empno" placeholder="请输入员工编号"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="接听方式:" span="4" prop="extenType">
                  <Select
                    size="small"
                    v-model="formItem.extenType"
                    filterable
                    clearable
                    placeholder="请选择接听方式"
                  >
                    <Option
                      v-for="item in getDirObj['EXTEN_TYPE']"
                      :value="item.itemCode"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="状态:" span="4" prop="status">
                  <Select
                    size="small"
                    v-model="formItem.status"
                    filterable
                    clearable
                    placeholder="请选择状态"
                  >
                    <Option
                      v-for="item in getDirObj['0_1_EFFECT_INVAL']"
                      :value="item.itemCode"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div slot="footer">
        <Button   size="small" @click="del">关闭</Button>
        <Button type="primary" size="small" @click="call_employee_add">提交</Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import tablePage from "@/mixin/tablePage";
import sysDictionary from "@/mixin/sysDictionary";
import { call_employee_add } from "@/service/getData";
export default {
  props: {
    model: ""
  },
  model: {
    prop: "model",
    event: "passBack"
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
      getDirList: ["SEAT_TYPE", "0_1_EFFECT_INVAL", "EXTEN_TYPE"],
      getDirObj: {},
      showPanel: false,
      childrenData: {},
      childrenModel: false,
      ruleValidate: {
        callno: [
          {
            required: true,
            message: "请输入坐席编号",
            trigger: "blur"
          }
        ],
        empno: [
          {
            required: true,
            message: "请输入员工编号",
            trigger: "blur"
          }
        ],
        loginId: [
          {
            required: true,
            message: "请输入登陆账号",
            trigger: "blur"
          }
        ],
        extenType: [
          {
            required: true,
            message: "请选择接听方式",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change"
          }
        ],
        seatType: [
          {
            required: true,
            message: "请选择坐席类型",
            trigger: "change"
          }
        ]
      },
      formItem: {
        callno: "",
        empno: "",
        loginId: "",
        extenType: "sip",
        status: "",
        seatType: ""
      }
    };
  },
  watch: {
    model: function() {
      // 监听父组件的变化
      this.childrenData = this.model;
    }
  },
  created() {
    console.log(this.model);
  },
  methods: {
    // 添加坐席关系
    async call_employee_add() {
      const res = await call_employee_add(this.formItem);
      if (res.code === 1) {
        this.childrenData = {
          modal: false,
          type: "ok"
        };
        this.$emit("passBack", this.childrenData);
      } else {
        this.$Message.error("添加内容信息校验不正确，请重新填写");
      }
    },
    del() {
      this.childrenData = {
        modal: false,
        type: "cloes"
      };
      this.$emit("passBack", this.childrenData);
      // this.$emit("getChildrenStatus", this.childrenData);
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
