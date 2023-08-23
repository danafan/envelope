<template>
	<div class="bank_container">
		<InfoItem placeholder="姓名" @changeInput="changeName"/>
		<InfoItem placeholder="开户支行" @changeInput="changeBank"/>
		<InfoItem placeholder="银行卡号" @changeInput="changeNumber"/>
		<div class="bind_button" @click="bind">绑定</div>
	</div>
</template>
<style lang="less" scoped>
	.bank_container{
		padding: .3rem .2rem;
	}
	.bind_button{
		border-radius: .46rem;
		background: #9786FF;
		position: absolute;
		left: 50%;
		bottom: .3rem;
		transform: translate(-50%);
		width: 6.22rem;
		text-align: center;
		height: .9rem;
		line-height: .9rem;
		font-size: .3rem;
		color: #fff;
		font-weight: 600;
	}
</style>
<script>
	import resource from '../api/resource.js'
	import InfoItem from '../components/infoItem'
	export default{
		data(){
			return{
				real_name:"",
				open_account_bank:"",
				bank_card_number:""
			}
		},
		methods:{
			//输入姓名
			changeName(v){
				this.real_name = v;
			},
			//输入开户行
			changeBank(v){
				this.open_account_bank = v;
			},
			//输入卡号
			changeNumber(v){
				this.bank_card_number = v;
			},
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
		},
		components:{InfoItem}
	}
</script>