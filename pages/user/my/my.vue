<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">个人中心</block>
		</cu-tabBar>

		<view class="personal">
			<view class="personal-top">
				<image class="personal-top-img" :src="avatarUrl"></image>
				<view class="personal-top-name">{{nickName}}</view>
			</view>
			<navigator url="../appointment/appointment-my/appointment-my" class="subscribe">
				<view class="subscribe-left">
					<image src="../../../static/user/my/time.png" class="subscribe-left-img"></image>
					<text>我的预约</text>
				</view>
				<view class="subscribe-right">＞</view>
			</navigator>
			<navigator url="/pages/user/complaint/complaint-my/complaint-my" class="subscribe">
				<view class="subscribe-left">
					<image src="../../../static/user/my/complaint.png" class="subscribe-left-img"></image>
					<text>我的投诉</text>
				</view>
				<view class="subscribe-right">＞</view>
			</navigator>
		</view>
		
		<!-- 公共底部 -->
		<user-foot :pageCur="2"></user-foot>
	</view>
</template>

<script>
	import userFoot from '../../../components/custom/foot.vue'

	export default {
		data() {
			return {
				avatarUrl: '../../../static/user/my/img.png',
				nickName: '',
				dataOne: '',
			}
		},
		methods: {
			
		},
		components: {
			'user-foot': userFoot
		},
		onLoad() {
			this.avatarUrl = uni.getStorageSync('avatarUrl')
			this.nickName = uni.getStorageSync('nickName')
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
	}

	.personal {
		/* margin-top: 10rpx; */
	}

	.personal-top {
		background: #4697FF;
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.personal-top-img {
		width: 118rpx;
		height: 118rpx;
		margin-top: 66rpx;
		border-radius: 118rpx;
	}

	.personal-top-name {
		color: #fff;
		margin-top: 22rpx;
		font-size: 30rpx;
		font-weight: 500;
	}

	.subscribe {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 30rpx 0 30rpx;
		background: #fff;
		height: 120rpx;
		border-radius: 16rpx;
		padding: 0 34rpx 0 26rpx;
	}

	.subscribe-left {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #353535;
	}

	.subscribe-left-img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 40rpx;
	}

	.subscribe-right {
		color: #8C8C8C;
	}
</style>
