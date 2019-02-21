<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title" v-if="parentData.type === '01'">机构负责人</p>
      <p slot="title" v-if="parentData.type === '02' || parentData.type === '03'">员工信息</p>

      <!-- 机构负责人 -->
      <Form
        ref="addLeaderFormItem"
        :model="addLeaderFormItem"
        :label-width="90"
        :rules="ruleValidate1"
        v-if="parentData.type === '01'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="机构负责人:" span="4" prop="userIds">
            <Select
              size="small"
              v-model="addLeaderFormItem.userIds"
              filterable
              clearable
              multiple
              placeholder="请选择机构负责人"
            >
              <Option v-for="item in bossList" :value="item.uuid" :key="item.uuid">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="上级机构:" span="4" prop="parentUuid">
            <Select
              size="small"
              v-model="addLeaderFormItem.parentUuid"
              filterable
              clearable
              placeholder="请选择上级机构"
            >
              <Option
                v-for="item in organizationList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
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
              @click="handleSubmit(parentData.type,'addLeaderFormItem')"
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
        v-if="parentData.type === '02' || parentData.type === '03'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="账号:" prop="loginName">
            <Input size="small" v-model="addStaffFormItem.loginName" placeholder="请输入账号"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="用户名称:" prop="name">
            <Input size="small" clearable v-model="addStaffFormItem.name" placeholder="请输入用户名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="角色:" span="4" prop="roleId">
            <Select
              size="small"
              v-model="addStaffFormItem.roleId"
              filterable
              clearable
              placeholder="请选择角色"
            >
              <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="公司:" span="4" prop="companyId">
            <Select
              size="small"
              v-model="addStaffFormItem.companyId"
              filterable
              clearable
              placeholder="请选择公司"
            >
              <Option
                v-for="(item,index) in companyList"
                :value="item.id"
                :key="item"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="parentData.type === '03'">
          <FormItem label="部门:" span="4" prop="outfitId">
            <Select
              size="small"
              v-model="addStaffFormItem.outfitId"
              filterable
              clearable
              placeholder="请选择部门"
            >
              <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="坐席类型:" span="4" prop="seatType">
            <Select
              size="small"
              v-model="addStaffFormItem.seatType"
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
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="addStaffFormItem.remark"
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
              @click="handleSubmit(parentData.type, 'addStaffFormItem')"
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
import {
  collect_user_clerk_add,
  collect_user_leader_add,
  collect_list_leader,
  collect_user_list,
  collect_parent_children,
  system_role_list,
  collect_user_check
} from "@/service/getData";
import tablePage from "@/mixin/tablePage";
import sysDictionary from "@/mixin/sysDictionary";
export default {
  props: ["parentData"],
  mixins: [sysDictionary, tablePage],
  data() {
    return {
      getDirList: ["SEAT_TYPE"],
      getDirObj: {},
      ruleValidate1: {
        userIds: [
          {
            required: true,
            message: "请选择机构负责人",
            trigger: "change",
            type: "array"
          }
        ],
        parentUuid: [
          {
            required: true,
            message: "请选择上级机构",
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
        roleId: [
          {
            required: true,
            message: "请选择角色类型",
            trigger: "change"
          }
        ],
        companyId: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        outfitId: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ]
      },
      addLeaderFormItem: {
        userIds: []
      },
      addStaffFormItem: {
        name: "",
        loginName: "",
        companyId: "",
        outfitId: "",
        roleId: "",
        seatType: "",
        mobile: "",
        callno: "",
        email: "",
        remark: "",
        status: "1",
        parentUuid: ""
      },
      organizationList: [],
      companyList: [],
      departmentList: [],
      bossList: [],
      roleList: []
    };
  },
  created() {
    // this.collect_user_list(this.parentData.nodeData.leafType);
    console.log(this.parentData);
    switch (this.parentData.type) {
      case "01":
        this.collect_user_list("01");
        this.addLeaderFormItem = {
          userIds: [],
          parentUuid: this.parentData.nodeData.id,
          name: this.parentData.nodeData.name
        };
        break;
      case "02":
        this.collect_user_list("02");
        this.collect_user_list("03");
        this.system_role_list();
        this.addStaffFormItem = {
          parentUuid: this.parentData.nodeData.id,
          companyId: this.parentData.nodeData.id
        };
        break;
      case "03":
        this.collect_user_list("03");
        this.collect_user_list("02");
        this.system_role_list();
        this.addStaffFormItem = {
          parentUuid: this.parentData.nodeData.id,
          companyId: this.parentData.nodeData.companyId,
          outfitId: this.parentData.nodeData.id
        };
        break;
    }
    this.collect_list_leader();
  },
  watch: {
    parentData() {
      console.log(this.parentData);
      switch (this.parentData.type) {
        case "01":
          this.addLeaderFormItem = {
            parentUuid: this.parentData.nodeData.id,
            name: this.parentData.nodeData.name,
            userIds: []
          };
          this.collect_user_list("01");
          break;
        case "02":
          this.collect_user_list("02");
          this.collect_user_list("03");
          this.system_role_list();
          this.addStaffFormItem = {
            parentUuid: this.parentData.nodeData.id,
            companyId: this.parentData.nodeData.id
          };
          break;
        case "03":
          this.system_role_list();
          this.collect_user_list("02");
          this.collect_user_list("03");
          this.addStaffFormItem = {
            parentUuid: this.parentData.nodeData.id,
            companyId: this.parentData.nodeData.companyId,
            outfitId: this.parentData.nodeData.id
          };
          break;
      }
    }
  },
  methods: {
    cancelStatus() {
      console.log(this.$parent);
      this.$parent.$parent.$parent.roleModal = false;
    },
    // 提交保存修改
    handleSubmit(type, name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          switch (type) {
            case "01":
              this.collect_user_leader_add();
              break;
            case "02":
              this.collect_user_clerk_add();
              break;
            case "03":
              this.collect_user_clerk_add();
              break;
          }
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 查询所有人员接口
    async collect_list_leader(id, type) {
      const res = await collect_list_leader({
        status: "1",
        lcollectType: ""
      });
      if (res.code === 1) {
        this.bossList = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查询机构，公司，部门
    async collect_user_list(type, parent) {
      const res = await collect_parent_children({
        status: "1",
        leafType: type,
        parentId: parent || ""
      });
      if (res.code === 1) {
        switch (type) {
          case "01":
            this.organizationList = res.data;
            break;
          case "02":
            this.companyList = res.data;
            break;
          case "03":
            this.departmentList = res.data;
            break;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 新增普通员工的时候获取角色list
    async system_role_list() {
      const res = await system_role_list({
        roleType: "02",
        status: "1",
        pageSize: 10000
      });
      console.log(res);
      if (res.code === 1) {
        this.roleList = res.data.content;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 添加领导
    async collect_user_leader_add() {
      const res = await collect_user_leader_add({
        status: "1",
        ...this.addLeaderFormItem
      });
      console.log(res);
      if (res.code === 1) {
        this.$Message.success("添加成功");
        this.$parent.$parent.$parent.roleModal = false;
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 添加普通员工
    async collect_user_clerk_add() {
      const res = await collect_user_clerk_add({
        status: "1",
        ...this.addStaffFormItem
      });
      console.log(res);
      if (res.code === 1) {
        this.$Message.success("添加成功");
        this.$parent.$parent.$parent.roleModal = false;
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 信息校验
    async collect_user_check(value, type) {
      const res = await collect_user_check({
        content: value,
        type: type
      });
      if (res.code === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form {
  min-height: 400px;
}
.ivu-col {
  margin-bottom: 5px;
}
</style>
