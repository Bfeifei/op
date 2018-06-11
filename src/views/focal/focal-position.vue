<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">焦点位管理</div>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-nav grid-border">
					<div class="bg-left">
						<el-button type="primary" class="successBtn">
							<router-link tag="li" to="/publice/focal-position/upmap">上传</router-link>
						</el-button>
					</div>
					<div class="bg-right">

					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table :data="list" stripe v-loading="loading" element-loading-text="正在加载中" style="width: 100%">
						<el-table-column label="焦点图" header-align="center" align="center" prop width="220">
							<template slot-scope="scope">
								<img :src="scope.row.img" alt="" class="el-img" />
							</template>
						</el-table-column>
						<el-table-column prop="title" header-align="center" align="center" label="焦点图描述" width="180">
						</el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="上传时间">
						</el-table-column>
						<el-table-column label="是否上下架" header-align="center" align="center">
							<template slot-scope="scope">
								<span v-text="Number(scope.row.status) ? '上架' : '下架'"></span>
							</template>
						</el-table-column>
						<el-table-column header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="handleModify(scope.$index, scope.row.id)">修改</el-button>
								<el-button size="small" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
						<el-table-column width="100" type="index" header-align="center" align="center" prop="id" label="排序">
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<el-dialog title="修改信息" :visible.sync="dialogFormVisible" style="width:1000px; margin:200px auto">
					<el-form :model="form">
						<el-form-item label="焦点位描述" label-width="100px">
							<el-input v-model="form.title" auto-complete="off" placeholder="点击输入焦点图描述"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="Determine" class="successBtn">确 定</el-button>
					</div>
				</el-dialog>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import store from '@/store/store'
	import * as types from '@/store/types'
	import { gatherList, gatherDel } from '@/api/api'
	export default {
		data() {
			return {
				input: '',
				value: '',
				currentPage: 1,
				index: '',
				list: null,
				loading: true,
				dialogFormVisible: false,
				listQuery: {
					page: 1,
					title: undefined
				},
				total: 0,
				form: {
					title: ''
				}
			}
		},
		created() {
			this.getList()
		},
		methods: {
			//获取数据
			getList() {
				gatherList(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.list = data.data
							this.total = data.total
							this.loading = false
						} else {
							this.$notify({
								title: '警告',
								message: '请求失败',
								type: 'warning'
							});
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
			add(index, id) {
				console.log(index, id)
			},
			handleModify(index, id) {
				store.commit(types.TASK, id)
				this.$router.push({
					path: '/publice/focal-position/modify'
				})
			},
			Determine() {
				this.dialogFormVisible = false;
				if(this.form.title) {
					this.list[this.index].title = this.form.title
				}

			},
			handleDelete(index, Id) {
				let remove = {
					id: Id
				}
				let _this = this;
				console.log(index)
				this.$confirm('此操作将永久删除本条焦点图, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					gatherDel(remove)
						.then(res => {
							this.loading = true
							const {
								code,
								info
							} = res
							if(code == 1000) {
								this.loading = false
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								_this.list.splice(index, 1)
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
					});
				});
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
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 6.5px 20px;
		.bg-left {
			float: left;
			button {
				width: 90px;
				border-radius: 10px;
				color: #FFF;
				background: #6fc056 !important;
				border-color: #6fc056;
			}
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
			float: right;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.grid-border {
		border: none;
		padding: 20px 20px 0 20px;
	}
	
	.bg-table {
		padding: 20px 20px;
		background-color: #FFF !important;
		.el-pagin {
			margin-top: 20px;
		}
		.cell {
			text-align: center;
		}
		.el-select {
			width: 120px;
			height: 36px;
		}
	}
	
	.el-img {
		height: 80px;
	}
</style>