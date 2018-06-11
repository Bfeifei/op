<template>
	<div>
		<!--头部-->
		<!--<el-row>
			<el-col :span="24" class="log">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">企业管理</el-button><i class="el-icon-arrow-right"></i>企业信息
				</div>
			</el-col>
		</el-row>-->
		<!--表格-->
	
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="企业信息" name="first">
				<el-row>
					<el-col :span="20">
						<div class="bg-table">
							<div v-show="!ok">
								<div class="headline">
									<span>企业信息</span>
									<el-button round @click="amend">修改</el-button>
								</div>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">企业id</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_id}}</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">企业名称</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_name}}</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">企业地址</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_addr}}</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">所属行业</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_industry_name}}</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">帐号数量</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.use_num}}</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">已使用账号数量</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.use_num_user}}</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">注册日期</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_created_at}}</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">联系人姓名</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_contact}}</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">联系人手机</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_mobile}}</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">联系人邮箱</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_email}}</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">备注</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">{{table.company_description}}</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple"></div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light"></div>
									</el-col>
								</el-row>
							</div>

							<!--修改-->
							<div v-show="ok">
								<div class="headline">
									<span>企业信息</span>
									<el-button round @click="submit">提交</el-button>
								</div>

								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">企业id</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											{{table_one.company_id}}
										</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">企业名称</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.company_name" clearable></el-input>
											<!--<input type="text" placeholder="请输入内容" v-model="table_one.company_name" style = 'outline:none;/>-->
											<!--<input  placeholder="请输入内容" v-model="table_one.company_name" type="text"  />-->
										</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">企业地址</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.company_addr" clearable></el-input>
										</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">所属行业</div>
									</el-col>
									<el-col class="text">
										<el-cascader :options="list" @change="handleChange" :props="props" style="width:100%;"></el-cascader>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">帐号数量</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.use_num" clearable></el-input>
										</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">已使用账号数量</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light"></div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">注册日期</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light"></div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">联系人姓名</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.company_contact" clearable></el-input>
										</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">联系人手机</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.mobile" clearable></el-input>
										</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple">联系人邮箱</div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.contact_email" clearable class='aaa'></el-input>
										</div>
									</el-col>
								</el-row>
								<el-row class="t-tile">
									<el-col class="title">
										<div class="grid-content bg-purple">备注</div>
									</el-col>
									<el-col class="text">

										<div class="grid-content bg-purple-light">
											<el-input placeholder="请输入内容" v-model="table_one.company_description" clearable></el-input>
										</div>
									</el-col>

									<el-col class="title">
										<div class="grid-content bg-purple"></div>
									</el-col>
									<el-col class="text">
										<div class="grid-content bg-purple-light"></div>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>
				</el-row>
				<!--停用企业-->
				<el-row>
					<el-col :span="20">
						<div class="stop">
							<el-button size="small" @click="handleDelete" v-text='table.is_use==0?btn.val1:btn.val2'></el-button>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="账号管理" name="second">
				<!--账号管理start-->

				<el-row :gutter="20">
					<el-col :span="24">
						<div class="deadline">
							<span>帐号使用数量</span>
						</div>
					</el-col>
					<el-col :span="20" :offset="2">
						<div class="table_center">
							<table class="toTable">
								<tr>
									<td>账号使用数量</td>
								</tr>
								<tr>
									<td>已使用数量</td>
								</tr>

							</table>
							<table class="toTable toTable2">
								<tr>
									<td>999</td>
								</tr>
								<tr>
									<td>32</td>
								</tr>

							</table>
						</div>
						<el-col :span="4">
							<div class="block">
								<el-button type="primary" round class='toButton'>主要按钮</el-button>

							</div>
						</el-col>

					</el-col>

					<!--帐号使用期限-->
					<el-col :span="24">
						<div class="deadline">
							<span>帐号使用期限</span>
						</div>
					</el-col>
					<el-col :span="24">

						<div class="search" v-show="!state">
							<el-col :span="6">
								<div class="block">
									<el-date-picker v-model="value1" type="date" placeholder="开始日期" @change="time"></el-date-picker>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="block">
									<el-date-picker v-model="value2" type="date" placeholder="结束日期" @change="time_1"></el-date-picker>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="block">
									<el-button type="primary" @click="modification" class='toButton'>修改</el-button>
								</div>
							</el-col>
						</div>

						<!--修改-->

						<div class="search" v-show="state">
							<el-col :span="6">
								<div class="block">
									<el-date-picker v-model="value3" type="date" placeholder="开始日期" @change="state_time"></el-date-picker>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="block">
									<el-date-picker v-model="value4" type="date" placeholder="结束日期" @change="end_time"></el-date-picker>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="block">
									<el-button type="primary" @click="present" class='toButton'>提交</el-button>

								</div>
							</el-col>
						</div>
					</el-col>

				</el-row>

			</el-tab-pane>
			<el-tab-pane label="组织架构管理" name="third">
				<Department></Department>
			</el-tab-pane>
			<el-tab-pane label="直播管理" name="fourth">

				<!--直播管理 start-->
				<el-row :gutter="20">
					<el-col :span="24">
						<div class="deadline">
							<span>企业直播时长</span>
						</div>
					</el-col>
					<el-col :span="20" :offset="2">
						<div class="table_center">
							<table class="toTable">
								<tr>
									<td>企业直播时长</td>
								</tr>
								<tr>
									<td>剩余时长</td>
								</tr>

							</table>
							<table class="toTable toTable2">
								<tr>
									<td>999</td>
								</tr>
								<tr>
									<td>32</td>
								</tr>

							</table>
						</div>
						<el-col :span="4">
							<div class="block">
								<el-button type="primary" round class='toButton'>主要按钮</el-button>

							</div>
						</el-col>

					</el-col>

					<!--修改记录-->

					<el-col :span="24">
						<div class="deadline">
							<span>修改记录</span>
						</div>
						<el-table :data="tableData" border style="width: 100%">
							<el-table-column prop="date" label="日期" width="180" header-align="center" align="center">
							</el-table-column>
							<el-table-column prop="name" label="姓名" width="180" header-align="center" align="center">
							</el-table-column>
							<el-table-column prop="address" label="地址" header-align="center" align="center">
							</el-table-column>
						</el-table>
					</el-col>

				</el-row>

			</el-tab-pane>
		</el-tabs>

	</div>

