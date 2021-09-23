var app = getApp();
var reg_email = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/); //邮箱正则
var reg_tel = new RegExp(/^1(3|4|5|7|8)\d{9}$/); //手机号正则


const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
//传入数量，返回汉字数组
function Ghz(vnum) {
	if (app.globalData.xinhuazidian != null) {
		var rehz = [];
		for (var i = 0; i < vnum; i++) {
			var random = parseInt(Math.random() * 1999);
			rehz.push(app.globalData.xinhuazidian[random].xh_name);
		}
		//console.log(rehz);
		return rehz;
	} else {
		return null;
	}
}

//返回随机数
function Grandom(vmax) {
	return parseInt(Math.random() * vmax);
}

function Gshuffle(arr) { //数组随机排序

	var i = arr.length,
		t, j;

	while (i) {

		j = Math.floor(Math.random() * i--);

		t = arr[i];

		arr[i] = arr[j];

		arr[j] = t;
	}
	return arr;
}
//获取时分
function getTimeStr(today) {
	var dd;
	if (today) {
		dd = new Date(today);
	} else {
		dd = new Date();
	}
	dd.setDate(dd.getDate()); //获取AddDayCount天后的日期 
	var hour = dd.getHours()
	var minute = dd.getMinutes()

	return [hour, minute].map(formatNumber).join(':')
}
//types 1返回第一张图片 2返回所有图片
function getiImg(url, img, types = 1) {
	if (img == "" || img == null) {
		return false;
	}
	var array = img.split(",")
	if (types == 1) {
		if (array[0].indexOf("uploadfile") < 0) {
			return array[0]
		} else {
			return url + array[0]
		}
	} else {
		for (var e in array) {
			if (array[e] != "" && array[e] != null && array[e] != 'undefined') {
				if (array[e].indexOf("uploadfile") < 0) {
					array[e] = array[e];
				} else {
					array[e] = url + array[e];
				}
			}
		}
		return array;
	}
}
//获取时间
function getHourStr(today) {
	var dd;
	if (today) {
		dd = new Date(today);
	} else {
		dd = new Date();
	}
	dd.setDate(dd.getDate()); //获取AddDayCount天后的日期 
	var hour = dd.getHours();
	return hour;
}

//获取日期
function getDateStr(today, addDayCount) {
	var dd;
	if (today) {
		dd = new Date(today);
	} else {
		dd = new Date();
	}
	dd.setDate(dd.getDate() - addDayCount); //获取AddDayCount天以前的日期 
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期 
	var d = dd.getDate();
	if (m < 10) {
		m = '0' + m;
	};
	if (d < 10) {
		d = '0' + d;
	};
	return y + "-" + m + "-" + d;
}

//获取当月最后一天
function getDateMonthLastStr(today) {
	var dd;
	if (today) {
		dd = new Date(today + "-01");
		//dd.setDate(dd.getDate() - addDayCount);//获取AddDayCount天以前的日期 
		dd.setMonth(dd.getMonth() + 1);
		dd.setDate(0);
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1; //获取当前月份的日期 
		var d = dd.getDate();
		if (m < 10) {
			m = '0' + m;
		};
		if (d < 10) {
			d = '0' + d;
		};
		return y + "-" + m + "-" + d;
	}
}

///判断手机号格式是否正确
function PhoneRegExp(tel) {
	if (reg_tel.test(tel)) {
		return true;
	} else {
		uni.showToast({
			icon: 'none',
			title: "手机号格式不正确",
			duration: 1500
		})
		return false;
	}
}
//获取日期时间
function getDateTimeStr(today, addDayCount) {
	var dd;
	if (today) {
		dd = new Date(today);
	} else {
		dd = new Date();
	}
	dd.setDate(dd.getDate() - addDayCount); //获取AddDayCount天以前的日期 
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期 
	var d = dd.getDate();
	var hour = dd.getHours()
	var minute = dd.getMinutes()
	if (m < 10) {
		m = '0' + m;
	};
	if (d < 10) {
		d = '0' + d;
	};
	return y + "-" + m + "-" + d + " " + hour + ":" + minute + ":00";
}

//传入二个经纬度返回距离
function getdistance(latitudef, longitudef, latitudet, longitudet) {
	latitudef = latitudef || 0;
	longitudef = longitudef || 0;
	latitudet = latitudet || 0;
	longitudet = longitudet || 0;
	if (latitudef != 0 && longitudef != 0 && latitudet != 0 && longitudet != 0) {
		var rad1 = latitudef * Math.PI / 180.0;
		var rad2 = latitudet * Math.PI / 180.0;
		var a = rad1 - rad2;
		var b = longitudef * Math.PI / 180.0 - longitudet * Math.PI / 180.0;

		var r = 6378137;
		return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(
			b / 2), 2)))
	} else {
		return 0;
	}
}


function redirectTo(e) { //跳转
	var url = e.currentTarget.dataset.url;
	if (url != undefined) {
		uni.redirectTo({
			url: url,
		})
	}
}

function navigateTo(e) { //跳转
	var url = e.currentTarget.dataset.url;
	if (url != undefined) {
		uni.navigateTo({
			url: url,
		})
	}
}

