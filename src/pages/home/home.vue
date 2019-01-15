<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col :md="24">
      <Row :gutter="5">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          :style="{marginBottom: '10px'}"
        >
        <infor-card
          id-name="user_created_count"
          :end-val="todayUser || 0"
          iconType="android-person-add"
          color="#2d8cf0"
          intro-text="今日新增用户"
        ></infor-card>
        </Col>
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          :style="{marginBottom: '10px'}"
        >
        <infor-card
          id-name="visit_count"
          :end-val="data5.count_surplus_num || 0"
          iconType="cube"
          color="#64d572"
          :iconSize="50"
          intro-text="剩余总数"
        ></infor-card>
        </Col>
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          :style="{marginBottom: '10px'}"
        >
        <infor-card
          id-name="collection_count"
          :end-val="data5.count_push_num || 0"
          iconType="ios-grid-view"
          color="#ffd572"
          intro-text="补餐总数"
        ></infor-card>
        </Col>
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          :style="{marginBottom: '10px'}"
        >
        <infor-card
          id-name="transfer_count"
          :end-val="data5.count_sales_num || 0"
          iconType="shuffle"
          color="#f25e43"
          intro-text="销售总数"
        ></infor-card>
        </Col>
      </Row>
      <!-- <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            今日服务调用地理分布
                        </p>
                        <div class="map-con">
                            <Col span="10">
                                <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                            </Col>
                            <Col span="14" class="map-incon">
                                <Row type="flex" justify="center" align="middle">
                                    <home-map :city-data="cityData"></home-map>
                                </Row>
                            </Col>
                        </div>
                    </Card>
                </Row> -->
      </Col>
    </Row>
    <Row
      :gutter="10"
      class="margin-top-10"
    >
      <!-- <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        订单统计
                    <Select v-model="model1"  size="small" class="fr" style="width:100px">
        <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
                    </p>
                    <div class="data-source-row">
                        <visite-volume></visite-volume>
                    </div>
                </Card>
            </Col> -->
      <Col
        :md="24"
        :lg="24"
        :style="{marginBottom: '10px'}"
      >
      <Card>
        <p
          slot="title"
          class="card-title"
        >
          <Icon type="ios-pulse-strong"></Icon>
          订单统计

          <DatePicker
            format="yyyy-MM-dd"
            @on-change="changeDate"
            v-model="model1"
            type="daterange"
            placement="bottom-end"
            placeholder="Select date"
            class="fr"
            style="width: 200px"
          ></DatePicker>
          <Select
            @on-change="changeDate"
            v-model="type"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in dateList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Select
            @on-change="changeDate"
            v-model="dateType"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in dateTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Select
            @on-change="changeDate"
            v-model="payType"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in payTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </p>
        <div class="data-source-row">
          <data-source-pie ref="componentref"></data-source-pie>
        </div>
      </Card>
      </Col>

      <Col
        :md="24"
        :lg="24"
        :style="{marginBottom: '10px'}"
      >
      <Card>
        <p
          slot="title"
          class="card-title"
        >
          <Icon type="ios-pulse-strong"></Icon>
          餐柜销售统计

          <DatePicker
            @on-ok="changeDate4"
            v-model="model4"
            type="datetime"
            placement="bottom-end"
            placeholder="Select date"
            class="fr"
            style="width: 200px"
          ></DatePicker>
          <Select
            @on-change="changeDate4"
            v-model="carte_type4"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in dateList4"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Select
            filterable
            clearable
            class="fr"
            style="width:150px;margin-right:10px"
            v-model="buffet_id2"
          >
            <Option
              :key="item.buffet_id"
              v-for="item in tableData2"
              :value="Number(item.buffet_id)"
            >{{item.buffet_name}}</Option>
          </Select>
        </p>
          <Table
            :data="tableData4"
            :columns="tableColumns"
            stripe
          ></Table>
      </Card>
      </Col>
      <Col
        :md="24"
        :lg="24"
        :style="{marginBottom: '10px'}"
      >
      <Card>
        <p
          slot="title"
          class="card-title"
        >
          <Icon type="ios-pulse-strong"></Icon>
          用户增长

          <DatePicker
            format="yyyy-MM-dd"
            @on-change="changeDate2"
            v-model="model2"
            type="daterange"
            placement="bottom-end"
            placeholder="Select date"
            class="fr"
            style="width: 200px"
          ></DatePicker>
          <Select
            @on-change="changeDate2"
            v-model="dateType2"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in dateTypeList2"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <!-- <Select
            @on-change="changeDate"
            v-model="payType"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in payTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select> -->
        </p>
        <div class="data-source-row">
          <user-pie ref="componentref2"></user-pie>
        </div>
      </Card>
      </Col>

      <Col
        :md="24"
        :lg="24"
        :style="{marginBottom: '10px'}"
      >
      <Card>
        <p
          slot="title"
          class="card-title"
        >
          <Icon type="ios-pulse-strong"></Icon>
          菜品销售统计

          <DatePicker
            format="yyyy-MM-dd"
            @on-change="changeDate3"
            v-model="model3"
            type="daterange"
            placement="bottom-end"
            placeholder="Select date"
            class="fr"
            style="width: 200px"
          ></DatePicker>
          <Select
            @on-change="changeDate3"
            v-model="dateType3"
            class="fr"
            style="width:100px;margin-right:10px"
          >
            <Option
              v-for="item in dateList3"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Select
            filterable
            clearable
            class="fr"
            style="width:150px;margin-right:10px"
            v-model="buffet_id"
          >
            <Option
              :key="item.buffet_id"
              v-for="item in tableData2"
              :value="Number(item.buffet_id)"
            >{{item.buffet_name}}</Option>
          </Select>
        </p>
        <div class="data-source-row">
          <goods-pie ref="componentref3"></goods-pie>
        </div>
      </Card>
      </Col>
      <!-- <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        各类用户服务调用变化统计
                    </p>
                    <div class="data-source-row">
                        <user-flow></user-flow>
                    </div>
                </Card>
            </Col> -->
    </Row>
    <!-- <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row> -->
  </div>
