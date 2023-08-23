<template>
	<div class="scroll_box">
		<div class="scroll_item" v-for="item in wangList">
			{{item.type}}：{{item.wangwang}}
		</div>
		<img class="user_info_img" src="../assets/user_info.png" @click="$router.push('/wx_info')">
		<div class="modal_container" v-if="!is_set_phone">
			<div class="modal_content">
				<div class="title mb-12">绑定手机号</div>
				<input class="input_ele mb-12 width-100" type="number" placeholder="输入手机号" v-model="phone">
				<div style="display:flex" class="mb-12 width-100">
					<input class="input_ele flex-1" type="number" placeholder="输入验证码" v-model="msg_code">
					<div class="get_code" @click="getCode">{{get_text}}</div>
				</div>
				<input class="input_ele mb-12 width-100" placeholder="请设置登录密码" v-model="password">
				<input class="input_ele mb-12 width-100" placeholder="请确认登录密码" v-model="comfirmPassword">
				<div class="bind_but" @click="bindPhone">立即绑定</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.scroll_box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding: .2rem;
		.scroll_item{
			background: linear-gradient(176deg, #FEF7FF 0%, #FFFFFF 100%);
			box-shadow: 0px 4px 8px 0px #F6F0FF;
			margin-top: .2rem;
			border-radius: .16rem;
			background: #FFFFFF;
			width: 100%;
			height: 1.06rem;
			font-size: .32rem;
			color: #333;
			font-weight: 500;
			display: flex;
			align-items: center;
			padding-left: .2rem;
			padding-right: .2rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow:ellipsis;
		}
		.user_info_img{
			position: fixed;
			bottom: 1.88rem;
			right: 0;
			width: 1.38rem;
			height: 1.48rem;
			z-index: 11;
		}
		.modal_container{
			background: rgba(0, 0, 0, 0.7);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 12;
			display: flex;
			align-items: center;
			justify-content: center;
			.modal_content{
				background: #ffffff;
				padding: .3rem;
				width: 6rem;
				display:flex;
				flex-direction:column;
				align-items:center;
				.mb-12{
					margin-bottom: .18rem;
				}
				.title{
					width: 100%;
					text-align: center;
					font-size: .3rem;
					color: #333333;
					font-weight: bold;
				}
				.input_ele{
					box-sizing: border-box;
					border-radius: .1rem;
					padding-left: .1rem;
					padding-right: .1rem;
					border: 1px solid #cccccc;
					outline: none;
					height: .8rem;
					font-size: .28rem;
				}
				.width-100{
					width: 100%;
				}
				.flex-1{
					flex: 1;
				}
				.get_code{
					margin-left: .1rem;
					border-radius: .1rem;
					border: 1px solid #cccccc;
					height: .8rem;
					line-height: .8rem;
					width: 1.6rem;
					text-align: center;
					font-size: .26rem;
				}
				.bind_but{
					border-radius: .1rem;
					background: #FFAD58;
					width: 2.4rem;
					text-align: center;
					height: .8rem;
					line-height: .8rem;
					font-size: .3rem;
					color: #ffffff;
				}
			}
		}
	}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				wangList:[],		//旺旺号列表
				is_set_phone:true,	//默认未绑定手机号
				phone:"",			//手机号
				get_text:"获取验证码",//获取验证码按钮文字
				notBut: true,       //默认获取验证码按钮可点击
      			time:60,            //默认倒数60秒
				msg_code:"",		//短信验证码
				count_down:null,	//计时器
				password:"",
				comfirmPassword:""
			}
		},
		created(){
			//获取旺旺号列表
			this.getWangList();
		},
		methods:{
			//获取旺旺号列表
			getWangList(){
				resource.wangList().then(res => {
					if(res.data.code == 0){
						this.wangList = res.data.data;
						this.is_set_phone = res.data.is_set_phone;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取验证码
			getCode(){
				if(this.phone == ''){
					this.$toast("请输入您的手机号");
				}else{
        			if(this.notBut == true){//如果按钮可以点击
        				resource.sendSmsCode({phone:this.phone}).then(res => {
        					if(res.data.code == 0){
        						this.$toast('验证码已发送，注意查收！');
        						// 倒计时
        						this.timeDown();
        					}else{
        						this.$toast(res.data.msg);
        					}
        				})
        			}else{
        				this.$toast("60秒内仅能发送一次验证码");
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
        	//点击立即绑定
        	bindPhone(){
        		if(this.phone == ''){
        			this.$toast("请输入您的手机号");
        		}else if(this.msg_code == ''){
        			this.$toast("请输入验证码");
        		}else if(this.password == ''){
        			this.$toast("请输入密码");
        		}else if(this.comfirmPassword == ''){
        			this.$toast("请确认密码");
        		}else if(this.password != this.comfirmPassword){
        			this.$toast("两次密码不一致");
        		}else{
        			let arg = {
        				phone:this.phone,
        				code:this.msg_code,
        				password:this.password,
        				password2:this.comfirmPassword
        			}
        			resource.bindPhone(arg).then(res => {
        				if(res.data.code == 0){
        					this.$toast(res.data.msg);
        					this.is_set_phone = true;
        				}else{
        					this.$toast(res.data.msg);
        				}
        			})
        		}
        	}
        }
    }
</script>