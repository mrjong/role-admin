let obj = {}
// 手机号码校验
obj.mblNo = /^1\d{10}$/;

// 金额校验
obj.money = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;

// 金额校验
obj.moneymin10 = /^(([1-9][0-9]+)|([1-9][0-9]+\.\d{1,2}))$/;

// 纯数字
obj.num = /^\d*$/;

// 身份证号校验
obj.idNo = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;

// 邮箱校验
obj.email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
export default obj
