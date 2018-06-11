<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">用户管理</div>
					</div>
				</div>
			</el-col>
			<!--搜索-->
			<div class="search">
				<div class="id">
					<el-input placeholder="点击搜索企业id" v-model='listQuery.company_id'></el-input>
				</div>

				<div class="id">
					<el-input placeholder="点击搜索企业名称" v-model='listQuery.company_name'></el-input>
				</div>
				<div class="id">
					<el-input placeholder="点击搜索员工名字" v-model='listQuery.nickname'></el-input>
				</div>
				<div class="id">
					<el-input placeholder="点击搜索员工手机" v-model='listQuery.phone'>
						<el-button slot="append" icon="search" @click="phone">搜索</el-button>
					</el-input>
				</div>
			</div>
			<el-button @click="increase" class="increase">新增员工</el-button>
			<!--列表-->
			<div>
				<el-row class="bg-table">
					<el-table :data="tableData" border>
						<el-table-column prop="company_id" label="企业id" header-align="center" align="center"></el-table-column>
						<el-table-column prop="company_name" label="企业名称" header-align="center" align="center"></el-table-column>
						<el-table-column prop="nickname" label="员工姓名" header-align="center" align="center"></el-table-column>
						<el-table-column prop="phone" label="员工手机" header-align="center" align="center"></el-table-column>
						<el-table-column prop="role" label="员工权限" header-align="center" align="center"></el-table-column>
						<el-table-column label="操作" header-align="center" align="center">
							<template slot-scope="scope">
								<el-button size="small" @click="examine(scope.$index, scope.row.id)">查看</el-button>
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
		</el-row>
	</div>
</template>

<script>
	import { userShow } from '../../api/api';
	export default {
		data() {
			return {
				listQuery: {
					page: 1,
					pageSize: 10,
					company_id: '',
					phone: '',
					company_name: '',
					nickname: ''
				},
				loading: true, //开始进入页面加载效果
				total: 0, //分页字段
				tableData: []
			}
		},
		//挂载之前进行获取表格数据列表
		created() {
			this.getList()
		},

		methods: {
			//1.获取列表数据
			getList() {
				userShow(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							//							console.log('a',data.data)
							this.tableData = data.data
							this.total = data.total
						}
					})
			},
			//按员工手机修改
			phone() {
				this.getList();
			},

			handleEdit() {

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
			//跳转
			examine(index, id) {
//				console.log(index, id)
				this.$router.push({
					name: '员工信息',
					params: {
						id: id
					}
				})
			},
			//跳转到新增员工页面
			increase() {
				alert(1)
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
			margin: 10px 0 0 0;
			.bg-color {
				font-size: 16px;
				font-weight: 500;
				text-align: left;
				color: #222222;
				background-color: #FFF;
				padding: 0 0 10px 0px;
			}
		}
	}
	
	.search {
		float: left;
		/*background: red;*/
		margin: 10px 0 10px 27px;
		.id {
			width: 300px;
			height: 43px;
			margin: 8px 0px 0 15px;
			float: left;
			button {
				padding: 10px !important;
				background-color: #222222;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.increase {
		margin: 16px 0 0 20px;
		border-radius: 20px;
		width: 120px;
		background-color: #6fc056;
		color: #FFFFFF;
	}
	
	.bg-table {
		width: 95%;
		margin: 20px 0 0 2.5%;
	}
	
	.block_1 {
		margin: 30px 0 0 0;
	}
</style>