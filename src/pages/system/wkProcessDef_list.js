import { wkProcessDef_list, wkProcessDef_save } from '@/service/getData';
export default {
	name: 'wkProcessDef_list',
	data() {
		return {
			pageNum: 1,
			pageSize: 10
		};
	},
	created() {
		this.getList();
		this.saveData();
	},
	methods: {
		// 获取数据
		async getList() {
			const res = await wkProcessDef_list({
				pageNum: this.pageNum,
				pageSize: this.pageSize
			});
			console.log(res);
		},
		// 获取数据
		async saveData() {
			const res = await wkProcessDef_save({
                updater:'9999',
                defName:'00000'
            });
			console.log(res);
		}
	}
};
