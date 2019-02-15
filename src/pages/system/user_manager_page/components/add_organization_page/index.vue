<template>
  <div class="panel_list">
    <Card class="vue-panel detail-card">
      <p slot="title" v-if="parentData.type === '0'">新增机构</p>
      <p slot="title" v-if="parentData.type === '01'">新增公司</p>
      <p slot="title" v-if="parentData.type === '02'">新增部门</p>
      <!-- 新增机构表单 -->
      <Form
        ref="organizationFormItem"
        :model="organizationFormItem"
        :label-width="90"
        :rules="ruleValidate"
        v-show="parentData.type === '0'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="机构名称:" prop="name">
            <Input size="small" clearable v-model="organizationFormItem.name" placeholder="请输入机构名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
          <FormItem label="机构负责人:" span="6" prop='userIds'>
            <Select
              size="small"
              v-model="organizationFormItem.userIds"
              filterable
              clearable
              multiple
              placeholder="请选择机构负责人"
            >
              <Option
                v-for="item in bossList"
                :value="item.uuid"
                :key="item.uuid"
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
              v-model="organizationFormItem.remark"
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
              @click="handleSubmit(parentData.type,'organizationFormItem')"
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
        v-show="parentData.type === '01'"
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
              clearable
              placeholder="请选择类型"
            >
              <Option
                v-for="item in getDirObj['COLLECT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="上级机构:" span="4" prop="parentUuid">
            <Input size="small" v-model="componeyFormItem.parentName" disabled></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="地区:">
            <Cascader :data="areaList" v-model="componeyFormItem.area" size="small" :load-data="loadData" @on-change='areaSelect'></Cascader>
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
              @click="handleSubmit(parentData.type,'componeyFormItem')"
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
        v-show="parentData.type === '02'"
      >
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem span="4" label="部门名称:" prop="name">
            <Input size="small" clearable v-model="departmentFormItem.name" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <FormItem label="上级机构:" span="4" prop="organization">
            <Input size="small" v-model="departmentFormItem.organization" disabled></Input>
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
              @click="handleSubmit(parentData.type,'departmentFormItem')"
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
import tablePage from "@/mixin/tablePage";
import sysDictionary from "@/mixin/sysDictionary";
import {
  collect_section_add,
  collect_outfit_add,
  collect_company_add,
  collect_list_leader,
  sysarea_getAreaByParentId,
  sysarea_getAreaProvience
} from "@/service/getData";
export default {
  // data: {
  //   prop: "parentData",
  //   event: "passBack"
  // },
  props: ["parentData"],
  mixins: [sysDictionary, tablePage],
  data() {
    return {
      getDirList: ["COLLECT_TYPE"],
      getDirObj: {},
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
        userIds: [],
        remark: "",
        status: "1"
      },
      componeyFormItem: {
        leafType: "02",
        name: "",
        area: [],
        areaProvince: "",
        areaCity: "",
        collectType: "",
        remark: "",
        parentUuid: "",
        parentName: "",
        status: "1"
      },
      departmentFormItem: {
        name: "",
        organization: "",
        remark: "",
        parentUuid: ""
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
        userIds: [
          {
            required: true,
            message: "请选择机构负责人",
            type: "array"
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
      bossList: [],
      areaList: [],
    };
  },
  created() {
    this.collect_list_leader();
    this.sysarea_getAreaProvience();
    console.log(this.parentData);
    switch (this.parentData.type) {
      case "01":
        this.componeyFormItem = {
          parentUuid: this.parentData.nodeData.id,
          parentName: this.parentData.nodeData.name
        };
        break;
      case "02":
        this.departmentFormItem = {
          organization: this.parentData.nodeData.name,
          parentUuid: this.parentData.nodeData.id
        };
    }
  },
  watch: {
    parentData() {
      console.log(this.parentData);
      switch (this.parentData.type) {
        case "01":
          this.componeyFormItem = {
            parentUuid: this.parentData.nodeData.id,
            parentName: this.parentData.nodeData.name
          };
          break;
        case "02":
          this.departmentFormItem = {
            organization: this.parentData.nodeData.name,
            parentUuid: this.parentData.nodeData.id
          };
      }
    }
  },
  methods: {
    loadData (item, callback) {
      console.log(item)
      item.loading = true;
      this.sysarea_getAreaByParentId(item,callback);
    },
    // 地区选择后的回调
    areaSelect(value, selectedData) {
      console.log(value, '-----', selectedData);
      this.componeyFormItem.areaProvince = value[0];
      this.componeyFormItem.areaCity = value[1];
    },
    cancelStatus() {
      console.log(this.$parent);
      this.$parent.roleModal = false;
    },
    // 提交保存修改
    handleSubmit(type, name) {
      console.log(type);
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          // this.$Message.success("ok");
          switch (type) {
            case "0":
              this.collect_section_add();
              break;
            case "01":
              this.collect_company_add();
              break;
            case "02":
              this.collect_outfit_add();
              break;
          }
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 添加机构
    async collect_section_add() {
      // this.organizationFormItem.userIds = JSON.stringify(
      //   this.organizationFormItem.userIds
      // );
      const res = await collect_section_add(this.organizationFormItem);
      if (res.code === 1) {
        this.$Message.success("添加成功");
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 添加公司
    async collect_company_add(id, type) {
      const res = await collect_company_add({
        ...this.componeyFormItem,
        status: "1"
      });
      if (res.code === 1) {
        this.$Message.success("添加成功");
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 添加部门
    async collect_outfit_add(id, type) {
      const res = await collect_outfit_add({
        ...this.departmentFormItem,
        status: "1",
      });
      if (res.code === 1) {
        this.$Message.success("添加成功");
        this.$parent.$parent.$parent.collect_tree_children("#", "01");
      } else {
        this.$Message.error(res.message);
      }
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
    // 获取地区市级接口
    async sysarea_getAreaByParentId(item, callback) {
      const res = await sysarea_getAreaByParentId({
        parentId: item.id,
      });
      if (res.code === 1) {
        // this.areaList = res.data;
        item.children = res.data;
        item.children.forEach(ele => {
          ele.value = ele.id;
          ele.label = ele.name;
        });
        item.loading = false;
        callback();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取地区省级接口
    async sysarea_getAreaProvience() {
      const res = await sysarea_getAreaProvience();
      if (res.code === 1) {
        this.areaList = res.data;
        this.areaList.forEach(item => {
          item.value = item.id;
          item.label = item.name;
          item.loading = false;
          item.children = [];
        });
        console.log(this.areaList);
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
  .detail-card {
    .ivu-form {
      min-height: 250px;
    }
  }
}
</style>
