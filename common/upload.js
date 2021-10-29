import {
	AppServices
} from "@/services";
import config from "@/config/index.js";
import utils from "@/common/utils.js";
// 前台上传图片接口
function uploadImg(callback,shangchuanurl,me_img) {
	uni.chooseImage({
		count: 1, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], //从相册选择
		async success(res) {
			// console.log(res, config.imgUrl);
			uni.showLoading({
				title: "上传中",
				mask: true
			});
			uni.uploadFile({
				// 需要上传的地址
				url: config.imgUrl+ shangchuanurl,
				// filePath  需要上传的文件
				filePath: res.tempFilePaths[0],
				name: me_img,
				formData: {
					me_id: uni.getStorageSync("sj_member_id"),
					token: uni.getStorageSync("sj_token"),
				},
				success(res1) {
					// 显示上传信息
					// console.log(res1)
					const data = JSON.parse(res1.data)
					let code = data.code
					let message = data.msg
					//统一处理返回值
					switch (Number(code)) {
						case 1:
							callback(data)
							break;
						case 9999:
							utils.toast('您的账号已离线，请重新登录');
							setTimeout(()=>{
								uni.navigateTo({
									url: "/pages/login/login/index"
								})
							},1500)
							break;
						default:
							utils.toast(`${message}`)
							break;
					}
				},
				complete: () => {
					uni.hideLoading()
				}
			});
		}
	});
}
module.exports = {
	uploadImg
}
