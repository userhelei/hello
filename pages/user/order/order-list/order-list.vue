<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">工单列表</block>
		</cu-tabBar>
		
		<view class="appointment">
			<view class="appointment-list" v-for="(item,index) in orderList" :key="index" @tap.stop="toDetails(item.id)">
				<view class="appointment-list-line">
					<view class="list-line-left">产品名称:</view>
					<view class="list-line-right">{{item.productname}}</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left">问题详情:</view>
					<view class="list-line-right list-line-rights">
						{{item.questioncontent}}
					</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left">派单时间:</view>
					<view class="list-line-right">{{item.servicetime}}</view>
				</view>
				<view class="appointment-btn">
					<view class="appointment-btn-state" v-if="item.status==2">待回访</view>
					<view class="appointment-btn-state" v-if="item.status==3">已完成</view>
					<view v-show="item.show_up == 1" class="appointment-btn-details" @tap.stop="toFeedback(item)">我的反馈</view>
				</view>
			</view>
		</view>
		
		<view v-if="orderList.length == 0" class="text-center mt-100">暂无工单</view>
	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	
	export default {
		data() {
			return {
				orderList: []
			}
		},
		methods: {
			getOrderList() {
				let that = this;
				let data = {
					user_id: uni.getStorageSync('uid'),		//	用户ID
				}
				reqdata.POST1('apiworksheetlist', data, 1).then(()=> {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
						// console.log(redata.data);
					//网站返回状态判断
					if (redata.code == 1) {
						that.orderList = redata.data;
						// console.log(redata.data);
						that.orderList.map(res => {
							res.servicetime = res.servicetime.split(' ')[0]
						})
					}
				})
			},
			//我的反馈
			toFeedback(e) {
				uni.navigateTo({
					url: `/pages/user/feedback/home/home?id=${e.id}&content=${e.questioncontent}&ordercode=${e.ordercode}`
				})
			},
			// 跳转到工单详情页
			toDetails(id){
				uni.navigateTo({
					url: `/pages/user/order/order-details/order-details?id=${id}`
				})
			}
		},
		onShow() {
			this.getOrderList();
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
	}
	
	.appointment {
		padding: 18rpx 30rpx;
	}
	.appointment-list {
		background: #fff;
		width: 100%;
		border-radius: 16rpx;
		padding: 36rpx 30rpx;
		margin-bottom: 30rpx;
	}
	
	.appointment-list-line {
		display: flex;
		flex-direction: row;
	}
	.list-line-left {
		width: 23%;
		font-size: 30rpx;
		color: #868686;
		font-weight: 300;
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
	
	.appointment-btn {
		width: 100%;
		text-align: right;
		margin-top: 32rpx;
	}
	.appointment-btn-details {
		width: 184rpx;
		height: 60rpx;
		border-radius: 8rpx;
		border: 1rpx solid #A2A2A2;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #4E4E4E;
		margin-left: calc(100% - 184rpx);
		margin-top: 28rpx;
	}
	.appointment-btn-details:active {
		background: #f1f1f1;
	}
	.appointment-btn-state {
		color: #4697FF;
		font-size: 30rpx;
		font-weight: 500;
		margin-left: 24rpx;
	}

</style>
