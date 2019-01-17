import fetch from '../libs/fetch';
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
 * 工作流保存
 */
export const findTreeByCurrentUser = (obj = {}) =>
fetch({
    url: '/findTreeByCurrentUser',
    method: 'POST',
    data: qs.stringify(obj)
});
