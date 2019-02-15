<template>
  <div class="panel_list">
    <Row :gutter="8" class="detail-row">
      <Col span="12" class="form-col">
        <!-- 检索条件 -->
        <Card class="vue-panel">
          <p slot="title" @click="showPanel=!showPanel">
            <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
          </p>
          <Form
            v-if="!showPanel"
            ref="formItem"
            :model="formItem"
            :label-width="95"
            :rules="ruleValidate"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="产品线:" prop="prodTypeList">
                  <Select
                    size="small"
                    clearable
                    placeholder="请选择产品线"
                    v-model="formItem.prodTypeList"
                  >
                    <Option
                      v-for="item in getDirObj.DIVIDE_PROD_TYPE"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="产品期数:">
                  <Select
                    size="small"
                    multiple
                    clearable
                    placeholder="请选择产品期数"
                    v-model="formItem.perdCountList"
                  >
                    <Option
                      v-for="item in getDirObj.DIVIDE_PROD_CNT"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="到期期数:">
                  <Select
                    size="small"
                    multiple
                    clearable
                    placeholder="请选择到期期数"
                    v-model="formItem.perdThisCountList"
                  >
                    <Option
                      v-for="item in getDirObj.DIVIDE_PROD_NUM"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="逾期天数:">
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovdudaysMin">
                      <Input
                        size="small"
                        type="text"
                        number
                        clearable
                        v-model="formItem.ovdudaysMin"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                    <div class="text-center">-</div>
                  </Col>
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovdudaysMax">
                      <Input
                        size="small"
                        number
                        type="text"
                        clearable
                        v-model="formItem.ovdudaysMax"
                      ></Input>
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="逾期应还金额:">
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMin">
                      <Input size="small" clearable v-model="formItem.ovduamtMin" number></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                    <div class="text-center">-</div>
                  </Col>
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMax">
                      <Input size="small" clearable v-model="formItem.ovduamtMax" number></Input>
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="信用级别:">
                  <Select
                    size="small"
                    multiple
                    clearable
                    placeholder="请选择信用级别"
                    v-model="formItem.creditLevelList"
                  >
                    <Option
                      v-for="item in getDirObj.DIVIDE_CREDIT_LEVEL"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
                <FormItem span="6" label="分配方式:" prop="allotType">
                  <RadioGroup v-model="formItem.allotType">
                    <Radio
                      :label="item.itemCode"
                      v-for="item in getDirObj.ALLOT_TYPE"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="接收人员:" prop="allotNameList">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.allotNameList"
                    placeholder="请选择接收人员"
                    disabled
                  ></Input>
                  <Button
                    type="primary"
                    @click="selectTreeNode"
                    style="width:80px"
                    long
                    size="small"
                  >选择</Button>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="有效时间:" prop="date">
                  <DatePicker
                    v-model="formItem.date"
                    format="yyyy-MM-dd"
                    type="daterange"
                    placeholder="请选择有效时间"
                    size="small"
                    style="width: 300px"
                    @on-change="dateChange"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
                <FormItem>
                  <Button
                    type="primary"
                    @click="handleSubmit('formItem', submitType)"
                    style="width:80px"
                    long
                    size="small"
                  >分配</Button>
                  <Button
                    size="small"
                    type="ghost"
                    style="width:80px;margin-left: 8px"
                    @click="handleCancel('formItem')"
                  >取消</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span="12" class="tree-col" v-if="treeFlag">
        <Card class="vue-panel">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>树结构
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            multiple
            show-checkbox
            @on-select-change="selectNode"
            @on-check-change="checkChange"
          ></Tree>
          <div>
            <Button type="ghost" size="small" @click="cancel()">取消</Button>
            <Button type="primary" size="small" @click="ok()">确定</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import formValidateFun from "@/mixin/formValidateFun";
