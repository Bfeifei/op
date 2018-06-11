<template lang="html">
    <div class="el-header">
      	 <el-row :gutter="20">
     	  	<el-col :span="24">
     	  		<div class="grid-content bg-nav">
			  		<div class="bg-left">
			  			<el-button type="text" @click="route" style="font-size: 16px">{{Route.Go}}</el-button><i class="el-icon-arrow-right"></i><el-button type="text" @click="route1" style="font-size: 16px">课程详情</el-button><i class="el-icon-arrow-right"></i>编辑
			  		</div>
		  		</div>
     	  	</el-col>
		  	<el-col :span="24">
		  		<div class="el-had">
					<el-form
						:label-position="labelPosition" 
						label-width="150px"
						:inline="true"
						:model="lecturer"
						ref="ruleForm2"
						:rules="rules">
					  <el-form-item label="创建课程系列名称:" class="el-fo" prop="course_lists_title">
					    <el-input v-model="lecturer.course_lists_title"></el-input>
					  </el-form-item>
					  <el-form-item label="讲师姓名:" class="el-fo" prop="name">
					  	<el-input v-model="lecturer.name"></el-input>
					  </el-form-item>
					  <el-form-item label="讲师职位:" class="el-fo" prop="author_position" align="left">
				  		 	<el-input v-model="lecturer.author_position"></el-input>
					  </el-form-item>
					  <el-form-item label="选择分类:" class="el-fo">
					    	<template slot-scope="scope">
					    		<div class="el-form-item__content">
						    		<div class="el-input">
						    			<el-select v-model="lecturer.course_categorys_id" placeholder="选择分类" class="el-sel">
									      <el-option v-for="item in listData" :label="item.name" :value="item.id" :key="item.name"></el-option>
									    </el-select>
								    	<el-select v-model="lecturer.course_categorys_pid" placeholder="选择分类" class="el-ses">
									      <el-option v-for="item in listData" :label="item.name" :value="item.id" :key="item.name"></el-option>
									    </el-select>
						    		</div>
						    	</div>
					    	</template>
					  </el-form-item>
					  <el-form-item label="创建课程系列详情:" class="el-fo" prop="intro">
						    <el-input
							  type="textarea"
							  style="width: 257px;margin-left: 20px;"
							  :autosize="{ minRows: 8, maxRows: 8}"
							  :minlength="0"
							  placeholder="请输入讲师详情"
							  v-model="lecturer.intro">
							</el-input>
					  </el-form-item>
					  <el-form-item label="讲师详情:" class="el-fo" prop="author_intro">
					  		 <el-input
							  type="textarea"
							  style="width: 257px; margin-left: 20px;"
							  :autosize="{ minRows: 8, maxRows: 8}"
							  placeholder="请输入讲师详情"
							  v-model="lecturer.author_intro">
							</el-input>
					  </el-form-item>
					   <el-form-item label="创建课程系列封面:" class="el-fo" prop="">
							<template slot-scope="scope">
								<div class="upload">
									<div class="el-form-item__content">
										<div class="el-input">
											<input v-model="file_name" autocomplete="off" rows="2" validateevent="true" type="text" class="el-input__inner" placeholder="点击上传课程系列封面"  @click="upload">
										</div>
									</div>
									<input type="file" multiple="multiple" accept="image/*" ref="upload" @change="onChange"  style="position:absolute;clip:rect(0 0 0 0);">
								</div>
							</template>
					  </el-form-item>
					   <el-form-item label="价格:" class="el-fo" prop="price">
					    	<el-input v-model="lecturer.price" min="0"></el-input>
					  </el-form-item>
					  <el-form-item label="" class="el-fo el-image" prop="" align="left">
					  	<div class="el-upload-dragger">
					  		<span v-if="!FileUrl">封面预览区</span>
					  		<img :src="FileUrl" alt=""/>
					  	</div>
					  </el-form-item>
					  <el-form-item label="" class="el-fo el-image" prop="" align="left">
					  	<div class="el-right">
					  		
					  	</div>
					  </el-form-item>
					  <el-col :span="24">
					  	<el-form-item>
						  	<el-button class="successBtn" @click="submitForm('ruleForm2')" :loading="loading">确认修改</el-button>
						</el-form-item>
					  </el-col>
					 </el-form>
		  	    </div>
		  	</el-col>
		  	<el-col :span="24" style="margin-top:20px">
			  	<div class="bg-nav grid-border">
			  		<div class="bg-left">
			  			<span>课程选集(共{{length}}集) </span>
			  		</div>
			  		<div class="bg-right">
			  			<el-button @click="handleadd" class="successBtn">添加视频</el-button>
			  			<el-button @click="delall" class="resetBtn">全部删除</el-button>
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
				      prop="collection"
				      header-align="center"
				      align="center"
				      width="100"
				      label="集数">
				      <template slot-scope="scope">
				      	<span v-text="scope.$index+1"></span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="course_cover"
				      header-align="center"
				      align="center"
				      width="150"
				      label="课程封面">
				      <template slot-scope="scope">
				      	<img :src="scope.row.course_cover" alt=""  class="el-img"/>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="course_title"
				      header-align="center"
				      align="center"
				      label="课程简介">
				    </el-table-column>
				    <el-table-column
				      prop="industry"
				      header-align="center"
				      align="center"
				      width="100"
				      label="操作">
				      <template slot-scope="scope">
				      	<el-button :plain="true" type="warning" size="small" @click="remove(scope.$index,scope.row.id)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
		  	</div>
		  	</el-col>
		</el-row>
     	  
    </div>
