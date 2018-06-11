<template lang="html">
    <div class="">
        <el-row :gutter="20">
     	  <el-col :span="24"><div class="grid-content bg-color">上传题库</div></el-col>
     	  <el-col :span="24">
     	  	<div class="el-had">
  				<el-col :span="17">
  					<el-form label-width="100px" ref="formLabel">
  					  <el-form-item label="课程名称:" prop="" align="left">
						    <el-autocomplete
						      style="width:400px; margin-left: 20px"
						      class="inline-input"
						      v-model="state1"
						      :fetch-suggestions="querySearch"
						      placeholder="右侧可滑动选择"
						      @select="handleSelect"
						      icon="caret-bottom"
						      :on-icon-click="handleIconClick"
						    ></el-autocomplete>
					  </el-form-item>
					  <el-form-item label="上传题库:" prop="percent" align="left">
					  	<template slot-scope="scope">
							<div class="upload">
								<div class="el-form-item__content" style="display:flex">
									<div class="el-input">
										<input  v-model="excelName" autocomplete="off" rows="2" validateevent="true" type="text" class="el-input__inner" placeholder="+点击上传题库文件"  @click="upload">
									</div>
									<div style=" margin-left: 20px">
										<i class="el-icon-circle-check success" v-show="excelName"></i>
									</div>
								</div>
								<div style="color: #6fc056">
									注 : *文件为excel表格,考题类型以数字匹配(1 为单选，2 为多选， 3 为判断) 注明答案
								</div>
								<input single type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" ref="upload" @change="onChange"  style="position:absolute;clip:rect(0 0 0 0);">
							</div>
						</template>
					  </el-form-item>
					  <el-col :span="24">
					  	<el-form-item>
						  	<el-button class="successBtn" type="success" @click="submitUpload">提交</el-button>
						  	<el-button class="resetBtn" type="warning" @click="resetForm">重置</el-button>
						</el-form-item>
					  </el-col>
					</el-form>
  				</el-col>
	  	    </div>
     	</el-col>
	  
	  	 </el-col>
       </el-row>
    </div>
</template>
<script>
	var formData = new FormData();
	import { ExamclassAdd } from '@/api/api'
    export default {
        data() {
            return {
            	//发送请求
            	listQuery: {
		      		course_list_id: undefined
	      		},
            	//上传excal
            	loaded: '',
            	total: '',
            	timeStamp: '',
            	percent: '',
		        //搜索
            	restaurants: [],
   	 			state1: '',
   	 			testUp: true,
   	 			excelName: '',
   	 			suc: false
            }
        },
        created(){
        	formData.delete('xlsfile')
        	if(!this.$route.query.selected){
        		this.testUp = false
        		this.$notify({
		          	title: '警告',
		          	message: '选择题库后上传',
		          	type: 'warning'
		        });
		        this.$router.push({path:'/publice/testbank-quest'})
        	}
        	this.listQuery.course_list_id = this.$route.query.selected
        },
        methods:{
        	success(res,file,fileList){
        		console.log('上传成功')
        	},
        	backerror(err,file,fileList){
        		console.log('上传失败')
        	},
        	//上传excel
        	upload(){
        		this.$refs.upload.click()
        	},
        	onChange(event){
				formData.delete('xlsfile')
			
				var file = event.target.files[0]
			
				 let fileType = event.target.files[0].name.split('.')[1]
			
					console.log('后缀',fileType)
					if(fileType == 'xlsx' || fileType == 'xls'){
						formData.append("xlsfile",file)
						this.excelName = event.target.files[0].name.split('.')[0]
//							alert(this.excelName)
						if(this.excelName){
							this.suc = true
						}
					}else{
						 this.$message.error('上传只能是 xlsx 或者xls 格式!');
		        
					}

				// const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
				// const isXls = file.type === 'application/vnd.ms-excel';

	        	// if (false) {
		        //  
		        // }else{
	//		        for(var i = 0; i <file.length; i++){
				
	//				}
		       	//}
        	},
        	submitUpload(){       		
        		if(this.testUp){

	        		for(var v in this.listQuery){
	        			formData.append(v,this.listQuery[v])
					}
						console.log('f',formData.get("xlsfile"))
						console.log('v',formData.get(v))
					console.log('dddd',this.listQuery)


	        		let _this = this;
	        	ExamclassAdd(formData)
	        		.then( res => {
						const { code, info, data } = res
						console.log(res)
	      				if(code == 1000){
	      					_this.$message({
					          message: '上传成功',
					          type: 'success'
					       });
					       _this.$router.push({ path:'/publice/testbank-quest'});
					       window.sessionStorage.removeItem('upload')
	      				}else{
	      					_this.$message({
					          message: info,
					          type: 'warning'
					       });
	      				}
	        		})
        		}else{
        			this.$message({
        				message: '无法添加',
        				type: 'warning'
        			})
        		}
        		
        	},
        	//搜索
    	 	handleIconClick(ev) {
    	 		const { path } = ev;
    	 		const input = path[1].children[1]
				input.focus()
	      	},
        	querySearch(queryString, cb) {
		        var restaurants = this.restaurants;
		        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
	      	},
	      	createFilter(queryString) {
		        return (restaurant) => {
		          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
		        };
	      	},
	      	loadAll() {
	      		if(window.sessionStorage.getItem('upload')){
	      			let state1 = JSON.parse(window.sessionStorage.getItem('upload')).course_lists_title
			        return [
			          { "value": state1 }
			        ];
	      		}
	      		
      		}, 
		  	handleSelect(item) {
		  		
		  	},
	      	resetForm(){
				formData.delete('xlsfile');
				this.excelName = ''
				this.state1 = ''
	      	}
        },
        mounted() {
      		this.restaurants = this.loadAll();
    	}
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>	
	.upload-demo{
		.el-input{
			width: 600px !important;
		}
		.bg-percentage{
			margin:10px 0;
		}
	}
	.v-text{
		margin-left: 20px;
		color: #6fc056;
	}
	.el-input{
		width: 400px;
		margin-left: 20px;
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	.el-form-item{
		.avatar-uploader{
			width: 600px;
			height:300px;
			cursor: pointer;
			background-color: #ebebeb;
		    .avatar-uploader-icon {
		    	margin-top:90px;
			    font-size: 28px;
			    color: #8c939d;
			    text-align: center;
		  	}
		  	.avatar {
		  		width: 600px;
			    height: 300px;
			    display: block;
		  	}
		}
	}
	.success{
		color: rgb(111, 192, 86);
		margin-top:2px;
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
		height:500px !important;
		overflow:hidden;
		background-color: #FFF;
		padding:15px 20px;
		color: #222222;
		height: 440px;
		.el-textarea__inner{
			min-height: 138px !important;	
		}
	}
</style>