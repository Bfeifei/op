<template>
	<div class="notfound">
		<div class="v-error">
			404未找到页面
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.notfound{
		width: 100%;
		color:#999;
		font-size:16px;
		position: relative;
	}
	.v-error{
		width: 100%;
		display:block;
		position: absolute;
		text-align: center;
		top:40vh;
		animation:bounceIn 5s;
		-webkit-animation:bounceIn 5s; /* Safari 和 Chrome */
	}
	@-webkit-keyframes bounceIn{

	from, 20%, 40%, 60%, 80%, to {
		-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	}
	0% {
		opacity: 0;
		-webkit-transform: scale3d(.3, .3, .3);
		transform: scale3d(.3, .3, .3);
	}
	20% {
		-webkit-transform: scale3d(1.1, 1.1, 1.1);
		transform: scale3d(1.1, 1.1, 1.1);
	}
	40% {
		-webkit-transform: scale3d(.9, .9, .9);
		transform: scale3d(.9, .9, .9);
	}
	60% {
		opacity: 1;
		-webkit-transform: scale3d(1.03, 1.03, 1.03);
		transform: scale3d(1.03, 1.03, 1.03);
	}
	80% {
		-webkit-transform: scale3d(.97, .97, .97);
		transform: scale3d(.97, .97, .97);
	}
	to {
		opacity: 1;
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
	}
        
</style>