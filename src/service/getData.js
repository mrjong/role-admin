import fetch from '../libs/fetch';
/**
 * 登录
 */
export const login = (obj = {}) => fetch({
    url: "/login",
    method: "post",
    data: obj
});

/**
 * 退出
 */
export const logout = (obj = {}) => fetch({
    url: "/logout",
    method: "get",
    data: obj
});

/**
 * 用户管理-list
 */
export const user_list = (obj = {}) => fetch({
    url: "/user/list",
    method: "get",
    data: obj
});

/**
 * 用户管理-重置用户密码
 */
export const user_resetpassword = (obj = {}) => fetch({
    url: "/user/resetpassword",
    method: "post",
    data: obj
});

/**
 * 管理员管理-获取list
 */
export const adminuser_list = (obj = {}) => fetch({
    url: "/adminuser/list",
    method: "get",
    data: obj
});

/**
 * 管理员管理-添加
 */
export const adminuser_add = (obj = {}) => fetch({
    url: "/adminuser/add",
    method: "post",
    data: obj
});

/**
 * 管理员管理-编辑
 */
export const adminuser_edit = (obj = {}) => fetch({
    url: "/adminuser/edit",
    method: "post",
    data: obj
});

/**
 * 管理员管理-修改密码
 */
export const adminuser_resetpassword = (obj = {}) => fetch({
    url: "/adminuser/resetpassword",
    method: "post",
    data: obj
});

/**
 * 商品管理-获取list
 */
export const goods_list = (obj = {}) => fetch({
    url: "/goods/list",
    method: "get",
    data: obj
});

/**
 * 商品管理-添加
 */
export const goods_add = (obj = {}) => fetch({
    url: "/goods/add",
    method: "post",
    data: obj
});

/**
 * 商品管理-编辑
 */
export const goods_edit = (obj = {}) => fetch({
    url: "/goods/edit",
    method: "post",
    data: obj
});

/**
 * 商品管理-删除
 */
export const goods_del = (obj = {}) => fetch({
    url: "/goods/del",
    method: "post",
    data: obj
});


/**
 * 卡券管理-获取list
 */
export const coupon_list = (obj = {}) => fetch({
    url: "/coupon/list",
    method: "get",
    data: obj
});

/**
 * 卡券管理-添加
 */
export const coupon_add = (obj = {}) => fetch({
    url: "/coupon/add",
    method: "post",
    data: obj
});

/**
 * 卡券管理-编辑
 */
export const coupon_edit = (obj = {}) => fetch({
    url: "/coupon/edit",
    method: "post",
    data: obj
});

/**
 * 卡券管理-删除
 */
export const coupon_del = (obj = {}) => fetch({
    url: "/coupon/del",
    method: "post",
    data: obj
});

/**
 * 文案管理-获取list
 */
export const copywriter_list = (obj = {}) => fetch({
    url: "/copywriter/list",
    method: "get",
    data: obj
});

/**
 * 文案管理-添加
 */
export const copywriter_add = (obj = {}) => fetch({
    url: "/copywriter/add",
    method: "post",
    data: obj
});

/**
 * 文案管理-编辑
 */
export const copywriter_edit = (obj = {}) => fetch({
    url: "/copywriter/edit",
    method: "post",
    data: obj
});

/**
 * 文案管理-删除
 */
export const copywriter_del = (obj = {}) => fetch({
    url: "/copywriter/del",
    method: "post",
    data: obj
});

/**
 * 公告管理-获取list
 */
export const log_list = (obj = {}) => fetch({
    url: "/log/list",
    method: "get",
    data: obj
});

/**
 * 公告管理-获取list
 */
export const notice_list = (obj = {}) => fetch({
    url: "/notice/list",
    method: "get",
    data: obj
});

/**
 * 公告管理-添加
 */
export const notice_add = (obj = {}) => fetch({
    url: "/notice/add",
    method: "post",
    data: obj
});

/**
 * 公告管理-编辑
 */
