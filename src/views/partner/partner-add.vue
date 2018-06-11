<template>
	<div class="">
		<el-row>
			<el-col :span="24">
				<el-col class="bg-nav">
					<div class="bg-left">
						添加城市合伙人
					</div>
				</el-col>
			</el-col>
			<el-col :span="24">
				<el-form>
					
				</el-form>
				<el-table>
					
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss">
	.bg-nav{
	    overflow: hidden;
	    background-color: #FFF;
	    padding: 15px 20px;
		.bg-left{
			float:left;
		}
		.bg-right{
			width: 300px;
			float:right;
			text-align: right;
			.el-input-group__append{
			    border-radius: 0 10px 10px 0 !important;
			}
			button{
				padding: 10px !important;
				color: #6fc056;
				text-decoration: underline;
			}
		}
	}
</style>