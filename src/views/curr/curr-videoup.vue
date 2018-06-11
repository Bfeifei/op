<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">上传课程</div>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="el-had">
					<el-form :label-position="labelPosition" label-width="130px" :inline="true" :rules="rules2" :model="formLabel" ref="formLabel">
						<el-form-item label="创建课程系列名称:" class="el-fo" prop="course_lists_title">
							<el-input v-model="formLabel.course_lists_title"></el-input>
						</el-form-item>
						<el-form-item label="讲师姓名:" class="el-fo" prop="name">
							<div class="el-form-item__content">
								<div class="el-input">
									<el-input v-model="formLabel.name" style="width: 117px; margin-left: 0;" @blur="handleBlur" :disabled="Val > 0"></el-input>
									<el-select v-model="Val" placeholder="可选择讲师" class="el-sel" style="">
										<el-option value="" :key="0">选择手动输入</el-option>
										<el-option v-for="(item,key) in lecturer" :label="item.name" :value="key+1" :key="key+1"></el-option>
									</el-select>
								</div>
							</div>
						</el-form-item>
						<el-form-item label="讲师职位:" class="el-fo" prop="" align="left">
							<span v-if="Val > 0" style="width:257px;height:35.99px;display:inline-block;margin-left:20px;">
				  		{{lecturer[Val-1].author_position}}
				  	</span>
							<div v-else>
								<el-input v-model="formLabel.author_position"></el-input>
							</div>
						</el-form-item>
						<el-form-item label="选择分类:" class="el-fo" prop="">
							<div class="el-form-item__content">
								<div class="el-input">
									<el-select v-model="formLabel.course_categorys_id" placeholder="选择分类" class="el-sel" style="">
										<el-option v-for="item in list" :label="item.name" :value="item.id" :key="item.name"></el-option>
									</el-select>
									<el-select v-model="formLabel.course_pid" placeholder="选择分类" class="el-ses">
										<el-option v-for="item in list" :label="item.name" :value="item.id" :key="item.name"></el-option>
									</el-select>
								</div>
							</div>
						</el-form-item>
						<el-form-item label="创建课程系列详情:" class="el-fo" prop="intro">
							<el-input type="textarea" style="width: 257px;margin-left: 20px;" :autosize="{ minRows: 8, maxRows: 8}" :minlength="0" placeholder="请输入讲师详情" v-model="formLabel.intro">
							</el-input>
						</el-form-item>
						<el-form-item label="讲师详情:" class="el-fo" prop="author_intro">
							<div class="bg-title" v-if="Val > 0">
								<div v-if="lecturer[Val-1].author_intro.length > 9">
									<el-popover ref="popover2" placement="bottom" width="180" trigger="hover" :key="lecturer[Val-1].id">
										{{lecturer[Val-1].author_intro}}
									</el-popover>
									<el-button v-popover:popover2 type="text" class="bg-color">
										<span>{{lecturer[Val-1].author_intro}}</span>
									</el-button>
								</div>
								<div v-else>
									<span>
							  		{{lecturer[Val-1].author_intro}}
							  	</span>
								</div>
							</div>
							<div v-else>
								<el-input type="textarea" style="width: 257px; margin-left: 20px;" :autosize="{ minRows: 8, maxRows: 8}" placeholder="请输入讲师详情" v-model="formLabel.author_intro">
								</el-input>
							</div>
						</el-form-item>

						<el-form-item label="创建课程系列封面:" class="el-fo" prop="">
							<template slot-scope="scope">
								<div class="upload">
									<div class="el-form-item__content">
										<div class="el-input">
											<input v-model="file_name" autocomplete="off" rows="2" validateevent="true" type="text" class="el-input__inner" placeholder="点击上传课程系列封面" @click="upload">
										</div>
									</div>
									<input type="file" single accept="image/*" ref="upload" @change="onChange" style="position:absolute;clip:rect(0 0 0 0);">
								</div>
							</template>
						</el-form-item>
						<el-form-item label="价格:" class="el-fo" prop="price">
							<el-input v-model="formLabel.price" min="0"></el-input>
						</el-form-item>
						<el-form-item label="" class="el-fo el-image" prop="" align="left">
							<div class="el-upload-dragger" v-if="FileUrl">
								<span v-if="!FileUrl">封面预览区</span>
								<img :src="FileUrl" alt="" />
							</div>
						</el-form-item>
						<el-form-item label="" class="el-fo el-image" prop="" align="left">
							<div class="el-right">

							</div>
						</el-form-item>
						<el-col :span="24">
							<el-form-item>
								<el-button class="successBtn" type="success" @click="submitForm" :loading="loading">添加课程</el-button>
								<!--:loading="loading"-->
							</el-form-item>
						</el-col>
					</el-form>
					<el-col :span="24">
						<div class="el-had el-remo">
						</div>
						<!--<div class="el-table">
				  		 <el-table
						    :data="tableData"
						    style="width: 100%">
						    <el-table-column
						      label="课程封面"
						      prop="cover"
						      header-align="center"
						      align="center">
						      <template slot-scope="scope">
						       	<img :src="scope.row.cover" alt="" style="width:100px; margin-top:4px"/>
						      </template>
						    </el-table-column>
						    <el-table-column
						      prop="course_lists_title"
						      header-align="center"
						      align="center"
						      label="课程标题">
						    </el-table-column>
						    <el-table-column
						      prop="name"
						      header-align="center"
						      align="center"
						      width="120"
						      label="讲师">
						    </el-table-column>
						    <el-table-column
						    	prop="category_name"
						    	label="课程分类"
						    	header-align="center"
						      	align="center">
						    </el-table-column>
						    <el-table-column
							      prop="intro"
							      width="300"
							      label="课程简介"
							      header-align="center"
							      align="center">
							      <template slot-scope="props">
								  	<div class="bg-title">{{props.row.intro}}</div>
									  	<div v-if="props.row.intro.length > 9">
									  		<el-popover
											  ref="popover1"
											  placement="bottom"
											  width="300"
											  trigger="hover"
											  :key="props.row.id">
											  {{props.row.intro}}
										  	</el-popover>
										  <el-button v-popover:popover1 type="text" class="bg-oper">查看全部</el-button>
										</div>
									</template>
						    </el-table-column>
						    <el-table-column 
						    	label="操作"
						    	prop=""
						    	header-align="center"
						      	align="center">
						      	<template slot-scope="scope">
						      		<el-button :plain="true" type="text" size="small" :key="scope.row.id" @click="addList(scope.$index,scope.row.id)">选择</el-button>
						      	</template>
						    </el-table-column>
						</el-table>
				  	</div>-->
					</el-col>
				</div>
			</el-col>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	var reader = new FileReader();
	import bus from '../../store/event.js'
	import { getification, uploadCour, CourseAuthorlist } from '../../api/api.js'
	export default {
		data() {
			return {
				list: {},
				lecturer: [],
				FileUrl: '',
				labelPosition: 'right',
				loading: false,
				file_name: '',
				data: {
					categoryId: '',
					course_list_id: ''
				},
				Val: '',
				//              uploadUrl: 'http://qkw-api.dev/operation/course-add',
				//uploadUrl: 'http://api.security00.com/operation/course-add',
				uploadUrl: 'http://http://testapi.qikevip.com/operation/course-add',
				formLabel: {
					course_lists_title: '',
					name: '',
					author_position: '',
					intro: '',
					author_intro: '',
					price: '',
					course_categorys_id: '',
					course_pid: '',
					cover: '',
					author_id: undefined
				},
				rules2: {
					price: [{
						required: true,
						message: '价格不能为空',
						trigger: 'blur'
					}, {
						pattern: /^\d{1,100000000}$/,
						message: '价格格式错误!'
					}]
				},
				fileList: [],
				disabled: false,
				newVal: '',
				Test: false
			}
		},
		created() {
			this.getDrop()
		},
		updated() {
			if(this.formLabel.author_id > 0) {
				this.formLabel.name = undefined
				this.formLabel.author_position = undefined
				this.formLabel.author_intro = undefined
			} else {
				this.formLabel.author_id = undefined
			}
		},
		methods: {
			handleBlur() {
				var _this = this
				this.Test = false
				for(var v = 0; v < this.lecturer.length; v++) {
					if(_this.lecturer[v].name == _this.formLabel.name) {
						_this.Test = true
					} else {
						_this.Test = false
					}
				}
				if(this.Test) {
					this.$message({
						type: 'warning',
						message: '已存在一样的讲师，无法添加!'
					})
				}
			},
			upload() {
				this.$refs.upload.click()
			},
			//上传封面
			handleUpload(file) {
				console.log(file)
			},
			onChange(event) {
				var _this = this;
				console.log('null', event.target.files[0])
				this.formLabel.cover = event.target.files[0];
				console.log(this.formLabel.cover)
				this.file_name = event.target.files[0].name;
				//获取base64位url图片
				const readFileload = file => {
					reader.onload = function() {
						_this.FileUrl = this.result
					}
					reader.readAsDataURL(file);
				}
				readFileload(event.target.files[0])
			},
			submitForm() {
				if(Number(this.formLabel.course_categorys_id) == Number(this.formLabel.course_pid)) {
					this.$message({
						type: 'warning',
						message: '课程分类不能一致'
					})
					return;
				}
				if(this.Test) {
					this.$message({
						type: 'warning',
						message: '已存在一样的讲师，无法添加!'
					})
					return;
				} else {
					this.loading = true
					var formData = new FormData();
					if(this.Val) {
						this.formLabel.author_id = this.lecturer[this.Val - 1].id
					}
					var Form = this.formLabel;
					for(let v in Form) {
						if(Form[v]) {
							formData.append(v, Form[v])
							console.log('aa', Form[v])
						}
					}
					uploadCour(formData)
						.then(res => {
							const {
								code,
								data,
								info
							} = res
							if(code == '1000') {
								this.$message({
									type: 'success',
									message: '添加课程成功'
								})
								this.data = data
								this.$router.push({
									path: '/publice/curr-enterup'
								})
								bus.$emit('Tell-One', this.data)
								window.sessionStorage.setItem('videoUp', JSON.stringify(this.data))
							} else {
								this.loading = false
								this.$message({
									type: 'warning',
									message: info
								})
							}
						})
				}
			},
			getDrop() {
				getification()
					.then(res => {
						const {
							code,
							info,
							data
						} = res;
						this.list = data || [];
					})

				CourseAuthorlist()
					.then(res => {
						const {
							code,
							info,
							data
						} = res;
						this.lecturer = data
					})

			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-label {
		text-align: left;
	}
	
	.el-input {
		width: 257px;
		margin-left: 20px;
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	
	.el-se {
		width: 410px;
		.el-sel {
			margin-left: 25px;
		}
		.el-ses {
			margin-left: 15px;
		}
	}
	
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 6.5px 20px;
		.bg-left {
			float: left;
			button {
				width: 90px;
				border-radius: 10px;
				color: #FFF;
				background: #6fc056 !important;
				border-color: #6fc056;
			}
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
			float: right;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.el-form {
		.el-image {
			width: 277px;
			padding-left: 130px;
			.el-upload-dragger {
				width: 257px;
				margin-left: 20px;
				height: auto;
				img {
					width: 100%;
				}
			}
			.el-right {
				width: 257px;
				margin-left: 20px;
				height: auto;
			}
		}
		.el-fo {
			margin-left: 100px;
			margin-right: 200px;
			>.el-form-item__label {
				float: left;
			}
			>.el-form-item__content {
				float: left;
				margin-left: 0 !important;
			}
			.el-select {
				width: 118px;
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
		overflow: hidden;
		background-color: #FFF;
		padding: 15px 20px;
		color: #222222;
		margin-bottom: 15px;
		.bg-left {
			height: 22px;
			text-align: left;
			margin: 10px 0 20px 0;
			position: relative;
			>img {
				line-height: 22px;
				position: absolute;
				top: 3px;
			}
			>span {
				position: absolute;
				left: 24px;
			}
		}
		.bg-right {
			width: 300px;
			float: right;
			margin: 8px 20px 0 0;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
	
	.el-remo {
		height: 44px;
		margin-bottom: 0;
	}
	
	.bg-title {
		width: 257px;
		text-align: left;
		background-color: #FFF;
		margin-left: 20px;
		height: 35.99px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		div {
			width: 100%;
			height: 20px;
			line-height: 20px;
		}
		button {
			text-align: left;
			margin: 0 auto;
			text-align: center;
			width: 257px;
			height: 20px;
			line-height: 20px;
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			-o-text-overflow: ellipsis;
			white-space: nowrap;
			span {
				text-align: left;
				width: 90px !important;
			}
		}
		.el-button--text {
			padding: 0 !important;
		}
		.bg-color {
			color: #2c3e50
		}
	}
</style>