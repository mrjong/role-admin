import { arb_apply, arb_uploadUrl } from '@/service/getData';
import Cookie from 'js-cookie';
import dayjs from 'dayjs';
export default {
	data() {
		return {
			headers: {
				'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
				timeout: 120000,
			},
			prefix: '/admin/arb/images/',
      formItem: {},
      zhongcai_loading: false,//仲裁提交loading
			ruleValidate: {
				userGender: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}
				],
				userNation: [
					{
						required: true,
						message: '请选择民族',
						trigger: 'change'
					}
				],
				standAgreeDate: [
					{
						required: true,
						message: '请选择提前到期日期',
						trigger: 'change',
						type: 'date'
					}
				],
				voucherNo: [
					{
						required: true,
						message: '请输入打款凭证流水号',
						trigger: 'blur'
					}
				],
				idAddress: [
					{
						required: true,
						message: '请输入身份证地址',
						trigger: 'blur'
					}
				],
				idCardFront: [
					{
						required: true,
						message: '请上传身份证正面',
						trigger: 'blur'
					}
				],
				idCardOpposite: [
					{
						required: true,
						message: '请上传身份证反面',
						trigger: 'blur'
					}
				],
				voucherImg: [
					{
						required: true,
						message: '请上传打款凭证',
						trigger: 'blur'
					}
				],
				standImg: [
					{
						required: true,
						message: '请上传提前到期通知',
						trigger: 'blur'
					}
				]
			},
			productTimeList: [],
			defaultList: [],
			defaultList1: [],
			defaultList2: [],
			defaultList3: [],
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
	created() {
		this.formItem.idAddress = this.zhongcai_data.idAddress;
		this.formItem.voucherNo = this.zhongcai_data.voucherNo;
		this.formItem.standAgreeDate = this.zhongcai_data.standAgreeDate
			? new Date(this.zhongcai_data.standAgreeDate)
			: '';
		if (this.zhongcai_data.userGender) {
			this.formItem.userGender = this.zhongcai_data.userGender;
			this.$refs.formItem.validateField('userGender');
		}
		if (this.zhongcai_data.userNation) {
			this.formItem.userNation = this.zhongcai_data.userNation;
			this.$refs.formItem.validateField('userNation');
		}
	},
	methods: {
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		// 详情带入  回显身份证图片
		showImg() {
			if (this.zhongcai_data.routertype === 'my_zhongcai') {
				if (this.zhongcai_data.idCardFront) {
					this.formItem.idCardFront = this.zhongcai_data.idCardFront;
					this.uploadList.push({
						url: this.prefix + this.zhongcai_data.idCardFront,
						relativePath: this.zhongcai_data.idCardFront,
						status: 'finished'
					});
					this.$refs.formItem.validateField('idCardFront');
				}

				if (this.zhongcai_data.idCardOpposite) {
					this.formItem.idCardOpposite = this.zhongcai_data.idCardOpposite;
					this.uploadList1.push({
						url: this.prefix + this.zhongcai_data.idCardOpposite,
						relativePath: this.zhongcai_data.idCardOpposite,
						status: 'finished'
					});
					this.$refs.formItem.validateField('idCardOpposite');
				}
				if (this.zhongcai_data.voucherImg) {
					this.formItem.voucherImg = this.zhongcai_data.voucherImg;
					this.uploadList2.push({
						url: this.prefix + this.zhongcai_data.voucherImg,
						relativePath: this.zhongcai_data.voucherImg,
						status: 'finished'
					});
					this.$refs.formItem.validateField('voucherImg');
				}
				if (this.zhongcai_data.standImg) {
					this.formItem.standImg = this.zhongcai_data.standImg;
					this.uploadList3.push({
						url: this.prefix + this.zhongcai_data.standImg,
						relativePath: this.zhongcai_data.standImg,
						status: 'finished'
					});
					this.$refs.formItem.validateField('standImg');
				}
			} else {
				if (this.zhongcai_data.idCardFront) {
					this.arb_uploadUrl({
						key: 'idCardFront',
						path: this.zhongcai_data.idCardFront
					});
				}
				if (this.zhongcai_data.idCardOpposite) {
					this.arb_uploadUrl({
						key: 'idCardOpposite',
						path: this.zhongcai_data.idCardOpposite
					});
				}
			}
		},
		handleSubmit() {
			console.log(this.formItem);
			this.$refs.formItem.validate((valid) => {
				console.log(valid, '----------------');
				if (valid) {
					this.arb_apply();
				} else {
					this.model = true;
				}
			});
		},
		// 获取信息
		async arb_apply() {
      this.zhongcai_loading = true;
			let obj = {
				billNo: this.formItem.billNo,
				caseNo: this.zhongcai_data.caseNo,
				idCardNo: this.zhongcai_data.idNoHid,
				userName: this.zhongcai_data.userName,
				userGender: this.formItem.userGender,
				userNation: this.formItem.userNation,
				voucherNo: this.formItem.voucherNo,
				idAddress: this.formItem.idAddress,
				idCardFront: this.uploadList[0].relativePath,
				idCardOpposite: this.uploadList1[0].relativePath,
				voucherImg: this.uploadList2[0].relativePath,
				standImg: this.uploadList3[0].relativePath
			};
			if (this.formItem.standAgreeDate) {
				obj.standAgreeDate = dayjs(this.formItem.standAgreeDate).format('YYYY-MM-DD');
			}
      const res = await arb_apply(obj);
      this.zhongcai_loading = false;
			if (res.code === 1) {
				this.repayinfo_getApplyInfo_data = res.data;
				this.del();
				this.$Message.success('提交成功');
			} else {
        this.del();
				this.$Message.error(res.message);
			}
		},
		del() {
			this.childrenModel = !this.model;
			this.$emit('passBack', this.childrenModel);
			// this.$emit("getChildrenStatus", this.childrenData);
		},
		handleRemove(file, type) {
			console.log(file);
			this.uploadList.splice(this.uploadList.indexOf(file), 1);
		},
		handleRemove1(file, type) {
			this.uploadList1.splice(this.uploadList1.indexOf(file), 1);
		},
		handleRemove2(file, type) {
			this.uploadList2.splice(this.uploadList2.indexOf(file), 1);
		},
		handleRemove3(file, type) {
			this.uploadList3.splice(this.uploadList3.indexOf(file), 1);
		},
		handleSuccess(res, file) {
			console.log(res, '-----------------');
			if (res.code === 1) {
				this.formItem.idCardFront = res.data.relativePath;
				this.uploadList = [
					{
						url: this.prefix + res.data.relativePath,
						relativePath: res.data.relativePath,
						status: 'finished'
					}
				];
				file.url = res.data.relativePath;
				this.$refs.formItem.validateField('idCardFront');
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSuccess1(res, file) {
			console.log(res, '-----------------');
			if (res.code === 1) {
				this.formItem.idCardOpposite = res.data.relativePath;
				this.uploadList1 = [
					{
						relativePath: res.data.relativePath,
						url: this.prefix + res.data.relativePath,
						status: 'finished'
					}
				];
				file.url = res.data.relativePath;
				this.$refs.formItem.validateField('idCardOpposite');
			} else {
				this.$Message.error(res.message);
			}
		},

		async arb_uploadUrl(obj) {
			const res = await arb_uploadUrl({
				caseNo: this.zhongcai_data.caseNo,
				imgType: obj.key,
				uploadUrlImage: obj.path
			});
			if (res.code === 1) {
				if (obj.key === 'idCardFront') {
					this.formItem.idCardFront = this.zhongcai_data.idCardFront;
					this.uploadList.push({
						url: this.prefix + res.data.relativePath,
						relativePath: res.data.relativePath,
						status: 'finished'
					});
					this.$refs.formItem.validateField('idCardFront');
				} else if (obj.key === 'idCardOpposite') {
					this.formItem.idCardOpposite = this.zhongcai_data.idCardOpposite;
					this.uploadList1.push({
						url: this.prefix + res.data.relativePath,
						relativePath: res.data.relativePath,
						status: 'finished'
					});
					this.$refs.formItem.validateField('idCardOpposite');
				}
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSuccess2(res, file) {
			console.log(res, '-----------------');
			if (res.code === 1) {
				this.formItem.voucherImg = res.data.relativePath;
				this.uploadList2 = [
					{
						url: this.prefix + res.data.relativePath,
						relativePath: res.data.relativePath,
						status: 'finished'
					}
				];
				file.url = res.data.relativePath;
				this.$refs.formItem.validateField('voucherImg');
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSuccess3(res, file) {
			console.log(res, '-----------------');
			if (res.code === 1) {
				this.formItem.standImg = res.data.relativePath;
				this.uploadList3 = [
					{
						url: this.prefix + res.data.relativePath,
						relativePath: res.data.relativePath,
						status: 'finished'
					}
				];
				file.url = res.data.relativePath;
				this.$refs.formItem.validateField('standImg');
			} else {
				this.$Message.error(res.message);
			}
		},

		handleFormatError(file) {
			this.$Notice.warning({
				title: '格式不正确',
				desc: '请选择png,jpeg,jpg格式图片'
			});
		},
		handleMaxSize(file) {
			this.$Notice.warning({
				title: '大小限制',
				desc: '图片大小不能超过10M'
			});
		},
		handleBeforeUpload() {
			const check = this.uploadList.length < 5;
			if (!check) {
				this.$Notice.warning({
					title: 'Up to five pictures can be uploaded.'
				});
			}
			return check;
		}
	},
	mounted() {
		// if (!this.zhongcai_data.idCardFront) {
		// this.uploadList = this.$refs.upload.fileList;
		// }
		// if (!this.zhongcai_data.idCardOpposite) {
		// this.uploadList1 = this.$refs.upload1.fileList;
		// }
		// this.uploadList2 = this.$refs.upload2.fileList;
		// this.uploadList3 = this.$refs.upload3.fileList;
		this.showImg();
	}
};
