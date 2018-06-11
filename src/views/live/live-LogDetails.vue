<template>
	<div>
		<el-row>
			<el-col :span="24" class="log">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">操作日志</el-button><i class="el-icon-arrow-right"></i>操作详情</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="information-table">
					<h3>操作详情</h3>
					<div class="bg-table">
						<el-row class="t-tile">
							<el-col class="title">
								<div class="grid-content bg-purple">操作人</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.realname}}</div>
							</el-col>
							<!--后面加-->
							<el-col class="title">
								<div class="grid-content bg-purple">操作时间</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.add_date}}</div>
							</el-col>
						</el-row>
						<el-row class="t-tile">
							<el-col class="title">
								<div class="grid-content bg-purple">公司名称</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.company_name}}</div>
							</el-col>

							<!--后面加-->
							<el-col class="title">
								<div class="grid-content bg-purple">公司联系电话</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.company_phone}}</div>
							</el-col>
						</el-row>
						<el-row class="t-tile">
							<el-col class="title">
								<div class="grid-content bg-purple">员工名称</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.nickname}}</div>
							</el-col>

							<!--后面加-->
							<el-col class="title">
								<div class="grid-content bg-purple">员工联系电话</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.phone}}</div>
							</el-col>
						</el-row>
						<el-row class="t-tile">
							<el-col class="title">
								<div class="grid-content bg-purple">员工职位</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.position}}</div>
							</el-col>

							<!--后面加-->
							<el-col class="title">
								<div class="grid-content bg-purple">操作行为</div>
							</el-col>
							<el-col class="text">
								<div class="grid-content bg-purple-light">{{table.log_type_name}}</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="photo">
					<span>添加照片</span>
					<form name="form2" id="form2">
						<p><input type="file" id="imgId" @change="upForm" multiple accept="image/jpg,image/jpeg,image/png,image/gif" placeholder="本地上传"></p>
					</form>
					<img v-if="state.log_images" :src="state.log_images" class="avatar">
				</div>
				<div class="remark">
					<span style="float: left;">添加备注</span>
					<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="state.log_description" class="ipt">
					</el-input>
				</div>
				<el-row>
					<el-button type="success" round class="succeed" @click="submit">提交</el-button>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	const formData = new FormData(); //一个方法
	import { liveLogInfo, uploadImages, liveLogEdit } from '../../api/api.js';
	export default {
		data() {
			return {
				//把图片和文字放到了一个json里面

				//必传的参数
				state: {
					live_log_id: '',
					log_images: '',
					log_description: ''
				},

				table: {},
				listQuery: {
					live_log_id: '',
					page: 1
				},
				table: []
			}
		},
		created() {
			this.listQuery.live_log_id = this.$route.params.id
			this.state.live_log_id = this.$route.params.id
			this.getList()
		},
		methods: {
			//获取数据
			getList() {
				this.loading = true
				liveLogInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
							total
						} = res;
						if(code == 1000) {
							this.table = res.data
							this.loading = false
							//进来就渲染ajax
							this.state.log_images = res.data.log_images;
							this.state.log_description = res.data.log_description;
//							console.log(res)

						} else {
							this.loading = false
							this.$message({
								type: 'warning',
								message: info,
							})
						}
					})
			},
			route() {
				this.$router.go(-1)
			},
			//图片上传
			upForm(event) {
				let file = event.target.files[0]; //获取当前文件
				formData.append('images', file) //把一个叫images的图片放到一个叫file的文件夹里
				//				console.log('huoqu', formData.get('images'))
				uploadImages(formData).then(res => {
					const {
						code,
						info,
						data
					} = res
					//					console.log(res)
					if(code == 1000) {
						this.state.log_images = data.images;
						this.$message({
							showClose: true,
							message: '恭喜你，图片上传成功',
							type: 'success'
						});
					} else {
						this.$message({
							showClose: true,
							message: '上传失败！',
							type: 'error'
						});
					}
				})
			},

			submit() {
				liveLogEdit(this.state)
					.then(res => {
						//						console.log('aa', this.state)
						let {
							code,
							info,
							data,
						} = res;
						//						console.log('res', res)
						if(code == 1000) {
							this.$message({
								type: 'success',
								message: '提交成功!'
							});
							this.$router.go(-1)

						} else {
							this.$message({
								type: 'success',
								message: '提交失败!'
							});
						}
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.avatar {
		width: 600px;
		height: 400px;
	}
	
	#form2 {
		margin: 20px 0 0 0;
	}
	
	.table {
		border: 1px red soild;
	}
	
	.information-table {
		h3 {
			font-size: 15px;
			text-align: left;
			padding: 10px 20px;
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
	
	.succeed {
		width: 120px;
		border-radius: 30px;
		margin: 50px 0 0 0;
		background: #6FC056;
	}
	
	.ipt {
		width: 50%;
		margin-top: 50px;
		margin-left: -20px;
	}
	
	.remark {
		text-align: left;
		margin-top: 30px;
		margin-left: 19px;
	}
	
	.log {
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
	}
	
	.photo {
		text-align: left;
		margin-left: 20px;
		margin-top: 50px;
		color: #222222;
	}
	
	.btn_1 {
		width: 120px;
		margin: 50px 0 0 800px;
		border-radius: 20px;
		background: #6FC056;
	}
</style>