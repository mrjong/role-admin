<template>
  <div>
    <Card class="vue-panel-table">
      <p>
        <Tabs @on-click="tabClick" type="card" size="small" :animated="false">
          <TabPane label="催收信息" name="case_detail_remark_list">
            <div>
              <Table
                border
                :data="case_detail_remark_list_tableData"
                :columns="case_detail_remark_list_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_remark_list_spin"></Spin>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_remark_list_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_remark_list_pageSize"
                    :current.sync="case_detail_remark_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_remark_list')"
                    @on-change="changePage($event, 'case_detail_remark_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="回款信息" name="case_detail_repay_ord_list">
            <div>
              <Table
                border
                :data="case_detail_repay_ord_list_tableData"
                :columns="case_detail_repay_ord_list_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_repay_ord_list_spin"></Spin>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_repay_ord_list_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_repay_ord_list_pageSize"
                    :current.sync="case_detail_repay_ord_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_repay_ord_list')"
                    @on-change="changePage($event, 'case_detail_repay_ord_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="用户主动还款" name="case_detail_user_repay_list">
            <div>
              <Table
                border
                :data="case_detail_user_repay_list_tableData"
                :columns="case_detail_user_repay_list_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_user_repay_list_spin"></Spin>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_user_repay_list_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_user_repay_list_pageSize"
                    :current.sync="case_detail_user_repay_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_user_repay_list')"
                    @on-change="changePage($event, 'case_detail_user_repay_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="系统代扣还款" name="case_detail_system_repay_list">
            <div>
              <Table
                border
                :data="case_detail_system_repay_list_tableData"
                :columns="case_detail_system_repay_list_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_system_repay_list_spin"></Spin>

              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_system_repay_list_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_system_repay_list_pageSize"
                    :current.sync="case_detail_system_repay_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_system_repay_list')"
                    @on-change="changePage($event, 'case_detail_system_repay_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </p>
    </Card>
  </div>
</template>

<script src='./index.js'></script>
