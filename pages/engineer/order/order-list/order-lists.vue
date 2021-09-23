<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">未完成</block>
		</cu-tabBar>
		
		<view class="appointment">
			<view class="appointment-list" v-for="(item,index) in appointmentList" :key="index" @tap.stop="toDetails(item.id)">
				<view class="appointment-list-line">
					<view class="list-line-left">工单编号:</view>
					<view class="list-line-right">{{item.ordercode}}</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left">问题详情:</view>
					<view class="list-line-right list-line-rights">
						{{item.questioncontent}}
					</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left">派单时间:</view>
					<view class="list-line-right">{{item.allocatetime}}</view>
				</view>
				<view class="appointment-btn-details" @tap.stop="toConfirm(item.id,item.ordercode)">确认工单</view>
			</view>
		</view>
		
		<view v-if="appointmentList.length == 0" class="text-center mt-100">暂无未完成工单</view>
	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	
	export default {
		data() {
			return {
				appointmentList: []
			}
		},
		methods: {
			//获取接单列表
			getAppointmentList() {
				let that = this;
				let data = {
					user_id: uni.getStorageSync('uid'),	//	用户Id
					status: 1  //	工单状态 0:预约中 1:已派单 2:已完成
				}
				reqdata.POST1('apiengineerlist', data, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
							
					//网站返回状态判断
					if (redata.code == 1) {
						that.appointmentList = redata.data;
						that.appointmentList.map(res => {
							res.allocatetime = res.allocatetime.split(' ')[0]
						})
					}
				})
			},
			//查看详情
			toConfirm(e,num) {
				let id = e;
				let orderNum = num;
				uni.navigateTo({
					url: `/pages/engineer/order/order-list/order-lists-affirm?id=${id}&orderNum=${orderNum}`
				})
			},
			toDetails(e) {
				let id = e;
				// console.log(e)
				uni.navigateTo({
					url: `/pages/engineer/order/order-details/order-details?status=1&id=${id}`
				})
			}
		},
		onShow() {
			this.getAppointmentList()
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
		width: 166rpx;
		height: 60rpx;
		border-radius: 8rpx;
		border: 1rpx solid #4697FF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #4697FF;
		margin-left: calc(100% - 166rpx);
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
