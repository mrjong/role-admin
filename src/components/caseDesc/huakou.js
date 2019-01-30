import { repayinfo_getApplyInfo, repayinfo_getCardNos, repayinfo_applayRepay } from '@/service/getData';
let isClick = false;

export default {
	data() {
		const validate_yqyhje_start = (rule, value, callback) => {
            console.log(this.repayinfo_getApplyInfo_data)
			if (
				!this.repayinfo_getApplyInfo_data ||
				!this.repayinfo_getApplyInfo_data.overdueAmt ||
				Number(value) > Number(this.repayinfo_getApplyInfo_data.overdueAmt)
			) {
				callback(new Error('还款金额不能超过逾期应还金额'));
			} else {
				callback();
			}
		};
		return {
			repayinfo_getCardNos_data: [],
			repayinfo_getApplyInfo_data: {},
			formItem: {},
			visible1: false,
			ruleValidate: {
				repayAmount: [
					{
						required: true,
						message: '请输入还款金额',
						trigger: 'blur'
					},
					{
						pattern: this.GLOBAL.money,
						message: '金额格式不正确',
						trigger: 'blur'
					},
					{
						pattern: this.GLOBAL.moneymin10,
						message: '还款金额大于等于10元',
						trigger: 'blur'
					},
					{
						validator: validate_yqyhje_start,
						trigger: 'blur'
					}
				],
				agrNo: [
					{
						required: true,
						message: '请选择还款账户',
						trigger: 'change'
					}
				]
			}
		};
	},
	model: {
		prop: 'model',
		event: 'passBack'
	},
	props: {
		userId: '',
		caseNo: '',
		prdTyp: '',
		model: {}
	},
	created() {
		this.repayinfo_getApplyInfo(); // 获取信息
		this.repayinfo_getCardNos(); // 还款账户
	},
	methods: {
		handleSubmit() {
			this.$refs.formItem.validate((valid) => {
				if (valid) {
					this.repayinfo_applayRepay();
				} else {
					this.model = true;
				}
			});
		},
		del() {
			this.childrenModel = !this.model;
			this.$emit('passBack', this.childrenModel);
			// this.$emit("getChildrenStatus", this.childrenData);
		},
		// 获取信息
		async repayinfo_getApplyInfo() {
			const res = await repayinfo_getApplyInfo({
				caseNo: this.caseNo
			});
			if (res.code === 1) {
				this.repayinfo_getApplyInfo_data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 还款账户
		async repayinfo_getCardNos() {
			const res = await repayinfo_getCardNos({
				userId: this.userId,
				prodType: this.prdTyp
			});
			if (res.code === 1) {
				this.repayinfo_getCardNos_data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},
		selData(data) {
			this.formItem.cardNoHid = data.label;
		},
		// 调用代扣
		async repayinfo_applayRepay() {
			if (isClick) {
				return;
			}
			isClick = true;
			const res = await repayinfo_applayRepay({
				...this.formItem
			});
			isClick = false;
			if (res.code === 1) {
				this.repayinfo_applayRepay_data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
