<template lang="html">
    <div class="">
     	<el-row :gutter="20">
		  <el-col :span="24">
		  	<div class="bg-nav">
		  		<div class="bg-left">
		  			<div class="grid-content bg-color">消息列表</div>
		  		</div>
		  		<div class="bg-right">
			    	<el-button type="success" class="successBtn" @click="ReleaseNews">发布消息</el-button>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :span="24" >
		  	<div class="bg-table">
		  		 <el-table
		  		 	v-loading="loading"
		  		 	element-loading-text="正在加载中"
				    :data="list"
				    stripe
				    style="width: 100%">
				    <el-table-column
				      prop="created_at"
				      header-align="center"
				      align="center"
				      width="170"
				      label="发布时间">
				    </el-table-column>
				    <el-table-column
				    	prop="title"
				    	header-align="center"
				      	align="center"
				      	label="消息标题">
				      	<template slot-scope="scope">
				      		<!--<router-link to="" tags="li" key="scope.id"></router-link>-->
				      		<el-button type="text" @click="handleTitle(scope.row.id)" class="el-pointer">{{scope.row.title}}</el-button>
				      	</template>
				    </el-table-column>
				  </el-table>
		  		 <div class="block">
				  <el-pagination
				   class="el-pagin"
				    layout="prev, pager, next"
				    :total="Number(total)"
				    :page-size="10"
				    :current-page.sync="listQuery.page"
				    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
				    >
				  </el-pagination>
				</div>
		  	</div>

		  </el-col>
		</el-row>
    </div>
</template>

<script>
	import { pushList } from '@/api/api.js';
	import store from '@/store/store'
	import * as types from '@/store/types'
export default {
	data(){
		return {
			//接收数据
			list: null,
			total:0,
			loading: false,
			//发送数据
			listQuery: {
		        page: 1,
		        title: undefined
		  	}
		}
	},
	created() {
//		this.list = this.tableData
    	this.getList()
  	},
	methods:{
		handleTitle(ID){
			this.$router.push({path:'message-list/message-details'})
			store.commit(types.MESSAGE,ID)
		},
		ReleaseNews(){
			this.$router.push({
				path:'message-list/message-news'
			})
		},
		//获取数据
		getList() {
//	      this.loading = true
	      pushList(this.listQuery)
	      .then(res => {
	      	let { code, info, data } = res;
	        if(code == 1000) {
	        	this.list = data.data
	        	this.total = data.total
	        	this.listLoading = false
	        }
	      })
	   	},
		handleSizeChange(page){
            this.listQuery.page = val
      		this.getList()
        },
        handleCurrentChange(val){
        	this.listQuery.page = val
      		this.getList()
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
		overflow:hidden;
		background-color: #FFF;
		border-bottom :1px solid #ececeb;
		padding: 6.5px 20px;
		.bg-left{
			float:left;
			.bg-color{
				font-size: 16px;
				font-weight: 500;
				text-align: left;
				color: #222222;
				background-color: #FFF;
				padding:15px 0 15px 0px;
			}
			.grid-content{
				border:none;
			}
		}
		.bg-right{
			width: 300px;
			height: 51.11px;
			line-height: 51.11px;
			float:right;
			button{
				margin:0px;
			}
		}
	}
	.bg-table{
		height:500px;
		padding:20px 20px;
		background-color: #FFF !important;
		.el-pagin{
			margin-top:20px;
			text-align:center;
		}
		.cell{
			text-align: center;
			.bg-title{
				width: 260px;
				text-align:center;
				height: 35.99px;
				display:flex;
				flex-wrap: wrap;
				align-items: center;
				div{
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				button{
					text-align:left;
					margin: 0 auto;
					text-align: center;
					width: 257px;
					height: 20px;
					line-height: 20px;
					display:block;
					overflow:hidden;
					text-overflow:ellipsis; 
					-o-text-overflow:ellipsis;
					white-space:nowrap;
					span{
						text-align:left;
						width: 90px !important;
					}
				}
				.el-button--text{
					padding: 0 !important;
				}
				.bg-color{
					color:#2c3e50
				}
			}
		}
		.el-select{
			width: 120px;
			height: 36px;
		}
		
	}
	.el-img{
		min-width:100px;
		min-height:40px;
		background-color: #ebebeb;
		margin-top: 5px;
	}
</style>