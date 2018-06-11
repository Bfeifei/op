<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
     	  		<div class="grid-content bg-nav">
			  		<div class="bg-left">
			  			<el-button type="text" @click="route" style="font-size: 16px">企课新闻</el-button><i class="el-icon-arrow-right"></i>编辑企课新闻
			  		</div>
			  		<div class="bg-right">
			  		</div>
		  		</div>
     	  	</el-col>
     	  	<!---->
     	  	<el-col :span="22" style="margin-top: 40px" :offset="1">
     	  		<el-form :model="listQuery" label-position="left" label-width="100px" :rules="rules2" align="left">
	     	  		<el-form-item label="标题" prop="news_title">
	     	  			<el-input v-model="listQuery.news_title" placeholder="请输入标题"></el-input>
	     	  		</el-form-item>
	     	  		<el-form-item prop="news_content">
	     	  			<!--富文本编辑器-->
	     	  			<quill-editor ref="myTextEditor"
			              :content="listQuery.news_content"
			              :options = "editorOption" 
			              @change="onEditorChange($event)">
						</quill-editor>
						<input type="file" ref="Upload" @change="Change" style="display: none;" multiple accept="image/jpg,image/jpeg,image/png,image/gif"/>
	     	  		</el-form-item>
	     	  		<el-col>
     	  				<h5>发布样式编辑</h5>
     	  				<span>封面</span>
     	  			</el-col>
     	  			<el-form-item>
     	  				<!--<el-button @click="dialogTable" size="small" type="primary" style="float:left;margin-top:5px; margin-right: 20px">从正文选择</el-button>-->
     	  				<ul class="el-upload-list el-upload-list--picture-card" style="overflow: hidden; float:left" v-show="newImg">
							<li class="el-upload-list__item is-ready" style="width:400px;height: 200px;">
								<img :src="newImg" alt="" class="el-upload-list__item-thumbnail"/>
								<a class="el-upload-list__item-name">
									<i class="el-icon-document"></i>
								</a>
								<label for="" class="el-upload-list__item-status-label">
									<i class="el-icon-upload-success el-icon-check"></i>
								</label>
								<i class="el-icon-close"></i>
								<span class="el-upload-list__item-actions" @click="Delete">
									<span class="el-upload-list__item-delete">
										<i class="el-icon-delete2"></i>
									</span>
								</span>
							</li>
						</ul>
     	  				<el-upload
     	  				  style="float:left"
						  class="upload-demo"
						  ref="upload"
						  :action="Action"
						  :before-upload="BeforeUpload"
						  :on-change="hangdleChange"
						  :auto-upload="false"
						  :show-file-list="false">
						  <el-button slot="trigger" size="small" type="primary">本地上传</el-button>
						  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
						</el-upload>
						
						
     	  			</el-form-item>
     	  			<el-form-item>
     	  				<!--裁剪图片-->
     	  				<!--<el-dialog title="选择封面" :visible.sync="dialogTableVisible" :before-close="handleClose" class="steps_box">
						  <ul class="steps">
						  	<li :class="steps ? 'steps_active': ''" @click="steps = 1">
						  		1.从正文选择封面
						  	</li>
						  	<li :class="!steps ? 'steps_active': ''" @click="steps = 0">
						  		2.裁切封面
						  	</li>
						  </ul>
						  <div class="steps_content">
						  	*请从正文使用过的图片中选择封面  尺寸小于400*200的图片已被自动过滤
						  	<div v-show="steps">
						  		<div v-show="!newsImg.length" style="width: 300px;line-height: 300px; margin:0 auto; text-align: center; color: #cccccc;">
							  		<i class="el-icon-information" style="font-size: 30px"></i>
							  		<span style=" font-size: 24px;">暂无图片</span>
							  	</div>
							  	<ul ref="newsUl" class="newsUl" v-show="newsImg">
								  	<li v-for="(v,key) in newsImg" :key="key" v-html="v.image" ></li>
							  	</ul>
							  	<el-col :span="12">
							  		<el-button @click="nextStep">下一步</el-button>
							  	</el-col>
						  	</div>
						  	<div v-show="!steps">

						  	</div>
						  </div>
						</el-dialog>-->
     	  			</el-form-item>
	     	  		<el-form-item>
	     	  			<el-button @click="Release" class="successBtn">发布</el-button>
	     	  			<el-button @click="Drafts" class="successBtn">存为草稿箱</el-button>
	     	  		</el-form-item>
	     	  	</el-form>
     	  	</el-col>
		</el-row>
	</div>
</template>

