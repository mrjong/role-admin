const mixin = {
	created() {
		if (this.getDirList && this.getDirList.length > 0) {
			this.getDir(this.getDirList);
		}
	},
	methods: {
		getDir(arg) {
			if (arg && arg.length > 0) {
				arg.forEach((element) => {
					console.log(element);
					if (this.$store.state[arg]) {
						this.$set(this.getDirObj, element, this.$store.state[element]);
					} else {
						this.$store.dispatch('getDictionary', element).then((res) => {
							this.$set(this.getDirObj, element, res);
						});
					}
				});
			}
		}
	}
};
// PROD_TYPE	产品线	公司的产品类型
// GENDER	性别	性别：男，女
// PROD_CNT	产品期数	公司产品期数类型
// CREDIT_LEVEL	信用级别	风控授信分划分
// CASE_HANDLE_STATUS	案件状态	案件流转状态
// PERD_FLG	分期付款标志	产品是否分期
// ID_TYP	证件类型	用户证件类型
// CNT_REL_TYP	紧急联系人关系	紧急联系人与用户的关系
// ALLOT_TYPE	分配方式	自动分案的分配方式
// PERD_STS	当期状态	分期账单的状态
// LEAF_TYPE	催收人员树类型	催收人员树类型
// COLLECT_TYPE	催收类型	催收类型分为内催和外包
// CARD_TYPE	银行卡类型	银行卡的类型
// REPAY_TYPE	还款类型	还款的方式
// SEAT_TYPE	坐席类型	第三方坐席的类型
// SMS_SEND_TYPE	短信发送类型	短信是通过什么方式发送
// SMS_SEND_STATUS	短信发送状态	短信发送的状态
// ROLE_TYPE	角色类型	催收系统中的两种类型
// IMG_TYPE	图片类型	身份证图片类型
// MSG_TPYE	通知类型	各种发送通知的类型
// ANNOUNCEMENT_TYPE	公告类型	首页公告类型
// APPROVAL_STATE	仲裁状态	仲裁状态 审核状态
// RES_FLAG	呼叫记录是否成功	呼叫成功标志
// MUSIC_STATUS	录音下载状态	录音下载状态
// 0_1_EFFECT_INVAL	0-1有效无效	0:有效 1:无效
// 01_02_EFFECT_INVAL	01-02有效无效	01:有效 02:无效
// 01_02_NO_YES	01-02否是	01:否 02:是
// 1_0_AVAILABLE_DISABLE	1-0可用停用	1:可用 0:停用
// 1_0_EFFECT_INVAL	1-0有效无效	1:有效 0:无效
export default mixin;