</template>

<script>
	import { liveCompanyInfo, companyInfoEdit, getDropList, companyUseTime, companyUse } from '../../api/api';
	import Department from './firm-department.vue'
	export default {
		components: {
			Department,
			
		},
		data() {
			return {
				props: {
					value: 'industry_id',
					label: 'industry_name'
				},
				btn: {
					val1: '停用企业',
					val2: '恢复企业'
				},
				state: false,
				ok: false,
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				listQuery: {
					company_id: '',
					start_time: '',
					end_time: ''
				},
				table: {},
				table_one: {
					company_id: '',
					company_addr: '',
					industry_id: '',
					use_num: '',
					company_contact: '',
					mobile: '',
					contact_email: '',
					company_description: '',
					company_name: ''
				},
				list: [],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				activeName: 'first' //  tabs 默认显示name
			}
		},
		created() {
			this.getList();
			this.listQuery.company_id = this.$route.params.id;
		},
		methods: {
			handleClick(tab, event) {
				//console.log(tab, event);
			},
			//获取企业信息
			getList() {
				liveCompanyInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						console.log(res)
						if(code == 1000) {
							this.table = res.data
							this.value1 = data.use_start_date

							this.value2 = data.use_end_date

						}
					})
			},
			//返回上一级
			route() {
				this.$router.go(-1)
			},

			//信息修改
			amend() {
				this.ok = true;
				this.table_one.company_name = this.table.company_name
				this.table_one.company_addr = this.table.company_addr
				this.table_one.company_industry_name = this.table.company_industry_name
				this.table_one.use_num = this.table.use_num
				this.table_one.company_contact = this.table.company_contact
				this.table_one.mobile = this.table.company_mobile
				this.table_one.contact_email = this.table.company_email
				this.table_one.company_description = this.table.company_description
				this.table_one.company_id = this.listQuery.company_id;

				getDropList()
					.then(res => {
						const {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data || [];
						}
					})
			},
			//信息提交
			submit() {

				if(this.table_one.industry_id == '') {
					this.$message({
						message: '所属行业不能为空',
						type: 'warning'
					});
				} else {
					companyInfoEdit(this.table_one)
						.then(res => {
							const {
								code,
								info
							} = res;
							if(code == 1000) {
								this.ok = false;
								this.getList()
							}
						})
				}

			},
			//日期修改
			modification() {
				this.state = true;
			},
			//日期提交	
			present() {

				companyUseTime(this.listQuery)
					.then(res => {
						const {
							code,
							info
						} = res;

						if(code == 1000) {

							this.state = false;
						} else {
							console.log('操作失败')
						}
					})
			},

			//默认时间
			time(val) {
				//				this.value1 = this.table.use_start_date
				//				console.log(this.value1)
				this.listQuery.start_time = val

			},
			time_1(val) {
				this.listQuery.end_time = val

			},

			state_time(val) {
				this.listQuery.start_time = val
				console.log(time1)
			},
			end_time(val) {
				this.listQuery.end_time = val

			},
			handleChange(value) {
				this.table_one.industry_id = value[value.length - 1]
			},

			//停用企业
			handleDelete() {

				if(this.table.is_use == '0') {
					this.$confirm('此操作将停用该企业的一切操作, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						companyUse(this.listQuery)
							.then(res => {
								const {
									code,
									info
								} = res;
								if(code == 1000) {

									this.getList()
									this.$router.go(-1)
									this.$message({
										type: 'success',
										message: '停用企业成功!'
									})

								}
							})
					})
				} else if(this.table.is_use == '1') {
					this.$confirm('此操作将恢复该企业的一切操作, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						companyUse(this.listQuery)
							.then(res => {
								const {
									code,
									info
								} = res;
								if(code == 1000) {
									console.log('恢复企业')
									console.log('data', res)
									this.getList()
									this.$router.go(-1)
									this.$message({
										type: 'success',
										message: '恢复企业成功!'
									});
								}
							})
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.toTable {
		width: 200px;
		float: left;
		min-height: 30px;
		line-height: 30px;
		text-align: center;
		border-collapse: collapse;
		tr {
			border: 1px solid #000;
		}
		td {
			font-weight: normal
		}
	}
	
	.toTable2 {
		tr {
			border-left: 0px solid red;
		}
	}
	
	input {
		outline: none;
		border: none;
	}
	
	.search {
		margin: 40px 0 0 0;
	}
	
	.toButton {
		width: 100px;
		border-radius: 20px;
		background-color: #6fc056;
		border: 1px solid #6fc056;
		margin: 0 0 0 100px;
	}
	
	.deadline {
		margin: 10px 0 0 25px;
		span {
			float: left;
		}
	}
	
	.headline {
		margin: 10px 0 0 0;
		span {
			float: left;
		}
		button {
			width: 100px;
			margin: 0 0 10px 1100px;
			border-radius: 20px;
			background-color: #6fc056;
			color: #FFFFFF;
			border: 1px solid #6fc056;
		}
	}
	
	.bg-color {
		text-align: left;
		margin: 10px 10px 0;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.bg-table {
		position: relative;
		margin: 20px 30px;
		.t-tile {
			text-align: left;
			top: -1px;
			.title {
				width: 15%;
				display: inline-block;
				height: 40px;
				line-height: 40px;
				background-color: #ebebeb;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
			.text {
				width: 25%;
				display: inline-block;
				height: 40px;
				line-height: 40px;
				background-color: #ffffff;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
		}
	}
	
	.bg-purple {
		height: 60px;
	}
	
	.table_center {
		margin-top: 30px;
		width: 100%;
		height: auto;
		background: red;
	}
</style>