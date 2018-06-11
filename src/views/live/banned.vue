<template>
	<div>
		<el-row>
			<el-col :span="24" class="particulars">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">直播列表</el-button><i class="el-icon-arrow-right"></i>封禁列表</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
						<el-table-column prop="company_name" header-align="center" align="center" width="300" label="公司名称"></el-table-column>
						<el-table-column prop="company_nickname" header-align="center" align="center" width="170" label="员工姓名"></el-table-column>
						<el-table-column prop="company_position" header-align="center" align="center" width="170" label="员工职位"></el-table-column>
						<el-table-column prop="phone" header-align="center" align="center" width="200" label="员工手机号"> </el-table-column>
						<el-table-column prop="prohibition_date" header-align="center" align="center" label="封禁时间"></el-table-column>
						<el-table-column prop="prohibition_by_name" header-align="center" align="center" label="封禁人"></el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="btn(scope.$index, scope.row.company_user_id)">解封</el-button>
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
	import { liveProhibitionLists, liveRelieve } from '../../api/api.js';
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
					keywords: undefined
				},
			}
		},
		created() {
			this.getList()
		},
		methods: {
			//返回
			route() {
				this.$router.go(-1)
			},
			//获取数据
			getList() {
				//this.loading = true
				liveProhibitionLists(this.listQuery)
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
							// console.log('fengjin', res)
						}
					})
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
			//解封
			btn(index, id) {
				//				alert(id)
				let data = {
					company_user_id: id
				}

				this.$confirm('此操作将恢复被封禁的员工, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					liveRelieve(data)
						.then(res => {
							this.loading = true
							const {
								code,
								info
							} = res
							if(code == 1000) {
								this.loading = false
								this.getList()
								//								console.log('aa', res)
								console.log('res', data)
								this.$message({
									type: 'success',
									message: '解封成功!'
								});
								this.$router.go(-1)
							} else {
								this.$message({
									type: 'warning',
									message: info
								});
							}
						})
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.bg-table {
		height: 500px;
		padding: 20px 20px;
		background-color: #FFF !important;
	}
	
	.particulars {
		border-bottom: 2px solid #ECECEB;
		text-align: left;
		margin: 13px 20px;
		font-size: 12pt;
		line-height: 35px;
		color: #222222;
	}
</style>