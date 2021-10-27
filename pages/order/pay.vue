<template>
	<view>
		<view class="box">
			<view class="cost">
				<view class="title">
					<view class="left">
						基本费用
					</view>
					<view class="right">
						{{data.order.b_price}}元
					</view>
				</view>
			</view>
			
			<view class="cost">
				<view class="title">
					<view class="left">
						额外费用
					</view>
					<view class="right">
						{{data.order.o_price}}元
					</view>
				</view>
				<view class="item" v-for="(item,index) in data.offer" :key="index">
					<view class="name">
						费用名称：{{item.name}}
					</view>
					<view class="price">
						价格：{{item.price}}元
					</view>
					<view class="num">
						<!-- 数量：3个 -->
					</view>
				</view>
			</view>

			<view class="cost">
				<view class="total">
					<view class="left">
						合计
					</view>
					<view class="right">
						{{data.order.total_price}}元
					</view>
				</view>
			</view>
			
			<view class="submit">
				<button type="default" @tap="pay()">支付</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	var pay = require('../../utils/pay.js');
	export default {
		data() {
			return {
				user_info: '',
				data:[],
				id: 0,
			}
		},
		onLoad(options) {
			this.id = options.id ? options.id : 0;
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.initData();
			} else {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			//初始化订单详情
			initData(){
				this.request({
					url: interfaces.orderBill,
					data: {
						id: this.id,
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						//console.log(res);
						if (res.code == 200) {
							this.data=res.data;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				})
			},
			pay(){
				pay.pay(this.id);
			}
		}
	}
</script>

<style lang="scss">
	.box{
		padding: 0 10px;
		margin-bottom: 20px;
		.cost{
			padding: 10px 10px;
			box-shadow: 0 0 16px #ccc;
			margin-top: 10px;
			border-radius: 10px;
			.title{
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				line-height: 30px;
				.left{
					font-size: 16px;
				}
				.right{
					color: #257AFA;
				}
			}
			.item{
				display: flex;
				padding: 5px 0;
				flex-wrap: wrap;	
				.name{
					width: 100%;
				}
				.price{
					padding-right: 15px;
				}
			}
			.total{
				font-size: 16px;
				display: flex;
				justify-content: space-between;
				color: #E37700;
				line-height: 30px;
			}
		}
		.submit{
			margin-top: 20px;
			button{
				color: #fff;
				background-color: #159be4;
			}
		}
	}
	
	
</style>
