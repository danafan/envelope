<template>
	<div>
		<div class="bank_row">
			<div class="label">姓名</div>
			<input class="input" type="text" placeholder="输入姓名" v-model="real_name">
		</div>
		<div class="bank_row">
			<div class="label">开户支行</div>
			<input class="input" type="text" placeholder="输入开户支行名称" v-model="open_account_bank">
		</div>
		<div class="bank_row">
			<div class="label">银行卡号</div>
			<input class="input" type="number" placeholder="输入银行卡号" v-model="bank_card_number">
		</div>
		<div class="bind_but" @click="bind">绑定</div>
	</div>
</template>
<style lang="less" scoped>
.bank_row{
	border-bottom: 1px solid #E8E8E8;
	background: #fff;
	width: 100%;
	height: 55px;
	display: flex;
	align-items: center;
	padding-left: 15px;
	padding-right: 15px;
	.label{
		width: 100px;
		font-size: 15px;
		color: #333;
	}
	.input{
		flex:1;
		height: 50px;
		border: none;
		outline: none;
		font-size: 15px;
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
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				real_name:"",
				open_account_bank:"",
				bank_card_number:""
			}
		},
		methods:{
			bind(){
				if(this.real_name == ''){
					this.$toast('请输入姓名');
				}else if(this.open_account_bank == ''){
					this.$toast('请输入开户支行名称');
				}else if(this.bank_card_number == ''){
					this.$toast('请输入银行卡号');
				}else{
					let req = {
						real_name:this.real_name,
						open_account_bank:this.open_account_bank,
						bank_card_number:this.bank_card_number
					}
					resource.setbank(req).then(res => {
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
</script>