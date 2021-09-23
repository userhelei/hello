<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">预约详情</block>
		</cu-tabBar>

		<view class="details">
			<view class="product">
				<view class="appointment-list-line">
					<view class="list-line-left"><text>产品名称</text><text>:</text></view>
					<view class="list-line-right">{{detailsData.productname}}</view>
				</view>
				<view class="appointment-list-lines pd-tb-30">
					<view class="list-line-left"><text>问题详情</text><text>:</text></view>
					<view class="list-line-right list-line-rights">
						{{detailsData.questioncontent}}
					</view>
				</view>
			</view>
			<view class="product">
				<view class="appointment-list-lines">
					<view class="list-line-left"><text>图</text><text>片:</text></view>
					<view class="list-line-right product-img" v-if="detailsData.questionimages.length!=0">
						<view class="product-bg" v-for="(qitem,qindex) in detailsData.questionimages" :key="qindex"
							@tap="ViewImage" :data-url="detailsData.questionimages[qindex]">
							<image mode="aspectFill" class="product-imgs" :style="{height: productImg}" :src="qitem">
							</image>
						</view>
					</view>
					<view class="list-line-right product-img" v-else>
						没有提供图片
					</view>
				</view>
			</view>

			<view class="product">
				<view class="appointment-list-line">
					<view class="list-line-left"><text>预约时间</text><text>:</text></view>
					<view class="list-line-right" v-if="detailsData.servicetime">{{subTime(detailsData.servicetime)}}</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left"><text>联 系 人</text><text>:</text></view>
					<view class="list-line-right">{{detailsData.username}}</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left"><text>联系方式</text><text>:</text></view>
					<view class="list-line-right">{{detailsData.userphone}}</view>
				</view>
				<view class="appointment-list-lines pd-tb-30">
					<view class="list-line-left"><text>地</text><text>址:</text></view>
					<view class="list-line-right">{{detailsData.city}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	let app = getApp()

	export default {
		data() {
			return {
				productImg: '200rpx',
				id: null,
				detailsData: '',
				imgurl: app.globalData.imgurl
			}
		},
		methods: {
			//查看图片
			ViewImage(e) {
				let that = this;
				uni.previewImage({
					urls: that.detailsData.questionimages,
					current: e.currentTarget.dataset.url
				});
			},
			//预约详情
			getDetails() {
				let that = this;
				let datas = {
					user_id: uni.getStorageSync('uid'),
					id: that.id
				}
				reqdata.POST1('apiservicereservedetail', datas, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
					// console.log(redata)
					//网站返回状态判断
					if (redata.code == 1) {
						that.detailsData = redata.data;
						let questionimages = [];
						// console.log(that.detailsData.questionimages);
						if(that.detailsData.questionimages != ''){
							that.detailsData.questionimages.map(res => {
								questionimages.push(that.imgurl + res)
							})
						}
						that.detailsData.questionimages = questionimages
					}
				})
			}
		},
		onLoad(option) {
			this.productImg = `${(this.screenWidth - 30 - 28) * 0.77 * 0.5 * 0.8}px`;

			this.id = option.id;
			this.getDetails();
		},
		// 计算属性
		computed: {
			// 改变时间格式
			subTime() {
				return function(time){
					var newTime = time.substring(0,4)+'年'+time.substring(5,7)+'月'+time.substring(8,10)+'日'
					return newTime
				}
			}
		}
	}
</script>

<style>
	page {
		/* background: #F9F9F9; */
	}

	.details {
		padding: 18rpx 30rpx;
	}

	.product {
		background: #fff;
		padding: 30rpx 28rpx 0 28rpx;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
	}

	.appointment-list-line {
		display: flex;
		flex-direction: row;
		padding-bottom: 24rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.appointment-list-lines {
		display: flex;
		flex-direction: row;
	}

	.list-line-left {
		width: 23%;
		font-size: 30rpx;
		color: #868686;
		font-weight: 300;
		display: flex;
		justify-content: space-between;
		padding-right: 15rpx;
	}

	.list-line-right {
		width: 77%;
		color: #2C2C2C;
		font-weight: 300;
	}

	.list-line-rights {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	.product-img {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.product-bg {
		width: 50%;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}

	.product-imgs {
		width: 80%;
		background: #999;
	}
</style>
