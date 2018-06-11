<template lang="html">
    <div class="">
     	<el-row :gutter="20">
		  <el-col :span="24">
		  	<div class="bg-nav">
		  		<div class="bg-left">
		  			<div class="grid-content bg-color">分类管理</div>
		  		</div>
		  		<div class="bg-right">
		   	 		<el-button @click="dialogFormVisible = true">新增分类</el-button>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :span="8" >
		  	<div class="bg-tab">
		  		<div class="">
	  				<el-card class="box-card box-tab">
					  <div slot="header" class="clearfix">
					    <span class="v-name">分类名称</span>
					    <span class="v-operation">操作</span>
					  </div>
					  <div class="clearfix" v-for="(o,key) in listCmputed" :key="key" style="padding:10px 0;border-bottom: 1px solid #d1dbe5">
					 	<span class="v-name">{{o.name}}</span>
					    <el-button type="" size="small" class="v-delete" @click="handleDelete(key)">删除</el-button>
					  </div>
					</el-card>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :span="8">
			<el-dialog title="新增分类" :visible.sync="dialogFormVisible">
			  <el-form :model="form">
			    <el-form-item style="padding:0 80px;">
			      <el-input v-model="form.name" auto-complete="off" placeholder="点击输入新增分类名称"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="Determine">确 定</el-button>
			  </div>
			</el-dialog>
		  </el-col>
		</el-row>
    </div>
</template>

<script>
	
	import { showCompanyList } from '../../api/api';
export default {
	data(){
		return {
			//接收数据
			list: null,
			total:0,
			loading: true,
			//发送数据
			listQuery: {
				page: 1,
		        company_name: undefined
		  	},
		  	form:{
		  		name: ''
		  	},
        	dialogFormVisible: false,
		  	listCmputed:[{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  },{
		  	name:'这是分类名称'
		  }]
		}
	},
	computed:{  
//      listCmputed:function(){
//         return this.list
//		}
    },
    watch: {
      '$route'(to,from){
      	this.list = null;
      	this.loading = true;
      	this.total = 0;
        this.getList();
      }
    },
	created() {
    	this.getList()
  	},
	methods:{	
		//获取数据
		getList() {
	      this.loading = true
//	      showCompanyList(this.listQuery)
//	      .then(res => {
//	      	let { code, info, data } = res;
//	        this.list = data.data
//	        this.total = data.count
//	        this.loading = false
//	        console.log(data.data)
//	      })
	   	},
	   	handleFilter() {
	      this.listQuery.page = 1
	      this.getList()
	    },
		handleSizeChange(page){
            this.listQuery.page = val
      		this.getList()
        },
        handleCurrentChange(val){
        	this.listQuery.page = val
      		this.getList()
        },
        Choice(orderId){
//      	this.$router.push({path: '/publice/manage-list/manage-buy', query: {selected: orDerId}})
        	this.$router.push({name: '企业购买列表', params:{ id: orderId}})
        },
        handleDelete(index){
        	this.listCmputed.splice(index,1)
        },
        Determine(){
        	this.dialogFormVisible = false;
        	this.listCmputed.unshift({'name':this.form.name})
        	this.form.name = ''
        }
	}
}
</script>

<style lang="scss" scoped>
	.el-input-group__append{
		border-radius:0 10px 10px 0 !important;
	}
	.el-select{
		width: 120px;
		>.el-input{
			max-width: 120px;
		}
	}
	.bg-nav{
		height: 42.02px;
	    overflow: hidden;
	    background-color: #FFF;
	    border-bottom: 1px solid #ececeb;
	    font-size: 16px;
	    font-weight: 500;
	    text-align: left;
	    color: #222222;
	    padding: 11.5px 20px;
		.bg-left{
			height:36px;
			line-height: 33px;
			float:left;
			margin-top: 5px;
		}
		.bg-right{
			width: 300px;
			float:right;
			margin-top: 4px;
			margin-right:50px;
			text-align:right;
			button{
				width:120px;
				background-color: #6fc056;
				color: #FFF;
				border:none !important;
				padding: 10px !important;
				border-radius:10px !important;
			}
		}
	}
	.el-dialog__wrapper{
		margin: auto;
		top:20%;
		width:1040px;
		height: 420px;
		.dialog-footer{
			text-align:center;
			button{
				color: #FFF;
				background-color: #6fc056;
				border-radius: 10px;
				border:1px solid #6fc056; 
			}
		}
	}
	.bg-tab{
		padding:20px 20px;
		background-color: #FFF !important;
		margin-bottom: 20px;
		
		.clearfix{
			overflow:hidden;
			.v-name{
				margin-left: 20px;
				line-height: 36px;
				float:left;
				display:block;
			}
			.v-operation{
				float: right;
				width: 50px;
				line-height: 36px;
			 	text-align:center;
			 	display:block;
			  	margin-right: 40px;
			}
			.v-delete{
				float:right;
				width: 50px;
				margin-right:60px;
				
				
			}
		}
			
	}
	.el-img{
		min-width:100px;
		min-height:40px;
		background-color: #ebebeb;
		margin-top: 5px;
	}
</style>