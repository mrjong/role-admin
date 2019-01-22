<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title">催收公司
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
          @click="setStatus('formItem')"
          style="width:64px"
          long
          size="small"
        >状态变更</Button>
      </p>
      <Form
        ref="componeyFormItem"
        :model="componeyFormItem"
        :label-width="90"
        :rules="ruleValidate">
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="公司名称:" prop="name">
            <Input
              size="small"
              clearable
              v-model="componeyFormItem.name"
              placeholder="请输入公司名称"
              :disabled="!formDisabled"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="类型:" span="4" prop="collectType">
            <Select
              size="small"
              v-model="componeyFormItem.collectType"
              filterable
              clearable
              placeholder="请选择类型"
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
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-show="formDisabled">
          <FormItem label="上级机构:" span="4" prop="organization">
            <Select
              size="small"
              v-model="componeyFormItem.organization"
              filterable
              clearable
              placeholder="请选择上级机构"
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
          <FormItem span="4" label="地区:">
            <Input size="small" v-model="componeyFormItem.area" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建人:">
            <Input size="small" v-model="componeyFormItem.createUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建时间:">
            <Input size="small" v-model="componeyFormItem.createTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改人:">
            <Input size="small" v-model="componeyFormItem.updateUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改时间:">
            <Input size="small" v-model="componeyFormItem.updateTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="componeyFormItem.remark"
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
              @click="handleSubmit('componeyFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>
    </Card>
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
          <label for="acount">公司名称：</label>
          <Input
            size="small"
            v-model="componeyFormItem.name"
            disabled
            id="acount"
            style="width: auto"
          ></Input>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" style="margin-left: 20px;">
          <label for="radio">状态：</label>
          <RadioGroup v-model="status" id="radio" span="4">
            <Radio label="0">有效</Radio>
            <Radio label="1">无效</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button type="ghost" size="small" @click="ok">取消</Button>
          <Button type="primary" size="small" @click="cancel">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formDisabled: "",
      modal: false,
      status: "0",
      componeyFormItem: {
        name: "",
        person: "",
        area: "",
        collectType: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        remark: "",
        organization: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
          }
        ],
        collectType: [
          {
            required: true,
            message: "请选择公司类型",
            trigger: "change"
          }
        ],
        organization: [
          {
            required: true,
            message: "请选择上级机构",
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
    // 设置表单编辑状态
    setFormStatus(type) {
      this.formDisabled = true;
    },
    // 设置状态变更
    setStatus() {
      this.modal = true;
    },
    // 恢复表单的不可用状态
    cancelStatus() {
      this.formDisabled = false;
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
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.modal = false;
    },
    cancel() {
      this.modal = false;
    }
  }
};
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
