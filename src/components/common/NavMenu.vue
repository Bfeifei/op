<template lang="html">
	<el-menu default-active="1" id="nav-menu" theme="dark">
		<div class="logo">
			<img src="../../assets/img/827029036527855259.png" @click="handle" class="handle" />
		</div>
		<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
			<el-col class="el-aside">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen">
					<el-submenu index="1" class="el-submenu">
						<template slot="title">
							<router-link to="/publice/manage-system">
								<img src="../../assets/img/icon-1.png" alt="" />
								<span>企业信息管理</span>
							</router-link>
						</template>
						<el-menu-item index="1-1">
							<router-link to="/publice/manage-new"><span>新增企业</span></router-link>
						</el-menu-item>
						<el-menu-item index="1-2">
							<router-link to="/publice/manage-set"><span>企业课程设定</span></router-link>
						</el-menu-item>
						<el-menu-item index="1-3">
							<router-link to="/publice/manage-list"><span>企业课程列表</span></router-link>
						</el-menu-item>
					</el-submenu>
					<el-submenu index="2" class="el-submenu">
						<template slot="title">
							<router-link to="/publice/curr-enter">
								<img src="../../assets/img/icon-2.png" alt="" />
								<span>企业课库</span></router-link>
						</template>
						<el-menu-item index="2-1">
							<router-link to="/publice/curr-videoup"><span>上传课程</span></router-link>
						</el-menu-item>
						<el-menu-item index="2-2">
							<router-link to="/publice/curr-enterup"><span>上传企业视频</span></router-link>
						</el-menu-item>
						<!--<el-menu-item index="2-3">
          	<router-link to="/publice/curr-record"><span>个人购买记录</span></router-link>
          </el-menu-item>
          <el-menu-item index="2-4">
          	<router-link to="/publice/curr-management"><span>分类管理</span></router-link>
          </el-menu-item>-->
					</el-submenu>
					<el-submenu index="3" class="el-submenu">
						<template slot="title">
							<router-link to="/publice/testbank-quest">
								<img src="../../assets/img/icon-3.png" alt="" />
								<span>企业题库</span>
							</router-link>
						</template>
						<el-menu-item index="3-1">
							<router-link to="/publice/testbank-upload"><span>上传题库</span></router-link>
						</el-menu-item>
					</el-submenu>
					<el-menu-item index="4">
						<router-link to="/publice/lectur-system">
							<img src="../../assets/img/icon-6.png" alt="" />
							<span>讲师系统</span>
						</router-link>
					</el-menu-item>
					<el-menu-item index="5">
						<router-link to="/publice/focal-position">
							<img src="../../assets/img/icon-4.png" alt="" />
							<span>焦点位</span>
						</router-link>
					</el-menu-item>
					<el-menu-item index="6">
						<router-link to="/publice/popular-cour">
							<img src="../../assets/img/icon-5.png" alt="" />
							<span>热门课程</span></router-link>
					</el-menu-item>
					<el-menu-item index="7">
						<router-link to="/publice/message-list">
							<img src="../../assets/img/icon-7.png" alt="" />
							<span>消息推送</span>
						</router-link>
					</el-menu-item>

					<el-menu-item index="8">
						<router-link to="/publice/partner-list">
							<!--<router-link to="/publice/partner-apply">-->
							<img src="../../assets/img/icon-8.png" alt="" />
							<span>城市合伙人申请管理</span>
						</router-link>
					</el-menu-item>
					<el-menu-item index="9">
						<router-link to="/publice/lectur-apply">
							<!--<router-link to="/publice/partner-apply">-->
							<img src="../../assets/img/讲师申请管理.png" alt="" />
							<span>讲师申请管理</span>
						</router-link>
					</el-menu-item>
					<el-menu-item index="10">
						<router-link to="/publice/manage-apply">
							<!--<router-link to="/publice/partner-apply">-->
							<img src="../../assets/img/企业申请管理icon.png" alt="" />
							<span>企业申请管理</span>
						</router-link>
					</el-menu-item>

					<el-menu-item index="11">
						<router-link to="/publice/news-list">
							<!--<router-link to="/publice/partner-apply">-->
							<img src="../../assets/img/企业新闻.png" alt="" />
							<span>企课新闻</span>
						</router-link>
					</el-menu-item>

					<el-submenu index="12">
						<template slot="title">
							<router-link to="/publice/firm-organization">
								<img src="../../assets/img/企业管理.png" /><span>企业管理</span></router-link>
						</template>
						<el-menu-item index="12-1">
							<router-link to="/publice/task-management"><span>任务管理</span></router-link>
						</el-menu-item>
						<el-menu-item index="12-2">
							<router-link to="/publice/live-list"><span>直播管理</span></router-link>
						</el-menu-item>
						<el-menu-item index="12-3">
							<router-link to="/publice/live-log"><span>操作日志</span></router-link>
						</el-menu-item>
						<el-menu-item index="12-4">
							<router-link to="/publice/punch-regulate"><span>打卡管理</span></router-link>
						</el-menu-item>
					</el-submenu>

					<!--用户管理-->
					<el-menu-item index="13">
						<router-link to="/publice/user-ment"><img src="../../assets/img/用户.png" /><span>用户管理</span></router-link>
					</el-menu-item>

				</el-menu>
			</el-col>
		</aside>
	</el-menu>
</template>

<script>
	export default {
		data() {
			return {
				collapsed: false
			}
		},
		methods: {
			handle() {
				this.$router.push({
					path: '/publice/page'
				})
			},
			handleOpen(key, keyPath) {

			},
			handleClose(key, keyPath) {

			},
			onSubmit() {
				console.log('submit!');
			}
		},
		mounted() {}
	}
</script>
<style lang="scss">
	@import '../../styles/navmenu.scss'
</style>