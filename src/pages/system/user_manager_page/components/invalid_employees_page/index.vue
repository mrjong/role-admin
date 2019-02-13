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
      <Form v-if="!showPanel2" ref="formItem" :model="formItem" :label-width="90">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="4">
            <FormItem label="公司名称:" prop="parentId">
              <Select
                size="small"
                v-model="formItem.parentId"
                filterable
                clearable
                placeholder="请选择公司"
              >
                <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.text }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="4">
            <FormItem label="用户名称:">
              <Input size="small" clearable v-model="formItem.userName" placeholder="请输入用户名称"></Input>
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
            <Radio :label="1">可用</Radio>
            <Radio :label="0">冻结</Radio>
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
import {
  collect_user_list,
  collect_status_change,
  collect_local_list
} from "@/service/getData";
export default {
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      showPanel3: false,
      modal1: false,
      status: "",
      pageNo: 1,
      pageSize: 10,
      total: 0,
      acount: "",
      id: "",
      tableData: [
        {
          recording_id: 1,
          operate: "操作"
        }
      ],
      tableColumns: [
        {
          title: "序号",
          width: 80,
          searchOperator: "=",
          sortable: true,
          type: "index",
          fixed: "left",
          align: "center"
        },
        {
          title: "账号",
          width: 100,
          searchOperator: "=",
          key: "loginName",
          align: "center"
        },
        {
          title: "用户名称",
          searchOperator: "like",
          width: 120,
          key: "userName",
          sortable: true,
          align: "center",
          ellipsis: true
        },
        {
          title: "公司名称",
          width: 150,
          searchOperator: "like",
          key: "companyName",
          align: "center",
          ellipsis: true
        },
        {
          title: "部门",
          searchOperator: "=",
          key: "outfitName",
          align: "center",
          width: 120
        },
        {
          title: "角色",
          searchOperator: "=",
          key: "roleName",
          align: "center",
          ellipsis: true,
          width: 120
        },
        {
          title: "创建时间",
          searchOperator: "=",
          key: "createTime",
          ellipsis: true,
          width: 200,
          align: "center",
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime
              ? this.$options.filters["formatDate"](
                  createTime,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : createTime;
            return h("span", createTime);
          }
        },
        {
          title: "操作",
          width: 100,
          key: "edit",
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  class: "edit-btn",
                  props: {},
                  on: {
                    click: () => {
                      this.acount = params.row.loginName;
                      this.id = params.row.id;
                      this.status = params.row.status;
                      this.modal1 = true;
                    }
                  }
                },
                "状态"
              )
            ]);
          }
        }
      ],
      formItem: {},
      companyList: []
    };
  },
  created() {
    this.collect_local_list();
    this.collect_user_list("02");
  },
  methods: {
    handleSubmit(name) {
      this.pageNo = 1;
      this.collect_local_list();
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getList();
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
    // 查询公司
    async collect_user_list(type) {
      const res = await collect_user_list({
        status: "1",
        leafType: type
      });
      console.log(res);
      if (res.code === 1) {
        this.companyList = res.data.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取无效员工列表
    async collect_local_list() {
      const res = await collect_local_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      if (res.code === 1) {
        this.tableData = res.data.data.data;
        this.total = res.data.data.totalElements;
        this.pageNo = res.data.data.number;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 状态变更接口
    async collect_status_change() {
      const res = await collect_status_change({
        id: this.id,
        status: Number(this.status)
      });
      if (res.code === 1) {
        this.$Message.success("变更成功");
        this.modal1 = false;
        // this.$parent.$parent.$parent.getList("#", "01");
        this.collect_local_list();
      } else {
        this.$Message.error(res.message);
      }
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
      this.collect_local_list();
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.collect_status_change();
    },
    cancel() {
      this.modal1 = false;
    }
  }
};
</script>
<style lang="less">
.ivu-col {
  margin-bottom: 5px;
}
</style>