import sysDictionary from "@/mixin/sysDictionary";
import {
  divide_rules_add,
  divide_rules_edit,
  divide_rules_save,
  collect_tree_children,
  collect_show_children
} from "@/service/getData";
export default {
  name: "case_add_distribute_page",
  mixins: [formValidateFun, sysDictionary],
  data() {
    const validate_money_start = (rule, value, callback) => {
      if (
        value &&
        this.formItem.ovduamtMax &&
        Number(value) > Number(this.formItem.ovduamtMax)
      ) {
        callback(new Error("逾期应还开始金额不能大于逾期应还结束金额"));
      } else {
        callback();
      }
    };
    const validate_money_end = (rule, value, callback) => {
      if (this.formItem.ovduamtMin) {
        this.$refs.formItem.validateField("ovduamtMin");
      }
      callback();
    };
    const validate_day_start = (rule, value, callback) => {
      if (
        value &&
        this.formItem.ovdudaysMax &&
        Number(value) > Number(this.formItem.ovdudaysMax)
      ) {
        console.log(this.formItem.ovdudaysMax);
        callback(new Error("逾期开始天数不能大于逾期结束天数"));
      } else {
        callback();
      }
    };
    const validate_day_end = (rule, value, callback) => {
      if (this.formItem.ovdudaysMin) {
        this.$refs.formItem.validateField("ovdudaysMin");
      }
      callback();
    };
    const validator_array = (rule, value, callback) => {
      console.log(value)
      if (value.length === 0) {
        callback();
      }
    }
    return {
      getDirList: [
        "DIVIDE_PROD_NUM",
        "DIVIDE_PROD_TYPE",
        "DIVIDE_PROD_CNT",
        "DIVIDE_CREDIT_LEVEL",
        "CASE_HANDLE_STATUS",
        "ALLOT_TYPE"
      ],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      treeFlag: false,
      submitType: 1, //提交类型 1添加，2修改
      ruleId: "",
      allotRoleIdList: [],
      ruleValidate: {
        prodTypeList: [
          {
            required: true,
            type: "string",
            message: "请选择产品线",
          }
        ],
        allotType: [
          {
            required: true,
            message: "请选择分配方式",
            trigger: "change",
            type: "string"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择有效时间",
            type: "array",
          }
        ],
        allotNameList: [
          {
            required: true,
            message: "请选择接收人员",
            trigger: "blur",
            type: "array"
          }
        ],
        ovdudaysMin: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            type: "number"
          },
          {
            validator: validate_day_start,
            trigger: "blur"
          }
        ],
        ovdudaysMax: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            type: "number"
          },
          {
            validator: validate_day_end,
            trigger: "blur"
          }
        ],
        ovduamtMin: [
          {
            pattern: this.GLOBAL.money,
            message: "金额格式不正确",
            type: "number"
          },
          {
            validator: validate_money_start,
            trigger: "blur"
          }
        ],
        ovduamtMax: [
          {
            pattern: this.GLOBAL.money,
            message: "金额格式不正确",
            type: "number"
          },
          {
            validator: validate_money_end,
            trigger: "blur"
          }
        ]
      },
      formItem: {
        prodTypeList: '',
        perdCountList: '',
        perdThisCountList: '',
        ovdudaysMin: "",
        ovdudaysMax: "",
        ovduamtMin: "",
        ovduamtMax: "",
        allotType: "",
        creditLevelList: '',
        allotNameList: [],
        effectMinDt: "",
        effectMaxDt: "",
        date: []
      },
      data5: []
    };
  },
  created() {
    // var selAddEle = {itemName: '全部',itemCode: '99'};
    // this.initTree("", "01");
    if (this.$route.name === "case_update_distribute_page") {
      this.submitType = 2;
      let itemNode = JSON.parse(
        window.sessionStorage.getItem("case_rule_item")
      );
      // this.formItem.prodTypeList = itemNode.prodType;
      this.ruleId = itemNode.id;
      console.log(itemNode);
      this.divide_rules_edit();
    }
    this.collect_show_children();
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "94%",
            boxSizing: "border-box"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: ""
              },
              style: {
                marginRight: "4px"
              }
            }),
            h(
              "span",
              {
                props: {},
                style: {
                  cursor: "pointer"
                },
                class: "tree_title",
                on: {
                  click: e => {}
                }
              },
              data.name
            )
          ])
        ]
      );
    },
    // 勾选节点的回调函数
    checkChange(arr) {
      console.log(arr);
      this.allotRoleIdList = [];
      this.formItem.allotNameList = [];
      arr.forEach(item => {
        if (item.leafType === "04") {
          this.allotRoleIdList.push(item.id);
          this.formItem.allotNameList.push(item.name);
        }
      });
      console.log(this.formItem.allotNameList);
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node);
    },
    // 取消回退
    handleCancel() {
      window.history.go(-1);
    },
    // 分配提交
    handleSubmit(name, type) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          if (type === 1) {
            this.divide_rules_add();
          } else {
            this.divide_rules_save();
          }
          console.log(this.formItem);
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 点击出现tree
    selectTreeNode() {
      console.log(12313);
      this.treeFlag = true;
    },
    // tree取消回调
    cancel() {
      this.treeFlag = false;
      this.formItem.allotNameList = [];
    },
    // tree确定回调
    ok() {
      this.treeFlag = false;
    },
    // 选择日期回调
    dateChange(arr) {
      console.log(arr);
      this.formItem.effectMinDt = arr[0];
      this.formItem.effectMaxDt = arr[1];
    },
    // 获取init tree数据
    async initTree(id, type) {
      const res = await collect_tree_children({
        status: "1"
      });
      console.log();
      if (res.code === 1) {
        this.data5 = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取人员列表
    async collect_show_children() {
      const res = await collect_show_children({
        status: 1,
        ids: this.allotRoleIdList
      });
      console.log(res);
      if (res.code === 1) {
        this.data5 = res.data;
      } else {
      }
    },
    // 添加案件接口
    async divide_rules_add() {
      const res = await divide_rules_add({
        ...this.formItem,
        allotRoleIdList: this.allotRoleIdList
      });
      if (res.code === 200) {
        console.log(res);
        this.$Message.success(res.message);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查询当前分案规则详情接口
    async divide_rules_edit() {
      const res = await divide_rules_edit({ id: this.ruleId });
      console.log(res);
      if (res.code === 1) {
        this.formItem.prodTypeList = res.data.prodTypeList;
        this.formItem.perdCountList = res.data.perdCountList;
        this.formItem.perdThisCountList = res.data.perdThisCountList;
        this.formItem.creditLevelList = res.data.creditLevelList;
        this.formItem.ovduamtMax = res.data.ovduamtMax;
        this.formItem.ovduamtMin = res.data.ovduamtMin;
        this.formItem.ovdudaysMax = res.data.ovdudaysMax;
        this.formItem.ovdudaysMin = res.data.ovdudaysMin;
        this.formItem.effectMaxDt = res.data.effectMaxDt;
        this.formItem.effectMinDt = res.data.effectMinDt;
        this.formItem.allotNameList = res.data.allotNameList;
        this.formItem.id = res.data.id;
        this.formItem.allotType = res.data.allotType;
        this.allotRoleIdList = res.data.allotRoleIdList;
        if (res.data.effectMaxDt && res.data.effectMinDt) {
          this.formItem.date = [];
          this.formItem.date.push(res.data.effectMinDt);
          this.formItem.date.push(res.data.effectMaxDt);
          console.log(this.formItem.date)
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 保存修改分案规则接口
    async divide_rules_save() {
      const res = await divide_rules_save({
        ...this.formItem,
        allotRoleIdList: this.allotRoleIdList
      });
      if (res.code === 1) {
        this.$Message.success("修改成功");
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

