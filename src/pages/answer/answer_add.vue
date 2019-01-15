<template>
  <Card>
    <p slot="title">
      {{breadcrumbTitle}}
      <Button class="fr vue-back-btn header-btn" type="default" size="small" @click="$router.go(-1)">返回</Button>
    </p>
    <div class="vue-panel">
      <Row type="flex" justify="center">
        <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="答题标题:" prop="title">
            <Input clearable v-model="formValidate.title" placeholder="请输入答题标题"></Input>
          </FormItem>
          <FormItem v-for="(item, index) in formValidate.items" v-if="item.status" :key="index" label="答题选项：" :prop="'items.' + index + '.value'" :rules="{required: true, message: '答题选项内容不能为空', trigger: 'blur'}">
            <Row>
              <Col span="18">
              <Input type="text" v-model="item.value" placeholder="请输入答题选项内容"></Input>
              </Col>
              <Col span="4" offset="1">
              <Button type="error" @click="handleRemove(index)">删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12 ">
              <Button type="dashed" long @click="handleAdd" icon="plus-round ">添加答题选项</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate') ">保存</Button>
            <!-- <Button type="ghost " @click="handleReset( 'formValidate') " style="margin-left: 8px ">清空</Button> -->
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
import { answer_add, answer_edit } from "@/service/getData"
export default {
  name: "answer_add",
  data() {
    return {
      index: 1,
      breadcrumbTitle: "添加答题",
      formValidate: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "请输入答题标题",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    handleAdd() {
      this.index++
      this.formValidate.items.push({
        value: "",
        index: this.index,
        status: 1
      })
    },
    handleRemove(index) {
      this.formValidate.items[index].status = 0
    },
    loadPage() {
      console.log(this.$route.query)
      console.log(this.$route.query.id)
      if (this.$route.query && this.$route.query.id) {
        // this.findUserInfo()
        let options = JSON.parse(this.$route.query.options)
        let items = []
        options.forEach(element => {
          items.push({
            value: element.name,
            index: 1,
            id: element.id,
            status: 1
          })
        })
        this.formValidate = {
          id: this.$route.query.id,
          title: this.$route.query.title,
          items
        }
        this.breadcrumbTitle = "编辑答题"
      } else {
        // 新增用户时提示一下
        this.breadcrumbTitle = "添加答题"
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register()
        }
      })
    },
    handleReset(name) {
      if (this.$route.query && this.$route.query.id) {
        this.formValidate = {}
        this.formValidate.userid = this.$route.query.id
      } else {
        this.formValidate = {}
      }
      this.$refs[name].resetFields()
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 编辑答题
        let options = []
        this.formValidate.items.forEach(element => {
          let item = {
            name: element.value
          }
          if (element.id) {
            item.id = element.id
          }
          if(element.status!==0){
          options.push(item)
          }
        })
        let formValidate = {
          id: this.formValidate.id,
          title: this.formValidate.title,
          options: JSON.stringify(options)
        }
        res = await answer_edit(formValidate)
        if (res) {
          setTimeout(() => {
            this.$router.push("/answer/answer_list")
          }, 2000)
        }
      } else {
        // 新增答题
        let options = []
        this.formValidate.items.forEach(element => {
          options.push(element.value)
        })
        let formValidate = {
          title: this.formValidate.title,
          options: JSON.stringify(options)
        }
        res = await answer_add(formValidate)
        if (res) {
          setTimeout(() => {
            this.$router.push("/answer/answer_list")
          }, 2000)
        }
      }
    }
  }
}
</script>

<style>
</style>