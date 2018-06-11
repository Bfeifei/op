<template>
	<div class="">
		<el-row class="top-bar">
			<div class="top-wrapper">
				<div class="user-area pull-left">
					<el-dropdown trigger="">
						<span class="el-dropdown-link userinfo-inner"><img src="../../assets/img/user.jpg" /> {{sysUserName}}</span>
					</el-dropdown>
				</div>
				<el-col :span="8" class="search-area pull-right">
					<el-button type="text" @click.native="logout">退出登录</el-button>
				</el-col>
				</el-col>
			</div>
		</el-row>
	</div>
</template>

<script>
	import store from '../../store/store'
	import * as types from '../../store/types'
	export default {
		data() {
			return {
				collapsed: false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			onSubmit() {
				console.log('submit!');
			},
			//退出登录
			logout: function() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					window.sessionStorage.removeItem('xtoken')
					store.commit(types.LOGOUT);
					_this.$router.push('/');
				}).catch(() => {});
			},
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if(user) {
				user = JSON.parse(user);
				this.sysUserName = user.username || '';
				//				this.sysUserAvatar = user.avatar || '';
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/topbar.scss'
</style>