<template lang="html">
	<div class="el-header">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">焦点位管理</el-button><i class="el-icon-arrow-right"></i>上传焦点图</div>
			</el-col>
		</el-row>
		<el-col :span="24">
			<div class="el-had">
				<el-form :inline="false" :label-position="labelPosition" label-width="100px" :model="formLabel" ref="formLabel" :rules="rules">
					<el-col :span="12">
						<el-form-item label="标题:" class="el-fo" prop="title">
							<el-input v-model="formLabel.title"></el-input>
						</el-form-item>
						<!--<el-form-item label="排序:" class="el-fo" prop="scale">
					    	
					  </el-form-item>-->
						<el-form-item label="类型:" class="el-fo" prop="type">
							<el-radio-group v-model="formLabel.category">
								<el-radio :label="1">课程</el-radio>
								<el-radio :label="2">活动</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-col v-if="formLabel.category == 1">
							<el-form-item label="课程ID:" class="el-fo" prop="course_id">
								<el-input v-model="formLabel.course_id" placeholder="请输入课程ID"></el-input>
							</el-form-item>
						</el-col>
						<el-col v-if="formLabel.category == 2">
							<el-form-item label="活动链接:" class="el-fo" prop="link">
								<el-input v-model="formLabel.acitivity" placeholder="请输入活动链接"></el-input>
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="封面:" prop="img" class="el-fo">
								<div class="upload">
									<div class="el-form-item__content">
										<div class="el-upload-dragger el-input" @click="upload">
											<div class="el-input" style="height: 100%; width: auto">
												<!--<input autocomplete="off" rows="2" validateevent="true" type="text" class="el-input__inner" placeholder="点击上传课程系列封面" >-->
												<i class="el-icon-upload el-icon-picture avatar-uploader-icon" v-if="!FileUrl"></i>
												<div class="el-upload__text" v-if="!FileUrl">点击上传视频封面</div>
												<img :src="FileUrl" alt="" style="height: 100%" />
											</div>
										</div>

									</div>
									<input type="file" single accept="image/*" ref="upload" @change="onChange" style="position:absolute;clip:rect(0 0 0 0);">
								</div>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属行业:" class="el-inp" prop="industry_id">
							<el-select v-model="formLabel.industry_id" placeholder="请选择行业" class="el-sel" style="width:332px;">
								<el-option v-for="item in list" :label="item.industry_name" :value="item.industry_id" :key="item.industry_id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="状态:" class="el-inp" prop="status">
							<el-select v-model="formLabel.status" class="el-sel" style="width: 332px">
								<el-option label="上架" value="1" :key="1"></el-option>
								<el-option label="下架" value="2" :key="2"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="描述:" prop="content" class="el-inp">
							<el-input type="textarea" :autosize="{ minRows: 8, maxRows: 8, minCols: 10, maxCols: 4}" style="width: 332px" placeholder="请输入课程描述" v-model="formLabel.content">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="开始时间:" prop="start_time" class="el-state">
								<template slot-scope="scope">
									<div class="block">
										<el-date-picker v-model="formLabel.start_time" type="datetime" placeholder="选择日期" @change="handleChange1" :picker-options="pickerOptions0">
										</el-date-picker>
									</div>
								</template>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="结束时间:" prop="end_time" class="el-end">
								<template slot-scope="scope">
									<div class="block">
										<el-date-picker v-model="formLabel.end_time" type="datetime" placeholder="选择日期" @change="handleChange2" :picker-options="pickerOptions1">
										</el-date-picker>
									</div>
								</template>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="10" :offset="8">
						<div class="el-success">
							<el-form-item>
								<el-button class="successBtn" type="success" @click="submitForm('formLabel')" :loading="loading">提交</el-button>
								<el-button class="resetBtn" @click="resetForm('formLabel')">重置</el-button>
							</el-form-item>
						</div>
					</el-col>
				</el-form>
			</div>
		</el-col>
	</div>