export const notice_edit = (obj = {}) => fetch({
    url: "/notice/edit",
    method: "post",
    data: obj
});

/**
 * 公告管理-删除
 */
export const notice_del = (obj = {}) => fetch({
    url: "/notice/del",
    method: "post",
    data: obj
});
/**
 * 文章管理-获取list
 */
export const article_list = (obj = {}) => fetch({
    url: "/article/list",
    method: "get",
    data: obj
});

/**
 * 文章管理-添加
 */
export const article_add = (obj = {}) => fetch({
    url: "/article/add",
    method: "post",
    data: obj
});

/**
 * 文章管理-编辑
 */
export const article_edit = (obj = {}) => fetch({
    url: "/article/edit",
    method: "post",
    data: obj
});

/**
 * 文章管理-删除
 */
export const article_del = (obj = {}) => fetch({
    url: "/article/del",
    method: "post",
    data: obj
});
/**
 * 获取答题奖励
 */
export const answer_award = (obj = {}) => fetch({
    url: "/answer/award",
    method: "get",
    data: obj
});

/**
 * 获取活动奖励
 */
export const activity_award = (obj = {}) => fetch({
    url: "/activity/award",
    method: "get",
    data: obj
});
/**
 * 设置活动奖励以及答对百分比
 */
export const activity_editAward = (obj = {}) => fetch({
    url: "/activity/editAward",
    method: "post",
    data: obj
});

/**
 * 添加活动奖励以及答对百分比
 */
export const activity_addAward = (obj = {}) => fetch({
    url: "/activity/addAward",
    method: "post",
    data: obj
});

/**
 * 删除活动奖励以及答对百分比
 */
export const activity_delAward = (obj = {}) => fetch({
    url: "/activity/delAward",
    method: "post",
    data: obj
});

/**
 * 设置答题奖励以及答对百分比
 */
export const answer_editAward = (obj = {}) => fetch({
    url: "/answer/editAward",
    method: "post",
    data: obj
});

/**
 * 添加答题奖励以及答对百分比
 */
export const answer_addAward = (obj = {}) => fetch({
    url: "/answer/addAward",
    method: "post",
    data: obj
});

/**
 * 删除答题奖励以及答对百分比
 */
export const answer_delAward = (obj = {}) => fetch({
    url: "/answer/delAward",
    method: "post",
    data: obj
});


/**
 * 用户答题记录
 */
export const answer_loglist = (obj = {}) => fetch({
    url: "/answer/logList",
    method: "get",
    data: obj
});

/**
 * 用户活动记录
 */
export const activity_loglist = (obj = {}) => fetch({
    url: "/activity/logList",
    method: "get",
    data: obj
});


/**
 * 设置答题答案
 */
export const answer_result = (obj = {}) => fetch({
    url: "/answer/result",
    method: "post",
    data: obj
});

/**
 * 设置答题状态
 */
export const answer_status = (obj = {}) => fetch({
    url: "/answer/status",
    method: "post",
    data: obj
});

/**
 * 答题管理-获取list
 */
export const answer_list = (obj = {}) => fetch({
    url: "/answer/list",
    method: "get",
    data: obj
});

/**
 * 答题管理-添加
 */
export const answer_add = (obj = {}) => fetch({
    url: "/answer/add",
    method: "post",
    data: obj
});

/**
 * 答题管理-编辑
 */
export const answer_edit = (obj = {}) => fetch({
    url: "/answer/edit",
    method: "post",
    data: obj
});

/**
 * 答题管理-删除
 */
export const answer_del = (obj = {}) => fetch({
    url: "/answer/del",
    method: "post",
    data: obj
});

/**
 * 设置活动状态
 */
export const activity_status = (obj = {}) => fetch({
    url: "/activity/status",
    method: "post",
    data: obj
});
/**
 * 活动管理-获取list
 */
export const activity_list = (obj = {}) => fetch({
    url: "/activity/list",
    method: "get",
    data: obj
});

