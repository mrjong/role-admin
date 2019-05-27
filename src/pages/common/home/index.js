import {
  announcement_list,
  announcement_add,
  announcement_update,
  announcement_delete,
  home_gethomecollectrate,
  home_getthedaydata
} from '@/service/getData';
// let speed = 10;//初始速度
// let intNum = 0;//初始值
let timer = null;
export default {
  name: '/home',
  data() {

    return {
      showPanel3: false,
      showPanel2: false,
      showPanel1: false,
      other_add: false,//其他添加
      other_del: false,//其他删除
      notice_del: false,//公告删除
      notice_add: false,//公告添加
      notice_edit: true,//公告编辑
      charge_add: false,//罚息规则添加
      charge_edit: false,//罚息规则编辑
      charge_del: true,//罚息规则删除
      look_over_flag: false,//查看modal
      announcementContent: '',//modal 显示的内容
      today_case: 388,//今日案件
      today_return_money: 265,//今日回款
      today_return_rate: 58,//今日回款率
      val: '',
      announcement_list3: [],
      announcement_list1: [],
      announcement_list2: [],
      tableData: [],
      announcement_list: [],
      tableColumns2: [
        {
          width: 40,
          type: 'index',
          align: 'center'
        },
        {
          title: '公告详情',
          width: 420,
          key: 'announcementContent',
          ellipsis: true,
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('span', {
              style: {
                display: 'inline-block',
                lineHeight: '22px',
                padding: '10px 5px',
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }
            }, announcementContent)
          }
        },
        {
          title: '操作',
          maxWidth: 125,
          minWidth: 75,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              this.charge_edit ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.showAlert('2', params.row.uuid, params.row.announcementContent);
                    }
                  }
                },
                '编辑'
              ) : null,
              this.charge_del ? h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.delAnnouncement(params.row.uuid);
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
                    '删除'
                  )
                ]
              ) : null
            ]);
          }
        }
      ],
      tableColumns: [
        {
          width: 40,
          type: 'index',
          align: 'center'
        },
        {
          title: '公告详情',
          key: 'announcementContent',
          width: 420,
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('div', {
              style: {
                lineHeight: '26px',
                padding: '6px 3px',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                'display': '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': 2,
                'text-overflow': 'ellipsis',
                'overflow': 'hidden',
              }
            }, announcementContent)
          }
        },
        {
          title: '操作',
          maxWidth: 125,
          minWidth: 75,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    let announcementContent = params.row.announcementContent;
                    this.announcementContent = announcementContent;
                    this.look_over_flag = true
                  }
                }
              },
                '查看'),
              this.notice_edit ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.showAlert('1', params.row.uuid, params.row.announcementContent);
                    }
                  }
                },
                '编辑'
              ) : null,
              this.notice_del ? h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.delAnnouncement(params.row.uuid);
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
                    '删除'
                  )
                ]
              ) : null
            ]);
          }
        }
      ],
      tableColumns3: [
        {
          width: 100,
          type: 'index',
          align: 'center'
        },
        {
          title: '公告详情',
          key: 'announcementContent',
          maxWidth: 1000,
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: announcementContent,
                    placement: 'top-start',
                    maxWidth: 980,
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '990px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, announcementContent)]
              ),
            ])
          }
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              this.other_del ? h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.delAnnouncement(params.row.uuid);
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
                    '删除'
                  )
                ]
              ) : null
            ]);
          }
        }
      ]
    };
  },
  created() {
    console.log(this.$route)
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "other_del": this.other_del = true;
          break;
        case "other_add": this.other_add = true;
          break;
        case "notice_del": this.notice_del = true;
          break;
        case "notice_add": this.notice_add = true;
          break;
        case "charge_add": this.charge_add = true;
          break;
        case "charge_edit": this.charge_edit = true;
          break;
      }
    });
    window.$router = this.$router;
    this.announcement_list_fun();
    this.numberGrow(this.today_case, 0, 10, 'today_case');
    this.numberGrow(this.today_return_money, 0, 10, 'today_return_money');
    this.numberGrow(this.today_return_rate, 0, 10, 'today_return_rate');
    this.home_gethomecollectrate('1');
    this.home_gethomecollectrate('2');
    this.home_gethomecollectrate('3');
    this.home_getthedaydata()
  },
  methods: {
    // 数字匀速增长
    numberGrow(num, intNum, speed, name) {
      clearInterval(timer);
      timer = setInterval( () => {
        intNum = intNum + 1;//递增匀速
        if (intNum / num > 0.95) {
          speed = speed + 5;//变速
          this.numberGrow(num, intNum, speed, name);
          console.log(intNum/num)
          if (intNum / num > 1) {
            clearInterval(timer);
            speed = 10;
            intNum = 0;
            console.log(timer);
          } else {
            this.$set(this, name, intNum);
          }
        } else {
          this.$set(this, name, intNum);
        }
      }, speed)
      // clearInterval(timer);
    },
    showAlert(type, uuid, val) {
      this.$Modal.confirm({
        title: type === '1' ? '公告' : '罚息规则',
        onOk: () => {
          if (this.val) {
            if (uuid) {
              this.editAnnouncement(uuid, this.val || val);
            } else {
              this.addAnnouncement(type, this.val);
            }
          } else {
            this.$Message.error('请输入内容');
          }
        },
        render: (h) => {
          return h('Input', {
            props: {
              type: 'textarea',
              value: val || '',
              placeholder: '请输入内容',
              rows: 3,
              maxlength: 500,
            },
            on: {
              input: (val) => {
                this.val = val;
              }
            }
          });
        }
      });
    },
    // 首页今日案件、本月案件、上月案件面板信息接口
    async home_gethomecollectrate(type) {
      const res = await home_gethomecollectrate({
        type: type,// 1 本月；2 上月；3 今天；
      });
      console.log(res);
    },
    // 今日到期面板接口
    async home_getthedaydata() {
      const res = await home_getthedaydata();
      console.log(res)
    },
    // 编辑公告
    async editAnnouncement(uuid, content) {
      const res = await announcement_update({
        uuid,
        content
      });
      if (res.code === 1) {
        this.val = '';
        this.$Message.success('编辑成功');
        setTimeout(() => {
          this.announcement_list_fun();
        }, 500);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 新增公告
    async addAnnouncement(type, content) {
      const res = await announcement_add({
        type,
        content
      });
      if (res.code === 1) {
        this.val = '';
        this.$Message.success('添加成功');
        setTimeout(() => {
          this.announcement_list_fun();
        }, 500);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 删除公告
    async delAnnouncement(uuid) {
      const res = await announcement_delete({
        uuid
      });
      if (res.code === 1) {
        this.$Message.success('删除成功');
        setTimeout(() => {
          this.announcement_list_fun();
        }, 500);
      } else {
        this.$Message.error(res.message);
      }
    },
    async announcement_list_fun() {
      const res = await announcement_list();
      if (res.code === 1) {
        this.announcement_list1 = (res.data && res.data.date_1) || [];
        this.announcement_list2 = (res.data && res.data.date_2) || [];
        this.announcement_list3 = (res.data && res.data.date_3) || [];
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
