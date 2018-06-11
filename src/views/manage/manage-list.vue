<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">企业课程列表</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关企业" v-model="listQuery.company_name">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-tab">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="listCmputed" stripe style="width: 100%">
						<el-table-column label="公司ID" prop="company_id" header-align="center" align="center" width="100">
						</el-table-column>
						<el-table-column prop="company_name" header-align="center" align="center" label="公司名称">
						</el-table-column>
						<el-table-column label="下单时间" prop="order_time" header-align="center" align="center">
						</el-table-column>
						<el-table-column label="销售人员" prop="sales_name" header-align="center" align="center">
						</el-table-column>
						<el-table-column label="操作" prop="" header-align="center" align="center">
							<template slot-scope="scope">
								<div class="">
									<el-button type="text" size="small" @click="Choice(scope.row.company_id,scope.row.order_id)">查看详情</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { showCompanyList } from '../../api/api';
	export default {
		data() {
			return {
				//接收数据
				list: null,
				total: 0,
				loading: true,
				//发送数据
				listQuery: {
					page: 1,
					company_name: undefined
				}
			}
		},
		computed: {
			listCmputed: function() {
				return this.list
			}
		},
		watch: {
			'$route' (to, from) {
				this.list = null;
				this.loading = true;
				this.total = 0;
				this.getList();
			}
		},
		created() {
			this.getList()
		},
		methods: {
			//获取数据
			getList() {
				this.loading = true
				showCompanyList(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data.data
							this.total = data.count
							this.loading = false
						} else {
							this.loading = false
						}
					})
			},
			handleFilter() {
				this.listQuery.page = 1
				this.getList()
			},
			handleSizeChange(page) {
				this.listQuery.page = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getList()
			},
			Choice(orderId, order_id) {
				//      	this.$router.push({path: '/publice/manage-list/manage-buy', query: {selected: orDerId}})
				let list = {
					'company_id': orderId,
					'order_id': order_id
				}
				window.localStorage.setItem('defai', JSON.stringify(list))
				this.$router.push({
					name: '企业购买列表',
					params: {
						id: orderId
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-input-group__append {
		border-radius: 0 10px 10px 0 !important;
	}
	
	.el-select {
		width: 120px;
		>.el-input {
			max-width: 120px;
		}
	}
	
	.bg-nav {
		height: 42.02px;
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		padding: 11.5px 20px;
		.bg-left {
			height: 36px;
			line-height: 33px;
			float: left;
			margin-top: 5px;
		}
		.bg-right {
			width: 300px;
			float: right;
			margin-top: 4px;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.bg-tab {
		padding: 20px 20px;
		background-color: #FFF !important;
		margin-bottom: 20px;
		.el-pagin {
			text-align: center;
		}
		.el-table__row {
			.el-pointer {
				&:hover {
					cursor: pointer
				}
			}
		}
		.cell {
			text-align: center;
			.bg-title {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				>span:first-child {
					width: 100%;
					height: 20px;
					line-height: 20px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}
				div {
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				.el-button--text {
					padding: 0 !important;
				}
			}
		}
		.el-select {
			width: 120px;
			height: 36px;
		}
	}
	
	.bg-table {
		padding: 20px 20px;
		background-color: #FFF !important;
		.el-pagin {
			margin-top: 20px;
			text-align: center;
		}
		.el-table__row {
			.el-pointer {
				&:hover {
					cursor: pointer
				}
			}
		}
		.cell {
			text-align: center;
			.bg-title {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				>span:first-child {
					width: 100%;
					height: 20px;
					line-height: 20px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}
				div {
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				.el-button--text {
					padding: 0 !important;
				}
			}
		}
		.el-select {
			width: 120px;
			height: 36px;
		}
	}
	
	.el-img {
		min-width: 100px;
		min-height: 40px;
		background-color: #ebebeb;
		margin-top: 5px;
	}
</style>