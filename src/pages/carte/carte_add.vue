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
          <FormItem  v-if="$route.query&&$route.query.carte_id" label="预约时间:" prop="presetTime">
            <DatePicker  v-model="formValidate.presetTime" type="date" placeholder="请选择预约时间" style="width: 100%"></DatePicker>
          </FormItem>
           <FormItem  v-if="!$route.query||!$route.query.carte_id" label="预约时间:" prop="presetTime">
            <DatePicker  v-model="formValidate.presetTime" type="date" multiple placeholder="请选择预约时间" style="width: 100%"></DatePicker>
          </FormItem>
          <Row>
            <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem label="是否商家推荐:" prop="is_recommend">
              <i-switch v-model="formValidate.is_recommend" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
            <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem :label-width="110" label="是否可以使用红包" prop="is_use_bonus">
              <i-switch v-model="formValidate.is_use_bonus" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
                <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem :label-width="110" label="是否预约降价" prop="is_use_bonus">
              <i-switch v-model="formValidate.is_preset_depreciate" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
          </Row>
          <FormItem label="商品剩余数量:" prop="goods_num">
            <Input clearable v-model="formValidate.goods_num" placeholder="请输入商品剩余数量"></Input>
          </FormItem>
          <FormItem label="预定降价金额:" prop="preset_depreciate">
            <Input clearable v-model="formValidate.preset_depreciate" placeholder="请输入预定降价金额"></Input>
          </FormItem>
          <FormItem  label="商品:" prop="goods_id">
            <Select  v-if="$route.query&&$route.query.carte_id" filterable clearable  v-model="formValidate.goods_id">
              <Option :key="item.goods_id" v-for="item in goodsList" :value="item.goods_id">{{item.name}}</Option>
            </Select>
            <Select filterable clearable v-if="!$route.query||!$route.query.carte_id" multiple v-model="formValidate.goods_id">
              <Option :key="item.goods_id" v-for="item in goodsList" :value="item.goods_id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="餐柜:" prop="buffet_id">
            <Select filterable clearable v-model="formValidate.buffet_id">
              <Option :key="item.buffet_id" v-for="item in buffetList" :value="Number(item.buffet_id)">{{item.buffet_name}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
    <!-- <Modal title="预览图片" v-model="visible">
      <img :src="`${imgName}`" v-if="visible" style="width: 100%">
    </Modal> -->
  </Card>
</template>

<script>
import {
  carte_add,
  carte_edit,
  goods_list,
  buffet_list
} from "@/service/getData"
import Cookie from "js-cookie"
const validatePassCheck = (rule, value, callback) => {
  console.log(value)
  if (value.length === 0) {
    callback()
  } else {
    callback()
  }
}
export default {
  name: "carte_add",
  data() {
    return {
      data1: {},
      headers: {
        token: Cookie.get("token")
        // "Content-Type": "multipart/form-data"
      },
      thumbImg: {},
      breadcrumbTitle: "编辑预约菜单",
      formValidate: {
        goods_img: []
      },
      goodsList: [],
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListBig: [],
      buffetList: [],
      uploadListthumb: [],
      ruleValidate: {
        goods_num: [
          {
            required: true,
            message: "请输入商品剩余数量",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        preset_depreciate: [
          {
            required: true,
            message: "请输入预定降价金额",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        buffet_id: [
          {
            required: true,
            message: "请选择餐柜",
            trigger: "change",
            type:'number'
          }
        ]
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.carte_id) {
      console.log(this.$route.query.buffet_id,'--------')
            this.ruleValidate.goods_id= [
          {
            required: true,
            message: "请选择商品",
            trigger: "change",
            type: 'number'
          }
        ]
            this.ruleValidate.presetTime= [
          {
            required: true,
            message: "请选择预约时间",
            trigger: "change",
            type: 'date'            
          }
        ]
      this.formValidate = {
        carte_id:this.$route.query.carte_id,
        goods_id:Number(this.$route.query.goods_id),
        goodsList:[{id:Number(this.$route.query.goods_id)}],
        presetTime:new Date(`${this.$route.query.preset_year}-${this.$route.query.preset_month}-${this.$route.query.preset_day}`),
        preset_depreciate:this.$route.query.preset_depreciate,
        is_use_bonus: this.$route.query.is_use_bonus+''==='1'?true:false,
        is_preset_depreciate: this.$route.query.is_preset_depreciate+''==='1'?true:false,
        is_recommend: this.$route.query.is_recommend+''==='1'?true:false,
        goods_num: this.$route.query.goods_num+'',
        buffet_id:Number(this.$route.query.buffet_id)
      }
      this.breadcrumbTitle = "编辑预约菜单"
    } else {
      // 新增用户时提示一下
      this.uploadListthumb = []
      this.breadcrumbTitle = "添加预约菜单"
          this.ruleValidate.goods_id= [
          {
            required: true,
            message: "请选择商品",
            trigger: "change",
            type: 'array'
          }
        ]
            this.ruleValidate.presetTime= [
          {
            required: true,
            message: "请选择预约时间",
            trigger: "change",
            type: 'array'            
          }
        ]
    
    }
       this.getGoods()
      this.getBuffet()
   
  },
  methods: {
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
      } else {
        this.buffetList = []
      }
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.carte_id) {
        // 更新用户信息
        res = await carte_edit({
          carte_id:this.$route.query.carte_id,
          presetDate: +new Date(this.formValidate.presetTime)/1000,
          goods_id:  this.formValidate.goods_id,
          goods_num: this.formValidate.goods_num,
          is_use_bonus: this.formValidate.is_use_bonus,
          is_preset_depreciate: this.formValidate.is_preset_depreciate,
          preset_depreciate: this.formValidate.preset_depreciate,
          is_recommend: this.formValidate.is_recommend,
          buffet_id: this.formValidate.buffet_id
        })
      } else {
        // 新增用户
        console.log(this.formValidate)
        let presetTime = [],
          goods_id = []
        this.formValidate.presetTime.forEach(element => {
          presetTime.push({
            presetDate: +new Date(element) / 1000
          })
        })
        this.formValidate.goods_id.forEach(element => {
          goods_id.push({
            id: element
          })
        })
        console.log(presetTime)
        res = await carte_add({
          presetTime: presetTime,
          goods_id: goods_id,
          goods_num: this.formValidate.goods_num,
          is_use_bonus: this.formValidate.is_use_bonus,
          is_preset_depreciate: this.formValidate.is_preset_depreciate,
          preset_depreciate: this.formValidate.preset_depreciate,
          is_recommend: this.formValidate.is_recommend,
          buffet_id: this.formValidate.buffet_id
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/carte/carte_list")
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
    handleReset(name) {
      this.formValidate.contents = ""
      tinymce.activeEditor.setContent("")
      this.uploadListthumb = []
      this.uploadListBig = []
      if (this.$route.query && this.$route.query.goods_id) {
        this.formValidate.goods_id = this.$route.query.goods_id
      } else {
        this.formValidate = {
          goods_img: []
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>