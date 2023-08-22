<template>
	<div class="scroll_box">
		<div class="scroll_item" v-for="item in hbList" @click="pay(item.id)" 
		v-clipboard:copy="message">
		<div>订单号：{{item.order_sn}}</div>
		<div class="money">¥{{item.amount}}</div>
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
		margin-top: .2rem;
		border-radius: .16rem;
		background: #FFFFFF;
		width: 100%;
		height: .96rem;
		font-size: .28rem;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .2rem;
		padding-right: .2rem;
		.money{
			color: #FF8201;
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
				hbList:[],		//红包列表
				jump_url:'',
				message:"",		//复制的内容
			}
		},
		created(){
			//获取红包列表
			this.getHbList();
			
		},
		methods:{
			//获取红包列表
			getHbList(){
				resource.hblist().then(res => {
					if(res.data.code == 0){
						this.hbList = res.data.data;
						this.jump_url = res.data.jump_url;
						this.message = res.data.copy_text;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//领取红包
			pay(id){
				MessageBox.confirm('确定领取该红包?').then(action => {
					if(action == 'confirm'){
						resource.pay({id:id}).then(res => {
							if(res.data.code == 0){
								//获取红包列表
								this.getHbList();
								if(this.jump_url != ''){
									window.open(this.jump_url);
								}
							}else{
								this.$toast(res.data.msg);
							}
						})
					}
				});
			}
		}
	}
</script>







