<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">企课新闻</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<el-button class="successBtn" @click="handleAdd">发布新闻</el-button>
						<el-button @click="Drafts" class="successBtn">草稿箱</el-button>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关新闻" v-model="listQuery.keywords">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
						<el-table-column prop="news_cover" label="新闻封面" header-align="center" align="center" width="140">
							<template slot-scope="scope">
								<img :src="scope.row.news_cover" alt="" style="height:80px;" />
							</template>
						</el-table-column>
						<el-table-column prop="news_title" label="新闻标题" header-align="center" align="center" width="220">
							<template slot-scope="scope">
								<el-button type="text" @click="newsDetails(scope.row.id)">{{scope.row.news_title}}</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="news_content" header-align="center" align="center" label="新闻内容">
							<template slot-scope="scope">
								<div class="bg-title">
									<div v-if="scope.row.news_content.length > 9">
										<el-popover ref="popover2" placement="bottom" width="180" trigger="hover" :key="scope.row.id" v-html="scope.row.news_content">

										</el-popover>
										<el-button v-popover:popover2 type="text" class="bg-color">
											<span v-html="scope.row.news_content"></span>
										</el-button>
									</div>
									<div v-else>
										<span v-html="scope.row.news_content">
							  	</span>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="publisher_name" header-align="center" align="center" label="发布人">
						</el-table-column>
						<el-table-column prop="publisher_time" header-align="center" align="center" label="发布时间">
						</el-table-column>
						<el-table-column prop="video_look_num" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="Remove(scope.$index,scope.row.id)">删除</el-button>
								<el-button type="text" @click="Editor(scope.row.id)">编辑</el-button>
							</template>
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
	import { officialNewslist, officialDel } from '../../api/api.js';
	import store from '@/store/store';
	import * as types from '@/store/types';
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
					pageSize: 10,
					keywords: undefined,
					flag: 2
				}
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handleAdd() {
				this.$router.push({
					path: '/publice/news-list/news-release'
				})
			},
			//获取数据
			getList() {
				this.loading = true
				officialNewslist(this.listQuery)
					.then(res => {
						let {
							code,
							data,
							count
						} = res;
						if(code == '1000') {
							this.list = data[1]
							this.total = data[0].total
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
			newsDetails(Id) {
				let list = {
					'id': Id,
					'flag': this.listQuery.flag
				}
				store.commit(types.LISTQUERY, list)
				this.$router.push({
					path: '/publice/news-list/news-details'
				})
			},
			Drafts() {
				this.$router.push({
					path: '/publice/news-list/news-drafts'
				})
			},
			Remove(index, Id) {
				this.$confirm('此操作将删除该新闻, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true
					officialDel({
							'id': Id
						})
						.then(res => {
							const {
								code,
								info
							} = res;
							if(code == 1000) {
								this.loading = false;
								this.list.splice(index, 1)
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleFilter() {
				this.listQuery.page = 1
				this.getList()
			},
			Editor(Id) {
				let list = {
					'id': Id,
					'flag': this.listQuery.flag
				}
				store.commit(types.LISTEDITOR, list);
				this.$router.push({
					path: '/publice/news-list/news-editor'
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