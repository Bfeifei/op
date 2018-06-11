<template lang="html">
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">新增企业</div>
			</el-col>
			<el-col :span="24">
				<div class="el-had">
					<el-form :label-position="labelPosition" label-width="130px" :model="formLabel" :rules="rules2" :inline="true" align="center" ref="formLabel">
						<div class="bg-left">
							<img src="../../assets/img/sign_1.png" alt="" />
							<span>企业信息录入</span>
						</div>
						<el-form-item label="企业名称:" class="el-fo" prop="company_name">
							<el-input v-model="formLabel.company_name"></el-input>
						</el-form-item>
						<el-form-item label="所属行业:" class="el-fo" prop="industry_id">
							<el-select v-model="formLabel.industry_id" placeholder="请选择行业" class="el-sel">
								<el-option v-for="item in list" :label="item.industry_name" :value="item.industry_id" :key="item.industry_id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="公司规模:" class="el-fo" prop="scale">
							<el-select v-model="formLabel.scale" placeholder="请选择公司规模" class="el-sel">
								<el-option v-for="(item,key) in scale" :label="item.size" :value="item.id" :key="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业联系人:" class="el-fo" prop="contact">
							<el-input v-model="formLabel.contact"></el-input>
						</el-form-item>
						<el-form-item label="企业联系人手机:" class="el-fo" prop="mobile" min="0">
							<el-input v-model="formLabel.mobile"></el-input>
						</el-form-item>
						<el-form-item label="企业电话( 座机):" class="el-fo" prop="company_phone">
							<el-input v-model="formLabel.company_phone"></el-input>
						</el-form-item>
						<el-form-item label="使用人员数量:" class="el-fo" prop="use_num" min="0">
							<el-input v-model="formLabel.use_num"></el-input>
						</el-form-item>
						<!--<el-form-item label="课程购买数量:" class="el-fo" prop="video_play_num" min="0">
			    <el-input v-model="formLabel.video_play_num"></el-input>
			  </el-form-item>-->
						<el-form-item label="占位符位:" class="el-fo el-vis" prop="">
							<el-input type="type"></el-input>
						</el-form-item>
						<div class="bg-left">
							<img src="../../assets/img/sign_2.png" alt="" />
							<span>企业管理员信息录入</span>
						</div>
						<el-form-item label="管理员姓名:" class="el-fo" prop="realname">
							<el-input v-model="formLabel.realname"></el-input>
						</el-form-item>
						<el-form-item label="管理员手机:" class="el-fo" prop="company_admin_mobile" min="0">
							<el-input v-model="formLabel.company_admin_mobile"></el-input>
						</el-form-item>
						<el-form-item label="管理员邮箱:" class="el-fo" prop="email">
							<el-input v-model="formLabel.email"></el-input>
						</el-form-item>
						<el-form-item label="占位符位:" class="el-fo el-vis" prop="">
							<el-input></el-input>
						</el-form-item>
						<el-col :span="24">
							<el-form-item>
								<el-button class="successBtn" @click="submitForm('formLabel')" :disabled="handledis" type="success" :loading="loading">提交</el-button>
								<el-button class="resetBtn" @click="resetForm('formLabel')">重置</el-button>
							</el-form-item>
						</el-col>
					</el-form>
				</div>
			</el-col>

			</el-col>
		</el-row>
	</div>