/**
 * 活动管理-添加
 */
export const activity_add = (obj = {}) => fetch({
    url: "/activity/add",
    method: "post",
    data: obj
});

/**
 * 活动管理-编辑
 */
export const activity_edit = (obj = {}) => fetch({
    url: "/activity/edit",
    method: "post",
    data: obj
});

/**
 * 活动管理-删除
 */
export const activity_del = (obj = {}) => fetch({
    url: "/activity/del",
    method: "post",
    data: obj
});

/**
 * 预约菜单管理-获取list
 */
export const carte_list = (obj = {}) => fetch({
    url: "/carte/list",
    method: "get",
    data: obj
});

/**
 * 预约菜单管理-添加
 */
export const carte_add = (obj = {}) => fetch({
    url: "/carte/add",
    method: "post",
    data: obj
});

/**
 * 预约菜单管理-编辑
 */
export const carte_edit = (obj = {}) => fetch({
    url: "/carte/edit",
    method: "post",
    data: obj
});

/**
 * 预约菜单管理-删除
 */
export const carte_del = (obj = {}) => fetch({
    url: "/carte/del",
    method: "post",
    data: obj
});

/**
 * 轮播图管理-获取list
 */
export const wheel_list = (obj = {}) => fetch({
    url: "/wheel/list",
    method: "get",
    data: obj
});

/**
 * 轮播图管理-添加
 */
export const wheel_add = (obj = {}) => fetch({
    url: "/wheel/add",
    method: "post",
    data: obj
});

/**
 * 轮播图管理-编辑
 */
export const wheel_edit = (obj = {}) => fetch({
    url: "/wheel/edit",
    method: "post",
    data: obj
});

/**
 * 轮播图管理-删除
 */
export const wheel_del = (obj = {}) => fetch({
    url: "/wheel/del",
    method: "post",
    data: obj
});

/**
 * 餐柜管理-获取list
 */
export const buffet_list = (obj = {}) => fetch({
    url: "/buffet/list",
    method: "get",
    data: obj
});

/**
 * 设置餐柜首页
 */
export const buffet_setAd = (obj = {}) => fetch({
    url: "/buffet/setAd",
    method: "post",
    data: obj
});

/**
 * 餐柜管理-添加
 */
export const buffet_add = (obj = {}) => fetch({
    url: "/buffet/add",
    method: "post",
    data: obj
});

/**
 * 餐柜管理-编辑
 */
export const buffet_edit = (obj = {}) => fetch({
    url: "/buffet/edit",
    method: "post",
    data: obj
});

/**
 * 餐柜管理-删除
 */
export const buffet_del = (obj = {}) => fetch({
    url: "/buffet/del",
    method: "post",
    data: obj
});

/**
 * 红包管理-获取list
 */
export const bonus_list = (obj = {}) => fetch({
    url: "/bonus/list",
    method: "get",
    data: obj
});

/**
 * 红包管理-添加
 */
export const bonus_add = (obj = {}) => fetch({
    url: "/bonus/add",
    method: "post",
    data: obj
});

/**
 * 红包管理-编辑
 */
export const bonus_edit = (obj = {}) => fetch({
    url: "/bonus/edit",
    method: "post",
    data: obj
});

/**
 * 红包管理-删除
 */
export const bonus_del = (obj = {}) => fetch({
    url: "/bonus/del",
    method: "post",
    data: obj
});

/**
 * 积分管理-获取list
 */
export const points_list = (obj = {}) => fetch({
    url: "/points/list",
    method: "get",
    data: obj
});

/**
 * 积分管理-获取list设置红包兑换
 */
export const points_listset = (obj = {}) => fetch({
    url: "/points/listSet",
    method: "get",
    data: obj
});

/**
 * 积分管理-添加
 */
export const points_add = (obj = {}) => fetch({
    url: "/points/add",
    method: "post",
    data: obj
});

/**
 * 积分管理-编辑
 */
export const points_edit = (obj = {}) => fetch({
    url: "/points/edit",
    method: "post",
    data: obj
});

