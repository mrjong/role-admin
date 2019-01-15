/**
 * @param {*} str
 * 是否已审核：1-否 2-是
 */
export function isCheck(str = '') {
	switch (str) {
		case 1:
			return '待发布';
		case 2:
			return '已发布';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 操作类型 1-积分兑换/消费积分【其实就是减少积分】  2-消费获取积分【其实就是增加积分】
 */
export function process_type(str = '') {
	switch (str) {
		case 1:
			return '积分兑换/消费积分';
		case 2:
			return '消费获取积分';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 菜单类型
 */
export function carte_type(str = '') {
	switch (str) {
		case 1:
			return '预约购买';
		case 2:
			return '柜前购买';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 1-次卡 2-月卡
 */
export function coupon_category(str = '') {
	switch (str) {
		case 1:
			return '次卡';
		case 2:
			return '月卡';
		default:
			return ' ';
	}
}

/**
 * @param {*} str
 * 卡券是否开启分享：0-否 1-是 （微信群分享抢购）
 */
export function is_share(str = '') {
	switch (str) {
		case 0:
			return '否';
		case 1:
			return '是';
		default:
			return ' ';
	}
}

/**
 * @param {*} str
 * 0-普通用户  1-配送员
 */
export function role(str = '') {
	switch (str) {
		case 0:
			return '普通用户';
		case 1:
			return '配送员';
		default:
			return ' ';
	}
}

/**
 * 性别
 * @param {*} str
 * 性别 1-男  2-女 0-保密
 */
export function gender(str = '') {
	switch (str) {
		case 1:
			return '男';
		case 2:
			return '女';
		case 0:
			return '保密';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 口碑：1-好评 2-一般 3-差评
 */
export function praise(str = '') {
	switch (str) {
		case 3:
			return '好评';
		case 2:
			return '一般';
		case 1:
			return '差评';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 *  1-关于我们 2-充值使用说明 3-客服中心
 */
export function copywriter_type(str = '') {
	switch (str) {
		case 3:
			return '客服中心';
		case 2:
			return '充值使用说明';
		case 1:
			return '关于我们';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 网格使用
 */
export function is_lock(str = 0) {
	switch (str) {
		case 1:
			return '使用中';
		case 0:
			return '未使用';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 类型：1-餐柜 2-菜品
 */
export function category(str = '') {
	switch (str) {
		case 1:
			return '餐柜';
		case 2:
			return '菜品';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 奖品类型 1-红包 2-卡券 3-积分 4-其他
 */
export function activity_award_category(str = '') {
	switch (str) {
		case 1:
			return '红包';
		case 2:
            return '卡券';
            case 3:
			return '积分';
		case 4:
			return '其他';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 1-餐柜管理 2-商品管理 3-预约菜单
 */
export function log_category(str = '') {
	switch (str) {
		case 1:
			return '餐柜管理';
		case 2:
			return '商品管理';
		case 3:
			return '预约菜单';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 动作类型：1-添加 2-编辑 3-删除
 */
export function action_type(str = '') {
	switch (str) {
		case 1:
			return '添加';
		case 2:
			return '编辑';
		case 3:
			return '删除';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 活动管理   开启状态 0-否 1-是
 */
export function status(str = '') {
	switch (str) {
		case 0:
			return '关闭';
		case 1:
			return '开启';
		default:
			return ' ';
	}
}
/**
 * @param {*} str
 * 类型0-未补餐  1-已补餐
 */
export function is_push(str = '') {
	switch (str) {
		case 1:
			return '已补餐';
		case 0:
			return '未补餐';
		default:
			return ' ';
	}
}
/**
 * 红包类型
 * @param {*} str
 * 红包类型 1-新人红包 2-活动红包 3-积分红包 4-个人红包
 */
export function bonusType(str = '') {
	switch (str) {
		case 1:
			return '新人红包';
		case 2:
			return '活动红包';
		case 3:
			return '积分红包';
		case 4:
			return '个人红包';
		case 5:
			return '邀请红包';
		default:
			return ' ';
	}
}
/**
 * 红包类型
 * @param {*} str
 * 1 掉线 2 在线
 */
export function state(str = '') {
	switch (str) {
		case 1:
			return '掉线';
		case 0:
			return '在线';
		default:
			return ' ';
	}
}

/**
 * 红包类型
 * @param {*} str
 * 1-柜前点餐  2-余额充值 3-充值
 */
export function order_type(str = '') {
	switch (str) {
		case 1:
			return '预约点餐';
		case 2:
			return '柜前点餐';
		case 3:
			return '充值';
		default:
			return ' ';
	}
}

/**
 * 红包类型
 * @param {*} str
 * 支付方式 1-余额支付  2-微信支付
 */
export function pay_method(str = '') {
	switch (str) {
		case 1:
			return '余额支付';
		case 2:
			return '微信支付';
		default:
			return ' ';
	}
}

/**
 * @param {*} str
 * 是否已获奖励：0-否 1-是
 */
export function is_award(str = '') {
	switch (str) {
		case 1:
			return '是';
		case 0:
			return '否';
		default:
			return ' ';
	}
}

/**
 * 
 * @param {*} str
 * 是否已领取奖励:1-否 2-是
 */
export function is_get(str = '') {
	switch (str) {
		case 1:
			return '否';
		case 2:
			return '是';
		default:
			return ' ';
	}
}

export function is_take(str = '') {
	switch (str) {
		case 1:
			return '是';
		case 0:
			return '否';
		case -1:
			return '作废';
		default:
			return ' ';
	}
}
export function is_not(str = '') {
	switch (str) {
		case 1:
			return '是';
		case 0:
			return '否';
		case -1:
			return '支付失败';
		default:
			return ' ';
	}
}
/*
1-已购买  0-未购买   -1-已作废
*/
export function is_buy(str = '') {
	switch (str) {
		case 1:
			return '已购买';
		case 0:
			return '未购买';
		case -1:
			return '已作废';
		default:
			return ' ';
	}
}

export function is_yes(str = '') {
	switch (str) {
		case 1:
			return '正常';
		case 2:
			return '下架';
		default:
			return ' ';
	}
}

export function notice_type(str = '') {
	switch (str) {
		case 1:
			return '正常';
		case 2:
			return '下架';
		default:
			return ' ';
	}
}

// <!-- value 格式为13位unix时间戳 -->
// <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