</template>

<script>
import { buffet_list, statistics_userIncrease, statistics_salesInfo } from "@/service/getData"
import cityData from './map-data/get-city-value.js';
import dayjs from 'dayjs'
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import UserPie from './components/UserPie.vue';
import goodsPie from './components/goodsPie.vue';
import salesInfo from './components/salesInfo.vue';
import salesInfoPie from './components/salesInfoPie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';

export default {
  name: 'home',
  components: {
    salesInfoPie,
    homeMap,
    dataSourcePie,
    goodsPie,
    UserPie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      todayUser: 0,
      data5: {},
      carte_type4: '1',
      tableData4: [],
      tableColumns: [
        {
          title: "商品ID",
          sortable: true,
          key: "goods_id"
        },
        {
          title: "剩余数量",
          sortable: true,
          key: "surplus_num"
        },
        {
          title: "销售数量",
          sortable: true,
          key: "sales_num"
        },
        {
          title: "补餐数量",
          sortable: true,
          key: "push_num"
        },
        {
          title: "菜品名称",
          sortable: true,
          key: "name"
        },

      ],
      buffet_id: '',
      tableData2: [],
      type: '0',
      type3: '0',
      payType: '9999',
      dateType3: '1',
      dateType: '1',
      dateType2: '1',
      payTypeList: [
        {
          value: '9999',
          label: '全部'
        },
        {
          value: '1',
          label: '已支付'
        },
        {
          value: '0',
          label: '未支付'
        },
        {
          value: '-1',
          label: '支付失败'
        },

      ],
      dateTypeList: [
        {
          value: '1',
          label: '天'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '3',
          label: '年'
        },

      ],
      dateTypeList2: [
        {
          value: '1',
          label: '天'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '3',
          label: '年'
        },

      ],
      dateList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '预约订单'
        },
        {
          value: '2',
          label: '柜前订单'
        },
        {
          value: '3',
          label: '充值'
        },
      ],
      dateList3: [
        {
          value: '1',
          label: '预约订单'
        },
        {
          value: '2',
          label: '柜前订单'
        }
      ],
      dateList4: [
        {
          value: '1',
          label: '预约订单'
        },
        {
          value: '2',
          label: '柜前订单'
        }
      ],
      buffet_id2: '',
      dateType4: '1',
      model1: [new Date(+new Date() - 7 * 1000 * 3600 * 24), new Date()],
      model2: [new Date(+new Date() - 7 * 1000 * 3600 * 24), new Date()],
      model3: [new Date(+new Date() - 7 * 1000 * 3600 * 24), new Date()],
      model4: new Date(),
      toDoList: [
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        }
      ],
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      cityData: cityData,
      showAddNewTodo: false,
      newToDoItemValue: ''
    };
  },
  created() {
    this.getList()
    // this.statistics_userIncrease()
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    async statistics_userIncrease() {
      let data = {
        newGetType: true,
        category: '1',
      }
      data.startDate = dayjs(new Date()).format('YYYY-MM-DD')
      data.endDate = dayjs(new Date()).format('YYYY-MM-DD')
      const res = await statistics_userIncrease(data)
      if (res) {
        this.todayUser = res.data.list[0].total
      }
    },
    // 获取表格数据
    async getBuffer() {
      const searchParam = []
      let data = {
        newGetType: true,
        carte_type: this.carte_type4,
        buffet_id: this.buffet_id2,
        Date: +new Date(this.model4) / 1000
      }
      const res = await statistics_salesInfo(data)
      let list = []
      for (const value in res.data.list) {
        list.push(res.data.list[value])
      }
      console.log(list)
      this.tableData4 = list
      this.data5 = res.data
    },
    async getList() {
      const res = await buffet_list({
        page: 1,
        perPage: 99999
      });
      if (res.data && res.data.data) {
        this.tableData2 = res.data.data;
        this.buffet_id = res.data.data[0].buffet_id + "";
        this.buffet_id2 = res.data.data[0].buffet_id + "";
        this.getBuffer()
      } else {
        this.tableData2 = [];
      }
    },
    changeDate(a, b) {
      console.log(a, b)
      this.$refs.componentref.getParam(this.payType, this.dateType, this.type, this.model1)
    },
    changeDate2(a, b) {
      console.log(a, b)
      this.$refs.componentref2.getParam(this.payType, this.dateType2, this.type, this.model2)
    },
    changeDate3(a, b) {
      console.log(a, b)
      this.$refs.componentref3.getParam(this.payType, this.dateType3, this.buffet_id, this.model3)
    },
    changeDate4(a, b) {
      this.getBuffer()
    },
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        });
        setTimeout(() => {
          this.newToDoItemValue = '';
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error('请输入待办事项内容');
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = '';
    }
  }
};
</script>