<script>
	import { officialNewsedit, officialCover, officialContent, officialUploadimg } from '@/api/api'
	import store from '@/store/store'
	import *as types from '@/store/types'
	let data = new FormData();
	export default {
		data(){
			return {
				//初始化文本域
			    editorOption: {
			       // something config
			    },
			    //获取详情信息
			    listeditor:{
			    	
			    },
			    //发送信息
			    listQuery: {
			    	news_content: '',
			    	news_title: '',
			    	type: '2',
			    	news_cover: '',
			    	id: ''
			    },
				rules2:{
					news_title:[{
						required:true,
						message: '请输入标题',
						trigger: 'blur'
					}]
				},
				Action: '',
				file_name: '',
				dialogTableVisible: false,
				img: [],
				reset: false,
				addImgRange: [],
				steps: 1,
				newsImg: [],
				newImg:''
			}
		},
		computed: {
			 editor() {
      			return this.$refs.myTextEditor.quill
    		}
		},
		created(){
			this.Action = officialCover+'?token='+store.state.token;
			//获取信息
			let list = store.state.listeditor
			if(list.id != undefined){
				sessionStorage.setItem('listeditor',JSON.stringify(list))
			}else{
				store.state.listeditor = JSON.parse(sessionStorage.getItem('listeditor'))
			}
			this.listeditor = store.state.listeditor
			this.listQuery.id = store.state.listeditor.id
			this.FormData()																			
			//图片过滤
		},
		//editor
		mounted(){
			var vm =this
	     	var imgHandler = async function(image) {
	     	vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
		     	if (image) {
		         var fileInput = vm.$refs.Upload; //隐藏的file文本ID
		         fileInput.click() //加一个触发事件
		       	}
	     	}
	     	vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler);
		},
		updated(){
			this.removerepeatattr();
		},
		methods:{
			removerepeatattr(){
				if(this.newsImg){
					var tmp={},b=[],a=this.newsImg; 
				    for(var i=0;i<a.length;i++){
				        if(!tmp[a[i].image]){
				            tmp[a[i].image]=!0;
				        }else{
				            a.splice(i,1);
				        }
				    }
				}			    
			},
			dialogTable(){
				this.dialogTableVisible = true
				var _this =this;
//				setTimeout(function(){
//					if(_this.newsImg && _this.dialogTableVisible){
//						let newsUrl = _this.$refs.newsUl;
//						let width = 400;
//						let height = 200;
//						let Img;
//						for(var vm = 0; vm < newsUrl.children.length; vm++){
//							for(var v = 0;v<newsUrl.children[vm].children.length; v++){
//			//						Img = newsUrl.children[vm].children[v];
//								if(newsUrl.children[vm].children[v].clientWidth != 0 && newsUrl.children[vm].children[v].clientWidth <= width && newsUrl.children[vm].children[v].clientWidth != 0 && newsUrl.children[vm].children[v].clientHeight <= height){
//									newsUrl.children[vm].children[v].style= "display:none"
//								}
//							}
//						}
//					}
//				},100)
			},
			FormData(){
				officialContent(this.listeditor)
				.then( res => {
					const { code, info, data } = res
					if(code == 1000 ){
						let List = data[0]
						this.listQuery.news_content = List.news_content
						this.listQuery.news_title = List.news_title
						this.listQuery.news_cover = List.news_cover
						this.newImg = List.news_cover
					}
				})
			},
			getList(){
				console.log(this.listQuery)
				for(var v in this.listQuery){
					data.delete(v)
				}
				for(var v in this.listQuery){
					data.append(v,this.listQuery[v])
				}
				officialNewsedit(data)
				.then( res => {
					const { code, info  } = res
					if(code == 1000 ){
						this.$message({
							message:info,
							type:'success'
						})
						this.$router.push({
							path: '/publice/news-list'
						})
					}else{
						this.$message({
							message:info,
							type:'warning'
						})
					}
				})
			},
			handleClose(done){
				 this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
			},
			//editor
			Change(event){
				let vm = this;
				let upload = { 'newsImg':event.target.files[0] }
				
				let data = new FormData()
				data.append('newsImg',event.target.files[0])
				officialUploadimg(data)
				.then( res => {
					const { data,info, code } = res
					if(code == 1000){
						vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
						vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'image', data.img, Quill.sources.USER)
					}else{
						return 
					}
				})
					
			},
			//editor
		    onEditorChange({ editor, html, text }) {
		    	let _this =this;
		      	this.listQuery.news_content = html;
//		      	
//		      	var imgReg = /<img.*?(?:>|\/>)/gi;
//		      	var data =html.match(imgReg)
//		      	let Img;
//		      	if(data != null){
//		      		for(let v = 0; v < data.length;v++){
//			      		Img = {'image': data[v]}
//			      		_this.newsImg.push(Img)
//			      	}
//		      	}else{
//		      		_this.newsImg = [];
//		      	}
	      	},
			route(){
				this.$router.go(-1)
			},
			BeforeUpload(file){
				console.log(file)
			},
			hangdleChange(file){
				const isJpeg = file.raw.type === 'image/jpeg';
				const isPng = file.raw.type === 'image/png';
				const coverUrl = file.raw.size
				if(coverUrl <= coverUrl * 1024 *5){
					if (!isJpeg && !isPng) {
			          this.$message.error('上传只能是 png 或者jpeg 格式的封面!');
			          return false
			        }else{
			        	this.newImg = file.url
						this.listQuery.news_cover = file.raw
			       	}
				}else{
					this.$message({
						message:'图片不能超过5M',
						type:'warning'
					})
				}
			},
			Delete(){
				this.newImg = '';
				if(this.listQuery.news_cover){
					this.listQuery.news_cover = ''
				}
			},
			Release(){
				this.listQuery.type = 2
				this.getList()
			},
			Drafts(){
				this.listQuery.type = 1
				this.getList()
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
	.steps{
		overflow: hidden;
		li{
			width: 50%;
			height: 48px;
			line-height: 48px;
			border-bottom: 1px solid #efeff4;
			float: left;
			text-align: center;
		}
		.steps_active{
			color: #FFF;
			background-color: #6fc056;
			&:hover{
				/*opin*/
			}
		}
	}
</style>