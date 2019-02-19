import { repay_repayUserOrSystem_list } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
export default {
	name: 'remoney_user',
  mixins: [sysDictionary],
	data() {
		var alignCenter = 'center';
		var widthVal = 180;
		var widthMidVal = 100;
		let $this = this;
		return {
      getDirList: ['ORD_STS', 'PROD_TYPE'],
      getDirObj: {},
			showPanel: false,
			showPanel2: false,
			//代扣类型
			startAndend: '', //还款日期区间
			formValidate: {
        prdTyps:[]
			},
			ruleValidate: {
				//ruleValidate添加表单的校验规则，用来提示用户的输入法则，具体使用在表单里面 ：rule='ruleValidate'直接使用即可
				mblNo: [
					{
						pattern: this.GLOBAL.mblNo,
						message: '请输入正确手机号',
						trigger: 'blur'
					}
				]
			},
			pageNo: 1,
			pageSize: 10,
			total: 0,
      repayOrdTyp: 'UR', //区分用户主动还款、系统代扣还款，UR：用户主动还款，SR：系统代扣还款
      tableData: [
			// 	{
          // billNo: '1', //账单号
          // dkOrdNo: '2', // string 代扣订单号
          // usrNmHid: '3', // 用户姓名
          // idNoHid: '4', // 身份证号
          // mblNoHid: '5', // 手机号
          // repayOrdAmt: '6', //还款金额
          // ordStsName: '7', // 订单状态 借口中取
          // orgFnlMsg: '8', //失败原因,
          // ordDt: '9', // 还款时间,
          // crdAcTypName: '10', //卡类型
          // crdCorpOrgName: '11', // 还款银行
          // crdNoLast: '12', //还款银行四位
          // repayOrdPrcp: '13', // 已还本金
          // prdTypName: '14', //产品线01：还到02：随行付钱包 03：商户贷，调接口
          // rutCopyOrg: '15' // 代扣类型
			// 	},
			],
			tableColumns: [
				{
					type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
					width: 60,
					align: alignCenter
				},
				{
					title: '序号',
          type:'index',
					width: 60,
					align: alignCenter,
					key: 'buffet_id'
				},
				{
					title: '账单号',
					key: 'billNo',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal
				},
				{
					title: '代扣订单号',
					key: 'dkOrdNo',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal
				},
				{
					title: '客户姓名',
					key: 'usrNmHid',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal
				},
				{
					title: '身份证号',
					key: 'idNoHid',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal
				},
				{
					title: '手机号',
					searchOperator: 'like',
					key: 'mblNoHid',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal
				},
				{
					title: '还款金额',
					searchOperator: 'like',
					key: 'repayOrdAmt',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal,
          render: (h, params) => {
            let Amt = params.row.repayOrdAmt;
            Amt = Amt
              ? this.$options.filters['money'](Amt)
              : Amt;
            return h('span', Amt);
          }
				},
				{
					title: '订单状态',
					searchOperator: 'like',
					key: 'ordStsName',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal
				},
				{
					title: '失败原因',
					searchOperator: 'like',
					key: 'orgFnlMsg',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal
				},
				{
					title: '还款日期',
					searchOperator: 'like',
					key: 'ordDt',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal,
          render: (h, params) => {
            let lastDate = params.row.ordDt;
            lastDate = lastDate
              ? this.$options.filters['formatDate'](lastDate, 'YYYY-MM-DD HH:mm:ss')
              : lastDate;
            return h('span', lastDate);
          },
				},
				{
					title: '卡类型',
					searchOperator: 'like',
					key: 'crdAcTypName',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal
				},
				{
					title: '还款银行',
					searchOperator: 'like',
					key: 'crdCorpOrgName',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal
				},
				{
					title: '还款银行卡后四位',
					searchOperator: 'like',
					key: 'crdNoLast',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal
				},
				{
					title: '已还本金',
					searchOperator: 'like',
					key: 'repayOrdPrcp',
					className: 'tableMainW',
					align: alignCenter,
					width: widthMidVal,
          render(h,params){
					  let res = params.row.repayOrdPrcp;
					  res = res ? $this.$options.filters['money'](res) : res;
					  return h('span', res);
          }
				},
				{
					title: '产品类型',
					searchOperator: 'like',
					key: 'prdTypName',
					className: 'tableMainW',
					align: alignCenter,
					width: widthVal
				}
			]
		};
	},
	created() {
		this.getList();
	},
	methods: {
		// 改变日期区间的格式之后进行处理
		changeDange(val1, val2) {
			this.formValidate.startRepayDate = val1[0];
			this.formValidate.endRepayDate = val1[1];
			console.log('123', this.formValidate);

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
		},
		handleSubmit(name) {
		  console.log('参数',this.formValidate);
			this.$refs[name].validate((valid) => {
				if (valid) {
				  this.pageNo = 1;
					this.getList();
				}
			});
		},
		// 获取表格数据
	async getList() {
		  let res= await repay_repayUserOrSystem_list({
             pageNum: this.pageNo,
             pageSize: this.pageSize,
             repayOrdTyp: this.repayOrdTyp,
             ...this.formValidate,
           })
    console.log(res)
    // 请求成功之后需要做分页处理，然后将拿到的数据进行数据处理，总数目和展示条数
        if(res && res.code === 1){
		    this.tableData = res.data.content;
		    this.total = res.data.totalElements;
      } else {
		    this.$Message.error(res.message);
        }
		},
		// 重置
		clearForm(name) {
			this.pageNo = 1;
			this.formValidate = {
        prdTyps:[]
      };
			this.startAndend = '';
			this.$refs[name].resetFields();
		}
	}
};
