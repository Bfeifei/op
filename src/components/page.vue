<template lang="html">
    <div class="">
      	<div class="layer">
      		<span>欢迎使用企课网运营后台系统</span>
      	</div>
      	<div class="section">
      		<el-row :gutter="10">
      			<el-col  :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
	      		<ul class="sec-left">
	      			<li>
	      				<div>
	      					<img src="../assets/img/A9B6554E-818F-4AD4-B560-F9A0732BA444.png" alt="" />
	      				</div>
	      				<div>
	      					<label for="" class="el-label">企业信息管理</label>
	      					<div class="el-enter">
	  							<el-button size="primary" @click="handleadd">新增</el-button>
	  							<el-button size="primary" @click="handleadmi">
	  							管理
	      						</el-button>
	      					</div>
	      				</div>
	      			</li>
	      			<li>
	      				<div>
	      					<img src="../assets/img/9EC83CC2-667A-4BEB-8606-4BF9841145D0.png" alt="" />
	      				</div>
	      				<div>
	      					<label for="" class="el-label">企业课程管理</label>
	      					<div  class="el-enter">
	      						<el-button type="primary" @click="handleadd2">
	      							新增
	      						</el-button>
	      						<el-button type="primary" @click="handleadmi2">
	      							管理
	      						</el-button>
	      					</div>
	      				</div>
	      			</li>
	      		</ul>
      		</el-col>
      		<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
      		<ul class="sec-right"
      			v-loading="loading"
  		 		element-loading-text="内容正在加载中">
      			<li>
      				<div>
      					<strong>点击量最高课程</strong>
      					<span>企课网所有课程点击量按降序排列</span>
      				</div>
      				<ul>
      					<li v-for="(v,key) in list">
							<router-link to="/publice/curr-enter" class="el-list">
								<img :src="v.cover" class="self-adaption">
							</router-link>
  							<div>
  								<p>{{v.course_lists_title}}</p>
								  <div class="bg-title">
									<div v-if="v.intro.length > 9">
										<el-popover
										  placement="top"
										  width="400"
										  trigger="hover"
										  :content="v.intro">
										  <el-button slot="reference" style="color:#2c3e50" type="text">{{v.intro}}</el-button>
										</el-popover>
									</div>
								  	<div v-else>
								  		<span>
									  		{{v.intro}}
									  	</span>
								  	</div>
								  </div>
  							</div>
      					</li>
      				</ul>
      			</li>
      		</ul>
      		</el-col>
      		</el-row>
      	</div>
    </div>
</template>

<script>
	import store from '../store/store.js'
	import * as types from '../store/types.js'
	import { getclick } from '../api/api';
