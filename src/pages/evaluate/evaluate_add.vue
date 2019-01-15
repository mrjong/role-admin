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
                  <FormItem label="评价类型:" prop="category">
            <Select @on-change="changeType" v-model="formValidate.category">
              <Option value='1'>餐柜</Option>
              <Option value='2'>菜品</Option>
            </Select>
          </FormItem>
            <FormItem v-if="formValidate.category==='1'" label="餐柜:" prop="union_id">
            <Select filterable placeholder="请选择餐柜" v-model="formValidate.union_id">
              <Option v-for="item in tableData2" :key="item.buffet_id" :value="item.buffet_id+''">{{item.buffet_name}}</Option>
            </Select>
          </FormItem>
             <FormItem v-if="formValidate.category==='2'" label="菜品:" prop="union_id">
            <Select filterable placeholder="请选择菜品" v-model="formValidate.union_id">
              <Option v-for="item in tableData3" :key="item.goods_id" :value="item.goods_id+''">{{item.name}}</Option>
            </Select>
          </FormItem>
               <FormItem label="口碑:" prop="praise">
            <Select v-model="formValidate.praise">
              <Option value='3'>好评</Option>
              <Option value='1'>差评</Option>
              <Option value='2'>一般</Option>
            </Select>
          </FormItem>
        <FormItem label="头像图片:" prop="avatar">
            <div class="demo-upload-list" v-for="item in uploadListavatar">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item,'uploadThumb')"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload v-show="uploadListavatar.length===0" ref="uploadThumb" :show-upload-list="false" name="upfile" :default-file-list="defaultList" :data="{isCompress:1}" :on-success="handleSuccess1" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :headers="headers" action="/admin/upload/img" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="用户名:" prop="userName">
            <Input clearable v-model="formValidate.userName" type="text" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入用户名"></Input>
          </FormItem>
            <FormItem label="评价内容:" prop="contents">
            <Input clearable v-model="formValidate.contents" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入评价内容"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
    <Modal title="预览图片" v-model="visible">
      <img :src="`${imgName}`" v-if="visible" style="width: 100%">
    </Modal>
  </Card>
</template>

