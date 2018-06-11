<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-nav">
					<div class="bg-left">
						<el-button type="text" @click="route" style="font-size: 16px">企课新闻</el-button><i class="el-icon-arrow-right"></i>发布企课新闻
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
						<quill-editor ref="myTextEditor" :content="listQuery.news_content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
						<input type="file" ref="Upload" @change="Change" style="display: none;" multiple accept="image/jpg,image/jpeg,image/png,image/gif" />
					</el-form-item>
					<el-col>
						<h5>发布样式编辑</h5>
						<span>封面</span>
					</el-col>
					<el-form-item>
						<!--<el-button @click="dialogTableVisible = true" size="small" type="primary" style="float:left;margin-top:5px; margin-right: 20px">从正文选择</el-button>-->
						<ul class="el-upload-list el-upload-list--picture-card" style="overflow: hidden; float:left;" v-show="newImg">
							<li class="el-upload-list__item is-ready" style="width:400px;height: 200px;">
								<img :src="newImg" alt="" class="el-upload-list__item-thumbnail" />
								<a class="el-upload-list__item-name">
									<i class="el-icon-document"></i>
								</a>
								<label for="" class="el-upload-list__item-status-label">
									<i class="el-icon-upload-success el-icon-check"></i>
								</label>
								<i class="el-icon-close"></i>
								<span class="el-upload-list__item-actions" @click="newImg =''">
									<span class="el-upload-list__item-delete">
										<i class="el-icon-delete2"></i>
									</span>
								</span>
							</li>
						</ul>

						<el-upload style="float:left" class="upload-demo" ref="upload" :action="Action" :multiple="false" accept="image/jpg,image/jpeg,image/png,image/gif" :on-change="hangdleChange" :on-remove="handleRemove" :show-file-list="false" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">本地上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
						</el-upload>

					</el-form-item>
					<el-form-item>

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
	import { officialWritenews, officialCover, officialUploadimg, uploadImages } from '@/api/api'
	import store from '@/store/store'
	import * as types from '@/store/types'
	export default {
		data() {
			return {
				//初始化文本域
				editorOption: {
					// something config
				},
				listQuery: {
					news_content: '',
					news_title: '',
					flag: '2',
					news_cover: ''
				},
				rules2: {
					news_title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}]
				},
				Action: '',
				file_name: '',
				dialogTableVisible: false,
				img: [],
				fileList: [],
				newImg: ''
			}
		},
		computed: {
			editor() {
				return this.$refs.myTextEditor.quill
			}
		},
		created() {
			this.Action = officialCover + '?token=' + store.state.token;
		},
		//editor
		mounted() {
			var vm = this
			var imgHandler = async function(image) {
				vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
				if(image) {
					var fileInput = vm.$refs.Upload; //隐藏的file文本ID
					fileInput.click() //加一个触发事件
				}
			}
			vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
		},
		watch: {
			img(newVal) {
				console.log(this.$refs.Img)
			}
		},
		methods: {
			//editor
			Change(event) {
				console.log('listquery', this.listQuery)
				let vm = this;
				let upload = {
					'newsImg': event.target.files[0]
				}
				console.log('图片信息', upload)
				//一个方法
				let data = new FormData()
				//把选中的图添加到data里
				data.append('newsImg', event.target.files[0])
				//请求接口
				officialUploadimg(data)
					.then(res => {
						const {
							data,
							info,
							code
						} = res
						console.log('res', res)

						if(code == 1000) {
							vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
							console.log(vm.addImgRange)
							vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null ? vm.addImgRange.index : 0, 'image', data.img, Quill.sources.USER)
							console.log('cha', vm.$refs.myTextEditor)
						}
					})
			},
			getList() {
				let data = new FormData();

				for(var v in this.listQuery) {
					data.delete(v)
				}

				for(var v in this.listQuery) {
					data.append(v, this.listQuery[v])
				}

				console.log('fabu', data)
				//				officialWritenews(data)
				//					.then(res => {
				//						const {
				//							code,
				//							info
				//						} = res
				//						if(code == 1000) {
				//							console.log('res111', res)
				//							this.$message({
				//								message: info,
				//								type: 'success'
				//							})
				//							this.$router.push({
				//								path: '/publice/news-list'
				//							})
				//						}
				//					})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			onEditorChange({
				html,
				text
			}) {
				let _this = this;
				this.listQuery.news_content = html;
			},
			route() {
				this.$router.go(-1)
			},
			handleProgress(event, file, fileList) {
				console.log(file)
			},
			beforeUpload(file) {
				console.log(file)
			},
			handleRemove(file, fileList) {
				console.log(fileList)
			},
			hangdleChange(file) {
				const isJpeg = file.raw.type === 'image/jpeg';
				const isPng = file.raw.type === 'image/png';
				const coverUrl = file.raw.size
				if(coverUrl <= coverUrl * 1024 * 5) {
					if(!isJpeg && !isPng) {
						this.$message.error('上传只能是 png 或者jpeg 格式的封面!');
						return false
					} else {
						this.newImg = file.url
						this.listQuery.news_cover = file.raw
						console.log('news', this.listQuery.news_cover)

					}
				} else {
					this.$message({
						message: '图片不能超过5M',
						type: 'warning'
					})
				}
			},
			Release() {
				this.listQuery.flag = 2
				this.getList()
			},
			Drafts() {
				this.listQuery.flag = 1
				this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding: 11.5px 20px;
		.bg-left {
			float: left;
			margin-top: 5px;
		}
		.bg-right {
			width: 300px;
			float: right;
			margin-top: 4px;
			button {
				padding: 10px !important;
				background-color: #222222 !important;
				border-radius: 0 10px 10px 0 !important;
			}
		}
	}
</style>