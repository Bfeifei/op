<template>
	<div class="bg-a" v-loading.body="loading">
		<el-row>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">任务管理</div>
					</div>
					<!--搜索-->
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索企业或发布人姓名" v-model='listQuery.keyword'>
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>

				</div>
			</el-col>
		</el-row>
		<!--日历插件  start -->
		<el-row class="bg-time">
			<el-col :span="6">
				<div class="block">
					<span class="demonstration"></span>
					<el-date-picker v-model="value1" type="date" placeholder="开始日期" @change="time"></el-date-picker>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="block">
					<span class="demonstration"></span>
					<el-date-picker v-model="value2" type="date" placeholder="结束日期" @change="time_1"></el-date-picker>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="block">
					<el-button type="primary" @click="seek">搜索</el-button>
				</div>
			</el-col>
		</el-row>

		<el-row class="bg-table">
			<el-table :data="tableData" border>
				<el-table-column prop="add_date" label="发布时间" header-align="center" align="center"></el-table-column>
				<el-table-column prop="company_name" label="企业名称" header-align="center" align="center"></el-table-column>
				<el-table-column label="任务名称" header-align="center" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.task_title.length > 10">
							<el-popover ref="popover1" placement="bottom" width="200" trigger="hover" :key="scope.row.id">
								{{scope.row.task_title}}
							</el-popover>
							<el-button v-popover:popover1 type="text" class="bg-oper">{{scope.row.task_title}}</el-button>
						</div>
						<span v-else>
							<span>{{scope.row.task_title}}</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="task_type_name" label="任务类型" header-align="center" align="center"></el-table-column>
				<el-table-column prop="company_user_name" label="发布人姓名" header-align="center" align="center"></el-table-column>
				<el-table-column prop="phone" label="发布人手机" header-align="center" align="center"></el-table-column>
				<el-table-column header-align="center" align="center" label="任务详情">
					<template slot-scope="scope">
						<div v-if="scope.row.task_desc.length > 10">
							<el-popover ref="popover1" placement="bottom" width="200" trigger="hover" :key="scope.row.id">
								{{scope.row.task_desc}}
							</el-popover>
							<el-button v-popover:popover1 type="text" class="bg-oper">{{scope.row.task_desc}}</el-button>
						</div>
						<span v-else>
							<span>{{scope.row.task_desc}}</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="end_date" label="要求完成时间" header-align="center" align="center"></el-table-column>
				<el-table-column label="操作" header-align="center" align="center">
					<template slot-scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
						<el-button size="small" @click="handleDelete(scope.$index , scope.row.task_id , scope.row.is_delete)" v-text='scope.row.is_delete==0?btn.val1:btn.val2'></el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页start -->
			<el-col>
				<div class="block_1">
					<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { taskCompanyLists, taskDelete } from '../../api/api';
	export default {
		data() {
			return {
				btn: {
					type: '0',
					val1: '删除',
					val2: '恢复',
				},
				listQuery: {
					page: 1,
					keyword: '',
					start_date: '',
					end_date: ''
				},
				loading: true, //开始进入页面加载效果
				current_page: 0, //分页字段
				total: 0, //分页字段
				tableData: [], //列表数据集合
				//时间筛选
				value1: '',
				value2: ''
			}
		},
		//挂载之前进行获取表格数据列表
		created() {
			this.getList()
		},

		computed: {
			listCmputed: function() {
				return this.tableData;
			}
		},
		methods: {
			//1.获取列表数据
			getList() {
				this.loading = true
				taskCompanyLists(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.tableData = data.data
							this.total = data.total
							this.loading = false
						} else {
							this.loading = false
							this.$message({
								type: 'warning',
								message: info,
							})
						}
					})
			},
			time(val) {
				this.listQuery.start_date = val
				
			},
			time_1(val) {
				this.listQuery.end_date = val
			},
			seek() {
				this.getList()
			},
			//搜索功能
			handleFilter() {
				this.getList();
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

			//跳转学习还是工作
			handleEdit(index, row) {
				let name = row.task_type_name;
				let sid = row.task_id;
				let aid = row.task_id;
				console.log(sid)
				if(name == '学习任务') {
					this.$router.push({
						name: '学习详情',
						params: {
							id: sid
						}
					})
				} else if(name == '工作任务') {
					this.$router.push({
						name: '工作详情',
						params: {
							id: aid
						}
					})
				}
			},
			//删除
			handleDelete(index, row, isType) {
				let type = isType;
				//				console.log('赋值', type);
				if(type == '0') {
					this.delete(row)
				} else {
					this.restore(row)
				}
			},
			delete(row) {
				let data = {
					task_id: row
				};
				this.$confirm('此操作将删除此条数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					taskDelete(data)
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
					task_id: row
				};
				this.$confirm('此操作将恢复所删除的数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					taskDelete(data)
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
	.bg-oper {
		width: 100px;
		color: #000;
		display: block;
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 25px;
	}
	
	.bg-a {
		width: 96%;
		margin: 0 0 0 2%;
	}
	
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 6.5px 20px;
		.bg-left {
			float: left;
			margin: 10px 0 0 0;
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
		margin: 30px 0 0 0;
	}
	
	.block {
		margin-top: 30px;
		button {
			/*background: ;*/
			border: none;
		}
	}
	
	.block_1 {
		margin-top: 40px;
	}
</style>