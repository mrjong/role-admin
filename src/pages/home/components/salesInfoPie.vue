<template>
    <div style="width:100%;height:100%;" id="data_source_con2"></div>
</template>

<script>
import echarts from 'echarts';
import { statistics_userIncrease } from "@/service/getData"
import dayjs from 'dayjs'
export default {
    name: 'dataSourcePie',
    data () {
        return {
            category:1,
            options:{
                type:'category',
                typeData:[],
                 name:'用户量',
                nameData:[],
                
            }
        };
    },
      created(){
          console.log(this.dateValue,'-----------')
        this.getParam('9999','1','0',[new Date(+new Date()-7*24*1000*3600),new Date()])
    },
    mounted () {
        // this.$nextTick(()=>this.getchart);
    },
  
    methods:{
        getchart(){
            var dataSourcePie = echarts.init(document.getElementById('data_source_con2'));
            const option = {
                color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        y:'10px',
        left: '3%',
        right: '4%',
        bottom: '10',
        containLabel: true
    },
     toolbox: {
        show : true,
        orient: 'vertical',      // 布局方式，默认为水平布局，可选为：
                                   // 'horizontal' ¦ 'vertical'
        x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                   // 'center' ¦ 'left' ¦ 'right'
                                   // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                   // 'top' ¦ 'bottom' ¦ 'center'
                                   // ¦ {number}（y坐标，单位px）
        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
        // backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        borderColor: '#ccc',       // 工具箱边框颜色
        borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
        showTitle: true,
        feature : {
            mark : {
                show : true,
                title : {
                    mark : '辅助线-开关',
                    markUndo : '辅助线-删除',
                    markClear : '辅助线-清空'
                },
                lineStyle : {
                    width : 1,
                    color : '#1e90ff',
                    type : 'dashed'
                }
            },
            magicType: {
                show : true,
                title : {
                    line : '动态类型切换-折线图',
                    bar : '动态类型切换-柱形图',
                },
                type : ['line', 'bar']
            },
            restore : {
                show : true,
                title : '还原',
                color : 'black'
            },
            saveAsImage : {
                show : true,
                title : '保存为图片',
                type : 'jpeg',
                lang : ['点击本地保存'] 
            },
        }
    },
    xAxis : [
        {
            type : this.options.type,
            data : this.options.typeData,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:this.options.name,
            type:'bar',
            data:this.options.nameData
        }
    ]
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        },
        getParam(payType,dateType,type,key){
              let data={
                    newGetType:true,
                    category:dateType,
                    type
                }
            if(payType!=='9999'){
                 data.is_pay=payType
            }
                // if(+new Date(key[1])-+new Date(key[0])>30*3600*24*1000){
                //     data.category=2
                //     this.category=2
                // }else if(+new Date(key[1])-+new Date(key[0])>30*3600*24*12*1000){
                //     data.category=3
                //     this.category=3
                // }
                data.startDate=dayjs(key[0]).format('YYYY-MM-DD')
                data.endDate=dayjs(key[1]).format('YYYY-MM-DD')
                console.log(data)

        this.statistics_userIncrease2(data)
        },
    async statistics_userIncrease2(data) {
      const res = await statistics_userIncrease(data)
      if(res){
          this.options.nameData=[]
          this.options.typeData=[]
          res.data.list.forEach(element => {
              this.options.nameData.push(element.total)
               this.options.typeData.push(element.createTime)
          });
          this.getchart()
      }
    },
    }
};
</script>