<script>
import { evaluate_add,buffet_list,goods_list, evaluate_edit } from "@/service/getData"
import Cookie from "js-cookie"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  name: "evaluate_add",
  components: { VueUeditorWrap },
  data() {
    return {
      tableData2: [],
      tableData3:[],
      // 编辑器配置
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: "/upload/img?richTxt=1",
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
      data1: {},
      headers: {
        token: Cookie.get("token")
      },
      avatarImg: {},
      breadcrumbTitle: "编辑商品",
      formValidate: {
        evaluate_img: [],
        desc: "",
        sort_order: 1
      },
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListBig: [],
      uploadListavatar: [],
      ruleValidate: {
        category: [
          {
            required: true,
            message: "请选择评价类型",
            trigger: "change"
          }
        ],
            praise: [
          {
            required: true,
            message: "请选择口碑",
            trigger: "change"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },

        ],
           contents: [
          {
            required: true,
            message: "请输入评价内容",
            trigger: "blur"
          },
            {
            max: 250,
            message: "简短描述不能超过250个字",
            trigger: "blur"
          }

        ],
        avatar: [
          {
            required: true,
            message: "请上传头像图片",
            trigger: "blur",
            
          }
        ],
      }
    }
  },
  created() {
    this.loadPage()
this.getList2()
this.getGoods()
    
  },
  mounted() {
    // this.uploadListBig = this.$refs.upload.fileList
    // this.uploadListavatar = this.$refs.uploadThumb.fileList
  },
  methods: {
      changeType(){
          if(this.formValidate.category==='1'){
              this.ruleValidate.union_id=[{
            required: true,
            message: "请选择餐柜",
            trigger: "change",
          }]
          }else{
        this.ruleValidate.union_id=[{
            required: true,
            message: "请选择菜品",
            trigger: "change",
          }]
          }
      },
              // 获取表格数据
    async getList2() {
      const res = await buffet_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.data) {
        this.tableData2 = res.data.data
      } else {
        this.tableData2 = []
      }
    },
      async getGoods() {
      const res = await goods_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.tableData3 = res.data.list.data
      } else {
        this.tableData3 = []
      }
    },
    loadPage() {
      console.log(this.$route.query.is_on_sale)
      if (this.$route.query && this.$route.query.evaluate_id) {
        this.formValidate = {
          evaluate_id: this.$route.query.evaluate_id,
          name: this.$route.query.name,
          price: this.$route.query.price,
          rank_price: this.$route.query.rank_price,
          promote_price: this.$route.query.promote_price,
          brief: this.$route.query.brief,
          desc: this.$route.query.desc,
          avatar: this.$route.query.avatar,
          evaluate_img: this.$route.query.evaluate_img,
          is_on_sale: this.$route.query.is_on_sale ? true : false,
          sort_order: Number(this.$route.query.sort_order),
          seller_note: this.$route.query.seller_note,
          is_best: this.$route.query.is_best ? true : false,
          is_hot: this.$route.query.is_hot ? true : false
        }
        this.uploadListavatar.push({
          name: this.$route.query.avatar,
          url: this.$route.query.avatar,
          status: "finished"
        })
        for (let i = 0; i < this.$route.query.evaluate_img.length; i++) {
          this.uploadListBig.push({
            name: this.$route.query.evaluate_img[i],
            url: this.$route.query.evaluate_img[i],
            status: "finished"
          })
        }
        this.breadcrumbTitle = "编辑商品"
      } else {
        // 新增用户时提示一下
        this.breadcrumbTitle = "添加商品"
      }
    },
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file, upload) {
      console.log(file)
      if (upload !== "upload") {
        this.uploadListavatar.splice(this.uploadListavatar.indexOf(file), 1)
        this.formValidate.avatar = ""
      } else {
        this.uploadListBig.forEach((element, index) => {
          if (element.url === file.url) {
            this.uploadListBig.splice(this.uploadListBig.indexOf(file), 1)
            let i = this.formValidate.evaluate_img.indexOf(file.url)
            console.log(i)
            this.formValidate.evaluate_img.splice(i, 1)
            console.log(this.uploadListBig)
            console.log(this.formValidate.evaluate_img)
          }
        })
      }
    },
    handleSuccess1(res, file, fileList) {
      if (res && res.code === 200) {
        this.formValidate.avatar = res.data.path
        this.uploadListavatar = [
          {
            name: this.formValidate.avatar,
            url: this.formValidate.avatar,
            status: "finished"
          }
        ]
        this.$refs.formValidate.validateField("avatar")
        file.url = res.data.path
        file.name = res.data.path
      }
    },
    handleSuccess(res, file, fileList) {
      console.log(fileList)
      if (res && res.code === 200) {
        this.formValidate.evaluate_img &&
          this.formValidate.evaluate_img.push(res.data.path)
        this.uploadListBig.push({
          name: res.data.path,
          url: res.data.path,
          status: "finished"
        })
        this.$refs.formValidate.validateField("evaluate_img")
        file.url = res.data.path
        file.name = res.data.path
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " +
          file.name +
          " 格式不正确，请上传jpeg、jpg 或 png 格式的图片。"
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      })
    },
    handleBeforeUpload(file) {
      const check = this.uploadListBig.length < 20
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传 20 张图片。"
        })
      }
      return check
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.evaluate_id) {
        // 更新用户信息
        res = await evaluate_edit({
          evaluate_id: this.$route.query.evaluate_id,
          name: this.formValidate.name,
          price: this.formValidate.price,
          rank_price: this.formValidate.rank_price,
          promote_price: this.formValidate.promote_price,
          brief: this.formValidate.brief,
          desc: this.formValidate.desc,
          avatar: this.formValidate.avatar,
          evaluate_img: this.formValidate.evaluate_img,
          is_on_sale: this.formValidate.is_on_sale ? 1 : 0,
          sort_order: this.formValidate.sort_order,
          seller_note: this.formValidate.seller_note,
          is_best: this.formValidate.is_best ? 1 : 0,
          is_hot: this.formValidate.is_hot ? 1 : 0
        })
      } else {
        // 新增用户
        res = await evaluate_add(this.formValidate)
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/evaluate/evaluate_list")
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
      this.uploadListavatar = []
      this.uploadListBig = []
      if (this.$route.query && this.$route.query.evaluate_id) {
        this.formValidate.evaluate_id = this.$route.query.evaluate_id
      } else {
        this.formValidate = {
          evaluate_img: []
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>