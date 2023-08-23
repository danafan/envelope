<template>
	<div class="bind_container">
		<div class="info_item flex fc">
			<div class="title_row flex ac">
				<div class="tag"></div>
				<div class="flex ac" @click="showAccount = true">
					<div class="info_item_title">账号类别：</div>
					<div class="info_item_title">{{type_txt}}</div>
					<img class="check_icon" src="../assets/check_icon.png">
				</div>
			</div>
			<div class="info_content flex-1 flex ac jc">
				<input class="content_input" :placeholder="`输入${type_txt}账号`" v-model="wangwang">
			</div>
		</div>
		<div class="bind_button" @click="bind">绑定</div>
		<div class="modal_box" v-if="showAccount">
			<div class="modal_content">
				<div class="modal_item" v-for="item in typeList" @click="checkType(item)">{{item.type_name}}</div>
				<div class="cancel" @click="showAccount = false">取消</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.bind_container{
		padding: .3rem .2rem;
		.info_item{
			margin-bottom: .2rem;
			width: 100%;
			height: 2.22rem;
			background: #FFFFFF;
			border-radius: .16rem;
			.title_row{
				border-bottom: 1px solid #F8F8F8;
				height:.68rem;
				.tag{
					margin-right: .2rem;
					width: .06rem;
					height: .32rem;
					background: #00C693 linear-gradient(203deg, #DCD5FF 0%, #B7ABFF 100%);
					border-radius: .06rem;
				}
				.info_item_title{
					color: #333333;
					font-size: .3rem;
					font-weight: 500;
				}
				.check_icon{
					margin-left: .08rem;
					width: .2rem;
					height: .12rem;
				}
			}
			.info_content{
				padding-left: .2rem;
				padding-right: .2rem;
				.content_input{
					outline: none;
					width: 100%;
					height: .84rem;
					background: #F8F8F8;
					border-radius: .42rem;
					border: 1px solid #F1F1F1;
					font-size: .28rem;
					padding-left: .4rem;
					padding-right: .4rem;
				}
			}
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
					this.$toast(`请输入${this.type_txt}账号`);
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