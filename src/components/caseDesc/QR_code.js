import {
  offlineScanPay_detail,//生成二维码
  offlineScanPay_invalid,//二维码失效
} from '@/service/getData'
import html2canvas from 'html2canvas'

export default {
  model: {
    prop: 'model',
    event: 'passBack'
  },
  props: {
    model: Boolean,
    breaks_data: {},
  },
  data() {
    return {
      QR_CODE_INFO: {},
      htmlUrl: '',
      download_loading: false,
      failure_loading: false,
      spinShow: true,
    }
  },
  created() {
    this.offlineScanPay_detail()
  },
  methods: {
    // 页面元素转图片
    toImage() {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      this.download_loading = true;
      html2canvas(this.$refs.imgtofile, {
        // backgroundColor: null
        useCORS: true,
      }).then((canvas) => {
        let url = canvas.toDataURL('image/png');
        this.htmlUrl = url;
        console.log(this.htmlUrl);
        // util.dowloadimg('收款码', url);
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "收款码"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        // document.body.removeChild(a); // 下载完成移除元素
        this.download_loading = false;
      })
    },
    // 关闭弹窗
    del() {
      // this.$emit('passBack', { flag: false, name: 'QR_code_detail' });
      this.$emit('passBack', { flag: false, name: 'QR_CODE' });

    },
    // 获取信息
    async offlineScanPay_detail() {
      const res = await offlineScanPay_detail({
        caseNo: this.breaks_data.caseNo
      })
      console.log(res);
      if (res.code === 1) {
        this.QR_CODE_INFO = res.data;
        this.QR_CODE_INFO.qrCodeInfo = this.QR_CODE_INFO.qrCodeInfo? 'data:image/png;base64,'+ this.QR_CODE_INFO.qrCodeInfo :'';
        this.spinShow = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 失效二维码
    async offlineScanPay_invalid() {
      this.failure_loading = true;
      const res = await offlineScanPay_invalid({
        caseNo: this.breaks_data.caseNo,
      });
      this.failure_loading = false;
      if (res.code === 1) {
        this.$Message.success(res.data);
        clearTimeout(timer)
        var timer = setTimeout(() => {
          this.$emit('passBack', { flag: false, name: 'QR_CODE', });
        }, 2000)
      } else {
        this.$Message.error(res.message)
      }
    }
  },
}
