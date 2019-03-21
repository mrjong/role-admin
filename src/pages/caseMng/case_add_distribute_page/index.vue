<template>
  <div class="panel_list">
    <Row :gutter="8" class="detail-row">
      <!-- 左边表单 -->
      <Col span="12" :span="remoneyRateFlag?'8':'12'" class="form-col">
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
                        type="number"
                        number
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
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem label="逾期应还金额:">
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMin">
                      <Input
                        size="small"
                        type="number"
                        clearable
                        v-model.trim="formItem.ovduamtMin"
                        number
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                    <div class="text-center">-</div>
                  </Col>
                  <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                    <FormItem prop="ovduamtMax">
                      <Input
                        size="small"
                        type="number"
                        clearable
                        v-model.trim="formItem.ovduamtMax"
                        number
                      ></Input>
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
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
                <FormItem span="6" label="分配方式:" prop="allotType">
                  <!-- <RadioGroup v-model="formItem.allotType">
                    <Radio
                      :label="item.itemCode"
                      v-for="item in getDirObj.ALLOT_TYPE"
                      :key="item.itemCode"
                    >{{ item.itemName }}</Radio>
                  </RadioGroup> -->
                  <Select
                    size="small"
                    clearable
                    placeholder="请选择分配方式"
                    v-model="formItem.allotType"
                    @on-change="allotTypeChange"
                  >
                    <Option
                      v-for="item in getDirObj.ALLOT_TYPE"
                      v-if="item.itemCode !== '03'"
                      :value="item.itemCode"
                      :key="item.itemName"
                    >{{ item.itemName }}</Option>
                  </Select>
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
                  >选择公司</Button>
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
                    v-if="submitType === 1"
                    :loading="add_loading"
                    size="small"
                  >
                    <span v-if="!add_loading">添加</span>
                    <span v-else>添加中...</span>
                  </Button>
                  <Button
                    type="primary"
                    @click="handleSubmit('formItem', submitType)"
                    style="width:80px"
                    long
                    v-if="submitType === 2"
                    :loading="update_loading"
                    size="small"
                  >
                    <span v-if="!update_loading">修改</span>
                    <span v-else>修改中...</span>
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
      <Col span="12" :span="remoneyRateFlag?'8':'12'" v-if="treeFlag === 0">
        <Card class="vue-panel">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>人员组织树
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            class="case_rule_tree"
            multiple
            show-checkbox
            @on-select-change="selectNode"
            @on-check-change="checkChangePerson"
          ></Tree>
          <div>
            <Button size="small" @click="cancel()">取消</Button>
            <Button type="primary" size="small" @click="ok()">确定</Button>
          </div>
        </Card>
      </Col>
      <Col span="12" :span="remoneyRateFlag?'8':'12'" v-if="treeFlag === 1">
        <Card class="vue-panel">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>公司组织树
          </p>
          <Tree
            :data="data"
            :render="renderContent2"
            class="case_rule_tree"
            multiple
            show-checkbox
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
        <Card class="vue-panel">
          <p slot="title">催收人员回款率</p>
          <Form ref="remoneyRateForm" :model="remoneyRateForm" :label-width="120">
            <FormItem
              v-for="(item, index) in remoneyRateForm.staffList"
              :key="index"
              :label="item.opUserName+':'"
              :prop="'staffList.'+index+'.collectRate'"
              :rules="[{required: true, message: '回款率不能为空'},{ message: '回款率只能是数字', trigger:'blur', pattern:/^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/,}]"
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
import {
  divide_rules_add,
  divide_rules_edit,
  divide_rules_save,
  collect_tree_children,
  collect_show_children,
  collect_parent_children,
  allot_divideCollectRate
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
    const validator_array = (rule, value, callback) => {
      if (value.length === 0) {
        callback();
      }
    };
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
      add_loading: false, //添加按钮loading
      update_loading: false, //修改按钮loading
      treeFlag: "", //0 人员树 1 组织树
      remoneyRateFlag: false, //回款率flag
      divideRuleUserVos: [], //汇款率接口参数list
      submitType: 1, //提交类型 1添加，2修改
      ruleId: "",
      allotRoleIdList: [],
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
            trigger: "change",
            type: "string"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择有效时间",
            type: "array"
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
            message: "逾期天数为正整数"
          },
          {
            validator: validate_day_start,
            trigger: "blur"
          }
        ],
        ovdudaysMax: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数"
          },
          {
            validator: validate_day_end,
            trigger: "blur"
          }
        ],
        ovduamtMin: [
          {
            pattern: this.GLOBAL.money,
            message: "金额格式不正确"
          },
          {
            validator: validate_money_start,
            trigger: "blur"
          }
        ],
        ovduamtMax: [
          {
            pattern: this.GLOBAL.money,
            message: "金额格式不正确"
          },
          {
            validator: validate_money_end,
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
        allotNameList: [],
        effectMinDt: "",
        effectMaxDt: "",
        date: []
      },
      data5: [],
      data: [],
      dataContact: []
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
    console.log(this.formItem);
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
            width: "94%",
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
    // 取消回退
    handleCancel() {
      window.history.go(-1);
    },
    // 分配提交
    handleSubmit(name, type) {
      //表单校验
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          if (type === 1) {
            this.divide_rules_add();
          } else {
            this.divide_rules_save();
          }
          console.log(this.formItem);
        }
      });
    },
    // 点击出现tree
    selectTreeNode(type) {
      console.log(12313);
      if (type === 0) {
        this.collect_show_children();
      } else {
        this.initTree();
      }
      this.treeFlag = type;
    },
    // 分配方式的回调
    allotTypeChange(item) {
      console.log(item);
      if (item !== "03") {
        this.remoneyRateFlag = false;
      }
    },
    // 汇款率输入框的blur
    rateBlur(index, value) {
      if (typeof value == "number") {
        this.remoneyRateForm.staffList[index].collectRate = value.toFixed(2);
      } else {
        this.remoneyRateForm.staffList[index].collectRate = "";
      }
      sessionStorage.setItem(
        "collectRate",
        JSON.stringify(this.remoneyRateForm.staffList)
      );
    },
    // tree取消回调
    cancel() {
      this.treeFlag = false;
      this.formItem.allotNameList = [];
    },
    // tree确定回调
    ok() {
      // if (this.treeFlag === 0) {
      //   if (this.formItem.allotType === "03") {
      //     if (this.allotRoleIdList.length > 0) {
      //       this.allot_divideCollectRate();
      //     } else {
      //       this.$Message.error("请先选择催收人员");
      //     }
      //   } else {
      //     this.treeFlag = false;
      //   }
      // } else {
      //   this.treeFlag = false;
      // }
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
      const res = await collect_show_children({
        status: 1,
        ids: this.allotRoleIdList
      });
      if (res.code === 1) {
        if (res.data.userType === "01") {
          res.data.collectRoleTreeVos.forEach(item => {
            item.disableCheckbox = true;
            item.expand = true;
            if (item.children) {
              item.children.forEach((item2, index) => {
                if (item2.leafType === "02") {
                  item2.children = [];
                }
              });
            }
          });
        } else {
          res.data.collectRoleTreeVos.forEach(item => {
            item.expand = true;
            if (item.children) {
              item.children.forEach((item2, index) => {
                item2.disableCheckbox = true;
                item2.expand = true;
                if (item2.children) {
                  item2.children.forEach((item3, index) => {
                    item3.disableCheckbox = true;
                  });
                }
              });
            }
          });
        }
        this.data = res.data.collectRoleTreeVos;
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
        console.log(res.data.collectRoleTreeVos);
        res.data.collectRoleTreeVos.forEach(item => {
          item.expand = true;
          if (item.children) {
            item.children.forEach(item2 => {
              item2.expand = true;
              if (item2.children) {
                item2.children.forEach(item3 => {
                  item3.expand = true;
                });
              }
            });
          }
        });
        this.data5 = res.data.collectRoleTreeVos;
      } else {
      }
    },
    // 动态获取tree数据
    async collect_parent_children(id, type, callBack) {
      const res = await collect_parent_children({
        parentId: id,
        status: "1",
        leafType: type
      });
      if (res.code === 1) {
        this.dataContact = res.data;
        callBack(this.dataContact);
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
        item.loading = false;
        return;
      } else {
        item.loading = false;
        return;
      }
      this.collect_parent_children(item.id, leafType, callBack);
    },
    // 添加案件接口
    async divide_rules_add() {
      this.add_loading = true;
      const res = await divide_rules_add({
        ...this.formItem,
        allotRoleIdList: this.allotRoleIdList
      });
      this.add_loading = false;
      if (res.code === 1) {
        console.log(res);
        this.$Message.success("添加成功");
        setTimeout(() => {
          window.history.go(-1);
        }, 0);
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
        this.formItem.status = res.data.status;
        this.allotRoleIdList = res.data.allotRoleIdList;
        if (res.data.effectMaxDt && res.data.effectMinDt) {
          this.formItem.date = [];
          this.formItem.date.push(res.data.effectMinDt);
          this.formItem.date.push(res.data.effectMaxDt);
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 保存修改分案规则接口
    async divide_rules_save() {
      this.update_loading = true;
      const res = await divide_rules_save({
        ...this.formItem,
        allotRoleIdList: this.allotRoleIdList
      });
      this.update_loading = false;
      if (res.code === 1) {
        this.$Message.success("修改成功");
        setTimeout(() => {
          window.history.go(-1);
        }, 0);
      } else {
        this.$Message.error(res.message);
      }
    },
    //查询回款率的接口
    async allot_divideCollectRate() {
      let divideRulesVo = {
        allotUserList: this.divideRuleUserVos
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
          // 过滤完的合并数组
          // this.remoneyRateForm.staffList = newArr.concat(backArr);
        } else {
          this.remoneyRateForm.staffList = res.data;
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
}
.case_rule_tree,
.remoney_rate_form {
  max-height: 550px;
  overflow-y: auto;
}
</style>

