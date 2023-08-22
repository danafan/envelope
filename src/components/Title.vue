<template>
	<div class="title_box">
		<div class="bank" v-if="title_type == 'w' && is_bank == false" @click="$router.push('/bank')">银行卡</div>
		{{title_type == 'w'?'账号':'红包'}}
		<div class="bind" v-if="title_type == 'w'" @click="$router.push('/bind')">绑定</div>
	</div>
</template>
<style lang="less" scoped>
.title_box{
	background: #fff;
	width: 100%;
	height: .88rem;
	font-size: .32rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #38393A;
	position: relative;
	.bank{
		position: absolute;
		left: .28rem;
		font-size: .28rem;
		color: #666666;
	}
	.bind{
		position: absolute;
		right: .28rem;
		font-size: .28rem;
		color: #666666;
	}
}
</style>
<script>
	export default{
		props:{
			title_type:{
				type:String,
				default:"w"
			},
			is_bank:{
				type:Boolean,
				default:true
			}
		},
	}
</script>