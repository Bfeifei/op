<template lang="html">
    <div class="">
        <el-row :gutter="20">
     	  <el-col :span="24">
     	  	<div class="grid-content bg-nav">
		  		<div class="bg-left">
		  			<el-button type="text" @click="route" style="font-size: 16px">企业课程列表</el-button><i class="el-icon-arrow-right"></i>企业购买列表
		  		</div>
		  		<div class="bg-right">
		  		</div>
	  		</div>
     	  </el-col>
     	  <el-col :span="24">
     	  	 <div class="el-had">
  			<el-form 
  				:label-position="labelPosition"  
  				label-width="130px" 
  				:model="formLabel"
  				:inline="true" 
  				align="left"
  				ref="formLabel">
				<div class="bg-left">
		  			<img src="../../assets/img/sign_1.png" alt="" />
		  			<span>课程信息</span>
		  		</div>
				<div>
					<ul class="v-table">
						<li>
							<label for="" >课程封面</label>
							<div><img src="../../assets/img/1D9245A5-66E1-47F3-9D13-F2E4F818D50F.png" alt="" /></div>
						</li>
						<li>
							<label for="" >课程名称</label>
							<div><span>课程名称课程名称课程名称课程名称课程名称</span></div>
						</li>
						<li>
							<label for="" >课程详情</label>
							<div><span>课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情</span></div>
						</li>
						<li>
							<label for="" >课程分类</label>
							<div><span>课程分类  课程分类</span></div>
						</li>
						<li>
							<label for="" >讲师姓名</label>
							<div><span>讲师姓名</span></div>
						</li>
						<li>
							<label for="" >购买学习人数</label>
							<div><span>2人</span></div>
						</li>
						<li class="v-price">
							<label for="" >价格</label>
							<div><span>￥889.00</span></div>
						</li>
						<div class="v-left">
				  			<img src="../../assets/img/sign_2.png" alt="" />
				  			<span>公司信息</span>
				  		</div>
				  		
				  		<li class="v-order">
							<label for="" >订单号</label>
							<div>213576249870</div>
						</li>
						<li>
							<label for="" >公司ID</label>
							<div><span>8802</span></div>
						</li>
						<li>
							<label for="" >公司名称</label>
							<div><span>公司名称公司名称公司名称</span></div>
						</li>
						<li>
							<label for="" >购买人</label>
							<div><span>购买人</span></div>
						</li>
						<li>
							<label for="" >购买时间</label>
							<div><span>2017-08-11  20:08:11</span></div>
						</li>
					</ul>
				</div>
		  		
			</el-form>
	  	  </div>
     	</el-col>
	  
	  	 </el-col>
       </el-row>
    </div>
</template>
<script>
	import { addUser, getDropList } from '../../api/api.js';
    export default {
        data() {
            return {
                labelPosition: 'right',
                list:[],
		        formLabel: {
		          company_name: '',
		          industry_id: '',
		          scale: '',
		          contact: '',
		          mobile: '',
		          company_phone: '',
		          use_num: '',
		          video_play_num: '',
            	  realname: '',//管理员权限
            	  company_admin_mobile: '',
            	  email: '',
            	  password: '',
            	  password_confirmation: ''
		        }
            }
        },
        watch: {
	      '$route'(to,from){

	      }
	    },
        methods:{
	        route(){
				this.$router.go(-1)
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
	.el-select-dropdown{
		min-width: 257px !important;
	}
	.el-en{
		margin-left: 44px;	
	}
	.el-fo{
		margin-left: 100px;
		margin-right:200px;
		>.el-form-item__label{
			float: left;
		}
		>.el-form-item__content{
			float: left;
			margin-left:0 !important;
		}
		.el-select{
			width:257px;
			margin-left:20px;
		}
	}
	.el-vis{
		visibility: hidden;
	}
	.el-had{
		background-color: #FFF;
		.v-table{
			>li:first-child{
				display:flex;
				border-top-color: #E0E0E0;
				border-top-style: solid;
				border-top-width: 1px;
				>label{
					width:100px;
					padding: 20px 20px;
					text-align:center;
					display:inline-block;
					height:100px;
					line-height:100px;
					margin-right:20px;
					border-right-color: #E0E0E0;
					border-right-style: solid;
					border-right-width: 1px;
					background-color: #ccc;
					color: #666;
				}
				>div{
					height:100px;
					>img{
						margin-top:20px;
						height:100px;
					}
				}
			}
			>li{
				border-top-color: #E0E0E0;
				border-top-style: solid;
				border-top-width: 1px;
				border-right-color: #E0E0E0;
				border-right-style: solid;
				border-right-width: 1px;
				display:flex;
				>label{
					width:100px;
					padding: 20px 20px;
					text-align:center;
					display:inline-block;
					height:60px;
					line-height:60px;
					margin-right:20px;
					border-right-color: #E0E0E0;
					border-right-style: solid;
					border-right-width: 1px;
					background-color: #ccc;
					color: #666;
				}
				>div{
					height:100px;
					>span{
						line-height:100px;
					}
				}
			}
			.v-price{
				border-bottom-color: #E0E0E0;
				border-bottom-style: solid;
				border-bottom-width: 1px;
			}
			.v-order{
				line-height: 100.99px;
			}
			.v-left{
			    height: 22px;
			    text-align: left;
			    margin: 45px 0;
			    position: relative;
			}
			>li:last-child{
				border-bottom-color: #E0E0E0;
				border-bottom-style: solid;
				border-bottom-width: 1px;
			}
		}
	}
	.el-inp{
		.el-input{
			float:left;
			caret-color: #6fc056;
			width: 233px;
		}
	}
	.el-btn1{
		width: 80px;
		height: 36px;
		color: #FFF;
		border-radius: 26px;
		background-color: #6fc056;
		&:hover, &:active{
			color: #FFF !important;
			border: #6fc056 !important;
		}
	}
	.el-btn2{
		width: 80px;
		height: 36px;
		color: #FFF;
		border-radius: 26px;
		background-color: #cccccc;
		&:hover, &:active{
			color: #FFF !important;
			border: #cccccc !important;
		}
	}
	.el-input{
		width: 257px;
		margin-left: 20px;
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	.el-form-item__label{
		width:114px !important;
	}
	.bg-color{
		height: 35px;
		line-height: 35px;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding:15px 0 15px 20px;
		border-bottom:1px solid #ececeb;
	}
	.el-had{
		overflow:hidden;
		background-color: #FFF;
		padding:15px 20px;
		color: #222222;
		.bg-left{
			height:22px;
			text-align: left;
			margin:10px 0 45px 0;
			position:relative;
			>img{
				line-height: 22px;
				position: absolute;
				top:3px;
			}
			>span{
				position: absolute;
				left:24px;
			}
		}
		.bg-right{
			width: 300px;
			float:right;
			button{
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius:0 10px 10px 0 !important;
			}
		}
	}
</style>