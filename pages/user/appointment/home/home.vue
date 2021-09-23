<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">预约</block>
		</cu-tabBar>

		<view class="subscribe">
			<view class="subscribe-name">
				<view class="subscribe-left subscribe-lefts">产品名称:</view>
				<input class="subscribe-right" placeholder="请输入产品名称" v-model="name" />
			</view>
			<view class="subscribe-name">
				<view class="subscribe-left">问题详情:</view>
				<textarea class="subscribe-right subscribe-right-area" placeholder="请输入问题详情"
					v-model="details"></textarea>
			</view>
			<!-- 图片上传 -->
			<view class="subscribe-name">
				<view class="subscribe-left">图片上传:</view>
				<view class="grid col-4 grid-square flex-sub" style="width: 75%;">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

			<view class="subscribe-name">
				<view class="subscribe-left subscribe-lefts">预约时间:</view>
				<picker class="subscribe-right-picker" :mode="type" @change="getTime" :start="system">
					<view>{{date}} {{time}}</view>
				</picker>
			</view>
			<view class="subscribe-name">
				<view class="subscribe-left subscribe-lefts">联 系 人:</view>
				<input class="subscribe-right" placeholder="请输入联系人姓名" v-model="people" />
			</view>
			<view class="subscribe-name">
				<view class="subscribe-left subscribe-lefts">地 址:</view>
				<picker class="subscribe-right-picker" mode="region" @change="getRegion">
					<view>{{region}}</view>
				</picker>
			</view>
			<view class="subscribe-name">
				<view class="subscribe-left">详细地址:</view>
				<textarea class="subscribe-right subscribe-right-area" placeholder="请输入街道、小区、 楼栋号等详细地址"
					v-model="address"></textarea>
			</view>
			<view class="subscribe-btn" @tap="getSubscribe" v-if="status">预约</view>
			<view class="subscribe-btn" v-else>正在预约</view>
		</view>

		<!-- 公共底部 -->
		<user-foot :pageCur="1"></user-foot>
	</view>
</template>

