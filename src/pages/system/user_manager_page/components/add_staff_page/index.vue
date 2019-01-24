<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title" v-if="type === '1'">机构负责人</p>
      <p slot="title" v-if="type === '2' || type === '3'">员工信息</p>

      <!-- 机构负责人 -->
      <Form
        ref="addLeaderFormItem"
        :model="addLeaderFormItem"
        :label-width="90"
        :rules="ruleValidate1"
        v-if="type === '1'">
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="机构名称:">
            <Input
              size="small"
              clearable
              v-model="addLeaderFormItem.name"
              placeholder="请输入机构名称"
              disabled
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="机构负责人:" span="4" prop="person">
            <Select
              size="small"
              v-model="addLeaderFormItem.person"
              filterable
              clearable
              placeholder="请选择机构负责人"
            >
              <Option
                v-for="item in phoneCallList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="addLeaderFormItem.remark"
              placeholder="请输入100字以内"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
          <FormItem>
            <Button
              size="small"
              type="ghost"
              style="width:80px;margin-right: 8px"
              @click="cancelStatus()"
            >取消</Button>
            <Button
              type="primary"
              @click="handleSubmit('addLeaderFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>

      <!-- 公司以及部门员工 -->
      <Form
        ref="addStaffFormItem"
        :model="addStaffFormItem"
        :label-width="90"
        :rules="ruleValidate2"
         v-if="type === '2' || type === '3'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="账号:" prop="loginName">
            <Input
              size="small"
              clearable
              v-model="addStaffFormItem.loginName"
              placeholder="请输入公司名称"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="用户名称:" prop="name">
            <Input size="small" clearable v-model="addStaffFormItem.name" placeholder="请输入用户名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="角色:" span="4" prop="roleName">
            <Select
              size="small"
              v-model="addStaffFormItem.roleName"
              filterable
              clearable
              placeholder="请选择角色"
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
              v-model="addStaffFormItem.companyName"
              filterable
              clearable
              placeholder="请选择公司"
            >
              <Option
                v-for="item in phoneCallList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="type === '3'">
          <FormItem label="部门:" span="4" prop="departName">
            <Select
              size="small"
              v-model="addStaffFormItem.departName"
              filterable
              clearable
              placeholder="请选择部门"
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
            <Input size="small" v-model="addStaffFormItem.seatType"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="坐席号:">
            <Input size="small" v-model="addStaffFormItem.callno"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="手机号:">
            <Input size="small" v-model="addStaffFormItem.mobile"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="邮箱:">
            <Input size="small" v-model="addStaffFormItem.email"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
          <FormItem>
            <Button
              size="small"
              type="ghost"
              style="width:80px;margin-right: 8px"
              @click="cancelStatus()"
            >取消</Button>
            <Button
              type="primary"
              @click="handleSubmit('addStaffFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>
    </Card>
  </div>
</template>
 <script>
export default {
  props: ['type'],
  data() {
    return {
      addLeaderFormItem: {
        name: "",
        person: "",
        remark: ""
      },
      addStaffFormItem: {
        name: "",
        loginName: "",
        companyName: "",
        departName: "",
        roleName: "",
        seatType: "",
        mobile: "",
        callno: "",
        email: "",
        remark: ""
      },
      ruleValidate1: {
        person: [
          {
            required: true,
            message: "请选择机构负责人",
            trigger: "change"
          }
        ]
      },
      ruleValidate2: {
        name: [
          {
            required: true,
            message: "请输入用户名称",
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
    cancelStatus () {
      console.log(this.$parent)
      this.$parent.roleModal = false;
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
    }
  }
};
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
