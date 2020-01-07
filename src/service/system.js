import fetch from "@/libs/fetch";
import qs from "qs";

/**
 * 菜单权限
 */
export const system_menu_findTree = (obj = {}) =>
  fetch({
    url: "/system/menu/findTree",
    method: "POST",
    data: qs.stringify(obj)
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

/**
 * 查询渠道
 */
export const system_user_channels = () => {
  return fetch({
    url: `/system/user/queryChannels`,
    method: "POST"
  });
};

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
export const system_role_menu_opration = obj =>
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
