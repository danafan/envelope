<template>
	<div class="info_container">
		<InfoItem placeholder="支付宝账号" :isDisabled="disabled" @changeInput="changeAcount" :value_text="alipay_acount"/>
		<InfoItem placeholder="姓名" :isDisabled="disabled" @changeInput="changeName" :value_text="alipay_name"/>
		<div class="bind_button" @click="bind" v-if="!disabled">确定</div>
	</div>
</template>
<style lang="less" scoped>
	.info_container{
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
			//输入支付宝账号
			changeAcount(v){
				this.alipay_acount = v;
			},
			//输入姓名
			changeName(v){
				this.alipay_name = v;
			},
			//设置信息
			bind(){
				console.log(this.alipay_acount)
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
		},
		components:{InfoItem}
	}
</script>