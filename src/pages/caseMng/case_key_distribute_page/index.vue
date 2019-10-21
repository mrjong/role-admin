<template>
  <div class="panel_list">
    <Row :gutter="0" class="key_distribute_row">
      <!-- 左边表单 -->
      <Col :span="initFlag? '24': remoneyRateFlag?'8':'12'" class="form-col">
        <!-- 检索条件 -->
        <Card class="vue-panel" :style="{height: screenHeight - 10 + 'px'}">
          <p slot="title" @click="showPanel=!showPanel">
            <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
          </p>
          <Form
            v-if="!showPanel"
            ref="formItem"
            :model="formItem"
            :label-width="95"
            :rules="ruleValidate"
            :style="{'width': initFlag? '60%': '100%', margin: initFlag?'0 auto': '0'}"
          >
            <Row>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6" style="margin: 0 auto">
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
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
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
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
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
              <FormItem span="6" label="电催中心:">
                <Select
                  size="small"
                  clearable
                  multiple
                  placeholder="请选择电催中心"
                  @on-change="companyChange"
                  v-model="formItem.searchCompanyIds"
                >
                  <Option
                    v-for="item in company_list_data"
                    :value="item.id"
                    :key="item.id"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
              <FormItem span="6" label="组别:">
                <Select
                  size="small"
                  clearable
                  multiple
                  @on-change="departmentChange"
                  placeholder="请选择组别"
                  v-model="formItem.searchDepartmentIds"
                >
                  <Option
                    v-for="item in department_list_data"
                    :value="item.id"
                    :key="item.id"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
              <FormItem label="经办人:">
                <Select
                  size="small"
                  clearable
                  multiple
                  placeholder="请选择经办人"
                  v-model="formItem.searchPersonIds"
                >
                  <Option
                    v-for="(item,index) in collect_list_data"
                    :value="item.id"
                    :key="item.id + index"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
                <FormItem label="逾期天数:">
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovdudaysMin">
                      <Input
                        size="small"
                        number
                        type="number"
                        clearable
                        v-model.trim="formItem.ovdudaysMin"
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
                        type="number"
                        clearable
                        v-model.trim="formItem.ovdudaysMax"
                      ></Input>
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
                <FormItem label="逾期应还金额:">
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMin">
                      <Input size="small" clearable number v-model.trim="formItem.ovduamtMin"></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                    <div class="text-center">-</div>
                  </Col>
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMax">
                      <Input size="small" clearable number v-model.trim="formItem.ovduamtMax"></Input>
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
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
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
                <Col
                  :xs="11"
                  :sm="11"
                  :md="remoneyRateFlag?11:8"
                  :lg="remoneyRateFlag?11:8"
                  span="10"
                >
                  <FormItem>
                    <Button
                      type="primary"
                      @click="handleQueryCases('formItem')"
                      style="width:80px"
                      long
                      size="small"
                    >查询案件量</Button>
                  </FormItem>
                </Col>
                <Col
                  :xs="11"
                  :sm="11"
                  :md="remoneyRateFlag?11:8"
                  :lg="remoneyRateFlag?11:8"
                  span="10"
                >
                  <FormItem>
                    <div class="casesWrap" style="width: 100px;">{{totalcases}}条案件</div>
                  </FormItem>
                </Col>
              </Col>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
                <FormItem span="6" label="分配方式:" prop="allotType">
                  <!-- <RadioGroup v-model="formItem.allotType">
                    <Radio
                      :label="item.itemCode"
                      v-for="item in getDirObj.ALLOT_TYPE"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Radio>
                  </RadioGroup>-->
                  <Select
                    size="small"
                    clearable
                    placeholder="请选择分配方式"
                    v-model="formItem.allotType"
                    @on-change="allotTypeChange"
                  >
                    <Option
                      v-for="item in getDirObj.ALLOT_TYPE"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
                </FormItem>
                <Col :md="24" :lg="24" span="10" v-if="formItem.allotType === '03'">
                  <!-- <FormItem>
                    <div style="font-size: 16px;">请设置分配参数</div>
                  </FormItem>-->
                  <FormItem span="10" label="逾期天数:">
                    <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                      <Input size="small" disabled :value="3"></Input>
                    </Col>
                    <Col :xs="11" :sm="11" :md="2" :lg="2" span="2">
                      <div class="text-center">-</div>
                    </Col>
                    <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                      <Input size="small" disabled :value="3"></Input>
                    </Col>
                  </FormItem>
                  <FormItem span="10" label="案件比例上限:">
                    <Input size="small" disabled :value="2.5"></Input>
                  </FormItem>
                </Col>
              </Col>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
                <FormItem span="6" label="接收人员:" prop="allotNameList">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.allotNameList.toString()"
                    placeholder="请选择接收人员"
                    disabled
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="initFlag?24:16" :lg="initFlag?24:16" span="6">
                <FormItem span="6">
                  <Button
                    type="primary"
                    @click="selectTreeNode(0)"
                    style="width:80px"
                    long
                    size="small"
                  >选择人员</Button>
                  <Button
                    type="primary"
                    @click="selectTreeNode(1)"
                    style="width:80px;margin-left: 10px;"
                    long
                    size="small"
                    v-if="formItem.allotType !=='03'"
                  >选择公司</Button>
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
                    :loading="allot_loading"
                  >
                    <span v-if="!allot_loading">分配</span>
                    <span v-else>分配中...</span>
                  </Button>
                  <Button
                    size="small"
                    style="width:80px;margin-left: 8px"
                    @click="handleCancel('formItem')"
                  >取消</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <!-- 中间tree -->
      <Col :span="remoneyRateFlag?'8':'12'" v-if="treeFlag === 0">
        <Card class="vue-panel" :style="{height: screenHeight - 10 + 'px'}">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>人员组织树
          </p>
          <Tree
            :data="data5"
            class="case_rule_tree"
            :render="renderContent"
            multiple
            v-if="treeFlag === 0"
            show-checkbox
            :style="{height: screenHeight - 100 + 'px', 'overflow-y': 'auto','margin-bottom': '10px'}"
            @on-select-change="selectNode"
            @on-check-change="checkChangePerson"
          ></Tree>
          <div>
            <Button size="small" @click="cancel()">取消</Button>
            <Button type="primary" size="small" @click="ok()">确定</Button>
          </div>
        </Card>
      </Col>
      <Col :span="remoneyRateFlag?'8':'12'" v-if="treeFlag === 1">
        <Card class="vue-panel" :style="{height: screenHeight - 10 + 'px'}">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>公司组织树
          </p>
          <Tree
            class="case_rule_tree"
            :data="data"
            :render="renderContent2"
            multiple
            v-if="treeFlag === 1"
            show-checkbox
            :style="{height: screenHeight - 100 + 'px', 'overflow-y': 'auto', 'margin-bottom': '10px'}"
            @on-select-change="selectNode"
            @on-check-change="checkChangeOrz"
          ></Tree>
          <div>
            <Button size="small" @click="cancel()">取消</Button>
            <Button type="primary" size="small" @click="ok()">确定</Button>
          </div>
        </Card>
      </Col>
      <!-- 右边催收人员回款率card -->
      <Col :span="remoneyRateFlag?'8':'0'" v-if="remoneyRateFlag">
        <Card class="vue-panel" :style="{height: screenHeight -10 + 'px'}">
          <p slot="title">催收人员回款率</p>
          <Form
            ref="remoneyRateForm"
            :model="remoneyRateForm"
            :label-width="120"
            class="remoney_rate_form"
            :style="{maxHeight: screenHeight - 90 + 'px', 'overflow-y': 'auto'}"
          >
            <FormItem
              v-for="(item, index) in remoneyRateForm.staffList"
              :key="index"
              :label="item.opUserName+':'"
              :prop="'staffList.'+index+'.collectRate'"
              :rules="[{required: true, message: '回款率不能为空'},{ message: '回款率只能是数字', trigger:'blur', pattern:/^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/,},{ trigger:'blur', max: 100, message: '回款率最大为100%'}]"
              style="margin-bottom: 8px"
            >
              <Row>
                <Col span="18">
                  <Input
                    text="number"
                    number
                    size="small"
                    v-model="item.collectRate"
                    placeholder="请输入回款率"
                    style="display: inline-block; width: 85%"
                    @on-blur="rateBlur(index, item.collectRate)"
                  ></Input>%
                </Col>
                <!-- <Col span="4" offset="1">
                  <Button @click="handleRemove(index)">Delete</Button>
                </Col>-->
              </Row>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import formValidateFun from "@/mixin/formValidateFun";
