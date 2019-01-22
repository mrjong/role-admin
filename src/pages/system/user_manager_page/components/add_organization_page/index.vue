<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title" v-if="type === '0'">新增机构</p>
      <p slot="title" v-if="type === '1'">新增公司</p>
      <p slot="title" v-if="type === '2'">新增部门</p>
      <!-- 新增机构表单 -->
      <Form
        ref="organizationFormItem"
        :model="organizationFormItem"
        :label-width="90"
        :rules="ruleValidate"
        v-show="type === '0'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="机构名称:" prop="name">
            <Input size="small" clearable v-model="organizationFormItem.name" placeholder="请输入机构名称"></Input>
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
              v-model="organizationFormItem.updateTime"
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
              @click="handleSubmit('formItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>

      <!-- 新增公司表单 -->
      <Form
        ref="componeyFormItem"
        :model="componeyFormItem"
        :label-width="90"
        :rules="ruleValidate2"
        v-show="type === '1'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="公司名称:" prop="name">
            <Input size="small" clearable v-model="componeyFormItem.name" placeholder="请输入公司名称"></Input>
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
          <FormItem label="上级机构:" span="4" prop="organization">
            <Select
              size="small"
              v-model="componeyFormItem.organization"
              filterable
              clearable
              placeholder="请选择上级机构"
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
            <Cascader :data="data" trigger="hover" v-model="componeyFormItem.area" size="small"></Cascader>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="20" span="4">
          <FormItem span="4" label="说明:">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model="componeyFormItem.remark"
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
              @click="handleSubmit('componeyFormItem')"
              style="width:80px"
              long
              size="small"
            >确定</Button>
          </FormItem>
        </Col>
      </Form>

      <!-- 新增部门表单 -->
      <Form
        ref="departmentFormItem"
        :model="departmentFormItem"
        :label-width="90"
        :rules="ruleValidate3"
        v-show="type === '2'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="部门名称:" prop="name">
            <Input size="small" clearable v-model="departmentFormItem.name" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="上级机构:" span="4" prop="organization">
            <Select
              size="small"
              v-model="departmentFormItem.organization"
              filterable
              clearable
              placeholder="请选择上级机构"
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
              v-model="departmentFormItem.remark"
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
              @click="handleSubmit('departmentFormItem')"
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
  props: ["type"],
  data() {
    return {
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ],
      organizationFormItem: {
        name: "",
        person: "",
        remark: ""
      },
      componeyFormItem: {
        name: "",
        area: [],
        collectType: "",
        remark: "",
        organization: ""
      },
      departmentFormItem: {
        name: "",
        organization: "",
        remark: ""
      },
      ruleValidate3: {
        name: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur"
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
      ruleValidate2: {
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
    cancelStatus() {
      console.log(this.$parent);
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
