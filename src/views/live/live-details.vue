<template>
	<div>
		<el-row>
			<el-col :span="24" class="particulars">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">直播列表</el-button><i class="el-icon-arrow-right"></i>直播详情</div>
			</el-col>
		</el-row>
		<el-row>

			<el-col :span="24">
				<div class="grid-content bg-purple-light">

					<div>
						<div class="message">直播信息</div>
						<div class="form">
							<table cellspacing="0" summary="测试表格" width="800" class="toTable">
								<tr>
									<td class="td_1">公司名称</td>
									<td>{{table.company_name}}</td>
								</tr>
								<tr>
									<td class="td_1">公司联系电话</td>
									<td>{{table.company_phone}}</td>
								</tr>
								<tr>
									<td class="td_1">员工姓名</td>
									<td>{{table.nickname}}</td>
								</tr>
								<tr>
									<td class="td_1">员工职位</td>
									<td>{{table.position}}</td>
								</tr>
								<tr>
									<td class="td_1">员工联系方式</td>
									<td>{{table.phone}}</td>
								</tr>
								<tr>
									<td class="td_1">开播时间</td>
									<td>{{table.start_date}}</td>
								</tr>
								<tr>
									<td class="td_1">在线人数</td>
									<td>{{table.online_number}}</td>
								</tr>
							</table>
						</div>
						<div class="grid-content bg-purple">
							<div class="interface">直播界面</div>
							<div class="interfaceimg">
								<div class="hello">
									<d-player ref="player" @play="play" :video="video" :contextmenu="contextmenu"></d-player>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="operation" style="float: left; margin: 50px 0 0 20px;">
					<span>直播操作</span>
				</div>
				<div class="btn">
					<el-row>
						<el-button type="success" round class="btn_1" @click="close">关闭直播</el-button>
						<el-button type="success" round class="btn_2" @click="banned">封禁员工</el-button>
					</el-row>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { liveInfo, liveClose, liveProhibition } from '../../api/api.js';
	import VueDPlayer from './VueDPlayerHls';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				video: {
					url: '',
					pic: 'http://img.qikevip.com/20180530153142_12911527665502.png',
					type: 'hls'
				},
				autoplay: true,
				player: null,
				contextmenu: [{
					text: 'GitHub',
					link: 'https://github.com/MoePlayer/vue-dplayer'
				}],

				chuan: {
					room: ''
				},
				listQuery: {
					live_id: '',
				},
				table: {}
			}
		},
		mounted() {

		},
		components: {
			'd-player': VueDPlayer
		},
		created() {
			this.listQuery.live_id = this.$route.params.id
			this.getList()
		},

		methods: {
			getList() {
				liveInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
						} = res;
						if(code == 1000) {
							this.user = res.data.user_is_prohibit
							this.table = res.data
							this.chuan.room = res.data.room

						}
					})
			},
			route() {
				this.$router.go(-1)
			},

			//关闭直播
			close() {
				this.$confirm('此操作将关闭正在进行的直播, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					liveClose(this.chuan)
						.then(res => {
							this.loading = true
							const {
								code,
								info,
								data
							} = res
							if(code == 1000) {
								this.loading = false
								this.getList()
								this.$message({
									type: 'success',
									message: '关闭成功!'
								});
								this.$router.go(-1)
							} else {
								this.$message({
									type: 'warning',
									message: info
								});
							}
						})
				})
			},

			//封禁员工
			banned() {
				this.$confirm('此操作将封禁员工的直播权限, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					liveProhibition(this.listQuery)
						.then(res => {
							this.loading = true
							const {
								code,
								info,
								data
							} = res
							if(code == 1000) {
								if(this.user == 1) {
									this.$message({
										type: 'success',
										message: '已被封禁过!'
									})
									this.$router.go(-1)
								} else {
									this.getList()
									this.$message({
										type: 'success',
										message: '封禁成功!'
									});
									this.$router.go(-1)
								}
							} else {
								this.$message({
									type: 'warning',
									message: info
								});
							}
						})
				})

			},
			play() {

			}
		},
		mounted() {

			console.log('mounted', this.video.url)

			this.player = this.$refs.player.dp;

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.toTable {
		border: 1px solid #ccc;
		td {
			border: 1px solid #ccc;
		}
	}
	
	.hello {
		width: 450px;
	}
	
	.particulars {
		border-bottom: 2px solid #ccc;
		text-align: left;
		margin: 13px 20px;
		font-size: 12pt;
		line-height: 35px;
		color: #222222;
	}
	
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		text-align: left;
		margin: 13px 20px;
		font-size: 12pt;
		line-height: 35px;
		color: #222222;
	}
	
	.bg-purple {
		width: 400px;
		margin-left: 30px;
		margin-top: 20px;
		.interface {
			text-align: left;
			color: #222222;
		}
		.interfaceimg {
			width: 350px;
			height: 600px;
			margin-top: 30px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.bg-purple-light {
		text-align: left;
		margin: 13px 20px;
		font-size: 12pt;
		line-height: 35px;
		color: #222222;
		.message {
			text-align: left;
			color: #222222;
		}
		.form {
			margin-top: 25px;
		}
	}
	
	td {
		height: 55px;
		text-align: center;
		border: 1px solid #ccc;
	}
	
	.btn {
		margin: 170px 250px 0 0;
	}
	
	.btn_1 {
		width: 100px;
		height: 35px;
		border-radius: 20px;
		background: #6FC056;
	}
	
	.btn_2 {
		width: 100px;
		height: 35px;
		border-radius: 20px;
		background: #6FC056;
	}
	
	.td_1 {
		background: #EBEBEB;
	}
</style>