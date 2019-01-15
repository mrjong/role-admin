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
           <FormItem label="公告内容:" prop="contents">
            <Input clearable v-model="formValidate.contents" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入公告内容"></Input>
            <!-- <vue-ueditor-wrap :destroy="true" :config="myConfig" v-model="formValidate.contents"></vue-ueditor-wrap> -->
          </FormItem>
            <FormItem v-if="formValidate.status" label="公告状态:" prop="status">
            <Select v-model="formValidate.status">
              <Option value='1'>正常</Option>
              <Option value='2'>下架</Option>
            </Select>
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
import { notice_add, notice_edit } from "@/service/getData"
import Cookie from "js-cookie"
// import tinymce from "tinymce"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  name: "notice_add",
  components: { VueUeditorWrap },
  data() {
    return {
      data1: {},
      headers: {
        token: Cookie.get("token")
        // "Content-Type": "multipart/form-data"
      },
      thumbImg: {},
      breadcrumbTitle: "编辑公告",
      formValidate: {
        goods_img: [],
        contents: "",
        sort_order: 1
      },
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListBig: [],
      uploadListthumb: [],
      // 编辑器配置
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: "http://shopadmin.e-blive.com/admin/upload/img?richTxt=1",
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: "./static/UEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        maximumWords: 65535,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: false
      },
      ruleValidate: {
        status: [
          {
            required: true,
            message: "请选择公告状态",
            trigger: "change"
          },
        ],
        contents: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          },
          {
            max: 65535,
            message: "内容不能太长",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {},
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.formValidate = {
        id: this.$route.query.id,
       status: this.$route.query.status+'',
        contents: this.$route.query.contents
      }
      this.breadcrumbTitle = "编辑公告"
    } else {
      // 新增用户时提示一下
      this.formValidate = {
        contents: ""
      }
      this.uploadListthumb = []
      this.breadcrumbTitle = "添加公告"
    }
  },
  methods: {
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新用户信息
        res = await notice_edit({
          id: this.formValidate.id,
          status: this.formValidate.status,
          contents: this.formValidate.contents
        })
      } else {
        // 新增用户
        res = await notice_add({
          contents: this.formValidate.contents
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/notice/notice_list")
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