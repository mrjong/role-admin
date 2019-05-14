import { system_user_list, system_user_reset } from '@/service/getData';
import Remodal from './components/user_info_form';
import tablePage from '@/mixin/tablePage';
import sysDictionary from '@/mixin/sysDictionary';
export default {
  components: {
    Remodal
  },
  mixins: [sysDictionary, tablePage],
  name: 'demo_list',
  data() {
    return {
      getDirList: ['1_0_AVAILABLE_DISABLE'],
      getDirObj: {},
      query: false,//查询权限
      add: false,//添加权限
      detail: false,//删除权限
      update: false,//修改权限
      reset_pwd: false,//重置密码权限
      query_loading: false,//查询按钮loading
      showPanel: false,
      showPanel2: false,
      modal: false,
      parentData: {
        modal: false
      },
      ruleValidate: {
        loginName: [
          {
            pattern: this.GLOBAL.loginCount,
            message: "4到10位（字母，数字，下划线，减号)",
            trigger: "blur"
          }
        ],
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {},
      tableData: [],
      selectList: [],
      tableColumns: [
        {
          title: '',
          type: 'selection',
          width: 60,
          searchOperator: '=',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '序号',
          type: 'index',
          width: 60,
          searchOperator: '=',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '登录账号',
          searchOperator: '=',
          key: 'loginName',
          width: 150,
          align: 'center'
        },
        {
          title: '用户名称',
          searchOperator: 'like',
          key: 'name',
          sortable: true,
          width: 150,
          align: 'center'
        },
        {
          title: '系统角色名称',
          searchOperator: 'like',
          key: 'roleName',
          width: 150,
          align: 'center',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '状态',
          searchOperator: '=',
          key: 'stateName',
          ellipsis: true,
          width: 150,
          align: 'center'
        },
        {
          title: '手机号',
          searchOperator: '=',
          key: 'mobile',
          width: 150,
          align: 'center'
        },
        {
          title: '邮箱',
          searchOperator: '=',
          key: 'email',
          ellipsis: true,
          width: 180,
          align: 'center'
        },
        {
          title: '创建人',
          key: 'createUser',
          ellipsis: true,
          width: 100,
          align: 'center'
        },
        {
          title: '创建时间',
          searchOperator: '=',
          key: 'createTime',
          ellipsis: true,
          width: 150,
          align: 'center',
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime
              ? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
              : createTime;
            return h('span', createTime);
          }
        },
        {
          title: '操作',
          key: 'edit',
          width: 180,
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const obj = params.row;
            return this.detail || this.reset_pwd || this.update ? h('div', [
              this.detail ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.handleAdd('1', obj);
                    }
                  }
                },
                '查看'
              ) : null,
              this.update ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.handleAdd('2', obj);
                    }
                  }
                },
                '修改'
              ) : null,
              this.reset_pwd ? h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要重置密码?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.system_user_reset([obj.uuid]);
                    }
                  }
                },
                [
                  h(
                    'a',
                    {
                      style: {
                        margin: '0 5px'
                      },
                      class: 'edit-btn',
                      props: {
                        size: 'small',
                        type: 'error',
                        placement: 'top'
                      }
                    },
                    '重置密码'
                  )
                ]
              ) : null
            ]) : h('span', '无');
          }
        }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let system_user_form = window.sessionStorage.getItem('system_user_form');
    if (system_user_form) {
      this.formItem = JSON.parse(system_user_form);
    }
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        case "add": this.add = true;
          break;
        case "detail": this.detail = true;
          break;
        case "update": this.update = true;
          break;
        case "reset_pwd": this.reset_pwd = true;
          break;
      }
    });
    // this.getList();
  },
  methods: {
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo, '当前的页码数量值');
      this.pageNo = pageNo;
      this.getList();
    },
    selectOne(selection) {
      console.log('---------');
      this.selectList = [];
      selection &&
        selection.forEach((element) => {
          this.selectList.push(element.uuid);
        });
      console.log(this.selectList);
    },
    handleDelAll() {
      if (this.selectList.length !== 0) {
        this.system_user_reset(this.selectList);
      } else {
        this.$Message.info('请勾选需要操作的数据');
      }
    },
    getChildrenStatus() {
      this.modal = true;
      this.parentData = {
        modal: this.modal,
        tableData: this.tableData
      };
    },
    // 添加列表新数据按钮
    handleAdd(type, obj) {
      this.modal = true;
      this.parentData = {
        modal: this.modal,
        type: type,
        userData: obj
      };
      console.log(this.parentData);
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          window.sessionStorage.setItem('system_user_form', JSON.stringify(this.formItem));
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 重置
    clearForm(name) {
      //这里可以不用改变当前的分页组件之中的页码数值
      this.formItem = {};
      window.sessionStorage.removeItem('system_user_form');
      this.$refs[name].resetFields();
    },
    // 获取表格数据
    async system_user_reset(ids) {
      const res = await system_user_reset({ ids: ids });
      if (res.code === 1) {
        this.$Message.success('重置密码成功');
        this.selectList = [];
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取表格数据
    async getList() {
      this.query_loading = true;
      const res = await system_user_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.data;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        this.pageNo = res.data.pageNum;
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
