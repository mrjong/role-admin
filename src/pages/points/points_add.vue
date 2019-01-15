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
          <FormItem label="积分数量:" prop="points_num">
            <Input clearable v-model="formValidate.points_num" placeholder="请输入积分数量"></Input>
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
import { points_add, bonus_list, points_edit } from "@/service/getData"
export default {
  name: "points_add",
  data() {
    return {
      breadcrumbTitle: "编辑兑换红包",
      formValidate: {
        use_date_length: ""
      },
      startTimeOption: {},
      endTimeOption2: {},
      endTimeOption: {},
      tableData: [],
      ruleValidate: {
        bonus_id: [
          {
            required: true,
            message: "请选择红包",
            trigger: "change"
          }
        ],
        points_num: [
          {
            required: true,
            message: "请输入积分数量",
            trigger: "blur"
          },
          {
            pattern: /^\d*$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    console.log(this.$route.query, "-------")
    if (this.$route.query && this.$route.query.id) {
      this.formValidate = {
        id: this.$route.query.id,
        points_num: this.$route.query.points_num+'',
        bonus_id: this.$route.query.bonus_id+''
      }
      this.breadcrumbTitle = "编辑兑换红包"
    } else {
      // 新增用户时提示一下
      this.breadcrumbTitle = "添加兑换红包"
    }
  },
  methods: {
    // 获取表格数据
    async getList() {
      const res = await bonus_list({
        page: 1,
        perPage: 9999,
        searchParam:[{
          searchValue:'3',
          searchColumn:'type',
          searchOperator:'='
        }],
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.tableData = res.data.list.data
      } else {
        this.tableData = []
      }
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新用户信息
        res = await points_edit({
          id: this.$route.query.id,
          points_num: this.formValidate.points_num,
          bonus_id: this.formValidate.bonus_id
        })
      } else {
        // 新增用户
        console.log(this.formValidate)
        res = await points_add({
          points_num: this.formValidate.points_num,
          bonus_id: this.formValidate.bonus_id
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/points/points_listset")
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