/**
 * 积分管理-删除
 */
export const points_del = (obj = {}) => fetch({
    url: "/points/del",
    method: "post",
    data: obj
});

/**
 * 评价管理-获取list
 */
export const evaluate_list = (obj = {}) => fetch({
    url: "/evaluate/list",
    method: "get",
    data: obj
});

/**
 * 评价管理-add
 */
export const evaluate_add = (obj = {}) => fetch({
    url: "/evaluate/add",
    method: "post",
    data: obj
});

/**
 * 评价管理-审核
 */
export const evaluate_check = (obj = {}) => fetch({
    url: "/evaluate/check",
    method: "post",
    data: obj
});

/**
 * 评价管理-编辑
 */
export const evaluate_edit = (obj = {}) => fetch({
    url: "/evaluate/edit",
    method: "post",
    data: obj
});

/**
 * 评价管理-删除
 */
export const evaluate_del = (obj = {}) => fetch({
    url: "/evaluate/del",
    method: "post",
    data: obj
});
/**
 * 图片上传
 */
export const upload_img = (obj = {}) => fetch({
    url: "/upload/img",
    method: "post",
    data: obj
});

/**
 * 删除餐柜网格
 */
export const buffet_delGrid = (obj = {}) => fetch({
    url: "/buffet/delGrid",
    method: "post",
    data: obj
});

/**
 * 编辑餐柜网格
 */
export const buffet_editGrid = (obj = {}) => fetch({
    url: "/buffet/editGrid",
    method: "post",
    data: obj
});

/**
 * 新增餐柜网格
 */
export const buffet_addGrid = (obj = {}) => fetch({
    url: "/buffet/addGrid",
    method: "post",
    data: obj
});

/**
 * 获取餐柜预约时间段
 */
export const buffet_getPresetTime = (obj = {}) => fetch({
    url: "/buffet/getPresetTime?buffet_id=" + obj.buffet_id,
    method: "get",
    data: obj
});

/**
 * 添加餐柜预约时间段
 */
export const buffet_addPresetTime = (obj = {}) => fetch({
    url: "/buffet/addPresetTime",
    method: "post",
    data: obj
});

/**
 * 删除餐柜预约时间段
 */
export const buffet_delPresetTime = (obj = {}) => fetch({
    url: "/buffet/delPresetTime",
    method: "post",
    data: obj
});

/**
 * 邀请管理-删除
 */
export const invitation_del = (obj = {}) => fetch({
    url: "/invitation/del",
    method: "post",
    data: obj
});

/**
 * 邀请管理-获取list
 */
export const invitation_list = (obj = {}) => fetch({
    url: "/invitation/list",
    method: "get",
    data: obj
});

/**
 * 获取系统设置数据
 */
export const setting_list = (obj = {}) => fetch({
    url: "/setting/list",
    method: "get",
    data: obj
});

/**
 * 更新设置数据
 */
export const setting_upset = (obj = {}) => fetch({
    url: "/setting/upset",
    method: "POST",
    data: obj
});

/**
 * 获取二维码
 */
export const get_code = (obj = {}) => fetch({
    url: "/QrCode",
    method: "get",
    data: obj
});

/**
 * 充值设置管理-获取list
 */
export const rechargeSet_list = (obj = {}) => fetch({
    url: "/rechargeSet/list",
    method: "get",
    data: obj
});

/**
 * 充值设置管理-添加
 */
export const rechargeSet_add = (obj = {}) => fetch({
    url: "/rechargeSet/add",
    method: "post",
    data: obj
});

/**
 * 充值设置管理-编辑
 */
export const rechargeSet_edit = (obj = {}) => fetch({
    url: "/rechargeSet/edit",
    method: "post",
    data: obj
});

/**
 * 充值设置管理-删除
 */
export const rechargeSet_del = (obj = {}) => fetch({
    url: "/rechargeSet/del",
    method: "post",
    data: obj
});

