<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">直播管理</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关信息" v-model='listQuery.keyword'>
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
				<div class="list-btn">
					<el-col :span='2'>
						<el-button class="btn_2" round @click="be">正在直播</el-button>
					</el-col>
					<el-col :span='4'>
						<el-button class="btn" round @click="be_1">全部直播</el-button>
					</el-col>
					<el-col :span='4'>
						<el-button type="info" class="btn_1" round @click="banned">封禁列表</el-button>
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
						<el-table-column prop="live_user_name" header-align="center" align="center" width="170" label="员工姓名"></el-table-column>
						<el-table-column prop="position" header-align="center" align="center" width="170" label="员工职位"></el-table-column>
						<el-table-column prop="live_start_date" header-align="center" align="center" width="200" label="开播时间"> </el-table-column>
						<el-table-column prop="online_number" header-align="center" align="center" label="在线人数"></el-table-column>
						<el-table-column prop="use_time" header-align="center" align="center" label="直播时长"></el-table-column>
						<el-table-column prop="live_status_name" header-align="center" align="center" label="状态"></el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="btn(scope.$index , scope.row.live_id , scope.row.live_status_name)">详情</el-button>
								<el-button size="small" @click="handleDelete(scope.$index , scope.row.live_id , scope.row.is_delete)" v-text='scope.row.is_delete==0?bt.val1:bt.val2'></el-button>

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
	//	import store from '@/store/store'
	//	import * as types from '@/store/types'
	import { liveLists , liveDelete} from '../../api/api.js';
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
					keywords: undefined,
					type: 'all'
				},
				bt: {
					type: '0',
					val1: '删除',
					val2: '恢复'
				},

			}
		},
		created() {
			this.getList()
		},
		methods: {
			//获取数据
			getList() {
				//this.loading = true
				liveLists(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data.data
							this.total = res.data.total
							this.listLoading = false
							//							console.log(res)

						}
					})
			},
			//公司详情
			Details(index, id) {
				//				console.log(index, id)
				this.$router.push({
					name: '企业信息',
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
			},
			//跳转
			be() {
				this.$router.push({
					name: '正在直播'
				})
			},
			be_1() {
				this.$router.push({
					name: '全部直播'
				})
			},
			//详情
			btn(index, id, live_status_name) {
				//				console.log(index, id, live_status_name)
				if(live_status_name == '正在直播') {
					this.$router.push({
						name: '直播详情',
						params: {
							id: id
						}
					})
				} else if(live_status_name == '已经结束') {
					this.$router.push({
						name: '关闭详情',
						params: {
							id: id
						}
					})
				} else if(live_status_name == '关闭直播') {
					this.$router.push({
						name: '关闭详情',
						params: {
							id: id
						}
					})
				}
			},
			//封禁列表
			banned() {
				this.$router.push({
					name: '封禁列表',
				})
			},
			//删除
			handleDelete(index, row, isType) {
				let type = isType;
				console.log('赋值', type);
				if(type == '0') {
					this.delete(row)
				} else {
					this.restore(row)
				}
			},
			delete(row) {
				let data = {
					live_id: row
				};
				this.$confirm('此操作将删除此条数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					liveDelete(data)
						.then(res => {
							this.loading = true
							const {
								code,
								info
							} = res
							if(code == 1000) {
								this.loading = false
								this.getList()
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}
						})
				})
			},
			restore(row) {
				let data = {
					live_id: row
				};
				this.$confirm('此操作将恢复所删除的数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					liveDelete(data)
						.then(res => {
							this.loading = true
							const {
								code,
								info
							} = res
							if(code == 1000) {
								this.loading = false
								this.getList()
								this.$message({
									type: 'success',
									message: '恢复成功!'
								});
							}
						})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.block {
		margin: 20px 0 0 0;
	}
	
	.btn_1 {
		border-radius: 20px;
		margin: 20px 0 20px 100px;
		line-height: 15px;
		width: 100px;
		background-color: #6fc056;
		height: 36px;
		border: none;
		/*color: #FFFFFF;*/
	}
	
	.btn {
		height: 36px;
		border-radius: 22px;
		margin: 20px 0 20px 0;
		line-height: 15px;
		width: 100px;
		background-color: #6fc056;
		color: #FFFFFF;
		border: none;
	}
	
	.btn_2 {
		height: 36px;
		border-radius: 22px;
		margin: 20px 0 20px 0;
		line-height: 15px;
		width: 100px;
		/*background-color: #6fc056;*/
		/*color: #FFFFFF;*/
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
		.el-pagin {
			margin-top: 20px;
			text-align: center;
		}
		.el-table__row {
			.el-pointer {
				color: #666;
				transition: color 0.5s;
				&:hover {
					color: #4db3ff;
					cursor: pointer
				}
			}
		}
	}*/
</style>