<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">讲师申请列表</div>
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击输入相关词汇进行搜索" v-model="listQuery.keywords">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="bg-table">
					<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" border style="width: 100%">
						<el-table-column prop="company" header-align="center" align="center" width="170" label="企业名称">
							<template slot-scope="scope">
								<div class="bg-cont">{{scope.row.company}}</div>
								<div v-if="scope.row.name.length > 30">
									<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id">
										{{scope.row.company}}
									</el-popover>
									<el-button v-popover:popover1 type="text" class="bg-oper"></el-button>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="name" header-align="center" align="center" width="200" label="姓名"></el-table-column>
						<el-table-column prop="position" header-align="center" align="center" label="职位"></el-table-column>
						<el-table-column prop="phone" header-align="center" align="center" label="电话"></el-table-column>
						<el-table-column prop="created_at" header-align="center" align="center" label="申请时间"></el-table-column>
						<el-table-column prop="status" header-align="center" align="center" label="状态">
							<template slot-scope="scope">
								<span v-text="Number(scope.row.status)? '已处理' : '未处理'" />
							</template>
						</el-table-column>
						<el-table-column prop="operation" header-align="center" align="center" label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="Operation(scope.row.operation,scope.$index,scope.row.id)">详情</el-button>
								<el-button type="text" @click="Operation(scope.row.operation,scope.$index,scope.row.id)">删除</el-button>
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
	import { enterTeacherlist } from '../../api/api.js';
	import store from '@/store/store';
	import * as types from '@/store/types'
	export default {
		data() {
			return {
				//poctyle
				disabled: ['停用', '启动'],
				//接收数据
				list: [],
				total: 0,
				loading: false,
				//发送数据
				listQuery: {
					page: 1,
					pageSize: 10,
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
			Operation(operation, index, Id) {
				this.list[index].operation ? this.list[index].operation = 0 : this.list[index].operation = 1
				this.$router.push({
					path: '/publice/lectur-apply/lectur-details'
				})
				store.commit(types.OPERATION, Id)
			},
			//获取数据
			getList() {
				this.loading = true
				enterTeacherlist(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data[1]
							this.loading = false
							if(this.listQuery.keywords != undefined) {
								this.total = data[0].searchTotal
							} else {
								this.total = data[0].total
							}
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