</template>

<script>
	var reader = new FileReader();
	var fromData = new FormData();
	import { del, delAll, videoList, /* 编辑*/getification, uploadCour, courseListsdetails, Courselistsedit } from '../../api/api'
	import store from '../../store/store'
	import * as types from '../../store/types'
	import bus from '../../store/event'
	
export default{
	data(){
		return {
			//接收数据
			list: null,
			total:0,
			loading: false,
			length: 0,
			//发送数据
			listQuery: {
		        course_list_id: undefined
		  	},
			listRemove: {
		        course_lists_id: undefined
		  	},
		  	dist: {
		  		id: ''
		  	},
		  	listObject: {
		  		id: ''
		  	},
		  	/* ------新加的--------*/
		  	data:{
            	categoryId: '',
            	course_list_id: ''
            },
            listData:{},
        	lecturer: {
        		cover:''
        	},
        	FileUrl: '',
            file_name: '',
		  	labelPosition: 'right',
	        fileList:[],
			disabled: false,
			newVal:'',
			rules:{
				course_lists_title:[{ 
	        		required: true,
	            	message: '请输入课程系列名称',
	            	trigger: 'blur' 
	            }],
				name:[{ 
	        		required: true,
	            	message: '请输入讲师姓名',
	            	trigger: 'blur' 
	            }],
				intro:[{ 
	        		required: true,
	            	message: '请输入课程系列详情',
	            	trigger: 'blur' 
	            }],
				intro:[{ 
	        		required: true,
	            	message: '请输入课程系列详情',
	            	trigger: 'blur' 
	            }],
				author_position:[{ 
	        		required: true,
	            	message: '请输入讲师职位',
	            	trigger: 'blur' 
	            }],
				author_intro:[{ 
	        		required: true,
	            	message: '请输入讲师详情',
	            	trigger: 'blur' 
	            }],
				price: [{ 
	        		required: true,
	            	message: '请输入价格',
	            	trigger: 'blur' 
	            },{
		            pattern: /^\w{1,100000000}$/,
		            message: '价格错误!'
		        }]
			},
			Route:{
				Go: ''
			}
		}
	},
	watch: {
      '$route'(to,from){
      	this.list = null;
      	this.loading = true;
      }
   	},
	created(){
		this.getList();
		let Id = JSON.parse(window.sessionStorage.getItem('data')).id
		this.listQuery.course_list_id = Id
		this.listRemove.course_lists_id = Id
		this.listObject.id = Id
		
		/* ------新加的--------*/
		this.getDrop()
		let router= this.$router.history.current.path
		let path =router.split('/')[3]
		if(path == 'popular-details'){
			this.Route.Go = '热门课程'
		}else if(path == 'curr-details'){
			this.Route.Go = '企业课库'
		}
		
		
	},
	/* ------新加的--------*/
	methods:{
		/* ------新加的--------*/
		getDrop(){
	  		getification()
			.then(res =>{
				const { code, info, data } = res;
				this.listData = data || [];
			})
			courseListsdetails(this.listObject)
			.then( res =>{
				const { code, info, data } = res;
				this.lecturer = data || {}
				this.lecturer['id'] = JSON.parse(sessionStorage.getItem('data')).id
				this.lecturer['author_id'] = JSON.parse(sessionStorage.getItem('data')).author_id
				this.lecturer['cid'] = data.cid
				this.lecturer['cpid'] = data.cpid
				this.FileUrl = data.cover
			})
		},
		upload(){
    		this.$refs.upload.click()
    	},
    	//上传封面
		handleUpload(file){
			console.log(file)
		},
		onChange(event){
			fromData.delete('cover')
			var _this = this;
			var file = event.target.files[0];
			const isPNG = file.type === 'image/png';
      		const isJPG = file.type === 'image/jpeg';
        	if (!isPNG && !isJPG) {
	          this.$message.error('上传图片只能是 png 或者 jpg 格式!');
	          return false
	        }else{
	        	this.lecturer.cover = event.target.files[0];
	        	this.file_name = event.target.files[0].name;
				//获取base64位url图片
				 const readFileload = file => {
				reader.onload = function(){
					_this.FileUrl = this.result
				}
					reader.readAsDataURL(file);
				}
				 readFileload(event.target.files[0])
	        }
		},
		/* ------编辑信息--------*/
		getList(){
			videoList(this.listQuery)
			.then( res => {
				const { code, data, info } = res
				if( code == 1000){
					this.list = data || []
					this.length = this.list.length
				}
				if(code == 1002){
					this.$notify({
			          title: '警告',
			          message: info,
			          type:'warning'
			        });
				}
			})
		},
		handleadd(){
			let _this = this;
			window.sessionStorage.setItem('videoUp',JSON.stringify(_this.listQuery))
			bus.$emit('tell-video', _this.listQuery.course_list_id)
			this.$router.push({ path:'/publice/curr-enterup'})
		},
		delall(){
			var _this = this;
			this.$confirm('此操作将删除该课程全部选集, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	      	})
			.then(() => {
				delAll(this.listRemove)
				.then( res => {
					const { code, info} = res
			  		if(code == 1000){
			  			this.$message({
				            type: 'success',
				            message: '删除成功!'
			          	});
		         	 	_this.list =null;
		         	 	this.$router.push({ path: '/publice/curr-enter'})
			  		}
				})
	        })
			.catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	       });
		},
		remove(index,id){
			var _this = this;
		  	this.dist.id = id
			this.$confirm('此操作将删除该选集, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	      	})
			.then(() => {
				del(this.dist)
			  	.then( res =>{
			  		const { code, info } = res
			  		if(code == 1000){
			  			_this.$message({
				            type: 'success',
				            message: '删除成功!'
			          	});
			          	_this.list.splice(index,1)
			  		}else{
			  			console.log('请检查网络!')
			  		}	  		
			  	})	          
	       	})
			.catch(() => {
	          _this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	       });
	 	},
		route(){
			this.$router.go(-2)
		},
		route1(){
			this.$router.go(-1)
		},
		submitForm(ruleForm2){
			this.$refs.ruleForm2.validate((valid) => {
	          if (valid) {
				if(Number(this.lecturer.course_categorys_pid) === Number(this.lecturer.course_categorys_id)){
			        this.$message({
						type: 'warning',
						message: '课程分类不能一致'
					})
			        return;
	    		}else{
	    			this.loading = true
					var Form = this.lecturer;
					for(let v in Form){
						if(Form[v]){
							fromData.append(v,Form[v])
						}
					}
			  		Courselistsedit(fromData)
			  		.then( res =>{
			  			const { code, data, info} = res
			  			if( code == '1000'){
			  				this.data = data
			  				this.$router.push({path:'/publice/curr-enter/curr-details'})
			  				this.$message({
			  					type: 'success',
			  					message: info
			  				})
			  			}else{
			  				this.loading = false
			  				this.$message({
			  					type: 'warning',
			  					message: info
			  				})
			  			}
			  		})
				}
    		}
     		})
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
	.el-img{
		height: 80px;
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
			text-align: right;
		}
	}
	.el-conta{
		background: #FFF;
		text-align: center;
		padding:20px 15px 20px 15px;
		color: #222222;
		>div:first-child{
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
	}
	.bg-table{
		padding:20px 20px;
		background-color: #FFF !important;
		.el-pagin{
			margin-top:20px;
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
			.el-img{
				width:160px;
				background-color: #ebebeb;
				margin-top: 5px;
			}
		}
	}
	.el-label{
		text-align:left;
	}
	.el-input{
		width: 257px;
		margin-left: 20px;
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	.el-se{
		width:410px;
		.el-sel{
			margin-left: 25px;
		}
		.el-ses{
			margin-left: 15px;
		}
	}
	.el-form{
		.el-image{
			width:277px;padding-left: 130px;
			.el-upload-dragger{
				width: 257px; margin-left: 20px;height: auto;
				img{
					width: 100%;
				}
			}
			.el-right{
				width: 257px; margin-left: 20px;height: auto;
			}
		}
		.el-fo{
			margin-left: 100px;
			margin-right:200px;
			>.el-form-item__label{
				float: left;
			}
			>.el-form-item__content{
				float: left;
				margin-left:0 !important;
			}
			.el-select{
				width:118px;
			}
		}
	}
	
	.bg-color{
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding:15px 0 15px 20px;
		border-bottom:1px solid #ececeb;
	}
	.el-had{
		overflow:hidden;
		background-color: #FFF;
		padding: 15px 20px;
		color: #222222;
		margin-bottom: 15px;
		.bg-left{
			height:22px;
			text-align: left;
			margin:10px 0 20px 0;
			position:relative;
			>img{
				line-height: 22px;
				position: absolute;
				top:3px;
			}
			>span{
				position: absolute;
				left:24px;
			}
		}
		.bg-right{
			width: 300px;
			float:right;
			margin:8px 20px 0 0;
			button{
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius:0 10px 10px 0 !important;
			}
		}
	}
	.bg-title{
		width: 257px;
		text-align:left;
		background-color: #FFF;
		margin-left: 20px;
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
</style>