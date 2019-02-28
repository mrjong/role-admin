<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title">催收机构
        <Button
          class="fr header-btn"
          type="primary"
          @click="setFormStatus('1')"
          style="width:64px"
          long
          size="small"
        >修改</Button>
        <Button
          class="fr header-btn"
          type="primary"
          @click="addOrganization('formItem')"
          style="width:64px"
          long
          size="small"
        >状态变更</Button>
      </p>
      <Form
        ref="organizationFormItem"
        :model="organizationFormItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="机构名称:" prop="name">
            <Input
              size="small"
              v-model="organizationFormItem.name"
              placeholder="请输入机构名称"
              :disabled="!formDisabled"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="机构负责人:" span="4" prop="userIds">
            <Select
              size="small"
              v-model="organizationFormItem.userIds"
              filterable
              multiple
              placeholder="请选择机构负责人"
              :disabled="!formDisabled"
            >
              <Option v-for="item in bossList" :value="item.uuid" :key="item.uuid">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建人:">
            <Input size="small" v-model="createUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建时间:">
            <Input size="small" v-model="createTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改人:">
            <Input size="small" v-model="updateUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改时间:">
            <Input size="small" v-model="updateTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="organizationFormItem.remark"
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
              @click="handleSubmit('organizationFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>
    </Card>
    <div v-if="modal1">
      <Modal v-model="modal1" @on-ok="ok" @on-cancel="cancel" :mask-closable="false">
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>状态变更</span>
        </p>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="4">
          <label for="acount">机构名称：</label>
          <Input
            size="small"
            v-model="organizationFormItem.name"
            disabled
            id="acount"
            style="width: auto"
          ></Input>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" style="margin-left: 20px;">
          <label for="radio">状态：</label>
          <RadioGroup v-model="status" id="radio" span="4">
            <Radio :label="1">可用</Radio>
            <Radio :label="0">冻结</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button   size="small" @click="cancel">取消</Button>
          <Button type="primary" size="small" @click="ok">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import {
  collect_section_update,
  collect_list_leader,
  collect_status_change
} from "@/service/getData";
export default {
  props: ["parentData"],
  data() {
    return {
      formDisabled: "",
      createUser: "",
      createTime: "",
      updateUser: "",
      updateTime: "",
      modal1: false,
      status: "",
      organizationFormItem: {
        name: "",
        userIds: [],
        remark: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: "blur"
          }
        ],
        userIds: [
          {
            required: true,
            message: "请选择机构负责人",
            trigger: "change",
            type: "array"
          }
        ]
      },
      bossList: []
    };
  },
  created() {
    console.log(this.parentData);
    const {
      id,
      leafType,
      name,
      loginName,
      userIds,
      remark,
      createTime,
      createUser,
      updateTime,
      updateUser,
      status
    } = this.parentData.nodeData;
    this.organizationFormItem.id = id;
    this.organizationFormItem.leafType = leafType;
    this.organizationFormItem.name = name;
    this.organizationFormItem.loginName = loginName;
    this.organizationFormItem.userIds = userIds;
    this.organizationFormItem.remark = remark;
    this.createUser = createUser;
    this.updateUser = updateUser;
    this.createTime = createTime
          ? this.$options.filters["formatDate"](createTime,"YYYY-MM-DD HH:mm:ss")
          : createTime;
      this.updateTime = updateTime
          ? this.$options.filters["formatDate"](updateTime,"YYYY-MM-DD HH:mm:ss")
          : updateTime;
    this.status = status;
    // this.organizationFormItem.userIds = [];
    this.collect_list_leader();
  },
  watch: {
    parentData() {
      // this.organizationFormItem = this.parentData.nodeData;
      // this.organizationFormItem.userIds = [];
      const {
        id,
        leafType,
        name,
        loginName,
        userIds,
        remark,
        createTime,
        createUser,
        updateTime,
        updateUser,
        status
      } = this.parentData.nodeData;
      this.organizationFormItem.id = id;
      this.organizationFormItem.leafType = leafType;
      this.organizationFormItem.name = name;
      this.organizationFormItem.loginName = loginName;
      this.organizationFormItem.userIds = userIds;
      this.organizationFormItem.remark = remark;
      this.createUser = createUser;
      this.updateUser = updateUser;
      this.createTime = createTime
          ? this.$options.filters["formatDate"](createTime,"YYYY-MM-DD HH:mm:ss")
          : createTime;
      this.updateTime = updateTime
          ? this.$options.filters["formatDate"](updateTime,"YYYY-MM-DD HH:mm:ss")
          : updateTime;
      this.status = status;
      console.log(this.parentData);
    }
  },
  methods: {
    // 设置表单编辑状态
    setFormStatus(type) {
      this.formDisabled = true;
    },
    // 恢复表单的不可用状态
    cancelStatus() {
      const {
        id,
        leafType,
        name,
        loginName,
        userIds,
        remark,
        createTime,
        createUser,
        updateTime,
        updateUser,
        status
      } = this.parentData.nodeData;
      this.organizationFormItem.id = id;
      this.organizationFormItem.leafType = leafType;
      this.organizationFormItem.name = name;
      this.organizationFormItem.loginName = loginName;
      this.organizationFormItem.userIds = userIds;
      this.organizationFormItem.remark = remark;
      this.createUser = createUser;
      this.updateUser = updateUser;
      this.createTime = createTime
          ? this.$options.filters["formatDate"](createTime,"YYYY-MM-DD HH:mm:ss")
          : createTime;
      this.updateTime = updateTime
          ? this.$options.filters["formatDate"](updateTime,"YYYY-MM-DD HH:mm:ss")
          : updateTime;
      this.status = status;
      this.formDisabled = false;
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.organizationFormItem);
          this.collect_section_update();
        }
      });
    },
    // 查询所有人员接口
    async collect_list_leader(id, type) {
      const res = await collect_list_leader({
        status: "1",
        userType: "01"
      });
      if (res.code === 1) {
        this.bossList = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 更新机构信息接口
    async collect_section_update(id, type) {
      // this.organizationFormItem.userIds = JSON.stringify(
      //   this.organizationFormItem.userIds
      // );
      const res = await collect_section_update({
        ...this.organizationFormItem,
        status: "1"
      });
      if (res.code === 1) {
        this.$Message.success("修改成功");
        this.formDisabled = false;
        this.$parent.$parent.$parent.modalType = '';
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 状态变更接口
    async collect_status_change() {
      const res = await collect_status_change({
        id: this.organizationFormItem.id,
        status: Number(this.status)
      });
      if (res.code === 1) {
        this.$Message.success("变更成功");
        this.modal = false;
        this.$parent.$parent.$parent.modalType = '';
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    ok() {
      this.collect_status_change();
    },
    cancel() {
      this.modal1 = false;
    },
    addOrganization() {
      this.modal1 = true;
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-col {
  margin-bottom: 5px;
}
</style>
