<style lang="less">
</style>

<template>
  <div class="users_desc">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
      </p>
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="80"
        :rules="ruleValidate"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="餐柜:"
            prop="buffet_id"
          >
            <Select
              @on-change="changeG"
              filterable
              placeholder="请选择餐柜"
              v-model="formItem.buffet_id"
            >
              <Option
                v-for="item in tableData2"
                :key="item.buffet_id"
                :value="item.buffet_id+''"
              >{{item.buffet_name}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <!-- <Alert show-icon type="warning">
                说明：
                <template slot="desc">
                    <p>红色：未补餐</p>
                    <p>绿色：已补餐</p>
                    <p>灰色：空盒子</p>
                </template>
            </Alert> -->
      <div class="clearfix">
        <div
          v-for="(item,index) in gridData"
          class="list_box"
        >

          <Badge
            class="grid-item"
            :count="'编号:'+item.grid_code"
            :class-name="item.info&&item.info.is_push==='1'?'demo-badge-red':item.info&&item.info.is_push==='0'?'demo-badge-alone':'demo-badge-none'"
          >
            <div>
              <div v-if="item.info.length!==0">
                <div>
                  <div>
                    <div>
                      <Tooltip
                        class="tooltip"
                        placement="top-start"
                      >
                        <div slot="content">
                          <div>
                            昵称:{{item.info&&item.info.uinfo&&item.info.uinfo.nickname}}
                          </div>
                          <div>
                            用户ID:{{item.info&&item.info.uinfo&&item.info.uinfo.id}}
                          </div>
                          <div>
                            电话:{{item.info&&item.info.uinfo&&item.info.uinfo.phone}}
                          </div>
                        </div>
                        <img
                          style="width:100%;height:50px"
                          :src="item.info&&item.info.uinfo&&item.info.uinfo.avatar"
                          alt=""
                        >
                        <div class="name">{{item.info&&item.info.uinfo&&item.info.uinfo.nickname}}</div>
                      </Tooltip>
                      <Tooltip
                        class="tooltip"
                        placement="top-end"
                      >
                        <div slot="content">
                          <div>
                            菜单ID:{{item.info&&item.info.goods&&item.info.goods.goods_id}}
                          </div>
                          <div>
                            名称:{{item.info&&item.info.goods&&item.info.goods.name}}
                          </div>
                          <div>
                            价格:{{item.info&&item.info.goods&&item.info.goods.price}}
                          </div>
                          <div>
                            促销价格:{{item.info&&item.info.goods&&item.info.goods.promote_price}}
                          </div>
                        </div>
                        <img
                          style="width:100%;height:50px"
                          :src="item.info&&item.info.goods&&item.info.goods.thumb"
                          alt=""
                        >
                        <div class="name">{{item.info&&item.info.goods&&item.info.goods.name}}</div>
                      </Tooltip>
                    </div>
                    <div class="desc">
                      <div v-if="item.info&&item.info.type">
                        <span>菜单类型：</span>
                        <span>{{item.info.type==1?'预定菜单':'柜前菜单'}}</span>
                      </div>
                      <div v-if="item.info&&item.info.is_push">
                        <span>是否补餐：</span>
                        <span>{{item.info.is_push==1?'是':'否'}}</span>
                      </div>
                      <div v-if="item&&item.add_goods_time">
                        <div>补餐时间：</div>
                        <span>{{item.add_goods_time | formatDate}}</span>
                      </div>
                    </div>
                    <Button
                      class="mt30"
                      size="small"
                      long
                      type="error"
                      v-show="item.info&&item.info.goods"
                      @click="delGoods(item,index)"
                    >作废</Button>
                  </div>
                </div>
              </div>

            </div>

          </Badge>
          <Button
            size="small"
            long
            @click="buffet_openGrid(item.grid_id)"
            type="success"
          >打开网格</Button>
        </div>
      </div>
    </Card>

  </div>
</template>

<script>
import { buffet_info, buffet_list, buffet_Obsolete,buffet_openGrid } from "@/service/getData";
import * as filtersT from "@/filters";
export default {
  name: "buffet_desc",
  filters: {
    formatDate(date) {
      return filtersT.default.formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      data: "",
      tableData2: [],
      formItem: {},
      gridData: [],
      ruleValidate: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changeG(val) {
      this.getinfo(val);
    },
    async getList() {
      const res = await buffet_list({
        page: 1,
        perPage: 99999
      });
      if (res.data && res.data.data) {
        this.tableData2 = res.data.data;
        this.formItem.buffet_id = res.data.data[0].buffet_id + "";
        this.getinfo(res.data.data[0].buffet_id + "");
      } else {
        this.tableData2 = [];
      }
    },
        async buffet_openGrid(id) {
       await buffet_openGrid({
        grid_id:id
      });
        
    },
    async getinfo(id) {
      const res = await buffet_info({
        buffet_id: id
      });
      if (res) {
        this.gridData = res.data;
      }
    },
    async delGoods(item) {
      const res = await buffet_Obsolete({
        type: item.info.type,
        relation_id: item.info.relation_id
      })
      if (res) {
        this.getinfo(this.formItem.buffet_id);
      }
    }
  }
};
</script>

<style lang="less">
.list_box {
  float: left;
  width: 10%;
  margin: 5px 5px 15px;
  text-align: center;

}
.grid-item {
  min-height: 162px;
  max-height: 162px;
  position: relative;
  width: 100%;
  float: left;
  border-radius: 6px;
  display: inline-block;
  .title {
    color: #333;
    font-weight: 600;
  }

  .desc {
    font-size: 12px;
    text-align: left;
    line-height: 17px;
    &::last-child {
      border-bottom: none;
    }
  }
  &.green {
    background-color: green;
    color: #fff;
  }
  color: #333;
  border: 1px solid #666;
  margin: 5px 0;
}
.clearfix:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
.demo-badge-red {
  background: red !important;
}
.demo-badge-none {
  background: grey !important;
}
.demo-badge-red {
  background: #5cb85c !important;
}
.mt30 {
  border-radius: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.tooltip {
  width: 50%;
  height: 70px;
  float: left;

  .name {
    font-size: 12px;
    text-align: center;
  }
}
.ivu-badge-count {
  right: 50%;
}
</style>
