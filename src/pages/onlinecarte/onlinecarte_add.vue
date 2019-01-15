<template>
  <Card class="vue-panel">
    <p slot="title">
      {{breadcrumbTitle}}
      <Button class="fr vue-back-btn header-btn" type="default" size="small" @click="$router.go(-1)">返回</Button>
    </p>
    <div class="vue-panel-desc">
      <Row type="flex" justify="center">
        <Col :md="14" :lg="12" :xs="24" :sm="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
           <FormItem label="点餐时间:" prop="datetime">
            <DatePicker style="width:100%" v-model="formValidate.datetime" format="yyyy-MM-dd" type="datetime" placement="bottom-start" placeholder="请选择开始发送时间"></DatePicker>
          </FormItem>
            <FormItem label="餐柜:" prop="buffet_id">
            <Select filterable @on-change="changeGrid" clearable v-model="formValidate.buffet_id">
              <Option :key="item.buffet_id" v-for="item in buffetList" :value="Number(item.buffet_id)">{{item.buffet_name}}</Option>
            </Select>
          </FormItem>
              <FormItem label="餐柜网格:" prop="grid_id">
            <Select filterable clearable  v-model="formValidate.grid_id">
              <Option :key="item.grid_id" v-for="item in gridList" :value="Number(item.grid_id)">{{item.grid_code}}</Option>
            </Select>
          </FormItem>
             <FormItem label="商品:" prop="goods_id">
            <Select filterable clearable  v-model="formValidate.goods_id">
              <Option :key="item.goods_id" v-for="item in goodsList" :value="Number(item.goods_id)">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button> -->
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
import { onlinecarte_add,buffet_list,goods_list } from "@/service/getData"
import Vue from 'vue'
export default {
  name: "onlinecarte_add",
  data() {
    return {
      breadcrumbTitle: "添加柜前点餐",
      formValidate: {
      },
      gridList:[],
      goodsList:[],
      buffetList:[],
      startTimeOption: {},
      endTimeOption2: {},
      endTimeOption: {},
      ruleValidate: {
        datetime: [
          {
            required: true,
            message: "请选择点餐时间",
            trigger: "change",
            type:'date'
          }
        ],
        buffet_id: [
          {
            required: true,
            message: "请选择餐柜",
            trigger: "change",
            type:'number'
          }
        ],
         grid_id: [
          {
            required: true,
            message: "请选择网格",
            trigger: "change",
            type:'number'
          }
        ],
        goods_id: [
          {
            required: true,
            message: "请选择商品",
            trigger: "change",
            type:'number'
          },
        ],
      }
    }
  },
  created() {
    this.getBuffet()
    this.getGoods()
    console.log(this.$route.query)
        if (this.$route.query && this.$route.query.id) {
        this.formValidate = {
        grid_id:this.$route.query.grid_id,
        grid_code:this.$route.query.grid_code,
        goods_id:Number(this.$route.query.goods_id),
        datetime:new Date(`${this.$route.query.year}-${this.$route.query.month}-${this.$route.query.day}`),
        buffet_id:Number(this.$route.query.buffet_id)
      }
      this.breadcrumbTitle = "编辑柜前点餐"
    } else {
      // 新增用户时提示一下
      this.breadcrumbTitle = "添加柜前点餐"
    }
  },
  methods: {
    changeGrid(){
      Vue.nextTick(()=>{
      this.gridList=[]
    //   Vue.set(this.formValidate,'grid_id','')    

      this.buffetList.forEach((element,index) => {
        if(this.buffetList[index].buffet_id+''===this.formValidate.buffet_id+''){
          this.gridList=this.buffetList[index].buffet_grid
        }
      });
})
Vue.set(this.formValidate,'grid_code','97')    

    },
        // 获取表格数据
    async getGoods() {
      const res = await goods_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.goodsList = res.data.list.data
      } else {
        this.goodsList = []
      }
    },
       // 获取餐柜
    async getBuffet() {
      const res = await buffet_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      console.log(res, "-----------")
      if (res.data && res.data.data) {
        this.buffetList = res.data.data
     if(this.$route.query && this.$route.query.id){
          this.changeGrid()
     }
      } else {
        this.buffetList = []
      }
    },
    async register() {
        // 新增用户
        console.log(this.formValidate.use_start_date)
       let res = await onlinecarte_add({
          datetime:+new Date(this.formValidate.datetime)/1000,
          buffet_id:this.formValidate.buffet_id,
          grid_id:this.formValidate.grid_id,
          goods_id:this.formValidate.goods_id,
        })
      if (res) {
        setTimeout(() => {
          this.$router.push("/onlinecarte/onlinecarte_list")
        }, 2000)
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate)
          this.register()
        } else {
          //   this.$Message.error("Fail!");
        }
      })
    },
  }
}
</script>