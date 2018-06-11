<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">操作日志</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索公司名称">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>

				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="tableData" stripe style="width: 100%">
						<el-table-column prop="realname" header-align="center" align="center" width="300" label="操作人">

						</el-table-column>
						<el-table-column prop="company_name" header-align="center" align="center" width="170" label="公司名称"></el-table-column>
						<el-table-column prop="nickname" header-align="center" align="center" width="170" label="员工姓名"></el-table-column>
						<el-table-column prop="add_date" header-align="center" align="center" width="200" label="操作时间"></el-table-column>

						<el-table-column prop="log_type_name" header-align="center" align="center" label="操作行为"></el-table-column>

						<el-table-column label="备注" header-align="center" align="center" width="120">
							<template slot-scope="scope">
								<div v-if="scope.row.log_description.length > 5">
									<el-popover ref="popover1" placement="buttom" width="200" trigger="hover">
										{{scope.row.log_description}}
									</el-popover>
									<el-button v-popover:popover1 type="text" class="bg-oper">{{scope.row.log_description}}</el-button>
								</div>
								<span v-else>
							<span>{{scope.row.log_description}}</span>
								</span>
							</template>
						</el-table-column>

						<el-table-column prop="created_at" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="btn(scope.$index, scope.row.live_log_id)">详情</el-button>
							</template>
						</el-table-column>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
			</el-col>
		</el-row>

	</div>
</template>
<script>
	//	import store from '@/store/store'
	//	import * as types from '@/store/types'
	import { liveLogLists, authorList } from '../../api/api.js';
	export default {
		data() {
			return {
				//接收数据
				list: null,
				total: 0,
				loading: false,
				tableData: [],
				//发送数据
				listQuery: {
					page: 1,
					keywords: undefined
				},
			}
		},
		created() {
			this.getList()
		},
		methods: {
			btn(index, id) {
				this.$router.push({
					name: '日志详情',
					params: {
						id: id
					}
				})
			},

			//获取数据
			getList() {
				//				this.loading = true
				liveLogLists(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.tableData = data.data
							this.total = res.data.total
							//							this.listLoading = false
							//							console.log('11', res)
						}
					})
			},

			handleFilter() {
				this.listQuery.page = 1
				authorList(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data[1]
							this.total = data[0].search_total
							this.listLoading = false
						}
					})
			},
			handleSizeChange(page) {
				this.listQuery.page = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getList()
			}
		}
	}
</script>

<style lang='scss' scoped>
	.bg-oper {
		color: #000000;
	}
	/*.el-input-group__append {
		border-radius: 0 10px 10px 0 !important;
	}
	
	.el-select {
		width: 120px;
		>.el-input {
			max-width: 120px;
		}
	}*/
	
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 6.5px 20px;
		.bg-left {
			float: left;
			.bg-color {
				font-size: 16px;
				font-weight: 500;
				text-align: left;
				color: #222222;
				background-color: #FFF;
				padding: 15px 0 15px 0px;
			}
			.grid-content {
				border: none;
			}
		}
		.bg-right {
			width: 300px;
			height: 43px;
			float: right;
			margin: 8px 0px 0 0;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.block {
		margin-top: 20px;
	}
	/*.bg-table {
		.cell {
			text-align: center;
			.bg-title {
				width: 260px;
				text-align: center;
				height: 35.99px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				div {
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				button {
					text-align: left;
					margin: 0 auto;
					text-align: center;
					width: 257px;
					height: 20px;
					line-height: 20px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					span {
						text-align: left;
						width: 90px !important;
					}
				}
				.el-button--text {
					padding: 0 !important;
				}
				.bg-color {
					color: #2c3e50
				}
			}
		}
		.el-select {
			width: 120px;
			height: 36px;
		}
	}*/
	/*.el-img {
		min-width: 100px;
		min-height: 40px;
		background-color: #ebebeb;
		margin-top: 5px;
	}*/
	/*.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 6.5px 20px;
		.bg-left {
			float: left;
			.bg-color {
				font-size: 16px;
				font-weight: 500;
				text-align: left;
				color: #222222;
				background-color: #FFF;
				padding: 15px 0 15px 0px;
			}
			.grid-content {
				border: none;
			}
		}
		.bg-right {
			width: 300px;
			height: 43px;
			float: right;
			margin: 8px 0px 0 0;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}*/
</style>