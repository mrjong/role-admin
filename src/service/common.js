import fetch from "@/libs/fetch";
import qs from "qs";

/**
 * 登录
 */
export const login = (obj = {}) =>
  fetch({
    url: "/login",
    method: "POST",
    data: obj
  });

/*
*
获取图片验证码
* */
export const login_code = (obj, options) =>
  fetch({
    url: "/getCaptchaCode",
    method: "POST",
    data: qs.stringify(obj),
    options
  });

/**
 * 退出
 */
export const logout = () =>
  fetch({
    url: "/system/logout",
    method: "POST"
  });

/**
 * 重置密码
 */
export const reset_passWord = (obj = {}) =>
  fetch({
    url: "/editPwd",
    method: "POST",
    data: obj
  });

/**
 * 路由菜单列表
 */
export const navigation_loadTree = (obj = {}) =>
  fetch({
    url: "/navigation/loadTree",
    method: "GET",
    data: qs.stringify(obj)
  });

/*
*
*
数据字典查询
* */
export const sysDictionary_list = (obj, options) =>
  fetch({
    url: "/sysDictionary/list",
    method: "POST",
    data: qs.stringify(obj),
    options
  });

// 数据字典添加
export const sysDictionary_save = obj =>
  fetch({
    url: "/sysDictionary/save",
    method: "POST",
    data: qs.stringify(obj)
  });
// 数据字典删除
export const sysDictionary_delete = obj =>
  fetch({
    url: "/sysDictionary/delete",
    method: "POST",
    data: qs.stringify(obj)
  });
// 数据字典删除
export const sysDictionary_update = obj =>
  fetch({
    url: "/sysDictionary/update",
    method: "POST",
    data: qs.stringify(obj)
  });

/*
 *
 * 根据父级id获取相应字典数据
 * */
export const sysDictionary_getListByParentId = (obj, options) =>
  fetch({
    url: "/sysDictionary/getListByParentId",
    method: "POST",
    data: qs.stringify(obj),
    options
  });
