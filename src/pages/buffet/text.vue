<template>
    <baidu-map v-bind:style="mapStyle" zIndex="1" class="bm-view" ak="C2cZndxTOFTR4MoXUpiEb68Guxbzf4oY" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
        <bm-view style="width: 100%; height:500px;"></bm-view>
        <bm-marker massClear :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}" :position="{lng: center.lng, lat: center.lat}" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <bm-control :offset="{width: '10px', height: '10px'}">
            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                <Input clearable type="text" placeholder="请输入搜索关键字" class="serachinput">
            </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
    </baidu-map>

</template>
<script>
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker
} from "vue-baidu-map"
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data() {
    return {
      keyword: "",
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px"
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15
    }
  },
  methods: {
    /***
     * 地图点击事件。
     */
    // getClickInfo(e) {
    //   this.center.lng = e.point.lng
    //   this.center.lat = e.point.lat
    // },
    // syncCenterAndZoom(e) {
    //   const { lng, lat } = e.target.getCenter()
    //   this.center.lng = lng
    //   this.center.lat = lat
    //   this.zoom = e.target.getZoom()
    // },
  }
}
</script>
<style scoped>
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