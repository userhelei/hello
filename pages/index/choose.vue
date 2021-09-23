<template>
	<view>
		<!-- 顶部状态条 --> ==
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-tabBar>


		<view class="home flex justify-around align-center">
			<view class="dispatch" @tap="toLogin()">
				<view class="flex justify-center align-center">
					<image src="../../static/repair.png"></image>
				</view>
				<view class="dispatch-title">华椴机床售后</view>
			</view>
			<view class="dispatch"  @tap="toMall()">
				<view class="flex justify-center align-center">
					<image src="../../static/mall.png"></image>
				</view>
				<view class="dispatch-title">华椴机床商城</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// dispatchHeight:'100rpx'
			}
		},
		methods: {
			toMall() { 
				uni.navigateToMiniProgram({
					appId: 'wxea41a4060ad780db',
					path: '',
					success(res) {
						console.log('------:',res);
					}
				})
			},
			toLogin(){
				let that = this;
				let type = uni.getStorageSync('type')
				if(!type){
					uni.navigateTo({
						url:'/pages/index/index'
					})
					return;
				}
				// 判断是否登入过
				if(uni.getStorageSync('loginTime') == ''){
					uni.setStorageSync('loginTime', Date.parse(new Date()));
				}
				// 登入的时间
				var loginTime = uni.getStorageSync('loginTime')
				// console.log(loginTime);
				
				// 当前时间
				var nowTime = Date.parse(new Date());
				// console.log(nowTime);
				// 时间差（当前时间-登入的时间）
				var dateDiff = nowTime - loginTime;
				// console.log(dateDiff);
				// 时间戳转为天数
				var day = Math.floor(dateDiff / 1000 / 3600 / 24);
				// console.log(day);
				// 判断登入时间是否超过10天
				if (day < 10) {
					if (type == 'user') {
						uni.navigateTo({
							url: '/pages/user/home/home'
						})
					} else if (type == 'engineer') {
						uni.navigateTo({
							url: '/pages/engineer/home/home'
						})
					}
				} else {
					// 移除缓存中的用户对象
					uni.removeStorageSync('type');
					uni.removeStorageSync('loginTime');
					uni.navigateTo({
						url:'/pages/index/index'
					})
					uni.showToast({
						title: '登入失效',
						icon:'none',
						duration: 2000
					});
				}
				
			}
		}
	}
</script>

<style>
	
	/* page {
		background: #fff;
	} */
	.home{
		margin-top:300rpx;
	}
	.dispatch{
		width: 328rpx;
		height: 244rpx;
		background: #FFFFFF;
		border-radius: 10px;
		background-color: #FFFFFF;
		padding-top:35rpx;
		box-sizing: border-box;
	}
	.dispatch image{
		width: 136rpx;
		height: 136rpx;
	}
	.dispatch-title{
		text-align: center;
	}
</style>
