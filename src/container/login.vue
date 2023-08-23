<template>
	<div class="container">
		<div class="page_title">登录</div>
		<div class="input_row flex ac">
			<div class="input_label">手机号</div>
			<input class="input_ele flex-1" type="number" v-model="phone" placeholder="请输入手机号">
		</div>
		<div class="input_row flex ac">
			<div class="input_label">密码</div>
			<input class="input_ele flex-1" v-model="password" placeholder="请输入密码">
			<div class="wjmm" @click="$router.push('/signIn?type=1')">忘记密码</div>
		</div>
		<div class="button" @click="login">登录</div>
		<div class="bottom_toast flex jc">
			<div>还没有账号，</div>
			<div class="mszc" @click="$router.push('/signIn?type=2')">马上注册？</div>
		</div>
	</div>
</template>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				phone:"",			//手机号
				password:"",		//密码
			}
		},
		methods:{
			//点击登录
			login(){
				if(this.phone == ''){
					this.$toast('请输入手机号')
				}else if(this.password == ''){
					this.$toast('请输入密码')
				}else{
					let arg = {
						phone:this.phone,
						password:this.password
					}
					resource.login(arg).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							this.$router.push('/index')
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.container{
		background: #ffffff;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding-left: .5rem;
		padding-right: .5rem;
		.page_title{
			margin-top: .84rem;
			margin-bottom: .84rem;
			color: #000000;
			font-size: .44rem;
			font-weight: 500;
		}
		.input_row{
			margin-bottom: .24rem;
			width: 100%;
			height: .92rem;
			background: #F8F6FF;
			border-radius: .08rem;
			padding-left:.2rem;
			padding-right:.2rem;
			.input_label{
				width: 1.36rem;
				color: #000000;
				font-size: .32rem;
			}
			.input_ele{
				background: #F8F6FF;
				border:none;
				outline: none;
				height: .6rem;
				font-size: .32rem;
			}
			.wjmm{
				color: #999999;
				font-size: .32rem;
				color: #999999;
			}
		}
		.button{
			margin-top: 1.32rem;
			width: 100%;
			text-align: center;
			height: .9rem;
			line-height: .9rem;
			background: #9786FF;
			border-radius: .08rem;
			font-size: .32rem;
			color: #FFFFFF;
		}
		.bottom_toast{
			margin-top: .8rem;
			font-size: .28rem;
			color: #999999;
			.mszc{
				color: #9786FF;
			}
		}
	}
</style>