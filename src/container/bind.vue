<template>
	<div>
		<div class="title_box">
			<img class="go_back" src="../assets/go_back.png" @click="$router.go(-1)"/>
			绑定账号
		</div>
		<div class="bind_box">
			<div class="bind_text" @click="showAccount = true">
				<div>{{type_txt}}</div>
				<div class="check_box">
					<div class="check_txt">切换</div>
					<img src="../assets/check.png">
				</div>
			</div>
			<input type="text" placeholder="输入账号" v-model="wangwang">
		</div>
		<div class="bind_but" @click="bind">绑定</div>
		<div class="modal_box" v-if="showAccount">
			<div class="modal_content">
				<div class="modal_item" v-for="item in typeList" @click="checkType(item)">{{item.type_name}}</div>
				<div class="cancel" @click="showAccount = false">取消</div>
			</div>
		</div>
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
	.go_back{
		position: absolute;
		left: .36rem;
		width: .2rem;
		height: .36rem;
	}
}
.bind_box{
	padding-right: .26rem;
	padding-left: .26rem;
	margin: .3rem auto;
	background: #FFFFFF;
	width: 6.9rem;
	height: 2.4rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.bind_text{
		border-bottom: 1px solid #F6F6F6;
		padding-bottom: .16rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .2rem;
		font-size: .28rem;
		color: #333333;
		.check_box{
			display: flex;
			align-items: center;
			.check_txt{
				color:#FF793E;
			}
			img{
				width: .3rem;
				height: .3rem;
			}
		}
	}
	input{
		display: block;
		box-sizing: border-box;;
		width:6.4rem;
		height:.8rem;
		background:#F6F6F6;
		border-radius:.4rem;
		font-size: .26rem;
		padding-left: .6rem;
		border:none;
		outline: none;
	}
}
.bind_but{
	background: #FF793E;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	height: .96rem;
	line-height: .96rem;
	font-size: .28rem;
	color: #fff;
}
.list{
	position: relative;
	width: 100%;
}
.modal_box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	.modal_content{
		background: #F2F2F2;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		.modal_item,.cancel{
			background: #fff;
			width: 100%;
			text-align: center;
			height: 1rem;
			line-height: 1rem;
			font-size: 17px;
			color:#000000;
		}
		.cancel{
			margin-top: .2rem;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				wangwang:"",		// 输入的旺旺号
				showAccount:false,
				typeList:[],		//类型列表
				type_id:"",
				type_txt:"",
			}
		},
		created(){
			//获取账号类型
			this.gettype();
		},
		methods:{
			//获取账号类型
			gettype(){
				resource.gettype().then(res => {
					if(res.data.code == 0){
						this.typeList = res.data.data;
						this.type_id = this.typeList[0].type_id;
						this.type_txt = this.typeList[0].type_name;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//点击选中某一个类型
			checkType(item){
				this.type_id = item.type_id;
				this.type_txt = item.type_name;
				this.showAccount = false;
			},
			//点击绑定
			bind(){
				if(this.wangwang == ''){
					this.$toast('请输入账号');
				}else{
					MessageBox.confirm('确定绑定?').then(action => {
						if(action == 'confirm'){
							resource.setww({ww:this.wangwang,type:this.type_id}).then(res => {
								if(res.data.code == 0){
									this.$toast('绑定成功');
									this.$router.go(-1);
								}else{
									this.$toast(res.data.msg);
								}
							})
						}
					});
				}
				
			}
		}
	}
</script>