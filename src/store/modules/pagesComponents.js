export const LayoutMain = () => import( /* webpackChunkName: 'LayoutMain' */ '@/pages/common/main');
export const LoginAdmin = () => import( /* webpackChunkName: 'LoginAdmin' */ '@/pages/login/login.vue');
export const Locking = () => import( /* webpackChunkName: 'Locking' */ '@/components/lockscreen/components/locking-page.vue')
export const DemoList = () => import( /* webpackChunkName: 'DemoList' */ '@/pages/demo/demo_list_page');
export const DemoDesc = () => import( /* webpackChunkName: 'DemoDesc' */ '@/pages/demo/demo_desc_page');

// 路由与页面对映表
export const MenuConponentsTable = {
  '/collection/cases/list': DemoList, // 催收管理 - 案件查询
  '/collection/cases/assign': DemoList, // 催收管理 - 案件分配
  '/collection/cases/contracts': DemoList, // 催收管理 - 合同查询
  '2/repayOrd/repayOrdCollect/list': DemoList, // 回款管理 - 回款汇总查询
  '2/repayOrd/repayOrdDetail/list': DemoList, // 回款管理 - 回款明细查询
  '3/arb/list': DemoList, // 仲裁管理 - 我的仲裁
  '3/arb/checkList': DemoList, // 仲裁管理 - 仲裁审批
  '5/cases/assign?checkSts=1': DemoList, // 审查专用 - 案件查询
  '5/repayOrd/repayOrdCollect/list?checkSts=1': DemoList, // 审查专用 - 回款汇总查询
  '5/repayOrd/repayOrdDetail/list?checkSts=1': DemoList, // 审查专用 - 回款明细查询
  '6/reports/overDueReports/list': DemoList, // 报表 - 逾期日报
  '6/moor/callDetail/list': DemoList, // 报表 - 呼叫明细
  '6/moor/agentState/list': DemoList, // 报表 - 坐席监控
  '6/reports/collectRate/list': DemoList, // 报表 - 催收回收率
  '7/embed/cardAgrInfo/list': DemoList, // 产品用户管理 - 用户绑卡信息
  '8/embed/userRepayOrd/list?repayOrdTyp=UR': DemoList, // 账单管理 - 用户主动还款
  '8/embed/userRepayOrd/list?repayOrdTyp=SR': DemoList, // 账单管理 - 系统代扣还款
  '9/overdueSmsCode/list': DemoList, // 埋点短信 - 埋点短信列表
  '10/divide/list': DemoList, // 案件规则 - 规则列表
  '11/call/record/list': DemoList, // 催收录音 - 催收录音列表
  '12/system/user/list': DemoList, // 系统管理 - 系统用户管理
  '12/system/role/list': DemoList, // 系统管理 - 系统角色管理
  '12/system/menu/list': DemoList, // 系统管理 - 菜单管理
  '12/system/collectionRole/list': DemoList, // 系统管理 - 催收角色管理
  '12/system/collection/organization/list': DemoList, // 系统管理 - 催收人员管理
  '12/system/seatRelation/list': DemoList, // 系统管理 - 坐席关系维护
  '12/system/dictionary/list': DemoList, // 系统管理 - 数据字典管理
  '13/letters/casesList': DemoList // 催收函管理 - 催收函我的案件
};
