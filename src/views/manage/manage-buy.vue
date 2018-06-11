<template lang="html">
    <div class="el-header">
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
		  	<div class="bg-table">
		  		 <el-table
				    :data="list"
				    stripe
				    style="width: 100%">
				    <el-table-column
				      label="课程封面"
				      prop="cover"
				      header-align="center"
				      align="center"
				      width="300">
				      <template slot-scope="scope">
				      	<img :src="scope.row.cover" alt="" class="img-customized"/>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="course_lists_title"
				      header-align="center"
				      align="center"
				      label="课程标题">
			       	  <template slot-scope="scope">
				       	<!--<router-link tag="li" class="el-pointer":key="props.row.company_id" :to="{ name: '企业购买课程详情', params:{ orderID: props.row.course_lists_id}}">{{ props.row.course_lists_title }}</router-link>-->
		      		  	<span :key="scope.row.course_lists_id"  class="el-pointer" @click="Choice(scope.row.course_lists_id)">{{ scope.row.course_lists_title }}</span>
			       	  </template>
				    </el-table-column>
				    <el-table-column
				      prop="industry_name"
				      header-align="center"
				      align="center"
				      label="课程分类">
				    </el-table-column>
				    <el-table-column
				    	prop="intro"
				    	label="课程简介"
				    	width="240"
				    	header-align="center"
				      	align="center">
				      	<template slot-scope="scope">
						  	<div class="bg-title">{{scope.row.intro}}</div>
							  	<div v-if="scope.row.intro.length > 10">
							  		<el-popover
									  	ref="popover1"
									  	placement="bottom"
								 	 	width="200"									  	
									  	trigger="hover"
									  	:key="scope.row.company_id">
									  	{{scope.row.intro}}
								  	</el-popover>
							  	<el-button v-popover:popover1 type="text" class="bg-oper"></el-button>
							</div>
						</template>
				    </el-table-column>
				    <el-table-column 
				    	label="购买时间"
				    	prop="created_at"
				    	header-align="center"
				      	align="center">
				    </el-table-column>
				    <el-table-column 
				    	label="购买人数"
				    	prop="learn_people"
				    	header-align="center"
				      	align="center">
				    </el-table-column>
				    <el-table-column 
				    	label="已学习时间"
				    	prop=""
				    	header-align="center"
				      	align="center">
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
	import { showCompanyCourseList } from '../../api/api.js'
export default{
	data(){
		return {
			//接收数据
			list: null,
			total:0,
			//发送数据
			listQuery: {
		        company_id: undefined
		  	},
			labelPosition: 'right',
			fileList2: [],
	      	input:'',
			value:''
		}
	},
	created(){
		this.getList();
		this.listQuery.company_id = this.$route.params.id;
	},
	watch: {
      '$route'(to,from){
        this.total = 1;
      	this.list = null;
		this.getList();
      }
    },
	methods:{
		getList() {
		  let List = JSON.parse(window.localStorage.getItem('defai'))
	      let _this = this;
	      showCompanyCourseList(List)
	      .then( res => {
	      	let { code , total, info, data } = res;
	       if( code == 1000){
	       	 	this.list = data.data
	        	this.total = data.total
	       	}else{
	       		this.$message({
                  message: info,
                  type: 'warning'
                });
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
        },
		route(){
			this.$router.go(-1)
		},
		Choice(id){
        	this.$router.push({name: '企业购买课程详情', params:{ orderID: id}})
//      	this.list = null;
//      	this.listQuery.page = 1
//      	this.getList()
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
	.bg-table{
		padding:20px 20px;
		background-color: #FFF !important;
		.img-customized{
			width:160px;
		}
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
		.el-select{
			width: 120px;
			height: 36px;
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