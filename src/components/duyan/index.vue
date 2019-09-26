<template>
  <div class="panel_list">

  </div>
</template>

<script>
  import {
    test,test2
  } from '@/service/getData';
  export default {
    props: ["Dy_data"],
    data() {
      return {
        myScript: '',
        token: [
          {account_id: '10084700',token: '0c5cc961-c178-4784-be04-28fbbaba71ea'},
          {account_id: '10083949',token: '81423741-7978-4944-bc67-e6f2ad6b964d'},
          ]
      };
    },
    created() {
      let DYScript = document.createElement('script');
      DYScript.src="https://cti.duyansoft.com/syui/dysdk/dysdk2.min.js";
      DYScript.type = 'text/javascript';  //指定脚本类型
      DYScript.id = "dySdkScript";  //指定脚本类型
      DYScript.setAttribute("ctype","mini");  //指定脚本类型
      document.body.appendChild(DYScript)
    },
    methods: {
      getToken(){
        let nodeA = document.getElementById("dyCti")
        nodeA.src=`https://cti.duyansoft.com/ctibar.html?account_id=${this.token[1].account_id}&token=${this.token[1].token}&nomsb=true&noNumberInput=true&noOpBtn=true&nopo=true&noNumberSelect=true`
        nodeA.onload = function () {
          if(nodeA.parentNode.childNodes[1]){
            nodeA.parentNode.removeChild(nodeA.parentNode.childNodes[1])
          }
          nodeA.parentNode.style=
            'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174);z-index=10000'
          DYSDK.init({stopBeforeunload:true})
          DYSDK.ctiLogined(function(data){
            console.log(data);
            console.log('3333333333');
          });
          // 接通电话的回调函数，返回电话号码等信息
          DYSDK.callConfirm(function(data){
            console.log('接通电话的回调函数')
            console.log(data)
          });

          // 拨打电话失败的回调函数，返回电话号码等信息
          DYSDK.callFail(function(data){
            console.log('拨打电话失败')
            console.log(data)
          });

          // 电话结束的回调函数，返回电话号码等信息
          DYSDK.callEnd(function(data){
            console.log("电话结束")
            console.log(data)
          });

          // 正在拨打中的回调函数，返回电话号码等信息
          DYSDK.callConnecting(function(data){
            console.log("正在拨打中的回调函数");
            console.log(data)
          });
          DYSDK.ready(function(){
            DYSDK.call('18633045974',function(){
            },'123123');
          })
        }
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
