import fetch from '@/libs/fetch';
import qs from 'qs';
/**
 * 登录
 */
export const login = (obj = {}) =>
	fetch({
		url: '/login',
		method: 'POST',
		data: qs.stringify(obj)
	});

/**
 * 退出
 */
export const logout = (obj = {}) =>
	fetch({
		url: '/logout',
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
		responseType: 'blob'
	});

// 日常监控的坐席报表
export const monitor_agentState_list = (obj) =>
	fetch({
		url: '/monitor/agentState/list',
		method: 'POST',
		data: qs.stringify(obj)
	});
// 日常监控的坐席报表导出
export const monitor_agentState_exportDown = (obj) =>
	fetch({
		url: '/monitor/agentState/exportDown',
		method: 'POST',
		data: qs.stringify(obj),
		responseType: 'blob'
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
export const monitor_overDueReports_exportDown = (obj) =>
	fetch({
		url: '/monitor/overDueReports/exportDown',
		method: 'POST',
		data: qs.stringify(obj),
		responseType: 'blob'
	});

// 呼叫明细列表接口查询
export const monitor_callDetail_list = (obj) =>
	fetch({
		url: '/monitor/callDetail/list',
		method: 'POST',
		data: qs.stringify(obj)
	});
// 呼叫明细导出
export const monitor_callDetail_exportDown = (obj) =>
	fetch({
		url: '/monitor/callDetail/exportDown',
		method: 'POST',
		data: qs.stringify(obj),
		responseType: 'blob'
	});

// 催收回收率列表导出
export const monitor_collectRate_exportDown = (obj) =>
	fetch({
		url: '/monitor/collectRate/exportDown',
		method: 'POST',
		data: qs.stringify(obj),
		responseType: 'blob'
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
export const case_collect_case_list = (obj, options) =>
	fetch({
		url: '/case/collect/case_list',
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
// 案件导出
export const cases_export = (obj) =>
	fetch({
		url: '/cases/export',
		method: 'POST',
		data: qs.stringify(obj),
		responseType: 'blob'
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
		data: qs.stringify(obj)
	});
// 案件批量回收接口
export const cases_batch_recycle = (obj) =>
	fetch({
		url: '/cases/batch/recycle',
		method: 'POST',
		data: qs.stringify(obj)
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
export const divide_allot_manual = (obj) =>
	fetch({
		url: '/divide/allot/manual',
		method: 'POST',
		data: qs.stringify(obj)
	});

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
    options,
    responseType: 'blob'
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
		options,
		responseType: 'blob'
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
沟通状态
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
		url: '/getLeafTypeList',
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
    客天登录
* */
export const call_kt_get_seat = (obj, options) =>
	fetch({
		url: '/call/kt/get_seat',
		method: 'POST',
		data: qs.stringify(obj),
		options
	});

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
容联
* */
export const call_moor_hung_on = (obj, options) =>
	fetch({
		url: '/call/moor/hung_on',
		method: 'POST',
		data: qs.stringify(obj),
		options
	});

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

// 定时任务日志管理
export const timed_taskList = (obj) =>
	fetch({
		url: '/quartz/list',
		method: 'POST',
		data: qs.stringify(obj)
	});

// 定时任务日志详情
export const timed_taskDetail = (obj) =>
	fetch({
		url: '/quartz/detail',
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

// 图片展示
export const img_mark = (obj) =>
	fetch({
		url: '/img/mark/' + obj.path,
		method: 'GET'
	});
