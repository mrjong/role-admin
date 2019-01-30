import { arb_apply } from '@/service/getData';
import Cookie from "js-cookie"
export default {
	data() {
		return {
			headers: {
				'SXF-TOKEN': Cookie.get('SXF-TOKEN')
			},
			formItem: {},
			ruleValidate: {},
			productTimeList: [],
			defaultList: [],
			defaultList1: [
				{
					name: 'a42bdcc1178e62b4694c830f028db5c0',
					url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
				}
			],
			defaultList2: [
				{
					url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
				}
			],
			defaultList3: [
				{
					url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
				}
			],
			imgName: '',
			visible: false,
			uploadList: [],
			uploadList1: [],
			uploadList2: [],
			uploadList3: []
		};
	},
	model: {
		prop: 'model',
		event: 'passBack'
	},
	props: {
		zhongcai_data: {},
		getDirObj: {},
		model: {}
	},
	methods: {
		handleSubmit() {
			console.log(this.formItem);
			console.log(this.zhongcai_data);
			this.$refs.formItem.validate((valid) => {
				if (valid) {
					this.arb_apply();
				} else {
					this.model = true;
				}
			});
		},
		// 获取信息
		async arb_apply() {
			let obj = {
				billNo: this.formItem.billNo,
				caseNo: this.zhongcai_data.caseNo,
				idCardNo: this.zhongcai_data.idNoHid,
				userName: this.zhongcai_data.userName,
				// userGender: this.zhongcai_data.userGender,
				userNation: this.zhongcai_data.userNation,
				voucherNo: this.formItem.voucherNo,
				idAddress: this.formItem.idAddress,
				idCardFront: this.formItem.upload[0].url,
				idCardOpposite: this.formItem.upload1[0].url,
				voucherImg: this.formItem.upload2[0].url,
				standImg: this.formItem.upload3[0].url
			};
			if (this.formItem.standAgreeDate) {
				obj.standAgreeDate = +new Date(this.formItem.standAgreeDate);
			}
			const res = await arb_apply(obj);
			if (res.code === 1) {
				this.repayinfo_getApplyInfo_data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},
		del() {
			this.childrenModel = !this.model;
			this.$emit('passBack', this.childrenModel);
			// this.$emit("getChildrenStatus", this.childrenData);
		},
		handleRemove(file, type) {
			const fileList = this.$refs[type].fileList;
			this.$refs[type].fileList.splice(fileList.indexOf(file), 1);
		},
		handleSuccess(res, file) {
			console.log(res, '-----------------');
			if (res.code === 1) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSuccess1(res, file) {
			if (res.code === 1) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSuccess2(res, file) {
			if (res.code === 1) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSuccess3(res, file) {
			if (res.code === 1) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			} else {
				this.$Message.error(res.message);
			}
		},
		handleFormatError(file) {
			this.$Notice.warning({
				title: '格式不正确',
				desc: '请选择png,jpeg,jpg格式图片'
			});
		}
		// handleMaxSize(file) {
		// 	this.$Notice.warning({
		// 		title: '大小限制',
		// 		desc: 'File  ' + file.name + ' is too large, no more than 2M.'
		// 	});
		// },
		// handleBeforeUpload() {
		// 	const check = this.uploadList.length < 5;
		// 	if (!check) {
		// 		this.$Notice.warning({
		// 			title: 'Up to five pictures can be uploaded.'
		// 		});
		// 	}
		// 	return check;
		// }
	},
	mounted() {
		this.uploadList = this.$refs.upload.fileList;
		this.uploadList1 = this.$refs.upload1.fileList;
		this.uploadList2 = this.$refs.upload2.fileList;
		this.uploadList3 = this.$refs.upload3.fileList;
	}
};
