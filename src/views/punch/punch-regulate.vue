<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">打卡管理</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<div>
			<el-row class="bg-time">
				<el-col :span="6">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker v-model="value1" type="date" placeholder="开始日期" @change="time"></el-date-picker>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker v-model="value2" type="date" placeholder="结束日期" @change="time_1" style="margin-left: -110px;"></el-date-picker>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="block">
						<el-button type="primary" @click="seek">搜索</el-button>
					</div>
				</el-col>
				<div class="id">
					<el-input @keyup.enter.native="enterprise" placeholder="点击搜索企业名称" v-model='listQuery.company_name'>
						<el-button slot="append" icon="search" @click="enterprise">搜索</el-button>
					</el-input>
				</div>
				<div class="id_1">
					<el-input @keyup.enter.native="name" placeholder="点击搜索员工姓名" v-model='listQuery.nickname'>
						<el-button slot="append" icon="search" @click="name">搜索</el-button>
					</el-input>
				</div>
			</el-row>
		</div>
		<!--列表-->
		<el-row class="bg-table">
			<el-table :data="tableData" border style="width: 95%; margin: 30px 0 0 2.5%;">
				<el-table-column prop="punch_time" label="打卡时间" header-align="center" align="center"></el-table-column>
				<el-table-column prop="company_id" label="企业id" header-align="center" align="center"></el-table-column>
				<el-table-column prop="company_name" label="企业名称" header-align="center" align="center"></el-table-column>
				<el-table-column prop="nickname" label="员工名称" header-align="center" align="center"></el-table-column>
				<el-table-column prop="location" label="打卡定位" header-align="center" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.location.length > 10">
							<el-popover ref="popover1" placement="bottom" width="200" trigger="hover" class="oper">
								{{scope.row.location}}
							</el-popover>
							<el-button v-popover:popover1 type="text" class="oper">{{scope.row.location}}</el-button>
						</div>
						<span v-else>
							<span>{{scope.row.location}}</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="description" label="备注" header-align="center" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.description.length > 10">
							<el-popover ref="popover1" placement="bottom" width="200" trigger="hover" class="oper">
								{{scope.row.description}}
							</el-popover>
							<el-button v-popover:popover1 type="text" class="oper">{{scope.row.description}}</el-button>
						</div>
						<span v-else>
							<span class="aa">123</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" header-align="center" align="center">
					<template slot-scope="scope">
						<el-button size="small" @click="examine(scope.$index, scope.row.user_id)">查看</el-button>
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
</template>

<script>
	import { cardShowclock } from '../../api/api'
	export default {
		data() {
			return {
				listQuery: {
					page: 1,
					keyword: '',
					nickname: '',
					startime: '',
					endtime: ''
				},
				loading: true, //开始进入页面加载效果
				current_page: 0, //分页字段
				total: 0, //分页字段
				tableData: [],
				value1: '',
				value2: ''
			}
		},
		//挂载之前进行获取表格数据列表
		created() {
			this.getList()
		},

		methods: {
			//1.获取列表数据
			getList() {
				cardShowclock(this.listQuery)
					.then(res => {
						const {
							code,
							info
						} = res;
						if(code == 1000) {
							this.tableData = res.data.data
							this.total = res.data.total
							console.log('aaa', res)
						}
					})
			},
			//日期搜索
			time(val) {
				this.listQuery.startime = val
				console.log(val)
			},
			time_1(val) {
				this.listQuery.endtime = val
				console.log(val)
			},
			seek() {
				this.getList()
			},
			//按名字搜索
			name() {
				this.getList();
			},
			//按企业搜索
			enterprise() {
				this.getList();
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
			//查看
			examine(index,id) {
				console.log(index,id)
				this.$router.push({
					name: '打卡详情',
					params: {
						id: id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.oper {
		width: 100px;
		color: #000;
		display: block;
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 7px 0 0 50px;
	}
	
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
	
	.block {
		margin-top: 30px;
		button {
			border: none;
			margin: 0 0 0 -300px;
		}
	}
	
	.id {
		width: 300px;
		height: 43px;
		margin: 30px 0px 0 -150px;
		float: left;
		button {
			padding: 10px !important;
			background-color: #222222;
			border-radius: 0 10px 10px 0 !important;
		}
	}
	
	.id_1 {
		width: 300px;
		height: 43px;
		margin: 30px 0px 0 15px;
		float: left;
		button {
			padding: 10px !important;
			background-color: #222222;
			border-radius: 0 10px 10px 0 !important;
		}
	}
	
	.demonstration {
		margin: 0 0 0 -50px;
	}
	
	.block_1 {
		margin-top: 30px;
	}
</style>