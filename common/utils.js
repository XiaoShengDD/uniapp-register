// 全局toast提示方法
function toast(title) {
	uni.showToast({
		title: title,
		duration: 2000,
		icon: 'none',
		position: "center"
	});
}
// 全局toast提示方法
function modal(title) {
	uni.showModal({
		title: '提示',
		content: '此功能暂未开放',
		showCancel: false,
		confirmText: "我知道了",
		success: function(res) {
			if (res.confirm) {
				// console.log('用户点击确定');
			} else if (res.cancel) {
				// console.log('用户点击取消');
			}
		}
	});
}
module.exports = {
	toast,
	modal,
}
