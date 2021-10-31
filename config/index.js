let baseUrl = ''
// baseUrl = 'http://app.leshichina.net/api/oxfam/v1.0' // 正式环境
baseUrl = 'http://18.166.14.56:60000/api/oxfam/v1.0' // 测试环境
const up_img = baseUrl+'/image/upload'
module.exports = {
	baseUrl,
	up_img
}