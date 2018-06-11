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
				<div class="form">
					<table cellspacing="0" summary="测试表格" width="1200" style="border: 1px solid #CCCCCC;">
						<tr>
							<td class="td_1">公司名称</td>
							<td class="td_2">{{table.company_name}}</td>
							<td class="td_1">开播时间</td>
							<td class="td_2">{{table.start_date}}</td>
						</tr>
						<tr>
							<td class="td_1">公司联系电话</td>
							<td class="td_2">{{table.company_phone}}</td>
							<td class="td_1">在线人数</td>
							<td class="td_2">{{table. online_number }}</td>
						</tr>
						<tr>
							<td class="td_1">员工姓名</td>
							<td class="td_2">{{table.nickname}}</td>
							<td class="td_1">员工职位</td>
							<td class="td_2">{{table.position}}</td>
						</tr>
						<tr>
							<td class="td_1">直播时长</td>
							<td class="td_2">{{table.live_time}}</td>
							<td class="td_1">员工联系电话</td>
							<td class="td_2">{{table.phone}}</td>
						</tr>
					</table>
				</div>
				<div class="operation">
					<span>直播操作</span>
					<el-row>
						<el-button type="success" round class="btn_1" @click="banned">封禁员工</el-button>
					</el-row>
				</div>
				<!--视频回放-->
				<div class="video">
					<span>录播视频</span>
					<!--<el-button @click="remove">删除视频</el-button>-->
					<el-button class="button" size="small" @click="remove" v-text='table.is_video_store==0?btn.val2:btn.val1'></el-button>
					<div v-show="isTrue">
						<!--<video width="400" height="300" style="background: #CCCCCC;">
							<source :src="video" type="video/mp4"></source>
						</video>-->
						<video width="300" height="400" :src="video" controls="controls"></video>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import { liveInfo, liveProhibition, liveVideoDelete } from '../../api/api.js';
	export default {
		data() {
			return {
				table: {},
				listQuery: {
					live_id: ''
				},
				isTrue: true,
				video: '',
				btn: {
					val1: '删除视频',
					val2: '恢复视频'
				},
			}
		},
		created() {
			this.listQuery.live_id = this.$route.params.id
			this.getList()
		},
		methods: {
			//获取数据
			getList() {
				liveInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
//							console.log('res', res)
							this.table = res.data
							let save = res.data.is_video_store
							let receive = res.data.is_video_receive
							this.video = res.data.live_record.video_url
						}
					})
			},
			//跳转
			route() {
				this.$router.go(-1)
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
								this.loading = false
								this.getList()
								this.$message({
									type: 'success',
									message: '封禁成功!'
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
			//删除视频
			remove() {
				if(this.table.is_video_store == 0) {
					this.$confirm('此操作将恢复此视频, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						liveVideoDelete(this.listQuery)
							.then(res => {
								const {
									code,
									info
								} = res;
								if(code == 1000) {
//									console.log('data', res)
									this.$message({
										type: 'success',
										message: '恢复成功!'
									});
									this.$router.go(-1)
								}
							})
					})
				} else {
					this.$confirm('此操作将删除此视频, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						liveVideoDelete(this.listQuery)
							.then(res => {
								const {
									code,
									info
								} = res;
								if(code == 1000) {
//									console.log('data', res)
									this.$message({
										type: 'success',
										message: '删除成功!'
									});
									this.$router.go(-1)
								}
							})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		float: left;
		margin: 40px 0 0 0;
		span {
			float: left;
			margin: 0 0 0 20px;
		}
		button {
			width: 120px;
			background-color: #6FC056;
			color: #FFFFFF;
			border-radius: 20px;
			margin: 0 0 0 200px;
		}
		div {
			margin: 0 0 0 20px;
		}
	}
	
	.particulars {
		border-bottom: 2px solid #ECECEB;
		text-align: left;
		margin: 13px 20px;
		font-size: 12pt;
		color: #222222;
	}
	
	.form {
		margin-left: 20px;
		margin-top: 20px;
		td {
			height: 55px;
			text-align: center;
		}
	}
	
	.td_1 {
		background: #EBEBEB;
		border: 1px solid #CCCCCC;
	}
	
	.td_2 {
		border: 1px solid #CCCCCC;
	}
	
	.operation {
		text-align: left;
		margin-left: 20px;
		margin-top: 50px;
		color: #222222;
	}
	
	.btn_1 {
		width: 120px;
		margin: 20px 0 0 20px;
		border-radius: 20px;
		background: #6FC056;
	}
</style>