<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">首页</block>
		</cu-tabBar>

		<view class="home">
			<navigator url="/pages/user/appointment/home/home" class="dispatch" :style="{height: dispatchHeight}">
				<view class="dispatch-title">预约</view>
				<view class="dispatch-img">
					<image class="dispatch-img-left" src="../../../static/user/home/dispatch-right.png"></image>
					<image class="dispatch-img-right" src="../../../static/user/home/dispatch.png"></image>
				</view>
			</navigator>
			<view class="home-right">
				<navigator url="/pages/user/order/order-list/order-list" class="query" :style="{height: queryHeight}">
					<view class="query-title">工单</view>
					<view class="query-img">
						<image class="query-img-left" src="../../../static/user/home/query-right.png"></image>
						<image class="query-img-right" src="../../../static/user/home/query.png"></image>
					</view>
				</navigator>
				<navigator url="/pages/user/complaint/home/home" class="query complaint" :style="{height: queryHeight}">
					<view class="query-title">投诉</view>
					<view class="query-img">
						<image class="query-img-left" src="../../../static/user/home/complain-right.png"></image>
						<image class="query-img-rights" src="../../../static/user/home/complain.png"></image>
					</view>
				</navigator>
			</view>
		</view>
		
		<!-- 公共底部 -->
		<user-foot :pageCur="0"></user-foot>
	</view>
</template>

<script>
	import userFoot from '../../../components/custom/foot.vue'

	export default {
		data() {
			return {
				dispatchHeight: '',
				queryHeight: ''
			}
		},
		methods: {
			
		},
		components: {
			'user-foot': userFoot
		},
		onLoad() {
			this.dispatchHeight = `${(this.screenWidth - 30) * 0.48 * 1.55}px`;
			this.queryHeight = `${(this.screenWidth - 30) * 0.48 * 0.73}px`
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
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		padding-top: 36rpx;
		color: #fff;
	}
	
	.dispatch {
		width: 48%;
		background: linear-gradient(142deg, #5AA5FF 0%, #343CFE 100%);
		box-shadow: 0px 4rpx 8rpx 0px #4A77FF;
		border-radius: 16rpx;
		position: relative;
	}
	.dispatch-title {
		font-size: 44rpx;
		padding: 32rpx 38rpx;
	}
	.dispatch-img {
		width: 100%;
		position: absolute;
		bottom: 34rpx;
		padding: 0 40rpx 0 34rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.dispatch-img-left {
		width: 56rpx;
		height: 56rpx;
	}
	.dispatch-img-right {
		width: 90rpx;
		height: 90rpx;
	}
	.home-right {
		width: 48%;
	}
	.query {
		width: 100%;
		background: linear-gradient(136deg, #FFC820 0%, #FFA300 100%);
		box-shadow: 0px 4rpx 8rpx 0px #FAB70B;
		border-radius: 16rpx;
		position: relative;
	}
	.query-title {
		font-size: 36rpx;
		padding: 42rpx 28rpx;
	}
	.query-img {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32rpx 0 36rpx;
		position: absolute;
		bottom: 24rpx;
	}
	.query-img-left {
		width: 42rpx;
		height: 42rpx;
	}
	.query-img-right {
		width: 58rpx;
		height: 68rpx;
	}
	.query-img-rights {
		width: 68rpx;
		height: 56rpx;
	}
	.complaint {
		background: linear-gradient(135deg, #00FFFA 0%, #00CACE 100%);
		box-shadow: 0px 4rpx 8rpx 0px #00CDD1;
		border-radius: 16rpx;
		margin-top: 30rpx;
	}
		
</style>
