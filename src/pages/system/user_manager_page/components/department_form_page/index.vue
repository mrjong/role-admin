<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card" ref="department_form_card">
      <p slot="title">部门信息
        <Button
          class="fr header-btn"
          type="primary"
          @click="setFormStatus()"
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
        ref="departmentFormItem"
        :model="departmentFormItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="部门名称:" prop="name">
            <Input
              size="small"
              clearable
              v-model="departmentFormItem.name"
              placeholder="请输入部门名称"
              :disabled="!formDisabled"
            ></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="上级机构:" span="4" prop="parentUuid">
            <Select
              size="small"
              v-model="departmentFormItem.parentUuid"
              filterable
              clearable
              placeholder="请选择上级机构"
              :disabled="!formDisabled"
            >
              <Option
                v-for="item in organizationList"
                :value="item.id"
                :key="item.id"
              >{{ item.text }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建人:">
            <Input size="small" v-model="departmentFormItem.createUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="创建时间:">
            <Input size="small" v-model="departmentFormItem.createTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改人:">
            <Input size="small" v-model="departmentFormItem.updateUser" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="修改时间:">
            <Input size="small" v-model="departmentFormItem.updateTime" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="departmentFormItem.remark"
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
              @click="handleSubmit('departmentFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>
    </Card>
    <!-- modal框 -->
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
          <label for="acount">部门名称：</label>
          <Input
            size="small"
            v-model="departmentFormItem.name"
            disabled
            id="acount"
            style="width: auto"
          ></Input>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" style="margin-left: 20px;">
          <label for="radio">状态：</label>
          <RadioGroup v-model="departmentFormItem.status" id="radio" span="4">
            <Radio :label="1">有效</Radio>
            <Radio :label="0">无效</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button size="small" @click="cancel">取消</Button>
          <Button type="primary" size="small" @click="ok">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import {
  collect_outfit_update,
  collect_user_list,
  collect_status_change
} from "@/service/getData";
export default {
  props: ["parentData"],
  data() {
    return {
      modal: false,
      formDisabled: false,
      status: "0",
      departmentFormItem: {
        name: "",
        parentUuid: "",
        remark: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
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
      organizationList: []
    };
  },
  created() {
    console.log(this.parentData);
    this.collect_user_list();
    this.departmentFormItem = this.parentData.nodeData;
    this.departmentFormItem.createTime = this.parentData.nodeData.createTime
      ? this.$options.filters["formatDate"](
          this.parentData.nodeData.createTimee,
          "YYYY-MM-DD HH:mm:ss"
        )
      : this.parentData.nodeData.createTime;
    this.departmentFormItem.updateTime = this.parentData.nodeData.updateTime
      ? this.$options.filters["formatDate"](
          this.parentData.nodeData.updateTimee,
          "YYYY-MM-DD HH:mm:ss"
        )
      : this.parentData.nodeData.updateTime;
  },
  watch: {
    parentData() {
      this.departmentFormItem = this.parentData.nodeData;
      this.departmentFormItem.createTime = this.parentData.nodeData.createTime
        ? this.$options.filters["formatDate"](
            this.parentData.nodeData.createTimee,
            "YYYY-MM-DD HH:mm:ss"
          )
        : this.parentData.nodeData.createTime;
      this.departmentFormItem.updateTime = this.parentData.nodeData.updateTime
        ? this.$options.filters["formatDate"](
            this.parentData.nodeData.updateTimee,
            "YYYY-MM-DD HH:mm:ss"
          )
        : this.parentData.nodeData.updateTime;
    }
  },
  methods: {
    // 设置表单编辑状态
    setFormStatus() {
      this.formDisabled = true;
    },
    // 设置状态变更
    setStatus() {
      this.$refs.department_form_card.$el.style.height = "300px";
      this.modal = true;
    },
    // 恢复表单的不可用状态
    cancelStatus() {
      this.departmentFormItem = this.parentData.nodeData;
      this.departmentFormItem.createTime = this.parentData.nodeData.createTime
        ? this.$options.filters["formatDate"](
            this.parentData.nodeData.createTimee,
            "YYYY-MM-DD HH:mm:ss"
          )
        : this.parentData.nodeData.createTime;
      this.departmentFormItem.updateTime = this.parentData.nodeData.updateTime
        ? this.$options.filters["formatDate"](
            this.parentData.nodeData.updateTimee,
            "YYYY-MM-DD HH:mm:ss"
          )
        : this.parentData.nodeData.updateTime;
      this.formDisabled = false;
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          this.collect_outfit_update();
        }
      });
    },
    // 查询上级机构
    async collect_user_list(id, type) {
      const res = await collect_user_list({
        status: "1",
        leafType: "02"
      });
      console.log(res);
      if (res.code === 1) {
        this.organizationList = res.data.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 更新部门信息接口
    async collect_outfit_update(id, type) {
      const res = await collect_outfit_update({
        ...this.departmentFormItem,
        status: "1"
      });
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
      const res = await collect_status_change({
        id: this.departmentFormItem.id,
        status: Number(this.departmentFormItem.status)
      });
      if (res.code === 1) {
        this.$Message.success("变更成功");
        this.modal = false;
        this.$parent.$parent.$parent.modalType = "";
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
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
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-col {
  margin-bottom: 5px;
}
</style>
