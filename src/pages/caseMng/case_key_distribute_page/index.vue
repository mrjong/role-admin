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
              <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
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
                <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                  <FormItem span="6">
                    <Button
                      type="primary"
                      @click="handleQueryCases('formItem')"
                      style="width:80px"
                      long
                      size="small"
                    >查询案件量</Button>
                  </FormItem>
                </Col>
                <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                  <div class="casesWrap">
                    {{totalcases}}条案件
                  </div>
                </Col>
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

                    style="width:80px;margin-left: 8px"
                    @click="handleCancel('formItem')"
                  >取消</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span="12" class="tree-col" v-if="treeFlag === 0">
        <Card class="vue-panel">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>人员组织树
          </p>
          <Tree
            :data="data5"
            :render="renderContent"
            multiple
            show-checkbox
            @on-select-change="selectNode"
            @on-check-change="checkChangePerson"
          ></Tree>
          <div>
            <Button   size="small" @click="cancel()">取消</Button>
            <Button type="primary" size="small" @click="ok()">确定</Button>
          </div>
        </Card>
      </Col>
      <Col span="12" class="tree-col" v-if="treeFlag === 1">
        <Card class="vue-panel">
          <p slot="title" @click="showPanel2=!showPanel2">
            <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>公司组织树
          </p>
          <Tree
            :data="data"
            :render="renderContent2"
            multiple
            show-checkbox
            @on-select-change="selectNode"
            @on-check-change="checkChangeOrz"
          ></Tree>
          <div>
            <Button   size="small" @click="cancel()">取消</Button>
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
  divide_allot_manual,
  collect_tree_children,
  collect_show_children,
  allot_manualcounts
} from "@/service/getData";
export default {
  name: "case_key_distribute_page",
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
    return {
      getDirList: [
        "DIVIDE_PROD_TYPE",
        "DIVIDE_PROD_CNT",
        "DIVIDE_CREDIT_LEVEL",
        "CASE_HANDLE_STATUS",
        "ALLOT_TYPE",
        "DIVIDE_PROD_NUM"
      ],//s数据字典传的字段
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      totalcases: '0',//案件总数
      treeFlag: "",
      allotRoleIdList: [],
      allotNameList: [],
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
      data5: [],
      data: [],
      dataContact: []
    };
  },
  created() {
    this.initTree("", "01");
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
    // 勾选人组织树节点的回调函数
    checkChangePerson(arr) {
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
      this.treeFlag = type;
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
          this.divide_allot_manual();
        }
      });
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
    // 获取init tree数据
    async initTree(id, type) {
      const res = await collect_show_children({
        status: 1,
        ids: this.allotRoleIdList
      });
      if (res.code === 1) {
        this.data = res.data.collectRoleTreeVos;
        if (res.data.type === '01') {
          this.data.forEach(item => {
            item.disableCheckbox = true;
            item.children.forEach((item2, index) => {
              if (item2.leafType === '02') {
                item2.children = [];
              };
            })
          })
        } else {
          this.data.forEach(item => {
            item.children.forEach((item2, index) => {
              // if (item2.leafType === '02') {
              // };
              item2.disableCheckbox = true;
              item2.children.forEach((item3, index) => {
                item3.disableCheckbox = true;
              })
            })
          })
        }
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
      const res = await divide_allot_manual({
        ...this.formItem,
        allotRoleIdList: this.allotRoleIdList
      });
      if (res.code === 1) {
        console.log(res);
        this.$Message.success("分配成功");
      } else {
        this.$Message.error(res.message);
      }
    },
    // 校验查询案件量的参数
    handleQueryCases(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          this.queryCases();
        }
      });
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
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-col {
  margin-bottom: 5px;
  .casesWrap {
    line-height: 35px;
  }
}
</style>

