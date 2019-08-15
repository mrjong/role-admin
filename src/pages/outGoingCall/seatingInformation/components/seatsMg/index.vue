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
      <Tabs value="Seats" style="background: #fff; border-radius: 4px;">
        <TabPane :label="'坐席编号（'+tableDataSeats.length+'）'" name="Seats">
          <Card class="vue-panel" style="margin-bottom: 30px;" :dis-hover="true">
            <Form :model="formData" :label-width="80" :rules="seatsRuleValidate" ref="formData">
              <Row style="height: 55px">
                <Col span="12">
                <FormItem label="坐席编号:" prop="seatNo">
                  <Input size="small" clearable v-model.trim="formData.seatNo" placeholder="请输入坐席编号"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="账号:" prop="loginName">
                  <Input size="small" clearable v-model.trim="formData.loginName" placeholder="请输入账号"/>
                </FormItem>
                </Col>
              </Row>
              <Row style="height: 55px">
                <Col span="12">
                <FormItem label="密码:" prop="passWord">
                  <Input size="small" clearable v-model.trim="formData.passWord" placeholder="请输入密码"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem style="text-align: right">
                  <Button size="small"
                          style="width:80px"
                          @click="handleSubmitSeats"
                          type="primary"
                          :loading="add_loading"
                          v-if="add_handle" >添加
                  </Button>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card class="vue-panel"  :dis-hover="true">
            <p slot="title" style="display: flex; align-items: center;">
              <Input placeholder="请输入坐席编号" search size="small" style="width: 30%; " @on-search="getListSeats" v-model="seatsNo" enter-button="Search"/>
              <span style="flex: 1"></span>
              <span>
            <Button size="small" style="width:80px" v-if="add_handle" @click="deleteSeats">删除</Button>
            <!--<Button size="small" style="width:80px" v-if="add_handle" type="primary">导入</Button>-->
          </span>
            </p>
            <Table border ref="selection" :columns="tableColumnsSeats" :data="tableDataSeats"   size="small" @on-selection-change="selectItem">

            </Table>
          </Card>
        </TabPane>
        <TabPane :label="'外显号码（'+tableDataExplicitNumber.length+'）'" name="explicitNumber">
          <Card class="vue-panel" :dis-hover="true" style="margin-bottom: 30px;">
            <Form :label-width="80">
              <Row>
                <Col span="12">
                <FormItem label="号码:">
                  <Input size="small" clearable v-model.trim="explicitNumber" placeholder="请输入号码"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem style="text-align: right">
                  <Button size="small"
                          style="width:80px"
                          @click="handleSubmitExplicit"
                          type="primary"
                          :loading="add_loading_explicit"
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
              <Input placeholder="请输入号码" size="small" style="width: 30%; " search v-model="explicitNumberSearch" enter-button="Search" @on-search="getListExplicit" />
              <span style="flex: 1"></span>
              <span>
            <Button size="small" style="width:80px" @click="deleteExplicit">删除</Button>
            <!--<Button size="small" style="width:80px" type="primary">导入</Button>-->
          </span>
            </p>
            <Table border ref="selection" :columns="tableColumnsExplicitNumber" :data="tableDataExplicitNumber" size="small" @on-selection-change="selectItem"></Table>
          </Card>
          </div>
        </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

