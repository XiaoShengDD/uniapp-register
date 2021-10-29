import config from "@/config/index.js";
const baseUrl = config.baseUrl;
import utils from "@/common/utils.js";
import Vue from 'vue'

/**
 * 请求数据封装方法
 * @param method 请求方式 GET POST PUT
 * @param url 请求地址（login/login）
 * @param data 请求对象
 * @param loading 是否展示loading
 * @param loadingTitle 展示loading文字
 * @returns {Promise<unknown>}
 */
function fetch(method, url, data, loading, loadingTitle) {
	// console.log(url)
	return new Promise((resolve, reject) => {
		//显示加载动画
		if (loading) {
			uni.showLoading({
				title: loadingTitle,
				mask: true
			});
		}
		//获取token
		const params = {}
		Object.assign(params, data)
		// console.log(params)
		//发起请求
		uni.request({
			url,
			method,
			data: params,
			header: {
				// 数据被编码为名称/值对
				"Content-Type": "application/json;charset=UTF-8",
				"user_login_token": uni.getStorageSync('rescodeUserInfo') ? uni.getStorageSync('rescodeUserInfo').user_login_token : ""
			},
			success: res => {
				// console.log(123, res, url)
				let code = res.data.code
				let message = res.data.msg
				//结束加载动画
				//统一处理返回值
				if (loading) { 
					setTimeout(() => {
						switch (Number(code)) {
							case 0:
							case 200:
								resolve(res.data)
								break;

							case 10007:
								utils.toast('您的账号已离线，请重新登录');
								setTimeout(() => {
									uni.navigateTo({
										url: "/pages/login/login"
									})
								}, 1500)
								break;
							default:
								utils.toast(`${message}`)
								break;
						}
					}, 1500)
				} else {
					switch (Number(code)) {
						case 0:
						case 200:
							resolve(res.data)
							break;
						case 10007:
							utils.toast('您的账号已离线，请重新登录');
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/login/login"
								})
							}, 1500)
							
							break;
						default:
							utils.toast(`${message}`)
							break;
					}
				}
			},
			fail: err => {
				reject(err);
				uni.stopPullDownRefresh();
			},
			complete: () => {
				setTimeout(function() {
					uni.stopPullDownRefresh(); //停止下拉刷新动画	
				}, 500);
				if (loading) {
					setTimeout(() => {
						uni.hideLoading();
					}, 1000)
				}
			}
		});
	})
}
export default {
	get(url, params, loading, loadingTitle) {
		return fetch('GET', baseUrl + url, params, loading, loadingTitle)
	},
	post(url, params, loading, loadingTitle) {
		return fetch('POST', baseUrl + url, params, loading, loadingTitle)
	},
	put(url, params, loading, loadingTitle) {
		return fetch('PUT', baseUrl + url, params, loading, loadingTitle)
	}
}
