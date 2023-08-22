<template>
	<div class="box">
		<Title :title_type="active_index" :is_bank="is_bank"/>
		<div class="banner" v-if="banner_list.length > 0">
			<mt-swipe>
				<mt-swipe-item v-for="item in banner_list" :key="item.id">
					<img :src="item.img_url" v-clipboard:copy="item.jump_url" @click="routeUrl(item)">
				</mt-swipe-item>
			</mt-swipe>
		</div>	
		<div class="content">
			<router-view></router-view>
		</div>
		<div class="tabs" v-clipboard:copy="message">
			<div class="tab_item" :class="{'active_item':active_index == 'w'}" @click="check_tab('w')">账号</div>
			<div class="tab_item" :class="{'active_item':active_index == 'h'}" @click="check_tab('h')">红包</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.banner{
			width: 100%;
			height: 2.35rem;
			.mint-swipe-items-wrap{
				width: 100%;
				height: 100%;
				.mint-swipe-item{
					width: 100%;
					height: 100%; 
					img{
						width: 100%;
						height: 100%;
					}
				}
				.swiper-pagination{
					height: .001rem;
					bottom: 70px;
				}
			}
		}
		.content{
			flex:1;
			width: 100%;
			position: relative;
		}
		.tabs{
			width: 100%;
			height: .96rem;
			display: flex;
			.tab_item{
				background: #FFAD58;
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .28rem;
				color: #FFFFFF;
			}
			.active_item{
				background: #FF793E;
			}
		}
	}
</style>
<script>
	import Title from '../components/Title.vue'
	import resource from '../api/resource.js'
	import { Swipe, SwipeItem } from 'mint-ui'
	export default{
		data(){
			return{
				active_index:"w",	//默认选中旺旺号
				banner_list:[],	//banner列表
				is_bank:true,
				message:""
			}
		},
		created(){
			//测试登录
			// resource.login({idd:'1'}).then(res => {
			// 	if(res.data.code == 0){
			// 		this.$router.push("/wangList");
			// 	}else{
			// 		this.$toast(res.data.msg);
			// 	}
			// })

			//判断是否绑定银行卡
			this.getWangList();
			//获取banner列表
			this.bannerList();
			
		},
		methods:{
			//判断是否绑定银行卡
			getWangList(){
				resource.wangList().then(res => {
					if(res.data.code == 0){
						this.is_bank = res.data.is_bank;
						this.message = res.data.copy_text;
						this.$router.push("/wangList");
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取banner列表
			bannerList(){
				resource.bannerList().then(res => {
					if(res.data.code == 0){
						this.banner_list = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//点击切换导航
			check_tab(type){
				this.active_index = type;
				if(type == 'w'){
					this.$router.push("/wangList");
				}else{
					this.$router.push("/redPackage");
				}
			},
			//点击图片
			routeUrl(item){
				if(item.type == 2){
					window.open(item.jump_url);
				}
			},
		},
		components:{
			Title,
			Swipe,
			SwipeItem
		}
	}
</script>