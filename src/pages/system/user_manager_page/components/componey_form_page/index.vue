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
              clearable
              placeholder="请选择类型"
              :disabled="!formDisabled"
            >
              <Option
                v-for="item in getDirObj['COLLECT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" v-show="formDisabled">
          <FormItem label="上级机构:" span="4" prop="parentUuid">
            <Select
              size="small"
              v-model="componeyFormItem.parentUuid"
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
          <RadioGroup v-model="componeyFormItem.status" id="radio" span="4">
            <Radio :label="1">有效</Radio>
            <Radio :label="0">无效</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button type="ghost" size="small" @click="cancel">取消</Button>
          <Button type="primary" size="small" @click="ok">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { collect_company_update, collect_user_list, collect_status_change } from "@/service/getData";
import sysDictionary from "@/mixin/sysDictionary";
export default {
  mixins: [sysDictionary],
  props: ['parentData'],
  data() {
    return {
      getDirList: ["COLLECT_TYPE"],
      getDirObj: {},
      formDisabled: "",
      modal: false,
      status: "0",
      componeyFormItem: {
        name: "",
        area: "",
        areaCity: '',
        areaProvince:'',
        collectType: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        remark: "",
        parentUuid: "",
        status: 1,
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
  created () {
    console.log(this.parentData)
    this.collect_user_list();
    this.componeyFormItem = this.parentData.nodeData;
  },
  watch: {
    parentData() {
      this.componeyFormItem = this.parentData.nodeData;
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
    // 恢复表单的不可用状态
    cancelStatus() {
      this.formDisabled = false;
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.collect_company_update();
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 查询上级机构
    async collect_user_list(id, type) {
      const res = await collect_user_list({
        status: "1",
        leafType: "01"
      });
      console.log(res);
      if (res.code === 1) {
        this.organizationList = res.data.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 更新公司信息接口
    async collect_company_update() {
      this.componeyFormItem.createTime = null;
      this.componeyFormItem.updateTime = null;
      const res = await collect_company_update({
        ...this.componeyFormItem,
      });
      if (res.code === 1) {
        this.$Message.success("修改成功");
        this.$parent.$parent.$parent.getList("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 状态变更接口
    async collect_status_change() {
      const res = await collect_status_change({
        id: this.componeyFormItem.id,
        status: Number(this.componeyFormItem.status)
      });
      if (res.code === 1) {
        this.$Message.success("变更成功");
        this.modal = false;
        this.$parent.$parent.$parent.getList("#", "01");
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
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
