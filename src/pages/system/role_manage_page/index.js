import { system_role_list, system_role_add, system_role_update, system_role_info, system_role_menu_list, stytem_menu_opration } from '@/service/getData';
import tablePage from '@/mixin/tablePage';
import sysDictionary from '@/mixin/sysDictionary';
export default {
  name: 'remoney_user',
  mixins: [sysDictionary, tablePage],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 180;
    return {
      getDirList: ['ROLE_TYPE', '1_0_EFFECT_INVAL'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      menuModal: false,
      query: false,//查询权限
      add: false,//添加权限
      detail: false,//删除权限
      update: false,//修改权限
      allot: false,//分配权限
      query_loading: false,//查询按钮loading
      update_loading: false,//修改按钮loading
      allot_loading: false,//分配按钮loading
      add_loading: false,//添加按钮loading
      name: '',
      userId: '',
      roleId: '',
      menuIds: [],
      data5: [],
      modalSee: false,
      modalChange: false,
      modalAddRole: false,
      formValidate: {
      },
      formValidateChange: { roleCode: '' },
      formValidateAdd: {
        roleCode: '',
        roleStatus: '1',
        roleType: '01'
      },
      ruleValidate: {
        //ruleValidate添加表单的校验规则，用来提示用户的输入法则，具体使用在表单里面 ：rule='ruleValidate'直接使用即可
        mblNo: [
          {
            pattern: this.GLOBAL.mblNo,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ]
      },
      ruleValidateChange: {
        name: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur',
          }
        ],
        roleType: [
          {
            required: true,
            message: '请设置角色类型',
            trigger: 'change',
          }
        ],
        roleStatus: [
          {
            required: true,
            message: '请设置角色状态',
            trigger: 'change',
          }
        ]
      },
      ruleValidateAdd: {
        name: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur',
          }
        ],
        roleType: [
          {
            required: true,
            message: '请设置角色类型',
            trigger: 'change',
          }
        ],
        roleStatus: [
          {
            required: true,
            message: '请设置角色状态',
            trigger: 'change',
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formValidateInfo: {

      },
      tableData: [],
      tableColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          searchOperator: '=',
          align: alignCenter,
          fixed: 'left',
        },
        {
          title: '角色名称',
          searchOperator: '=',
          key: 'name',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '角色状态',
          searchOperator: 'like',
          key: 'roleStatusName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '角色类型',
          searchOperator: 'like',
          key: 'roleTypeName',
          className: 'tableMain',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '角色描述',
          searchOperator: 'like',
          key: 'description',
          width: widthMidVal,
          align: alignCenter,
        },
        {
          title: '创建人',
          searchOperator: 'like',
          key: 'createUser',
          width: 100,
          align: alignCenter,
        },
        {
          title: '创建时间',
          searchOperator: 'like',
          key: 'createtime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let createDate = params.row.createtime;
            createDate = createDate
              ? this.$options.filters['formatDate'](createDate, 'YYYY-MM-DD HH:mm:ss')
              : createDate;
            return h('span', createDate);
          }
        },
        {
          title: '修改人',
          searchOperator: 'like',
          key: 'updateUser',
          width: 100,
          align: alignCenter,
        },
        {
          title: '修改时间',
          searchOperator: 'like',
          key: 'updatetime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let createDate = params.row.updatetime;
            createDate = createDate
              ? this.$options.filters['formatDate'](createDate, 'YYYY-MM-DD HH:mm:ss')
              : createDate;
            return h('span', createDate);
          }
        },
        {
          title: '最后操作时间',
          searchOperator: 'like',
          key: 'updatetime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render: (h, params) => {
            let createDate;
            if (params.row.updatetime) {
              createDate = params.row.updatetime;
            } else {
              createDate = params.row.createtime;
            }
            createDate = createDate
              ? this.$options.filters['formatDate'](createDate, 'YYYY-MM-DD HH:mm:ss')
              : createDate;
            return h('span', createDate);
          }
        },
        {
          title: '操作',
          width: 200,
          key: 'edit',
          align: alignCenter,
          width: widthMidVal,
          fixed: 'left',
          render: (h, params) => {
            let id = params.row.id;
            let changeInfo = params.row;
            return this.detail || this.update || this.allot ? h('div', [
              this.detail ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.checkSeeClick(id);
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
                      this.changeRole(changeInfo);
                    }
                  }
                },
                '修改'
              ) : null,
              this.allot ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      console.log(params.row)
                      this.roleId = params.row.id;
                      this.name = params.row.name;
                      this.getMenuList();
                      this.menuModal = true;
                    },
                  }
                },
                '菜单分配'
              ) : null
            ]) : h('span', '无');
          }
        }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let system_role_form = window.sessionStorage.getItem('system_role_form');
    if (system_role_form) {
      this.formValidate = JSON.parse(system_role_form);
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
        case "allot": this.allot = true;
          break;
      }
    });
    // this.getList();
  },
  watch: {
    data5() {
      this.menuIds = [];//清空
      //获取反显被勾选的节点
      let checkTreeNodes = this.$refs.tree.getCheckedNodes();
      if (checkTreeNodes.length<=0) {
        return;
      }
      checkTreeNodes.reduce((previousValue, currentValue, index, array) =>{
        this.menuIds.push(currentValue.id);
      },0)
    }
  },
  methods: {
    // 勾选节点的回调函数
    checkChange(arr) {
      this.menuIds = [];
      console.log(arr);
      arr.forEach(item => {
        this.menuIds.push(item.id);
      });
      // this.menuIds = this.menuIds.join(',');
      console.log(this.menuIds);
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node);
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '94%',
          boxSizing: 'border-box',
        },
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.icon,
              },
              style: {
                marginRight: '4px'
              }
            }),
            h('span', {
              props: {},
              style: {
                cursor: 'pointer'
              },
              class: 'tree_title',
            }, data.text)
          ]),
        ]);
    },
    ok() {

    },
    changeRole(parm) {
      this.modalChange = true;
      this.formValidateChange = parm;
      this.formValidateChange.roleStatus = String(this.formValidateChange.roleStatus);
      sessionStorage.setItem('updateId', parm.id);
    },
    // 确认修改信息
    modalChangeOk(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.toChangeRole();
        } else {
          return false;
        }
      });
    },
    sureAddRole(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.toAddRole();
        } else {
        }
      })
    },
    // 关闭菜单分配和提交
    menuModalClose() {
      this.allot_loading = false;
      this.menuModal = false;
    },
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo, '当前的页码数量值');
      this.pageNo = pageNo;
      this.getList();
    },
    addRole() {
      console.log('addRole');
      this.modalAddRole = true;
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          window.sessionStorage.setItem('system_role_form', JSON.stringify(this.formValidate));
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    checkSeeClick(id) {
      console.log(id, 'wo我是IDDDDD');
      this.getInfo(id);
      this.modalSee = true;
    },
    closeModal(tr) {
      if (tr === '1') {
        this.modalSee = false;
      } else if (tr == '2') {
        this.update_loading = false;
        this.modalChange = false;
      } else if (tr === '3') {
        this.add_loading = false;
        this.modalAddRole = false;
      }
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无查询权限');
        return;
      }
      this.query_loading = true;
      let res = await system_role_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formValidate,
      })
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    async getInfo(id) {
      let res = await system_role_info({ id })
      this.formValidateInfo = res.data;
      // this.formValidateInfo.roleStatus = this.formValidateInfo.roleStatus == '1' ?'有效' : '无效';
      this.formValidateInfo.updatetime = this.formValidateInfo.updatetime ? this.$options.filters['formatDate'](this.formValidateInfo.updatetime, 'YYYY-MM-DD HH:mm:ss') : this.formValidateInfo.updatetime;
      this.formValidateInfo.createtime = this.formValidateInfo.createtime ? this.$options.filters['formatDate'](this.formValidateInfo.createtime, 'YYYY-MM-DD HH:mm:ss') : this.formValidateInfo.createtime;
    },
    // 提交修改角色的接口
    async toChangeRole() {
      this.update_loading = true;
      let res = await system_role_update({ id: sessionStorage.getItem('updateId'), ...this.formValidateChange });
      this.update_loading = false;
      if (res && res.code === 1) {
        // this.$Message.success('修改成功');
        this.$refs['formValidateChange'].resetFields();
        this.modalChange = false;
        // 刷新页面
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    async toAddRole() {
      this.add_loading = true;
      let res = await system_role_add({ ...this.formValidateAdd });
      this.add_loading = true;
      if (res && res.code === 1) {
        //this.$Message.success('添加成功');
        this.modalAddRole = false;
        this.$refs['formValidateAdd'].resetFields();
        this.formValidateAdd = {};
        this.getList();
      } else {
        this.formValidateAdd = {};
        this.$Message.error(res.message);
      }
    },
    // 获取菜单列表数据
    async getMenuList() {
      let res = await system_role_menu_list({ id: this.roleId });
      if (res.code === 1) {
        res.data.data[0].expand = true;
        this.data5 = res.data.data;
        // this.$set(this.data5[0].expand, 'expand', true);
      } else {
        this.$Message.error(res.message)
      }
    },
    // 菜单分配的接口
    async menuUpdate() {
      this.allot_loading = true;
      let res = await stytem_menu_opration({ roleId: this.roleId, menuIds: this.menuIds });
      this.allot_loading = false;
      if (res.code === 1) {
        this.menuModal = false;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 重置
    clearForm(name) {
      //这里可以不用改变当前的分页组件之中的页码数值
      this.formValidate = {};
      window.sessionStorage.removeItem('system_role_form');
      this.$refs[name].resetFields();
    }
  }
};
