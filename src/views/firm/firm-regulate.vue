<template>
	<div>
		<el-row>
			<el-col :span="24" class="particulars">
				<!--<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">企业管理</el-button><i class="el-icon-arrow-right"></i>组织架构管理</div>
				<div class="bg-right">
					<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关视频">
						<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
					</el-input>
				</div>-->
				<div class="bg-nav">
					<div class="bg-left">
						<!--<div class="grid-content bg-color">企业直播列表</div>-->
						<el-button type="text" @click="route" style="font-size: 16px">企业管理</el-button><i class="el-icon-arrow-right"></i>组织架构管理
					</div>
					<div class="bg-right">
						<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关视频">
							<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
						</el-input>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-col :span="24">
			<div class="btn">
				<el-row>
					<el-button type="info" round class="btn_1">新增部门</el-button>
					<el-button type="info" round class="btn_2">新增员工</el-button>
					<el-button type="info" round class="btn_3">查看组织架构</el-button>
					<el-button type="info" round class="btn_4">修改部门</el-button>
				</el-row>
			</div>
		</el-col>
		<el-col :span="24">
			<div class="form">
				<el-table v-loading="loading" element-loading-text="正在加载中" :data="list" stripe style="width: 100%">
					<el-table-column prop="name" header-align="center" align="center" width="300" label="企业ID">
						<template slot-scope="scope">
							<el-button type="text" class="el-pointer" @click="Details(scope.row.id)">{{ scope.row.name }}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="categoryName" header-align="center" align="center" width="170" label="企业名称">
					</el-table-column>
					<el-table-column prop="num" header-align="center" align="center" width="200" label="企业联系人">
					</el-table-column>

					<el-table-column prop="num" header-align="center" align="center" label="联系电话">
					</el-table-column>
					<el-table-column prop="created_at" header-align="center" align="center" label="企业管理员姓名">
					</el-table-column>
					<el-table-column prop="num" header-align="center" align="center" label="管理员手机">
					</el-table-column>
					<el-table-column prop="created_at" header-align="center" align="center" label="组织架构管理">
						<template slot-scope="scope">
							<el-button size="small" @click="btn(scope.$index, scope.row.id)">查看</el-button>
						</template>
					</el-table-column>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
						<el-pagination class="el-pagin" layout="prev, pager, next" :total="Number(total)" :page-size="10" :current-page.sync="listQuery.page" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
		</el-col>

	</div>
</template>
<script>
	import store from '@/store/store'
	import * as types from '@/store/types'
	import { authorList } from '../../api/api.js';
	export default {

		data() {
			return {
				//接收数据
				list: null,
				total: 0,
				loading: false,
				msg: '',
				//发送数据
				listQuery: {
					page: 1,
					keywords: undefined
				},

			}
		},
		created() {
			//		this.list = this.tableData
			this.getList()
		},
		methods: {
			route() {
				this.$router.go(-1)
			},
			handleFilter() {

			},
			RemoveStyle() {

			},
			Details(id) {
				//			this.$router.push({
				//				path: '/publice/lectur-system',
				//				params: { orderId:"1"}
				//			})
				Math.random() * 9000
				var num = Math.random() * 9000 + 1000;
				num = parseInt(num, 10);
				this.$router.push({
					name: '讲师详情',
					params: {
						id: id + num
					}
				})
			},
			btn(index, id) {
//				store.commit(types.TASK, id)
//				this.$router.push({
//					path: '/publice/firmOrganization/firmRegulate'
//				})
				//				{ path: '/publice/focal-position/modify' }
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
.block{
	margin: 50px 0 0 0;
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
	
	.btn {
		float: right;
		margin: 40px 80px 0 0;
		button {
			background: #6FC056;
			border-radius: 20px;
			width: 120px;
		}
	}
	.form{
		width: 95%;
		margin: 50px 0 0 2.5%;
	}
</style>