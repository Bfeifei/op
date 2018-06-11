<template lang="html">
    <div class="el-header">
      	 <el-row :gutter="20">
     	  	<el-col :span="24">
     	  		<div class="grid-content bg-nav">
			  		<div class="bg-left">
			  			<el-button type="text" @click="route" style="font-size: 16px">消息列表</el-button><i class="el-icon-arrow-right"></i>消息详情
			  		</div>
			  		<div class="bg-right">
			  		</div>
		  		</div>
     	  	</el-col>
     	  	<el-col :span="24">
		  		<el-col :span="16" style="margin-top: 30px">
		  			<div class="teach-aside">
		  				<h5 v-text="list.title"></h5>
		  				<content v-html="list.content"></content>
		  			</div>
		  		</el-col>
		 	</el-col>
		</el-row>
     	  
    </div>
</template>

<script>
	import { pushDetial } from '@/api/api.js'
	import store from '@/store/store'
	import * as types from '@/store/types'
	export default{
		data(){
			return {
				//接收数据
				list: {},
				total:0,
				loading: true,
				//发送数据
				listQuery: {
			        id: undefined
			  	},
				labelPosition: 'right',
				formLabelAlign:{
					title: '',
					text: '',
					active: ''
				}
			}
		},
		created(){
			this.getList();
			this.listQuery.company_id = this.$route.params.id;
			
			let message = store.state.message
			if(message != ''){
				sessionStorage.setItem('message',message)
			}else{
				store.state.message = JSON.parse(sessionStorage.getItem('message'))
			}
			
			this.listQuery.id = store.state.message
		},
		watch: {
	      '$route'(to,from){
//	        this.total = 1;
//	      	this.loading = true;
//	      	this.list = null;
//			this.getList();
	      }
	    },
		methods:{
			getList() {
		      this.loading = true
		      let _this = this;
		      pushDetial(this.listQuery)
		      .then( res => {
		      	let { code , total, info, data } = res;
		       if( code == 1000){
		       	 	this.list = data
		       		this.loading = false
		       	}else{
		       		this.$message({
	                  message: info,
	                  type: 'warning'
	                });
		       	}
		      })
		   	},
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
	.teach-aside{
		text-align: left;
		overflow: hidden;
		>h5{
		  	font-family: PingFangSC;
		  	font-size: 28px;
		  	font-weight: 500;
		  	color: #222222;
		  	margin-bottom: 10px;
		}
		>content{
			
			font-family: PingFangSC;
		  	font-size: 18px;
		  	line-height: 1.25;
		  	color: #666666;
		}
	}
</style>