<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">工单查询</block>
		</cu-tabBar>
		
		<!-- 搜索框 -->
		<view class="pd-lr-30 mp100 sticky" :style="`top: `+ CustomBar +`px;`">
			<view class="query_img " >
				<image class="query_imgs" src="../../../../static/engineer/query.png"></image>
				<input class="query_input" placeholder="搜索工单编号" v-model="query"/>
				<view class="query_search" @tap="toSearch">搜索</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="appointment">
			<view class="appointment-list" v-for="(item,index) in appointmentList" :key="index" @tap.stop="toDetails(item.status,item.id)">
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
					<view class="list-line-right">{{item.status == '已派单'? item.allocatetime:item.completetime}}</view>
				</view>
				<view class="appointment-btn">
					<view class="appointment-btn-state">{{item.status}}</view>
				</view>
			</view>
			
			<view v-if="appointmentList.length == 0" class="text-center mt-100">{{content}}</view>
		</view>
	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				query: '',
				appointmentList: [],
				content: ''
			}
		},
		methods: {
			//搜索
			toSearch() {
				let that = this;
				that.appointmentList = [];
				let data = {
					seachword: that.query,	//	搜索内容
					user_id: uni.getStorageSync('uid')	//	工程师
				}
				reqdata.POST1('apiselectgong', data, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
							
					//网站返回状态判断
					if (redata.code == 1) {
						let appointmentList = redata.data
						// console.log(appointmentList);
						appointmentList.map(res => {
							if(res.allocatetime == undefined) {
								res.completetime = res.completetime.split(' ')[0]
							}else if(res.completetime == undefined) {
								res.allocatetime = res.allocatetime.split(' ')[0]
							}
						})
						that.appointmentList = appointmentList;
					}
					else {
						that.content = '暂无相关工单'
					}
				})
			},
			// 查看详情 
			toDetails(status,id) {
				if(status == '待回访'){
					uni.navigateTo({
						url: `/pages/engineer/order/order-list/order-list-details?status=2&id=${id}`
					})
				}else if(status == '已完成'){
					uni.navigateTo({
						url: `/pages/engineer/order/order-list/order-list-details?status=3&id=${id}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/engineer/order/order-details/order-details?status=1&id=${id}`
					})
				}
				// console.log(e)
				// uni.navigateTo({
				// 	url: `/pages/engineer/order/order-details/order-details?id=${id}`
				// })
			}
		},
		
		onLoad(){
			this.toSearch();
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
	}
	
	.query_img {
		display: flex;
		flex-direction: row;
		align-items: center;
		width:100%;
		height: 76rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		border: 2rpx solid #E1E1E1;
		padding: 0 28rpx;
		margin-bottom: 20rpx;
	}
	.query_imgs {
		width: 28rpx;
		height: 28rpx;
		margin-right: 30rpx;
	}
	.query_search {
		position: absolute;
		right: 56rpx;
		border-left: 2rpx solid #E1E1E1;
		padding-left: 28rpx;
		color: #4697FF;
	}
	.query_search:active {
		background: #eeeeee;
	}
	
	.appointment {
		padding: 0 30rpx;
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
