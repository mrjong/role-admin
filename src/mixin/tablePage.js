const mixin = {
	methods: {
		handleSubmit(name) {
            console.log('------------')
			this.$refs[name].validate((valid) => {
				if (valid) {
                console.log(valid)
					this.getList({
						...this.formItem,
						pageNum: this.pageNo,
						pageSize: this.pageSize
					});
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
			console.log({
				...this.formItem,
				pageNum: pageNo,
				pageSize: this.pageSize
			});
			this.getList({
				...this.formItem,
				pageNum: pageNo,
				pageSize: this.pageSize
			});
		},
		// 切换每页条数时的回调
		changeSize(pageSize) {
			this.pageSize = pageSize;
			this.pageNo = 1;
			console.log({
				...this.formItem,
				pageNum: pageNo,
				pageSize: this.pageSize
			});
			this.getList({
				...this.formItem,
				pageNum: pageNo,
				pageSize: this.pageSize
			});
		}
	}
};
export default mixin;