import sysDictionary from "@/mixin/sysDictionary";
import qs from "qs";
import {
  divide_allot_manual,
  collect_tree_children,
  collect_show_children,
  allot_manualcounts,
  allot_divideCollectRate,
  collect_getLeafTypeListByIds
} from "@/service/getData";
export default {
  name: "case_key_distribute_page",
  mixins: [formValidateFun, sysDictionary],
  data() {
    const remoney_rate_max = (rule, value, callback) => {
      if (Number(value) > 100) {
        callback(new Error("回款率不能大于100%"));
      }
      callback();
    };
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
      if (Number(value) > 999) {
        callback(new Error("逾期天数不能大于999天"));
      }
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
      if (Number(value) > 999) {
        callback(new Error("逾期天数不能大于999天"));
      }
      if (this.formItem.ovdudaysMin) {
        this.$refs.formItem.validateField("ovdudaysMin");
      }
      callback();
    };
    return {
      getDirList: [
        "DIVIDE_PROD_TYPE",
        "DIVIDE_PROD_CNT",
        "DIVIDE_CREDIT_LEVEL",
        "CASE_HANDLE_STATUS",
        "ALLOT_TYPE",
        "DIVIDE_PROD_NUM"
      ], //s数据字典传的字段
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      screenHeight: 0, //屏幕高度
      allot_loading: false, //分配按钮loading
      totalcases: "0", //案件总数
      treeFlag: "", //0 人员树 1 组织树
      remoneyRateFlag: false, //回款率flag
      initFlag: true, //初始化flag
      divideRuleUserVos: [], //汇款率接口参数list
      allotRoleIdList: [], //人员角色idlist
      allotNameList: [], //人员名字list
      // 一键分案的表单
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
        allotNameList: []
      },
      //催收员回款率的表单
      remoneyRateForm: {
        staffList: []
      },
      ruleValidate: {
        prodTypeList: [
          {
            required: true,
            type: "string",
            message: "请选择产品线"
          }
        ],
        allotType: [
          {
            required: true,
            message: "请选择分配方式",
            trigger: "change"
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
            trigger: "blur"
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
            trigger: "blur"
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
            trigger: "blur"
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
            trigger: "blur"
          },
          {
            validator: validate_money_end,
            trigger: "blur"
          }
        ]
      },
      data5: [],
      data: []
    };
  },
  created() {
    let clientHeight = document.documentElement.clientHeight;
    let bodyHeight = document.body.clientHeight;
    this.$set(this, "screenHeight", clientHeight);
    console.log(this.formItem);
    this.getLeafTypeList('02', []);
    this.getLeafTypeList('03', []);
    this.getLeafTypeList('04', []);
  },
  destroyed() {
    window.sessionStorage.removeItem("collectRate");
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "90%",
            boxSizing: "border-box"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: data.leafType === "04" ? "md-person" : "md-home"
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
    renderContent2(h, { root, node, data }) {
      console.log(data);
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "90%",
            boxSizing: "border-box"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: data.leafType === "04" ? "md-person" : "md-home"
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

    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await collect_getLeafTypeListByIds({
        leafType: type,
        parentIds: parent || []
      });
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.company_list_data = res.data;
            break;
          case "03":
            this.department_list_data = res.data;
            break;
          case "04":
            this.collect_list_data = res.data;
            break;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 勾选人组织树节点的回调函数
    checkChangePerson(arr) {
      console.log(arr);
      this.allotRoleIdList = [];
      this.formItem.allotNameList = [];
      this.divideRuleUserVos = [];
      let stallObj = {};
      arr.forEach(item => {
        if (item.leafType === "04") {
          stallObj = {
            opRoleUuid: item.id,
            opUserUuid: item.userUuid,
            opUserName: item.name,
            collectRate: "",
            allotTotal: 0,
            repayTotal: 0
          };
          this.allotRoleIdList.push(item.id);
          this.formItem.allotNameList.push(item.name);
          this.divideRuleUserVos.push(stallObj);
        }
      });
      console.log(this.formItem.allotNameList);
    },
    // 勾选公司组织树节点的回调函数
    checkChangeOrz(arr) {
      console.log(arr);
      this.allotRoleIdList = [];
      this.formItem.allotNameList = [];
      arr.forEach(item => {
        if (item.leafType === "02") {
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
    // 点击出现tree
    selectTreeNode(type) {
      if (type === 0) {
        this.collect_show_children();
      } else {
        this.initTree();
      }
      this.initFlag = false;
      this.treeFlag = type;
    },
    // 分配方式的回调
    allotTypeChange(item) {
      console.log(item);
      if (item !== "03") {
        this.remoneyRateFlag = false;
      } else {
        // if (this.treeFlag === 1) {
        //   this.treeFlag = false;
        // }
      }
    },
    // 汇款率输入框的blur
    rateBlur(index, value) {
      if (typeof value == "number") {
        if (value <= 100)
          this.remoneyRateForm.staffList[index].collectRate = value.toFixed(2);
      } else {
        this.remoneyRateForm.staffList[index].collectRate = "";
      }
      sessionStorage.setItem(
        "collectRate",
        JSON.stringify(this.remoneyRateForm.staffList)
      );
    },
    // 取消回退
    handleCancel() {
      window.history.go(-1);
    },
    // 分配提交
    handleSubmit(name) {
      console.log(this.formItem)
      if (this.formItem.allotType === "03") {
        if (this.remoneyRateFlag) {
          this.$refs.remoneyRateForm.validate(valid => {
            if (valid) {
              this.$refs[name].validate(valid => {
                if (valid) {
                  // this.getList();
                  this.divide_allot_manual();
                }
              });
            }
          });
        } else {
          this.$Message.error("请填写回款率");
          return;
        }
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            // this.getList();
            this.divide_allot_manual();
          }
        });
      }
    },
    // tree取消回调
    cancel() {
      this.treeFlag = false;
      this.remoneyRateFlag = false;
      this.initFlag = true;
      // this.formItem.allotNameList = [];
    },
    // tree确定回调
    ok() {
      if (this.treeFlag === 0) {
        if (this.formItem.allotType === "03") {
          if (this.allotRoleIdList.length > 0) {
            this.allot_divideCollectRate();
          } else {
            this.$Message.error("请先选择催收人员");
          }
        } else {
          this.treeFlag = false;
          this.initFlag = true;
        }
      } else {
        this.treeFlag = false;
        this.initFlag = true;
      }
    },
    // 获取init tree数据
    async initTree(id, type) {
      this.data = [];
      const res = await collect_show_children({
        status: 1,
        ids: this.allotRoleIdList
      });
      if (res.code === 1) {
        if (res.data.userType === "01") {
          res.data.collectRoleTreeVos.forEach(item => {
            item.disableCheckbox = true;
            item.expand = true;
            item.children.forEach((item2, index) => {
              if (item2.leafType === "02") {
                item2.children = [];
              }
            });
          });
        } else {
          res.data.collectRoleTreeVos.forEach(item => {
            item.expand = true;
            item.children.forEach((item2, index) => {
              // if (item2.leafType === '02') {
              // };
              item2.disableCheckbox = true;
              item2.expand = true;
              item2.children.forEach((item3, index) => {
                item3.disableCheckbox = true;
              });
            });
          });
        }
        this.data = res.data.collectRoleTreeVos;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取人员列表
    async collect_show_children() {
      this.data5 = [];
      const res = await collect_show_children({
        status: 1,
        ids: this.allotRoleIdList
      });
      console.log(res);
      if (res.code === 1) {
        res.data.collectRoleTreeVos.forEach(item => {
          item.expand = true;
          item.children.forEach(item2 => {
            item2.expand = true;
            item2.children.forEach(item3 => {
              item3.expand = true;
            });
          });
        });
        this.data5 = res.data.collectRoleTreeVos;
      } else {
      }
    },
    // 动态获取表格数据
    async collect_tree_children(id, type, callBack) {
      const res = await collect_tree_children({
        parentId: id,
        status: "1",
        leafType: type
      });
      if (res.code === 1) {
        res.data.forEach(item => {
          if (item.leafType != "04") {
            item.disableCheckbox = true;
          }
        });
        callBack(res.data);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 异步加载tree数据
    loadData(item, callBack) {
      console.log(item, "----------------------");
      this.nodeData = item;
      let leafType;
      if (item.leafType === "01") {
        leafType = "02";
      } else if (item.leafType === "02") {
        leafType = "03";
      } else if (item.leafType === "03") {
        leafType = "04";
      } else {
        return;
      }
      this.collect_parent_children(item.id, leafType, callBack);
    },
    // 一键分配接口
    async divide_allot_manual() {
      this.allot_loading = true;
      console.log(this.formItem)
      // this.formItem.prodTypeList = [this.formItem.prodTypeList];
      const res = await divide_allot_manual(
        {
          ...this.formItem,
          prodTypeList: [this.formItem.prodTypeList],
          allotRoleIdList: this.allotRoleIdList,
          allotUserList: this.remoneyRateForm.staffList,
          allotFactor: "2.5"
        },
        {
          transformRequest: [
            function(data) {
              return JSON.stringify(data); //利用对应方法转换格式
            }
          ]
        }
      );
      this.allot_loading = false;
      if (res.code === 1) {
        console.log(res);
        this.$Message.success("分配成功");
        setTimeout(() => {
          window.history.go(-1);
        }, 0);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 校验查询案件量的参数
    handleQueryCases(name) {
      let prodTypeList = false;
      this.$refs.formItem.validateField('prodTypeList', (error) => {
        if (!error) {
          return prodTypeList = true;
        } else {
          return prodTypeList = false;
        }
      });
      // this.$refs.formItem.validateField('allotType', (error) => {
      //   if (!error) {
      //     return allotType = true;
      //   } else {
      //     return allotType = false;
      //   }
      // });
      if (prodTypeList ) {
        this.queryCases();
      }
    },
    //查询案件量
    async queryCases() {
      const res = await allot_manualcounts({
        ...this.formItem
      });
      console.log(res);
      if (res.code === 1) {
        this.totalcases = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    //查询回款率的接口
    async allot_divideCollectRate() {
      let divideRulesVo = {
        allotUserList: this.divideRuleUserVos,
        overdueDays: "3"
      };
      console.log(divideRulesVo);
      // divideRulesVo = JSON.stringify(divideRulesVo);
      const res = await allot_divideCollectRate(divideRulesVo, {
        transformRequest: [
          function(data) {
            return qs.stringify(data); //利用对应方法转换格式
          }
        ]
      });
      if (res.code === 1) {
        this.remoneyRateFlag = true;
        if (window.sessionStorage.getItem("collectRate")) {
          let backArr = []; //待装返回的数据
          let localArr = []; //本地的数据
          let newArr = []; //交集的数据
          let flag = false;
          localArr = JSON.parse(window.sessionStorage.getItem("collectRate"));
          this.remoneyRateForm.staffList = [];
          for (let i = 0; i < res.data.length; i++) {
            // 外层循环数据返回
            flag = false;
            if (typeof res.data[i].collectRate == "number") {
              res.data[i].collectRate = res.data[i].collectRate.toFixed(2);
            }
            for (let j = 0; j < localArr.length; j++) {
              //内层循环
              if (localArr[j].opUserName == res.data[i].opUserName) {
                //如果暂存的数据有，则取暂存的数据
                this.remoneyRateForm.staffList.push(localArr[j]);
                flag = false;
                break;
              } else {
                //如果没有的话，内层循环走一遍，标识符为true
                flag = true;
                continue;
              }
            }
            // 内层循环走一遍之后，返回的数据在暂存的里面有没有的话，则push进一个新数组
            if (flag) {
              this.remoneyRateForm.staffList.push(res.data[i]);
            }
          }
          // this.remoneyRateForm.staffList.forEach(item => {
          //   console.log(item.collectRate);
          //   if (typeof item.collectRate === "number") {
          //     item.collectRate = item.collectRate.toFixed(2);
          //   }
          // });
          console.log(this.remoneyRateForm.staffList);
          sessionStorage.setItem(
            "collectRate",
            JSON.stringify(this.remoneyRateForm.staffList)
          );
          // 过滤完的合并数组
          // this.remoneyRateForm.staffList = newArr.concat(backArr);
        } else {
          this.remoneyRateForm.staffList = res.data;
          this.remoneyRateForm.staffList.forEach(item => {
            item.collectRate = item.collectRate.toFixed(2);
          });
        }
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-col {
  margin-bottom: 5px;
  .casesWrap {
    line-height: 35px;
    width: 100%;
  }
}
</style>

