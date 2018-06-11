<template>
	<div class="bg-nav">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px;">任务管理</el-button>
					<i class="el-icon-arrow-right"></i>
					<span>任务详情</span>
				</div>
			</el-col>
		</el-row>
		<!--任务信息表格start-->
		<el-row>
			<div class="information-table">
				<h3>任务信息</h3>
				<div class="bg-table">
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">任务标题</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.task_title}}</div>
						</el-col>
						<!--后面加-->
						<el-col class="title">
							<div class="grid-content bg-purple">企业名称</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.company_name}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">发布者姓名</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.nickname}}</div>
						</el-col>

						<!--后面加-->
						<el-col class="title">
							<div class="grid-content bg-purple">发布者手机</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.phone}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">发布时间</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.add_date}}</div>
						</el-col>

						<!--后面加-->
						<el-col class="title">
							<div class="grid-content bg-purple">要求完成时间</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.end_date}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">任务详情</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light" header-align="center" align="center">
								<table>
									<div v-if="length > 10">
										<el-popover ref="popover1" placement="bottom" width="300" trigger="hover">
											{{table.task_desc}}
										</el-popover>
										<el-button v-popover:popover1 type="text" class="oper">{{table.task_desc}}</el-button>
									</div>
									<span v-else>
											<span>{{table.task_desc}}</span>
									</span>
								</table>
							</div>

						</el-col>
						<!--后面加-->
						<el-col class="title">
							<div class="grid-content bg-purple"></div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
					</el-row>

				</div>

			</div>

			<!--信息 end-->

			<!--类型 start-->

			<div class="information-table">
				<h3>任务类型</h3>
				<div class="bg-table">
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">任务类型</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.task_type_name}}</div>
						</el-col>
						
						<el-col class="title">
							<div class="grid-content bg-purple"></div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">是否添加考题</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.is_answer_name}}</div>
						</el-col>

						<el-col class="title">
							<div class="grid-content bg-purple">是否添加完成进度</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.is_experience_name}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">是否添加成果汇报</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.is_plan_name}}</div>
						</el-col>

						<el-col class="title">
							<div class="grid-content bg-purple"></div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
					</el-row>
					<el-row class='tab-img'>
						<div class="tab-left">任务图片</div>
						<div class="tab-right">
							<div v-for="(item,index) in Img" class="img">
								<div class="img_1">
									<img :src="item.url" />
								</div>
							</div>
						</div>
					</el-row>
				</div>
			</div>

			<div class="aa">
				<h4>任务操作</h4>
				<el-button type="info" class="a" @click="Del">删除任务</el-button>
			</div>

			<!--类型 end-->

			<el-row class="bg-table information-table">
				<h3>任务员工</h3>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="nickname" label="员工姓名" header-align="center" align="center"></el-table-column>
					<el-table-column prop="position" label="员工职位" header-align="center" align="center"></el-table-column>
					<el-table-column prop="phone" label="员工手机" header-align="center" align="center"></el-table-column>
					<el-table-column prop="complete_date" label="员工完成时间" header-align="center" align="center"></el-table-column>
					<el-table-column prop="answer_rate" label="考题正确率" header-align="center" align="center"></el-table-column>
					<el-table-column pro="experience" label="完成进度" header-align="center" align="center"></el-table-column>
					<el-table-column label="成果汇报" header-align="center" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.plan.length > 10">
								<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id" class="aaa">
									{{scope.row.plan}}
								</el-popover>
								<el-button v-popover:popover1 type="text" class="oper">{{scope.row.plan}}</el-button>
							</div>
							<span v-else>
							<span>{{scope.row.plan}}</span>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="task_status_name" label="任务状态" header-align="center" align="center"></el-table-column>
					<el-table-column label="操作" header-align="center" align="center">
						<template slot-scope="scope">
							<el-button size="small" @click="handleEdit(scope.$index , scope.row.task_result_id , scope.row.is_delete)" v-text='scope.row.is_delete==0?btn.val1:btn.val2'></el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页start -->
				<el-col>
					<div class="block">
						<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		</el-row>
	</div>

</template>

