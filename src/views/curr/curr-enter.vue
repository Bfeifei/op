<template lang="html">
    <div class="">
     	<el-row :gutter="0">
 		 <el-col :span="24">
 		 	<el-col :span="24"><div class="grid-content bg-color">企业课库</div></el-col>
     	  <!--<el-tabs v-model="activeName" @tab-click="handleClick" class="bg-color">-->
		    <!--<el-tab-pane label="企业课库" name="first">-->
		    	<!--<div class="bg-nav">
			  		<div class="bg-left">
	  					
			  		</div>
			  		<div class="bg-right">
				  		<el-button type="text" @click="Sort">按点击量排序</el-button>
				  	</div>
			  	</div>-->
			  	<el-col class="bg-color">
			  	<el-col :span="24">
				  	<div class="bg-nav">
				  		<div class="bg-left">
				  			<el-button @click="handleUpload" class="successBtn">上传</el-button>
				  		</div>
				  		<div class="bg-right">
					  		<el-button type="text" @click="Sort">按点击量排序</el-button>
				  		</div>
				  	</div>
				</el-col>
		    	<div class="bg-table">
			  		 <el-table
					    :data="list"
					    v-loading="loading"
		  		 		element-loading-text="正在加载中"
					    sortable="true"
					    :sort-method="true"
					    filters="tableData"
					    @filters-method="filtersMethod"
					    style="width: 100%">
					    <el-table-column
					    	header-align="center"
					    	align="center"
					    	prop="id"
					    	label="课程ID">
					    </el-table-column>
					    <el-table-column
				    	  header-align="center"
					      align="center"
					      prop="cover"
					      label="课程封面"
					      width="180">
					      <template slot-scope="scope">
					      	<img :src="scope.row.cover" alt="" class="el-img"/>
					      </template>
					    </el-table-column>
					    <el-table-column
					      header-align="center"
					      align="center"
					      prop="course_lists_title"
					      label="课程标题">
					      <template slot-scope="scope">
					      	<el-button type="text" @click="Choice(scope.row.id,scope.row.author_id,scope.row.is_hot)" class="el-pointer" style="width: 100%; text-align:center;">{{ scope.row.course_lists_title }}</el-button>
			      		  </template>
					    </el-table-column>
					    <el-table-column
					      header-align="center"
					      align="center"
					      prop="author_name"
					      label="讲师">
					      <template slot-scope="scope">
					      	<el-button type="text" @click="Lecturer(scope.row.author_id)" class="el-pointer" style="width: 100%; text-align:center;">{{ scope.row.author_name }}</el-button>
			      		  </template>
					    </el-table-column>
					    <el-table-column
					    	header-align="center"
					      align="center"
					      prop="categoryName"
					      label="课程分类">
					    </el-table-column>
					    <el-table-column
					      header-align="center"
					      align="center"
					      prop="click"
					      label="点击量">
					    </el-table-column>
					    <el-table-column
			    		  header-align="center"
					      align="center"
					      prop="intro"
					      label="课程简介">
					      <!--<template slot-scope="scope">
						  	<div class="bg-title">{{scope.row.intro}}</div>
							  	<div v-if="scope.row.intro.length > 9">
								  		<el-popover
										  ref="popover1"
										  placement="bottom"
										  width="300"
										  trigger="hover"
										  :key="scope.row.id">
										  {{scope.row.intro}}
									  </el-popover>
									  <el-button v-popover:popover1 type="text" class="bg-oper"></el-button>
								</div>
							</template>-->
							
							<template slot-scope="scope">
						  	<div class="bg-cont">{{scope.row.intro}}</div>
							  	<div v-if="scope.row.intro.length > 20">
						  		  <el-popover
									  ref="popover1"
									  placement="bottom"
									  width="300"
									  trigger="hover"
									  :key="scope.row.id">
									  {{scope.row.intro}}
								  </el-popover>
								  <el-button v-popover:popover1 type="text" class="bg-oper"></el-button>
								</div>
							</template>
					    </el-table-column>
					    <el-table-column
					    	header-align="center"
					      align="center"
					      prop="questions"
					      label="是否有题库">
					      <template slot-scope="scope">
					      	<span v-text="Number(scope.row.is_subject) ? '是' :'否'"></span>
					      </template>
					    </el-table-column>
					    <el-table-column
					    	header-align="center"
					      align="center"
					      prop="is_hot"
					      label="是否热门">
					      <template slot-scope="scope">
					      	<span v-text="scope.row.is_hot =='true' ? '是' :'否'"></span>
					      </template>
					    </el-table-column>
					  </el-table>
			  		<div class="block" align="center">
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
		    <!--</el-tab-pane>-->
		    <!--<el-tab-pane label="个人课库" name="second">
		    	<div class="bg-nav">
			  		<div class="bg-left">
			  		</div>
			  		<div class="bg-right">
				  		
				  	</div>
			  	</div>
		    	<div class="bg-table">
		    		
		  		</div>
		    </el-tab-pane>-->
		  <!--</el-tabs>-->
		  </el-col>
		</el-row>
    </div>
</template>

