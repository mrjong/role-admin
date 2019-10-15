<template>
  <div>
    <Card class="vue-panel-table">
      <p>
        <Tabs type="card" @on-click="tabClick" size="small" :animated="false">
          <TabPane label="用户绑卡信息" name="case_detail_bindcard_list">
            <div>
              <Table
                border
                :data="case_detail_bindcard_list_tableData"
                :columns="case_detail_bindcard_list_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_bindcard_list_spin"></Spin>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_bindcard_list_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_bindcard_list_pageSize"
                    :current.sync="case_detail_bindcard_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_bindcard_list')"
                    @on-change="changePage($event, 'case_detail_bindcard_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="操作记录" name="case_detail_getcaselog">
            <div>
              <Table
                border
                :data="case_detail_getcaselog_tableData"
                :columns="case_detail_getcaselog_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_getcaselog_spin"></Spin>
              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_getcaselog_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 30, 40]"
                    show-elevator
                    :page-size="case_detail_getcaselog_pageSize"
                    :current.sync="case_detail_getcaselog_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_getcaselog')"
                    @on-change="changePage($event, 'case_detail_getcaselog')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="站内信记录" name="case_detail_siteletter_list">
            <div>
              <Table
                border
                :data="case_detail_siteletter_list_tableData"
                :columns="case_detail_siteletter_list_tableColumns"
                stripe
              ></Table>
              <Spin size="large" fix v-if="case_detail_siteletter_list_spin"></Spin>

              <!-- 分页 -->
              <div class="vue-panel-page">
                <div class="fr">
                  <Page
                    :total="case_detail_siteletter_list_total"
                    show-total
                    size="small"
                    :page-size-opts="[10, 20, 50, 100]"
                    show-elevator
                    :page-size="case_detail_siteletter_list_pageSize"
                    :current.sync="case_detail_siteletter_list_pageNo"
                    @on-page-size-change="changeSize($event, 'case_detail_siteletter_list')"
                    @on-change="changePage($event, 'case_detail_siteletter_list')"
                  ></Page>
                </div>
              </div>
            </div>
          </TabPane>
          <!-- <TabPane label="地址信息" name="case_detail_address_info">
            <div class="panel-desc">
              <Row :gutter="10">
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="panel-desc-title">
                    家庭住址：
                    <span>{{case_detail_address_info_Data&&case_detail_address_info_Data.usrProvAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.usrCityAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.usrDtlAddr}}</span>
                  </div>
                </Col>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="panel-desc-title">
                    工作地址：
                    <span>{{case_detail_address_info_Data&&case_detail_address_info_Data.workProvAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.workCityAddr}}{{case_detail_address_info_Data&&case_detail_address_info_Data.workDtlAddr}}</span>
                  </div>
                </Col>
              </Row>
              <Spin size="large" fix v-if="case_detail_address_info_spin"></Spin>
            </div>
          </TabPane> -->
        </Tabs>
      </p>
    </Card>
    <!-- 站内信详情 -->
    <div v-if="message_detail_flag" style="z-index: 1000">
      <Modal title="站内信信息" class="message_detail" v-model="message_detail_flag" :footer-hide="true">
        <Row>
          <Col :xs="24" :sm="24" :md="4" :lg="4" span="4">
            <p class="message_detail_title">发送时间：</p>
            <p class="message_detail_title">收件人：</p>
            <p class="message_detail_title">发送结果：</p>
            <p class="message_detail_title">发送内容：</p>
          </Col>
          <Col :xs="24" :sm="24" :md="18" :lg="18" span="18">
            <p class="message_detail_desc">{{message_detail_data.sendTime | formatDate}}</p>
            <p
              class="message_detail_desc"
            >{{message_detail_data.userName? message_detail_data.userName: ''}}</p>
            <p
              class="message_detail_desc"
            >{{message_detail_data.sendStatus? message_detail_data.sendStatus: ''}}</p>
            <p
              class="message_detail_desc"
            >{{message_detail_data.sendContent? message_detail_data.sendContent: ''}}</p>
          </Col>
        </Row>
      </Modal>
    </div>
  </div>
</template>

<script src='./index.js'></script>
