<template>
	<div class="">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-nav">
					<div class="bg-left">
						<el-button type="text" @click="route" style="font-size: 16px">企课新闻</el-button><i class="el-icon-arrow-right"></i>发布企课新闻
					</div>
					<div class="bg-right">
					</div>
				</div>
			</el-col>
			<el-col :span="12" :offset="1">
				<ul>
					<li v-for="(v,key) in listData" align="left">
						<label style="font-size: 30px;">{{v.news_title}}</label>
						<h5 style="font-weight: 400; margin: 5px 0;">{{v.publisher_time}} <span>{{v.publisher_name}}</span></h5>
						<div v-html="v.news_content"></div>
					</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { officialContent } from '@/api/api'
	import store from '@/store/store'
	import * as types from '@/store/types'
	export default {
		data() {
			return {
				listData: [],
				listQuery: {}
			}
		},
		created() {
			let list = store.state.listquery
			if(list.id != undefined) {
				sessionStorage.setItem('listquery', JSON.stringify(list))
			} else {
				store.state.listquery = JSON.parse(sessionStorage.getItem('listquery'))
			}
			this.listQuery = store.state.listquery
			this.getList()
		},
		methods: {
			route() {
				this.$router.go(-1)
			},
			getList() {
				officialContent(this.listQuery)
					.then(res => {
						const {
							code,
							info,
							data
						} = res
						if(code == 1000) {
							this.listData = data
						}
					})
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