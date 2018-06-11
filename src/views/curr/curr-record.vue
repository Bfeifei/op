<template lang="html">
    <div class="">
     	<el-row :gutter="20">
		  <el-col :span="24">
		  	<div class="bg-nav">
		  		<div class="bg-left">
		  			<div class="grid-content bg-color">企业购买记录</div>
		  		</div>
		  		<div class="bg-right">
			  		<el-form>
					 	 <el-form-item>
					    	<el-input @keyup.enter.native="handleFilter" placeholder="点击搜索相关词汇" v-model="listQuery.company_name">
					   	 		<el-button slot="append" icon="search" @click="handleFilter">搜索</el-button>
							</el-input>
					  	</el-form-item>
					</el-form>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :span="24" >
		  	<div class="bg-tab">
		  		 <el-table
		  		 	v-loading="loading"
		  		 	element-loading-text="正在加载中"
				    :data="listCmputed"
				    stripe
				    style="width: 100%">
				    <el-table-column
				      label="购买时间"
				      prop="time"
				      header-align="center"
				      align="center">				      
				    </el-table-column>
				    <el-table-column
				      prop="company_id"
				      header-align="center"
				      align="center"
				      label="公司ID">
				    </el-table-column>
				    <el-table-column 
				    	label="公司名称"
				    	prop="order_name"
				    	header-align="center"
				      	align="center">
				      	<template slot-scope="scope">
				      		<div class="">
				      			<el-button type="text" size="small" @click="Choice(scope.row.company_id)" class="bg-color">{{scope.row.order_name}}</el-button>
				      		</div>
				      	</template>
				    </el-table-column>
				    <el-table-column 
				    	label="课程名称"
				    	prop=""
				    	header-align="center"
				      	align="center">
				      	<template slot-scope="scope">
				      		<div class="bg-title">
							  	<div v-if="scope.row.sales_name.length > 9">
							  		<el-popover
									  ref="popover2"
									  placement="bottom"
									  width="180"
									  trigger="hover"
									  :key="scope.row.company_id">
									  {{scope.row.sales_name}}
								  </el-popover>
								  <el-button v-popover:popover2 type="text" class="bg-color">
								  	<span>{{scope.row.sales_name}}</span>
								  </el-button>
							  	</div>
							  	<div v-else>
							  		<span>
								  		{{scope.row.sales_name}}
								  	</span>
							  	</div>
						 	</div>
				      	</template>
				    </el-table-column>
				    <el-table-column 
				    	label="购买学习人数"
				    	prop="learn_people"
				    	header-align="center"
				      	align="center">
				    </el-table-column>
				    <el-table-column 
				    	label="金额"
				    	prop="price"
				    	header-align="center"
				      	align="center">
				      	<template slot-scope="scope">
				      		{{scope.row.price | dateServer}}
				      	</template>
				    </el-table-column>
				  </el-table>
		  	</div>
		  </el-col>
		  <el-col :span="24" >
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
			loading: false,
			//发送数据
			listQuery: {
				page: 1,
		        company_name: undefined
		  	},
		  	formList:[{
		  		time:' 2017-08-10',
		  		company_id: '8001',
		  		order_name: '北京企课信息技术有限公司',
		  		sales_name: '这是课程名称是课程名称上面显示10个字',
		  		created_number: '100次',
		  		learn_people: '2人',
		  		learn_name: '这是购买人',
		  		price: '899-00'
		  	},{
		  		time:' 2017-08-12',
		  		company_id: '8001',
		  		order_name: '北京企课信息技术有限公司',
		  		sales_name: '这是课程名称是课程名称上面显示10个字',
		  		created_number: '12次',
		  		learn_people: '13人',
		  		learn_name: '这是购买人',
		  		price: '882-00'
		  	},{
		  		time:' 2017-08-13',
		  		company_id: '8001',
		  		order_name: '北京企课信息技术有限公司',
		  		sales_name: '这是课程名称是课程名称上面显示10个字',
		  		created_number: '321次',
		  		learn_people: '63人',
		  		learn_name: '这是购买人',
		  		price: '739-00'
		  	}]
		}
	},
	computed:{ 
        listCmputed:function(){
//         return this.list
           return this.formList
		}
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
//	      this.loading = true
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
        	this.$router.push({name: '购买详情', params:{ id: orderId}})
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
			button{
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius:0 10px 10px 0 !important;
			}
		}
	}
	.bg-tab{
		padding:20px 20px;
		background-color: #FFF !important;
		margin-bottom: 20px;
		.el-pagin{
			text-align:center;
		}
		.el-table__row{
			.el-pointer{
				&:hover{
					cursor: pointer
				}
			}
		}
		.cell{
			text-align: center;
			.bg-title{
				display:flex;
				flex-wrap: wrap;
				align-items: center;
				>span:first-child{
					width: 100%;
					height: 20px;
					line-height: 20px;
					display:block;
					overflow:hidden;
					text-overflow:ellipsis; 
					-o-text-overflow:ellipsis;
					white-space:nowrap;
					text-align: center;
				}
				div{
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				.el-button--text{
					padding: 0 !important;
				}
			}
			.bg-color{
				color:#2c3e50
			}
		}
		.el-select{
			width: 120px;
			height: 36px;
		}
		
	}
	.bg-table{
		padding:20px 20px;
		background-color: #FFF !important;
		.el-pagin{
			margin-top:20px;
			text-align:center;
		}
		.el-table__row{
			.el-pointer{
				&:hover{
					cursor: pointer
				}
			}
		}
		.cell{
			text-align: center;
			.bg-title{
				display:flex;
				flex-wrap: wrap;
				align-items: center;
				>span:first-child{
					width: 100%;
					height: 20px;
					line-height: 20px;
					display:block;
					overflow:hidden;
					text-overflow:ellipsis; 
					-o-text-overflow:ellipsis;
					white-space:nowrap;
					text-align: center;
				}
				div{
					width: 100%;
					height: 20px;
					line-height: 20px;
				}
				.el-button--text{
					padding: 0 !important;
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