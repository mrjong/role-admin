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
              clearable
              v-model="organizationFormItem.name"
              placeholder="请输入机构名称"
              :disabled="!formDisabled"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="机构负责人:" span="4" prop="person">
            <Select
              size="small"
              v-model="organizationFormItem.person"
              filterable
              clearable
              multiple
              placeholder="请选择机构负责人"
              :disabled="!formDisabled"
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
          <FormItem span="4" label="创建人:">
            <Input size="small" v-model="organizationFormItem.createUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建时间:">
            <Input size="small" v-model="organizationFormItem.createTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改人:">
            <Input size="small" v-model="organizationFormItem.updateUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改时间:">
            <Input size="small" v-model="organizationFormItem.updateTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="organizationFormItem.updateTime"
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
              @click="handleSubmit('formItem')"
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
  data() {
    return {
      formDisabled: "",
      organizationFormItem: {
        name: "",
        person: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
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
        person: [
          {
            required: true,
            message: "请选择机构负责人",
            trigger: "change"
          }
        ]
      },
      phoneCallList: [
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
        }
      ]
    };
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
    handleSubmit() {}
  }
};
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
