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
		<div class="tabs flex jsa" v-clipboard:copy="message">
			<div class="tab_item flex fc ac jc" @click="check_tab('w')">
				<img class="tab_icon" src="../assets/account_active.png" v-if="active_index == 'w'">
				<img class="tab_icon" src="../assets/account_icon.png" v-else>
				<div>账号</div>
			</div>
			<div class="tab_item flex fc ac jc" @click="check_tab('h')">
				<img class="tab_icon" src="../assets/red_package_active.png" v-if="active_index == 'h'">
				<img class="tab_icon" src="../assets/red_package.png" v-else>
				<div>红包</div>
			</div>
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
			background: #FFFFFF;
			width: 100%;
			height: .98rem;
			.tab_item{
				font-size: .22rem;
				color: #333333;
				.tab_icon{
					margin-bottom: .06rem;
					width: .42rem;
					height: .46rem;
				}
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
			resource.logintest({idd:'1'}).then(res => {
				if(res.data.code == 0){
					this.$router.push("/wangList");
				}else{
					this.$toast(res.data.msg);
				}
			})
			return;

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