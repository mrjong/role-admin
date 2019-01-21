<template>
  <div>
    <Modal
      v-model="model"
      width="800"
      :transfer="false"
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
                      v-for="item in productTimeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="坐席编号:" prop="uuid">
                  <Input size="small" clearable v-model="formItem.uuid" placeholder="请输入坐席编号"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="登录账号:" prop="loginId">
                  <Input size="small" clearable v-model="formItem.loginId" placeholder="请输入登录账号"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
                <FormItem span="4" label="员工姓名:" prop="empno">
                  <Input size="small" clearable v-model="formItem.empno" placeholder="请输入员工姓名"></Input>
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
                      v-for="item in extenTypeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
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
                      v-for="item in statusList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div slot="footer">
        <Button type="ghost" size="small" @click="del">关闭</Button>
        <Button type="primary" size="small" @click="del">提交</Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import { buffet_list } from "@/service/getData";
export default {
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
      childrenModel: false,
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
          value: "0",
          label: "容联"
        },
        {
          value: "1",
          label: "科天"
        }
      ],
      statusList: [
        {
          value: "0",
          label: "有效"
        },
        {
          value: "1",
          label: "无效"
        }
      ],
      extenTypeList: [
        {
          value: "0",
          label: "软电话"
        },
        {
          value: "1",
          label: "手机"
        },
        {
          value: "2",
          label: "网关"
        }
      ]
    };
  },
  props: { model: false },
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
      this.childrenModel = !this.model;
      this.$emit("passBack", this.childrenModel);
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
.add_role_form_modal {
  .vue-panel {
    border: none;
  }
}
</style>
