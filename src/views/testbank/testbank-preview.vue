<template lang="html">
    <div class="el-header">
      	 <el-row :gutter="20">
     	  	<el-col :span="24">
     	  		<div class="grid-content bg-nav">
			  		<div class="bg-left">
			  			<el-button type="text" @click="route" style="font-size: 16px">企业题库</el-button><i class="el-icon-arrow-right"></i>题库预览
			  		</div>
			  		<div class="bg-right">
				  		
			  		</div>
		  		</div>
     	  	</el-col>
     	  	<el-col :span="24" >
		  	<div class="bg-nav">
		  			<div class="">
	  				<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span style="line-height: 36px;">搜索结果</span>
					  </div>
					  <div v-for="(o,key) in form" :key="key" class="text item" style="padding:10px 0;border-bottom: 1px solid #d1dbe5">
					   <span class="v-test">{{key+1+"."}}题目是：{{o.q_title}} (<span v-text="tests[o.q_type - 1]"></span>)</span>
					   <div class="v-testlist" v-if="o.q_type == 1 ? true : false">
					   	<el-radio-group v-model="o.answer">
				   			<ul>
						   		<li v-for="(i,key) in o.choice"> <el-radio  :label="key" :key="key">{{key+"."+i}}</el-radio></li>
						   </ul>
						  </el-radio-group>
					   </div>
					   <!---->
					   	<div class="v-testlist" v-if="o.q_type == 2 ? true : false">
					   		<el-checkbox-group v-model="o.answer">
							   <ul>
							   		<li v-for="(i,key) in o.choice"> <el-checkbox  :label="key" :key="key">{{key+"."+i}}</el-checkbox></li>
							   </ul>
						  	</el-checkbox-group>
					   	</div>
					   	<div class="v-testlist" v-if="o.q_type == 3 ? true : false">
					   		<el-radio-group v-model="o.answer">
					   			<ul>
							   		<li v-for="(i,key) in o.choice"> <el-radio  :label="key" :key="key">{{key+"."+i}}</el-radio></li>
							   </ul>
							  </el-radio-group>
					   	</div>
					  </div>
					</el-card>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
    </div>
</template>
<script>
	import { ExamclassPreview } from '../../api/api'
export default{
	data(){
		return {
			listQuery: {
	      		course_list_id: ''
	      	},
			form: null,
		 	judge:['是','否'],
		 	tests:['单选','多选','判断'],
		 	sendList: {},
		 	jsonurl: {},
		 	sendata: {}
		}
	},
	created(){
		this.getList()
	},
	methods:{
		getList(){
			this.listQuery.course_list_id = JSON.parse(window.sessionStorage.getItem('preview'))
			ExamclassPreview(this.listQuery)
			.then( res => {
				const { code, info ,data} = res
				if( code == 1000){
					for(let i = 0; i< data.length;i++){
						data[i]["answer"] = [];
		      		}
					this.form = data
				}
			})
		},
		route(){
			this.$router.go(-1)
		},
		submitForm(){
			
		},
		resetForm(){
			
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
	.v-test{
		height:40px;
		margin:5px 0;display:block;
		>span{
			margin:0 10px;			
		}
	}
	.v-testlist{
		margin:5px 0;display:block;
		>span{
			margin:0 10px;			
		}
	}
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
	.bg-form{
		height:500px;
		padding:20px 20px;
		background-color: #FFF !important;
		
		
	}
	.cell{
		.bg-title{
			width:140px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			float: left;
		}
		.bg-oper{
			float: left;
			margin: 9px 0 0 5px;
		}
	}
</style>