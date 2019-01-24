const mixin = {
	methods: {
		validate_yqts_start(rule, value, callback) {
			if (value && this.formItem.maxOverdueDays && Number(value) > Number(this.formItem.maxOverdueDays)) {
				callback(new Error('逾期开始天数不能大于逾期结束天数'));
			} else {
				callback();
			}
		},
		validate_yqts_end(rule, value, callback) {
			if (this.formItem.minOverdueDays) {
				this.$refs.formItem.validateField('minOverdueDays');
			}
			callback();
		},
		validate_yqyhje_start(rule, value, callback) {
			if (value && this.formItem.billOvduAmtBt && Number(value) > Number(this.formItem.billOvduAmtBt)) {
				callback(new Error('逾期应还开始金额不能大于逾期应还结束金额'));
			} else {
				callback();
			}
		},
		validate_yqyhje_end(rule, value, callback) {
			if (this.formItem.billOvduAmtLt) {
				this.$refs.formItem.validateField('billOvduAmtLt');
			}
			callback();
		}
	}
};
export default mixin;
