<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="" bgColor="" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">登录</block>
		</cu-tabBar>

		<view class="login-img">
			<image class="login-imgs" :style="{height: loginHeight + 'rpx'}" src="../../static/login-bg.png"></image>
			<view class="login">
				<view class="phone">
					<image class="phone-img" src="../../static/phone.png"></image>
					<input class="phone-input" placeholder="请输入手机号" v-model="phone" />
				</view>
				<!-- <view class="login-line"></view> -->
				<view class="phone" style="margin-top: 30rpx;">
					<image class="code-img" src="../../static/code.png"></image>
					<input placeholder="请输入验证码" v-model="code" />
					<view v-if="countdown == 300 || countdown == 0" @click="getCode" class="code">获取验证码</view>
					<view class="code" style="width: 240rpx;" v-if="countdown < 300 && countdown > 0">
						重新发送({{countdown}})</view>
				</view>
				<!-- <button open-type="getUserInfo" @getuserinfo="getUser" class="sign">登录</button> -->

				<button v-if="canIUseGetUserProfile" @tap="getUser" class="sign">登录</button>
				<button v-else open-type="getUserInfo" bindgetuserinfo="getUserInfo" class="sign">登录</button>
			</view>
		</view>



	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	let util = require('utils/util');
	let userreg = new RegExp(/^1(3|4|5|7|8)\d{9}$/); //手机号正则

	export default {
		data() {
			return {
				loginHeight: this.screenWidth * 1.23 * 2,
				phone: '',
				code: '',
				countdown: 300, //倒计时
				set: null, //倒计时方法
				//
				canIUseGetUserProfile: false,
				userInfo: {},
				//
			}
		},
		methods: {
			//获取验证码
			getCode() {
				let that = this;

				if (!userreg.test(that.phone)) {
					uni.showToast({
						title: "请输入正确的手机号码!",
						icon: "none"
					});
					return
				}
				let data = {
					mobile: that.phone
				}
				reqdata.POST1('apimessages', data, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];

					//网站返回状态判断
					if (redata.code == 1) {
						that.countDown(that.countdown);
					}
				})
			},
			//登录验证码倒计时
			countDown(num) {
				let that = this;
				that.set = setInterval(res => {
					--num;
					that.countdown = num;
					// console.log(that.countdown)
				}, 1000)
				setTimeout(() => {
					clearInterval(that.set);
				}, num * 1000)
			},
			getUser(e) {
				// console.log(e);
				let that = this;

				if (!userreg.test(that.phone)) {
					uni.showToast({
						title: "请输入正确的手机号码!",
						icon: "none"
					});
					return
				}
				if (that.code == '') {
					uni.showToast({
						title: "请输入验证码!",
						icon: "none"
					});
					return
				}

				
				// 拉取微信授权
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						// console.log(res);
						let datas = {
							openid: '', //	微信openid
							username: res.userInfo.nickName, //	用户名
							avatar: res.userInfo.avatarUrl, //	微信头像
							mobile: that.phone, //	用户登录手机号码
							code: that.code
						}
						// console.log(datas);
						reqdata.POST1('apilogin', datas, 2).then(() => {
							// 网站返回数据赋值
							var redata = that.netWorkData.result[2];
							// console.log(redata);
							//网站返回状态判断
							if (redata.code == 1) {
								uni.setStorageSync('type', redata.data.type) // 用户类型
								uni.setStorageSync('uid', redata.data.uid) // 用户uid
								uni.setStorageSync('phone', that.phone)
								uni.setStorageSync('nickName', res.userInfo.nickName)
								uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
								// 登入时间（当前时间）
								var loginTime = Date.parse(new Date())
								uni.setStorageSync('loginTime', loginTime)
								clearInterval(that.set);

								if (redata.data.type == 'user') { //type == 'user'用户
									uni.redirectTo({
										url: '/pages/user/home/home'
									})
								} else if (redata.data.type == 'engineer') { //type == 'engineer'工程师
									uni.redirectTo({
										url: '/pages/engineer/home/home'
									})
								}
								/* uni.redirectTo({
									url: '/pages/index/choose'
								}) */
							} else {
								uni.showToast({
									title: redata.msg,
									icon: "none"
								});
							}
						})
					},
				})
			}
		},
		onLoad() {
			
			var that = this;
			// 
			if (wx.getUserProfile) {
				that.$data.canIUseGetUserProfile = true
			}
			//engineer
			// uni.setStorageSync('type', 'user') // 用户类型
			/* let type = uni.getStorageSync('type')

			// 判断是否登入过
			if(uni.getStorageSync('loginTime') == ''){
				uni.setStorageSync('loginTime', Date.parse(new Date()));
			}
			// 登入的时间
			var loginTime = uni.getStorageSync('loginTime')
			// console.log(loginTime);
			
			// 当前时间
			var nowTime = Date.parse(new Date());
			// console.log(nowTime);
			// 时间差（当前时间-登入的时间）
			var dateDiff = nowTime - loginTime;
			// console.log(dateDiff);
			// 时间戳转为天数
			var day = Math.floor(dateDiff / 1000 / 3600 / 24);
			// console.log(day);
			// 判断登入时间是否超过10天
			if (day < 10) {
				if (type == 'user') {
					uni.redirectTo({
						url: '/pages/user/home/home'
					})
				} else if (type == 'engineer') {
					uni.redirectTo({
						url: '/pages/engineer/home/home'
					})
				}
			} else {
				// 移除缓存中的用户对象
				uni.removeStorageSync('type');
				uni.showToast({
					title: '登入失效',
					icon:'none',
					duration: 2000
				});
			} */
		},
	}
</script>

<style>
	page {
		background: #fff;
	}

	.login-img {
		position: fixed;
		top: 0;
		width: 100%;
	}

	.login-imgs {
		width: 100%;
	}

	.login {
		margin-top: 440rpx;
		position: absolute;
		top: 0;
	}

	.phone {
		display: flex;
		flex-direction: row;
		margin: 0 102rpx;
		border-bottom: 2rpx solid #aaa;
		padding: 16rpx 0;
		width: calc(100% - 204rpx);
	}

	.phone input {
		width: 48%;
	}

	.phone-img {
		width: 36rpx;
		height: 47rpx;
		margin: 0 22rpx 0 44rpx;
	}

	.code-img {
		width: 40rpx;
		height: 45rpx;
		margin: 0 20rpx 0 42rpx;
	}

	.phone-input {
		font-size: 30rpx;
	}

	.login-line {
		width: 100%;
		height: 4rpx;
		background: #AAAAAA;
	}

	.code {
		font-size: 30rpx;
		color: #4697FF;
		border: 2rpx solid #4697FF;
		border-radius: 8rpx;
		padding: 4rpx 8rpx;
	}

	.code:active {
		background: #d6d6d6;
	}

	.sign {
		font-size: 30rpx;
		color: #fff;
		width: calc(100% - 180rpx);
		height: 88rpx;
		background: #4697FF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 90rpx;
		border-radius: 88rpx;
		margin-top: 124rpx;
	}

	.sign:active {
		background: rgba(70, 151, 255, 0.8);
	}
</style>
