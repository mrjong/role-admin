import { buffet_list, carte_batchadd } from '@/service/getData';
import goodsAdd from '@/components/goods-add';

export default {
	name: 'batchadd',
	components: {
		'goods-add': goodsAdd
	},
	data() {
		return {
			current: 0,
			breadcrumbTitle: '',
			buffetList: [],
			ruleValidate: {},
			yuyueshijian: false,
			cangui: false,
			shangpin: false,
			formValidate2: {
				buffet_id_arr: []
			},
			carte_typeList: [
				{
					id: 1,
					name: '预约购买'
				},
				{
					id: 2,
					name: '柜前购买'
				}
			],
			formValidate: {
				preset_time_arr: [
					{
						time: ''
					}
				]
			},
			ruleValidate2: {
				buffet_id_arr: [
					{
						required: true,
						message: '请选择餐柜',
						trigger: 'change',
						type: 'array'
					}
                ],
                carte_type: [
					{
						required: true,
						message: '请选择菜单类型',
                        trigger: 'change',
                        type: 'number',
					}
				]
			}
		};
	},
	created() {
		this.getBuffet();
	},
	methods: {
		// 收齐
		showItem(type) {
			this[type] = !this[type];
		},
		// 添加时间
		addTime() {
			console.log(this.formValidate);
			if (!this.formValidate.preset_time_arr[this.formValidate.preset_time_arr.length - 1].time) {
				return;
			}
			this.formValidate.preset_time_arr.push({
				time: ''
			});
		},

		// 删除时间
		handleRemove(index) {
			this.formValidate.preset_time_arr.splice(index, 1);
		},

		// 获取餐柜
		async getBuffet() {
			const res = await buffet_list({
				page: 1,
				perPage: 9999,
				config: {
					hideMessage: true
				}
			});
			console.log(res, '-----------');
			if (res.data && res.data.data) {
				this.buffetList = res.data.data;
			} else {
				this.buffetList = [];
			}
		},

		// 校验数据
		handleCheckValidate() {
			let currentValid = false;
			let currentValid2 = false;
			let goodsAddValid = false;
			let discountValid = false;
			let discountValidArr = [];
			console.log(this.current);
			if (this.current === 0) {
				this.$refs.formValidate.validate((valid) => {
					currentValid = valid;
					if (currentValid) {
						this.current = 1;
					}
				});
			} else if (this.current === 1) {
				this.$refs.formValidate2.validate((valid) => {
					currentValid2 = valid;
					if (currentValid2) {
						this.current = 2;
					}
				});
			} else if (this.current === 2) {
				currentValid2 = true;
				currentValid = true;
				this.$refs.goodsAdd.$refs.goodsAddForm.validate((valid) => {
					goodsAddValid = valid;
				});
				if (this.$refs.goodsAdd.$refs.discount) {
					this.$refs.goodsAdd.$refs.discount &&
						this.$refs.goodsAdd.$refs.discount.forEach((item) => {
							item.$refs.discountForm.validate((valid) => {
								discountValidArr.push(valid);
							});
						});
				}
				discountValid = discountValidArr.every((item) => item === true);
			}

			return currentValid2 && currentValid2 && goodsAddValid && discountValid;
		},

		// 获取参数
		handleGetParams() {
			let formValidate = this.formValidate;
			formValidate.buffet_id_arr = this.formValidate2.buffet_id_arr;
			let formDataGoodsAdd = JSON.parse(this.$refs.goodsAdd.exportSubmitData());
			formValidate.p = formDataGoodsAdd;
			return formValidate;
		},
		last() {
			this.current--;
		},
		// 格式化参数
		formatData(params) {
			let params2 = JSON.parse(params);
			let time_arr = [];
			params2.preset_time_arr &&
				params2.preset_time_arr.forEach((item) => {
					time_arr.push(+new Date(item.time) / 1000);
				});

			params2.p.forEach((item, index) => {
				params2.p[index].discount &&
					params2.p[index].discount.forEach((item2, index2) => {
						params2.p[index].discount[index2].discount_price = params2.p[index].discount[index2]
							.discount_price
							? params2.p[index].discount[index2].discount_price
							: 0;
						params2.p[index].discount[index2].discount_start_time =
							params2.p[index].discount[index2].discount_time[0];
						params2.p[index].discount[index2].discount_send_time =
							params2.p[index].discount[index2].discount_time[1];
						delete params2.p[index].discount[index2].discount_time;
					});
				params2.p[index].group_buy_price = params2.p[index].is_group_buy ? params2.p[index].group_buy_price : 0;
				params2.p[index].promotion_price = params2.p[index].is_promotion ? params2.p[index].promotion_price : 0;
				params2.p[index].preset_depreciate = params2.p[index].is_preset_depreciate
					? params2.p[index].preset_depreciate
					: 0;
				params2.p[index].is_discount = params2.p[index].is_discount ? 1 : 0;
                params2.p[index].is_use_bonus = params2.p[index].is_use_bonus ? 1 : 0;
                params2.p[index].is_use_coupon = params2.p[index].is_use_coupon ? 1 : 0;
				params2.p[index].is_promotion = params2.p[index].is_promotion ? 1 : 0;
				params2.p[index].is_preset_depreciate = params2.p[index].is_preset_depreciate ? 1 : 0;
				params2.p[index].is_group_buy = params2.p[index].is_group_buy ? 1 : 0;
				params2.p[index].start_sale_time = +new Date(params2.p[index].start_sale_time) / 1000;
				params2.p[index].end_sale_time = +new Date(params2.p[index].end_sale_time) / 1000;
			});
			params2.preset_time_arr = time_arr;
			params2.carte_type = this.formValidate2.carte_type;
			params2.newGetType2 = true;
			return params2;
		},

		// 提交
		async handleSubmit() {
			if (!this.handleCheckValidate()) {
				return;
			}
			const params = this.handleGetParams();
			console.log(params, 'params');
			let data = this.formatData(JSON.stringify(params));
			console.log(data);
			let res;
			// 更新用户信息
			res = await carte_batchadd({
				...data
			});
			if (res) {
				setTimeout(() => {
					this.$router.push('/carte/carte_list');
				}, 2000);
			}
		}
	}
};
