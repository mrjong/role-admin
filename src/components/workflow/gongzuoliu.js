import { wkProcessDef_save, wkProcessDef_update } from '@/service/getData';
export default {
	data() {
		return {
			domain: {},
			ruleValidate: {},
			productTimeList: [],
			visible: false,
			rules: {},
			goodsAddForm: {},
			rulesTempl: {
				nodeName: [
					{
						required: true,
						message: '请输入节点名称',
						trigger: 'blur'
					}
				],
				nodeDesc: [
					{
						required: true,
						message: '请输入节点描述',
						trigger: 'blur'
					}
				],
				nodeCode: [
					{
						required: true,
						message: '请输入节点编号',
						trigger: 'blur'
					}
				],
				nodeDealUserId: [
					{
						required: true,
						message: '请输入节点处理人ID',
						trigger: 'blur'
					}
				],
				nodeDealName: [
					{
						required: true,
						message: '请输入处理人姓名',
						trigger: 'blur'
					}
				],
				nodeSort: [
					{
						required: true,
						message: '请输入节点处理顺序',
						trigger: 'blur'
					},
					{
						pattern: this.GLOBAL.num,
						message: '请输入数字',
						trigger: 'blur'
					},
					{
						validator: this.nodeSort,
						trigger: 'blur'
					}
				]
			},
			formData: {
				items: [
					{
						nodeName: '申请节点',
						nodeDesc: '申请节点',
						nodeCode: 'APPLY',
						nodeDealUserId: 'admin',
						nodeDealName: 'admin',
						nodeSort: '0'
					},
					{
						nodeName: '结束节点',
						nodeDesc: '结束节点',
						nodeCode: 'END',
						nodeDealUserId: 'admin',
						nodeDealName: 'admin',
						nodeSort: '51'
					}
				]
			},
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
		backTypeList: {},
		model: {},
		parentData: {}
	},
	model: {
		prop: 'model',
		event: 'passBack'
	},
	created() {
		if (
			(this.parentData && this.parentData.type && this.parentData.type === 'edit') ||
			(this.parentData && this.parentData.type && this.parentData.type === 'read')
		) {
            this.domain = this.parentData.workData.domain;
            let testObj =[]
            this.parentData.workData.nodeList.forEach((item)=>{
                testObj.push({
                    ...item,
                    nodeSort:item.nodeSort+''
                })
            })
            this.$set(this.formData, 'items', testObj);
		}
		this.handleRenderRuler();
	},
	methods: {
		nodeSort(rule, value, callback) {
			console.log(value);
			let a = this.formData.items.filter((item) => item.nodeSort === value);
			console.log(a);
			if (a.length > 1) {
				callback(new Error('顺序不能重复,请重新输入'));
			} else if (Number(a[0].nodeSort) < 0 || Number(a[0].nodeSort) > 51) {
				callback(new Error('顺序应0~51之间'));
			} else {
				callback();
			}
		},
		closeModal() {
			this.del();
		},
		handleAdd() {
			this.$refs.goodsAddForm.validate((value) => {
				if (value) {
					this.formData.items.push(JSON.parse(JSON.stringify(this.nodeitem)));
					this.handleRenderRuler();
				}
			});
		},
		handleDel(index) {
			this.formData.items.splice(index, 1);
		},
		handleSubmit() {
			this.$refs.domain.validate((valid) => {
				if (valid) {
					this.$refs.goodsAddForm.validate((value) => {
						if (value) {
							if (this.parentData.type === 'edit') {
								this.wkProcessDef_update();
							} else {
								this.wkProcessDef_save();
							}
						}
					});
				} else {
					this.visible1 = true;
				}
			});
		},
		async wkProcessDef_update() {
			const res = await wkProcessDef_update({
				domain: this.domain,
				nodeList: this.formData.items
			});
			if (res.code === 1) {
				this.$Message.success('修改成功');
				this.childrenData = this.model;
				this.childrenData.modal = false;
				this.$emit('passBack', this.childrenData);
			} else {
				this.$Message.error(res.message);
				this.visible1 = true;
			}
		},
		async wkProcessDef_save() {
			const res = await wkProcessDef_save({
				domain: this.domain,
				nodeList: this.formData.items
			});
			if (res.code === 1) {
				this.$Message.success('添加成功');
				this.childrenData = this.model;
				this.childrenData.modal = false;
				console.log(this.childrenData);
				this.$emit('passBack', this.childrenData);
			} else {
				this.$Message.error(res.message);
				this.visible1 = true;
			}
		},
		del() {
			this.childrenData = this.model;
			this.childrenData.modal = false;
			console.log(this.childrenData);
			this.$emit('passBack', this.childrenData);
		},
		// 生成 ruler
		handleRenderRuler() {
			console.log(this.formData.items);
			const goodsItemLength = this.formData.items.length;
			const rulesTempl = this.rulesTempl;
			let rulesResult = {};
			for (let i = 0; i < goodsItemLength; i += 1) {
				Object.entries(rulesTempl).forEach((item) => {
					console.log(item[0], i);
					rulesResult[`items.${i}.${item[0]}`] = item[1];
				});
			}
			this.rules = rulesResult;
		}
	}
};
