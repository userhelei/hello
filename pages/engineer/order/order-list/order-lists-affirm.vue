<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">确认工单</block>
		</cu-tabBar>

		<view class="subscribe">
			<view class="subscribe-name subscribe-names">
				<view class="subscribe-left subscribe-lefts">工单编号:</view>
				<view class="">{{orderNum}}</view>
			</view>
			<view class="subscribe-name mt-20">
				<view class="subscribe-left">完成情况:</view>
				<textarea v-model="centent" class="subscribe-right subscribe-right-area"
					placeholder="请输入完成情况"></textarea>
			</view>
		</view>

		<!-- 图片上传 -->
		<view class="subscribe mt-30">
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
		</view>

		<view class="subscribe-btn" @tap="toSubmit" v-if="status">提交</view>
		<view class="subscribe-btn" v-else>正在提交</view>

	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');

	export default {
		data() {
			return {
				imgList: [],
				id: null,
				orderNum: null,
				centent: '', // 完成情况
				status: false, //预约按钮显示开关，避免重复点击
				imgCount: 4, // 图片数量
				imgLists: [], //拼接图片
			}
		},
		methods: {
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
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
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

							// console.log("index:", index, `>>>>>`, res.data.data.avatar);
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
									// console.log('接受单个：',data);
									// console.log("that.$data.imgLists", that.$data.imgLists)
									resolve(that.$data.imgLists)
								})
							}
						})
					} else {
						resolve('')
					}
				})

			},
			//提交
			async toSubmit() {
				let that = this;
				if (that.centent == '') {
					uni.showToast({
						title: "完成情况不能为空!",
						icon: "none"
					});
					return
				}
				// if(that.imgList.length == 0) {
				// 	uni.showToast({title:"请上传图片!", icon:"none"});
				// 	return
				// }
				if (that.imgList.length > 4) {
					uni.showToast({
						title: "最多上传4张照片!",
						icon: "none"
					});
					return
				}
				that.$data.status = false;
				let imgList = [];
				/* if (that.imgList.length != 0) {
					imgList = await that.getImgList()
				} */

				await that.getImgList().then((data) => {
					uni.showLoading({
						title: "提交中",
						mask: true
					})
					setTimeout(() => {
						//预约时间转换时间戳
						let date = `${that.date} ${that.time}`
						date = new Date(date).getTime() / 1000
						// return
						let datas = {
							id: that.id, //	工单ID
							ordercode: that.orderNum, //	工单编号
							complete_images: data, //	图片格式以英文逗号隔开
							complete_content: that.centent //	完成情况
						}

						// console.log("datas:", datas)
						// console.log('图片集合', datas.questionimages);
						reqdata.POST1('apisubmitgong', datas, 1).then(() => {
							// 网站返回数据赋值
							var redata = that.netWorkData.result[1];
							// console.log(redata);
							//网站返回状态判断
							if (redata.code == 1) {
								uni.hideLoading();
								uni.showToast({
									title: "提交成功!",
									icon: "none",
									success() {
										setTimeout(() => {
											uni.navigateBack();
										}, 1500)
									}
								});

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
		onLoad(options) {
			let that = this;
			that.$data.status = true;
			this.id = options.id;
			this.orderNum = options.orderNum;
		}

	}
</script>

<style>
	page {
		background: #F9F9F9;
	}

	.subscribe {
		margin: 16rpx 30rpx;
		background: #fff;
		padding: 30rpx 28rpx;
		border-radius: 16rpx;
	}

	.subscribe-name {
		display: flex;
		flex-direction: row;
	}

	.subscribe-names {
		padding-bottom: 24rpx;
		border-bottom: 1rpx solid #E5E5E5;
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

	.subscribe-btn {
		background: #4697FF;
		color: #fff;
		width: calc(100% - 76rpx);
		height: 88rpx;
		font-size: 30rpx;
		border-radius: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 30rpx;
		margin: 44rpx 38rpx 0 38rpx;
	}

	.subscribe-btn:active {
		background: rgba(70, 151, 255, 0.8);
	}
</style>
