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
 * 工作流列表
 */
export const wkProcessDef_list = (obj = {}) =>
	fetch({
		url: '/wkProcessDef/list',
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