</template>

<script>
	var reader = new FileReader();
	var formData = new FormData();
	import { getDropList, gatherAdd } from '@/api/api'
	export default {
		data() {
			return {
				list: [],
				value1: '',
				value2: '',
				loading: false,
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				FileUrl: '',
				labelPosition: 'right',
				list: [],
				formLabel: {
					title: '',
					industry_id: '',
					status: '' || '1',
					category: '' || 1,
					content: '',
					start_time: '',
					end_time: '',
					img: '',
					course_id: undefined,
					acitivity: undefined
				},
				industry: [],
				rules: {
					//	        	testname:[{required:true}]
				}
			}
		},
		watch: {
			industry(newVal, oldVal) {
				if(newVal == null) {
					for(var i = 0; i < formLabel.length; i++) {
						return formLabel[i].industry_id
					}
				}
			}
		},
		created() {
			this.formLabel.state_time = new Date()
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				getDropList()
					.then(res => {
						var {
							code,
							info,
							data
						} = res;
						if(code == 1000) {
							this.list = data || [];
						}
					})
			},
			route() {
				this.$router.go(-1)
			},
			//上传封面
			upload() {
				this.$refs.upload.click()
			},
			handleUpload(file) {

			},
			onChange(event) {
				formData.delete('img')
				var _this = this;
				var file = event.target.files[0];

				const isPNG = file.type === 'image/png';
				const isJPG = file.type === 'image/jpeg';
				if(!isPNG && !isJPG) {
					this.$message.error('上传图片只能是 png 或者 jpg 格式!');
					return false
				} else {
					this.formLabel.img = event.target.files[0];
					this.file_name = event.target.files[0].name;
					//获取base64位url图片
					const readFileload = file => {
						reader.onload = function() {
							_this.FileUrl = this.result
						}
						reader.readAsDataURL(file);
					}
					readFileload(event.target.files[0])
				}
			},
			submitForm() {
				let date = new Date(this.formLabel.start_time);
				let date1 = new Date(this.formLabel.end_time);
				let start = date.getTime()
				let end = date1.getTime()
				if(start >= end) {
					this.$message({
						message: "上传时间不正确，请重试!",
						type: 'warning'
					})
					return false
				}
				this.loading = true
				var formData = new FormData();
				var Form = this.formLabel;
				for(let v in Form) {
					if(Form[v]) {
						formData.append(v, Form[v])
					}
				}
				gatherAdd(formData)
					.then(res => {
						const {
							code,
							data,
							info
						} = res
						if(code == '1000') {
							this.$message({
								type: 'success',
								message: '添加焦点图成功'
							})
							this.$router.push({
								path: '/publice/focal-position'
							})
						} else {
							this.loading = false
							this.$message({
								type: 'error',
								message: info
							})
						}
					})
			},
			handleChange1(val) {
				this.formLabel.start_time = val;
			},
			handleChange2(val) {
				this.formLabel.end_time = val;
			},
			resetForm(formName) {
				this.loading = false
				this.$refs[formName].resetFields();
				this.formLabel.course_id = '';
				this.formLabel.acitivity = '';
				this.FileUrl = ''
			},
			handleRemove(file, fileList) {
				//	        console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.el-input {
		width: 332px !important;
	}
	
	.bg-color {
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding: 13.5px 20px;
		border: 1px solid #ececeb;
	}
	
	.el-state {
		margin-left: 38px;
	}
	
	.el-textarea__inner {
		width: 192px !important;
	}
	
	.el-success {
		margin-top: 50px;
	}
	
	.el-had {
		height: 600px;
		background-color: #FFF;
		text-align: left;
		padding-top: 20px;
		.el-fo {
			margin-left: 38px !important;
			margin-right: 47px !important;
			>.el-form-item__label {
				float: left;
			}
			.el-sel {
				width: 194px;
			}
		}
		.el-inp {
			margin-right: 38px;
		}
	}
</style>