export default {
	data(){
		return {
			//接收数据
			fac:[],
			li:[{
				img:'..assets/img/1.png'
				},{
				img:'..assets/img/2.png'
				},{
				img:'..assets/img/3.png'
				},{
				img:'..assets/img/4.png'
			}],
			list: null,
			loading: true,
			//发送数据
			listQuery: {
		        page: 1,
		        company_name: undefined
		  	}
		}
	},
	created(){
		this.getList()
	},
	mounted(){
		this.fac = this.li
	},
	methods:{
		handleadd(){
			this.$router.push({ path:'/publice/manage-new'})
		},
		handleadmi(){
			this.$router.push({ path:'/publice/manage-system'})
		},
		handleadd2(){
			this.$router.push({ path:'/publice/manage-set'})
		},
		handleadmi2(){
			this.$router.push({ path:'/publice/manage-list'})
		},
		getList(){
			let _this = this;
			this.loading = true;
			getclick()
			.then( res => {
				const { code, data, info} = res;
				if(code == '1000'){
					this.loading = false;
					_this.list = data
//					console.log(_this.list)
				}
				
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.layer{
	  	height: 70px;
	  	line-height: 70px;
	  	background-color: #FFF;
	  	margin-bottom: 20px;
  		>span{
  			line-height: 70px;
  			text-align:center;
	  		font-weight: 500;
	  		color: #222222;
  		}	
	}
	.section{
		overflow:hidden;
		padding-bottom: 20px;
		.sec-left{
			width: 100%;
			padding: 0;
			float: left;
			display: flex;
			flex-flow: column;
			li{
				width: 100%;
				display:block;
				display:flex;
				overflow:hidden;
				>div:first-child{
					width: 38%;
					margin: 5% 5%;
					margin-right: 0;
					>img{
						height: 215px;
					}
				}
				>div:nth-child(2){
					text-align:center;
					margin:60px 0px 0 48px;
					>.el-label{
						display:inline-block;
						width: 190px;
					  	height: 31px;
					  	margin-top:20%;
					  	font-size:20px;
					  	font-weight: 500;
					  	text-align: left;
					  	color: #FFF;
					  	text-align:left;
					}
					.el-enter{
						button{
							a{
								display:inline-block;
								overflow:hidden;
								width: 100px;
								height: 40px;
								line-height: 40px;
								color: #FFF;
							}
						}
					}
				}
			}
			>li:first-child{
				background-color: #88dd6d;
				>div:nth-child(2){
					>div:nth-child(2){
						margin-top:43px;
						>button{
							float: left;
							width: 80px;
						  	height: 36px;
						  	opacity: 0.8;
						  	border-radius: 5px;
						  	background-color: #93ec9e;
						  	border-color: #88dd6d;
						  	line-height: 26px;
						  	padding: 0;
						  	&:active{
								opacity: inherit;
							}
						}
					}
				}
			}
			>li:nth-child(2){
				margin-top:20px;
				background-color: #92bbf5;
				>div:nth-child(2){
					>div:nth-child(2){
						margin-top:43px;
						>button{
							float: left;
							width: 80px;
						  	height: 36px;
						  	opacity: 0.8;
						  	border-radius: 5px;
						  	background-color: #aad7f7;
						  	border-color: #92bbf5;
						  	line-height: 26px;
						  	padding: 0;
						  	&:active{
						  		opacity: inherit;
						  	}
						}
					}
				}
			}
		}
		.sec-right{
			overflow:hidden;
			width: 100%;
			padding:0;
			float:left;
			margin-left:2%;
			text-align: left;
			li{
				display:block;
				background-color: #FFF;
				padding:14px 20px 14px 20px;
				>div:nth-child(1){
					text-align:left;
					>strong{
						font-size: 16px;
						color: #222222;
					}
					>span{
						font-size: 14px;
						color: #999999;
					}
				}
				>ul:nth-child(2){
					display:flex;
					flex-wrap: wrap;
					padding: 0 !important;
					>li{
						width: calc(50% - 10px);
						margin:15px;
						padding: 0 !important;
						margin-left: 0 !important;
						margin-right: 0 !important;
						>a:nth-child(1){
							display: block;
							overflow: hidden;
							>.self-adaption{
								max-height: 215px;
								width: 100%;
								/*height: 244px;*/
							}
						}
						>div:nth-child(2){
							>p{
								font-size: 16px;
								font-weight: 500;
								color: #222;
								margin: 10px 0 4px 0;
							}
							.bg-title{
								font-size: 12px;
								color: #999999;
								display:flex;
								flex-wrap: wrap;
								align-items: center;
								div{
									width: 100%;
								}
								button{
									margin: 0 auto;
									text-align: center;
									width: 100% !important;
									height: 43px;									
									display:block;
									overflow:hidden;
									text-overflow:ellipsis; 
									-o-text-overflow:ellipsis;
									white-space:wrap;
									display:block;
									>span:first-child{
										width:100%;
									}
								}
							}
							.el-button--text{
								width: 100%;
								padding: 0 !important;
							}
						}
					}
					>li:nth-child(2), >li:nth-child(4){
						margin-left:20px !important;
					}
				}
			}
			>li:nth-child(2){
				padding-bottom:20px;
			}
		}
	}
</style>