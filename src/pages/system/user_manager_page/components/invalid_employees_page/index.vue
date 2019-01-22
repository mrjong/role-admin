<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索条件
        <!-- <router-link to="/demo/demo_desc">
              <Button class="fr vue-back-btn header-btn" type="primary" size="small">详情</Button>
        </router-link>-->
      </p>
      <Form
        v-if="!showPanel2"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="4">
            <FormItem label="公司名称:" prop="device_id">
              <Input size="small" clearable v-model="formItem.componey_name" placeholder="请输入公司名称"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="4">
            <FormItem label="用户名称:">
              <Input size="small" clearable v-model="formItem.name" placeholder="请输入用户名称"></Input>
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
              >检索</Button>
              <Button
                size="small"
                type="ghost"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table collection_recording">
      <p slot="title">
        <Icon :type="!showPanel3?'chevron-down':'chevron-up'" @click="showPanel3=!showPanel3"></Icon>检索结果
        <!-- <router-link to="/buffet/buffet_add">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">导出数据</Button>
        </router-link>-->
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel3">
        <Table :data="tableData" :columns="tableColumns" stripe width="800" size="small"></Table>
        <!-- 分页 -->
        <div class="vue-panel-page">
          <div style="float: right;">
            <Page
              :total="total"
              show-total
              size="small"
              :page-size-opts="[10, 20, 50, 100]"
              show-elevator
              show-sizer
              :page-size="pageSize"
              :current="pageNo"
              @on-page-size-change="changeSize"
              @on-change="changePage"
            ></Page>
          </div>
        </div>
      </div>
    </Card>
    <div v-if="modal1">
      <Modal
        v-model="modal1"
        @on-ok="ok"
        @on-cancel="cancel"
        width="500"
        :transfer="false"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>状态变更</span>
        </p>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4">
          <label for="acount">账号：</label>
          <Input size="small" v-model="acount" disabled id="acount" style="width: auto"></Input>
        </Col>
        <Col :xs="24" :sm="24" :md="10" :lg="10" span="4" style="margin-left: 20px;">
          <label for="radio">状态：</label>
          <RadioGroup v-model="status" id="radio" span="4">
            <Radio label="0">可用</Radio>
            <Radio label="1">冻结</Radio>
          </RadioGroup>
        </Col>
        <div slot="footer">
          <Button type="ghost" size="small" @click="ok">取消</Button>
          <Button type="primary" size="small" @click="cancel">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPanel: false,
      showPanel2: false,
      showPanel3: false,
      modal1: false,
      status: '0',
      acount: '123123',
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          recording_id: 1,
          operate: '操作'
        }
      ],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          searchOperator: '=',
          sortable: true,
          key: 'recording_id',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '账号',
          width: 100,
          searchOperator: '=',
          key: 'loginCount',
          align: 'center'
        },
        // {
        //   title: '餐柜添加时间',
        //   key: 'addtime',
        //   sortable: true,
        //   width: 160,
        //   render: (h, params) => {
        //     const row = params.row;
        //     const addtime = row.addtime
        //       ? this.$options.filters['formatDate'](new Date(row.addtime * 1000), 'yyyy-MM-dd hh:mm:ss')
        //       : row.addtime;
        //     return h('span', addtime);
        //   }
        // },
        {
          title: '用户名称',
          searchOperator: 'like',
          width: 120,
          key: 'userName',
          sortable: true,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '公司名称',
          width: 150,
          searchOperator: 'like',
          key: 'relation',
          align: 'center',
          ellipsis: true,
          // render: (h, params) => {
          //   return h('div', [
          //     h(
          //       'Tooltip',
          //       {
          //         style: {
          //           margin: '0 5px'
          //         },
          //         props: {
          //           content: params.row.address,
          //           placement: 'top'
          //         }
          //       },
          //       [h('div', {}, params.row.address)]
          //     )
          //   ]);
          // }
        },
        {
          title: '部门',
          searchOperator: '=',
          key: 'department',
          align: 'center',
          width: 120
        },
        {
          title: '角色',
          searchOperator: '=',
          key: 'role',
          align: 'center',
          ellipsis: true,
          width: 120,
        },
        {
          title: '创建时间',
          searchOperator: '=',
          key: 'createTime',
          ellipsis: true,
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.modal1 = true;
                    }
                  }
                }, '状态')
            ]);
          }
        },
      ],
      formItem: {
        componey_name: '',
        name: ''
      },
      ruleValidate: {
        buffet_id: [
          {
            required: true,
            message: '请输入网格编号',
            trigger: 'blur'
          }
        ],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          this.$Message.error('查询条件格式有误，请重新填写');
        }
      });
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    },
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.modal1 = false;
    },
    cancel() {
      this.modal1 = false;
    },
  },
}
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
