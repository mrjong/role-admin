import Cookie from 'js-cookie';
import { casesprocess_download_template, casesprocess_list, casesprocess_delete } from '@/service/business-mng-api';
import util from '@/libs/util';

export default {
  name: 'credit-process-mng',
  data() {
    const alignCenter = 'center';
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      file_url: '/admin/casesprocess/import',//文件上传地址
      showPanel: false,
      showPanelTable: false,
      export_case: true,
      import_search: true,
      formValidate: {},
      ruleValidate: {},
      query_loading: false,
      import_data_loading: false,
      download_import_data: false,
      tableData: [],
      tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 100,
          align: alignCenter,
          fixed: 'left',
        },
        {
          type: 'index', // 通过给columns 数据设置 type:'index'
          width: 100,
          align: alignCenter,
          fixed: 'left',
          title: '序号'
        },
        {
          title: '操作',
          width: 150,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const revokeStatus = params.row.revokeStatus;
            return h('div', [
              revokeStatus === '1' && params.index === 0 ? h('Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要撤销这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.casesprocess_delete(params.row.id)
                    }
                  }
                }, [h(
                  'a',
                  {
                    class: 'edit-btn',
                    props: {},
                    on: {
                      click: () => {
                        // this.casesprocess_delete(params.row.id)
                      }
                    }
                  },
                  '撤销'
                )]) : h('span', {
                  style: {
                    color: 'rgb(200, 200, 200)',
                  }
                }, '撤销'),
            ]);
          }
        },
        {
          title: '导入账单数量',
          key: 'amount',
          className: 'tableMainW',
          align: alignCenter,
        },
        {
          title: '操作人',
          key: 'createUser',
          className: 'tableMainW',
          align: alignCenter,
        },
        {
          title: '操作时间',
          key: 'updateTime',
          className: 'tableMainW',
          align: alignCenter,
          render: (h, params) => {
            let res = params.row.updateTime;
            res = res ? this.$options.filters['formatDate'](res, 'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span', res);
          }
        },
      ],
      pageSize: 10,
      pageNo: 1,
      total: 0
    }
  },
  created() {

  },
  methods: {
    handleSubmit(name) {
      this.casesprocess_list()
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
    // table勾选回调
    changeSelect(arr) {
      this.export_list = [];
      arr.forEach(item => {
        this.export_list.push(item.id);
      });
      console.log(this.approve_list)
    },
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.casesprocess_list();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.casesprocess_list();
    },
    // 上传文件格式校验
    handleFormatError(file) {
      this.$Message.error('请选择Excel文件上传');
    },
    // 上传文件大小校验
    handleMaxSize(file) {
      this.$Message.error('文件大小不得超过1M');
    },
    // 文件上传时
    handleProgress() {
      this.import_data_loading = true;
    },
    // 上传文件失败
    handleError(error, file) {
      console.log(error);
      this.import_data_loading = false;
    },
    async casesprocess_list() {
      this.query_loading = true;
      await casesprocess_list({
        ...this.formValidate,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 1) {
          this.$set(this, 'tableData', res.data.content)
          this.$set(this, 'total', res.data.totalElements)
        } else {
          this.$Message.error({
            content: res.message,
            duration: 2
          });
        }
        this.query_loading = false;
      }).catch(err => {
        console.log(err)
        this.query_loading = false;
      })

    },
    // 文件上传成功
    async handleSuccess(res, file) {
      this.import_data_loading = false;
      if (res.code === 1) {
        await this.casesprocess_list();
        await this.$Message.success({
          content: '上传成功',
          duration: 2
        })
      } else {
        this.$Message.error({
          content: res.message,
          closable: true,
          duration: 0
        });
      }
    },
    async casesprocess_delete(id) {
      const res = await casesprocess_delete({
        taskId: id,
      })
      if (res.code === 1) {
        this.casesprocess_list();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 下载模板
    async casesprocess_download_template() {
      this.download_import_data = true;
      const res = await casesprocess_download_template(
        {},
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      this.download_import_data = false;
      util.dowloadfile('信用进度模板', res);
    },
  },
}
