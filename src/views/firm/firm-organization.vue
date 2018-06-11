<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">企业管理</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关企业" v-model='listQuery.keyword'>
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>

				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 95%;margin-left: 2.5%;">
						<el-table-column prop="company_id" header-align="center" align="center" width="300" label="企业id"></el-table-column>
						<el-table-column prop="company_name" header-align="center" align="center" width="300" label="企业名称"></el-table-column>
						<el-table-column prop="contact" header-align="center" align="center" label="企业联系人" width="300"></el-table-column>
						<el-table-column prop="mobile" header-align="center" align="center" label="联系电话"></el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="企业信息">
							<template slot-scope="scope">
								<el-button size="small" @click="firm(scope.$index, scope.row.company_id)">查看</el-button>
							</template>
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
	import { companyAllLists } from '../../api/api.js';
	export default {

		data() {
			return {
				//接收数据
				list: null,
				total: 0,
				loading: false,
				//发送数据
				listQuery: {
					page: 1,
					keyword: ''
				},

			}
		},
		created() {

			this.getList()
		},
		methods: {
			//获取数据
			getList() {
				this.loading = true
				companyAllLists(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.loading = false
							console.log(data)
							//							console.log('res', res)
							this.list = res.data.data
							this.total = data.total
						}
					})
			},
			//查看企业信息
			firm(index, id) {
				console.log(index, id)
				this.$router.push({
					name: '公司信息',
					params: {
						id: id
					}
				})
			},
			//直播管理
			live(index, id) {
				console.log(index, id)
				this.$router.push({
					name: '企业信息',
					params: {
						id: id
					}
				})
			},
			//组织架构
			tissue(index, id) {
				console.log(index, id)
				this.$router.push({
					name: '组织架构',
					params: {
						id: id
					}
				})
			},
			//搜索
			handleFilter() {
				this.getList()
			},
			//分页
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
	.block {
		margin: 50px 30px 0 0;
	}
	
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
	
	.bg-table {
		margin-top: 20px;
	}
	
	.list-btn {
		button {
			width: 100px;
			height: 34px;
			border-radius: 30px;
			outline: none;
			color: #fff;
			border: none;
			cursor: pointer;
		}
		.demo {
			background: rgba(111, 192, 86, 1)
		}
	}
</style>