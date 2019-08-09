<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Drawer
      :value="showSeatsMg"
      width="720"
      :mask-closable="false"
      @on-close="closeDrawer"
      :styles="styles"
    >
      <Tabs value="TimedTask" style="background: #fff; border-radius: 4px;" >
        <TabPane label="坐席编号（10）" name="TimedTask">
          <Card class="vue-panel" style="margin-bottom: 30px;" :dis-hover="true">
            <Form :model="formData" :label-width="80" >
              <Row>
                <Col span="12">
                <FormItem label="坐席编号:">
                  <Input size="small" clearable v-model.trim="formData.billNo" placeholder="请输入坐席编号"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="账号:">
                  <Input size="small" clearable v-model.trim="formData.billNo" placeholder="请输入账号"/>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <FormItem label="密码:">
                  <Input size="small" clearable v-model.trim="formData.billNo" placeholder="请输入密码"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem style="text-align: right">
                  <Button size="small"
                          style="width:80px"
                          @click="showAddChannel=true"
                          type="primary"
                          v-if="add_handle" >添加
                  </Button>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card class="vue-panel"  :dis-hover="true">
            <p slot="title" style="display: flex; align-items: center;">
              <Input placeholder="Enter something..." search size="small" style="width: 30%; "/>
              <span style="flex: 1"></span>
              <span>
            <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">删除</Button>
            <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle" type="primary">导入</Button>
          </span>
            </p>
            <Table border ref="selection" :columns="tableColumns" :data="tableData"   size="small"></Table>
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
          </Card>
        </TabPane>
        <TabPane label="外显号码（10）" name="TaskDetails">
          <Card class="vue-panel" :dis-hover="true" style="margin-bottom: 30px;">
            <Form :model="formData" :label-width="80" >
              <Row>
                <Col span="12">
                <FormItem label="号码:">
                  <Input size="small" clearable v-model.trim="formData.billNo" placeholder="请输入号码"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem style="text-align: right">
                  <Button size="small"
                          style="width:80px"
                          @click="showAddChannel=true"
                          type="primary"
                          v-if="add_handle" >添加
                  </Button>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <div style="height: 100%; background: #fff">
          <Card class="vue-panel" :dis-hover="true">
            <p slot="title" style="display: flex; align-items: center;">
              <Input placeholder="Enter something..." size="small" style="width: 30%; " search/>
              <span style="flex: 1"></span>
              <span>
            <Button size="small" style="width:80px" @click="showTask('add')">删除</Button>
            <Button size="small" style="width:80px" @click="showTask('add')" type="primary">导入</Button>
          </span>
            </p>
            <Table border ref="selection" :columns="tableColumns2" :data="tableData" size="small"></Table>
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
          </Card>
          </div>
        </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