<script>
	import { taskInfo, taskUsersList, taskDelete, taskDeleteUser } from '../../api/api';
	export default {
		data() {
			return {
				btn: {
					type: '0',
					val1: '删除数据',
					val2: '恢复数据',
				},
				table: {},
				listQuery: {
					task_id: '',
					page: 1
				},

				loading: true, //开始进入页面加载效果
				current_page: 0, //分页字段
				total: 0, //分页字段
				tableData: [], //列表数据集合
				value1: '',
				value2: '',
				length: '',
				Img: []
			}
		},

		created() {
			this.isId = this.$route.params.id
			this.listQuery.task_id = this.$route.params.id
			this.getList()
			this.setret()
		},
		computed: {
			listCmputed: function() {
				return this.tableData
			}
		},
		methods: {
			route() {
				this.$router.go(-1)
			},
			//1.开始获取列表数据
			getList() {
				this.loading = true
				taskInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == '1000') {
							this.table = res.data.task
							this.total = data.total
							//							console.log('res', res)
							this.loading = false
							this.length = res.data.task.task_desc.length
							this.Img = res.data.task.task_images_data
						} else {
							this.loading = false
							this.$message({
								type: 'warning',
								message: info,
							})
						}
					})
			},
			setret() {
				taskUsersList(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == '1000') {
							//							console.log('aaa', res)
							this.loading = false
							this.tableData = data.data
							this.total = data.total

						} else {
							this.loading = false
							this.$message({
								type: 'warning',
								message: info,

							})
						}
					})
			},
			handleEdit(index, row, isType) {
				let type = isType;
				//				console.log('赋值', type);
				if(type == '0') {
					this.delete(row)
				} else {
					this.restore(row)
					//					alert(2)
				}
			},
			delete(row) {
				let data = {
					task_result_id: row
				};
				//				console.log(data)
				this.$confirm('此操作将删除此条数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					taskDeleteUser(data)
						.then(res => {
							this.loading = true
							const {
								code,
								info
							} = res
							console.log(code)
							if(code == 1000) {
								this.loading = false
								this.getList()
								this.$router.go(-1)
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							} else {
								this.$message({
									type: 'warning',
									message: info
								});
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			restore(row) {
				let data = {
					task_result_id: row
				};
				this.$confirm('此操作将恢复所删除的数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					taskDeleteUser(data)
						.then(res => {
							this.loading = true
							const {
								code,
								info
							} = res
							if(code == 1000) {
								this.loading = false
								this.getList()
								this.$router.go(-1)
								this.$message({
									type: 'success',
									message: '恢复成功!'
								});
							} else {
								this.$message({
									type: 'warning',
									message: info
								});
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消恢复'
					})
				})
			},
			Del() {
				let _this = this;
				let dele = this.table.is_delete;
				console.log(dele)
				if(dele == 1) {
					this.$message({
						type: 'success',
						message: '此数据已被删除,无需再次删除!'
					})
					setTimeout(function() {
						_this.$router.go(-1)
					}, 2000)
				} else {
					let data = {
						task_id: this.table.task_id
					};
					console.log(data)
					this.$confirm('此操作将删除此数据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						taskDelete(data)
							.then(res => {
								const {
									code,
									data,
									info
								} = res
								if(code == 1000) {
									this.$message({
										type: 'success',
										message: '删除成功!'
									})
									this.$router.go(-1)
								} else {
									this.$message({
										type: 'warning',
										message: info
									});
								}
							})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				}
			},
			handleSizeChange(page) {
				this.listQuery.page = val
				this.getList()
			},
			handleCurrentChange(val) {
				//				alert(val)
				this.listQuery.page = val
				this.getList()
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.oper {
		width: 100px;
		color: #000;
		display: block;
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 7px 0 0 150px;
	}
	
	.bg-color {
		text-align: left;
		margin: 20px 0 0 20px;
	}
	
	.tab-img {
		width: 80%;
		height: 180px;
		position: relative;
		.tab-right {
			width: 81.2%;
			height: 100%;
			border-bottom: 1px solid #cccccc;
			border-right: 1px solid #cccccc;
			border-left: 1px solid #cccccc;
			border-top: 0.5px solid #CCCCCC;
			position: absolute;
			top: -1px;
			right: 0;
			display: flex;
			justify-content: space-around;
			img {
				width: 30%;
				height: 180px;
			}
		}
		.tab-left {
			width: 18.5%;
			height: 100%;
			border-bottom: 1px solid #cccccc;
			border-right: 1px solid #cccccc;
			border-left: 1px solid #cccccc;
			border-top: 0.5px solid #CCCCCC;
			background-color: #ebebeb;
			position: absolute;
			top: -1px;
			left: 0;
			line-height: 200px;
		}
	}
	
	.information-table {
		h3 {
			font-size: 15px;
			text-align: left;
			padding: 10px 20px;
		}
	}
	
	.bg-table {
		position: relative;
		margin: 20px 30px;
		.t-tile {
			text-align: left;
			top: -1px;
			.title {
				width: 15%;
				display: inline-block;
				height: 52px;
				line-height: 52px;
				background-color: #ebebeb;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
			.text {
				width: 25%;
				display: inline-block;
				height: 52px;
				line-height: 52px;
				background-color: #ffffff;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
		}
	}
	
	.a {
		margin: 20px;
		background: #ebebeb;
		border: none;
		color: black;
		text-align: left;
	}
	
	.aa {
		margin: 30px;
		font-size: 15px;
		text-align: left;
	}
	
	.oper {
		width: 100px;
		color: #000;
		display: block;
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 7px 0 0 0;
	}
</style>