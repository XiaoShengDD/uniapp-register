import fetch from './fetch';
export default {
	//用户注册
	userregister(data) {
		return fetch.post('/user/register', { ...data
		}, false, "")
	},

	// 修改用户交易密码
	transactionpassword(data) {
		return fetch.post('/user/transaction/password', { ...data
		}, false, "")
	},
	// 修改用户登录密码
	loginpassword(data) {
		return fetch.post('/user/login/password', { ...data
		}, false, "")
	},
	// 发送验证码sms_biz_type
	//注册：Register 忘记登录密码：ResetPwd 修改登录密码：ModifyPwd 忘记交易密码：ResetTranPwd 修改交易密码：ModifyTranPwd
	smscode(data) {
		return fetch.post('/sms/code', { ...data
		}, false, "")
	},
	// 根据手机号获取用户列表
	userList(data) {
		return fetch.post('/user', { ...data
		}, false, "")
	},
	// 添加常用地址
	withdrawaladdressadd(data) {
		return fetch.post('/withdrawal/address/add', { ...data
		}, false, "")
	},
	// 添加留言
	messageboard(data) {
		return fetch.post('/message/board', { ...data
		}, false, "")
	},
	// 用户token验证
	tokencheck(data) {
		return fetch.post('/token/check', { ...data
		}, false, "")
	},
	// 用户充值
	usdtrecharge(data) {
		return fetch.post('/recharge', { ...data
		}, false, "")
	},
	// 用户募捐
	donation(data) {
		return fetch.post('/donation', { ...data
		}, false, "")
	},
	// 用户提现
	withdrawal(data) {
		return fetch.post('/withdrawal', { ...data
		}, false, "")
	},
	
	// 用户登录
	userlogin(data) {
		return fetch.post('/user/login', { ...data
		}, false, "")
	},
	// 用户退出登录
	userlogout(data) {
		return fetch.post('/user/logout', { ...data
		}, false, "")
	},
	// 获取充值二维码和地址
	donationinfo(data) {
		return fetch.post('/donation/info', { ...data
		}, false, "")
	},
	// 获取充值二维码和地址
	rechargeinfo(data) {
		return fetch.post('/recharge/info', { ...data
		}, false, "")
	},
	// 获取募捐记录
	donationrecord(data) {
		return fetch.post('/donation/record', { ...data
		}, false, "")
	},
	// 获取币种
	coin(data) {
		return fetch.post('/coin', { ...data
		}, false, "")
	},
	// 获取常用地址
	withdrawaladdress(data) {
		return fetch.post('/withdrawal/address', { ...data
		}, false, "")
	},
	// 获取我的团队页面内容
	myteam(data) {
		return fetch.post('/my/team', { ...data
		}, false, "")
	},
	// 获取新闻列表以及详情
	news(data) {
		return fetch.post('/news', { ...data
		}, false, "")
	},
	// 获取用户团队人数
	myteamcount(data) {
		return fetch.post('/my/team/count', { ...data
		}, false, "")
	},
	// 获取用户详情
	userdetail(data) {
		return fetch.post('/user/detail', { ...data
		}, false, "")
	},
	// 获取用户钱包金额
	userwallet(data) {
		return fetch.post('/user/wallet', { ...data
		}, false, "")
	},
	// 获取钱包交易记录
	walletrecord(data) {
		return fetch.post('/wallet/record', { ...data
		}, false, "")
	},
	// 验证码校验
	smscodecheck(data) {
		return fetch.post('/sms/code/check', { ...data
		}, false, "")
	},
	
	//设置交密码
	settransactionpassword(data) {
		return fetch.post('/user/transaction/password/set', { ...data
		}, false, "")
	},
	//获取
	systemnotice(data) {
		return fetch.post('/system/notice', { ...data
		}, false, "")
	},
	// 总人数
	usercount(data) {
		return fetch.post('/user/count', { ...data
		}, false, "")
	},

}
