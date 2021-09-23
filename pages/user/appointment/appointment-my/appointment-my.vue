<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的预约</block>
		</cu-tabBar>
		
		<view class="appointment">
			<view class="appointment-list" v-for="(item,index) in appointmentList" :key="index" @tap.stop="toDetails(item.id)">
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
					<view class="list-line-left">预约时间:</view>
					<view class="list-line-right">{{item.servicetime}}</view>
				</view>
				<view class="appointment-btn">
					<view class="appointment-btn-state" v-if="item.status==3">已接单</view>
					<view class="appointment-btn-state" v-else>{{item.status}}</view>
					<view class="appointment-btn-details" @tap.stop="toDetails(item.id)">详情</view>
				</view>
			</view>
		</view>
		
		<view v-if="appointmentList.length == 0" class="text-center mt-100">暂无预约</view>
	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	
	export default {
		data() {
			return {
				appointmentList: [],
				
			}
		},
		methods: {
			//预约列表接口
			getAppointment() {
				let that = this;
				let data = {
					user_id: uni.getStorageSync('uid')
				}
				reqdata.POST1('apiservicereservelist', data, 1).then(()=> {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
					// console.log(redata);
					//网站返回状态判断
					if (redata.code == 1) {
						that.appointmentList = redata.data;
						that.appointmentList.map(res => {
							res.servicetime = res.servicetime.split(' ')[0]
						})
					}
					
				})
			},
			//查看详情
			toDetails(e) {
				let id = e;
				uni.navigateTo({
					url: `/pages/user/appointment/appointment-details/appointment-details?id=${id}`
				})
			}
		},
		onLoad() {
			this.getAppointment()
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
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		width: 100%;
		margin-top: 24rpx;
	}
	.appointment-btn-details {
		width: 140rpx;
		height: 54rpx;
		border-radius: 8rpx;
		border: 1rpx solid #A2A2A2;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #4E4E4E;
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
