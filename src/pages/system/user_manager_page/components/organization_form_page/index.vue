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
              type="ghost"
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
  </div>
</template>

<script>
import { collect_section_update, collect_list_leader } from "@/service/getData";
export default {
  props: ["parentData"],
  data() {
    return {
      formDisabled: "",
      createUser: "",
      createTime: "",
      updateUser: "",
      updateTime: "",
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
      updateUser
    } = this.parentData.nodeData;
    this.organizationFormItem.id = id;
    this.organizationFormItem.leafType = leafType;
    this.organizationFormItem.name = name;
    this.organizationFormItem.loginName = loginName;
    this.organizationFormItem.userIds = userIds;
    this.organizationFormItem.remark = remark;
    this.createUser = createUser;
    this.createTime = createTime;
    this.updateUser = updateUser;
    this.updateTime = updateTime;
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
        updateUser
      } = this.parentData.nodeData;
      this.organizationFormItem.id = id;
      this.organizationFormItem.leafType = leafType;
      this.organizationFormItem.name = name;
      this.organizationFormItem.loginName = loginName;
      this.organizationFormItem.userIds = userIds;
      this.organizationFormItem.remark = remark;
      this.createUser = createUser;
      this.createTime = createTime;
      this.updateUser = updateUser;
      this.updateTime = updateTime;
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
      this.formDisabled = false;
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.organizationFormItem);
          this.collect_section_update();
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
        this.$parent.$parent.$parent.getList("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