/**
 * 充值设置管理-获取list
 */
export const recharge_list = (obj = {}) => fetch({
    url: "/recharge/list",
    method: "get",
    data: obj
});

/**
 * 柜前购买-获取list
 */
export const onlinecarte_list = (obj = {}) => fetch({
    url: "/onlinecarte/list",
    method: "get",
    data: obj
});

/**
 * 柜前购买-添加
 */
export const onlinecarte_add = (obj = {}) => fetch({
    url: "/onlinecarte/add",
    method: "post",
    data: obj
});

/**
 * 柜前购买-删除
 */
export const onlinecarte_del = (obj = {}) => fetch({
    url: "/onlinecarte/del",
    method: "post",
    data: obj
});

/**
 * 预约订单
 */
export const carteorder_list = (obj = {}) => fetch({
    url: "/carteorder/list",
    method: "get",
    data: obj
});

/**
 * 充值订单、柜前购买订单
 */
export const order_list = (obj = {}) => fetch({
    url: "/order/list",
    method: "get",
    data: obj
});

/**
 * 订单统计
 */
export const statistics_order_list = (obj = {}) => fetch({
    url: "/statistics/order/list",
    method: "get",
    data: obj
});

/**
 * 用户增长排行
 */
export const statistics_userIncrease = (obj = {}) => fetch({
    url: "/statistics/userIncrease",
    method: "get",
    data: obj
});

/**
 * 菜品销售统计
 */
export const statistics_goods = (obj = {}) => fetch({
    url: "/statistics/goods",
    method: "get",
    data: obj
});

/**
 * 销售统计
 */
export const statistics_salesInfo = (obj = {}) => fetch({
    url: "/statistics/salesInfo",
    method: "get",
    data: obj
});

/**
 * 使用情况
 */
export const buffet_info = (obj = {}) => fetch({
    url: "/buffet/info",
    method: "get",
    data: obj
});
/**
 * 设置用户角色
 */
export const user_setRole = (obj = {}) => fetch({
    url: "/user/setRole",
    method: "post",
    data: obj
});

/**
 * 导出订单数据
 */
export const order_export = (obj = {}) => fetch({
    url: "/order/export",
    method: "get",
    data: obj
});

/**
 * 导出用户数据
 */
export const user_export = (obj = {}) => fetch({
    url: "/order/export",
    method: "get",
    data: obj
});

/**
 * 配送记录
 */
export const Distribution_record = (type,obj = {}) => fetch({
    url: "/Distribution/record/"+type,
    method: "get",
    data: obj
});

/*
* 菜品作废
*/
export const buffet_Obsolete = (obj = {}) => fetch({
    url: "/buffet/Obsolete/",
    method: "post",
    data: obj
});
/*
* 菜品作废
*/
export const adminuser_getSystemNoticeUser = (obj = {}) => fetch({
    url: "/adminuser/getSystemNoticeUser/",
    method: "get",
    data: obj
});
/*
* 添加系统通知用户
*/
export const QrCode_admin = (obj = {}) => fetch({
    url: "/QrCode/admin/",
    method: "get",
    data: obj
});
/*
* 获取奖励列表
*/
export const userSign_list = (obj = {}) => fetch({
    url: "/userSign/list",
    method: "get",
    data: obj
});
/*
* 签到设置详情
*/
export const userSign_setInfo = (obj = {}) => fetch({
    url: "/userSign/setInfo",
    method: "get",
    data: obj
});
/*
* 编辑签到设置
*/
export const userSign_editSet = (obj = {}) => fetch({
    url: "/userSign/editSet",
    method: "post",
    data: obj
});
/*
* 预约菜单批量添加添加
*/
export const carte_batchadd = (obj = {}) => fetch({
    url: "/carte/bathadd",
    method: "post",
    data: obj
});

/*
* 打开餐柜网格
*/
export const buffet_openGrid = (obj = {}) => fetch({
    url: "/buffet/openGrid",
    method: "post",
    data: obj
});

