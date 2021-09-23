<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">首页</block>
		</cu-tabBar>
		
		<view class="home">
			<navigator url="/pages/engineer/order/home/home" class="dispatch" :style="{height: dispatchHeight}">
				<view class="dispatch-title">派单订单</view>
				<view class="dispatch-img">
					<image class="dispatch-img-left" src="../../../static/user/home/dispatch-right.png"></image>
					<image class="dispatch-img-right" src="../../../static/user/home/dispatch.png"></image>
				</view>
			</navigator>
			<navigator url="/pages/engineer/order/query/query" class="dispatch query" :style="{height: dispatchHeight}">
				<view class="dispatch-title">工单查询</view>
				<view class="dispatch-img">
					<image class="dispatch-img-left" src="../../../static/user/home/query-right.png"></image>
					<image class="dispatch-img-rights" src="../../../static/user/home/query.png"></image>
				</view>
			</navigator>
		</view>
		
		<!-- 公共底部 -->
		<user-foot :pageCur="0"></user-foot>
	</view>
</template>

<script>
	import userFoot from '../../../components/custom/foots.vue'
	
	export default {
		data() {
			return {
				dispatchHeight: '',
			}
		},
		methods: {
			
		},
		components:{
			'user-foot': userFoot
		},
		onLoad() {
			this.dispatchHeight = `${(this.screenWidth - 32) * 0.47}px`
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
	
	.home {
		border-top: 2rpx solid #E5E5E5;
		margin-top: 10rpx;
	}
	
	.dispatch {
		margin: 44rpx 32rpx 0 32rpx;
		background: linear-gradient(142deg, #5AA5FF 0%, #343CFE 100%);
		box-shadow: 0px 4rpx 8rpx 0px #4A77FF;
		border-radius: 16rpx;
		width: calc(100% - 64rpx);
		position: relative;
	}
	.dispatch-title {
		color: #fff;
		font-size: 44rpx;
		font-weight: 500;
		padding: 32rpx 38rpx;
	}
	.dispatch-img {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 54rpx 0 42rpx;
		position: absolute;
		bottom: 28rpx;
	}
	.dispatch-img-left {
		width: 56rpx;
		height: 56rpx;
	}
	.dispatch-img-right {
		width: 90rpx;
		height: 90rpx;
	}
	.dispatch-img-rights {
		width: 80rpx;
		height: 90rpx;
	}
		
	.query {
		background: linear-gradient(142deg, #FFC821 0%, #FFA703 100%);
		box-shadow: 0px 4rpx 8rpx 0px #FFAF0A;
	}

</style>
