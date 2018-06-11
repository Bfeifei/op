<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">城市合伙人列表</div>

					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击输入相关词汇进行搜索" v-model="listQuery.keywords">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-nav grid-border">
					<div class="bg-left">
						<el-button type="primary" class="successBtn" @click="handleAdd">
							新增合伙人
							<!--<router-link tag="li" to="/publice/focal-position/upmap">新增合伙人</router-link>-->
						</el-button>
						<el-button type="primary" class="successBtn">
							<router-link tag="li" to="/publice/focal-position/upmap">添加区域</router-link>
						</el-button>
					</div>
					<div class="bg-right">

					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
						<el-table-column prop="position" header-align="center" align="center" label="管辖区域">
							<!--<template slot-scope="scope">
				       	<el-button type="text" class="el-pointer" @click="Details(scope.row.id)">{{ scope.row.name }}</el-button>
		      		  </template>-->
						</el-table-column>
						<el-table-column prop="name" header-align="center" align="center" width="170" label="企业合伙人名称">
							<template slot-scope="scope">
								<div class="bg-cont">{{scope.row.name}}</div>
								<div v-if="scope.row.name.length > 30">
									<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id">
										{{scope.row.name}}
									</el-popover>
									<el-button v-popover:popover1 type="text" class="bg-oper"></el-button>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="num" header-align="center" align="center" width="200" label="城市合伙人法人">
						</el-table-column>
						<el-table-column prop="courseName" header-align="center" align="center" label="合伙人联系人">
							<!--<template slot-scope="scope">
						  	<div class="bg-title">
							  	<div v-if="scope.row.courseName.length > 20">
							  		<el-popover
									  ref="popover2"
									  placement="bottom"
									  width="180"
									  trigger="hover"
									  :key="scope.row.author_id">
									  {{scope.row.courseName}}
								  </el-popover>
								  <el-button v-popover:popover2 type="text" class="bg-color">
								  	<span>{{scope.row.courseName}}</span>
								  </el-button>
							  	</div>
							  	<div v-else>
							  		<span>
								  		{{scope.row.courseName}}
								  	</span>
							  	</div>
						  	</div>
						</template>-->
						</el-table-column>
						<el-table-column prop="phone" header-align="center" align="center" label="联系电话">
						</el-table-column>
						<el-table-column prop="city-num" header-align="center" align="center" label="签单公司数量">
						</el-table-column>
						<el-table-column prop="play-num" header-align="center" align="center" label="已销售课程总数">
						</el-table-column>
						<el-table-column prop="play-pricy" header-align="center" align="center" label="总交易金额">
						</el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="成为合伙人时间">
						</el-table-column>
						<el-table-column prop="operation" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="Operation(scope.row.operation,scope.$index)" :class="!scope.row.operation ? 'true':'false'" v-text="disabled[scope.row.operation]"></el-button>
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
	//	import { authorList } from '../../api/api.js';
	export default {
		data() {
			return {
				//poctyle
				disabled: ['停用', '启动'],
				//接收数据
				list: [{
					'position': '石家庄',
					'name': '名称显示20字第20字符显示为...名称显示20字第20字符显示为...名称显示20字第20字符显示为...',
					'num': 'congm',
					'courseName': '123456789',
					'phone': '123456789',
					'city-num': '12',
					'play-num': '200',
					'play-pricy': '8900',
					'created_at': '2017-08-08',
					'operation': 0,
					'id': 1
				}, {
					'position': '保定',
					'name': '名称显示20字第20字符显示为...',
					'num': 'congm',
					'courseName': '123456789',
					'phone': '123456789',
					'city-num': '12',
					'play-num': '200',
					'play-pricy': '8900',
					'created_at': '2017-08-08',
					'operation': 1,
					'id': 2
				}],
				total: 0,
				loading: false,
				//发送数据
				listQuery: {
					page: 1,
					keywords: undefined
				},
				tableData: [{
					company_name: '赵老师',
					ification: '分类',
					number: '1',
					id: 'id1',
					course: '课程名称课程称课11111',
					time: '2017-08-01'
				}, {
					company_name: '胡老师',
					ification: '分类',
					number: '1',
					id: 'id2',
					course: '课程名称课程称课程名称程名称程名称',
					time: '2017-08-01'
				}, {
					company_name: '韩老师',
					ification: '分类',
					number: '1',
					id: 'id3',
					course: '课程名称课程称课程名称程名称程名称',
					time: '2017-08-01'
				}]
			}
		},
		created() {
			//		this.list = this.tableData
			this.getList()
		},
		methods: {
			handleAdd() {
				this.$router.push({
					path: '/publice/partner-list/partner-add'
				})
			},
			Operation(operation, index) {
				let readme = ['启动', '停用'];
				let choice = readme[this.list[index].operation];
				this.$confirm('是否' + choice + '该合伙人，停用后将禁止该合伙人全部功能?', '提示', {
					confirmButtonText: '确定停用',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '该合伙人功能已' + choice + ''
					});
					this.list[index].operation ? this.list[index].operation = 0 : this.list[index].operation = 1
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除该操作'
					});
				});

			},
			//		Details(id){
			////			this.$router.push({
			////				path: '/publice/lectur-system',
			////				params: { orderId:"1"}
			////			})
			//			Math.random()*9000
			//			var num = Math.random()*9000 + 1000;
			//			num = parseInt(num, 10);
			//			this.$router.push({name: '讲师详情', params:{ id: id+num }})
			//		},
			//获取数据
			getList() {
				////	      this.loading = true
				//	      authorList(this.listQuery)
				//	      .then(res => {
				//	      	let { code, info, data } = res;
				//	        if(code == 1000) {
				//	        	this.list = data[1]
				//	        	this.total = data[0].total
				//	        	this.listLoading = false
				//	        }
				//	      })
			},
			handleFilter() {
				//	      this.listQuery.page = 1
				//	       authorList(this.listQuery)
				//	      .then(res => {
				//	      	let { code, info, data } = res;
				//	        if(code == 1000) {
				//	        	this.list = data[1]
				//	        	this.total = data[0].search_total
				//	        	this.listLoading = false
				//	        }
				//	      })
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
	.true {
		color: #222;
	}
	
	.false {
		color: #6fc056;
	}
	
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
	
	.grid-border {
		border: none;
	}
	
	.bg-table {
		height: 500px;
		padding: 20px 20px;
		padding-top: 0;
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
			}
			button {
				display: block;
				width: 100%;
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
		.el-select {
			width: 120px;
			height: 36px;
		}
	}
	
	.el-img {
		min-width: 100px;
		min-height: 40px;
		background-color: #ebebeb;
		margin-top: 5px;
	}
</style>