<template>
	<view>
		<!-- 顶部状态条 -->
		<cu-tabBar class="c-black" bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的反馈</block>
		</cu-tabBar>
		
		<view class="feedback">
			<view class="feedback-number feedback-numbers">
				<view class="feedback-number-left">预约单号 :</view>
				<view class="feedback-number-right">{{ordercode}}</view>
			</view>
			<view class="feedback-number">
				<view class="feedback-number-left">问题详情 :</view>
				<view class="feedback-number-right">
					{{content}}
				</view>
			</view>
			<view class="feedback-state">
				<view @tap="getState" class="feedback-states"><view class="feedback-state-not"><view :class="states == 1 ? 'feedback-state-nots':''"></view></view>已解决</view>
				<view @tap="getState" class="feedback-states"><view class="feedback-state-not"><view :class="states == 2? 'feedback-state-nots':''"></view></view>未解决</view>
			</view>
		</view>
		<view class="feedback-line"></view>
		<!-- 已解决 -->
		<block v-if="states == 1">
			<view class="feedback-number pl-30">
				<view class="feedback-number-left">满 意 度 :</view>
				<view class="feedback-number-right">
					<block v-for="(item,index) in 5" :key="idnex">
						<image @tap="getStar(index)" v-show="index < star" class="satisfact-imgs" src="../../../../static/user/feedback/satisfacts.png"></image>
						<image @tap="getStar(index)" v-show="index >= star" class="satisfact-imgs" src="../../../../static/user/feedback/satisfact.png"></image>
					</block>
				</view>
			</view>
			<view class="feedback-line"></view>
			<view class="feedback-number pl-30">
				<view class="feedback-number-left">评价内容 :</view>
				<textarea class="feedback-number-right feedback-number-area" placeholder="请评价" v-model="evaluate"></textarea>
			</view>
			<view class="submit" @tap="toSubmit" v-if="status">提交</view>
			<view class="submit" v-else>正在提交</view>
		</block>
		<!-- 未解决 -->
		<block v-if="states == 2">
			<picker :mode="date" @change="TimeChange" :start="system">
				<view class="subscribe">
					<view class="subscribe-title">再预约时间 : {{time + ' ' + times}}</view>
					<image data-target="bottomModal" class="subscribe-img" src="../../../../static/user/feedback/date.png"></image>
				</view>
			</picker>
			<view class="feedback-line"></view>
			<view class="submit" @tap="toSubmit" v-if="status">提交</view>
			<view class="submit" v-else>正在提交</view>
		</block>
	</view>
</template>

