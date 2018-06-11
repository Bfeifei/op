<template lang="html">
    <div class="el-header">
      	 <el-row :gutter="20">
     	  	<el-col :span="24">
     	  		<div class="grid-content bg-nav">
			  		<div class="bg-left">
			  			<el-button type="text" @click="route" style="font-size: 16px">消息列表</el-button><i class="el-icon-arrow-right"></i>发布消息
			  		</div>
			  		<div class="bg-right">
			  		</div>
		  		</div>
     	  	</el-col>
     	  	<el-col :span="24">
		  		<el-col :span="8" style="margin-top: 30px">
		  			<el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign" ref="formLabelAlign" :rules="rule2">
					  <el-form-item label="消息标题:" prop="title">
					    <el-input v-model="formLabelAlign.title" placeholder="请输入消息标题(16字以内)"></el-input>
					  </el-form-item>
					  <el-form-item label="消息正文:" prop="content">
					    <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 14}" v-model="formLabelAlign.content" placeholder="请输入消息正文(50字以内)"></el-input>
					  </el-form-item>
					  <el-form-item label="消息跳转链接:" prop="url">
					    <el-input v-model="formLabelAlign.url" placeholder="请输入消息跳转链接，例: http://www.qikevip.com"></el-input>
					  </el-form-item>
					  <el-form-item>
					  	<el-button class="successBtn" @click="Release('formLabelAlign')">立即发布</el-button>
					  </el-form-item>
					</el-form>
		  		</el-col>
		 	</el-col>
		</el-row>
     	  
    </div>
</template>

<script>
	import { pushMsgAll } from '../../api/api.js'
	export default{
		data(){
			return {
				//接收数据
				list: null,
				total:0,
				loading: true,
				//发送数据
				listQuery: {
			        company_id: undefined
			  	},
				labelPosition: 'right',
				formLabelAlign:{
					title: '',
					content: '',
					url: ''
				},
				rule2:{
					title:[ 
						{ required: true, message: '请输入消息标题', trigger: 'blur' },
        				{ min: 1, max: 16, message: '标题在 16个字符内', trigger: 'blur' }
    				],
					content:[ 
						{ required: true, message: '请输入消息正文', trigger: 'blur' },
        				{ min: 1, max: 50, message: '消息正文在 50个字符内', trigger: 'blur' }
    				],
					url:[ 
						{ required: true, message: '请输入消息跳转链接', trigger: 'blur' },
						{
				            min: 1,
				            max: 1000,
				            message: '网址长度过长!'
				        }, {
				            pattern: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
				            message: '网址格式不正确!'
				        }
    				]
				}
			}
		},
		watch: {
	      '$route'(to,from){
	        this.total = 1;
	      	this.loading = true;
	      	this.list = null;
	      }
	    },
		methods:{
			route(){
				this.$router.go(-1)
			},
			Release(){
				this.$refs.formLabelAlign.validate((valid)=>{
					if(valid){
						pushMsgAll(this.formLabelAlign)
						.then( res => {
							const { code, info } = res
							if(code == 1000){
								this.$message({
									type:'success',
									message: info
								})
								this.$router.push({
									path: '/publice/message-list'
								})
							}else{
								this.$message({
									type:'warning',
									message: '发送失败!'
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-nav{
		overflow:hidden;
		background-color: #FFF;
		border-bottom :1px solid #ececeb;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding: 11.5px 20px;
		.bg-left{
			float:left;
			margin-top: 5px;
		}
		.bg-right{
			width: 300px;
			float:right;
			margin-top: 4px;
			button{
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius:0 10px 10px 0 !important;
			}
		}
	}
	.cell{
		.bg-title{
			width:200px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			float: left;
		}
		.bg-oper{
			height:40px;
			position: absolute;
			float: left;
			margin: 9px 0 0 5px;
		}
		button{
			display:block;
			width:200px;
			>span{
				display:inline-block;
				color: #1f2d3d !important;
				width:200px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				float: left;
			}
		}
	}
</style>