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
    data: qs.stringify(obj)
  });

/**
 * 任务详情
 */
export const wkProcessTask_detail = (obj = {}) =>
  fetch({
    url: `/wkProcessTask/detail/${obj.id}`,
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
 * 菜单权限
 */
export const findTreeByCurrentUser = (obj = {}) =>
  fetch({
    url: '/findTreeByCurrentUser',
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

<<<<<<< HEAD
export const repay_repayDetail_list = (obj, options) =>
	fetch({
		url: '/repay/repayDetail/list',
		method: 'POST',
		data: qs.stringify(obj),
	});

// 回款明细导出接口
export const repay_repayDetail_exportDown = (obj, options) =>
	fetch({
		url: '/repay/repayDetail/exportDown',
		method: 'POST',
		data: qs.stringify(obj),
    responseType: 'blob',
	});
=======
export const repay_repayDetail_list = (obj) =>
  fetch({
    url: '/repay/repayDetail/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 回款明细导出接口
export const repay_repayDetail_exportDown = (obj) =>
  fetch({
    url: '/repay/repayDetail/exportDown',
    method: 'POST',
    data: qs.stringify(obj)
  });
>>>>>>> 70ce56a928c7a03fccdad8b61b825dce4b22e4fa

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
    responseType: 'blob',
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
    responseType: 'blob',
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
    responseType: 'blob',
	});

// 催收回收率列表导出
export const monitor_collectRate_exportDown = (obj) =>
	fetch({
		url: '/monitor/collectRate/exportDown',
		method: 'POST',
		data: qs.stringify(obj),
    responseType: 'blob',
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
    url: '/deduct/list',
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

// 查询菜单分配的接口
export const system_role_menu_list = (obj) =>
  fetch({
    url: '/system/role/menu/list',
    method: 'POST',
    data: qs.stringify(obj)
  })

// 菜单分配的接口
export const stytem_menu_opration = (obj) =>
  fetch({
    url: '/system/menu/opration',
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
添加工作流
* */
export const wkProcessDef_add = (obj, options) =>
  fetch({
    url: '/wkProcessDef/add',
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

  