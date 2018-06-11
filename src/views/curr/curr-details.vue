<template lang="html">
	<div class="el-header">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="bg-nav">
					<div class="bg-left">
						<div class="grid-content bg-color">
							<el-button type="text" @click="route" replace style="font-size: 16px">{{Route.Go}}</el-button><i class="el-icon-arrow-right"></i>课程详情</div>
					</div>
					<div class="bg-right">
						<el-button style="border-color: #20a0ff !important; color: #20a0ff !important;" @click="sendto">编辑</el-button>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="el-conta grid-content" v-loading="loading" element-loading-text="正在加载中">
					<div class="">
						<div class="bg-purple">
							<img :src="list.cover" alt="" />
						</div>
						<div class="bg-intro">
							<div class="el-top">
								<h5>{{list.course_lists_title}}</h5>
								<p>{{list.intro}}</p>
							</div>
							<div class="el-bot">
								<el-col :span="24">
									<div class="v-handleAdd" v-for="(v,key) in list.videoId">
										<el-button type="small" @click="logy(key)">{{key+1}}</el-button>
									</div>
								</el-col>
							</div>
						</div>
					</div>
					<div class="">
						<label for="" v-text="list.name"></label>
						<p v-text="list.author_intro"></p>
					</div>
					<div class="bg-oper">
						<div style="float: left;">
							<el-button type="success" @click="handleAdd" class="successBtn">添加题库</el-button>
						</div>
						<div style="float: left; margin-left: 100px;">
							<el-button type="success" @click="setret" class="successBtn" style="width: 120px;">{{mapTi}}</el-button>
						</div>
					</div>

				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { detail, videoInfo, courseSethot } from '../../api/api'
	import store from '../../store/store.js'
	import * as types from '../../store/types'
	export default {
		data() {
			return {
				radio3: '',
				list: {},
				loading: true,
				listnumber: [1, 2, 3, 4, 5, 6],
				Teacher: '这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介这是老师简介.',
				listQuery: {
					course_lists_id: ''
				},
				sethot: {
					id: '',
					operation: ''
				},
				updata: {
					course_list_id: '',
					course_lists_title: ''
				},
				Hot: '',
				mapTi: '',
				path: '',
				edit: '',
				Route: {
					Go: ''
				}
			}
		},
		watch: {
			'$route' (to, from) {
				this.list = {};
				this.loading = true;
			}
		},
		created() {
			let Id = store.state.id
			if(Id.author_id != undefined) {
				sessionStorage.setItem('data', JSON.stringify(Id))
			} else {
				store.state.id = JSON.parse(sessionStorage.getItem('data'))
			}
			this.listQuery.course_lists_id = store.state.id.id
			this.sethot.id = store.state.id.id
			this.getList();

			this.Hot = JSON.parse(window.sessionStorage.getItem('data')).hot
			let hot = JSON.parse(this.Hot)
			if(hot) {
				this.sethot.operation = 0;
				this.mapTi = "取消热门课程"
			} else {
				this.sethot.operation = 1;
				this.mapTi = "设置热门课程"
			}

			let router = this.$router.history.current.path
			let path = router.split('/')[3]
			if(path == 'popular-details') {
				this.path = '/publice/popular-cour'
				this.edit = '/publice/popular-cour/popular-details/edit'
				this.Route.Go = '热门课程'
			} else if(path == 'curr-details') {
				this.path = '/publice/curr-enter'
				this.edit = '/publice/curr-enter/curr-details/edit'
				this.Route.Go = '企业课库'
			}
		},
		methods: {
			getList() {
				this.loading = true;
				detail(this.listQuery)
					.then(res => {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							this.list = data[0]
							this.loading = false;
						}
						if(code == 1002) {
							this.$notify.error({
								title: '错误',
								message: info
							});
						}
					})
			},
			handleAdd() {
				this.updata.course_list_id = this.list.author_id;
				this.updata.course_lists_title = this.list.course_lists_title;
				if(this.updata.course_list_id && this.updata.course_lists_title) {
					window.sessionStorage.setItem('upload', JSON.stringify(this.updata))
					this.$router.push({
						path: '/publice/testbank-upload',
						query: {
							selected: this.listQuery.course_lists_id
						}
					})
				}

			},
			setret() {
				courseSethot(this.sethot)
					.then(res => {
						const {
							code,
							data,
							info
						} = res
						if(code == 1000) {
							let type, title;
							if(info == '热门课程已达上限') {
								type = 'warning'
								title = '警告'
							} else {
								type = 'success'
								title = '成功'
							}
							this.$notify({
								title: title,
								message: info,
								type: type
							});
							this.$router.push({
								path: this.path
							})
						} else {
							this.$notify({
								title: '警告',
								message: info,
								type: 'warning'
							});
						}
					})
			},
			logy(index) {
				//			videoInfo()
				//			.then( res => {
				//				const { } =res
				//				console.log(res)
				//			})
				//			console.log(index)
			},
			sendto() {
				let listQuery = {
					'course_lists_title': this.list.course_lists_title,
					'course_lists_id': this.listQuery.course_lists_id
				}
				this.$router.push({
					path: this.edit,
					query: {
						orderID: this.listQuery.course_lists_id
					}
				});
				store.commit(types.LIST, listQuery)
			},
			route() {
				this.$router.push({
					path: this.path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-handleAdd {
		button {
			margin-left: 10px;
			float: left
		}
	}
	
	.el-bot {
		.el-button--small {
			width: 30px;
			height: 30px;
			border-radius: 15px !important;
		}
	}
	
	.el-pointer {
		color: black;
	}
	
	.bg-nav {
		overflow: hidden;
		background-color: #FFF;
		border-bottom: 1px solid #ececeb;
		padding: 0 20px;
		box-sizing: border-box;
		.bg-left {
			float: left;
			.bg-color {
				line-height: 65px;
				font-size: 16px;
				font-weight: 500;
				text-align: left;
				color: #222222;
				background-color: #FFF;
			}
			.grid-content {
				border: none;
			}
		}
		.bg-right {
			width: 300px;
			line-height: 65px;
			float: right;
		}
	}
	
	.el-header {
		background-color: #FFF;
		.el-conta {
			text-align: center;
			padding: 20px 15px 20px 15px;
			color: #222222;
			.bg-oper {
				display: flex;
				overflow: hidden;
				>div {
					button {
						border-radius: 20px;
					}
				}
			}
			>div:first-child {
				display: flex;
				text-align: left;
				.bg-purple {
					img {
						height: 240px;
					}
				}
				.bg-intro {
					width: 1000px;
					margin-left: 15px;
					label {
						font-size: 14px;
						margin-bottom: 15px;
					}
					.el-anth {
						margin-top: 15px;
						.el-radio-button {
							margin-right: 15px;
							border-radius: 20px !important;
							.el-radio-button__orig-radio {
								.el-radio-button__inner {
									border: 1px solid #999999 !important;
									background-color: #999999 !important;
									border-radius: 50% !important;
								}
							}
						}
					}
				}
				.bg-purple,
				.bg-intro {
					float: left;
					h5 {
						font-size: 20px;
						font-weight: 500;
						margin: 8px 0 8px 0;
					}
					p {
						font-size: 14px;
						color: #666666;
						margin-bottom: 25px;
					}
				}
			}
			>div:nth-child(2) {
				text-align: left;
				label {
					font-size: 16px;
					font-weight: 500;
					margin: 15px 0 15px 0;
				}
				p {
					font-size: 14px;
					color: #666666;
					margin-bottom: 25px;
					margin: 10px 0 15px 0;
				}
			}
			>div:nth-child(3) {
				text-align: left;
				h5 {
					font-size: 16px;
					font-weight: 500;
					margin: 8px 0 8px 0;
				}
				.bg-more {
					display: flex;
					li {
						display: inline-block;
						justify-content: flex-start;
						min-width: 254px;
						width: 100%;
						margin-right: 20px;
						img {
							width: 100%;
						}
						label {
							font-size: 14px;
							font-weight: 500;
							margin: 8px 0 8px 0;
						}
						p {
							font-size: 12px;
							color: #666666;
							margin-bottom: 25px;
						}
					}
					li:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>