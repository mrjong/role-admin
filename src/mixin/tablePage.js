const mixin = {
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.getList();
				}
			});
		},
		// 重置
		clearForm(name) {
			this.pageNo = 1;
			this.formItem = {};
			this.$refs[name].resetFields();
		},
		// 页码改变的回调
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.getList();
		},
		// 切换每页条数时的回调
		changeSize(pageSize) {
			this.pageSize = pageSize;
			this.pageNo = 1;
			this.getList();
		}
	}
};
export default mixin;
