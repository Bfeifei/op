<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">热门课程</div>
					</div>
					<div class="bg-right">
						<div class="el-right">
							<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关课程" v-model="listQuery.keywords">
								<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
							</el-input>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table :data="list" stripe style="width: 100%">
						<el-table-column prop="company" header-align="center" align="center" label="课程封面" width="180">
							<template slot-scope="scope">
								<img :src="scope.row.cover" alt="" style="height:60px" />
							</template>
						</el-table-column>
						<el-table-column prop="course_lists_title" header-align="center" align="center" label="课程标题" width="220">
							<template slot-scope="scope">
								<el-button type="text" @click="Choice(scope.row.id,scope.row.author_id,scope.row.is_hot)" class="el-pointer">{{ scope.row.course_lists_title }}</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="author_name" header-align="center" align="center" label="讲师">
						</el-table-column>
						<el-table-column prop="categoryName" header-align="center" align="center" label="课程分类">
						</el-table-column>
						<el-table-column prop="is_subject" header-align="center" align="center" label="是否有题库">
							<template slot-scope="scope">
								<span v-text="Number(scope.row.is_subject) ? '是':'否'"></span>
							</template>
						</el-table-column>
						<el-table-column prop="is_hot" header-align="center" align="center" width="200" label="是否热门">
							<template slot-scope="scope">
								<el-select v-model="scope.row._hot" size="small" class="el-sel" style="width: 332px" @change="hangdleChange(scope.row.id,scope.row._hot)">
									<el-option v-for="(item,key) in select" :label="item.sele" :value="item.sele" :key="key"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="course_sort" header-align="center" align="center" width="180" label="排序">
							<template slot-scope="scope">
								<!--<el-button size="mini" @click="show = !show">编辑</el-button>-->
								<!--<div v-show="show">-->
								<el-input v-model="scope.row.course_sort" size="small" @keyup.enter.native="handleCourse(scope.row.id,scope.row.course_sort,scope.$index)"></el-input>
								<!--</div>-->
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
	import store from '../../store/store';
	import * as types from '../../store/types'
	import { courseHotlist, courseSetsort, courseSethot } from '../../api/api'
	export default {
		data() {
			return {
				list: null,
				select: [{
					'sele': '是'
				}, {
					'sele': '否'
				}],
				listQuery: {
					page: 1,
					pageSize: 10,
					operation: undefined,
					keywords: undefined,
					id: undefined
				},
				listQuery2: {
					course_id: undefined,
					sort: undefined
				},
				total: 0,
				show: false
			}

		},
		watch: {
			tableData: {
				pernumber(newVal, oldVal) {
					console.log(newVal)
				}
			}
		},
		created() {
			this.getList()
		},
		methods: {
			hangdleChange(Id, pernumber) {
				pernumber == '是' ? pernumber = 1 : pernumber = 0;
				this.listQuery.id = Id
				courseSethot(this.listQuery)
					.then(res => {
						const {
							code,
							info
						} = res
						if(code == 1000) {
							this.$message({
								type: 'success',
								message: '取消热门成功'
							})
						}
					})
				this.listQuery.operation = pernumber
				this.getList()
			},
			Choice(Id, author, Choice) {
				Math.random() * 9000
				var num = Math.random() * 9000 + 1000;
				num = parseInt(num, 10);

				let letuer = {
					'id': Id,
					'author_id': author,
					'hot': Choice
				}
				store.commit(types.ID, letuer);
				this.$router.push({
					path: '/publice/popular-cour/popular-details',
					params: {
						id: '12'
					}
				})

			},
			//获取数据
			getList() {
				this.loading = true
				courseHotlist(this.listQuery)
					.then(res => {
						let {
							data,
							info,
							code
						} = res;
						if(code == 1000) {
							let List = data[1]

							this.total = data[0].total
							for(var v = 0; v < List.length; v++) {
								if(List[v].is_hot) {
									List[v]['_hot'] = '是'
								} else {
									List[v]['_hot'] = '否'
								}
							}
							this.list = List
							this.loading = false
						}
					})
			},
			handleCourse(id, sort, index) {
				this.listQuery2.course_id = this.list[index].id
				this.listQuery2.sort = sort
				courseSetsort(this.listQuery2)
					.then(res => {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							this.$message({
								type: 'success',
								message: info
							})
						} else {
							this.$message({
								type: 'warning',
								message: '排序数字不能为0!'
							})
						}
					})
				this.getList()
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
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			height: 43px;
			float: right;
			margin: 8px 0px 0 0;
			.el-right {
				float: left;
				button {
					padding: 10px !important;
					background-color: #222222 !important;
					border-radius: 0 10px 10px 0 !important;
				}
				.v-button {
					background-color: #FFF !important;
				}
			}
		}
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
		.el-table__row {
			.el-pointer {
				&:hover {
					cursor: pointer
				}
			}
		}
		.el-sel {
			width: 100px !important;
		}
	}
</style>