<template>
  <div>
    <Modal
      v-model="model"
      width="800"
      :transfer="false"
      class-name="user_info_form_modal"
      :mask-closable="false"
      @on-visible-change="del"
    >
      <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
        <span>用户信息</span>
      </p>
      <div style="text-align:center">
        <!-- 用户信息 -->
        <Card class="vue-panel">
          <p slot="title" style="text-align: left">用户信息</p>
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
                  <Input size="small" clearable v-model="formItem.name" placeholder="请输入姓名"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="账号:" prop="account_number">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.account_number"
                    placeholder="请输入账号"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="状态:" span="4" prop="status">
                  <Select
                    size="small"
                    v-model="formItem.status"
                    filterable
                    clearable
                    placeholder="‘’请选择状态"
                  >
                    <Option
                      v-for="item in productTimeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem label="系统角色:" span="4" prop="role">
                  <Select
                    size="small"
                    v-model="formItem.role"
                    filterable
                    clearable
                    placeholder="请选择系统角色"
                  >
                    <Option
                      v-for="item in productTimeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="邮箱:">
                  <Input size="small" clearable v-model="formItem.email" placeholder="请输入邮箱"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="电话:">
                  <Input size="small" clearable v-model="formItem.mobile" placeholder="请输入电话号"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div slot="footer">
        <Button type="ghost" size="small" @click="del">关闭</Button>
        <Button type="primary" size="small" @click="del">修改</Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import { buffet_list } from "@/service/getData";
export default {
  props: {
    model: false
  },
  // props: ["parentData"],
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
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ]
      },
      formItem: {
        name: "",
        account_number: "",
        status: "",
        role: "",
        email: "",
        mobile: ""
      },
      productTimeList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ]
    };
  },
  watch: {
    parentData: function() {
      // 监听父组件的变化
      this.childrenData = this.parentData;
    }
  },
  created() {
    console.log(this.parentData);
  },
  methods: {
    del() {
      // this.parentData.modal = false;
      // this.childrenData = false;
      // this.$parent.modal = false;
      // console.log(this.$parent.modal);
      // this.childrenData = this.parentData
      this.model = !this.model;
      this.$emit("passBack", this.model);
      // this.$emit("getChildrenStatus", this.childrenData);
    },
    getParam() {
      let searchParam = [];

      if (
        !(this.formItem.addtime && this.formItem.addtime[0]) ||
        !this.formItem.addtime[1]
      ) {
        delete this.formItem.addtime;
      } else {
        let startTime = this.formItem.addtime[0].getTime() / 1000;
        let endTime = this.formItem.addtime[1].getTime() / 1000;
        let addtime = [
          {
            searchValue: startTime,
            searchColumn: "addtime",
            searchOperator: ">"
          },
          {
            searchValue: endTime,
            searchColumn: "addtime",
            searchOperator: "<="
          }
        ];
        if (this.formItem && JSON.stringify(addtime) !== "[]") {
          for (let i = 0; i < addtime.length; i++) {
            searchParam.push(addtime[i]);
          }
        }
      }
      console.log(searchParam);
      for (let i = 0; i < this.tableColumns.length; i++) {
        for (const key in this.formItem) {
          if (
            this.formItem[key] &&
            this.tableColumns[i].searchOperator &&
            key === this.tableColumns[i].key &&
            key !== "addtime"
          ) {
            let item = {};
            item.searchValue = this.formItem[key];
            item.searchColumn = this.tableColumns[i].key;
            item.searchOperator = this.tableColumns[i].searchOperator;
            searchParam.push(item);
          }
        }
      }
      return searchParam;
    },
    // // 获取表格数据
    // async getList() {
    //   const searchParam = [];
    //   const res = await buffet_list({
    //     searchParam:
    //       this.formItem &&
    //       JSON.stringify(this.formItem) !== "{}" &&
    //       this.getParam(),
    //     page: this.pageNo,
    //     perPage: this.pageSize,
    //     config: {
    //       hideMessage: true
    //     }
    //   });
    //   if (res.data && res.data.data) {
    //     this.tableData = res.data.data;
    //     this.total = res.data.total;
    //     this.pageNo = res.data.current_page;
    //   } else {
    //     this.tableData = [];
    //     this.total = 0;
    //     this.pageNo = 1;
    //   }
    // },
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
</style>
