export default {
	data() {
		return {
			formItem: {},
			ruleValidate: {},
			productTimeList: [],
			defaultList: [
				{
					name: 'a42bdcc1178e62b4694c830f028db5c0',
					url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
				},
				{
					name: 'bc7521e033abdd1e92222d733590f104',
					url: 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
				}
			],
			imgName: '',
			visible: false,
			uploadList: []
		};
    },
	model: {
		prop: 'model',
		event: 'passBack'
	},
	props: {
        getDirObj:{},
		model: {}
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
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		handleRemove(file) {
			const fileList = this.$refs.upload.fileList;
			this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
		},
		handleSuccess(res, file) {
			file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
			file.name = '7eb99afb9d5f317c912f08b5212fd69a';
		},
		handleFormatError(file) {
			this.$Notice.warning({
				title: 'The file format is incorrect',
				desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
			});
		},
		handleMaxSize(file) {
			this.$Notice.warning({
				title: 'Exceeding file size limit',
				desc: 'File  ' + file.name + ' is too large, no more than 2M.'
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
		this.uploadList = this.$refs.upload.fileList;
	}
};
