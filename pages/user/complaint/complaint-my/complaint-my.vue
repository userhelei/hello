<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的投诉</block>
		</cu-tabBar>
		
		<view class="appointment">
			<view class="appointment-list" v-for="(item,index) in appointmentList" :key="index">
				<view class="appointment-list-line">
					<view class="list-line-left">问题详情 :</view>
					<view class="list-line-right list-line-rights">
						{{item.complaintcontent}}
					</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left">投诉时间 :</view>
					<view class="list-line-right">{{item.createtime}}</view>
				</view>
				<view class="appointment-list-line mt-30">
					<view class="list-line-left">回 复 :</view>
					<view class="list-line-right list-line-rights" style="color: #FF3F3F;">
						{{item.reply_content == ''? '暂无回复':item.reply_content}}
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="appointmentList.length == 0" class="text-center mt-100">暂无投诉</view>
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
			//获取投诉列表
			getAppointment() {
				let that = this;
				let data = {
					user_id: uni.getStorageSync('uid'),	//	用户ID
				}
				reqdata.POST1('apicomplaintlist', data, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
							
					//网站返回状态判断
					if (redata.code == 1) {
						this.appointmentList = redata.data;
						this.appointmentList.map(res => {
							res.createtime = res.createtime.split(' ')[0]
						})
					}
				})
			}
		},
		onLoad() {
			this.getAppointment();
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
		align-items: center;
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
