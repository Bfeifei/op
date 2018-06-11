<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">
							<el-button type="text" @click="router" style="font-size: 16px">用户管理</el-button><i class="el-icon-arrow-right"></i>用户信息 {{this.listQuery.company_id}}
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<!--默认-->
			<div class="table" v-show="!ok">
				<span>任务类型</span>
				<el-button @click="tacitly">修改员工</el-button>
				<div class="bg-table">
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">企业id</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.company_id}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">企业名称</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.company_name}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">姓名</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.nickname}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">所属部门</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.org_name}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">职位</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.position}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">工号</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.job_id}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">手机</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.phone}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">邮箱</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.email}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">添加日期</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.created_at}}</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--修改-->
			<div class="table" v-show="ok">
				<span>任务类型</span>
				<el-button @click="submit">提交</el-button>
				<el-button @click="cancel">取消</el-button>
				<div class="bg-table">
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">企业id</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.company_id}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">企业名称</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.company_name}}</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">姓名</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">
								<el-input placeholder="请输入姓名" clearable v-model="dataurl.nickname"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">所属部门</div>
						</el-col>
						<el-col class="text">
							<el-cascader :options="options" change-on-select v-model="selectedOptions" @change="handleChange" :show-all-levels="false" :props="prop" style="width: 100%;">
							</el-cascader>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">职位</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">
								<el-input placeholder="请输入职位" clearable v-model="dataurl.position"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">工号</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">
								<el-input placeholder="请输入工号" clearable v-model="dataurl.job_id"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">手机</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">
								<el-input placeholder="请输入手机号" clearable v-model="dataurl.phone"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">邮箱</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">
								<el-input placeholder="请输入邮箱" clearable v-model="dataurl.email"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">添加日期</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.created_at}}</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--默认权限-->
			<div class="amend" v-show="!state">
				<span>员工权限</span>
				<el-button @click="amend">修改权限</el-button>
			</div>
			<!--修改权限-->
			<div class="sub" v-show="state">
				<div>
					<span>设置管理员身份</span>
					<el-button @click="sub">提交</el-button>
				</div>
				<div>
					<el-radio-group v-model="radio2" @change="radio">
						<el-radio :label="1" class="expert">高级管理员
							<p>*&nbsp;&nbsp;一个企业可以拥有多个高级管理员</br>
								</br>*&nbsp;&nbsp;高级管理员可以登录企业后台，拥有除分配管理员之外的所有权限。</p>
						</el-radio>
						<el-radio :label="2" class="common">普通管理员
							<p>*&nbsp;&nbsp;一个企业可以拥有多个普通管理员</br>
								</br>*&nbsp;&nbsp;普通管理员可以登录企课后台，拥有除发布任务分配课程以外的所有权限。</p>
						</el-radio>
						<el-radio :label="3" class="staff">普通员工
							<p>*&nbsp;&nbsp;员工不能登录后台</br>
								</br>*&nbsp;&nbsp;员工不能在APP发布任务，发布公告。</p>
						</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div>
				<el-button class="dele" @click="dele">删除员工</el-button>
			</div>
		</el-row>
	</div>
</template>

<script>
	import { userLook, orgListStructure, userSave } from '../../api/api'
	export default {
		data() {
			return {
				listQuery: {
					page: 1,
					keyword: '',
					company_user_id: ''
				},
				loading: true, //开始进入页面加载效果
				current_page: 0, //分页字段
				total: 0, //分页字段
				table: [],
				ok: false,
				state: false,
				radio2: '',
				list: [],
				dataurl: {
					company_user_id: '',
					organization_id: '',
					nickname: '',
					position: '',
					job_id: '',
					phone: '',
					email:''
				},
				prop: {
					children: 'child',
					value: 'id',
					label: 'name'
				},
				options: [],
				selectedOptions: []
			}
		},
		//挂载之前进行获取表格数据列表
		created() {
			this.listQuery.company_user_id = this.$route.params.id;
			this.getList()
		},
		methods: {
			//1.获取列表数据
			getList() {
				userLook(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.table = res.data
							this.dataurl.company_id = res.data.company_id
							this.dataurl.company_user_id = this.listQuery.company_user_id
						}
					})
			},
			//后退上一级
			router() {
				this.$router.go(-1)
			},
			//默认修改表格
			tacitly() {
				this.ok = true;
				this.dataurl.company_id = this.table.company_id
				this.dataurl.nickname = this.table.nickname
				this.dataurl.position = this.table.position
				this.dataurl.job_id = this.table.job_id
				this.dataurl.phone = this.table.phone
				this.dataurl.email = this.table.email
				orgListStructure(this.dataurl)
					.then(res => {
						let {
							code,
							info,
							data,
						} = res;
						if(code == 1000) {
							this.options = data;
						}
					})
			},
			//表格提交
			submit() {
				let _this = this;
				userSave(this.dataurl)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.ok = false;
							this.getList()
							this.$message({
								type: 'success',
								message: '提交成功!'
							})
						} else {
							this.$message({
								type: 'error',
								message: info
							})
						}
					})
			},
			//取消
			cancel() {
				this.ok = false;
			},
			//默认修改权限
			amend() {
				this.state = true;
			},
			//提交权限
			sub() {
				this.state = false;
			},
			//管理员
			radio(value) {
				console.log(value)
			},
			//删除员工
			dele() {
				alert('删除按钮')
			},
			handleChange(value) {
				let id = value[value.length - 1]
//				console.log('id', value)
				this.dataurl.organization_id = id
//				console.log(this.dataurl.organization_id)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.expert {
		display: block;
		margin: 10px 0 10px 15px;
	}
	
	.common {
		display: block;
		margin: 10px 0 10px 15px;
	}
	
	.staff {
		display: block;
	}
	
	.dele {
		width: 120px;
		border-radius: 20px;
		color: #FFFFFF;
		background-color: #6fc056;
		margin: 250px 0 0 0;
	}
	
	.radio {
		display: block;
		margin-top: 30px;
		p {
			width: 50px;
			height: 20px;
		}
	}
	
	.amend {
		text-align: left;
		margin: 0 0 0 20px;
		button {
			margin: 0 0 0 400px;
			width: 120px;
			border-radius: 20px;
			color: #FFFFFF;
			background-color: #6fc056;
			margin: 0 0 0 450px;
		}
	}
	
	.sub {
		text-align: left;
		margin: 0 0 0 20px;
		button {
			margin: 0 0 0 400px;
			width: 120px;
			border-radius: 20px;
			color: #FFFFFF;
			background-color: #6fc056;
			margin: 0 0 0 400px;
		}
		p {
			margin: 10px 0 0 15px;
		}
	}
	
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 6px 20px;
		.bg-left {
			float: left;
			margin: 10px 0 0 0;
			.bg-color {
				font-size: 16px;
				font-weight: 500;
				text-align: left;
				color: #222222;
				background-color: #FFFFFF;
			}
		}
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
				height: 38px;
				line-height: 38px;
				background-color: #ebebeb;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
			.text {
				width: 25%;
				display: inline-block;
				height: 38px;
				line-height: 38px;
				background-color: #ffffff;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
		}
	}
	
	.table {
		text-align: left;
		margin: 10px 0 5px 20px;
		button {
			width: 120px;
			border-radius: 20px;
			color: #FFFFFF;
			background-color: #6fc056;
			margin: 0 0 0 400px;
		}
	}
</style>