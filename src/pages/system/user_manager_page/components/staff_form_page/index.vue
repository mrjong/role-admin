<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title">催收人员管理
        <Button
          class="fr header-btn"
          type="primary"
          @click="setPassWordStatus('formItem')"
          style="width:64px"
          long
          size="small"
          v-if="parentData.reset_pwd"
        >密码重置</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="setStatus('formItem')"
          style="width:64px"
          long
          size="small"
          v-if="parentData.status_update"
        >状态变更</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="setFormStatus('1')"
          style="width:64px"
          long
          size="small"
          v-if="parentData.update"
        >修改</Button>
      </p>
      <Form ref="staffFormItem" :model="staffFormItem" :label-width="90" :rules="ruleValidate">
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="账号:" prop="loginName">
            <Input
              size="small"
              v-model="staffFormItem.loginName"
              placeholder="请输入账号"
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
          <FormItem label="角色:" span="4" prop="roleId">
            <Select
              size="small"
              v-model="staffFormItem.roleId"
              filterable
              clearable
              placeholder="请选择角色"
              @on-change="roleSelect"
              :disabled="!formDisabled"
            >
              <Option v-for="(item,index) in roleList" :value="item.id" :key="item.id + index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="公司:" span="4" prop="companyId">
            <Select
              size="small"
              v-model="staffFormItem.companyId"
              filterable
              clearable
              @on-change="companyChange"
              label-in-value
              placeholder="请选择公司"
              :disabled="!formDisabled"
            >
              <Option v-for="(item,index) in companyList" :value="item.id" :key="item.id + index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="formDisabled && departmentFlag">
          <FormItem label="部门:" span="4" prop="outfitId">
            <Select
              size="small"
              v-model="staffFormItem.outfitId"
              filterable
              clearable
              placeholder="请选择部门"
              label-in-value
              @on-change="outfitChange"
              :disabled="!formDisabled"
            >
              <Option v-for="(item,index) in departmentList" :value="item.id" :key="item.id + index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
        <FormItem label="呼叫方案:" span="4" >
          <Select
            size="small"
            v-model="staffFormItem.callType"
            clearable
            placeholder="请选择呼叫方案"
            :disabled="!formDisabled"
          >
            <Option
              v-for="item in getDirObj['CALL_TYPE']"
              :value="item.itemCode"
              :key="item.itemCode"
            >{{ item.itemName }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="staffFormItem.callType === '2'">
        <FormItem label="方案/专线:" span="4" prop="seatType" >
          <Select
            size="small"
            v-model="staffFormItem.planId"
            filterable
            clearable
            placeholder="请选择方案或专线"
            :disabled="!formDisabled"
          >
            <Option
              v-for="item in planList"
              :value="item.id"
              :key="item.id"
            >{{ item.planName }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="staffFormItem.callType === '1'">
          <FormItem span="4" label="坐席名称:">
            <Select
              size="small"
              v-model="staffFormItem.seatType"
              filterable
              clearable
              placeholder="请选择坐席"
              :disabled="!formDisabled"
            >
              <Option
                v-for="item,index in getDirObj['SEAT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode + index"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-if="staffFormItem.callType === '1'">
          <FormItem span="4" label="坐席号:">
            <Input size="small" v-model="staffFormItem.callno" :disabled="!formDisabled"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="手机号:" prop="mobile">
            <Input size="small" v-model="staffFormItem.mobile" :disabled="!formDisabled"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="邮箱:" prop="email">
            <Input size="small" v-model="staffFormItem.email" :disabled="!formDisabled"></Input>
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
            <Button size="small" style="width:80px;margin-right: 8px" @click="cancelStatus()">取消</Button>
            <Button
              type="primary"
              @click="handleSubmit('staffFormItem')"
              style="width:80px"
              long
              size="small"
              :loading="update_loading"
            >
              <span v-if="!update_loading">确定</span>
              <span v-else>修改中...</span>
            </Button>
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
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
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
          <RadioGroup v-model="staffFormItem.status" id="radio" span="4">
            <Radio label="1">正常</Radio>
            <Radio label="0">冻结</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button size="small" @click="cancel">取消</Button>
          <Button type="primary" size="small" @click="ok" :loading="status_loading">
            <span v-if="!status_loading">确定</span>
            <span v-else>变更中...</span>
          </Button>
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
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
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
          <Button size="small" @click="cancel2">取消</Button>
          <Button type="primary" size="small" @click="ok2" :loading="reset_pwd_loading">
            <span v-if="!reset_pwd_loading">确定</span>
            <span v-else>重置中...</span>
          </Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import tablePage from "@/mixin/tablePage";
import sysDictionary from "@/mixin/sysDictionary";
import {
  collect_user_list,
  collect_parent_children,
  collect_user_check,
  system_role_list,
  collect_user_clerk_update,
  collect_status_change,
  system_user_reset,
  collect_user_clerk_info,
  rout_plan_planList
} from "@/service/getData";
export default {
  props: ["parentData"],
  mixins: [sysDictionary, tablePage],
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
    return {
      getDirList: ["SEAT_TYPE", 'CALL_TYPE'],
      getDirObj: {},
      update_loading: false, //修改提交的loading
      status_loading: false, //状态修改提交的loading
      reset_pwd_loading: false, //重置密码提交的loading
      formDisabled: false,
      modal: false,
      modal2: false,
      departmentFlag: true,
      status: "0",
      staffFormItem: {
        id: "",
        name: "",
        loginName: "",
        companyId: "",
        outfitId: "",
        roleId: "",
        seatType: "",
        mobile: "",
        callno: "",
        email: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        remark: "",
        parentUuid: "",
        status: ""
      },
      ruleValidate: {
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
            validator: validateID,
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
        ],
        mobile: [
          {
            pattern: this.GLOBAL.mblNo,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: this.GLOBAL.email,
            message: "请输入正确邮箱号",
            trigger: "blur"
          }
        ]
      },
      companyList: [],
      departmentList: [],
      roleList: [],
      planList: []
    };
  },
  created() {
    console.log(this.parentData.nodeData);
    this.collect_user_list("02");
    this.system_role_list();
    this.staffFormItem.id = this.parentData.nodeData.id;
    this.staffFormItem.name = this.parentData.nodeData.name;
    this.staffFormItem.loginName = this.parentData.nodeData.loginName;
    this.staffFormItem.companyId = this.parentData.nodeData.companyId;
    this.staffFormItem.companyName = this.parentData.nodeData.companyName;
    this.staffFormItem.outfitId = this.parentData.nodeData.outfitId;
    this.staffFormItem.outfitName = this.parentData.nodeData.outfitName;
    this.staffFormItem.roleId = this.parentData.nodeData.roleId;
    if (this.staffFormItem.roleId === "2474cbac7a34419f8decc99f022846a1") {
      this.departmentFlag = false;
    } else {
      this.departmentFlag = true;
    }
    this.staffFormItem.createUser = this.parentData.nodeData.createUser;
    this.staffFormItem.updateUser = this.parentData.nodeData.updateUser;
    this.staffFormItem.parentUuid = this.parentData.nodeData.parentUuid;
    this.staffFormItem.status = String(this.parentData.nodeData.status);
    this.collect_user_list("03", this.staffFormItem.companyId);
    this.collect_user_clerk_info(this.parentData.nodeData.name);
    this.routPlanPlanList()
  },
  watch: {
    staffFormItem(val) {
      console.log(val.callType)
    },
    parentData() {
      this.collect_user_list("02");
      this.system_role_list();
      console.log(this.parentData.nodeData)
      this.staffFormItem.id = this.parentData.nodeData.id;
      this.staffFormItem.name = this.parentData.nodeData.name;
      this.staffFormItem.loginName = this.parentData.nodeData.loginName;
      this.staffFormItem.companyId = this.parentData.nodeData.companyId;
      this.staffFormItem.companyName = this.parentData.nodeData.companyName;
      this.staffFormItem.outfitId = this.parentData.nodeData.outfitId;
      this.staffFormItem.outfitName = this.parentData.nodeData.outfitName;
      this.staffFormItem.roleId = this.parentData.nodeData.roleId;
      if (this.staffFormItem.roleId === "2474cbac7a34419f8decc99f022846a1") {
        this.departmentFlag = false;
      } else {
        this.departmentFlag = true;
      }
      this.staffFormItem.createUser = this.parentData.nodeData.createUser;
      this.staffFormItem.updateUser = this.parentData.nodeData.updateUser;
      this.staffFormItem.parentUuid = this.parentData.nodeData.parentUuid;
      this.staffFormItem.status = String(this.parentData.nodeData.status);
      this.collect_user_list("03", this.staffFormItem.companyId);
      this.collect_user_clerk_info(this.parentData.nodeData.name);
      this.routPlanPlanList()
      this.formDisabled = false; //切换不同催收员，表单disabled重置
    },

  },
  methods: {
    //公司变更联动部门变更
    companyChange(obj) {
      if (obj) {
        this.staffFormItem.companyName = obj.label;
        this.collect_user_list("03", obj.value);
      }
    },
    //部门变更
    outfitChange(obj) {
      if (obj) {
        this.staffFormItem.outfitName = obj.label;
      }
    },
    // 选择角色变更
    roleSelect(item) {
      if (item === "2474cbac7a34419f8decc99f022846a1") {
        this.departmentFlag = false;
      } else {
        this.departmentFlag = true;
      }
    },
    // 设置表单编辑状态,恢复原来默认反显的数据
    setFormStatus(type) {
      this.update_loading = false;
      this.staffFormItem.id = this.parentData.nodeData.id;
      this.staffFormItem.name = this.parentData.nodeData.name;
      this.staffFormItem.loginName = this.parentData.nodeData.loginName;
      this.staffFormItem.companyId = this.parentData.nodeData.companyId;
      this.staffFormItem.companyName = this.parentData.nodeData.companyName;
      this.staffFormItem.outfitId = this.parentData.nodeData.outfitId;
      this.staffFormItem.outfitName = this.parentData.nodeData.outfitName;
      this.staffFormItem.roleId = this.parentData.nodeData.roleId;
      if (this.staffFormItem.roleId === "2474cbac7a34419f8decc99f022846a1") {
        this.departmentFlag = false;
      } else {
        this.departmentFlag = true;
      }
      this.collect_user_list("03", this.staffFormItem.companyId);
      this.staffFormItem.createUser = this.parentData.nodeData.createUser;
      this.staffFormItem.updateUser = this.parentData.nodeData.updateUser;
      this.staffFormItem.parentUuid = this.parentData.nodeData.parentUuid;
      this.staffFormItem.status = String(this.parentData.nodeData.status);
      this.collect_user_clerk_info(this.parentData.nodeData.name);
      this.routPlanPlanList()
      this.formDisabled = true;
    },
    // 设置状态变更
    setStatus() {
      this.modal = true;
    },
    // 密码重置modal
    setPassWordStatus() {
      this.modal2 = true;
    },
    // 恢复表单的不可用状态
    cancelStatus() {
      this.formDisabled = false;
    },
    // 查询上级机构
    async collect_user_list(type, parent) {
      const res = await collect_parent_children({
        status: "1",
        leafType: type,
        parentId: parent || ""
      });
      if (res.code === 1) {
        switch (type) {
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
        pageSize: 100
      });
      if (res.code === 1) {
        this.roleList = res.data.content;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          this.collect_user_clerk_update();
        }
      });
    },
    // 保存更新员工信息
    async collect_user_clerk_update() {
      this.update_loading = true;
      this.staffFormItem.createTime = null;
      this.staffFormItem.updateTime = null;
      if (!this.departmentFlag) {
        this.staffFormItem.outfitId = "";
      }
      const res = await collect_user_clerk_update({
        ...this.staffFormItem,
        originOutfitId: this.parentData.nodeData.outfitId,
        originOutfitName: this.parentData.nodeData.outfitName,
        originCompanyId: this.parentData.nodeData.companyId,
        originCompanyName: this.parentData.nodeData.companyName
      });
      this.update_loading = false;
      if (res.code === 1) {
        this.$Message.success("修改成功");
        this.$parent.$parent.$parent.modalType = "";
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 状态变更接口
    async collect_status_change() {
      this.status_loading = true;
      const res = await collect_status_change({
        id: this.staffFormItem.id,
        status: Number(this.staffFormItem.status)
      });
      this.status_loading = false;
      if (res.code === 1) {
        this.$Message.success("变更成功");
        this.modal = false;
        this.$parent.$parent.$parent.modalType = "";
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置密码
    async system_user_reset(ids) {
      this.reset_pwd_loading = true;
      const res = await system_user_reset({ ids: ids });
      this.reset_pwd_loading = false;
      if (res.code === 1) {
        this.$Message.success("重置密码成功");
        this.modal2 = false;
        this.$parent.$parent.$parent.modalType = "";
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查询员工信息接口
    async collect_user_clerk_info(name) {
      const res = await collect_user_clerk_info({
        loginName: this.parentData.nodeData.loginName,
        parentUuid: this.parentData.nodeData.parentUuid
      });
      if (res.code === 1) {
        this.staffFormItem.email = res.data.email;
        this.staffFormItem.mobile = res.data.mobile;
        this.staffFormItem.seatType = res.data.seatType;
        this.staffFormItem.callno = res.data.callno;
        this.staffFormItem.remark = res.data.remark;
        this.staffFormItem.userUuid = res.data.userUuid;
        this.$set(this.staffFormItem, 'callType', res.data.callType);
        this.$set(this.staffFormItem, 'planId', res.data.planId);
        this.staffFormItem.createTime = res.data.createTime
          ? this.$options.filters["formatDate"](
              res.data.createTime,
              "YYYY-MM-DD HH:mm:ss"
            )
          : res.data.createTime;
        this.staffFormItem.updateTime = res.data.updateTime
          ? this.$options.filters["formatDate"](
              res.data.updateTime,
              "YYYY-MM-DD HH:mm:ss"
            )
          : res.data.updateTime;
      } else {
        this.$Message.error(res.message);
      }
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.collect_status_change();
    },
    cancel() {
      this.modal = false;
      this.status_loading = false;
    },
    ok2() {
      // this.$Message.info('Clicked ok');
      this.system_user_reset(this.staffFormItem.userUuid);
    },
    cancel2() {
      this.modal2 = false;
      this.reset_pwd_loading = false;
    },
    // 查询路由方案列表
    async routPlanPlanList() {
      const res = await rout_plan_planList({userType: ''});
      if (res.code === 1) {
        this.planList = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
  }
};
</script>
<style lang="less" scoped>
.ivu-col {
  margin-bottom: 5px;
}
</style>
