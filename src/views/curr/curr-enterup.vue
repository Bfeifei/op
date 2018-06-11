<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">上传企业视频</div>
			</el-col>
			<el-col :span="24">
				<div class="el-had">
					<el-col :span="20">
						<el-form label-width="100px">
							<el-col :span="24">
								<el-form-item label="上传视频:" prop="" align="left">
									<template slot-scope="scope">
										<div class="upload">
											<div class="el-form-item__content" style="display: flex;">
												<div class="el-input">
													<input v-model="videoName" style="width: 350px;" autocomplete="off" rows="2" :disabled="disabled" validateevent="true" type="text" class="el-input__inner" placeholder="点击上传企业视频" @click="upload">
												</div>
												<div style=" margin-left: 20px">
													<i class="el-icon-circle-check success" v-show="videoUp"></i>
												</div>
											</div>
											<input type="file" single accept="video/*" ref="upload" @change="onChange" style="position:absolute;clip:rect(0 0 0 0);">
											<div v-show="percent">
												<span>已上传{{size.loaded}} MB / {{size.total}}MB</span>
												<span>上传速度是:{{size.timeStamp}} MB</span>
												<el-progress :text-inside="true" :stroke-width="18" :percentage="Number(percent)" status="success"></el-progress>
											</div>
										</div>
									</template>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="上传集数:" prop="" align="left">
									<div class="upload">
										<el-input placeholder="选择集数" v-model="episode"></el-input>
									</div>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="课程名称:" prop="" align="left">
									<span v-text="videoName"></span>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="视频封面:" prop="">
									<template slot-scope="scope">
										<div class="upload">
											<div style="float:left">
												<div class="el-form-item__content" @click="upload2" validateevent="true">
													<div class="el-input el-image">
														<div class="el-upload-dragger">
															<i class="el-icon-upload el-icon-picture avatar-uploader-icon" v-if="!FileUrl"></i>
															<div class="el-upload__text" v-if="!FileUrl">点击上传视频封面</div>
															<div slot="tip" class="el-upload__tip" v-if="!FileUrl">封面大小不超过1M</div>
															<img :src="FileUrl" alt="" />
														</div>
													</div>
												</div>
												<input single type="file" accept="image/*" ref="upload2" @change="onChange2" style="position:absolute;clip:rect(0 0 0 0);">
											</div>
											<div style="float: left;">
												<!--<img :src="coverUrl" alt="" />-->
											</div>
										</div>
									</template>
								</el-form-item>
							</el-col>
						</el-form>
					</el-col>
				</div>
			</el-col>
			<el-col :span="24">
				<el-button class="successBtn el-btn1" type="success" @click="submitForm" :loading="loading">上传</el-button>
			</el-col>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	var formData = new FormData();
	var formData1 = new FormData();
	var reader = new FileReader();
	import { readFileSize, readFileload } from '../../common/filters/fileSize.js'
	import { CourseJob, Video, CourseUpload } from '../../api/api'
	import bus from '../../store/event.js'
	export default {
		data() {
			return {
				sendList: {},
				Sess: {},
				videoName: '',
				FileUrl: '',
				episode: '',
				formLabel: {
					videoUrl: [],
					coverName: null
				},
				uploadate: null,
				loading: false,
				Implicit: {
					jobId: [],
					categoryId: undefined,
					videourl: []
				},
				mounted: false,
				videoUp: false,
				coverUp: false,
				percent: '',
				time_state: 0,
				size: {},
				percent: '',
				disabled: false,
			}
		},
		created() {
			if(!window.sessionStorage.getItem('videoUp')) {
				//      		this.testUp = false
				this.$notify({
					title: '警告',
					message: '请先添加课程',
					type: 'warning'
				});
				this.$router.push({
					path: '/publice/curr-videoup'
				})
				bus.$on('tell-video', function(data) {
					this.Sess.course_list_id = data;
				})
			} else {
				this.Sess = JSON.parse(window.sessionStorage.getItem('videoUp'));
				this.Implicit.categoryId = this.Sess.categoryId
			}
			//      	console.log(window.sessionStorage.getItem('videoUp'))
		},
		watch: {
			mounted(newVal, oldVal) {
				if(newVal) {
					for(var i = 0; i < this.formLabel.videoUrl.length; i++) {
						this.Implicit.videourl.push(this.formLabel.videoUrl[i])
					}
					CourseJob(this.Implicit)
						.then(res => {
							const {
								code
							} = res
							if(code == 1000) {
								//							this.$notify({
								//					          	title: '成功',
								//					          	message: '上传企业视频成功',
								//					          	type: 'success'
								//					        });
							} else {
								//							this.$notify({
								//					          	title: '警告',
								//					          	message: '出现意外错误',
								//					          	type: 'warning'
								//					        });
							}
						})
				}
				this.$notify({
					title: '成功',
					message: '上传企业视频成功',
					type: 'success'
				});
				this.$router.push({
					path: '/publice/curr-enter'
				})
			}
		},
		methods: {
			//上传视频
			upload() {
				this.$refs.upload.click()
			},
			onChange(event) {
				formData1.delete('videoName')
				var _this = this;
				var file = event.target.files[0]

				const isMp4 = file.type === 'video/mp4';
				//	      		const isMpeg = file.type === 'video/mpeg';
				const isMOV = file.type === 'video/mov';

				if(!isMp4 && !isMOV) {
					this.$message.error('上传视频只能是 Mp4 或者 mov 格式!');
					return false
				}
				this.videoName = file.name.split('.')[0]
				formData1.append("videoName", file)
				//多个上传
				//				for(var i = 0; i <file.length; i++){
				//					formData1.append("videoName["+i+"]",file[i])
				//				}

				//
				var xhr = new XMLHttpRequest();

				var xhrOnProgress = function(fun) {
					xhrOnProgress.onprogress = fun; //绑定监听
					//使用闭包实现监听绑
					return function() {
						//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
						var xhr = $.ajaxSettings.xhr();
						//判断监听函数是否为函数
						if(typeof xhrOnProgress.onprogress !== 'function')
							return xhr;
						//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
						if(xhrOnProgress.onprogress && xhr.upload) {
							xhr.upload.onprogress = xhrOnProgress.onprogress;
						}
						return xhr;
					}
				}

				//上传视频operation
				$.ajax({
					type: "POST",
					//	      			url: "/video/upload.php",
					url: "http://video.security00.com/upload.php",
					async: true,
					mimeType: "multipart/form-data",
					data: formData1,
					dataType: 'json',
					processData: false,
					contentType: false,
					xhr: xhrOnProgress(function(ev) {
						_this.percent = parseInt(100 * ev.loaded / ev.total);
						_this.size['total'] = Number(ev.total / 1024 / 1024).toFixed(2)
						_this.size['loaded'] = Number(ev.loaded / 1024 / 1024).toFixed(2)
						_this.size['timeStamp'] = Number(ev.timeStamp / 1024 / 1024).toFixed(2)
						_this.size.timeStamp < 100 ? _this.disabled = true : _this.disabled = false
					}),
					success: function(res) {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							var sendList = [];
							for(var i = 0; i < data.length; i++) {
								sendList.push(data[i])
								_this.formLabel.videoUrl = sendList
							}
							_this.videoUp = true;
							_this.disabled = false;
							_this.$notify({
								title: '成功',
								message: '视频上传成功',
								type: 'success'
							});
						} else {
							_this.$notify({
								title: '警告',
								message: info,
								type: 'warning'
							});
						}
					}

				})
				//				}
			},
			//视频封面
			upload2() {
				this.$refs.upload2.click()
			},
			onChange2(event) {
				var _this = this;
				var file = event.target.files
				var coverUrl = event.target.files[0]

				if(coverUrl.size <= coverUrl.size * 1024 * 1024 * 1) {

					for(var i = 0; i < file.length; i++) {
						formData.append("course_cover[" + i + "]", file[i])
					}
					this.coverUp = true

					//图片转为base64位进行预览
					const readFileload = file => {
						reader.onload = function() {
							_this.FileUrl = this.result
						}
						reader.readAsDataURL(file);
					}
					readFileload(event.target.files[0])

				} else {
					this.$notify({
						title: '警告',
						message: '超出图片限制',
						type: 'warning'
					});
				}
			},
			submitForm() {
				if(!this.videoUp) {
					this.$notify({
						title: '警告',
						message: '请先上传视频',
						type: 'warning'
					});
					return;
				} else if(!this.coverUp) {
					this.$notify({
						title: '警告',
						message: '请上传封面',
						type: 'warning'
					});
					return;
				} else {
					for(var i = 0; i < this.formLabel.videoUrl.length; i++) {
						this.Implicit.videourl.push(this.formLabel.videoUrl[i])
					}
					this.loading = true;
					var _this = this;
					this.mounted = false
					formData.append('course_lists_id', _this.Sess.course_list_id);
					formData.append('course_category_id', _this.Sess.categoryId);
					formData.append('course_title', _this.videoName);
					formData.append('episode', _this.episode)
					formData.append('videourl', this.Implicit.videourl)
					CourseUpload(formData)
						.then(res => {
							const {
								code,
								info,
								data
							} = res
							if(code == 1000) {
								let sendata = [];
								for(var v in data) {
									console.log(data[v])
									for(var i = 0; i < data[v].length; i++) {
										sendata.push(data[v][i])
										_this.Implicit.jobId = sendata
										_this.mounted = true
									}
								}
								window.sessionStorage.removeItem('videoUp')
								if(JSON.parse(window.sessionStorage.getItem('videoUp'))) {
									window.sessionStorage.removeItem('videoUp')
									this.Sess = {}
								}
							} else {
								this.loading = false;
								this.$notify({
									title: '警告',
									message: info,
									type: 'warning'
								});
							}
						})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.success {
		color: #13CE66;
	}
	
	.upload {
		width: 350px;
	}
	
	.el-form-item {}
	
	.upload-demo {
		.bg-percentage {
			margin: 10px 0;
		}
	}
	
	.el-upload-dragger {
		width: 350px;
		margin-right: 50px;
	}
	
	.el-form-item {
		.avatar-uploader {
			width: 600px;
			height: 300px;
			cursor: pointer;
			background-color: #ebebeb;
			.avatar-uploader-icon {
				margin-top: 90px;
				font-size: 28px;
				color: #8c939d;
				text-align: center;
			}
			.avatar {
				width: 600px;
				height: 300px;
				display: block;
			}
		}
	}
	
	.el-image {
		.el-upload-dragger {
			height: auto;
			img {
				width: 100%;
			}
		}
	}
	
	.bg-color {
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding: 15px 0 15px 20px;
		border-bottom: 1px solid #ececeb;
	}
	
	.el-had {
		height: 500px !important;
		overflow: hidden;
		background-color: #FFF;
		padding: 15px 20px;
		color: #222222;
		height: 440px;
		.el-textarea__inner {
			min-height: 138px !important;
		}
	}
	
	.el-btn1 {
		width: 90px;
		margin: 20px 0;
		border-radius: 20px;
	}
</style>