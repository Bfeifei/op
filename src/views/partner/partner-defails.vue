<template>
	<div class="">
		<el-row>
			<el-col :span="24">
				<el-col class="bg-nav">
					<div class="bg-left">
						{{title}}
					</div>
				</el-col>
			</el-col>
			<el-col :span="24" :offset="1" type="flex" class="row-bg" justify="center">
				<el-form label-width="100px" :model="formLabelAlign" border stripe style="overflow: hidden;">
					<el-col :span="12">
						<el-form-item label="姓名 : " prop="name" align="left">
							<span v-text="formLabelAlign.name"></span>
						</el-form-item>
						<el-form-item label="职位 : " prop="position" align="left">
							<span v-text="formLabelAlign.position"></span>
						</el-form-item>
						<el-form-item label="联系电话 : " prop="phone" align="left">
							<span v-text="formLabelAlign.phone"></span>
						</el-form-item>
						<el-form-item label="企业名称 : " prop="company" align="left">
							<span v-text="formLabelAlign.company"></span>
						</el-form-item>
					</el-col>
					<el-col :span="5" :offset="7">
						<el-form-item label="申请时间 : " prop="created_at" align="right" class="create_time">
							<span v-text="formLabelAlign.created_at"></span>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>
			<el-row>
				<el-col :span="24" style="padding: 0 20px;">
					<el-table :data="tableData" style="width: 100%" border v-show="tableData.length">
						<el-table-column prop="created_at" label="跟进时间" align="center" label-align="center">
						</el-table-column>
						<el-table-column prop="content" label="内容" header-align="center" align="center" width="600">
							<template slot-scope="scope">
								<div style="width: 300px;margin:0 auto;">
									<div class="bg-cont">{{scope.row.content}}</div>
									<div v-if="scope.row.content.length > 30">
										<el-popover ref="popover1" placement="bottom" width="300" trigger="hover" :key="scope.row.id">
											{{scope.row.content}}
										</el-popover>
										<el-button v-popover:popover1 type="text" class="bg-oper" style="width: 300px;"></el-button>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="follow_name" label="跟进人" align="center" header-align="center">
						</el-table-column>
					</el-table>

					<!---->
					<el-form label-position="top" header-width="80px" align="left" :model="listQuery">
						<el-form-item label="内容跟进区" class="label" prop="content">
							<el-input placeholder="请输入跟进内容" type="textarea" v-model="listQuery.content" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
						</el-form-item>
						<el-form-item align="center">
							<el-button @click="successBtn" class="successBtn" :loading="loading">提交</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	import { enterCitydetails, enterTeacherdetails, enterCompanydetails } from '@/api/api'
	import store from '@/store/store'
	import * as types from '@/store/types'
	export default {
		data() {
			return {
				listQuery: {
					id: '',
					content: undefined
				},
				formLabelAlign: {},
				tableData: [],
				title: '',
				loading: false,
				router: {},
				path: ''
			}
		},
		created() {
			this.router = this.$router.history.current
			this.path = this.router.path.split('/')[3]
			this.title = this.router.name
			if(this.path == 'partner-details') {
				this.getList(enterCitydetails)
			} else if(this.path == 'lectur-details') {
				this.getList(enterTeacherdetails)
			} else if(this.path == 'manage-details') {
				this.getList(enterCompanydetails)
			}

			let opera = store.state.operation
			if(opera != '') {
				window.sessionStorage.setItem('opera', opera)
			} else {
				store.state.operation = window.sessionStorage.getItem('opera')
			}
			this.listQuery.id = store.state.operation

		},
		watch: {
			loading(newVal, oldVal) {
				if(this.path == 'partner-details') {
					this.getList(enterCitydetails)
				} else if(this.path == 'lectur-details') {
					this.getList(enterTeacherdetails)
				} else if(this.path == 'manage-details') {
					this.getList(enterCompanydetails)
				}
			}
		},
		methods: {
			getList(Api) {
				Api(this.listQuery)
					.then(res => {
						const {
							code,
							data,
							info
						} = res
						if(code == 1000) {
							if(!data) {
								this.$message({
									type: 'success',
									message: info
								})
								this.listQuery.content = undefined
								this.loading = false
							} else {
								let Data = data;
								this.formLabelAlign = Data[0];
								this.tableData = Data.splice(1, Data.length)
							}
						}
					})
			},
			successBtn() {
				this.loading = true;
				if(this.listQuery.content == undefined) {
					this.$message({
						message: '内容不能为空!',
						type: 'warning'
					})
					this.loading = false;
					return false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-nav {
		border-bottom: 1px solid #ececeb;
		overflow: hidden;
		background-color: #FFF;
		padding: 15px 20px;
		.bg-left {
			float: left;
		}
		.bg-right {
			width: 300px;
			float: right;
			text-align: right;
			.el-input-group__append {
				border-radius: 0 10px 10px 0 !important;
			}
			button {
				padding: 10px !important;
				color: #6fc056;
				text-decoration: underline;
			}
		}
	}
	
	.add-defails {
		margin: 0 auto;
	}
	
	.cell {
		.bg-cont {
			width: 100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			float: left;
		}
		.bg-oper {
			width: 100%;
			height: 40px;
			position: absolute;
			float: left;
		}
		button {
			display: block;
			width: 100%;
			>span {
				display: inline-block;
				color: #1f2d3d !important;
				width: 200px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				float: left;
			}
		}
	}
</style>