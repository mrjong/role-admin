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
                        number
                        type="number"
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
                        type="number"
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
                <FormItem span="6" label="接收人员:" prop="allotNameList">
                  <Input
                    size="small"
                    clearable
                    v-model="formItem.allotNameList"
                    placeholder="请选择接收人员"
                    disabled
                  ></Input>
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
            ref='tree'
            multiple
            show-checkbox
            :load-data="loadData"
            @on-select-change="selectNode"
            @on-check-change="checkChange"
          ></Tree>
          <div >
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
import { divide_allot_manual, collect_parent_children } from "@/service/getData";
export default {
  name: "case_key_distribute_page",
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
      allotRoleIdList: [],
      allotNameList: [],
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
            trigger: "change"
          }
        ],
        allotNameList: [
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
            trigger: "blur"
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
            trigger: "blur"
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
            trigger: "blur"
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
            trigger: "blur"
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
        allotNameList: []
      },
      data5: []
    };
  },
  created() {
    this.initTree('', '01');
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '94%',
          boxSizing: 'border-box',
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: '',
              },
              style: {
                marginRight: '4px'
              }
            }),
            h('span', {
              props: {
              },
              style: {
                cursor: 'pointer'
              },
              class: 'tree_title',
              on: {
                'click': (e) => {

                }
              }
            }, data.name)
          ]),
        ]);
    },
    // 勾选节点的回调函数
    checkChange(arr) {
      console.log(this.$refs.tree.getCheckedNodes());
      let array = this.$refs.tree.getCheckedNodes();
      this.allotRoleIdList = [];
      this.formItem.allotNameList = [];
      arr.forEach(item => {
        if (item.leafType === '04') {
          this.allotRoleIdList.push(item.id);
          this.formItem.allotNameList.push(item.name);
        }
      });
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
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
          this.$Message.success("ok");
          this.divide_allot_manual();
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 获取init tree数据
    async initTree(id, type) {
      const res = await collect_parent_children({ parentId: id, status: '1', leafType: type });
      console.log()
      if (res.code === 1) {
        this.data5 = res.data;
        this.data5.forEach(item => {
          if (item.leafType != '04') {
            item.disableCheckbox = true;
          }
        });
      } else {
        this.$Message.error(res.message)
      }
    },
    // 动态获取表格数据
    async collect_parent_children(id, type, callBack) {
      const res = await collect_parent_children({ parentId: id, status: '1', leafType: type });
      if (res.code === 1) {
        res.data.forEach(item => {
          if (item.leafType != '04') {
            item.disableCheckbox = true;
          }
        });
        callBack(res.data)
      } else {
        this.$Message.error(res.message)
      }
    },
    // 异步加载tree数据
    loadData(item, callBack) {
      console.log(item, '----------------------')
      this.nodeData = item;
      let leafType;
      if (item.leafType === '01') {
        leafType = '02';
      } else if (item.leafType === '02') {
        leafType = '03';
      } else if (item.leafType === '03') {
        leafType = '04';
      } else {
        return;
      };
      this.collect_parent_children(item.id, leafType, callBack);
    },
    // 一键分配接口
    async divide_allot_manual() {
      const res = await divide_allot_manual({
        ...this.formItem,
        allotRoleIdList: this.allotRoleIdList,
      });
      if (res.code === 1) {
        console.log(res);
        this.$Message.success('分配成功');
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

