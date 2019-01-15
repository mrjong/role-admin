import { goods_list } from '@/service/getData';
import discount from '@/components/discount';
export default {
	name: 'goodsAdd',
	props: {},
	data() {
		return {
			goodsList: [],
			formData: {
				items: [
					{
						goods_id: '',
						is_use_bonus: false,
						is_use_coupon: false,
						is_promotion: false,
						promotion_price: '',
						is_preset_depreciate: false,
						preset_depreciate: '',
						is_group_buy: false,
						group_buy_price: '',
						start_sale_time: '',
						end_sale_time: '',
						remarks: '',
						is_discount: false,
						sale_timeList: [
							{
								id: 1,
								name: '早餐'
							},
							{
								id: 2,
								name: '午餐'
							},
							{
								id: 3,
								name: '晚餐'
							}
						]
					}
				]
			},

			rules: {},
			rulesTempl: {
				goods_id: [
					{
						required: true,
						type: 'number',
						message: '商品不能为空',
						trigger: 'change'
					}
                ],
                sale_time: [
					{
						required: true,
						type: 'number',
						message: '售卖时间不能为空',
						trigger: 'change'
					}
				],
				goods_num: [
					{
						required: true,
						message: '请输入商品剩余数量',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
						message: '格式不正确',
						trigger: 'blur'
					}
				],
				is_use_bonus: [
					{
						required: true,
						type: 'boolean',
						message: '请选择是否使用红包',
						trigger: 'blur'
					}
				],
				is_use_coupon: [
					{
						required: true,
						type: 'boolean',
						message: '请选择是否使用卡券',
						trigger: 'blur'
					}
				],
				is_promotion: [
					{
						required: true,
						type: 'boolean',
						message: '请选择是否参加促销',
						trigger: 'blur'
					}
				],
				promotion_price: [
					{
						required: true,
						message: '请输入促销价',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
						message: '格式不正确',
						trigger: 'blur'
					}
				],
				is_preset_depreciate: [
					{
						required: true,
						type: 'boolean',
						message: '请选择有无预约价',
						trigger: 'blur'
					}
				],
				preset_depreciate: [
					{
						required: true,
						message: '请输入预约价',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
						message: '格式不正确',
						trigger: 'blur'
					}
				],
				is_group_buy: [
					{
						required: true,
						type: 'boolean',
						message: '请选择是否参加团购',
						trigger: 'blur'
					}
				],
				group_buy_price: [
					{
						required: true,
						message: '请输入团购价',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
						message: '格式不正确',
						trigger: 'blur'
					}
				],
				start_sale_time: [
					{
						required: true,
						type: 'date',
						message: '请选择开始售卖时间',
						trigger: 'change'
					}
				],
				end_sale_time: [
					{
						required: true,
						type: 'date',
						message: '请选择结束售卖时间',
						trigger: 'change'
					}
				],
				remarks: [
					{
						required: false,
						message: '请输入备注',
						trigger: 'blur'
					}
				]
			}
		};
	},
	computed: {},
	components: {
		discount
	},
	created() {
		this.getGoods();
		this.handleRenderRuler();
	},
	mounted() {},
	methods: {
		// 生成 ruler
		handleRenderRuler() {
			const goodsItemLength = this.formData.items.length;
			const rulesTempl = this.rulesTempl;
			let rulesResult = {};
			for (let i = 0; i < goodsItemLength; i += 1) {
				Object.entries(rulesTempl).forEach((item) => {
					rulesResult[`items.${i}.${item[0]}`] = item[1];
				});
			}
			console.log(rulesResult, 'rulesResult');
			this.rules = rulesResult;
		},

		// 获取表格数据
		async getGoods() {
			const res = await goods_list({
				page: 1,
				perPage: 9999,
				config: {
					hideMessage: true
				}
			});
			if (res.data && res.data.list && res.data.list.data) {
				this.goodsList = res.data.list.data;
			} else {
				this.goodsList = [];
			}
		},
		// 获取选中商品
		getSelectGoods() {
			this.formData.items.forEach((item, index) => {
				this.goodsList.forEach((item2, index2) => {
					if (item.goods_id === item2.goods_id) {
						this.$set(this.goodsList, true, 'disabled');
					} else {
						this.$set(this.goodsList, false, 'disabled');
					}
				});
			});
			console.log(this.goodsList);
		},
		// 添加商品
		addGoods() {
			this.$refs.goodsAddForm.validate((value) => {
				console.log(value, 'value11');
			});
			this.getSelectGoods();
			this.formData.items.push({
				goods_id: '',
				is_use_bonus: false,
				is_use_coupon: false,
				is_promotion: false,
				promotion_price: '',
				is_preset_depreciate: false,
				preset_depreciate: '',
				is_group_buy: false,
				group_buy_price: '',
				start_sale_time: '',
				end_sale_time: '',
				remarks: '',
				is_discount: false,
				sale_timeList: [
					{
						id: 1,
						name: '早餐'
					},
					{
						id: 2,
						name: '午餐'
					},
					{
						id: 3,
						name: '晚餐'
					}
				]
			});
			this.handleRenderRuler();
		},

		// 校验单个值
		handleCheckValidate(key, index) {
			this.$refs.goodsAddForm.validateField(`items.${index}.${key}`);
		},

		// 删除商品
		handleRemove(index) {
			this.formData.items.splice(index, 1);
		},

		// 导出本组件的数据
		exportSubmitData() {
			let currentValid = false;
			this.$refs.goodsAddForm.validate((valid) => {
				currentValid = valid;
			});
			if (!currentValid) {
				return false;
			}
			let submitData = JSON.parse(JSON.stringify(this.formData.items));
			this.$refs.discount &&
				this.$refs.discount.forEach((item, index) => {
					submitData[index].discount = JSON.parse(item.exportSubmitData());
				});
			return JSON.stringify(submitData);
		}
	}
};
