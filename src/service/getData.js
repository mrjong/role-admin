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
 * 菜单权限
 */
export const system_menu_findTree = (obj = {}) =>
  fetch({
    url: "/system/menu/findTree",
    method: "POST",
    data: qs.stringify(obj)
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
 * 根据父级id获取相应字典数据
 * */
export const sysDictionary_getListByParentId = (obj, options) =>
  fetch({
    url: "/sysDictionary/getListByParentId",
    method: "POST",
    data: qs.stringify(obj),
    options
  });

/*
 * 系统用户查看用户列表接口
 * */
export const system_user_list = obj => {
  const { pageSize, pageNum, ...other } = obj;

  return fetch({
    url: `/system/user/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "POST",
    data: other
  });
};

/*
 * 系统用户查看用户详情
 * */
export const system_user_detail = id =>
  fetch({
    url: `/system/user/queryDetail?userId=${id}`,
    method: "POST"
  });

/*
 * 新增系统用户
 * */
export const system_user_add = obj =>
  fetch({
    url: "/system/user/add",
    method: "POST",
    data: obj
  });

/*
 * 查看所有用户角色
 * */
export const system_user_roles = (obj, options) =>
  fetch({
    url: "/system/user/roles",
    method: "POST",
    data: qs.stringify(obj)
  });

/*
 *
 * 修改系统用户
 * */
export const system_user_update = obj =>
  fetch({
    url: "/system/user/update",
    method: "POST",
    data: obj
  });

// 系统管理系统角色相关接口
export const system_role_list = obj => {
  const { pageNum, pageSize, ...other } = obj;
  return fetch({
    url: `/system/role/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "POST",
    data: other
  });
};

// 角色管理添加接口
export const system_role_add = obj =>
  fetch({
    url: "/system/role/add",
    method: "POST",
    data: obj
  });

// 角色查看详情
export const system_role_detail = id =>
  fetch({
    url: `/system/role/queryDetail?id=${id}`,
    method: "POST"
  });

// 角色更新接口
export const system_role_update = obj =>
  fetch({
    url: "/system/role/update",
    method: "POST",
    data: obj
  });

// 查询菜单分配的接口
export const system_role_menu_list = id =>
  fetch({
    url: `/system/role/queryPermissionTree?id=${id}`,
    method: "POST"
  });

// 菜单分配的接口
export const stytem_role_menu_opration = obj =>
  fetch({
    url: "/system/role/updatePermisson",
    method: "POST",
    data: obj
  });

/*
*
系统用户密码重置接口
* */
export const system_user_reset = obj =>
  fetch({
    url: "/system/user/resetPwd",
    method: "POST",
    data: obj
  });

// 菜单管理的相关接口
export const stytem_menu_list = obj =>
  fetch({
    url: "/system/menu/list",
    method: "POST",
    data: qs.stringify(obj)
  });

// 修改菜单项接口
export const system_menu_update = obj =>
  fetch({
    url: "/system/menu/update",
    method: "POST",
    data: obj
  });

// 新增菜单项接口
export const system_menu_add = obj =>
  fetch({
    url: "/system/menu/add",
    method: "POST",
    data: obj
  });

// 删除菜单接口
export const system_menu_delete = id =>
  fetch({
    url: `/system/menu/delete?menuId=${id}`,
    method: "POST"
  });

// 菜单详情接口
export const system_menu_detail = id =>
  fetch({
    url: `/system/menu/queryDetail?menuId=${id}`,
    method: "POST"
  });

// 案件查询导出
export const query_export = (obj, options) =>
  fetch({
    url: "/cases/query/export",
    method: "POST",
    data: qs.stringify(obj),
    responseType: "blob",
    options
  });
// 案件分配导出
export const allot_export = (obj, options) =>
  fetch({
    url: "/cases/allot/export",
    method: "POST",
    data: qs.stringify(obj),
    responseType: "blob",
    options
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

// 划扣导出
export const repayinfo_exportlist = (obj, options) =>
  fetch({
    url: "/repayinfo/exportlist",
    method: "POST",
    data: qs.stringify(obj),
    responseType: "blob",
    options
  });
