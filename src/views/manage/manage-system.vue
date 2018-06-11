<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">企业信息管理</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<el-button class="successBtn" @click="handleAdd">
							新增
						</el-button>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关企业" v-model="listQuery.company_name">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
						<el-table-column prop="company_id" label="公司编号" header-align="center" align="center" width="140">
						</el-table-column>
						<el-table-column prop="company_name" label="公司名称" header-align="center" align="center" width="220">
						</el-table-column>
						<el-table-column prop="scale" header-align="center" align="center" label="公司规模">
						</el-table-column>
						<el-table-column prop="industry_name" header-align="center" align="center" label="所属行业">
							<template slot-scope="scope">
								<div class="bg-title">
									<div v-if="scope.row.industry_name.length > 9">
										<el-popover ref="popover2" placement="bottom" width="180" trigger="hover" :key="scope.row.id">
											{{scope.row.industry_name}}
										</el-popover>
										<el-button v-popover:popover2 type="text" class="bg-color">
											<span>{{scope.row.industry_name}}</span>
										</el-button>
									</div>
									<div v-else>
										<span>
							  		{{scope.row.industry_name}}
							  	</span>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="use_num" header-align="center" align="center" label="所选课程">
						</el-table-column>
						<el-table-column prop="video_play_num" header-align="center" align="center" label="使用人员数量">
						</el-table-column>
						<el-table-column prop="video_look_num" header-align="center" align="center" label="使用数/课程总数">
						</el-table-column>
						<el-table-column prop="mobile" header-align="center" align="center" label="联系方式">
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination class="el-pagin" layout=" prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import bus from '../../store/event'
	import { getUserListPage, getUserList } from '../../api/api.js';
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
		created() {
			this.getList()
		},
		methods: {
			handleAdd() {
				this.$router.push({
					path: '/publice/manage-new'
				})
			},
			//获取数据
			getList() {
				this.loading = true
				getUserList(this.listQuery)
					.then(res => {
						let {
							code,
							data,
							count
						} = res;
						if(code == '1000') {
							this.list = data.data
							this.total = data.count || data.total
							this.loading = false
						}
						if(code == 1001) {
							this.$notify.error({
								title: '错误',
								message: '请尝试接通网络'
							});
						}
					})
			},
			handleFilter() {
				this.listQuery.page = 1
				getUserList(this.listQuery)
					.then(res => {
						let {
							code,
							data,
							count
						} = res;
						if(code == '1000') {
							this.list = data.data
							this.loading = false

							if(data.data.length == 0) {
								this.total = 1
							} else {
								this.total = data.count || data.total
							}
						}
						if(code == 1001) {
							this.$notify.error({
								title: '错误',
								message: '请尝试接通网络'
							});
						}
					})

			},
			handleSizeChange(val) {
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

<style lang="scss" scoped>
	.bg-color {
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #ececeb;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		padding: 15px 0 15px 20px;
	}
	
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		padding: 15px 20px;
		.bg-left {
			float: left;
		}
		.bg-right {
			width: 300px;
			float: right;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
			.el-form-item {
				margin-bottom: 0;
			}
		}
	}
	
	.bg-table {
		display: block;
		padding: 20px 20px;
		padding-top: 0;
		background-color: #FFF;
		.el-pagin {
			margin-top: 20px;
		}
		.cell {
			text-align: center;
			.bg-title {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				div {
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				button {
					margin: 0 auto;
					text-align: center;
					width: 90px;
					height: 20px;
					line-height: 20px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					span {
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
	}
</style>