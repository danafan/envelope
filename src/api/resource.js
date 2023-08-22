import http from './request.js'
let path = {	
	login:'wx/logintest',
	bannerList:'wx/bannerlist',				//轮播图列表
	wangList:'wx/wwlist',					//获取旺旺号列表
	setww:'wx/setww',						//绑定旺旺号
	hblist:'wx/hblist',						//红包列表
	pay:'wx/pay',							//领取红包
	gettype:'wx/gettype',					//获取账号类型
	setbank:'wx/setbank',					//绑定银行卡
	setData:'wx/setdata',					//设置信息
	getData:'wx/getdata',					//获取信息
	sendSmsCode:'user/sendsmscode',			//发送手机验证码
	bindPhone:'user/bindphone',				//验证绑定手机号密码
	
}
export default{
	//获取验证码
	wangList(params){
		return http.get(path.wangList, params)
	},
	//登录
	login(params){
		return http.get(path.login, params)
	},
	//获取banner列表
	bannerList(params){
		return http.get(path.bannerList, params)
	},
	//绑定旺旺号
	setww(params){
		return http.post(path.setww, params)
	},
	//红包列表
	hblist(params){
		return http.get(path.hblist, params)
	},
	//领取红包
	pay(params){
		return http.post(path.pay, params)
	},
	//获取账号类型
	gettype(params){
		return http.get(path.gettype, params)
	},
	//绑定银行卡
	setbank(params){
		return http.post(path.setbank, params)
	},
	//设置信息
	setData(params){
		return http.post(path.setData, params)
	},
	//获取信息
	getData(params){
		return http.get(path.getData, params)
	},
	//获取手机验证码
	sendSmsCode(params){
		return http.post(path.sendSmsCode, params)
	},
	//验证绑定手机号密码
	bindPhone(params){
		return http.post(path.bindPhone, params)
	},
}