<script>
	let reqdata = require('utils/datarequest');
	
	export default {
		data() {
			return {
				states: 1,
				modalName: 'bottomModal',
				date: 'date',
				time: '请选择日期',
				times: '请选择时间',
				ordercode: '',
				content: '',
				id: '',
				evaluate: '',
				star: 0,
				system: ''  ,//时间选择限制开始时间
				systemDate: '',  //系统年月日
				systemTime: ''   ,//系统时分
				status:false
			}
		},
		methods: {
			//打开模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			//关闭模态框
			hideModal(e) {
				this.modalName = null
			},
			//选择解决未解决状态
			getState() {
				let that = this;
				if(that.states == 1) {
					that.states = 2
				}
				else if(that.states == 2) {
					that.states = 1
				}
			},
			//获取星数
			getStar(e) {
				this.star = e + 1;
			},
			//预约时间
			TimeChange(e) {
				let that = this;
				let value = e.detail.value;
				if(that.date == 'date') {
					that.time = value.replace(/-/g, '/');
					// console.log(that.time);
					that.date = 'time';
					if(value == that.systemDate) {
						that.system = that.systemTime;
					}
				}else if(that.date == 'time'){
					that.times = value;
					that.date = 'date';
					that.system = that.systemDate;
				}
			},
			//提交
			async toSubmit() {
				let that = this;
				let datas;
				if(that.states == 1) {
					if(that.star == 0) {
						uni.showToast({title:"请选择满意度!", icon:"none"});
						return
					}
					if(that.evaluate == '') {
						uni.showToast({title:"评价内容不能为空!", icon:"none"});
						return
					}
					datas = {
						type: 1,	//	1=评价 2=再次预约
						user_id: uni.getStorageSync('uid'),	//	用户ID
						evaluatedetail: that.evaluate,	//	评价内容
						Satisfaction: that.star,//	星级
						servicetime: '',//再次预约时间
						ser_id: that.id
					}
				}
				else if(that.states == 2) {
					if(that.time == '请选择日期' || that.times == '请选择时间') {
						uni.showToast({title:"请选择完整的预约时间!", icon:"none"});
						return
					}
					//预约时间转换时间戳
					let date = `${that.time} ${that.times}`
					date = new Date(date).getTime() / 1000
					
					datas = {
						type: 2,	//	1=评价 2=再次预约
						user_id: uni.getStorageSync('uid'),	//	用户ID
						evaluatedetail: '',	//	评价内容
						Satisfaction: '',//	星级
						servicetime: date,//再次预约时间
						ser_id: that.id
					}
				}
				that.$data.status = false;
				reqdata.POST1('apifeedback', datas, 1).then(() => {
					// 网站返回数据赋值
					var redata = that.netWorkData.result[1];
					// console.log(redata+'1');
							
					//网站返回状态判断
					if (redata.code == 1) {
						uni.showToast({title:"提交成功!", icon:"none"});
						setTimeout(()=>{
							// uni.redirectTo({
							// 	url: `/pages/user/order/order-list/order-list`
							// })
							uni.navigateBack();
						},1500)
					}
				})
			}
		},
		onLoad(options) {
			var that = this;
			that.$data.status = true;
			this.ordercode = options.ordercode;
			this.content = options.content;
			this.id = options.id;
			
			
			// 获取系统时间
			let date = new Date();
			let month = date.getMonth() + 1;
			if(month < 10) {
				month = `0${month}`
			}
			let day = date.getDate();
			if(day < 10) {
				day = `0${day}`
			}
			this.systemDate = `${date.getFullYear()}-${month}-${day}`;  //系统年月日
			this.system = this.systemDate;
			let systemTime = String(date).split(' ')[4];    //系统时分秒
			this.systemTime = systemTime.replace("-",":").replace("-",":")
			// console.log(this.systemDate,this.systemTime)
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
	
	.feedback {
		padding: 0 30rpx;
		border-top: 1rpx solid #E5E5E5;
	}
	.feedback-number {
		font-size: 30rpx;
		color: #2C2C2C;
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		font-weight: 300;
		color: #2C2C2C;
	}
	.feedback-numbers {
		padding: 26rpx 0 38rpx 0;
	}
	.feedback-number-left {
		width: 23%;
	}
	.feedback-number-right {
		width: 77%;
	}
	
	.feedback-state {
		display: flex;
		flex-direction: row;
		margin-top: 146rpx;
		font-size: 30rpx;
		color: #717171;
	}
	.feedback-states {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 116rpx;
	}
	.feedback-state-yes {
		width: 34rpx;
		height: 34rpx;
		border-radius: 34rpx;
		border: 2rpx solid #979797;
		margin-right: 20rpx;
	}
	.feedback-state-not {
		width: 34rpx;
		height: 34rpx;
		border-radius: 34rpx;
		border: 2rpx solid #979797;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}
	.feedback-state-nots {
		width: 22rpx;
		height: 22rpx;
		background: #56A0FF;
		border-radius: 22rpx;
	}
	.feedback-line {
		width: 100%;
		height: 20rpx;
		background: #F9F9F9;
		margin: 36rpx 0;
	}
	.satisfact-imgs {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	
	.feedback-number-area {
		border: 1rpx solid #A2A2A2;
		border-radius: 8px;
		padding: 10rpx 18rpx;
		width: 73%;
	}
	
	.subscribe {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		font-weight: 400;
	}
	.subscribe-img {
		width: 44rpx;
		height: 44rpx;
	}
	
	.submit {
		width: calc(100% - 60rpx);
		height: 88rpx;
		background: #4697FF;
		border-radius: 58rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 30rpx;
		position: fixed;
		bottom: 22rpx;
	}
	.submit:active {
		background: rgba(70, 151, 255, 0.8);
	}
	
	
	
</style>
