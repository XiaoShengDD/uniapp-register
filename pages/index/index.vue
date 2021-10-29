<template>
	<view class="">
		<u-no-network></u-no-network>
		<view class="login_phone" @click="carno.show = false">
			<view class="login-phone-main">
				<view class="login-phone-from display_flex align_item">
					<view class="phone">邮箱：</view>
					<u-input v-model="mobile" type="text" placeholder="请输入邮箱" :border="false" />
				</view>
				<view class="login-phone-from display_flex align_item">
					<view class="pas">验证码：</view>
					<u-input v-model="code" type="text" :clearable="true" maxlength="8" placeholder="请输入验证码" :border="false" />
					<view style="margin-left: 20upx;" class="login-phone-from-btn" v-if="nums == 60" @click="getVerCode">{{ codeText }}</view>
					<view class="login-phone-from-btn" v-else>{{ codeText }}</view>
				</view>
				<view class="login-phone-from display_flex align_item">
					<view class="phone">昵称：</view>
					<u-input v-model="name" type="text" placeholder="请输入昵称" :border="false" />
				</view>


				<view class="login-phone-from display_flex align_item">
					<view class="phone">密码：</view>
					<u-input v-model="password" type="password" placeholder="请输入密码" :border="false" />
				</view>
				<view class="login-phone-from display_flex align_item">
					<view class="phone">确认密码：</view>
					<u-input v-model="newpassword" type="password" placeholder="请再次输入密码" :border="false" />
				</view>
				<view class="login-phone-from display_flex align_item">
					<view class="phone">邀请码(必填)：</view>
					<u-input disabled="disabled" v-model="cordNum" type="text" placeholder="请输入邀请码" :border="false" />
				</view>


				<u-checkbox-group>
					<u-checkbox v-model="checked" active-color="#0046AE">
					</u-checkbox>
					已阅读并同意
					<span @click="open(1)">《用户协议》</span>
				</u-checkbox-group>
			</view>
			<view class="login-phone-btns" @click="userregister">
				<view class="login-phone-btn btnss">确认注册</view>
			</view>

			<view class="yingying" v-if="show"></view>
			<view class="tanchuanceng" v-if="show">
				<view class="title" style="text-align: center;">{{title}}</view>
				<scroll-view class="slot-content" scroll-y="true">
					<rich-text :nodes="content"></rich-text>
				</scroll-view>
				<view class="wozhidap" style="text-align: center;background-color: #00BFFF;" v-if="timedjs > 0">{{wzdl}}({{timedjs}})</view>
				<view class="wozhidap" style="text-align: center;" v-if="timedjs == 0" @click="guanbitanchuang">{{wzdl}}</view>
			</view>
			<u-select v-model="showshefn" mode="single-column" :list="sf_list" @confirm="confirm"></u-select>

		</view>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				carno: {
					value: '',
					show: false,
				},
				carnoshow: false,
				showshefn: false,
				phoneDataLength: false,
				isDuanxinShow: true,
				verCode: '',
				checked: false,
				codeText: '获取验证码',
				nums: 60,
				timer: null,
				openId: '',
				isGet: true,
				show: false,
				content: '',
				title: '',
				sliderVerifyFLag: false,
				imginfo: '',
				sf_list: [],
				wzdl: '我知道了',
				name: '',
				cordType: '',
				cordTypeId: '',
				cordNum: '',
				mobile: '',
				code: '',
				password: '',
				newpassword: '',
				timedjs: 3,
				ids: '',
				task_id:'',

			};
		},
		onLoad(e) {
			this.cordNum = e.cordNum
		},

		methods: {
			carnoTap(id) {
				this.carno.show = false;
				uni.hideKeyboard(); //隐藏软键盘  
				setTimeout(() => {
					this.carno.show = true;
				}, 500)

				this.ids = id
			},
			carnoSubmit(val) {
				if (this.ids == 1) {
					this.yuanpassword = val
				} else if (this.ids == 2) {
					this.password = val
				} else {
					this.newpassword = val
				}

			},

			guanbitanchuang() {
				this.timedjs = 3
				this.show = false
			},

			confirm(e) {
				this.cordType = e[0].label
				this.cordTypeId = e[0].value
			},
			// 初始化方法
			async getSlideCaptcha() {
				let data = {

				}
				const res = await this.$wpy.getSlideCaptcha(data);
				this.imginfo = res.data
				this.$refs.verifyElement.top = this.imginfo.yHeight
			},


			getVerCode() {
				
				if (this.mobile.length != 11) {
					this.$utils.toast('邮箱不正确', 'top');
					return false;
				}
				
				if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
					this.$utils.toast('请输入邮箱', 'top');
					return;
				}
				
				
				////console.log("获取验证码")
				this.Captcha()
			},
			// 验证码子组件返回
			async Captcha() {
				this.$utils.toast('短信发送成功', 'top');
				this.getCode()
			},


			// 初始化方法
			async userregister() {
				if (this.mobile == "") {
					this.$utils.toast('邮箱不得为空', 'top');
					return false;
				}
				
				if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(this.mobile)) {
					this.$utils.toast('请输入正确邮箱地址', 'top');
					return;
				}
				//获取验证码
				// if (this.code == '') {
				// 	this.$utils.toast('请输入验证码', 'top');
				// 	return
				// }
				if (this.name == '') {
					this.$utils.toast('请输入昵称', 'top');
					return
				}

				if (this.cordNum == '') {
					this.$utils.toast('请输入邀请码', 'top');
					return
				}
				if (this.password =='') {
					this.$utils.toast('请输入密码', 'top');
					return
				}
				if (this.password != this.newpassword) {
					this.$utils.toast('两次密码不一致', 'top');
					return
				}
				if (this.checked == false) {
					this.$utils.toast('请阅读用户协议', 'top');
					return
				}
				if (this.password != this.newpassword) {
					this.$utils.toast('两次密码不一致', 'top');
					return
				}
				let data = {
					user_mobile_phone: this.mobile,
					task_id: this.task_id,
					sms_code: this.code,
					user_nick_name: this.name,
					user_login_password: this.password,
					invitation_code: this.cordNum
				}
				const res = await this.$appserve.userregister(data);
				this.$utils.toast("注册成功");
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			},
			open(e) {
				if (e == 1) {
					this.title = '用户协议'
					this.getByName('用户协议')
					let time = setInterval(() => {
						if (this.timedjs > 0) {
							this.timedjs--
						}
						if (this.timedjs == 0) {
							clearInterval(time)
						}
					}, 1000)

				}
				if (e == 2) {
					this.title = '授权协议'
					this.getByName('授权协议')
				}
				if (e == 3) {
					this.title = '隐私政策'
					this.getByName('隐私政策')
				}

				this.show = true;
			},
			// 初始化方法
			async getByName(agreementName) {
				let data = {
					agreementName: agreementName
				}
				const res = await this.$appserve.getByName(data);
				this.content = res.data.agreementContent
			},
			async getCode() {
				////console.log('fa')
				//、短信类型（0注册/1重置密码/2快捷登录）
				if (this.mobile == '') {
					this.$utils.toast('请输入手机号', 'top');
					return;
				}
				if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
					this.$utils.toast('手机号码有误，请重填', 'top');
					return;
				}
				if (this.isGet) {
					this.isGet = false;
					this.timer = setInterval(this.doLoop, 1000);
				}
				// Register 忘记登录密码：ResetPwd 修改登录密码：ModifyPwd 忘记交易密码：ResetTranPwd 修改交易密码：ModifyTranPwd
				let data = {
					user_mobile_phone: this.mobile,
					sms_biz_type:"Register",
				};
				const res = await this.$appserve.smscode(data);
				this.task_id = res.data.task_id
			},
			// 初始化方法

			doLoop() {
				this.nums--;
				if (this.nums > 0) {
					this.codeText = '重新获取(' + this.nums + 's)';
				} else {
					clearInterval(this.timer); //清除js定时器
					this.codeText = '发送验证码';
					this.nums = 60; //重置时间
					this.isGet = true;
				}
			}
		}
	};
