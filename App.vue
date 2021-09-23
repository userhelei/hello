<script>
	import Vue from 'vue';
	// let reqdata = require('utils/datarequest');
	
	export default {
		onLaunch: function() {
			/* let that = this;
			// 登录
			uni.login({
				success: res => { //获取code
					let code = {
						code: res.code
					};
					// 传入code获取openid和session_key
					reqdata.POST1('api/index/opencode', code, 2).then(() => {
						var redatas = that.netWorkData.result[2];
						// 保存openid和session_key
						uni.setStorageSync('openid', redatas.data.openid)
						uni.setStorageSync('session_key', redatas.data.session_key)
					})
					
					// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
					// 所以此处加入 callback 以防止这种情况
					if (this.userInfoReadyCallback) {
						this.userInfoReadyCallback(res)
					}
				}
			}) */
			// 获取系统状态栏以及系统屏幕宽高信息
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					Vue.prototype.screenWidth = e.screenWidth;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			// post
			Vue.prototype.netWorkData = { //网站返回数据
				result: [{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					},
					{
						code: -1,
						data: "",
						model: "",
						msg: '发起请求失败'
					}
				]
			}

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {

		},
		globalData: {
			projectname: '售后系统工单', //项目名称
			minappid: "", //小程序APPID
			appid: "", //项目appid
			appkey: "", //项目appkey
			accesstoken: "", //token
			apiurldiy: "https://www.bjhdsh.vip/index.php/", // POST1方法 api地址
			apiurl: "https://www.bjhdsh.vip/index.php/", // POST方法 api地址
			imgurl: "https://www.bjhdsh.vip", // 图片前缀
		}

	}
</script>

<style>
	/*每个页面公共css */
	@import "components/coreui/main.css";
	@import "components/coreui/icon.css";
	@import "components/coreui/public.css";
</style>