function PictureView(e, piclist) { //单张图片预览
	var that = this;
	var plist = [];
	var imgsrc = e.currentTarget.dataset.src;
	if (piclist == null) {
		plist[0] = imgsrc;
	} else {
		plist = piclist;
	}
	uni.previewImage({
		current: imgsrc,
		urls: plist
	})
}

function toHex(num) { //将一个数字转化成16进制字符串形式
	return num < 16 ? "0" + num.toString(16).toUpperCase() : num.toString(16).toUpperCase();
}

function getTimestamp() {
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	console.log("当前时间戳为：" + timestamp);
	return timestamp;
}

const isNull = str => {
	if (str == null || str == undefined || str == '') {
		return true;
	} else {
		return false;
	}
}

//获取传递的参数
function getParms(e, code) {
	if (code == "" || code == undefined) {
		return e['currentTarget']['dataset'];
	} else {
		return e['currentTarget']['dataset'][code];
	}

}
//获取radio的值
function getRadioValue(radioName) {
	var radioValue;
	radioValue = document.getElementsByName(radioName);
	if (radioValue != null) {
		var i;
		for (i = 0; i < radioValue.length; i++) {
			if (radioValue[i].checked) {
				return radioValue[i].value;
			}
		}
	}
	return null;
}


//表单验证
function formValidation(e) {
	var is_t = true;
	var array = e.currentTarget.dataset;
	var value = e.detail.value;
	var len = Object.keys(array).length
	if (len > 0) {
		for (var index in array) {
			if (value[index] == "" || value[index] == "未完善" || value[index] == "请选择") {
				var content = array[index];
				is_t = false;
				break;
			}
		}
	}
	if (!is_t) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: content
		})
	}
	if (is_t != false) {
		return value
	} else {
		return is_t;
	}
}


//自定义弹窗
function customPopup(content, url) {
	if (url == "" || url == undefined) {
		uni.showModal({
			title: '温馨提示',
			showCancel: false,
			content: content,
			confirmText: "我知道了",
			confirmColor: "#0058b0"
		})
	} else {
		uni.showModal({
			title: '温馨提示',
			showCancel: false,
			content: content,
			confirmText: "我知道了",
			confirmColor: "#0058b0",
			success: function() {
				uni.redirectTo({
					url: url,
				})
			}
		})
	}

}

/// 成功弹窗
function successPopup(info, url) {
	uni.showToast({
		title: info, //标题
		icon: 'success', //图标，支持"success"、"loading"
		duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
		mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
		success: function() {
			//console.log(url)
			if (url != undefined) {
				setTimeout(function() {
					uni.redirectTo({
						url: url,
					})
				}, 2000);
			}
		}, //接口调用成功的回调函数
		fail: function() {}, //接口调用失败的回调函数
		complete: function() {} //接口调用结束的回调函数
	})
}

// toast反馈
function showToast(content = '', duration = 1500, icon = 'none') {
	uni.showToast({
		title: content,
		icon: icon,
		mask: true,
		duration: duration
	})
}

// 弹窗反馈
function showModal(content = '', opts = {
	showCancel: true
}) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: opts.title || '提示',
			content: content,
			cancelText: (opts.cancelText || '取消').slice(0, 4),
			confirmText: (opts.confirmText || '确定').slice(0, 4),
			cancelColor: opts.cancelColor || '#999999',
			confirmColor: opts.confirmColor || '#F18700',
			showCancel: opts.showCancel !== false,
			success: res => {
				if (res.confirm) {
					resolve()
				} else if (res.cancel) {
					opts.handleCancel === true && reject()
				}
			}
		})
	})
}

// 数组拆封分
function chunk(array, size) {
	const length = array.length
	//判断不是数组，或者size没有设置，size小于1，就返回空数组
	if (!length || !size || size < 1) {
		return []
	}
	//核心部分
	let index = 0 //用来表示切割元素的范围start
	let resIndex = 0 //用来递增表示输出数组的下标

	//根据length和size算出输出数组的长度，并且创建它。
	let result = new Array(Math.ceil(length / size))
	//进行循环
	while (index < length) {
		//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
		result[resIndex++] = array.slice(index, (index += size))
	}
	//输出新数组
	return result
}

//登录验证码倒计时
function countDown(num) {
	let set = setInterval(res => {
		--num;
		console.log(num)
	}, 1000)
	setTimeout(()=> {
		clearInterval(set);
	},num * 1000)
}

module.exports = {
	PhoneRegExp: PhoneRegExp,
	isNull: isNull,
	formatTime: formatTime,
	Ghz: Ghz,
	Gshuffle: Gshuffle,
	Grandom: Grandom,
	getDateStr: getDateStr,
	getDateTimeStr: getDateTimeStr,
	getTimeStr: getTimeStr,
	getHourStr: getHourStr,
	getdistance: getdistance,
	redirectTo: redirectTo,
	navigateTo: navigateTo,
	PictureView: PictureView,
	toHex: toHex,
	getTimestamp: getTimestamp,
	getParms: getParms,
	getRadioValue: getRadioValue,
	formValidation: formValidation,
	customPopup: customPopup,
	getiImg: getiImg,
	successPopup: successPopup,
	getDateMonthLastStr: getDateMonthLastStr,
	showToast: showToast,
	showModal: showModal,
	chunk: chunk,
	countDown: countDown
}
