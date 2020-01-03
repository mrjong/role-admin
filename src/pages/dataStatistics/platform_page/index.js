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
      export_auth: true,
      showPanel: false,
      showPanelTable: false,
      formValidate: {},
      query_loading: false,
      export_table_loading: false,
      tableData: [],
      tableColumns: [
        // {
        //   type: "selection", // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
        //   width: 100,
        //   align: alignCenter,
        //   fixed: "left"
        // },
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
          key: "createTime",
          className: "tableMainW",
          align: alignCenter,
          render: (h, params) => {
            let res = params.row.createTime;
            res = res
              ? this.$options.filters["formatDate"](res, "YYYY-MM-DD HH:mm:ss")
              : res;
            return h("span", res);
          }
        },
        {
          title: "一级渠道",
          key: "amount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "二级渠道",
          key: "amount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "三级渠道",
          key: "amount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "注册",
          key: "registerDeduct",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "提交授信",
          key: "submitDeduct",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "首贷人数",
          key: "loansDeductPeople",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "首贷金额",
          key: "loansDeductAmount",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "结算标准",
          key: "createUser",
          className: "tableMainW",
          align: alignCenter
        },
        {
          title: "结算金额",
          key: "createUser",
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
        startDt: start,
        endDt: end,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      if (res.code === "0000") {
        this.tableData = res.data;
        this.total = 100;
      } else {
        this.$Message.error(res.msg);
      }
      this.query_loading = false;
    },

    // 下载模板
    async export_table() {
      this.export_table_loading = true;
      const res = await casesprocess_download_template(
        {},
        {
          responseType: "blob",
          timeout: 120000
        }
      );
      this.export_table_loading = false;
      util.dowloadfile("信用进度模板", res);
    }
  }
};
