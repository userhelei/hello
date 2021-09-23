import Vue from 'vue';

function POST(url, params, inum) { //post提交,同步
	let promise = new Promise(function(resolve, reject) {
		uni.request({
			url: getApp().globalData.apiurl + url,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'authorization': getApp().globalData.accesstoken
			},
			data: params,
			method: 'POST',
			success: function(res) {
				if (res.data.code == 1009) { //重新获取accesstoken
					uni.request({
						url: getApp().globalData.apiurl + 'accesstoken',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							'appid': getApp().globalData.appid,
							'appkey': getApp().globalData.appkey
						},
						method: 'POST',
						success: function(e) {
							if (e.data.code == 1000) {
								getApp().globalData.accesstoken = e.data.token;
								POST1(url, params, inum);
							}
						}
					});
				} else {
					Vue.prototype.netWorkData.result[inum] = res.data;
					resolve();
				}
			}
		})
	});
	return promise
}

function POST1(url, params, inum) { //post提交,同步
	let promise = new Promise(function(resolve, reject) {
		uni.request({
			url: getApp().globalData.apiurldiy + url,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'authorization': getApp().globalData.accesstoken
			},
			data: params,
			method: 'POST',
			success: function(res) {
				// console.log("res:", res)
				Vue.prototype.netWorkData.result[inum] = res.data;
				// console.log("Vue.prototype.netWorkData.result[inum]:", Vue.prototype.netWorkData.result[inum])
				resolve();
			}
		})
	});
	return promise
}

function getqrcode(bid) { //生成二维码
	var that = this;
	var access_token = getApp().globalData.wxtoken;
	if (access_token != "" && bid > 0) {
		var iurl = "diy" + getApp().globalData.projectid + "/weixin_getwxqrcode";
		var idata = {
			"page": 'pages/businesscard/view?id=' + bid,
			"accesstoken": access_token,
			"bid": bid,
			"auid": getApp().globalData.auid,
		}
		this.POST(iurl, idata, 7).then(() => {
			var user_data = getApp().netWorkData.result[7];
			if (user_data.code == 1000) {
				getApp().globalData.qrcodeurl = getApp().globalData.imgurl + user_data.data;
			}
		})
	}
}

function relogin() { //重新登录
	var that = this;
	var irurl = "diy6086/get_userinfo_again";
	var idata = {
		uid: getApp().globalData.userInfo.id
	}
	this.POST1(irurl, idata, 8).then(() => {
		var user_data = getApp().netWorkData.result[8];
		if (user_data.code == 1000) {
			getApp().globalData.userInfo = user_data.data[0];
		}
	});
}

module.exports = {
	POST: POST,
	POST1: POST1,
	getqrcode: getqrcode,
	relogin: relogin
}
