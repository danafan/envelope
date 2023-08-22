<template>
	<div>
		<div class="bank_row">
			<div class="label">支付宝账号</div>
			<input class="input" type="text" placeholder="输入支付宝账号" :disabled="disabled" v-model="alipay_acount">
		</div>
		<div class="bank_row">
			<div class="label">姓名</div>
			<input class="input" type="text" placeholder="输入姓名" :disabled="disabled" v-model="alipay_name">
		</div>
		<div class="bind_but" @click="bind">确定</div>
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
				alipay_acount:"",
				alipay_name:"",
				disabled:false
			}
		},
		created(){
			//获取信息
			this.getData();
		},
		methods:{
			//获取信息
			getData(){
				resource.getData().then(res => {
					let data = res.data;
					if(data.code == 0){
						if(data.alipay_acount != "" && data.alipay_name != ''){
							this.alipay_acount = data.alipay_acount;
							this.alipay_name = data.alipay_name;
							this.disabled = true;
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//设置信息
			bind(){
				if(this.alipay_acount == ''){
					this.$toast('请输入支付宝账号');
				}else if(this.alipay_name == ''){
					this.$toast('请输入姓名');
				}else{
					let req = {
						alipay_acount:this.alipay_acount,
						alipay_name:this.alipay_name
					}
					resource.setData(req).then(res => {
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