</template>
<script>
	import { addUser, getDropList, companyScale } from '../../api/api.js';
	export default {
		data() {
			//      	var validatePass2 = (rule, value, callback) => {
			//  			if (value === '') {
			//		          callback(new Error('请再次输入密码'));
			//		        } else if (value !== this.formLabel.password) {
			//		          callback(new Error('两次输入密码不一致!'));
			//		        } else {
			//		          callback();
			//		        }
			//  		}
			return {
				labelPosition: 'right',
				loading: false,
				handledis: false,
				list: [],
				scale: [],
				formLabel: {
					company_name: '',
					industry_id: '',
					scale: '',
					contact: '',
					mobile: '',
					company_phone: '',
					//		          use_num: '',
					//		          video_play_num: '',
					realname: '', //管理员权限
					company_admin_mobile: '',
					email: ''
				},
				rules2: {
					company_name: [{
						required: true,
						message: '请输入企业名称',
						trigger: 'blur'
					}, {
						min: 2,
						max: 30,
						message: '长度在 2 到 30 个字符'
					}, {
						pattern: /^[\u4E00-\u9FA5]+$/,
						message: '企业只能为中文!'
					}],
					industry_id: [{
						required: true,
						message: '请输入所属行业',
						trigger: 'blur'
					}],
					scale: [{
						required: true,
						message: '请输入公司规模',
						trigger: 'blur'
					}, {
						min: 1,
						max: 100000,
						message: '公司规模过长'
					}, {
						pattern: /^\w{1,10}$/,
						message: '公司规模只能是数字!'
					}],
					contact: [{
						required: true,
						message: '请输入企业联系人',
						trigger: 'blur'
					}, {
						min: 2,
						max: 100,
						message: '企业联系人姓名太短!'
					}, {
						pattern: /^[A-Za-z]{2,15}|[\u4E00-\u9FA5]+$/,
						message: '管理员姓名不能有符号'
					}],
					mobile: [{
						required: true,
						message: '请输入企业联系人手机',
						trigger: 'blur'
					}, {
						max: 11,
						message: '手机号长度太长!'
					}, {
						pattern: /^1[2|3|4|5|6||7|8][0-9]\d{4,8}$/,
						message: '请输入正确的手机号!'
					}],
					company_phone: [{
						required: true,
						message: '请输入企业电话',
						trigger: 'blur'
					}, {
						pattern: /^([0-9\-]){1,20}$/,
						message: '企业电话格式不正确'
					}],
					use_num: [{
						required: true,
						message: '请输入使用人员数',
						trigger: 'blur'
					}, {
						min: 1,
						max: 10000,
						message: '超出人员数量限制，最大为10000'
					}, {
						pattern: /^\d{1,10000}$/,
						message: '人员使用数量只能是数字'
					}],
					video_play_num: [{
						required: true,
						message: '请输入课程购买数量',
						trigger: 'blur'
					}, {
						min: 1,
						max: 100000,
						message: '超出购买数量限制'
					}, {
						pattern: /^\d{1,20}$/,
						message: '课程数量'
					}],
					//
					realname: [{
						required: true,
						message: '请输入管理员姓名',
						trigger: 'blur'
					}, {
						pattern: /^[A-Za-z]{2,15}|[\u4E00-\u9FA5]+$/,
						message: '管理员姓名不能有符号'
					}],
					company_admin_mobile: [{
						required: true,
						message: '请输入管理员手机',
						trigger: 'blur'
					}, {
						max: 11,
						message: '手机号长度太长!'
					}, {
						pattern: /^1[2|3|4|5|6||7|8][0-9]\d{4,8}$/,
						message: '请输入正确的手机号!'
					}],
					email: [{
						required: true,
						message: '请输入管理员邮箱',
						trigger: 'blur'
					}, {
						pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
						message: '管理员邮箱格式不对'
					}],
					checked: true,
					industry: []
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
			this.handledis = false;
			this.getDrop()
		},
		methods: {
			submitForm() {
				this.loading = true
				this.$refs.formLabel.validate((valid) => {
					if(valid) {
						addUser(this.formLabel)
							.then(res => {
								let {
									info,
									code
								} = res;
								if(code == 1000) {
									this.$message({
										message: "添加企业成功",
										type: 'success'
									});
									this.handledis = true;
									this.$router.push({
										path: '/publice/manage-list'
									})
								} else {
									this.loading = false
									this.$message({
										message: info,
										type: 'error'
									});
								}
							})
					}
				})
			},
			resetForm(formName) {
				this.loading = false
				this.$refs[formName].resetFields();
			},
			getDrop() {
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

				companyScale()
					.then(res => {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							this.scale = data || []
						}
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-select-dropdown {
		min-width: 257px !important;
	}
	
	.el-en {
		margin-left: 44px;
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
			width: 257px;
			margin-left: 20px;
		}
	}
	
	.el-vis {
		visibility: hidden;
		div {
			width: 257px;
		}
	}
	
	.el-had {
		background-color: #FFF;
		h5 {
			font-size: 24px;
			margin: 29px 0;
		}
	}
	
	.el-inp {
		.el-input {
			float: left;
			caret-color: #6fc056;
			width: 233px;
		}
	}
	
	.el-btn1 {
		width: 80px;
		height: 36px;
		color: #FFF;
		border-radius: 20px;
	}
	
	.el-btn2 {
		width: 80px;
		height: 36px;
		color: #FFF;
		border-radius: 26px;
		background-color: #cccccc;
		&:hover,
		&:active {
			color: #FFF !important;
			border: #cccccc !important;
		}
	}
	
	.el-input {
		width: 257px;
		margin-left: 20px;
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	
	.el-form-item__label {
		width: 114px !important;
	}
	
	.bg-color {
		height: 35px;
		line-height: 35px;
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
		.bg-left {
			height: 22px;
			text-align: left;
			margin: 10px 0 45px 0;
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
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
</style>