<script>
	import userFoot from '../../../../components/custom/foot.vue'
	let reqdata = require('utils/datarequest');


	export default {
		data() {
			return {
				imgList: [],
				imgCount: 4, // 图片数量
				type: 'date', //预约时间组件类型
				time: '请选择时间',
				date: '请选择日期',
				system: '', //开始时间限制
				systemDate: '', //系统年月日
				systemTime: '', //系统时分
				region: '省/市/区', //省/市/区
				address: '', //详细地址
				people: '', //联系人姓名
				name: '', //产品名称
				details: '', //问题详情
				imgLists: [], //拼接图片
				status: false, //预约按钮显示开关，避免重复点击
			}
		},
		methods: {
			//查看图片
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			//从相册选择照片
			ChooseImage() {
				let that = this,
					imgCount = that.$data.imgCount;

				uni.chooseImage({
					count: imgCount, //默认9
					sizeType: ['compressed '], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (that.imgList.length != 0) {
							// 计算当前选中图片的数量控制图片的上传数量
							// that.$data.imgCount = that.imgList.length - imgCount;
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
					}
				});
			},
			//删除照片
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			//获取预约时间
			getTime(e) {
				
				let that = this;
				let value = e.detail.value;
				if (that.type == 'date') {
					that.type = 'time';
					that.date = value.replace(/-/g, '/');
					// console.log(that.date);
					if (value == that.systemDate) {
						that.system = that.systemTime;
					}
				} else if (that.type == 'time') {
					that.type = 'date';
					that.time = value;
					that.system = that.systemDate;
				}
			},
			// 省/市/区
			getRegion(e) {
				this.region = String(e.detail.value).replace(",", "/").replace(",", "/")
			},
			// 单张图片上传
			imgUpload(index, url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'https://www.bjhdsh.vip/index.php/api/index/upload', //接口地址
						filePath: url,
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (res) => {
							res.data = JSON.parse(res.data);
							resolve(res.data.data.avatar)
						}
					});

				})
			},
			//同步上传图片处理
			async getImgList() {
				let that = this;
				return new Promise((resolve, reject) => {
					if (that.imgList.length > 0 && that.imgList.length <= 4) {
						that.imgList.map((item, index, array) => {
							let thisIndex = 0
							if (thisIndex <= array.length) {
								that.imgUpload(index, item).then((data) => {
									that.$data.imgLists.push(data)
									resolve(that.$data.imgLists)
								})
							}
						})
					}else{
						resolve('')
					}
				})

			},
			//提交预约
			async getSubscribe() {
				let that = this;
				if (!that.name) {
					uni.showToast({
						title: "产品名称不能为空!",
						icon: "none"
					});
					return
				}
				if (!that.details) {
					uni.showToast({
						title: "问题详情不能为空!",
						icon: "none"
					});
					return
				}
				// console.log(that.imgList.length);
				// if(that.imgList.length == 0) {
				// 	uni.showToast({title:"请选择图片上传!", icon:"none"});
				// 	return
				// }
				if (that.imgList.length > 4) {
					uni.showToast({
						title: "图片最多上传4张!",
						icon: "none"
					});
					return
				}
				if (that.date == '请选择日期' || that.time == '请选择时间') {
					uni.showToast({
						title: "请选择完整的预约时间!",
						icon: "none"
					});
					return
				}
				if (!that.people) {
					uni.showToast({
						title: "联系人不能为空!",
						icon: "none"
					});
					return
				}
				if (that.region == '省/市/区') {
					uni.showToast({
						title: "请选择省/市/区!",
						icon: "none"
					});
					return
				}
				if (!that.details) {
					uni.showToast({
						title: "详细地址不能为空!",
						icon: "none"
					});
					return
				}


				that.$data.status = false;

				await that.getImgList().then((data) => {
					uni.showLoading({
						title:"提交中",
						mask:true
					})
					setTimeout(()=>{
						// console.log('全部:', data);
						// console.log("imgList:", that.$data.imgLists)
						//预约时间转换时间戳
						let date = `${that.date} ${that.time}`
						date = new Date(date).getTime() / 1000
						let datas = {
							user_id: uni.getStorageSync('uid'), //	用户ID
							username: that.people, //	用户名
							userphone: uni.getStorageSync('phone'), //	用户联系方式
							city: that.region, //	城市 譬如:上海/上海市/闵行区
							address: that.address, //	详情地址
							questionimages: data, //	问题图片集合
							servicetime: date, //	预约时间date
							productname: that.name, //	产品名称
							questioncontent: that.details //	问题详情
						}
						
						// console.log("datas:", datas)
						// console.log('图片集合', datas.questionimages);
						// return false;
						reqdata.POST1('apireserveData', datas, 1).then(() => {
							// 网站返回数据赋值
							var redata = that.netWorkData.result[1];
							// console.log(redata);
							//网站返回状态判断
							if (redata.code == 1) {
								uni.hideLoading();
								uni.showToast({
									title: "预约成功!",
									icon: "none",
									success() {
										setTimeout(() => {
											uni.reLaunch({
												url: '/pages/user/home/home'
											})
										}, 1500)
									}
								});
								// that.$data.status = true;
							} else {
								uni.hideLoading();
								uni.showToast({
									title: redata.msg,
									icon: "none"
								});
							}
						})
					}, 1500)
				})

			}
		},
		components: {
			'user-foot': userFoot
		},
		onLoad() {
			let that = this;
			that.$data.status = true;
			// 获取系统时间
			let date = new Date();
			let month = date.getMonth() + 1;
			if (month < 10) {
				month = `0${month}`
			}
			let day = date.getDate();
			if (day < 10) {
				day = `0${day}`
			}
			this.systemDate = `${date.getFullYear()}-${month}/${day}`; //系统年月日
			this.system = this.systemDate;
			let systemTime = String(date).split(' ')[4]; //系统时分秒
			this.systemTime = systemTime.replace("-", ":").replace("-", ":")
			// console.log(this.systemDate);
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.subscribe {
		padding: 0 30rpx;
		border-top: 1rpx solid #E5E5E5;
		margin-top: 10rpx;
	}

	.subscribe-name {
		display: flex;
		flex-direction: row;
		margin-top: 24rpx;
	}

	.subscribe-left {
		width: 22%;
		font-size: 30rpx;
		font-weight: 300;
		color: #2C2C2C;
	}

	.subscribe-lefts {
		display: flex;
		align-items: center;
	}

	.subscribe-right {
		width: 75%;
		border: 1rpx solid #A2A2A2;
		border-radius: 8rpx;
		padding: 0 18rpx;
		font-size: 28rpx;
	}

	input {
		height: 60rpx;
	}

	.subscribe-right-area {
		padding: 10rpx 18rpx;
		height: 200rpx;
	}

	.subscribe-right-picker {
		width: 70%;
		border: 1rpx solid #A2A2A2;
		border-radius: 8rpx;
		padding: 0 18rpx;
		font-size: 28rpx;
		color: #AAAAAA;
		height: 58rpx;
		display: flex;
		align-items: center;
	}

	.subscribe-btn {
		background: #4697FF;
		color: #fff;
		width: 100%;
		height: 88rpx;
		font-size: 30rpx;
		border-radius: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 44rpx;
	}

	.subscribe-btn:active {
		background: rgba(70, 151, 255, 0.8);
	}
</style>
