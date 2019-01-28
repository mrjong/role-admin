import { system_role_list, system_role_add, system_role_update, system_role_info, system_role_menu_list, stytem_menu_opration } from '@/service/getData';
export default {
  name: 'remoney_user',
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 180;
    return {
      showPanel: false,
      showPanel2: false,
      menuModal: false,
      name: '',
      userId: '',
      roleId: '',
      menuIds: [],
      data5: [],
      orderStsList: [
        {
          value: 'zero',
          label: '无效'
        },
        {
          value: 'one',
          label: '有效'
        }
      ],
      modalSee: false,
      modalChange: false,
      modalAddRole: false,
      formValidate: {
      },
      formValidateChange:{roleCode:''},
      formValidateAdd:{roleCode:''},
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
        name:[
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
        name:[
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
          minWidth: 60,
          searchOperator: '=',
          align: alignCenter,
          key: 'buffet_id'
        },
        {
          title: '角色名称',
          searchOperator: '=',
          key: 'name',
          className: 'tableMainW',
          align: alignCenter,
          minWidth: widthVal
        },
        {
          title: '角色状态',
          searchOperator: 'like',
          key: 'roleStatus',
          className: 'tableMainW',
          align: alignCenter,
          minWidth: widthVal
        },
        {
          title: '角色类型',
          searchOperator: 'like',
          key: 'roleType',
          className: 'tableMainW',
          align: alignCenter,
          minWidth: widthMidVal
        },
        {
          title: '创建时间',
          searchOperator: 'like',
          key: 'createtime',
          className: 'tableMainW',
          align: alignCenter,
          minWidth: widthVal,
          render: (h, params) => {
            let createDate = params.row.createtime;
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
          minWidth: widthMidVal,
          render: (h, params) => {
            let createDate = params.row.updatetime;
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
          render: (h, params) => {
            console.log(params.row,'ccccccc');
            let id = params.row.id;
            return h('div', [
                  h(
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
                  ),
                  h(
                    'a',
                    {
                      class: 'edit-btn',
                      props: {},
                      on: {
                        click: ()=> {
                          this.changeRole(id);
                        }
                      }
                    },
                    '修改'
                  ),
                    h(
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
                    )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 勾选节点的回调函数
    checkChange(arr) {
      arr.forEach(item => {
        this.menuIds.push(item.id)
        console.log(item.id.length)
      });
      this.menuIds = this.menuIds.join(',');
      console.log(this.menuIds);
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
    },
    renderContent(h, {root, node, data}) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '94%',
          boxSizing: 'border-box',
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: '',
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
            on: {
              'click': (e) => {

              }
            }
          }, data.text)
        ]),
      ]);
    },
    ok() {

    },
    changeRole(id) {
      this.modalChange = true;
      sessionStorage.setItem('updateId', id);
    },
    // 确认修改信息
    modalChangeOk(name) {
      console.log('first')
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
          console.log('twotwo')
        }
      })
    },
    // 关闭菜单分配和提交
    menuModalClose() {
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
          this.getList();
        }
      });
    },
    checkSeeClick(id) {
      this.getInfo(id);
      this.modalSee = true;
    },
    closeModal(tr) {
      if (tr === '1') {
        this.modalSee = false;
      } else if (tr == '2') {
        this.modalChange = false;
      } else if (tr === '3') {
        this.modalAddRole = false;
      }
    },

    // 保存更新的菜单分配
    updateMenu() {

    },
    // 获取表格数据
    async getList() {
      let res = await system_role_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
      })
      this.tableData = res.data.content;
      this.total = res.data.totalElements;
      console.log(res, '返回结果')
      // 试着处理数据和分页组件之间的关系,
    },
    async getInfo(id) {
      let res = await system_role_info({id})
      this.formValidateInfo = res.data;
      this.formValidateInfo.updatetime = this.$options.filters['formatDate'](this.formValidateInfo.updatetime, 'YYYY-MM-DD HH:mm:ss')
      this.formValidateInfo.createtime = this.$options.filters['formatDate'](this.formValidateInfo.createtime, 'YYYY-MM-DD HH:mm:ss')

      console.log(res, '查看角色信息');
    },
    // 提交修改角色的接口
    async toChangeRole() {
      this.formValidateChange.roleStatus = this.formValidateChange.roleStatus == 'one' ? 1:0;
      let res = system_role_update({id: sessionStorage.getItem('updateId'), ...this.formValidateChange});
      if (res && res.code == 1) {
        this.$Messagel.success('修改成功');
        this.modalChange = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    async toAddRole() {
      this.formValidateAdd.roleStatus = this.formValidateAdd.roleStatus == 'one' ? 1 : 0;
      let res = await
        system_role_add({...this.formValidateAdd});
      if (res && res.code === 1) {
        this.$Message.success('添加成功');
        this.modalAddRole = false;
        console.log(res, '添加角色接口请求结果')
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取菜单列表数据
    async getMenuList() {
      let res = await system_role_menu_list({id: '5bdb56ec980e4b998ac372af9a6dcad0' });
      if (res.code === 1) {
        this.data5 = res.data.data;
        this.data5[0].expand = true;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 菜单分配的接口
    async menuUpdate() {
      let res = await stytem_menu_opration({ roleId: '5bdb56ec980e4b998ac372af9a6dcad0', menuIds: this.menuIds });
      if (res.code === 1) {
        this.menuModal = false;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formValidate = {};
      this.$refs[name].resetFields();
    }
  }
};