<script>
	import bus from '../../store/event.js'
	import { courseLists, clickSort } from '../../api/api'
	
	import store from '../../store/store'
	import * as types from '../../store/types'
export default {
	data(){
		return {
			//接收数据
			list: null,
			total:0,
			loading: true,
			data:{
            	categoryId: '12',
            	course_list_id: '21'
            },
			//发送数据
			listQuery: {
				page: 1,
		        pageSize: 10,
		        sort: undefined
		  	},
		 	activeName: 'first',
		 	opaction4:[],
		 	input:'',
		 	fileList: [],
		 	fileList3: [],
		 	imageUrl: ''
		}
	},
	created() {
    	this.getList()
  	},
	methods:{
		handleUpload(){
			this.$router.push({path: '/publice/curr-videoup'})
		},
		Sort(){
			this.loading = true 			
			courseLists(this.listQuery)
			.then( res => {
				const { code, info, data} = res
				if(code == 1000){
					this.list = null;
					if(this.list == null){
						this.loading = false
						this.list = data[1]
					}
				}
			})
			if(this.listQuery.sort){
				this.listQuery.sort = undefined
			}else{
				this.listQuery.sort = 2
			}
		},
		Choice(Id,author,Choice){
			let letuer = {'id':Id,'author_id': author, 'hot':Choice}
			store.commit(types.ID,letuer)
			
			this.$router.push({path: '/publice/curr-enter/curr-details' })
		},
		Lecturer(Id){
			bus.$emit('Tell-lecturer', Id)
//			1500-800 = 700
			Math.random()*9000
			var num = Math.random()*9000 + 1000;
			num = parseInt(num, 10);
			this.$router.push({name: '讲师详情', params:{id:Id+num} })
		},
		getList(){
			this.loading = true
			courseLists(this.listQuery)
			.then( res => {
				const { code, info, data} = res
					if(code == 1000){					
					this.total = data[0].total
					this.list = data[1]
					this.loading = false 
				}
			})
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
		handleRemove(file, fileList) {
//	        console.log(file, fileList);
      	},
	    handlePreview(file) {
//	        console.log(file);
	    },
		handleClick(tab, event) {
//	        console.log(tab, event);
	    },
	    handleChange(file, fileList) {
//      	this.fileList3 = fileList.slice(-3);
      	},
      	handleAvatarSuccess(res, file) {
//      this.imageUrl = URL.createObjectURL(file.raw);
      	},
      	beforeAvatarUpload(file) {
//	        const isJPG = file.type === 'image/jpeg';
//	        const isLt2M = file.size / 1024 / 1024 < 2;
//	
//	        if (!isJPG) {
//	          this.$message.error('上传头像图片只能是 JPG 格式!');
//	        }
//	        if (!isLt2M) {
//	          this.$message.error('上传头像图片大小不能超过 2MB!');
//	        }
//	        return isJPG && isLt2M;
      	},
      	submitUpload() {
//	        this.$refs.upload.submit();
	    },
		filtersMethod(value,row){
//			console.log(value,row)
		}
    }
}
</script>

<style lang="scss" scoped>
	.bg-head{
		overflow:hidden;
		background-color: #FFF;
		padding:15px 20px;
		.bg-left{
			float:left;
		}
		.bg-right{
			width: 300px;
			float:right;
			button{
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius:0 10px 10px 0 !important;
			}
			.el-form-item{
				margin-bottom: 0;
			}
		}
	}
	.grid-content{
		  height: 35px;
		  line-height: 35px;
		  border-bottom: 1px solid #ececeb;
		  font-size: 16px;
		  font-weight: 500;
		  text-align: left;
		  color: #222222;
		  padding:15px 0 15px 20px;
	}
	.bg-color{
		  font-size: 16px;
		  font-weight: 500;
		  text-align: left;
		  color: #222222;
		  background-color: #FFF;	  
		  .bg-nav{
			    overflow: hidden;
			    background-color: #FFF;
			    padding: 15px 20px;
			.bg-left{
				float:left;
			}
			.bg-right{
				width: 300px;
				float:right;
				text-align: right;
				.el-input-group__append{
				    border-radius: 0 10px 10px 0 !important;
				}
				button{
					padding: 10px !important;
					color: #6fc056;
					text-decoration: underline;
				}
			}
		}
		.el-tabs__header{
			margin: 0;
		}
		.bg-table{
			padding:0 20px;
			background-color: #FFF !important;
			.el-pagin{
				margin:20px;
			}
			.cell{
				text-align: center;
			}
			.el-table__row{
				.el-pointer{
					&:hover{
						cursor: pointer
					}
				}
			}
		}
		.cell{
			.el-img{
				width:160px;
				height:80px;
				background-color: #ebebeb;
				margin-top: 5px;
			}
		}
	}
	.cell{
		.bg-cont{
			width:100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			float: left;
		}
		.bg-oper{
			width: 100%;
			height:40px;
			position: absolute;
			float: left;
			margin: 9px 0 0 20px;
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
	.el-table__body{
		.el-table__row{
			height: 100px;
		}
	}
</style>