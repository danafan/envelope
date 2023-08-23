<template>
	<div class="container">
		<div class="page_title">{{type == '1'?'忘记密码':'立即注册'}}</div>
		<div class="input_row flex ac">
			<div class="input_label">手机号</div>
			<input class="input_ele flex-1" type="number" v-model="phone" placeholder="请输入手机号">
		</div>
		<div class="input_row flex ac">
			<div class="input_label">验证码</div>
			<input class="input_ele flex-1" v-model="code" placeholder="请输入验证码">
			<div class="get_text" @click="getCode">{{get_text}}</div>
		</div>
		<div class="input_row flex ac">
			<div class="input_label">密码</div>
			<input class="input_ele flex-1" v-model="password" placeholder="请输入密码">
		</div>
		<div class="input_row flex ac">
			<div class="input_label">确认密码</div>
			<input class="input_ele flex-1" v-model="confirm_password" placeholder="请再次输入密码">
		</div>
		<div class="button" @click="confirmFn">{{type == '1'?'立即修改':'立即注册'}}</div>
	</div>
</template>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				type:'',			//页面类型（1:忘记密码；2:立即注册）
				phone:"",			//手机号
				code:"",			//验证码
				password:"",		//密码
				confirm_password:"",//确认密码
				get_text:"获取验证码",//获取验证码按钮文字
				notBut: true,       //默认获取验证码按钮可点击
      			time:60,            //默认倒数60秒
				count_down:null,	//计时器
			}
		},
		created(){
			this.type = this.$route.query.type;
		},
		methods:{
			//获取验证码
			getCode(){
				if(this.phone == ''){
					this.$toast("请输入您的手机号");
				}else{
        			if(this.notBut == true){//如果按钮可以点击
        				if(this.type == '2'){	//注册
        					resource.signInSendCode({phone:this.phone}).then(res => {
        						if(res.data.code == 0){
        							this.$toast(res.data.msg);
        							// 倒计时
        							this.timeDown();
        						}else{
        							this.$toast(res.data.msg);
        						}
        					})
        				}else{					//修改密码
        					resource.updateSendCode({phone:this.phone}).then(res => {
        						if(res.data.code == 0){
        							this.$toast(res.data.msg);
        							// 倒计时
        							this.timeDown();
        						}else{
        							this.$toast(res.data.msg);
        						}
        					})
        				}
        			}else{
        				this.$toast("操作频繁");
        			}
        		}
        	},
			//倒计时
        	timeDown () {
        		if (this.time > 0) {
        			this.notBut = false;   //按钮不可点击
        			this.time --;
        			this.get_text = this.time + "秒";
        			this.count_down = setTimeout(this.timeDown, 1000);
        		} else {
        			this.notBut = true;    //按钮可以点击
        			this.time = 60;
        			this.get_text = "获取验证码";
        		}
        	},
        	//点击底部提交按钮
        	confirmFn(){
        		if(this.phone == ''){
        			this.$toast("请输入您的手机号");
        		}else if(this.code == ''){
        			this.$toast("请输入验证码");
        		}else if(this.password == ''){
        			this.$toast("请输入密码");
        		}else if(this.confirm_password == ''){
        			this.$toast("请确认密码");
        		}else if(this.password != this.confirm_password){
        			this.$toast("两次密码不一致");
        		}else{
        			let arg = {
        				phone:this.phone,
        				code:this.code,
        				password:this.password,
        				password2:this.confirm_password
        			}
        			if(this.type == '2'){	//注册
        				resource.signIn(arg).then(res => {
        					if(res.data.code == 0){
        						this.$toast(res.data.msg);
        						this.$router.go(-1);
        					}else{
        						this.$toast(res.data.msg);
        					}
        				})
        			}else{					//修改密码
        				resource.updatePassword(arg).then(res => {
        					if(res.data.code == 0){
        						this.$toast(res.data.msg);
        						this.$router.go(-1);
        					}else{
        						this.$toast(res.data.msg);
        					}
        				})
        			}
        			
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
			.get_text{
				width: 2.06rem;
				text-align: center;
				height: .68rem;
				line-height: .68rem;
				border-radius: .04rem;
				border: 1px solid #9786FF;
				color: #9786FF;
				font-size: .28rem;
				white-space: nowrap;
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
	}
</style>