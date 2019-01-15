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
        <FormItem label="答对百分比:" prop="percent">
            <Select  placeholder="请选择答对百分比" v-model="formValidate.percent">
              <Option v-for="item in percentData" :key="item.percent" :value="item.percent+''">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="红包:" prop="bonus_id">
            <Select  placeholder="请选择红包" v-model="formValidate.bonus_id">
              <Option v-for="item in tableData" :key="item.bonus_id" :value="item.bonus_id+''">{{item.name}}</Option>
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
import { answer_addAward, bonus_list, answer_editAward } from "@/service/getData"
export default {
  name: "award_add",
  data() {
    return {
      breadcrumbTitle: "编辑答题奖励",
      formValidate: {
        use_date_length: ""
      },
      startTimeOption: {},
      endTimeOption2: {},
      endTimeOption: {},
      tableData: [],
      percentData:[],
      ruleValidate: {
        bonus_id: [
          {
            required: true,
            message: "请选择红包",
            trigger: "change"
          }
        ],
            percent: [
          {
            required: true,
            message: "请选择答对百分比",
            trigger: "change"
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getPercentData()
    console.log(this.$route.query, "-------")
    if (this.$route.query && this.$route.query.id) {
      this.formValidate = {
        id: this.$route.query.id,
        percent: this.$route.query.percent+'',
        bonus_id: this.$route.query.bonus_id+''
      }
      this.breadcrumbTitle = "编辑答题奖励"
    } else {
      // 新增用户时提示一下
      this.breadcrumbTitle = "添加答题奖励"
    }
  },
  methods: {
      getPercentData(){
          this.percentData = []
         for (let index = 1; index <= 10; index++) {
            this.percentData.push({
                percent:index * 10,
                name:index * 10 + "%"
            })
          }
      },
    // 获取表格数据
    async getList() {
    const res = await bonus_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res && res.data && res.data.list && res.data.list.data) {
        this.tableData = res.data.list.data
      }
      console.log(res, "---------")
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新用户信息
        res = await answer_editAward({
          id: Number(this.$route.query.id),
          percent: this.formValidate.percent,
          bonus_id: this.formValidate.bonus_id
        })
      } else {
        // 新增用户
        res = await answer_addAward({
          percent: this.formValidate.percent,
          bonus_id: this.formValidate.bonus_id
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/award/award_list")
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