</script>

<style>
	page {
		background: #ffffff !important;
	}

	/* /deep/ .u-model__content{
	height: 600rpx;
	overflow-y: scroll !important;
	background: red;
} */
	.slot-content {
		height: 450rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin: 30rpx 0;
	}
</style>
<style scoped>
	.wozhidap {
		width: 60%;
		margin: 0 auto;
		background-color: #0046AE;
		height: 60upx;
		line-height: 60upx;
		border-radius: 20upx;
		color: #fff;
	}

	.yingying {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
	}

	.tanchuanceng {
		width: 76%;
		height: 50vh;
		background-color: #fff;
		padding: 30upx;
		position: absolute;
		top: 20vh;
		left: 12%;
		border-radius: 20upx;
	}

	.login_phone {
		width: 100%;
		background: #ffffff !important;
		height: calc(100vh - 90upx);
	}

	.login-phone-main {
		background-color: rgba(255, 255, 255, 1);
	}

	.login-phone-from {
		width: 100%;
		height: 106rpx;
		border-bottom: 2upx solid #eeeeee;
		padding: 0 30upx;
	}

	.login-phone-from:last-of-type {
		border-bottom: 0;
	}

	.login-phone-from-input {
		flex: 1;
		height: 36upx;
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 36upx;
	}

	.login-phone-from-btn {
		height: 56upx;
		font-size: 26upx;
		font-family: PingFangSC-Regular, PingFangSC;
		font-weight: 400;
		color: #fff;
		line-height: 36upx;
		background-color: #0046AE;
		padding: 10upx 20upx;
		border-radius: 6upx;
		box-shadow: 5upx 5upx 10upx #0046AE;
	}

	.login-phone-btns {
		width: 100%;
		height: 74rpx;
	}

	.login-phone-btn {
		margin: 286rpx auto;
		height: 74rpx;
		width: 484rpx;
		background-color: #0046AE;
		color: #ffffff;
		border-radius: 40rpx;
		font-size: 24upx;
		font-family: PingFangSC-Medium, PingFangSC;
		font-weight: 500;
		text-align: center;
		line-height: 74upx;
	}

	.u-checkbox-group {
		margin: 22rpx 0 0 30rpx;
		font-size: 24rpx !important;
	}

	.u-checkbox-group span {
		color: #0046AE;
		margin-left: 5rpx;
	}

	>>>.u-checkbox__icon-wrap {
		width: 22rpx !important;
		height: 22rpx !important;
	}

	>>>.u-model__content__message {
		text-align: left;
	}

	>>>.u-model__footer {
		width: 484rpx;
		height: 150rpx;
		margin: auto;
	}

	>>>.u-model__footer__button {
		height: 74rpx;
		background: #0046AE;
		color: #FFFFFF !important;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
