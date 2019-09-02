import {
  announcement_list,
  announcement_add,
  announcement_update,
  announcement_delete,
  home_gethomecollectrate,
  home_getthedaydata,
  home_gethomecall,
} from '@/service/getData';
import util from '@/libs/util';
import IsConnection from './components/isConnection';
import CaseLoading from './components/caseLoading';
// let speed = 10;//初始速度
// let intNum = 0;//初始值
let timer = null;
let obj = {};
export default {
  name: '/home',
  components: {
    CaseLoading,
    IsConnection
  },
  data() {
    return {
      showPanel3: false,
      showPanel2: false,
      showPanel1: false,
      other_add: false,//其他添加
      other_del: false,//其他删除
      notice_del: false,//公告删除
      notice_add: false,//公告添加
      notice_edit: false,//公告编辑
      charge_add: false,//罚息规则添加
      charge_edit: false,//罚息规则编辑
      charge_del: false,//罚息规则删除
      look_over_flag: false,//查看modal
      announcementContent: '',//modal 显示的内容
      createTime: '',//创建时间
      today_case: {},//今日案件info
      today_case_flag: true,
      this_month: {},//本月案件info
      this_month_flag: true,
      last_month: {},//上月案件info
      last_month_flag: true,
      today_expire: {},//今日到期info
      today_expire_flag: true,
      yesterday: {},//昨日呼叫info
      yesterday_flag: true,
      val: '',
      announcement_list3: [],
      announcement_list1: [],
      announcement_list2: [],
      tableData: [],
      announcement_list: [],
      showCaseLoading: true,
      showIsConnection: false,
      tableColumns2: [
        {
          width: 40,
          type: 'index',
          align: 'center'
        },
        {
          title: '公告详情',
          // maxWidth: 500,
          // minWidth: 350,
          key: 'announcementContent',
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('span', {
              style: {
                display: 'inline-block',
                lineHeight: '22px',
                padding: '10px 5px',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                'white-space': '-moz-pre-wrap',
              }
            }, announcementContent)
          }
        },
        {
          title: '操作',
          maxWidth: 120,
          minWidth: 80,
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
          // maxWidth: 500,
          // minWidth: 350,
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            let createTime = params.row.createTime;
            createTime = this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
            return h('div', [
              h('div', {
                class: 'notice_wrap',
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
              }, announcementContent),
              h('p', {
                style: {
                  'text-align': 'right',
                  'font-size': '14px'
                }
              }, createTime)
            ],
            )
          }
        },
        {
          title: '操作',
          maxWidth: 120,
          minWidth: 80,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    let announcementContent = params.row.announcementContent;
                    let createTime = params.row.createTime;
                    this.announcementContent = announcementContent;
                    this.createTime = this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
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
        case "notice_edit": this.notice_edit = true;
          break;
        case "charge_add": this.charge_add = true;
          break;
        case "charge_edit": this.charge_edit = true;
          break;
        case "charge_del": this.charge_del = true;
          break;
      }
    });
    window.$router = this.$router;
    this.announcement_list_fun();
    // this.numberGrow(this.today_case, 0, 10, 'today_case');
    // this.numberGrow(this.today_return_money, 0, 10, 'today_return_money');
    // this.numberGrow(this.today_return_rate, 0, 10, 'today_return_rate');
    this.home_gethomecollectrate('1');
    this.home_gethomecollectrate('2');
    this.home_gethomecollectrate('3');
    this.home_getthedaydata();
    this.home_gethomecall();
  },
  methods: {
    // 数字匀速增长
    async numberGrow(num, intNum, speed, name, wrap, timer, add_num) {
      if (num <= 0) {
        return;
      }
      obj[wrap + name] = {};
      obj[wrap + name].num = num;
      obj[wrap + name].intNum = intNum;
      obj[wrap + name].speed = speed;
      obj[wrap + name].timer = timer;
      obj[wrap + name].add_num = add_num;
      console.log(obj)
      clearInterval(obj[wrap + name].timer);
      obj[wrap + name].timer = await setInterval(() => {
        obj[wrap + name].intNum = obj[wrap + name].intNum + obj[wrap + name].add_num;//递增匀速
        this.$set(this[wrap], name, obj[wrap + name].intNum);
        if (obj[wrap + name].intNum / obj[wrap + name].num > 0.95) {
          obj[wrap + name].speed = obj[wrap + name].speed + 5;//变速
          // this.numberGrow(obj[wrap+name].num, obj[wrap+name].intNum, obj[wrap+name].speed, name, wrap, obj[wrap+name].timer);
          console.log(obj[wrap + name].intNum / obj[wrap + name].num)
          if (obj[wrap + name].intNum / obj[wrap + name].num > 1) {
            clearInterval(obj[wrap + name].timer);
            obj[wrap + name].speed = 10;
            obj[wrap + name].intNum = 0;
            console.log(obj[wrap + name].timer);
            this.$set(this[wrap], name, obj[wrap + name].num);
          } else {
            console.log(this[wrap])
            this.$set(this[wrap], name, obj[wrap + name].intNum);
          }
        } else {
          // console.log(this[wrap].caseCount)
          this.$set(this[wrap], name, obj[wrap + name].intNum);
        }
      }, obj[wrap + name].speed)
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
    // 处理排名名次的转换
    numTransform(num) {
      switch (num) {
        case 0:
          return '无';
        case 999:
          return '组内排名倒数第一名';
        case 998:
          return '组内排名倒数第二名';
      };
      // alert(util.NumberToChinese(num))
      return `组内排名第${util.NumberToChinese(num)}名`
    },
    // 首页今日案件、本月案件、上月案件面板信息接口
    async home_gethomecollectrate(type) {
      const res = await home_gethomecollectrate({
        type: type,// 1 本月；2 上月；3 今天；
      });
      console.log(res);
      if (res.code === 1) {
        switch (type) {
          case '1':
            this.this_month = res.data;
            this.numberGrow(this.this_month.caseCount, 0, 1, 'caseCount', 'this_month', null, 80);
            this.numberGrow(this.this_month.repayCount, 0, 1, 'repayCount', 'this_month', null, 80);
            this.numberGrow(this.this_month.collectRate, 0, 5, 'collectRate', 'this_month', null, 2);
            this.this_month_flag = false;
            break;
          case '2':
            this.last_month = res.data;
            this.numberGrow(this.last_month.caseCount, 0, 1, 'caseCount', 'last_month', null, 80);
            this.numberGrow(this.last_month.repayCount, 0, 1, 'repayCount', 'last_month', null, 80);
            this.numberGrow(this.last_month.collectRate, 0, 2, 'collectRate', 'last_month', null, 1);
            this.last_month_flag = false;
            break;
          case '3':
            this.today_case = res.data;
            this.numberGrow(this.today_case.caseCount, 0, 3, 'caseCount', 'today_case', null, 5);
            this.numberGrow(this.today_case.repayCount, 0, 3, 'repayCount', 'today_case', null, 5);
            this.numberGrow(this.today_case.collectRate, 0, 5, 'collectRate', 'today_case', null, 1);
            this.today_case_flag = false;
            break;
        }
      } else {
        this.$Message.error(res.message)
      }
    },
    // 今日到期面板接口
    async home_getthedaydata() {
      const res = await home_getthedaydata();
      console.log(res);
      if (res.code === 1) {
        this.today_expire = res.data;
        this.numberGrow(this.today_expire.caseCount, 0, 1, 'caseCount', 'today_expire', null, 80);
        this.numberGrow(this.today_expire.casePromiseCount, 0, 1, 'casePromiseCount', 'today_expire', null, 10);
        this.numberGrow(this.today_expire.caseNoDealCount, 0, 1, 'caseNoDealCount', 'today_expire', null, 50);
        this.today_expire_flag = false;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 昨日呼叫次数统计
    async home_gethomecall() {
      const res = await home_gethomecall();
      console.log(res);
      if (res.code === 1) {
        this.yesterday = res.data;
        this.numberGrow(this.yesterday.callCount, 0, 1, 'callCount', 'yesterday', null, 80);
        this.numberGrow(this.yesterday.connectCount, 0, 1, 'connectCount', 'yesterday', null, 80);
        this.numberGrow(this.yesterday.connectRate, 0, 5, 'connectRate', 'yesterday', null, 1);
        this.yesterday_flag = false;
      } else {
        this.$Message.error(res.message)
      }
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
    },
    passBack() {
      this.showCaseLoading = false
      this.showIsConnection = false
    }

  }
};
