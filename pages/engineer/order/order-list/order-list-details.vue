<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">工单详情</block>
		</cu-tabBar>
		
		<view class="details">
			<view class="product">
				<view class="appointment-list-line">
					<view class="list-line-left"><text>工单编号</text><text>:</text></view>
					<view class="list-line-right">{{details.ordercode}}</view>
				</view>
				<view class="appointment-list-lines pd-tb-30">
					<view class="list-line-left"><text>完成情况</text><text>:</text></view>
					<view class="list-line-right list-line-rights">
						{{details.complete_content}}
					</view>
				</view>
			</view>
			<view class="product">
				<view class="appointment-list-lines">
					<view class="list-line-left"><text>图</text><text>片:</text></view>
					<view class="list-line-right product-img" v-if="details.complete_images.length!=0">
						<view class="product-bg" v-for="(item,index) in details.complete_images" :key="index" @tap="ViewImage" :data-url="details.complete_images[index]">
							<image mode="aspectFill" class="product-imgs" :style="{height: productImg}"
							:src="item"></image>
						</view>
					</view>
					<view class="list-line-right product-img" v-else>
						没有提供图片
					</view>
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
				status: null,
				id: null,
				details: '',
				imgurl: app.globalData.imgurl
			}
		},
		methods: {
			//查看图片
			ViewImage(e) {
				let that = this;
				uni.previewImage({
					urls: that.details.complete_images,
					current: e.currentTarget.dataset.url
				});
			},
			getDetails() {
				let that = this;
				let datas = {
					status: that.status,	//工单状态 1:已派单 2:已完成
					id: that.id	//预约Id
				}
				reqdata.POST1('apiengineerdetail', datas, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
							
					//网站返回状态判断
					if (redata.code == 1) {
						that.details = redata.data;
						let complete_images = [];
						// console.log(that.details.complete_images);
						if(that.details.complete_images != ''){
							that.details.complete_images.map(res => {
								complete_images.push(that.imgurl + res)
							})
						}
						// console.log(complete_images);
						that.details.complete_images = complete_images
					}
				})
			}
		},
		onLoad(options) {
			this.productImg = `${(this.screenWidth - 30 - 28) * 0.77 * 0.5 * 0.8}px`;
			
			this.status = options.status;
			this.id = options.id;
			this.getDetails();
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
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
		background: #eee;
	}

</style>
