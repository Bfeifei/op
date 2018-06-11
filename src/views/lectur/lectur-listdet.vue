<template lang="html">
    <div class="el-header">
  	 	<el-row :gutter="20">
     	  	<el-col :span="24"><div class="grid-content bg-color"><el-button type="text" @click="route" replace style="font-size: 16px">讲师系统</el-button><i class="el-icon-arrow-right"></i>讲师详情</div></el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
		  	<div class="el-conta grid-content">
		  		<div class="">
			  		<div class="bg-purple">
			  			<img src="../../assets/img/invalid-name.png" alt="" />
			  		</div>
		  			<div class="bg-intro">
		  				<div class="el-top">
				  			<h5>这是课程标题{{this.$route.params.id}}</h5>
				  			<p>这是课程简介这是课程简介这是课程简介这是课程简介这是课程简介这是课程简
							介这是课程简介这是课程简介这是课程简介这是课程简介这是课程简介这是课程
							简介这是课程简介这是课程简介这是课程简介这是课程简介.</p>
				  		</div>
				  		<div class="el-bot">
				  			<label for="">课程选集(共{{listnumber.length}}集)</label>
				  			<el-col :span="24">
				  				<el-radio-group v-model="radio3" class="el-anth">
								    <el-radio-button v-for="item in listnumber" :key="item" :label="item"></el-radio-button>
							  	</el-radio-group>
				  			</el-col>
				  		</div>
		  			</div>
			  	</div>
		  		<div class="">
		  			<label for="">老师简介</label>
		  			<p>{{Teacher}}</p>
		  		</div>
			  	<div class="">
			  		<h5>其他相关课程</h5>
			  		<ul class="bg-more">
			  			<li>
		  					<img src="../../assets/img/1D9245A5-66E1-47F3-9D13-F2E4F818D50F.png" alt="" />
			  				<label for="">追梦者</label>
			  				<p>老师姓名 课程简介课程简介课程简介课程简
							课程简介课程简介课程简介课程简介</p>
			  			</li>
			  			<li>
		  					<img src="../../assets/img/1D9245A5-66E1-47F3-9D13-F2E4F818D50F.png" alt="" />
			  				<label for="">追梦者</label>
			  				<p>老师姓名 课程简介课程简介课程简介课程简
							课程简介课程简介课程简介课程简介</p>
			  			</li>
			  			<li>
		  					<img src="../../assets/img/1D9245A5-66E1-47F3-9D13-F2E4F818D50F.png" alt="" />
			  				<label for="">追梦者</label>
			  				<p>老师姓名 课程简介课程简介课程简介课程简
							课程简介课程简介课程简介课程简介</p>
			  			</li>
			  			<li>
		  					<img src="../../assets/img/1D9245A5-66E1-47F3-9D13-F2E4F818D50F.png" alt="" />
			  				<label for="">追梦者</label>
			  				<p>老师姓名 课程简介课程简介课程简介课程简
							课程简介课程简介课程简介课程简介</p>
			  			</li>
			  		</ul>
			  	</div>
			  	
		  	</div>
		  	</el-col>
		</el-row>
    </div>
</template>

<script>
export default{
	data(){
		return {
			radio3: '',
			listnumber:[1,2,3,4,5,6],
			Teacher:'这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介.',
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
	.bg-color{
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding:13.5px 20px;
		border:1px solid #ececeb;
	}
	.el-header{
		background-color: #FFF;
		.el-conta{
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
					margin-left:15px;
					label{
						font-size: 14px;
						margin-bottom: 15px;
					}
					.el-anth{
						margin-top: 15px;
						.el-radio-button{
							margin-right: 15px;
							border-radius: 20px !important;
								.el-radio-button__orig-radio{
									.el-radio-button__inner{
									border:1px solid #999999 !important;
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
						margin-bottom: 25px;
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
					display:flex;
					li{
						display:inline-block;
						justify-content: flex-start;
						min-width: 254px;
						width: 100%;
						margin-right:20px;
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
					li:last-child{
						margin-right: 0;
					}
				}
			}
		}
	}
</style>