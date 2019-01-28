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
                    multiple
                    clearable
                    placeholder="请选择产品线"
                    v-model="formItem.prodTypeList"
                  >
                    <Option
                      v-for="item in getDirObj.PROD_TYPE"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="产品期数:" prop="perdCountList">
                  <Select
                    size="small"
                    multiple
                    clearable
                    placeholder="请选择产品期数"
                    v-model="formItem.perdCountList"
                  >
                    <Option
                      v-for="item in getDirObj.PROD_CNT"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="到期期数:" prop="perdThisCountList">
                  <Select
                    size="small"
                    multiple
                    clearable
                    placeholder="请选择到期期数"
                    v-model="formItem.perdThisCountList"
                  >
                    <Option
                      v-for="item in getDirObj.PROD_CNT"
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
                      <Input size="small" clearable v-model="formItem.ovduamtMin"></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                    <div class="text-center">-</div>
                  </Col>
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMax">
                      <Input size="small" clearable v-model="formItem.ovduamtMax"></Input>
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="信用级别:" prop="creditLevelList">
                  <Select
                    size="small"
                    multiple
                    clearable
                    placeholder="请选择信用级别"
                    v-model="formItem.creditLevelList"
                  >
                    <Option
                      v-for="item in getDirObj.CREDIT_LEVEL"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
                <FormItem span="6" label="案件状态:" prop="allotType">
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
                <FormItem span="6" label="接收人员:" prop="allotRoleIdList">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.allotRoleIdList"
                    placeholder="请选择接收人员"
                    disabled
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="有效时间:" prop="date">
                  <DatePicker
                    v-model='formItem.date'
                    format="yyyy-MM-dd"
                    type="daterange"
                    placeholder="请选择有效时间"
                    size='small'
                    style="width: 300px"
                    @on-change='dateChange'
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
                <FormItem>
                  <Button
                    type="primary"
                    @click="handleSubmit('formItem')"
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
      <Col span="12" class="tree-col">
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
            <Button type="ghost" size="small" @click="cancel('2')">取消</Button>
            <Button type="primary" size="small" @click="ok('2')">确定</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import formValidateFun from "@/mixin/formValidateFun";
import sysDictionary from "@/mixin/sysDictionary";
import { divide_rules_add, divide_rules_edit, divide_rules_save } from "@/service/getData";
export default {
  name: "case_add_distribute_page",
  mixins: [formValidateFun, sysDictionary],
  data() {
    return {
      getDirList: [
        "PROD_TYPE",
        "PROD_CNT",
        "CREDIT_LEVEL",
        "CASE_HANDLE_STATUS",
        "ALLOT_TYPE"
      ],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      submitType: 1,//提交类型 1添加，2修改
      ruleValidate: {
        prodTypeList: [
          {
            required: true,
            type: "array",
            message: "请选择产品线"
          }
        ],
        allotType: [
          {
            required: true,
            message: "请选择分配方式",
            trigger: "change",
            type: 'string'
          }
        ],
        date: [
          {
            required: true,
            message: "请选择有效时间",
            type: 'array'
          }
        ],
        allotRoleIdList: [
          {
            required: false,
            message: "请选择接收人员",
            trigger: "blur",
            type: 'array'
          }
        ],
        ovdudaysMin: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            type: 'string',
          },
          {
            validator: this.validate_yqts_start,
            trigger: "blur"
          }
        ],
        ovdudaysMax: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            type: 'string'
          },
          {
            validator: this.validate_yqts_end,
            trigger: "blur"
          }
        ],
        ovduamtMin: [
          {
            pattern: this.GLOBAL.money,
            message: "金额格式不正确",
            type: 'string'
          },
          {
            validator: this.validate_yqyhje_start,
            trigger: "blur"
          }
        ],
        ovduamtMax: [
          {
            pattern: this.GLOBAL.money,
            message: "金额格式不正确",
            type: 'string'
          },
          {
            validator: this.validate_yqyhje_end,
            trigger: "blur"
          }
        ]
      },
      formItem: {
        prodTypeList: "",
        perdCountList: [],
        perdThisCountList: [],
        ovdudaysMin: "",
        ovdudaysMax: "",
        ovduamtMin: "",
        ovduamtMax: "",
        allotType: "",
        creditLevelList: [],
        allotRoleIdList: [1],
        effectMinDt: '',
        effectMaxDt: '',
        date: [],
      },
      data5: []
    };
  },
  created () {
    console.log(this.$route.name);
    if (this.$route.name === 'case_update_distribute_page') {
      this.submitType = 2;
      this.formItem = JSON.parse(window.sessionStorage.getItem('case_rule_item'));
      console.log(this.formItem);
    }
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
              data.text
            )
          ])
        ]
      );
    },
    // 勾选节点的回调函数
    checkChange(arr) {
      console.log(this.arr);
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          console.log(this.formItem);
          this.$Message.success("ok");
          this.divide_rules_add();
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 选择日期回调
    dateChange(arr) {
      console.log(arr);
      this.formItem.effectMinDt = arr[0];
      this.formItem.effectMaxDt = arr[1];
    },
    // 添加案件接口
    async divide_rules_add() {
      const res = await divide_rules_add(this.formItem);
      if (res.code === 1) {
        console.log(res);
        this.$Message.success(res.message);
      } else {
        this.$Message.error(res.message);
      }
    },
  }
};
</script>

<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>

