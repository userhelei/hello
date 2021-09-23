<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">投诉</block>
		</cu-tabBar>
		
		<view class="complaint">
			<view>问题详情:</view>
			<textarea v-model="problem" class="complaint-area" placeholder="请输入问题详情～" maxlength="150"></textarea>
			<view class="complaint-btn" @tap="toProblem">提交</view>
		</view>
	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	
	export default {
		data() {
			return {
				problem: ''
			}
		},
		methods: {
			//提交
			toProblem() {
				let that = this;
				if(that.problem == '') {
					uni.showToast({title:"请输入问题详情!", icon:"none"});
					return
				}
				let datas = {
					user_id: uni.getStorageSync('uid'),	//	用户ID
					complaintcontent: that.problem	//	投诉内容
				}
				reqdata.POST1('apicomplaintcontent', datas, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
							
					//网站返回状态判断
					if (redata.code == 1) {
						uni.showToast({title:"提交成功!", icon:"none"});
						setTimeout(()=>{
							uni.redirectTo({
								url: `/pages/user/home/home`
							})
						},1500)
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
	}
	
	.complaint {
		border-top: 1rpx solid #E5E5E5;
		background: #fff;
		padding: 56rpx 30rpx 50rpx 30rpx;
	}
	.complaint-area {
		margin-top: 28rpx;
		font-size: 28rpx;
	}
	.complaint-btn {
		width: 100%;
		height: 88rpx;
		background: #4697FF;
		border-radius: 58rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.complaint-btn:active {
		background: rgba(70, 151, 255, 0.8);
	}
	

</style>
