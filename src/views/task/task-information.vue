<template>
	<div class="bg-a">
		<el-row>
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">
							<el-button type="text" @click="router" style="font-size: 16px">直播列表</el-button><i class="el-icon-arrow-right"></i>企业信息
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<div class="information-table">
			<h3>企业信息</h3>
			<div class="bg-table">
				<el-row class="t-tile">
					<el-col class="title">
						<div class="grid-content bg-purple">企业id</div>
					</el-col>
					<el-col class="text">
						<div class="grid-content bg-purple-light">{{table.company_id}}</div>
					</el-col>
					<!--后面加-->
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

					<!--后面加-->
					<el-col class="title">
						<div class="grid-content bg-purple">所属行业</div>
					</el-col>
					<el-col class="text">
						<div class="grid-content bg-purple-light">{{table.company_industry_name}}</div>
					</el-col>
				</el-row>
				<el-row class="t-tile">
					<el-col class="title">
						<div class="grid-content bg-purple">联系人姓名</div>
					</el-col>
					<el-col class="text">
						<div class="grid-content bg-purple-light">{{table.company_contact}}</div>
					</el-col>

					<!--后面加-->
					<el-col class="title">
						<div class="grid-content bg-purple">联系人手机</div>
					</el-col>
					<el-col class="text">
						<div class="grid-content bg-purple-light">{{table.company_mobile}}</div>
					</el-col>
				</el-row>
				<el-row class="t-tile">
					<el-col class="title ">
						<div class="grid-content bg-purple">联系人邮箱</div>
					</el-col>
					<el-col class="text">{{table.company_email}}</el-col>

					<!--后面加-->
					<el-col class="title">
						<div class="grid-content bg-purple">剩余直播时长</div>
					</el-col>
					<el-col class="text">
						<div class="grid-content bg-purple-light">{{table.surplus}}</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="set">
					<span>设置企业直播时间</span><input type="text" v-model="listQuery.hour" />
					<p>小时</p>
					<el-button @click="submit">提交</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="amend">
					<h3>修改记录</h3>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<template>
				<el-table :data="table1" style="width: 80%; margin-left: 22px;margin-top: 10px;">
					<el-table-column prop="add_date" label="日期" header-align="center" align="center">
					</el-table-column>
					<el-table-column prop="realname" label="操作人" header-align="center" align="center">
					</el-table-column>
					<el-table-column prop="hour" label="时长" header-align="center" align="center">
					</el-table-column>
				</el-table>
			</template>
		</el-row>
	</div>
</template>

<script>
	import { liveCompanyInfo, liveCompanyEdit, liveCompanyTimeLog } from '../../api/api.js';
	export default {
		data() {
			return {
				//接收数据
				table: [],
				table1: [],
				list: null,
				total: 0,
				loading: false,
				//发送数据
				listQuery: {
					company_id: '',
					hour: ''
				},
			}
		},
		created() {
			this.listQuery.company_id = this.$route.params.id
			this.getList();
			this.getData();
		},
		methods: {
			//获取数据
			getList() {
				liveCompanyInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info
						} = res;
						if(code == 1000) {
							this.table = res.data
						}
					})
			},
			//后退
			router() {
				this.$router.go(-1)
			},
			//添加时长按钮
			submit() {
				console.log('a', this.listQuery)
				liveCompanyEdit(this.listQuery)
					.then(res => {
						this.loading = true
						const {
							code,
							info
						} = res
						if(code == 1000) {
							this.getData()
							this.getList()
							this.$message({
								type: 'success',
								message: '添加成功!'
							});
						}
					})

			},
			getData() {
				liveCompanyTimeLog(this.listQuery)
					.then(res => {
						const {
							code,
							info
						} = res
						if(code == 1000) {
							//							console.log('huila', res.data.data)
							this.table1 = res.data.data
						}
					})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ipt {
		width: 150px;
		height: 20px;
	}
	
	.amend {
		text-align: left;
		margin: 50px 0 20px 23px;
	}
	
	.h3 {
		text-align: left;
		margin: 50px 0 0 23px;
		font-size: 14px;
	}
	
	.set {
		float: left;
		margin: 52px 0 0 23px;
		font-weight: bold;
		span {
			margin-right: 20px;
		}
		input {
			height: 20px;
			margin-right: 20px;
		}
		p {
			display: inline-block;
		}
		button {
			width: 90px;
			/*height: 30px;*/
			margin-left: 30px;
		}
	}
	
	.information-table {
		h3 {
			font-size: 15px;
			text-align: left;
			padding: 10px 0 0 20px;
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
				height: 52px;
				line-height: 52px;
				background-color: #ebebeb;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
			.text {
				width: 25%;
				display: inline-block;
				height: 52px;
				line-height: 52px;
				background-color: #ffffff;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
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
				height: 52px;
				line-height: 52px;
				background-color: #ebebeb;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
			.text {
				width: 25%;
				display: inline-block;
				height: 52px;
				line-height: 52px;
				background-color: #ffffff;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
		}
	}
</style>