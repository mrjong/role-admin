<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Drawer
      title="管理坐席"
      :value="showSeatsMg"
      width="720"
      :mask-closable="false"
      @on-close="closeDrawer"
      :styles="styles"
    >
      <Card class="vue-panel" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px">
        <p slot="title">
          坐席编号（10）
        </p>
        <p slot="title" style="display: flex; align-items: center;">
          <Input placeholder="Enter something..." size="small" style="width: 30%; "/>
          <span style="flex: 1"></span>
          <span>
            <Button size="small"
                    style="width:80px"
                    @click="showAddChannel=true"
                    v-if="add_handle" type="primary">检索
            </Button>
            <Button size="small"
                    style="width:80px"
                    @click="showAddChannel=true"
                    v-if="add_handle" >添加
            </Button>
            <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">删除</Button>
            <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">导出</Button>
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
      <div style="height: 20px"></div>
      <Card class="vue-panel" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px">
        <p slot="title">
          外显号码（10）
        </p>
        <p slot="title" style="display: flex; align-items: center;">
          <Input placeholder="Enter something..." size="small" style="width: 30%; "/>
          <span style="flex: 1"></span>
          <span>
            <Button size="small"
                    style="width:80px"
                    @click="showAddChannel=true"
                    v-if="add_handle" type="primary">检索
            </Button>
            <Button size="small"
                    style="width:80px"
                    @click="showAddChannel=true"
                    v-if="add_handle" >添加
            </Button>
            <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">删除</Button>
            <Button size="small" style="width:80px" @click="showTask('add')" v-if="add_handle">导出</Button>
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
    </Drawer>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

