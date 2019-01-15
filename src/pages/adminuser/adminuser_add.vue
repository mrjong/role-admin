<template>
  <Card>
    <p slot="title">
      {{breadcrumbTitle}}
      <Button class="fr vue-back-btn header-btn" type="default" size="small" @click="$router.go(-1)">返回</Button>
    </p>
    <div class="vue-panel">
      <Row type="flex" justify="center">
        <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem v-if="!formValidate.userid" label="用户名:" prop="username">
            <Input clearable v-model="formValidate.username" placeholder="请输入用户姓名"></Input>
          </FormItem>
          <FormItem label="手机号码:" prop="phone">
            <Input clearable v-model="formValidate.phone" placeholder="请输入手机号码"></Input>
          </FormItem>
          <FormItem label="昵称:" prop="nickname">
            <Input clearable v-model="formValidate.nickname" placeholder="请输入昵称"></Input>
          </FormItem>
          <FormItem label="邮箱:" prop="email">
            <Input clearable v-model="formValidate.email" placeholder="请输入邮箱"></Input>
          </FormItem>
          <FormItem v-if="!formValidate.userid" label="密码:" prop="password">
            <Input clearable v-model="formValidate.password" placeholder="请输入密码"></Input>
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
import { adminuser_add, adminuser_edit } from "@/service/getData"
export default {
  name: "adminuser_add",
  data() {
    return {
      breadcrumbTitle: "添加管理员",
      formValidate: {},
      ruleValidate: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 5,
            max: 50,
            message: "请输入5-30长度字符用户名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /^1\d{10}$/,
            message: "手机号码格式输入错误",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          },
          {
            min: 5,
            max: 30,
            message: "请输入5-30长度字符昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          { type: "email", message: "电子邮箱格式不正确", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "请输入6-30长度字符密码",
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
    loadPage() {
      console.log(this.$route.query)
      console.log(this.$route.query.id)
      if (this.$route.query && this.$route.query.id) {
        // this.findUserInfo()
        this.formValidate = {
          nickname: this.$route.query.nickname,
          email: this.$route.query.email,
          phone: this.$route.query.phone,
          userid: this.$route.query.id
        }
        this.breadcrumbTitle = "编辑管理员"
      } else {
        // 新增用户时提示一下
        this.breadcrumbTitle = "添加管理员"
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
        // 编辑管理员
        res = await adminuser_edit(this.formValidate)
        if (res) {
          setTimeout(() => {
            this.$router.push("/adminuser/adminuser_list")
          }, 2000)
        }
      } else {
        // 编辑管理员
        res = await adminuser_add(this.formValidate)
        if (res) {
          setTimeout(() => {
            this.$router.push("/adminuser/adminuser_list")
          }, 2000)
        }
      }
    }
  }
}
</script>

<style>
</style>