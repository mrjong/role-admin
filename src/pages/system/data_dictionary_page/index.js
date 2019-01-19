import { buffet_list } from '@/service/getData';
export default {
  name: 'demo_list',
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      phoneCallList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      productTimeList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      productLineList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      modal12: false,
      inputGrid: '',
      modal11: false,
      formValidate2: {},
      ruleValidate: {
        buffet_id: [
          {
            required: true,
            message: '请输入网格编号',
            trigger: 'blur'
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formValidate3: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      },
      formItem: {},
      tableData: [
        {
          recording_id: 1,
          operate: '操作'
        }
      ],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          searchOperator: '=',
          sortable: true,
          key: 'recording_id',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteGoods(params.row.recording_id);
                    }
                  }
                },
                [
                  h(
                    'a',
                    {
                      class: 'edit-btn',
                      props: {}
                    },
                    '播放'
                  )
                ]
              )
            ]);
          }
        },
        {
          title: '时长',
          width: 100,
          searchOperator: '=',
          key: 'time_length',
          align: 'center'
        },
        // {
        //   title: '餐柜添加时间',
        //   key: 'addtime',
        //   sortable: true,
        //   width: 160,
        //   render: (h, params) => {
        //     const row = params.row;
        //     const addtime = row.addtime
        //       ? this.$options.filters['formatDate'](new Date(row.addtime * 1000), 'yyyy-MM-dd hh:mm:ss')
        //       : row.addtime;
        //     return h('span', addtime);
        //   }
        // },
        {
          title: '客户姓名',
          searchOperator: 'like',
          key: 'client_name',
          sortable: true,
          align: 'center'
        },
        {
          title: '关系',
          width: 80,
          searchOperator: 'like',
          key: 'relation',
          align: 'center'
          // render: (h, params) => {
          //   return h('div', [
          //     h(
          //       'Tooltip',
          //       {
          //         style: {
          //           margin: '0 5px'
          //         },
          //         props: {
          //           content: params.row.address,
          //           placement: 'top'
          //         }
          //       },
          //       [h('div', {}, params.row.address)]
          //     )
          //   ]);
          // }
        },
        {
          title: '呼叫电话',
          searchOperator: '=',
          key: 'call_number',
          align: 'center'
        },
        {
          title: '呼叫开始时间',
          searchOperator: '=',
          key: 'call_begin_time',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '呼叫结束时间',
          searchOperator: '=',
          key: 'call_end_time',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '经办人',
          searchOperator: '=',
          key: 'operator',
          align: 'center'
        },
        {
          title: '案件编码',
          searchOperator: '=',
          key: 'case_id',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账单号',
          searchOperator: '=',
          key: 'bill_number',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '客户身份证号',
          searchOperator: '=',
          key: 'id_card',
          ellipsis: true,
          align: 'center'
        },
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    getParam() {
      let searchParam = [];

      if (!(this.formItem.addtime && this.formItem.addtime[0]) || !this.formItem.addtime[1]) {
        delete this.formItem.addtime;
      } else {
        let startTime = this.formItem.addtime[0].getTime() / 1000;
        let endTime = this.formItem.addtime[1].getTime() / 1000;
        console.log();
        let addtime = [
          {
            searchValue: startTime,
            searchColumn: 'addtime',
            searchOperator: '>'
          },
          {
            searchValue: endTime,
            searchColumn: 'addtime',
            searchOperator: '<='
          }
        ];
        if (this.formItem && JSON.stringify(addtime) !== '[]') {
          for (let i = 0; i < addtime.length; i++) {
            searchParam.push(addtime[i]);
          }
        }
      }
      console.log(searchParam);
      for (let i = 0; i < this.tableColumns.length; i++) {
        for (const key in this.formItem) {
          if (
            this.formItem[key] &&
            this.tableColumns[i].searchOperator &&
            key === this.tableColumns[i].key &&
            key !== 'addtime'
          ) {
            let item = {};
            item.searchValue = this.formItem[key];
            item.searchColumn = this.tableColumns[i].key;
            item.searchOperator = this.tableColumns[i].searchOperator;
            searchParam.push(item);
          }
        }
      }
      return searchParam;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          this.$Message.error('查询条件格式有误，请重新填写');
        }
      });
    },
    // 获取表格数据
    async getList() {
      const searchParam = [];
      console.log(this.getParam());
      const res = await buffet_list({
        searchParam: this.formItem && JSON.stringify(this.formItem) !== '{}' && this.getParam(),
        page: this.pageNo,
        perPage: this.pageSize,
        config: {
          hideMessage: true
        }
      });
      if (res.data && res.data.data) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageNo = res.data.current_page;
      } else {
        this.tableData = [];
        this.total = 0;
        this.pageNo = 1;
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    }
  }
};
