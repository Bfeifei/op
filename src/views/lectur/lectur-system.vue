<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">教师系统</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关老师" v-model="listQuery.keywords">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
						<el-table-column prop="name" header-align="center" align="center" width="300" label="讲师姓名">
							<template slot-scope="scope">
								<el-button type="text" class="el-pointer" @click="Details(scope.row.id)">{{ scope.row.name }}</el-button>
							</template>
						</el-table-column>
						
						<el-table-column prop="num" header-align="center" align="center" width="200" label="课程数量"></el-table-column>
						
						<el-table-column prop="created_at" header-align="center" align="center" label="入驻时间"></el-table-column>
							
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
	import { authorList } from '../../api/api.js';
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
				}
			}
		},
		created() {
			//		this.list = this.tableData
			this.getList()
		},
		methods: {
			Details(id) {
				Math.random() * 9000
				var num = Math.random() * 9000 + 1000;
				console.log(num)
				num = parseInt(num, 10);
				console.log(num)
				this.$router.push({
					name: '讲师详情',
					params: {
						id: id + num
					}
				})
			},
			//获取数据
			getList() {
				//	      this.loading = true
				authorList(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data[1]
							this.total = data[0].total
							console.log('res', res)
							this.listLoading = false
						}
					})
			},
			handleFilter() {
				this.listQuery.page = 1
				authorList(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data[1]
							this.total = data[0].search_total
							this.listLoading = false
						}
					})
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
	
	.bg-table {
		height: 500px;
		padding: 20px 20px;
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
			text-align: center;
			.bg-title {
				width: 260px;
				text-align: center;
				height: 35.99px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				div {
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				button {
					text-align: left;
					margin: 0 auto;
					text-align: center;
					width: 257px;
					height: 20px;
					line-height: 20px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					span {
						text-align: left;
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