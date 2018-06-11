<template lang="html">
	<div class="enroll">
		<img 
			src="../assets/img/bg.png"
		 	srcset="../assets/img/bg@2x.png 2x,../assets/img/bg@3x.png 3x"
			class="bg" alt="" />
		<div class="el-enroll">
       		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="login-container">
	   			<h3 class="title">
	   				<img src="../assets/img/logo.png" alt="" />
	   			</h3>
	   			<el-form-item prop="email">
			    	<el-input type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="请输入邮箱" class="el-input"></el-input>
			  	</el-form-item>
			  	<el-form-item prop="checkPass">
			    	<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码" class="el-input" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
			  	</el-form-item>
			  	<el-form-item style="width:100%;">
			  	  	<el-button class="el-btn" type="success" :loading="logining" @click="submitForm('ruleForm2')">登录</el-button>
			  	</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	 import store from '../store/store'
	 import * as types from '../store/types'
	import { requestLogin } from '../api/api.js';
export default {
	 data() {
      return {
      	logining: false,
      	Img:'../assets/img/sign_1.png',
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
        	email: [{ 
        		required: true,
            	message: '请输入管理员邮箱',
            	trigger: 'blur' 
            }, {
	            pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	            message: '管理员邮箱格式不对'
	        }],
           	checkPass: [{
		        required: true,
		        message: '请输入密码',
		        trigger: 'blur'
		    }, {
		        min: 6,
		        max: 30,
		        message: '长度在 6 到 30 个字符'
		    }, {
		        pattern: /^(\w){6,20}$/,
		        message: '只能输入6-20个字母、数字、下划线'
		    }],
		    checked: true
        }
      };
    },
    created(){
    	if(window.sessionStorage.getItem('email')){
    		this.ruleForm2.email = JSON.parse(window.sessionStorage.getItem('email')).username
    	}
    },
    methods: {
    	submitForm(ev) {
	        var _this = this;
	        this.$refs.ruleForm2.validate((valid) => {
	          if (valid) {
	            this.logining = true;
	            var loginParams = { username: this.ruleForm2.email, password: this.ruleForm2.checkPass };
	            //调用方法
	            requestLogin(loginParams).then(res => {
	              this.logining = false;
	              //NProgress.done();
	              let { info, code, user,data } = res;
	              if (code == 1000) {
	              	this.$message({
	                  message: '登录成功',
	                  type: 'success'
	               });
 					window.sessionStorage.setItem('xtoken',JSON.stringify(data))
                	store.commit(types.TOKEN,JSON.parse(window.sessionStorage.getItem('xtoken')).token); //改变token状态
	               	this.$router.push({ path: '/publice/page' });
	               	window.sessionStorage.setItem('email',JSON.stringify(loginParams));
	              }
	              else {
       	 			 this.$message({
	                  message: '密码错误或者账号不存在',
	                  type: 'warning'
	                });
	              }
	            })
          	}
        });
      },
      resetForm(formName) {
	    this.$refs.formName.resetFields();
	  },
    }
}
</script>

<style lang="scss">
	
	.enroll{
		width:100%;
		height:100%;
		position: relative;
		/*overflow: hidden;*/
		.el-enroll{
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			margin:auto;
			.login-container {
			    -webkit-border-radius: 5px;
			    border-radius: 5px;
			    -moz-border-radius: 5px;
			    background-clip: padding-box;
			    margin: 10% auto;
			    width: 350px;
			    background-color: #ffffff;
			    padding: 35px 35px 15px 35px;
			    background: #fff;
			    border: 1px solid #eaeaea;
			    box-shadow: 0 0 25px #cac6c6;
			    .title {
			      margin: 0px auto 40px auto;
			      text-align: center;
			      color: #505458;
			      img{
			      	width:50%;
			      }
			    }
			    .el-btn{
			    	width:100%;
			    	border-radius: 18px;
			    	background-color: #6fc056;
			    }
			    .el-input__inner{
			    	border-top:none;
			    	border-left:none;
			    	border-right:none;
			    	border-bottom-width:1px;
			    	border-radius: 0px;
			    }
			    .remember {
				      margin: 0px 0px 35px 0px;
			    }
		  	}
		}
		.bg{
			width:100vw;
			height:100vh;
			position:absolute;
			left:0;
		}
	}
  
</style>