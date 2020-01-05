import Cookie from "js-cookie";
import api from "@/service";
import util from "@/libs/util";

export default {
  name: "dataStatistics-platform",
  data() {
    const alignCenter = "center";
    return {
      headers: {
        "SXF-TOKEN": Cookie.get("SXF-TOKEN"),
        timeout: 120000
      },
      query_auth: false, //检索权限
      channel_auth: false, //渠道筛选权限
      export_auth: false,
      showPanel: false,
      showPanelTable: false,
      formValidate: {},
      query_loading: false,
      export_table_loading: false,
      tableData: [],
      tableColumns: [
        {
          type: "index",
          width: 80,
          align: alignCenter,
          fixed: "left",
          title: "序号"
        },
        {
          title: "时间",
          width: 150,
          key: "date",
          className: "tableMainW",
          align: alignCenter,
          // render: (h, params) => {
          //   let res = params.row.date;
          //   res = res
          //     ? this.$options.filters["formatDate"](res, "YYYY-MM-DD HH:mm:ss")
          //     : res;
          //   return h("span", res);
          // }
        },
        {
          title: "一级渠道",
          key: "firstLvlChannel",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "二级渠道",
          key: "secondLvlChannel",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "三级渠道",
          key: "thirdLvlChannel",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "注册",
          key: "registerCount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "提交授信",
          key: "credCount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "首贷人数",
          key: "loansCount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "首贷金额",
          key: "loansSum",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "结算标准",
          key: "balanceStandard",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "结算金额",
          key: "balanceAmt",
          className: "tableMainW",
          align: alignCenter
        }
      ],
      pageSize: 10,
      pageNo: 1,
      total: 0,
      channelList1: [],
      channelList2: [],
      channelList3: []
    };
  },
  created() {
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      switch (item.url) {
        case "/list":
          this.query_auth = true;
          break;
        case "/queryChannels":
          this.channel_auth = true;
          break;
        case "/export":
          this.export_auth = true;
          break;
      }
    });
  },
  methods: {
    handleSubmit(name) {
      this.query_platform_list();
    },
    channelOneOpen(open) {
      if (open) {
        this.query_channels({
          pid: "",
          level: "1"
        });
      }
    },
    channelTwoOpen(open) {
      if (open) {
        this.query_channels({
          pid: this.formValidate.channelOne || "",
          level: "2"
        });
      }
    },
    channelThreeOpen(open) {
      if (open) {
        this.query_channels({
          pid: this.formValidate.channelTwo || "",
          level: "3"
        });
      }
    },
    //查询渠道列表
    async query_channels(data) {
      const { pid, level } = data;
      const res = await api.query_platform_channels({ pid, level });
      if (res.code === "0000") {
        switch (level) {
          case "1":
            this.channelList1 = res.data;
            break;
          case "2":
            this.channelList2 = res.data;
            break;
          case "3":
            this.channelList3 = res.data;
            break;
          default:
            break;
        }
      } else {
        this.$Message.error(res.msg);
      }
    },
    clearForm() {
      this.formValidate = {};
    },
    // 改变日期区间的格式之后进行处理
    changeApplyDate(arr) {
      if (arr) {
        this.formValidate.start = arr[0];
        this.formValidate.end = arr[1];
      }
    },
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.query_platform_list();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.query_platform_list();
    },

    async query_platform_list() {
      if (!this.query_auth) {
        this.$Message.error("很抱歉，暂无查询权限");
        return;
      }
      this.query_loading = true;
      const {
        channelOne,
        channelTwo,
        channelThree,
        start,
        end
      } = this.formValidate;
      const res = await api.query_platform_list({
        firstLvlChannel: channelOne,
        secondLvlChannel: channelTwo,
        thirdLvlChannel: channelThree,
        startDt: this.formatDate(start),
        endDt: this.formatDate(end),
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      if (res.code === "0000") {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.$Message.error(res.msg);
      }
      this.query_loading = false;
    },

    formatDate(date='') {
      let str = "";
      date.split("-").map(item => {
        str += item;
      });
      return str;
    },

    // 下载模板
    async export_table() {
      this.export_table_loading = true;
      const {
        channelOne,
        channelTwo,
        channelThree,
        start,
        end
      } = this.formValidate;
      const res = await api.platform_list_export(
        {
          firstLvlChannel: channelOne,
          secondLvlChannel: channelTwo,
          thirdLvlChannel: channelThree,
          startDt: this.formatDate(start),
          endDt: this.formatDate(end),
        },
        {
          responseType: "blob",
          timeout: 120000
        }
      );
      this.export_table_loading = false;
      util.dowloadfile("平台合作列表", res);
    }
  }
};
