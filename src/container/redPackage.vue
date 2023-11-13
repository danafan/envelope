<template>
	<div class="scroll_box" :class="[{'flex ac jc':hbList.length == 0}]">
		<div class="empty" v-if="hbList.length == 0">暂无数据</div>
		<div class="scroll_item" v-for="item in hbList" @click="pay(item)" 
		v-clipboard:copy="message">
		<div>订单号：{{item.order_sn}}</div>
		<div class="money">¥{{item.amount}}</div>
	</div>
	<!-- 领取红包弹窗 -->
	<div class="model_box pf top-0 left-0 width-100 height-100 flex flex-col ac jc" v-if="show_model">
		<div class="model pr">
			<img class="close_icon pa" src="../assets/close_icon.png" @click="show_model = false">
			<div class="model_title pa left-0 width-100 tc f14 p_c bold">红包</div>
			<div class="model_type pa left-0 width-100 tc f14 p_c bold">{{payment_type}}</div>
			<div class="model_account pa left-0 width-100 tc f14 p_c bold">账号：{{payment_account}}</div>
			<div class="model_name pa left-0 width-100 tc f14 p_c bold">姓名：{{payment_real_name}}</div>
			<div class="money pa left-0 width-100 tc f46 p_c bold">{{amount}}</div>
			<div class="commit_get pa tc f14 p_c bold" @click="commitGet">确认领取</div>
			<img class="red_package pa top-0 left-0 width-100 height-100" src="../assets/red_package_back.png">
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
		.empty{
			font-size: .32rem;
			color: #999999;
		}
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
		.model_box{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			display:flex;
			align-items:center;
			justify-content:center;
			.model{
				position: relative;
				width: 5.52rem;
				height: 5.86rem;
				.close_icon{
					top: -.74rem;
					right: -.5rem;
					width: .5rem;
					height: .5rem;
				}
				.model_title{
					top: .44rem;
					z-index: 9;
				}
				.model_type{
					color: #7874FF;
					top: 1.04rem;
					z-index: 9;
				}
				.model_account{
					color: #7874FF;
					top: 1.64rem;
					z-index: 9;
				}
				.model_name{
					color: #7874FF;
					top: 2.24rem;
					z-index: 9;
				}
				.money{
					top: 2.64rem;
					z-index: 9;
				}
				.commit_get{
					bottom: .4rem;
					left: 50%;
					transform: translate(-50%);
					width: 3.32rem;
					height: .84rem;
					line-height: .84rem;
					background: #ECEBFF;
					border-radius: .42rem;
					z-index: 9;
				}
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
				id:'',
				payment_type:"",
				payment_account:"",
				payment_real_name:"",
				amount:"",
				hbList:[],		//红包列表
				jump_url:'',
				message:"",		//复制的内容
				show_model:false
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
			pay(item){
				this.id = item.id;
				this.payment_type = item.payment_type;
				this.payment_account = item.payment_account;
				this.payment_real_name = item.payment_real_name;
				this.amount = item.amount;
				this.show_model = true;
			},
			commitGet(){
				resource.pay({id:this.id}).then(res => {
					if(res.data.code == 0){
						this.show_model = false;
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
		}
	}
</script>







