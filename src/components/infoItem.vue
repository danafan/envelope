<template>
	<div class="info_item flex fc">
		<div class="title_row flex ac">
			<div class="tag"></div>
			<div class="info_item_title">{{placeholder}}</div>
		</div>
		<div class="info_content flex-1 flex ac">
			<input class="content_input value_text" :placeholder="`输入${placeholder}`" :disabled="isDisabled" v-model="input_value" @input="$emit('changeInput',input_value)">
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				input_value:""
			}
		},
		props:{
			//输入框提示文字
			placeholder:{
				type:String,
			default:''
			},
			//是否不可编辑
			isDisabled:{
				type:Boolean,
			default:false
			},
			//信息内容
			value_text:{
				type:String,
			default:''
			},
		},
		watch:{
			value_text:function(n,o) {
				this.input_value = n;
			}
		}
	}
</script>
<style lang="less" scoped>
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
				padding-left: .4rem;
				padding-right: .4rem;
			}
			.value_text{
				color: #333333;
				font-size: .28rem;
			}
		}
	}
</style>