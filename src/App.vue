<template>
	<div id="app">
		<!-- <img src="./assets/img/logo.png"> -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="scss">
	.steps_box {
		.el-dialog__header {
			padding-top: 10px;
			background-color: #efeff4 !important;
			.el-dialog__headerbtn {
				margin-top: 5px;
			}
		}
		.el-dialog__body {
			padding: 0;
		}
		.steps_content {
			height: 400px;
			padding: 10px;
			.newsUl {
				overflow: hidden;
				>li {
					float: left;
					/*min-width: 400px;*/
					/*min-height: 200px;*/
				}
			}
		}
	}
	
	.label {
		.el-form-item__label {
			font-size: 20px;
			font-weight: 500;
			text-align: left;
			color: #222222;
			margin: 34px 0 20px 0;
		}
	}
	
	.create_time {
		.el-form-item__label {
			font-size: 18px;
			font-weight: 500;
			text-align: left;
			color: #222222;
		}
		div {
			font-size: 18px;
			font-weight: 500;
			text-align: left;
			color: #222222;
		}
	}
	
	.bg-right {
		.el-input {
			button {
				border: 1px solid #222222;
			}
		}
	}
	
	.el-button--text {
		color: #6fc056;
		&:hover {
			color: #6fc056;
		}
	}
	
	.el-table__row {
		.el-pointer {
			color: #666;
			transition: color 0.5s;
			&:hover {
				color: #4db3ff;
				cursor: pointer
			}
		}
	}
	
	.successBtn {
		background-color: #6fc056;
		border-color: #6fc056;
		border-radius: 20px;
		width: 100px;
		color: #FFF;
		&:hover {
			background-color: #6fc056;
			border-color: #6fc056;
			color: #FFF;
		}
		&:focus {
			background-color: #6fc056;
			border-color: #6fc056;
			color: #FFF;
		}
	}
	
	.resetBtn {
		width: 100px;
		margin: 20px;
		color: #FFF;
		border-radius: 20px;
		background-color: #ccc;
		border-color: #ccc;
		&:hover {
			background-color: #ccc;
			border-color: #ccc;
			color: #FFF;
		}
		&:focus {
			background-color: #ccc;
			border-color: #ccc;
			color: #FFF;
		}
	}
	
	.box-tab {
		.el-card__body {
			padding: 20px 0 !important;
		}
	}
	
	.el-tabs__nav {
		height: 65px;
		line-height: 65px;
	}
	
	.el-tabs__item {
		text-align: center;
		font-size: 16px;
	}
	
	.el-tabs__header {
		margin: 0;
	}
	
	.el-input-group__append {
		border-radius: 0 10px 10px 0 !important;
	}
	
	.el-radio-button__inner {
		border: 1px solid #999999 !important;
		border-radius: 18px !important;
	}
	
	.el-input {
		color: #6fc056 !important;
		caret-color: #6fc056;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		text-align: center;
		margin-top: 60px;
	}
</style>