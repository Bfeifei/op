<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">企业直播列表</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索公司名称" v-model='listQuery.keyword'>
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
				<div class="list-btn">
					<el-col :span='2'>
						<el-button class="btn" round @click="be">正在直播</el-button>
					</el-col>
					<el-col :span='4'>
						<el-button class="btn_1" round @click="be_1">全部直播</el-button>
					</el-col>
				</div>
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
						<el-table-column prop="company_name" header-align="center" align="center" width="300" label="公司名称">
							<template slot-scope="scope">
								<el-button type="text" class="el-pointer" @click="Details(scope.$index,scope.row.company_id)">{{ scope.row.company_name }}</el-button>
							</template>
						</el-table-column>

						<el-table-column prop="live_title" header-align="center" align="center" width="170" label="直播标题"></el-table-column>
						<el-table-column prop="live_user_name" header-align="center" align="center" width="170" label="员工名称"></el-table-column>

						<el-table-column prop="position" header-align="center" align="center" width="200" label="员工职位"></el-table-column>

						<el-table-column prop="online_number" header-align="center" align="center" label="在线人数"></el-table-column>
						<el-table-column prop="live_start_date" header-align="center" align="center" label="开播时间"></el-table-column>
						<el-table-column prop="live_status_name" header-align="center" align="center" width="200" label="状态"></el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="btn(scope.$index, scope.row.live_id)">详情</el-button>
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
	import { liveLists } from '../../api/api.js';
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
					pageSize: 10,
					keyword: undefined,
				},
			}
		},
		created() {
			this.getList()
		},
		methods: {
			Details(index, id) {
				//				console.log(index, id)
				this.$router.push({
					name: '企业信息',
					params: {
						id: id
					}
				})
			},
			btn(index, id) {
				//				console.log('aa', index, id)
				this.$router.push({
					name: '直播详情',
					params: {
						id: id
					}
				})
			},
			//获取数据
			getList() {
				this.loading = true
				//				console.log('aa', this.listQuery)
				liveLists(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data.data
							//							console.log('fff', res)
							this.loading = false
							this.total = res.data.total
						}
					})
			},
			handleFilter() {
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
			be() {
				this.$router.push({
					name: '正在直播'
				})
			},
			be_1() {
				this.$router.push({
					name: '全部直播'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		width: 100px;
		height: 36px;
		border-radius: 22px;
		margin: 20px 0 20px 0;
		line-height: 15px;
		background-color: #6fc056;
		color: #FFFFFF;
		border: none;
	}
	
	.btn_1 {
		border-radius: 22px;
		margin: 20px 0 20px 0;
		line-height: 15px;
		width: 100px;
		height: 36px;
	}
	
	.block {
		margin: 20px 0 0 0;
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
	/*.bg-table {
		height: 500px;
		padding: 20px 20px;
		background-color: #FFF !important;
	}*/
</style>