<template lang="html">
	<div class="">
		<el-row :gutter="0">
			<el-col :span="24">
				<el-col :span="24">
					<div class="grid-content bg-color">企业课库</div>
				</el-col>
				<!--<el-tabs v-model="activeName" @tab-click="handleClick" class="bg-color">
		    <el-tab-pane label="企业题库" name="first">-->
				<el-col class="bg-color">
					<div class="bg-nav">
						<div class="bg-left">
							<el-button class="successBtn">
								<a :href="handleUp" style="color: #FFF">下载excel</a>
							</el-button>
						</div>
						<div class="bg-right">
							<el-input @keyup.enter.native="handleFilter" placeholder="点击输入相关词汇进行搜索" v-model="listQuery.sname">
								<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
							</el-input>
						</div>
					</div>
					<div class="bg-table" v-show="!ShowBox">
						<el-table :data="list" v-loading="loading" element-loading-text="正在加载中" sortable="true" :sort-method="true" style="width: 100%">
							<el-table-column header-align="center" align="center" prop="cover" label="课程封面" width="180">
								<template slot-scope="scope">
									<img :src="scope.row.cover" alt="" class="el-img" />
								</template>
							</el-table-column>
							<el-table-column header-align="center" align="center" prop="course_lists_title" label="课程标题">
							</el-table-column>
							<el-table-column header-align="center" align="center" prop="categoryName" label="课程分类">
							</el-table-column>
							<el-table-column header-align="center" align="center" prop="intro" label="课程简介">
								<template slot-scope="scope">
									<div class="bg-cont">{{scope.row.intro}}</div>
									<div v-if="scope.row.intro.length > 40">
										<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id">
											{{scope.row.intro}}
										</el-popover>
										<el-button v-popover:popover1 type="text" class="bg-oper"></el-button>
									</div>
								</template>
							</el-table-column>
							<el-table-column header-align="center" align="center" prop="is_subject" label="是否有题库">
								<template slot-scope="scope">
									<span>{{scope.row.is_subject > 0 ? judge[0] : judge[1]}}</span>
								</template>
							</el-table-column>
							<el-table-column header-align="center" align="center" prop="is_subject" label="操作">
								<template slot-scope="scope">
									<div class="bg-operation" v-if="scope.row.is_subject == true">
										<el-button :plain="true" type="info" size="small" @click="Preview(scope.$index,scope.row.id)">预览</el-button>
										<el-button :plain="true" type="danger" size="small" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
									</div>
									<div class="bg-operation" v-else>
										<el-button :plain="true" type="info" size="small" @click="upload(scope.$index,scope.row.id,scope.row.course_lists_title)">上传</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>

						<div class="block" align="center">
							<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
							</el-pagination>
						</div>
					</div>

					<!--搜索-->
					<div class="bg-nav" v-show="ShowBox">
						<div class="">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span style="line-height: 36px;">搜索结果</span>
									<el-button style="float: right;" type="primary" @click="ShowBox=!ShowBox">隐藏搜索结果</el-button>
								</div>
								<div v-for="(o,key) in test" :key="key" class="text item" style="padding:10px 0;border-bottom: 1px solid #d1dbe5">
									<span class="v-test">{{key+1+"."}}{{o.q_title}} (<span v-text="tests[o.q_type - 1]"></span>)</span>
									<div class="v-testlist" v-if="o.q_type == 1 ? true : false">
										<el-radio-group v-model="o.answer">
											<ul>
												<li v-for="(i,key) in o.choice">
													<el-radio :label="key" :key="key">{{i}}</el-radio>
												</li>
											</ul>
										</el-radio-group>
									</div>
									<div class="v-testlist" v-if="o.q_type == 2 ? true : false">
										<el-checkbox-group v-model="o.answer">
											<ul>
												<li v-for="(i,key) in o.choice">
													<el-checkbox :label="key" :key="key">{{i}}</el-checkbox>
												</li>
											</ul>
										</el-checkbox-group>
									</div>
									<div class="v-testlist" v-if="o.q_type == 3 ? true : false">
										<el-radio-group v-model="o.answer">
											<ul>
												<li v-for="(i,key) in o.choice">
													<el-radio :label="key" :key="key">{{i}}</el-radio>
												</li>
											</ul>
										</el-radio-group>
									</div>
								</div>
							</el-card>
						</div>
						<div class="bg-right">

						</div>
					</div>

				</el-col>
				<!--</el-tab-pane>-->
				<!--<el-tab-pane label="个人题库" name="second">
		    	<div class="bg-nav">
			  		<div class="bg-left">
		  				
			  		</div>
			  		<div class="bg-right">
				  		
				  	</div>
			  	</div>
		    	<div class="bg-table">
			  		 
		  		</div>
		    </el-tab-pane>-->
				<!--</el-tabs>-->
			</el-col>
		</el-row>
	</div>
</template>

