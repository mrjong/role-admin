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
        >密码重置</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="setStatus('formItem')"
          style="width:64px"
          long
          size="small"
        >状态变更</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="setFormStatus('1')"
          style="width:64px"
          long
          size="small"
        >修改</Button>
      </p>
      <Form ref="staffFormItem" :model="staffFormItem" :label-width="90" :rules="ruleValidate">
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="账号:" prop="loginName">
            <Input
              size="small"
              clearable
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
              :disabled="!formDisabled"
            >
              <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
              placeholder="请选择公司"
              :disabled="!formDisabled"
            >
              <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.text }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-show="formDisabled">
          <FormItem label="部门:" span="4" prop="outfitId">
            <Select
              size="small"
              v-model="staffFormItem.outfitId"
              filterable
              clearable
              placeholder="请选择部门"
              :disabled="!formDisabled"
            >
              <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.text }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
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
                v-for="item in getDirObj['SEAT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="坐席号:">
            <Input size="small" v-model="staffFormItem.callno" :disabled="!formDisabled"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="手机号:" prop='mobile'>
            <Input size="small" v-model="staffFormItem.mobile" :disabled="!formDisabled"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="邮箱:" prop='email'>
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
            <Button
              size="small"
               
              style="width:80px;margin-right: 8px"
              @click="cancelStatus()"
            >取消</Button>
            <Button
              type="primary"
              @click="handleSubmit('staffFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
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
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
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
          <Button   size="small" @click="cancel">取消</Button>
          <Button type="primary" size="small" @click="ok">确定</Button>
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
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
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
          <Button   size="small" @click="cancel2">取消</Button>
          <Button type="primary" size="small" @click="ok2">确定</Button>
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
  collect_user_check,
  system_role_list,
  collect_user_clerk_update,
  collect_status_change,
  system_user_reset,
  collect_user_clerk_info
} from "@/service/getData";
export default {
  props: ["parentData"],
  mixins: [sysDictionary, tablePage],
  data() {
    return {
      getDirList: ["SEAT_TYPE"],
      getDirObj: {},
      formDisabled: false,
      modal: false,
      modal2: false,
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
        ],
        mobile: [
					{
						pattern: this.GLOBAL.mblNo,
						message: '请输入正确手机号',
						trigger: 'blur'
					}
				],
        email: [
					{
						pattern: this.GLOBAL.email,
						message: '请输入正确邮箱号',
						trigger: 'blur'
					}
				],
      },
      companyList: [],
      departmentList: [],
      roleList: []
    };
  },
  created() {
    console.log(this.parentData.nodeData);
    this.collect_user_list("02");
    this.collect_user_list("03");
    this.system_role_list();
    this.staffFormItem.id = this.parentData.nodeData.id;
    this.staffFormItem.name = this.parentData.nodeData.name;
    this.staffFormItem.loginName = this.parentData.nodeData.loginName;
    this.staffFormItem.companyId = this.parentData.nodeData.companyId;
    this.staffFormItem.outfitId = this.parentData.nodeData.outfitId;
    this.staffFormItem.roleId = this.parentData.nodeData.roleId;
    this.staffFormItem.createUser = this.parentData.nodeData.createUser;
    this.staffFormItem.updateUser = this.parentData.nodeData.updateUser;
    this.staffFormItem.parentUuid = this.parentData.nodeData.parentUuid;
    this.staffFormItem.status = String(this.parentData.nodeData.status);
    this.collect_user_clerk_info(this.parentData.nodeData.name);
  },
  watch: {
    parentData() {
      this.staffFormItem.id = this.parentData.nodeData.id;
      this.staffFormItem.name = this.parentData.nodeData.name;
      this.staffFormItem.loginName = this.parentData.nodeData.loginName;
      this.staffFormItem.companyId = this.parentData.nodeData.companyId;
      this.staffFormItem.outfitId = this.parentData.nodeData.outfitId;
      this.staffFormItem.roleId = this.parentData.nodeData.roleId;
      this.staffFormItem.createUser = this.parentData.nodeData.createUser;
      this.staffFormItem.updateUser = this.parentData.nodeData.updateUser;
      this.staffFormItem.parentUuid = this.parentData.nodeData.parentUuid;
      this.staffFormItem.status = String(this.parentData.nodeData.status);
      this.collect_user_clerk_info(this.parentData.nodeData.name);
    }
  },
  methods: {
    // 设置表单编辑状态
    setFormStatus(type) {
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
    async collect_user_list(type) {
      const res = await collect_user_list({
        status: "1",
        leafType: type
      });
      console.log(res);
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.companyList = res.data.data;
            break;
          case "03":
            this.departmentList = res.data.data;
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
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          this.collect_user_clerk_update();
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 保存更新员工信息
    async collect_user_clerk_update() {
      this.staffFormItem.createTime = null;
      this.staffFormItem.updateTime = null;
      const res = await collect_user_clerk_update({
        ...this.staffFormItem
      });
      if (res.code === 1) {
        this.$Message.success("修改成功");
        this.$parent.$parent.$parent.modalType = '';
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 状态变更接口
    async collect_status_change() {
      const res = await collect_status_change({
        id: this.staffFormItem.id,
        status: Number(this.staffFormItem.status)
      });
      if (res.code === 1) {
        this.$Message.success("变更成功");
        this.modal = false;
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置密码
    async system_user_reset(ids) {
      const res = await system_user_reset({ ids: JSON.stringify(ids) });
      if (res.code === 1) {
        this.$Message.success("重置密码成功");
        this.modal2 = false;
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
        console.log(res);
        this.staffFormItem.email = res.data.email;
        this.staffFormItem.mobile = res.data.mobile;
        this.staffFormItem.seatType = res.data.seatType;
        this.staffFormItem.callno = res.data.callno;
        this.staffFormItem.remark = res.data.remark;
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
        console.log(this.staffFormItem);
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
    },
    ok2() {
      // this.$Message.info('Clicked ok');
      this.system_user_reset(this.staffFormItem.id);
    },
    cancel2() {
      this.modal2 = false;
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-col {
  margin-bottom: 5px;
}
</style>
