<template>
  <Card class="vue-panel">
    <p slot="title">
      {{breadcrumbTitle}}
      <Button
        class="fr vue-back-btn header-btn"
        type="default"
        size="small"
        @click="$router.go(-1)"
      >返回</Button>
    </p>
    <div class="vue-panel-desc">
      <Row
        type="flex"
        :gutter="15"
      >
        <Col
          :md="12"
          :lg="12"
          :xs="24"
          :sm="24"
        >
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem
            label="餐柜名称:"
            prop="buffet_name"
          >
            <Input
              clearable
              v-model="formValidate.buffet_name"
              placeholder="请输入餐柜名称"
            ></Input>
          </FormItem>
          <FormItem
            label="供应商:"
            prop="provider"
          >
            <Select
              v-model="formValidate.provider"
              placeholder="请选择餐柜供应商"
            >
              <Option value="1">开宝</Option>
              <Option value="2">智远天成</Option>
            </Select>
          </FormItem>
          <FormItem
            label="设备ID:"
            prop="device_id"
          >
            <Input
              clearable
              v-model="formValidate.device_id"
              placeholder="请输入设备ID"
            ></Input>
          </FormItem>
          <FormItem
            label="餐柜地址:"
            prop="address"
          >
            <Input
              clearable
              v-model="formValidate.address"
              placeholder="请输入餐柜地址"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
            >保存</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button> -->
          </FormItem>
        </Form>
        </Col>
        <Col
          :md="12"
          :lg="12"
          :xs="24"
          :sm="24"
        >
        <baidu-map
          @click="getClickInfo"
          v-bind:style="mapStyle"
          zIndex="1"
          class="bm-view"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
        >
          <bm-view style="width: 100%; height:500px;"></bm-view>
          <bm-marker
            massClear
            :position="{lng: center.lng, lat: center.lat}"
            animation="BMAP_ANIMATION_BOUNCE"
          >
          </bm-marker>
          <bm-control :offset="{width: '10px', height: '10px'}">
            <bm-auto-complete
              v-model="formValidate.address"
              :sugStyle="{zIndex: 999999}"
            >
              <input
                type="text"
                v-model="formValidate.address"
                placeholder="请输入搜索关键字"
                class="serachinput"
              >
            </bm-auto-complete>
          </bm-control>
          <bm-local-search
            :keyword="formValidate.address"
            :auto-viewport="true"
            style="width:0px;height:0px;overflow: hidden;"
          ></bm-local-search>
        </baidu-map>
        </Col>
      </Row>
    </div>
    <Modal
      title="预览图片"
      v-model="visible"
    >
      <img
        :src="`${imgName}`"
        v-if="visible"
        style="width: 100%"
      >
    </Modal>
  </Card>
</template>

