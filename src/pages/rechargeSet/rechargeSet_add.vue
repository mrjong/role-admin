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
          <FormItem label="充值金额:" prop="money">
            <Input clearable v-model="formValidate.money" placeholder="请输入充值金额"></Input>
          </FormItem>
           <FormItem label="赠送金额:" prop="money_gift">
            <Input clearable v-model="formValidate.money_gift" placeholder="请输入赠送金额"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
import { rechargeSet_add, rechargeSet_edit } from "@/service/getData"
export default {
  name: "rechargeSet_add",
  data() {
    return {
      breadcrumbTitle: "添加充值设置",
      formValidate: {
      },
      ruleValidate: {
           money: [
          {
            required: true,
            message: "请输入充值金额",
            trigger: "blur"
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],   money_gift: [
          {
            required: true,
            message: "请输入赠送金额",
            trigger: "blur"
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      console.log("-------", this.$route.query)
      this.formValidate = {
        id: this.$route.query.id,
        money: this.$route.query.money+'',
        money_gift: this.$route.query.money_gift+'',
      }
      this.breadcrumbTitle = "编辑充值设置"
    } else {
      // 新增用户时提示一下
      this.breadcrumbTitle = "添加充值设置"
    }
  },
  methods: {
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新用户信息
        res = await rechargeSet_edit({
          id: this.$route.query.id,
           money: this.formValidate.money,
        money_gift: this.formValidate.money_gift,
        })
      } else {
        // 新增用户
        console.log(this.formValidate.use_start_date)
        res = await rechargeSet_add({
             money: this.formValidate.money,
        money_gift: this.formValidate.money_gift,
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/rechargeSet/rechargeSet_list")
        }, 2000)
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate)
          this.register()
        } 
      })
    }
  }
}
</script>