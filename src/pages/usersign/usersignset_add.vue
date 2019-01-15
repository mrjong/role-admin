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
        <FormItem label="连续签到天数:" prop="num">
            <Input v-model="formValidate.num" placeholder="请输入连续签到天数" clearable></Input>
          </FormItem>
          <FormItem label="卡券:" prop="coupon_id">
            <Select  placeholder="请选择卡券" v-model="formValidate.coupon_id">
              <Option v-for="item in tableData" :key="item.id" :value="item.id+''">{{item.name}}</Option>
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
import { userSign_setInfo, coupon_list, userSign_editSet } from "@/service/getData"
export default {
  name: "usersign",
  data() {
    return {
      breadcrumbTitle: "编辑签到设置",
      formValidate: {
        use_date_length: ""
      },
      startTimeOption: {},
      endTimeOption2: {},
      endTimeOption: {},
      tableData: [],
      percentData:[],
      ruleValidate: {
              num: [
          {
            required: true,
            message: "请输入连续签到天数",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        coupon_id: [
          {
            required: true,
            message: "请选择卡券",
            trigger: "change"
          }
        ],
      }
    }
  },
  created() {
    this.getList()

      this.breadcrumbTitle = "添加签到设置"
  },
  mounted(){
    this.getuserSign_setInfo()
  },
  methods: {
      async getuserSign_setInfo(){
              const res = await userSign_setInfo()
       if (res && res.data && res.data.list) {
        this.formValidate={
            id:res.data.list.id,
            num:res.data.list.num+'',
            coupon_id:res.data.list.coupon_id+''
        }
      }
      },
    // 获取表格数据
    async getList() {
              const res = await coupon_list({
        page: 1,
        perPage: 9999
      })
       if (res && res.data && res.data.list && res.data.list.data) {
        this.tableData = res.data.list.data
      }
    },
    async register() {
      let res
        // 更新用户信息
        res = await userSign_editSet({
          id: this.formValidate.id,
          num: this.formValidate.num,
          coupon_id: this.formValidate.coupon_id
        })
      if (res) {
        setTimeout(() => {
          this.$router.push("/usersign/usersign_list")
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
      this.formValidate.desc = ""
      tinymce.activeEditor.setContent("")
      this.uploadListthumb = []
      this.uploadListBig = []
      if (this.$route.query && this.$route.query.points_id) {
        this.formValidate.points_id = this.$route.query.points_id
      } else {
        this.formValidate = {
          points_img: []
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>