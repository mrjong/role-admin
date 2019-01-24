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
          value: 'gbbg',
          label: 'New York'
        }
      ],
      modalSee: false,
      formValidate: {
        // 查询接口时候所需的参数值传递
        billNo: '', //账单号,
        dkorgOrdNo: '', // string 代扣订单号,
        usrNm: '', // 用户姓名,
        mblNo: '', // 手机号,
        ordSts: '', // 订单状态 借口中取,
        orgFnlMsg: '', //失败原因,
        ordDt: '', // 还款时间,
        prdTyp: '', //产品线01：还到02：随行付钱包 03：商户贷，调接口,
        rutCopyOrg: '', // 代扣通道,
        startRepayDate: '', //起始时间段
        endRepayDate: '', // 结束时间段
        //nametwo: '', //此处的名称必须要与 ruleValidate的里面具体的校验规则名称完全的保持一致性，不然会出现校验bug
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
      pageNo: 1,
      pageSize: 10,
      total: 100,
      tableData: [
        {
          createUser: "超级管理员",
          createtime: 1545635436000,
          description: "测试系统管理员",
          id: "5bdb56ec980e4b998ac372af9a6dcad0",
          name: "测试2",
          roleCode: null,
          roleStatus: 1,
          roleType: "01",
          updateUser: "超级管理员",
          updatetime: 1545635436000,
        },
      ],
      tableColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
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
          width: widthVal
        },
        {
          title: '角色状态',
          searchOperator: 'like',
          key: 'roleStatus',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '角色类型',
          searchOperator: 'like',
          key: 'roleType',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
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
          title: '最后操作时间',
          searchOperator: 'like',
          key: 'updatetime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
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
            return h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.testClick();
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {}
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
    renderContent(h, { root, node, data }) {
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
              props: {
              },
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
    // 关闭菜单分配和提交
    menuModalClose() {
      this.menuModal = false;
    },
    // 改变日期区间的格式之后进行处理
    changeDange(val1, val2) {
      this.formValidate.startRepayDate = val1[0];
      this.formValidate.endRepayDate = val1[1];
      console.log('123', this.formValidate);

      //this.formValidate.startAndend[1].Date('yyyy-MM-dd');
    },
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo, '当前的页码数量值');
      this.pageNo = pageNo;
      //this.getList();
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
    //
    testClick() {
      this.modalSee = true;
    },
    closeModalSee() {
      this.modalSee = false;
    },
    // 保存更新的菜单分配
    updateMenu () {

    },
    // 获取表格数据
    async getList() {
      let res = await system_role_list({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
      this.tableData = res.data;
      console.log(res, '返回结果')
      // 试着处理数据和分页组件之间的关系,
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
