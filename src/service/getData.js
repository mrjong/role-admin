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
    data: qs.stringify(obj)
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
    data: qs.stringify(obj)
  });

// 催收回收率列表导出
export const monitor_collectRate_exportDown = (obj) =>
  fetch({
    url: '/monitor/collectRate/exportDown',
    method: 'POST',
    data: qs.stringify(obj)
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

<<<<<<< HEAD
    /*
* 新增系统用户
=======
/*
* 新增系统用户
>>>>>>> 174313f413a83420c592bbf783024338ce2de70e
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
<<<<<<< HEAD
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