<script>
	//			        
	import bus from '../../store/event'
	import { ExamclassList, ExamclassSearch, ExamclassDelete, ExamclassDown, ExamclassDownfile } from '../../api/api'
	import store from '../../store/store'
	import * as types from '../../store/types'
	export default {
		data() {
			return {
				handleUp: '',
				//接收数据
				list: null,
				test: null,
				total: 0,
				updata: {
					course_list_id: undefined,
					course_lists_title: undefined
				},
				preview: {
					course_list_id: undefined
				},
				remove: {
					course_list_id: undefined

				},
				loading: true,
				data: {
					categoryId: '12',
					course_list_id: '21'
				},
				//发送数据
				listQuery: {
					pageSize: 10,
					page: 1,
					sname: undefined
				},
				tests: ['单选', '多选', '判断'],
				activeName: 'first',
				ShowBox: false,
				judge: ['是', '否']
			}
		},
		created() {
			this.getList();
			this.handleUp = ExamclassDownfile + "?token=" + store.state.token;
			//  	搜索不能为空/
			//  	listQuery.sname
		},
		watch: {
			lists: {
				handler(newVal, oldVal) {
					console.log('a')
				}
			}
		},
		methods: {
			Preview(index, Id) {
				this.preview.course_list_id = Id;
				window.sessionStorage.setItem('preview', JSON.stringify(this.preview.course_list_id))
				this.$router.push({
					name: '题库预览',
					params: {
						id: Id
					}
				})
			},
			upload(index, id, course_lists_title) {
				this.updata.course_list_id = id;
				this.updata.course_lists_title = course_lists_title;
				window.sessionStorage.setItem('upload', JSON.stringify(this.updata))
				this.$router.push({
					path: '/publice/testbank-upload',
					query: {
						selected: id
					}
				})
			},
			Choice(Id) {
				bus.$emit('Tell', Id)
				this.$router.push({
					name: '企业课程详情',
					params: {
						id: Id
					}
				})
			},
			getList() {
				this.loading = true
				ExamclassList(this.listQuery)
					.then(res => {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							this.loading = false
							this.total = data[0].total
							this.list = data[1]
						}
					})
			},
			handleFilter() {
				ExamclassSearch(this.listQuery)
					.then(res => {
						const {
							code,
							data,
							info
						} = res
						if(code == 1000) {
							//	      		this.test = data
							this.ShowBox = true
							for(let i = 0; i < data.length; i++) {
								data[i]["answer"] = [];
							}
							this.test = data
						}
					})
			},
			handleDelete(index, id) {
				this.remove.course_list_id = id;
				this.$confirm('此操作将永久删除该题库, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					ExamclassDelete(this.remove)
						.then(res => {
							this.loading = true
							this.list = null;
							const {
								code
							} = res
							if(code == 1000) {
								this.loading = false
								this.remove.subject = false;
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.list = null;
							}
							if(this.list == null) {
								this.getList()
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSizeChange(page) {
				this.listQuery.page = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getList()
			},
			handleClick(tab, event) {
				//	        console.log(tab, event);
			},
			filtersMethod(value, row) {
				//			console.log(value,row)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid-content {
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #ececeb;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		padding: 15px 0 15px 20px;
	}
	
	.bg-color {
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		.bg-nav {
			overflow: hidden;
			background-color: #FFF;
			padding: 15px 20px;
			.bg-left {
				float: left;
				>button {
					color: #FFF;
					background: #6fc056 !important;
					border-color: #6fc056;
					&:hover,
					&:active {
						background: #6fc056 !important;
						border-color: #6fc056;
					}
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
				.el-form-item {
					margin-bottom: 0;
				}
			}
		}
		.el-tabs__header {
			margin: 0;
		}
		.bg-table {
			padding: 0 20px;
			background-color: #FFF !important;
			.el-pagin {
				margin: 20px 0;
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
		}
		.cell {
			.el-img {
				height: 80px;
				background-color: #ebebeb;
			}
		}
	}
	
	.cell {
		.bg-operation {
			width: 150px;
			display: flex;
			margin: 0 auto;
			button {
				width: 60px;
			}
		}
	}
	
	.cell {
		.bg-cont {
			width: 100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			float: left;
		}
		.bg-oper {
			width: 100%;
			height: 40px;
			position: absolute;
			float: left;
			margin: 9px 0 0 20px;
		}
		button {
			display: block;
			width: 200px;
			>span {
				display: inline-block;
				color: #1f2d3d !important;
				width: 200px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				float: left;
			}
		}
	}
	
	.cell {
		.bg-title {
			width: 100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			float: left;
		}
		.bg-oper {
			height: 40px;
			position: absolute;
			float: left;
			margin: 9px 0 0 5px;
		}
		button {
			width: 100px;
			display: block;
			margin: 0 auto;
			>span {
				display: inline-block;
				color: #1f2d3d !important;
				width: 200px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				float: left;
			}
		}
	}
	
	.v-test {
		height: 40px;
		margin: 5px 0;
		display: block;
		>span {
			margin: 0 10px;
		}
	}
	
	.v-testlist {
		margin: 5px 0;
		display: block;
		>span {
			margin: 0 10px;
		}
	}
	
	.el-table__body {
		.el-table__row {
			height: 100px;
		}
	}
</style>