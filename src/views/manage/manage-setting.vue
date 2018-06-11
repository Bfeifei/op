<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">企业课程设定</div>
			</el-col>
			<el-col :span="24">
				<div class="el-had el-remo">
					<el-col :span="12">
						<div class="bg-left ">
							<img src="../../assets/img/sign_2.png" alt="" />
							<span>企业课程搜索</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="bg-right">
							<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关企业" v-model="listQuery.course_lists_title">
								<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
							</el-input>
						</div>
					</el-col>
				</div>
				<div class="el-tab">
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column label="课程封面" prop="cover" width="200" header-align="center" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.cover" alt="" class="img-customized" />
							</template>
						</el-table-column>
						<el-table-column prop="course_lists_title" header-align="center" align="center" label="课程标题">
						</el-table-column>
						<el-table-column prop="author_name" header-align="center" align="center" label="讲师">
						</el-table-column>
						<el-table-column prop="category_name" label="课程分类" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="intro" width="300" label="课程简介" header-align="center" align="center">
							<template slot-scope="scope">
								<div class="bg-title">
									<div v-if="scope.row.intro.length > 20">
										<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id">
											{{scope.row.intro}}
										</el-popover>
										<el-button v-popover:popover1 type="text" class="bg-oper">
											<span>{{scope.row.intro}}</span>
										</el-button>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" prop="time" header-align="center" align="center">
							<template slot-scope="scope">
								<el-button :plain="true" type="success" size="small" :key="scope.row.course_lists_id" @click="addList(scope.$index,scope.row.course_lists_id)">添加</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="el-had el-remo">
					<el-col :span="12">
						<div class="bg-left ">
							<img src="../../assets/img/sign_3.png" alt="" />
							<span>企业课程列表</span>
						</div>
					</el-col>
				</div>
				<div class="el-tab">
					<el-table :data="tableData2" stripe>
						<el-table-column label="课程封面" prop="cover" header-align="center" width="300" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.cover" alt="" class="img-customized" />
							</template>
						</el-table-column>
						<el-table-column prop="course_lists_title" header-align="center" align="center" label="课程标题">
						</el-table-column>
						<el-table-column prop="author_name" header-align="center" align="center" width="80" label="讲师">
						</el-table-column>
						<el-table-column prop="category_name" label="课程分类" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="intro" width="300" label="课程简介" header-align="center" align="center">
							<template slot-scope="scope">
								<div class="bg-title">
									<div v-if="scope.row.intro.length > 9">
										<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id">
											{{scope.row.intro}}
										</el-popover>
										<el-button v-popover:popover1 type="text" class="bg-oper">
											<span>{{scope.row.intro}}</span>
										</el-button>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="" header-align="center" align="center" label="购买学习人数">
							<template slot-scope="scope">
								<el-input-number v-model="listCmputed[scope.$index].learn_people" :min="0" :max="100000"></el-input-number>
							</template>
						</el-table-column>
						<el-table-column prop="price" label="价格" header-align="center" align="center">
						</el-table-column>
						<el-table-column label="操作" prop="" width="100" header-align="center" align="center">
							<template slot-scope="scope">
								<el-button :plain="true" type="warning" size="small" :key="scope.course_lists_id" @click="removeList(scope.$index,scope.course_lists_id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="el-had">
					<el-col :span="24">
						<el-form :label-position="labelPosition" label-width="120px" :model="formLabel" align="center" :inline="true" ref="formLabel">
							<div class="bg-left">
								<img src="../../assets/img/sign_1.png" alt="" />
								<span>录入公司课程信息</span>
							</div>
							<el-form-item label="公司编号:" class="el-fo" prop="company_id" min="0">
								<el-input v-model="formLabel.company_id"></el-input>
							</el-form-item>
							<el-form-item label="公司名称:" class="el-fo" prop="company_name">
								<el-input v-model="formLabel.company_name"></el-input>
							</el-form-item>
							<el-form-item label="总价:" class="el-fo" prop="price" min="0">
								<!--<el-input v-model="formLabel.price" :min="0" :max="100000"></el-input>-->
								<span style="width:257px;display:block; margin-left:20px;float:left; text-align:left">{{Price}}</span>
							</el-form-item>
							<el-form-item label="折扣:" class="el-fo" prop="discount_price" min="0">
								<el-input v-model="formLabel.discount_price" :min="0" :max="100000"></el-input>
							</el-form-item>
							<el-form-item label="销售人员:" class="el-fo" prop="" min="0">
								<el-input v-model="formLabel.sales_name"></el-input>
							</el-form-item>
							<el-form-item label="销售人员:" class="el-fo el-vis" prop="" min="0">
								<el-input type="text"></el-input>
							</el-form-item>
						</el-form>
					</el-col>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-foot">
					<el-button type="success" class="successBtn" @click="submitForm('formLabel')" :loading="loading">提交</el-button>
				</div>
			</el-col>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import { searchCour, createCompany } from '../../api/api.js';
	export default {
		data() {
			return {
				list: null,
				total: 0,
				loading: false,
				//发送数据
				listQuery: {
					course_lists_title: undefined
				},
				price: [],
				formLabel: {
					company_id: '',
					company_name: '',
					sales_name: '',
					price: '',
					discount_price: '',
					arr: null
				},
				tableData: [],
				tableData2: [],
				labelPosition: 'right',
				rules2: {
					account: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}, {
							min: 2,
							max: 25,
							message: '长度在 4 到 25 个字符'
						}, {
							pattern: /^\w{5,17}$/,
							message: '以字母开头，长度在6-18之间， 只能包含字符、数字和下划线'
						}
						//pattern: /^[\u4E00-\u9FA5]+$/,message: '用户名只能为中文'[a-zA-Z];
					],
					checkPass: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						min: 6,
						max: 30,
						message: '长度在 6 到 30 个字符'
					}, {
						pattern: /^(\w){6,20}$/,
						message: '只能输入6-20个字母、数字、下划线'
					}],
					checked: true
				}
			}
		},
		computed: {
			listCmputed: function() {
				return this.formLabel.arr
			},
			Price() {
				let _this = this;
				if(this.tableData2) {
					this.tableData2.forEach(function(e, key) {
						_this.tableData2[key]['Prices'] = e.price * _this.listCmputed[key].learn_people;
					})
					return this.tableData2.reduce((sum, value) => sum + value.Prices, 0)
				}
			}
		},
		updated() {
			//      	jscript code
			this.removerepeatattr();
			this.removeArray();
			let _this = this;
		},
		methods: {
			//解决重复数据
			removerepeatattr() {
				var tmp = {},
					b = [],
					a = this.tableData2;
				for(var i = 0; i < a.length; i++) {
					if(!tmp[a[i].course_lists_id]) {
						tmp[a[i].course_lists_id] = !0;
					} else {
						a.splice(i, 1);
					}
				}
			},
			removeArray() {
				var tmp = {},
					b = [],
					a = this.price;
				for(var i = 0; i < a.length; i++) {
					if(!tmp[a[i].course_lists_id]) {
						tmp[a[i].course_lists_id] = !0;
					} else {
						a.splice(i, 1);
					}
				}
			},
			//搜索
			handleFilter() {
				this.loading = true
				searchCour(this.listQuery)
					.then(res => {
						const {
							code,
							info,
							data,
							count
						} = res
						if(code == 1000) {
							this.tableData = data.data;
							this.total = data.count
							this.listQuery.page = 1
							this.loading = false;
						}
						if(code == 1001) {
							this.$message({
								message: '暂无数据',
								type: 'warning'
							});
						}

					})
			},
			handleSizeChange(page) {
				this.listQuery.page = val
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
			},
			addList(index, id) {
				//	    		play_num:'' 购买学习次数
				const List = {
					course_lists_id: id,
					learn_people: ''
				};
				this.tableData2.push(this.tableData[index])
				this.price.push(List);
				this.formLabel.arr = this.price;
			},
			removeList(index, id) {
				this.$confirm('确定删除吗？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.tableData2.splice(index, 1)
					this.price.splice(index, 1)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//提交
			submitForm() {
				this.loading = true
				//	    		console.log()
				this.formLabel.price = this.Price
				if(Number(this.formLabel.discount_price) < Number(this.formLabel.price)) {
					createCompany(this.formLabel)
						.then(res => {
							let {
								msg,
								info,
								code,
								user
							} = res;
							if(code == 1000) {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$router.push({
									path: '/publice/manage-list'
								})
							} else {
								this.loading = false
								this.$message({
									message: info,
									type: 'warning'
								});
							}
						})
				} else {
					this.loading = false
					this.$message({
						message: '折扣不能大于或者等于总价',
						type: 'warning'
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-vis {
		visibility: hidden;
	}
	
	.el-poinst:hover {
		cursor: pointer;
	}
	
	.el-fre {
		width: 60px !important;
	}
	
	.el-select-dropdown {
		min-width: 257px !important;
	}
	
	.el-fo {
		margin-left: 50px;
		margin-right: 100px;
		>.el-form-item__label {
			float: left;
		}
		>.el-form-item__content {
			float: left;
			margin-left: 0 !important;
		}
		.el-select {
			width: 257px;
			margin-left: 20px;
		}
	}
	
	.el-inp {
		.el-input {
			float: left;
			caret-color: #6fc056;
			width: 233px;
		}
	}
	
	.el-input {
		width: 257px;
		margin-left: 20px;
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	
	.el-form-item__label {
		width: 114px !important;
	}
	
	.bg-color {
		height: 35px;
		line-height: 35px;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding: 15px 0 15px 20px;
		border-bottom: 1px solid #ececeb;
	}
	
	.el-had {
		overflow: hidden;
		background-color: #FFF;
		padding: 15px 10px;
		color: #222222;
		margin-bottom: 15px;
		.bg-left {
			height: 22px;
			text-align: left;
			margin: 10px 0 20px 0;
			position: relative;
			>img {
				line-height: 22px;
				position: absolute;
				top: 3px;
			}
			>span {
				position: absolute;
				left: 24px;
			}
		}
		.bg-right {
			width: 300px;
			float: right;
			text-align: right;
			margin-top: 8px;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.el-remo {
		height: 44px;
		margin-bottom: 0;
	}
	
	.cell {
		.bg-title {
			button {
				span {
					color: #1f2d3d;
					text-align: left;
					width: 200px;
					height: 40px;
					line-height: 20px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: wrap;
					text-align: center;
				}
			}
		}
		>div:nth-child(2) {
			float: left;
		}
		.bg-oper {
			float: left;
			margin: 9px 0 0 5px;
		}
	}
	
	.el-tab {
		padding: 20px 20px;
		overflow: hidden;
		background-color: #FFF;
		color: #222222;
		.img-customized {
			height: 80px;
		}
		.el-pagin {
			margin-top: 20px;
			text-align: center;
		}
		.el-table__row {
			min-height: 70px !important;
			.el-pointer {
				&:hover {
					cursor: pointer
				}
			}
		}
	}
	
	.bg-foot {
		overflow: hidden;
		background-color: #FFF;
		color: #222222;
	}
</style>