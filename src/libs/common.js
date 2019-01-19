exports.validator_overdueDays = (rule, value, callback) => {
    console.log(0)
	if (Number(value) && Number(value) < 0) {
		callback(new Error('逾期天数为正整数'));
	} else {
		if (this.formCustom.passwdCheck !== '') {
			// 对第二个密码框单独验证
			this.$refs.formCustom.validateField('passwdCheck');
		}
		callback();
	}
};
