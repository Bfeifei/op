<template lang="html">
	<div class="el-header">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content bg-color">
					<el-button type="text" @click="route" style="font-size: 16px">讲师系统</el-button><i class="el-icon-arrow-right"></i>讲师详情</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="el-conta grid-content">
					<div class="">
						<div class="bg-purple">
							<img :src="formLabel.avator" />
						</div>
						<div class="bg-intro" v-show='!ok'>
							<div class="el-top">
								<div style="float: left;">
									<h5>姓名:{{formLabel.name}}</h5>
									<h5 style="margin: 10px 0 0 0;">讲师职位:{{formLabel.author_position}}</h5><br />
									<label for="">已上传{{formLabel.num}}部课程</label>
								</div>
								<el-button @click="fn1" size="small" round class="sub" style="float: left; margin-left: 633px;">修改</el-button>
								<div style="width: 100%; float: left; margin-top: 20px;">
									<p class="xq">{{formLabel.author_intro}}</p>
								</div>
							</div>
						</div>

						<div class="bg-intro_1" v-show="ok" style="position: relative;">
							<div style="float: left; margin-left: 30px;">
								<el-input v-model="formLabe2.name" placeholder="讲师姓名" style="width: 80%;"></el-input>
								</br>
								<el-input v-model="formLabe2.author_position" placeholder="讲师职位" style="width: 80%; margin-top: 20px;"></el-input>
							</div>
							<el-button @click="fn2" size="small" round class="sub" style="position: absolute;top: -30px; left: -160px;">提交</el-button>
							<div style="width: 100%; float: left; margin-left: 30px;">
								<el-input type="textarea" placeholder="请输入内容" v-model="formLabe2.author_intro" class="ipt"></el-input>
							</div>
						</div>
					</div>
					<div>
						<el-table :data="listData" stripe style="width: 100%">
							<el-table-column label="课程封面" header-align="center" prop="cover" align="center">
								<template slot-scope="scope">
									<img :src="scope.row.cover" alt="" class="el-img" />
								</template>
							</el-table-column>
							<el-table-column prop="course_lists_title" label="课程标题" header-align="center" align="center"></el-table-column>
							<el-table-column prop="categoryName" label="课程分类" header-align="center" align="center"></el-table-column>
							<el-table-column prop="intro" label="课程简介" header-align="center" align="center">
								<template slot-scope="scope">
									<div class="bg-title">
										<div v-if="scope.row.intro.length > 9">
											<el-popover ref="popover2" placement="bottom" width="180" trigger="hover" :key="scope.row.id">
												{{scope.row.intro}}
											</el-popover>
											<el-button v-popover:popover2 type="text" class="bg-color">
												<span>{{scope.row.intro}}</span>
											</el-button>
										</div>
										<div v-else>
											<span>
								  		{{scope.row.intro}}
								  	</span>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="created_at" label="上传时间" header-align="center" align="center"></el-table-column>
							<el-table-column prop="buy_num" label="已购买次数" header-align="center" align="center"></el-table-column>
							<el-table-column prop="click" label="已点击次数" header-align="center" align="center"></el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { authorInfo, authorSave } from '@/api/api.js'
	export default {
		data() {
			return {
				radio3: '',
				listnumber: [1, 2, 3, 4, 5, 6],
				listQuery: {
					authorId: ''
				},
				formLabel: {},
				formLabe2: {
					id: '',
					name: '',
					author_intro: '',
					author_position: ''
				},
				listData: [],
				ok: false
			}
		},
		created() {
			this.getList()
			this.listQuery.authorId = this.$route.params.id.substr(0, this.$route.params.id.length - 4)
			this.formLabe2.id = this.$route.params.id.substr(0, this.$route.params.id.length - 4)
		},
		methods: {
			fn1() {
				this.ok = true;
				this.formLabe2.name = this.formLabel.name;
				this.formLabe2.author_intro = this.formLabel.author_intro;
				this.formLabe2.author_position = this.formLabel.author_position;
			},
			fn2() {
				this.formLabe2.id = this.listQuery.authorId;
				authorSave(this.formLabe2)
					.then(res => {
						const {
							code,
							info
						} = res;
						if(code == 1000) {
							console.log('aa', res)
							this.ok = false;
							this.getList()
						}
					})
			},
			route() {
				this.$router.go(-1)
			},
			getList() {
				authorInfo(this.listQuery)
					.then(res => {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							this.formLabel = data[0];
							let listData = data.splice(1, data.length);
							this.listData = listData;
							console.log('res', res);
							this.formLabelid = data[0].id;
							//console.log(this.formLabelid)
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/*修改整体*/
	
	.js {
		margin: 20px 0 0 0;
	}
	
	.bg-intro_1 {
		margin: 30px 0 0 0;
		float: left;
	}
	
	.xg {
		width: 80px;
		height: 30px;
	}
	
	.name {
		margin: 0 0 0 16px;
	}
	
	.sub {
		width: 80px;
		height: 30px;
		margin: 0 0 0 1000px;
		border-radius: 20px;
		background-color: #6fc056;
		color: #FFFFFF;
	}
	
	.sub:hover {
		border: 1px solid #6fc056;
	}
	
	.ipt {
		margin: 20px 0 0 0;
		width: 800px;
		height: 70px;
	}
	
	.xq {
		margin: 10px 0 0 0;
	}
	
	.bg-color {
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #222222;
		background-color: #FFF;
		padding: 13.5px 20px;
		border: 1px solid #ececeb;
	}
	
	.el-table {
		.el-table__row {
			.el-pointer {
				&:hover {
					cursor: pointer
				}
			}
		}
	}
	
	.cell {
		.bg-title {
			width: 200px;
			text-align: center;
			height: 35.99px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			div {
				width: 100%;
				height: 20px;
				line-height: 20px;
			}
			button {
				width: 100%;
				background: none;
				border: none;
				text-align: center;
				margin: 0 auto;
				text-align: center;
				height: 20px;
				line-height: 20px;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
				white-space: nowrap;
				span {
					text-align: left;
					width: 90px !important;
				}
			}
			.el-button--text {
				padding: 0 !important;
			}
			.bg-color {
				color: #2c3e50
			}
		}
		.bg-oper {
			float: left;
			margin: 9px 0 0 5px;
		}
	}
	
	.el-header {
		background-color: #FFF;
		.el-conta {
			text-align: center;
			padding: 20px 15px 20px 15px;
			color: #222222;
			>div:first-child {
				display: flex;
				text-align: left;
				.bg-purple {
					img {
						height: 240px;
					}
				}
				.bg-intro {
					margin-left: 15px;
					label {
						font-size: 14px;
						margin-bottom: 15px;
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
			.el-img {
				height: 80px;
				background-color: #ebebeb;
				margin-top: 5px;
			}
		}
	}
</style>