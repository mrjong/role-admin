<template>
  <div class="panel_list">
  </div>
</template>

<script>
  import {
    callou_fixed_hung_on
  } from '@/service/getData';
  export default {
    props: ["showDYFlag"],
    data() {
      return {
        token:
          {seatNo: '10086723', callToken: 'acbde1aa-044f-4d61-9afa-f672ed0516c0'},
      };
    },
    watch: {
      showDYFlag: function (val) {
        console.log(val)
        let nodeA = document.getElementById("dyCti")
        if(val){
          this.callOut(val)
          nodeA.parentNode.style =
            'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); z-index:100'
        }else{
          nodeA.parentNode.style =
            'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); z-index:-1'
        }
      }
    },
    created() {
      let callData = sessionStorage.getItem('callSeat') ? JSON.parse(sessionStorage.getItem('callSeat')) : this.token
      let nodeA = document.getElementById("dyCti")
      if (nodeA.parentNode.childNodes[1]) {
        nodeA.parentNode.removeChild(nodeA.parentNode.childNodes[1])
      }
      nodeA.parentNode.style =
          'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); z-index:-1'
      nodeA.src=`https://cti.duyansoft.com/ctibar.html?account_id=${callData.seatNo}&token=${callData.callToken}&nomsb=true&noNumberInput=false&noOpBtn=true&nopo=true&noNumberSelect=true`
      this.getToken(this.token[0])
    },
    mounted() {

    },
    methods: {
      getToken(data) {
        let that = this
        DYSDK.init({stopBeforeunload: true})
        DYSDK.ctiLogined(function (data) {
          console.log(data);
          console.log('3333333333');
        });
        // 接通电话的回调函数，返回电话号码等信息
        DYSDK.callConfirm(function (data) {
          console.log('接通电话的回调函数')
          console.log(data)
        });

        // 拨打电话失败的回调函数，返回电话号码等信息
        DYSDK.callFail(function (data) {
          console.log('拨打电话失败')
          that.$emit("passBackDY", data.uuid);
          console.log(data)
        });

        // 电话结束的回调函数，返回电话号码等信息
        DYSDK.callEnd(function (data) {
          console.log("电话结束")
          that.$emit("passBackDY", data.uuid);
          console.log(data)
        });

        // 正在拨打中的回调函数，返回电话号码等信息
        DYSDK.callConnecting(function (data) {
          console.log("正在拨打中的回调函数");
          console.log(data)
        });
        DYSDK.ready(function(){

        })

    },
    async callOut(val) {
//      test.callme()
      DYSDK.call(val, function () {
      }, '');
    }
  }
  };
</script>

<style lang="less" scoped>

</style>
