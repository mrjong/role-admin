export default {
	data() {
		return {
			formItem: {},
			ruleValidate: {},
			productTimeList: [],
			visible: false,
			rules: {},
			rulesTempl: {
				// nodeName: [
				// 	{
				// 		required: true,
				// 		message: '请输入节点名称',
				// 		trigger: 'blur'
				// 	}
				// ],
				// nodeDesc: [
				// 	{
				// 		required: true,
				// 		message: '请输入节点描述',
				// 		trigger: 'blur'
				// 	}
				// ],
				// nodeCode: [
				// 	{
				// 		required: true,
				// 		message: '请输入节点编号',
				// 		trigger: 'blur'
				// 	}
				// ],
				// nodeDealUserId: [
				// 	{
				// 		required: true,
				// 		message: '请输入节点处理人ID',
				// 		trigger: 'blur'
				// 	}
				// ],
				// nodeDealName: [
				// 	{
				// 		required: true,
				// 		message: '请输入处理人姓名',
				// 		trigger: 'blur'
				// 	}
				// ],
				// nodeSort: [
				// 	{
				// 		required: true,
				// 		message: '请输入节点处理顺序',
				// 		trigger: 'blur'
				// 	}
				// ]
			},
			defNodeList: [
				{
					nodeName: '申请节点',
					nodeDesc: '申请节点',
					nodeCode: 'APPLY',
					nodeDealUserId: 'admin',
					nodeDealName: 'admin',
					nodeSort: 0
				},
				{
					nodeName: '结束节点',
					nodeDesc: '结束节点',
					nodeCode: 'END',
					nodeDealUserId: 'admin',
					nodeDealName: 'admin',
					nodeSort: 51
				}
			],
			nodeitem: {
				nodeName: '',
				nodeDesc: '',
				nodeCode: '',
				nodeDealUserId: '',
				nodeDealName: '',
				nodeSort: ''
			},
			ruleValidate: {
				defName: [
					{
						required: true,
						message: '请输入工作流名称',
						trigger: 'blur'
					}
				],
				defCode: [
					{
						required: true,
						message: '请输入工作流编号',
						trigger: 'blur'
					}
				],
				backType: [
					{
						required: true,
						message: '请选择驳回类型',
						trigger: 'change'
					}
				],
				defType: [
					{
						required: true,
						message: '请选择工作流类型',
						trigger: 'change'
					}
				]
			}
		};
	},
	props: {
		defTypeList: {},
		backTypeList: {}
	},
	created() {
		this.handleRenderRuler();
	},
	methods: {
		handleAdd() {
			this.$refs.goodsAddForm.validate((value) => {
				console.log(value);
				if (value) {
					this.defNodeList.push(this.nodeitem);
				}
			});
		},
		handleDel(index) {
			this.defNodeList.splice(index, 1);
		},
		// 生成 ruler
		handleRenderRuler() {
			const goodsItemLength = this.defNodeList.length;
			const rulesTempl = this.rulesTempl;
			let rulesResult = {};
			for (let i = 0; i < goodsItemLength; i += 1) {
				Object.entries(rulesTempl).forEach((item) => {
					rulesResult[`items.${i}.${item[0]}`] = item[1];
				});
			}
			this.rules = rulesResult;
		}
	}
};
