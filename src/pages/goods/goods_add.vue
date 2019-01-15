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
          <FormItem label="菜单名称:" prop="name">
            <Input clearable v-model="formValidate.name" placeholder="请输入菜单名称"></Input>
          </FormItem>
          <Row>
            <Col span="6" :md="6" :lg="6" :xs="24" :sm="24">
            <FormItem label="原价:" prop="price">
              <Input clearable v-model="formValidate.price" placeholder="请输入原价"></Input>
            </FormItem>
            </Col>
            <!-- <Col span="6" :md="6" :lg="6" :xs="24" :sm="24">
            <FormItem :label-width="80" label="会员价:" prop="rank_price">
              <Input clearable v-model="formValidate.rank_price" placeholder="请输入会员价"></Input>
            </FormItem>
            </Col> -->
            <Col span="6" :md="6" :lg="6" :xs="24" :sm="24">
            <FormItem label="促销价格:" prop="promote_price">
              <Input clearable v-model="formValidate.promote_price" placeholder="请输入促销价格"></Input>
            </FormItem>
            </Col>
            <Col span="6" :md="6" :lg="6" :xs="24" :sm="24">
            <FormItem :label-width="90" label="显示顺序:" prop="sort_order">
              <InputNumber clearableNumber :min="1" v-model="formValidate.sort_order"></InputNumber>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem label="是否开放销售" prop="is_on_sale">
              <i-switch v-model="formValidate.is_on_sale" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
            <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem label="是否精品" prop="is_best">
              <i-switch v-model="formValidate.is_best" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
            <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem label="是否热销" prop="is_hot">
              <i-switch v-model="formValidate.is_hot" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
          </Row>
          <FormItem label="微缩图片:" prop="thumb">
            <div class="demo-upload-list" v-for="item in uploadListthumb">
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
            <Upload v-show="uploadListthumb.length===0" ref="uploadThumb" :show-upload-list="false" name="upfile" :default-file-list="defaultList" :data="{isCompress:1}" :on-success="handleSuccess1" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :headers="headers" action="/admin/upload/img" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="实际大小图片:" prop="goods_img">
            <div class="demo-upload-list" v-for="item in uploadListBig">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item,'upload')"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload ref="upload" :show-upload-list="false" name="upfile" :default-file-list="defaultList" :data="{isCompress:1}" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :headers="headers" action="/admin/upload/img" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>

          <FormItem label="简短描述:" prop="brief">
            <Input clearable v-model="formValidate.brief" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入简短描述"></Input>
          </FormItem>
          <!-- <FormItem label="详细描述:" prop="desc">
            <Input clearable v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细描述"></Input>
          </FormItem> -->
          <FormItem label="商家备注:" prop="seller_note">
            <Input clearable v-model="formValidate.seller_note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商家备注"></Input>
          </FormItem>
          <FormItem label="详细描述:" prop="desc">
            <vue-ueditor-wrap :destroy="true" placeholder="请输入详细描述" :config="myConfig" v-model="formValidate.desc"></vue-ueditor-wrap>
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
import { goods_add, goods_edit } from "@/service/getData"
import Cookie from "js-cookie"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  name: "goods_add",
  components: { VueUeditorWrap },
  data() {
    return {
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
      thumbImg: {},
      breadcrumbTitle: "编辑商品",
      formValidate: {
        goods_img: [],
        desc: "",
        sort_order: 1
      },
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListBig: [],
      uploadListthumb: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入原价",
            trigger: "blur"
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        // rank_price: [
        //   {
        //     required: true,
        //     message: "请输入会员价格",
        //     trigger: "blur"
        //   },
        //   {
        //     pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        //     message: "格式不正确",
        //     trigger: "blur"
        //   }
        // ],
        promote_price: [
        //   {
        //     required: true,
        //     message: "请输入促销价",
        //     trigger: "blur"
        //   },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        thumb: [
          {
            required: true,
            message: "请上传微缩图片",
            trigger: "blur"
          }
        ],
        goods_img: [
          {
            type: "array",
            min: 1,
            required: true,
            message: "请上传实际大小图片",
            trigger: "change"
          }
        ],

        brief: [
          {
            required: true,
            message: "请输入简短描述",
            trigger: "blur"
          },
          {
            max: 250,
            message: "简短描述不能超过250个字",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入详细描述",
            trigger: "blur"
          },
          {
            max: 65535,
            message: "详细描述不能太长",
            trigger: "blur"
          }
        ],
        seller_note: [
          {
            required: true,
            message: "请输入商家备注",
            trigger: "blur"
          },
          {
            max: 250,
            message: "详细描述不能超过250个字",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    this.loadPage()
  },
  mounted() {
    // this.uploadListBig = this.$refs.upload.fileList
    // this.uploadListthumb = this.$refs.uploadThumb.fileList
  },
  methods: {
    loadPage() {
      console.log(this.$route.query.is_on_sale)
      if (this.$route.query && this.$route.query.goods_id) {
        this.formValidate = {
          goods_id: this.$route.query.goods_id,
          name: this.$route.query.name,
          price: this.$route.query.price,
          rank_price: this.$route.query.rank_price,
          promote_price: this.$route.query.promote_price || 0,
          brief: this.$route.query.brief,
          desc: this.$route.query.desc,
          thumb: this.$route.query.thumb,
          goods_img: this.$route.query.goods_img,
          is_on_sale: this.$route.query.is_on_sale ? true : false,
          sort_order: Number(this.$route.query.sort_order),
          seller_note: this.$route.query.seller_note,
          is_best: this.$route.query.is_best ? true : false,
          is_hot: this.$route.query.is_hot ? true : false
        }
        this.uploadListthumb.push({
          name: this.$route.query.thumb,
          url: this.$route.query.thumb,
          status: "finished"
        })
        for (let i = 0; i < this.$route.query.goods_img.length; i++) {
          this.uploadListBig.push({
            name: this.$route.query.goods_img[i],
            url: this.$route.query.goods_img[i],
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
        this.uploadListthumb.splice(this.uploadListthumb.indexOf(file), 1)
        this.formValidate.thumb = ""
      } else {
        this.uploadListBig.forEach((element, index) => {
          if (element.url === file.url) {
            this.uploadListBig.splice(this.uploadListBig.indexOf(file), 1)
            let i = this.formValidate.goods_img.indexOf(file.url)
            console.log(i)
            this.formValidate.goods_img.splice(i, 1)
            console.log(this.uploadListBig)
            console.log(this.formValidate.goods_img)
          }
        })
      }
    },
    handleSuccess1(res, file, fileList) {
      if (res && res.code === 200) {
        this.formValidate.thumb = res.data.path
        this.uploadListthumb = [
          {
            name: this.formValidate.thumb,
            url: this.formValidate.thumb,
            status: "finished"
          }
        ]
        this.$refs.formValidate.validateField("thumb")
        file.url = res.data.path
        file.name = res.data.path
      }
    },
    handleSuccess(res, file, fileList) {
      console.log(fileList)
      if (res && res.code === 200) {
        this.formValidate.goods_img &&
          this.formValidate.goods_img.push(res.data.path)
        this.uploadListBig.push({
          name: res.data.path,
          url: res.data.path,
          status: "finished"
        })
        this.$refs.formValidate.validateField("goods_img")
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
      if (this.$route.query && this.$route.query.goods_id) {
        // 更新用户信息
        res = await goods_edit({
          goods_id: this.$route.query.goods_id,
          name: this.formValidate.name,
          price: this.formValidate.price,
          rank_price: this.formValidate.rank_price,
          promote_price: this.formValidate.promote_price || 0,
          brief: this.formValidate.brief,
          desc: this.formValidate.desc,
          thumb: this.formValidate.thumb,
          rank_price:999999,
          goods_img: this.formValidate.goods_img,
          is_on_sale: this.formValidate.is_on_sale ? 1 : 0,
          sort_order: this.formValidate.sort_order,
          seller_note: this.formValidate.seller_note,
          is_best: this.formValidate.is_best ? 1 : 0,
          is_hot: this.formValidate.is_hot ? 1 : 0
        })
      } else {
        // 新增用户
        res = await goods_add({
          name: this.formValidate.name,
          price: this.formValidate.price,
          rank_price: this.formValidate.rank_price,
          promote_price: this.formValidate.promote_price || 0,
          brief: this.formValidate.brief,
          desc: this.formValidate.desc,
          rank_price:999999,
          thumb: this.formValidate.thumb,
          goods_img: this.formValidate.goods_img,
          is_on_sale: this.formValidate.is_on_sale ? 1 : 0,
          sort_order: this.formValidate.sort_order,
          seller_note: this.formValidate.seller_note,
          is_best: this.formValidate.is_best ? 1 : 0,
          is_hot: this.formValidate.is_hot ? 1 : 0
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/goods/goods_list")
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