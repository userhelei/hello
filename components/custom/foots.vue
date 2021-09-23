<template>
	<view>
		<!-- 底部 -->
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar tabbar bg-white foot">
			<view class="action" @tap="redirectTo" id="0" data-url="/pages/engineer/home/home">
				<image :src="'../../static/tabbar/' + [pageCur == 0? 'home':'home_not'] + '.png'"></image>
				首页
			</view>
			<view class="action" @tap="redirectTo" id="1" data-url="/pages/engineer/my/my">
				<image :src="'../../static/tabbar/' + [pageCur == 1? 'my':'my_not'] + '.png'"></image>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	let util = require('@/utils/util.js');

	export default {
		data() {
			return {
			}
		},
		name: 'userFoot',
		props: ['pageCur'],
		methods: {
			//跳转
			redirectTo(e) {
				// this.pageCur = e.currentTarget.id;
				util.redirectTo(e);
			},

			//带返回跳转
			navigateTo(e) {
				// console.log(e.currentTarget.dataset.url)
				util.navigateTo(e);
			},
		},
		onReady(){
			this.pageCur = this.$props.pageCur;
			// console.log(this.$props.pageCur)
		},
		onReady() {
		}
	}
</script>

<style>
	.cu-bar.tabbar .action  {
		display: flex;
		flex-direction: column;
		color: #7F8389;
	}
	.action image {
		width: 35upx;
		height: 35upx;
		margin-bottom: 10upx;
	}
	
</style>
