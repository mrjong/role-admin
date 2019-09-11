import fetch from '@/libs/fetch';
import qs from 'qs';
/**
 * 登录
 */
export const login = (obj = {}) =>
  fetch({
    url: '/system/login',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 退出
 */
export const logout = (obj = {}) =>
  fetch({
    url: '/system/logout',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 重置密码
 */
export const reset_passWord = (obj = {}) =>
  fetch({
    url: '/reset/passWord',
    method: 'POST',
    data: qs.stringify(obj)
  });
/**
 * 工作流定义列表
 */
export const wkProcessDef_list = (obj = {}) =>
  fetch({
    url: '/wkProcessDef/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 工作流定义列表-禁用
 */
export const wkProcessDef_forbid = (obj = {}) =>
  fetch({
    url: '/wkProcessDef/forbid',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 工作流定义列表-复制
 */
export const wkProcessDef_copy = (obj = {}) =>
  fetch({
    url: '/wkProcessDef/copy',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 工作流定义列表-发布
 */
export const wkProcessDef_release = (obj = {}) =>
  fetch({
    url: '/wkProcessDef/release',
    method: 'POST',
    data: qs.stringify(obj)
  });
/**
 * 工作流保存
 */
export const wkProcessDef_save = (obj = {}) =>
  fetch({
    url: '/wkProcessDef/save',
    method: 'POST',
    data: obj
  });

/**
 * 任务详情
 */
export const wkProcessTask_detail = (obj = {}) =>
  fetch({
    url: `/wkProcessTask/detail`,
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 任务列表
 */
export const wkProcessTask_list = (obj = {}) =>
  fetch({
    url: '/wkProcessTask/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 脱敏变明文
 */
export const syscommon_decrypt = (obj = {}) =>
  fetch({
    url: '/syscommon/decrypt',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 菜单权限
 */
export const system_menu_findTreeByCurrentUser = (obj = {}) =>
  fetch({
    url: '/system/menu/findTreeByCurrentUser',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 公告添加
 */
export const announcement_add = (obj = {}) =>
  fetch({
    url: '/announcement/add',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 公告修改
 */
export const announcement_delete = (obj = {}) =>
  fetch({
    url: '/announcement/delete',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 公告修改
 */
export const announcement_update = (obj = {}) =>
  fetch({
    url: '/announcement/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

/**
 * 公告信息
 */
export const announcement_list = (obj = {}) =>
  fetch({
    url: '/announcement/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 首页今日案件、本月案件、上月案件面板信息接口
export const home_gethomecollectrate = (obj) =>
  fetch({
    url: '/home/gethomecollectrate',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 首页今日到期
export const home_getthedaydata = (obj) =>
  fetch({
    url: '/home/getthedaydata',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 首页呼叫次数面板
export const home_gethomecall = (obj) =>
  fetch({
    url: '/home/gethomecall',
    method: 'POST',
    data: qs.stringify(obj)
  })
/*
*
* 查询用户主动还款&系统代扣的列表
* */
export const repay_repayUserOrSystem_list = (obj = {}) =>
  fetch({
    url: '/repay/repayUserOrSystem/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 用户主动还款&系统代扣还款列表导出
* */
export const repay_repayUserOrSystem_exportDown = (obj) =>
  fetch({
    url: '/repay/repayUserOrSystem/exportDown',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 回款明细列表查询接口
export const repay_repayDetail_list = (obj, options) =>
  fetch({
    url: '/repay/repayDetail/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 回款明细导出接口
export const repay_repayDetail_exportDown = (obj, options) =>
  fetch({
    url: '/repay/repayDetail/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });

// 日常监控的坐席报表
export const monitor_agentState_list = (obj) =>
  fetch({
    url: '/monitor/agentState/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 日常监控的坐席报表导出
export const monitor_agentState_exportDown = (obj, options) =>
  fetch({
    url: '/monitor/agentState/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
// 坐席报表的组织查询接口
export const monitor_groupList = (obj) =>
  fetch({
    url: '/monitor/groupList',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 坐席数据查询接口
export const monitor_getAgentList = (obj) =>
  fetch({
    url: '/monitor/getAgentList',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 日常监控的逾期日志列表请求
export const monitor_overdueReports_list = (obj) =>
  fetch({
    url: '/monitor/overdueReports/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 日常监控逾期报表导出接口
export const monitor_overDueReports_exportDown = (obj, options) =>
  fetch({
    url: '/monitor/overDueReports/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });

// 呼叫明细合并后的列表接口
export const call_record_list = (obj) =>
  fetch({
    url: '/call/record/list',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 呼叫明细合并后的导出接口
export const call_record_export = (obj, options) =>
  fetch({
    url: '/call/record/export',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  })
// 容联呼叫明细列表接口查询
export const rl_callDetail_list = (obj) =>
  fetch({
    url: '/monitor/callDetail/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 科天呼叫明细列表接口查询
export const kt_callDetail_list = (obj) =>
  fetch({
    url: '/monitor/callKtDetail/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 讯众呼叫明细列表接口查询
export const xz_callDetail_list = (obj) =>
  fetch({
    url: '/monitor/callXzDetail/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 容联呼叫明细导出
export const rl_callDetail_exportDown = (obj, options) =>
  fetch({
    url: '/monitor/callDetail/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
// 科天呼叫明细导出
export const kt_callDetail_exportDown = (obj, options) =>
  fetch({
    url: '/monitor/callKtDetail/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
// 讯众呼叫明细导出
export const xz_callDetail_exportDown = (obj, options) =>
  fetch({
    url: '/monitor/callXzDetail/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });

// 催收回收率列表导出
export const monitor_collectRate_exportDown = (obj, options) =>
  fetch({
    url: '/monitor/collectRate/exportDown',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });

// 催收回收列表查询
export const monitor_collectRate_list = (obj) =>
  fetch({
    url: '/monitor/collectRate/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
/*
*
* 根据父级id获取相应字典数据
* */
export const sysDictionary_getListByParentId = (obj, options) =>
  fetch({
    url: '/sysDictionary/getListByParentId',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
* 催收管理 我的案件
* */
//催收记录列表
export const case_collect_case_list = (obj, options) =>
  fetch({
    url: '/case/collect/case_list',
    method: 'POST',
    data: qs.stringify(obj)
  });
//催收录音列表
export const case_collect_record_file_list = (obj) =>
  fetch({
    url: '/case/collect/record_file_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 催收人员管理列表
export const collect_user_list = (obj) =>
  fetch({
    url: '/collect/user/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 催收人员管理列表(动态)
export const collect_parent_children = (obj) =>
  fetch({
    url: '/collect/parent/children',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 催收人员管理列表
export const collect_tree_children = (obj) =>
  fetch({
    url: '/collect/tree/children',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 案件规则分配人员列表
export const collect_show_children = (obj) =>
  fetch({
    url: '/collect/show/children',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 添加催收部门领导
export const collect_user_leader_add = (obj) =>
  fetch({
    url: '/collect/user/leader/add',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 添加催收普通员工
export const collect_user_clerk_add = (obj) =>
  fetch({
    url: '/collect/user/clerk/add',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 查询催收人员信息
export const collect_user_clerk_info = (obj) =>
  fetch({
    url: '/collect/user/clerk/info',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 用户信息校验
export const collect_user_check = (obj) =>
  fetch({
    url: '/collect/user/check',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 添加催收机构
export const collect_section_add = (obj) =>
  fetch({
    url: '/collect/section/add',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 更改催收机构
export const collect_section_update = (obj) =>
  fetch({
    url: '/collect/section/update',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 添加部门信息
export const collect_outfit_add = (obj) =>
  fetch({
    url: '/collect/outfit/add',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 修改部门信息
export const collect_outfit_update = (obj) =>
  fetch({
    url: '/collect/outfit/update',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 添加催收公司
export const collect_company_add = (obj) =>
  fetch({
    url: '/collect/company/add',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 修改公司信息
export const collect_company_update = (obj) =>
  fetch({
    url: '/collect/company/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 更新催收部门领导
export const collect_user_leader_update = (obj) =>
  fetch({
    url: '/collect/user/leader/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 更新催收部门普通员工
export const collect_user_clerk_update = (obj) =>
  fetch({
    url: '/collect/user/clerk/update',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 查询所有人员接口
export const collect_list_leader = (obj) =>
  fetch({
    url: '/collect/list/leader',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 变更催收人员状态
export const collect_status_change = (obj) =>
  fetch({
    url: '/collect/status/change',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查询无效员工list
export const collect_local_list = (obj) =>
  fetch({
    url: '/collect/local/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 系统用户查看用户列表接口
* */
export const system_user_list = (obj, options) =>
  fetch({
    url: '/system/user/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 系统用户查看用户详情
* */
export const system_user_info = (obj, options) =>
  fetch({
    url: '/system/user/info',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
* 新增系统用户
* */
export const system_user_add = (obj, options) =>
  fetch({
    url: '/system/user/add',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
* 查看所有用户角色
* */
export const system_user_roles = (obj, options) =>
  fetch({
    url: '/system/user/roles',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 修改系统用户
* */
export const system_user_update = (obj, options) =>
  fetch({
    url: '/system/user/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 业务管理的划扣管理
export const deduct_list = (obj) =>
  fetch({
    url: '/repayinfo/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 划扣导出
export const repayinfo_exportlist = (obj, options) =>
  fetch({
    url: '/repayinfo/exportlist',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options,
  })
// 系统管理系统角色相关接口
// 查询接口
export const system_role_list = (obj) =>
  fetch({
    url: '/system/role/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 角色管理添加接口
export const system_role_add = (obj) =>
  fetch({
    url: '/system/role/add',
    method: 'POST',
    data: qs.stringify(obj)
  });
//编辑修改
export const system_role_info = (obj) =>
  fetch({
    url: '/system/role/info',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 角色更新接口
export const system_role_update = (obj) =>
  fetch({
    url: '/system/role/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 菜单管理的相关接口
export const stytem_menu_list = (obj) =>
  fetch({
    url: '/system/menu/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 修改菜单项接口
export const stytem_menu_update = (obj) =>
  fetch({
    url: '/system/menu/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 新增菜单项接口
export const stytem_menu_add = (obj) =>
  fetch({
    url: '/system/menu/add',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 删除菜单接口
export const system_menu_del = (obj) =>
  fetch({
    url: '/system/menu/del',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查询菜单分配的接口
export const system_role_menu_list = (obj) =>
  fetch({
    url: '/system/role/menu/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 菜单分配的接口
export const stytem_menu_opration = (obj) =>
  fetch({
    url: '/system/menu/opration',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 坐席关系维护列表
export const call_employee_list = (obj) =>
  fetch({
    url: '/call/employee/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 坐席列表删除
export const call_employee_del = (obj) =>
  fetch({
    url: '/call/employee/del',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 坐席管理更新
export const call_employee_update = (obj) =>
  fetch({
    url: '/call/employee/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 坐席列表添加
export const call_employee_add = (obj) =>
  fetch({
    url: '/call/employee/add',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查询未配置坐席的人员
export const call_employee_user = (obj) =>
  fetch({
    url: '/call/employee/user',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 催收记录
* */
export const case_detail_remark_list = (obj, options) =>
  fetch({
    url: '/case/detail/remark_list',
    method: 'POST',
    data: qs.stringify(obj)
  });
/*
*
* 回款信息
* */
export const case_detail_repay_ord_list = (obj, options) =>
  fetch({
    url: '/case/detail/repay_ord_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 用户主动还款（指定案件、用户）
* */
export const case_detail_user_repay_list = (obj, options) =>
  fetch({
    url: '/case/detail/user_repay_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 系统代扣还款（指定案件）
* */
export const case_detail_system_repay_list = (obj, options) =>
  fetch({
    url: '/case/detail/system_repay_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
* 绑卡信息（指定案件、用户）
* */
export const case_detail_bindcard_list = (obj, options) =>
  fetch({
    url: '/case/detail/bindcard_list',
    method: 'POST',
    data: qs.stringify(obj)
  });
/*
* 新增系统用户
/*
* 新增系统用户* */
//export const system_user_add = (obj, options) =>

/*
*
* 分配信息（指定案件）
* */
export const case_detail_allot_list = (obj, options) =>
  fetch({
    url: '/case/detail/allot_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 案件详情=>操作记录（指定案件）
export const case_detail_getcaselog = (obj) =>
  fetch({
    url: '/case/detail/getcaselog',
    method: 'POST',
    data: qs.stringify(obj)
  })

/*
*
* 站内信息（指定案件）
* */
export const case_detail_siteletter_list = (obj, options) =>
  fetch({
    url: '/case/detail/siteletter_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
*
地址信息（指定案件）
* */
export const case_detail_address_info = (obj, options) =>
  fetch({
    url: '/case/detail/address_info',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
*
通信录明细（指定案件）
* */
export const case_detail_mail_detail_list = (obj, options) =>
  fetch({
    url: '/case/detail/mail_detail_list',
    method: 'POST',
    data: qs.stringify(obj)
  });
/*
*
*
通讯录（指定案件）
* */
export const case_detail_mail_list = (obj, options) =>
  fetch({
    url: '/case/detail/mail_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
*
通讯录（指定案件后追加的）
* */
export const case_detail_mail_list_appended = (obj, options) =>
  fetch({
    url: '/case/detail/mail_list_appended',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
*
通信记录统计
* */
export const case_detail_mail_statistics_list = (obj, options) =>
  fetch({
    url: '/case/detail/mail_statistics_list',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
*
紧急联系人
* */
export const case_detail_urgent_contact = (obj, options) =>
  fetch({
    url: '/case/detail/urgent_contact',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 案件管理相关接口
// 案件列表接口
export const case_list = (obj) =>
  fetch({
    url: '/cases/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 案件查询导出
export const query_export = (obj, options) =>
  fetch({
    url: '/cases/query/export',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
// 案件分配导出
export const allot_export = (obj, options) =>
  fetch({
    url: '/cases/allot/export',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
// 案件分配列表接口
export const cases_allot_list = (obj) =>
  fetch({
    url: '/cases/allot/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 案件批量分配接口
export const cases_batch_allot = (obj) =>
  fetch({
    url: '/cases/batch/allot',
    method: 'POST',
    data: qs.stringify(obj),
    timeout: 120000,
  });
// 案件批量回收接口
export const cases_batch_recycle = (obj) =>
  fetch({
    url: '/cases/batch/recycle',
    method: 'POST',
    data: qs.stringify(obj),
    timeout: 120000,
  });
// 案件停止催收
export const cases_collect_stop = (obj) =>
  fetch({
    url: '/cases/collect/stop',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 案件恢复催收
export const cases_collect_recover = (obj) =>
  fetch({
    url: '/cases/collect/recover',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 案件批量发送站内信
export const cases_case_sendwebmessage = (obj) =>
  fetch({
    url: '/cases/case/sendwebmessage',
    method: 'POST',
    data: qs.stringify(obj),
    timeout: 120000,
  })
// 分案规则列表
export const divide_rules_list = (obj) =>
  fetch({
    url: '/divide/rules/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 添加案件接口
export const divide_rules_add = (obj) =>
  fetch({
    url: '/divide/rules/add',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 一键分配接口
export const divide_allot_manual = (obj, options) =>
  fetch({
    url: '/divide/allot/manual',
    method: 'POST',
    data: obj,
    options
  });
// 一键分配里面查询案件量接口
export const allot_manualcounts = (obj) =>
  fetch({
    url: '/divide/allot/manualcounts',
    method: 'POST',
    data: qs.stringify(obj)
  })

// 案件状态启用，停用
export const divide_rules_changeStatus = (obj) =>
  fetch({
    url: '/divide/rules/changeStatus',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 分案规则顺序
export const divide_rules_order = (obj) =>
  fetch({
    url: '/divide/rules/order',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查询分案规则详情
export const divide_rules_edit = (obj) =>
  fetch({
    url: '/divide/rules/edit',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 修改分案规则
export const divide_rules_save = (obj) =>
  fetch({
    url: '/divide/rules/save',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查看分案规则修改历史记录
export const divide_rules_his = (obj) =>
  fetch({
    url: '/divide/rules/his',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 分案规则回款率接口
export const allot_divideCollectRate = (obj, options) =>
  fetch({
    url: '/divide/allot/divideCollectRate',
    method: 'POST',
    data: obj,
    options
  })

// 导入查询
export const import_list = (url, obj) =>
  fetch({
    url: `${url}/import/list`,
    method: 'POST',
    data: qs.stringify(obj)
  })

// 下载导入查询模板
export const cases_download_template = (obj, options) =>
  fetch({
    url: '/cases/download/template',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  })
/*
*
*
查询案件详情基础信息
* */
export const case_detail_case_base_info = (obj, options) =>
  fetch({
    url: '/case/detail/case_base_info',
    method: 'POST',
    data: qs.stringify(obj)
  });

/*
*
*
查询案件详情身份信息
* */
export const case_detail_case_identity_info = (obj, options) =>
  fetch({
    url: '/case/detail/case_identity_info',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 案件详情获取图片接口
export const case_detail_getimgurls = (obj, options) =>
  fetch({
    url: '/case/detail/getimgurls',
    method: 'POST',
    data: qs.stringify(obj)
  })
/*
*
*
导出我的案件
* */
export const case_collect_case_list_export = (obj, options) =>
  fetch({
    url: '/case/collect/case_list_export',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });

/*
*
*
导出我的案件
* */
export const mail_list_add = (obj, options) =>
  fetch({
    url: '/mail_list/add',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
*
催收记录列表
* */
export const case_collect_collect_list = (obj, options) =>
  fetch({
    url: '/case/collect/collect_list',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });
// 催收记录导出
export const case_collect_collect_export = (obj, options) =>
  fetch({
    url: '/case/collect/collect_export',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  })

/*
*
*
催收记录列表导出
* */

// 录音播放（催收录音）
export const case_collect_tape = (obj, options) =>
  fetch({
    url: '/case/collect/tape',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options,
  })
export const case_collect_tape_link = (obj) =>
  fetch({
    url: `case/collect/tape_path`,
    method: 'POST',
    data: qs.stringify(obj),
  })
// 录音下载（催收录音）
export const case_collect_tape_download = (obj, options) =>
  fetch({
    url: '/case/collect/tape_download',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options,
  });

/*
*
*
催记管理相关接口
* */
export const case_remark_his_add = (obj, options) =>
  fetch({
    url: '/case_remark_his/add',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
*
获取
拨打状态
* */
export const collectcode_getListByCodeType = (obj, options) =>
  fetch({
    url: '/collectcode/getListByCodeType',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
获取code关系
* */
export const collectcode_getCollectRelate = (obj, options) =>
  fetch({
    url: '/collectcode/getCollectRelate',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });
// 获取沟通状态
export const collectcode_getCodeList = (obj, options) =>
  fetch({
    url: '/collectcode/getCodeList',
    method: 'POST',
    data: qs.stringify(obj),
  })

/*
*
根据案件号获取申请代扣信息
* */
export const repayinfo_getApplyInfo = (obj, options) =>
  fetch({
    url: '/repayinfo/getApplyInfo',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
根据用户ID和产品线查询绑卡信息
* */
export const repayinfo_getCardNos = (obj, options) =>
  fetch({
    url: '/repayinfo/getCardNos',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
调用代扣
* */
export const repayinfo_applayRepay = (obj, options) =>
  fetch({
    url: '/repayinfo/applayRepay',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
系统用户密码重置接口
* */
export const system_user_reset = (obj, options) =>
  fetch({
    url: '/system/user/reset',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
工作流
详情
* */
export const wkProcessDef_detail = (obj, options) =>
  fetch({
    url: '/wkProcessDef/detail',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
工作流
修改
* */
export const wkProcessDef_update = (obj, options) =>
  fetch({
    url: '/wkProcessDef/update',
    method: 'POST',
    data: obj,
    options
  });

/*
*
工作流任务审核
* */
export const wkProcessTask_approval_list = (obj, options) =>
  fetch({
    url: '/wkProcessTask/approval_list',
    method: 'POST',
    data: obj,
    options
  });
/*
* 经办人 04 催收中心 02
* */
export const getLeafTypeList = (obj, options) =>
  fetch({
    url: '/collect/getLeafTypeList',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
*
数据字典查询
* */
export const sysDictionary_list = (obj, options) =>
  fetch({
    url: '/sysDictionary/list',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });
/*
*
仲裁查询操作
* */
export const arb_list = (obj, options) =>
  fetch({
    url: '/arb/list',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

// 仲裁审批上传文档接口
export const credit_pdf_upload = (obj) =>
  fetch({
    url: '/credit/pdf/upload',
    method: 'POST',
    data: qs.stringify(obj),
  })
export const credit_pdf_data = (obj) =>
  fetch({
    url: '/credit/pdf/data',
    method: 'POST',
    data: qs.stringify(obj),
  })
//仲裁申请执行接口
export const credit_case_execute = (obj, options) =>
  fetch({
    url: '/credit/case/execute',
    method: 'POST',
    data: obj,
    options
  })
export const arb_exportlist = (obj, options) =>
  fetch({
    url: '/arb/exportlist',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  })
// 案件详情的获取时间轴接口
export const credit_case_process = (obj) =>
  fetch({
    url: '/credit/case/process',
    method: 'POST',
    data: qs.stringify(obj),
  })
/*
*
我的仲裁
* */
export const arb_myArbList = (obj, options) =>
  fetch({
    url: '/arb/myArbList',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
*
查看仲裁详情
* */
export const arb_detail = (obj, options) =>
  fetch({
    url: '/arb/detail?approvalId=' + obj.approvalId,
    method: 'get'
  });

/*
*
查看仲裁审核
* */
export const arb_check = (obj, options) =>
  fetch({
    url: '/arb/check',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });
/*
*
获取图片验证码
* */
export const login_code = (obj, options) =>
  fetch({
    url: '/login/code',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
申请仲裁
* */
export const arb_apply = (obj, options) =>
  fetch({
    url: '/arb/apply',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
    坐席登录（登录时请求）
* */
export const callout_get_seat = (obj, options) =>
  fetch({
    url: '/callout/get_seat',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/**
 * 详情页外呼时重新获取坐席信息（新路由模式）
 */
export const callout_rout_get_seat = (obj) =>
  fetch({
    url: 'callout/rout/get_seat',
    method: 'POST',
    data: qs.stringify(obj),
  })

/**
 * 新路由的外呼接口
 *
 */
export const callout_hung_on = (obj, params) =>
  fetch({
    url: 'callout/hung_on',
    method: 'POST',
    data: obj,
    ...params
  })
/**
 * 新路由挂断接口
 */
export const callout_hung_off = (obj) =>
  fetch({
    url: 'callout/hung_off',
    method: 'POST',
    data: qs.stringify(obj),
  })

/*
客天外拨
* */
export const call_kt_hung_on = (obj, options) =>
  fetch({
    url: '/call/kt/hung_on',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });

/*
容联外呼
* */
export const call_moor_hung_on = (obj, options) =>
  fetch({
    url: '/call/moor/hung_on',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });
// 容联挂断
export const call_moor_hung_up = (obj) =>
  fetch({
    url: '/call/moor/hung_up',
    method: 'POST',
    data: qs.stringify(obj),
  })

/*
讯众外呼
*/
export const call_xz_hung_on = (obj) =>
  fetch({
    url: '/call/xz/hung_on',
    method: 'POST',
    data: qs.stringify(obj),
  })

// 讯众挂断
export const call_xz_hung_off = (obj) =>
  fetch({
    url: '/call/xz/hung_off',
    method: 'POST',
    data: qs.stringify(obj),
  })

// 数据字典添加
export const sysDictionary_save = (obj) =>
  fetch({
    url: '/sysDictionary/save',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 数据字典删除
export const sysDictionary_delete = (obj) =>
  fetch({
    url: '/sysDictionary/delete',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 数据字典删除
export const sysDictionary_update = (obj) =>
  fetch({
    url: '/sysDictionary/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 地区省份接口
export const sysarea_getAreaProvience = (obj) =>
  fetch({
    url: '/sysarea/getAreaProvience',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 地区市级接口
export const sysarea_getAreaByParentId = (obj) =>
  fetch({
    url: '/sysarea/getAreaByParentId',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 案件操作日志管理
export const cases_operationList = (obj) =>
  fetch({
    url: '/caseLog/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 案件操作日志详情
export const cases_operationDetail = (obj) =>
  fetch({
    url: '/caseLog/detail',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 信息日志管理
export const msg_list = (obj) =>
  fetch({
    url: '/collectMsg/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 信息日志详情
export const msg_detail = (obj) =>
  fetch({
    url: '/collectMsg/detail',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 系统操作日志管理
export const system_handleList = (obj) =>
  fetch({
    url: '/sysOperLog/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 系统操作日志详情
export const system_handleDetail = (obj) =>
  fetch({
    url: '/sysOperLog/detail',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 定时任务管理列表
export const timed_taskList = (obj) =>
  fetch({
    url: '/quartz/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 定时任务管理列表详情
export const timed_task_detail_list = (obj) =>
  fetch({
    url: '/quartz/detail/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 定时任务管理添加
export const timed_task_add = (obj) =>
  fetch({
    url: '/quartz/save',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 定时任务管理删除
export const timed_task_delete = (obj) =>
  fetch({
    url: '/quartz/delete',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 定时任务管理修改
export const timed_task_update = (obj) =>
  fetch({
    url: '/quartz/update',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 定时任务管理开启
export const timed_task_open = (obj) =>
  fetch({
    url: '/quartz/open',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 定时任务关闭
export const timed_task_close = (obj) =>
  fetch({
    url: '/quartz/close',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 定时任务执行
export const timed_task_run = (obj) =>
  fetch({
    url: '/quartz/run',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 系统登录/退出日志管理
export const login_quitList = (obj) =>
  fetch({
    url: '/loginLog/list',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 仲裁明细
export const arb_operateRecord = (obj) =>
  fetch({
    url: '/arb/operateRecord',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 图片转移
export const arb_uploadUrl = (obj) =>
  fetch({
    url: '/arb/uploadUrl ',
    method: 'POST',
    data: qs.stringify(obj)
  });
// 获取打款凭证
export const arb_getVoucherInfo = (obj) =>
  fetch({
    url: '/arb/getVoucherInfo',
    method: 'POST',
    data: qs.stringify(obj)
  })

/*
减免管理相关接口
*/

// 查询减免基础信息接口
export const relief_relieford_getreliefinfo = (obj) =>
  fetch({
    url: '/relief/relieford/getreliefinfo',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免申请提交接口
export const relief_relieford_applyrelief = (obj, options) =>
  fetch({
    url: '/relief/relieford/applyrelief',
    method: 'POST',
    data: obj,
    options
  })
// 减免管理申请数据的list接口
export const relief_relieford_reviewlist = (obj) =>
  fetch({
    url: '/relief/relieford/reviewlist',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免管理申请数据批量提交接口
export const relief_relieford_reviewrelief = (obj) =>
  fetch({
    url: '/relief/relieford/reviewrelief',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免管理申请数据批量驳回接口
export const relief_relieford_refuserelief = (obj) =>
  fetch({
    url: '/relief/relieford/refuserelief',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免管理反馈结果list接口
export const relief_relieford_resultlist = (obj) =>
  fetch({
    url: '/relief/relieford/resultlist',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免管理申请数据修改展示接口
export const relief_relieford_detailinfo = (obj) =>
  fetch({
    url: '/relief/relieford/detailinfo',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免管理申请数据修改接口
export const relief_relieford_updatereliefdetail = (obj) =>
  fetch({
    url: '/relief/relieford/updatereliefdetail',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免管理反馈结果查看凭证接口
export const relief_reliefFlow_getreliefflow = (obj) =>
  fetch({
    url: 'relief/reliefFlow/getreliefflow',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 减免查询进度接口
export const relief_relieford_result = (obj) =>
  fetch({
    url: '/relief/relieford/result',
    method: 'POST',
    data: qs.stringify(obj)
  })
// 申请仲裁反显接口
export const apply_arbitration_reverse = (obj) =>
  fetch({
    url: '/arb/getArbApplyImage',
    method: 'POST',
    data: qs.stringify(obj)
  })

// 判断二维码是否生成
export const offlineScanPay_apply = (obj) =>
  fetch({
    url: '/offlineScanPay/apply',
    method: 'POST',
    data: qs.stringify(obj)
  })
//  黑名单
export const black_list = (obj) =>
  fetch({
    url: '/rout/black/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

// 提交收款申请
export const offlineScanPay_generate = (obj, options) =>
  fetch({
    url: '/offlineScanPay/generate',
    method: 'POST',
    data: obj,
    options,
  })
// 生成二维码的接口
export const offlineScanPay_detail = (obj) =>
  fetch({
    url: '/offlineScanPay/detail',
    method: 'POST',
    data: qs.stringify(obj)
  })
//  故障率
export const hitch_list = (obj) =>
  fetch({
    url: '/rout/error/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

//  坐席信息维护查询
export const seats_config_list = (obj) =>
  fetch({
    url: '/call/channel/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

//  坐席信息维护添加
export const seats_config_add = (obj) =>
  fetch({
    url: '/call/channel/add',
    method: 'POST',
    data: qs.stringify(obj)
  })

//  坐席信息维护修改
export const seats_config_update = (obj) =>
  fetch({
    url: '/call/channel/update',
    method: 'POST',
    data: qs.stringify(obj)
  })


//  路由信息方案专线列表查新
export const rout_plan_project_list = (obj) =>
  fetch({
    url: '/rout/plan/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

//  路由信息方案专线列表添加
export const rout_plan_project_add = (obj) =>
  fetch({
    url: '/rout/plan/add',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   路由信息方案专线列表修改
export const rout_plan_project_update = (obj) =>
  fetch({
    url: 'rout/plan/update',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   路由信息方案专线列表修改
export const system_user_call_users = (obj) =>
  fetch({
    url: 'system/user/callusers',
    method: 'POST',
    data: qs.stringify(obj)
  })


//   路由信息方案专线列表
export const rout_plan_planList = (obj) =>
  fetch({
    url: 'rout/plan/planlist',
    method: 'POST',
    data: qs.stringify(obj)
  })



//   添加坐席池接口
export const rout_seatPool_add = (obj) =>
  fetch({
    url: '/rout/seatpool/add',
    method: 'POST',
    data: qs.stringify(obj)
  })

//  修改坐席池接口
export const rout_seatPool_updateStatus = (obj) =>
  fetch({
    url: '/rout/seatpool/updateStatus',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   删除坐席池接口
export const rout_seatPool_delete = (obj) =>
  fetch({
    url: '/rout/seatpool/delete',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   删除外显号码接口
export const rout_explicit_delete = (obj) =>
  fetch({
    url: '/rout/explicit/delete',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   添加外显号码接口
export const rout_explicit_add = (obj) =>
  fetch({
    url: '/rout/explicit/add',
    method: 'POST',
    data: qs.stringify(obj)
  })
//   外显号码列表
export const rout_explicit_list = (obj) =>
  fetch({
    url: '/rout/explicit/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   坐席池列表接口
export const rout_seatPool_list = (obj) =>
  fetch({
    url: '/rout/seatpool/list',
    method: 'POST',
    data: qs.stringify(obj)
  })


//   渠道类型列表
export const call_channel_list = (obj) =>
  fetch({
    url: '/call/channel/channelList',
    method: 'POST',
    data: qs.stringify(obj)
  })


//   选择坐席列表
export const rout_explicit_getExplicitList = (obj) =>
  fetch({
    url: '/rout/explicit/getExplicitList',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   选择号码列表
export const rout_seatpool_getCallNos = (obj) =>
  fetch({
    url: '/rout/seatpool/getCallNos',
    method: 'POST',
    data: qs.stringify(obj)
  })

// 失效二维码
export const offlineScanPay_invalid = (obj) =>
  fetch({
    url: '/offlineScanPay/invalid',
    method: 'POST',
    data: qs.stringify(obj)
  })

//   选择号码列表
export const call_channel_edit = (obj) =>
  fetch({
    url: '/call/channel/edit',
    method: 'POST',
    data: qs.stringify(obj)
  })


//   坐席监控列表
export const call_record_callDataList = (obj) =>
  fetch({
    url: '/call/record/callDataList',
    method: 'POST',
    data: qs.stringify(obj)
  })


//   渠道信息维护开启关闭接口
export const call_channel_updateStatus = (obj) =>
  fetch({
    url: '/call/channel/updateStatus',
    method: 'POST',
    data: qs.stringify(obj)
  })

/**
 * 1、渠道来源（查询）
 * 2、渠道来源（案件详情展示）
 */

export const case_detail_one_channel = (obj) =>
  fetch({
    url: '/case/detail/one_channel',
    method: 'POST',
    data: qs.stringify(obj)
  })

export const case_detail_channel_info = (obj) =>
  fetch({
    url: '/case/detail/channel_info',
    method: 'POST',
    data: qs.stringify(obj)
  })

/**
 * 呼叫轮次
 * 1、轮次list
 * 2、配置
 * 3、展示
 * 4、轮次记录list
 * 5、轮次记录导出
 */

export const callRoundsConfig_list = (obj) =>
  fetch({
    url: '/callRoundsConfig/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

export const callRoundsConfig_update = (obj, options) =>
  fetch({
    url: '/callRoundsConfig/update',
    method: 'POST',
    data: obj,
    options
  })
export const callRoundsConfig_display = (obj) =>
  fetch({
    url: '/callRoundsConfig/display',
    method: 'POST',
    data: qs.stringify(obj),
  })

export const collectRoundsRecords_list = (obj) =>
  fetch({
    url: '/collectRoundsRecords/list',
    method: 'POST',
    data: qs.stringify(obj),
  })

export const collectRoundsRecords_export = (obj, options) =>
  fetch({
    url: '/collectRoundsRecords/export',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
/**
 * 案件详情相关的轮次接口
 * 1、当前案件轮次信息
 * 2、结束当前轮次
 * 3、统计当前通话状态
 */

export const rounds_info = (obj) =>
  fetch({
    url: '/rounds/info',
    method: 'POST',
    data: qs.stringify(obj),
  })

export const rounds_over = (obj) =>
  fetch({
    url: '/rounds/over',
    method: 'POST',
    data: qs.stringify(obj),
  })

export const rounds_record = (obj) =>
  fetch({
    url: '/rounds/record',
    method: 'POST',
    data: qs.stringify(obj),
  })
