<template lang="html">
    <div class="el-header">
      	 <el-row :gutter="20">
     	  	<el-col :span="24">
     	  		<div class="grid-content bg-nav">
			  		<div class="bg-left">
			  			<el-button type="text" @click="route" style="font-size: 16px">企业课程列表</el-button><i class="el-icon-arrow-right"></i><el-button type="text" @click="route1" style="font-size: 16px">企业购买列表</el-button><i class="el-icon-arrow-right"></i>课程详情
			  		</div>
			  		<div class="bg-right">
			  		</div>
		  		</div>
     	  	</el-col>
     	  	<el-col :span="24">
		  	<div class="v-content"  v-loading="loading">
		  		<div class="v-conta grid-content" v-if="!loading">
		  			<div class="" >
				  		<div class="bg-purple">
				  			<img :src="list.cover" alt="" />
				  		</div>
			  			<div class="bg-intro">
			  				<div class="el-top">
					  			<h5>{{list.course_lists_title}}</h5>
					  			<p>{{list.course_intro}}</p>
					  		</div>
					  		<div class="el-bot">
					  			<label for="">课程播放量：{{list.click}}</label>
					  			<div v-if="discount">
					  				<div class="lab_price">
					  					<label for="">￥{{list.price}}</label>
					  					<el-tag type="warning" color="#fba206" style="color:#FFF">80%折扣优惠</el-tag>
					  				</div>
					  				<div class="btn_price">
					  					<el-button type="danger">￥{{prices}} 购买课程</el-button>
					  				</div>
					  			</div>
					  			<div v-else>
					  				<div class="lab_price">
					  					<label for="">￥{{list.price}}</label>
					  				</div>
					  				<div class="btn_price">
					  					<el-button type="danger" @click="handlebuy">购买课程</el-button>
					  				</div>
					  			</div>
					  		</div>
			  			</div>
				  	</div>
			  		<div class="">
			  			<label for="">讲师：{{list.name}}</label>
			  			<p>{{list.intro}}</p>
			  		</div>
				  	<div class="">
				  		<h5>其他相关课程</h5>
				  		<ul class="bg-more">
				  			<li v-for="v in list.courseInfo">
				  				<div v-if="!v.course_cover" class="el-upload-dragger">
				  					<i class="el-icon-loading" style="font-size:40px; line-height: 180px; text-align:center; color: #666666"></i>
				  				</div>
				  				<img v-else :src="v.course_cover" alt="" style=""/>
				  				<label for="" style="margin-top:20px; display:block;">{{v.course_title}}</label>
				  				<p></p>
				  			</li>
				  		</ul>
				  	</div>
		  		</div>
		  	</div>
		  	</el-col>
		</el-row> 
    </div>
</template>

<script>
	import { showCourseInfo } from '../../api/api.js'
export default{
	data(){
		return {
			loading: true,
			list: {},
			listQuery: {
		        course_lists_id: undefined
		  	},
			radio3: '',
			listnumber:[1,2,3,4,5,6],
			labelPosition: 'right',
			discount:0
		}
	},
	watch: {
      '$route'(to,from){
      	this.listQuery.course_lists_id = this.$route.params.orderID
      	this.list = {};
		this.getList();
      }
    },
	created(){
		this.getList()
		this.listQuery.course_lists_id = this.$route.params.orderID
	},
	methods:{
		getList(){
			this.loading = true
			showCourseInfo(this.listQuery)
			.then( res => {
				const { code, data, info} = res
				if(code == 1000){
					this.loading = false
					this.list = data
				}else{
					this.$message({
	                  message: info,
	                  type: 'warning'
	                });
				}
			})
		},
		route(){
			this.$router.go(-2)
		},
		route1(){
			this.$router.go(-1)
		},
		handlebuy(){
			this.$router.push({ path: '/publice/manage-set'})
		},
		handleRemove(file, fileList) {
	        console.log(file, fileList);
      	},
      	handlePreview(file) {
	        console.log(file);
      	},
      	handleSizeChange(val) {
		    console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
		    console.log(`当前页: ${val}`);
		},
		sortChange(column, prop, order){
				console.log(1)
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
	.v-content{
		min-height: 400px;
		.v-conta{
			background: #FFF;
			text-align: center;
			padding:20px 15px 20px 15px;
			color: #222222;
			>div:first-child{
				display:flex;
				text-align:left;
				.bg-purple{
					img{
						height: 240px;
					}
				}
				.bg-intro{
					margin-left: 15px;
					label{
						font-size: 14px;
						margin-bottom: 15px;
					}
					.lab_price{
						position: relative;
						margin-top: 20px;
						label{
							color: #f84e3d;
							font-size: 26px;
						}
						.el-tag{
							position:absolute;
							top:0;
							bottom:0;
							left:120px;
							margin:auto;
							display: inline-block;
						}
					}
					.btn_price{
						margin-top: 20px;
						button{
							font-size: 14px;
							border-radius: 20px;
						}
					}
					.el-anth{
						margin-top: 15px;
						.el-radio-button{
							margin-right: 15px;
							border-radius: 20px !important;
							.el-radio-button__orig-radio{
								.el-radio-button__inner{
								border: 1px solid #999999 !important;
								background-color: #999999 !important; 
								border-radius: 50% !important;
								}
							}
						}
					}
				}
				.bg-purple, .bg-intro{
					float: left;
					h5{
						font-size: 20px;
	  					font-weight: 500;
	  					margin: 8px 0 8px 0;
					}
					p{
						font-size: 14px;
						color: #666666;
						margin-bottom: 10px;
					}
				}
			}
			>div:nth-child(2){
				text-align: left;
				label{
					font-size: 16px;
					font-weight: 500;
					margin: 15px 0 15px 0;
				}
				p{
					font-size: 14px;
					color: #666666;
					margin-bottom: 25px;
					margin:10px 0 15px 0;
				}
			}
			>div:nth-child(3){
				text-align: left;
				h5{
					font-size: 16px;
					font-weight: 500;
					margin: 8px 0 8px 0;
				}
				.bg-more{
					display: flex;
					flex-wrap: wrap;
					li{
						display:inline-block;
						justify-content: flex-start;
						min-width: 254px;
						width: 24%;
						margin-left:10px;
						img{
							width:100%;
						}
						label{
							font-size: 14px;
		  					font-weight: 500;
		  					margin: 8px 0 8px 0;
						}
						p{
							font-size: 12px;
							color: #666666;
							margin-bottom: 25px;
						}
					}
				}
			}
		}
	}
	
</style>