<script>
import { buffet_add, buffet_edit } from "@/service/getData"
import Cookie from "js-cookie"
// import tinymce from "tinymce"
import VueUeditorWrap from "vue-ueditor-wrap"
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker
} from "vue-baidu-map"
const validatePassCheck = (rule, value, callback) => {
  console.log(value)
  if (value.length === 0) {
    callback()
  } else {
    callback()
  }
}
export default {
  name: "buffet_add",
  components: {
    VueUeditorWrap,
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data() {
    return {
      data1: {},
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px"
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      headers: {
        token: Cookie.get("token")
        // "Content-Type": "multipart/form-data"
      },
      thumbImg: {},
      breadcrumbTitle: "编辑餐柜",
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
      ruleValidate: {
        provider: [
          {
            required: true,
            message: "请选择餐柜供应商",
            trigger: "change"
          }
        ],
        buffet_name: [
          {
            required: true,
            message: "请输入餐柜名称",
            trigger: "blur"
          },
          {
            max: 250,
            message: "餐柜名称长度不能超过250",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入餐柜地址",
            trigger: "blur"
          },
          {
            max: 250,
            message: "餐柜地址长度不能超过250",
            trigger: "blur"
          }
        ],
        buffet_code: [
          {
            required: true,
            message: "请输入餐柜编号",
            trigger: "blur"
          },
          {
            max: 250,
            message: "餐柜编号长度不能超过250",
            trigger: "blur"
          }
        ],
        device_id: [
          {
            required: true,
            message: "请输入设备ID",
            trigger: "blur"
          },
          {
            max: 250,
            message: "设备ID长度不能超过250",
            trigger: "blur"
          }
        ],

        thumbnail_url: [
          {
            required: true,
            message: "请上传缩略图",
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
    /***
   * 地图点击事件。
   */
    getClickInfo(e) {
      this.$set(this.center, 'lng', e.point.lng)
      this.$set(this.center, 'lat', e.point.lat)
      console.log(this.$fetch)
      this.$fetch({
        url: `/geocoder/v2/?callback=renderReverse&location=${e.point.lat},${e.point.lng}&output=json&pois=1&ak=C2cZndxTOFTR4MoXUpiEb68Guxbzf4oY`,
        methods: 'get',
      }).then(res => {
        let res1 = res
        if (res.indexOf('renderReverse&&renderReverse(') > -1) {
          res1 = res.substring(0, res.length - 1);
          res1 = res1.replace("renderReverse&&renderReverse(", "");
          res1 = JSON.parse(res1).result.formatted_address
        }
        this.$set(this.formValidate, 'address', res1)
      })
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    /***
     * 确认
     */
    confirm: function () {
      this.showMapComponent = false
      this.$emit('map-confirm', this.center)
    },
    /***
     * 取消
     */
    cancel: function () {
      this.showMapComponent = false
      this.$emit('cancel', this.showMapComponent)
    },
    loadPage() {
      console.log(this.$route.query.buffet_id)
      if (this.$route.query && this.$route.query.buffet_id) {
        this.formValidate = {
          buffet_id: this.$route.query.buffet_id,
          buffet_name: this.$route.query.buffet_name,
          address: this.$route.query.address,
          provider: this.$route.query.provider + '',
          buffet_code: this.$route.query.device_id,
          device_id: this.$route.query.device_id,
        }
        this.center = {
          lng: this.$route.query.lng,
          lat: this.$route.query.lat
        }
        this.uploadListthumb.push({
          name: this.$route.query.thumbnail_url,
          url: this.$route.query.thumbnail_url,
          status: "finished"
        })
        this.breadcrumbTitle = "编辑餐柜"
      } else {
        // 新增用户时提示一下
        this.formValidate = {
          contents: ""
        }
        this.uploadListthumb = []
        this.breadcrumbTitle = "添加餐柜"
      }
    },
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file, upload) {
      const fileList = this.$refs[upload].fileList
      this.$refs[upload].fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess1(res, file, fileList) {
      if (res && res.code === 200) {
        this.formValidate.thumbnail_url = this.BASEURL + res.data.path
        this.uploadListthumb = [
          {
            name: this.formValidate.thumbnail_url,
            url: this.formValidate.thumbnail_url,
            status: "finished"
          }
        ]
        this.$refs.formValidate.validateField("thumbnail_url")
        file.url = this.BASEURL + res.data.path
        file.name = this.BASEURL + res.data.path
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
      if (this.$route.query && this.$route.query.buffet_id) {
        // 更新用户信息
        res = await buffet_edit({
          buffet_id: this.formValidate.buffet_id,
          buffet_name: this.formValidate.buffet_name,
          address: this.formValidate.address,
          provider: this.formValidate.provider,
          device_id: this.formValidate.device_id,
          buffet_code: this.formValidate.device_id,
          lng: this.center.lng,
          lat: this.center.lat
        })
      } else {
        // 新增用户
        res = await buffet_add({
          buffet_name: this.formValidate.buffet_name,
          address: this.formValidate.address,
          provider: this.formValidate.provider,
          buffet_code: this.formValidate.device_id,
          device_id: this.formValidate.device_id,
          lng: this.center.lng,
          lat: this.center.lat
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/buffet/buffet_list")
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

<style>
.serachinput {
  width: 300px;
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
</style>