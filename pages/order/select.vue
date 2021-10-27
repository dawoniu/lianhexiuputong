<template>
	<view>
		
		<view class="main">
			<view class="item">
				<view class="icon"><image src="../../static/images/address_people.png" mode="widthFix"></image></view>
				<view class="info">{{address.linkman}} | {{address.mobile}}</view>
				<view class="entry">></view>
			</view>
			<view class="item address">
				<view class="icon"><image src="../../static/images/address_position.png" mode="widthFix"></image></view>
				<view class="info">师傅将到 {{address.position_address}} 帮助您</view>
			</view>
			<view class="item" @tap="goCateg">
				<view class="icon"><image src="../../static/images/categ.png" mode="widthFix"></image></view>
				<view class="info">{{categ_name}}</view>
				<view class="entry">></view>
			</view>
		</view>
		
		<view class="order" @tap="selectType(1)">
			<view class="icon"><image src="../../static/images/ykj.png" mode="widthFix"></image></view>
			<view class="info">
				<view class="name">
					一口价下单
				</view>
				<view class="tip">
					由您定价下单
				</view>
			</view>
			<view class="entry">></view>
		</view>
		
		<view class="order" @tap="selectType(2)">
			<view class="icon"><image src="../../static/images/bj.png" mode="widthFix"></image></view>
			<view class="info">
				<view class="name">
					报价下单
				</view>
				<view class="tip">
					多个师傅报价，由您选择维修师傅
				</view>
			</view>
			<view class="entry">></view>
		</view>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	import app from "../../App.vue";
	export default {
		data() {
			return {
				address: '',
				id:0,
				categ_name:'',
				user_info:''
			}
		},
		onLoad(options) {
			//所选项目id
			this.id=options.id?options.id:0;	
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.loadData();
			} else {
				uni.navigateTo({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			loadData() {
				this.request({
					url: interfaces.selectInit,
					data:{
						id:this.id
					},
					header:{
						token:this.user_info.token
					},
					method:'post',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.address=res.data.address;
							this.categ_name=res.data.categ_name;
						}
					}
				})
			},
			//返回选择服务项目页面
			goCateg(){
				wx.navigateBack({
					delta: 1
				})
			},
			selectType(type){
				wx.navigateTo({
					url:"add?type="+type+"&categ_id="+this.id
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: url("../../static/images/select_bg.jpg") no-repeat bottom;
		background-size: 100%;
	}
	.main{
		border-radius: 10px;
		margin: 20px 15px;
		box-shadow:0 0 9px 3px #ccc;
		padding: 15px 15px 15px 10px;
		.item{
			display: flex;
			padding-left: 5px;
			line-height: 50px;
			height: 50px;
			.icon{
				width: 30px;
				image{
					width: 18px;
					padding-top: 15px;
				}
			}
			.info{
				width: calc(100% - 60px);
			}
			.entry{
				width: 30px;
				text-align: right;
			}
		}
		.address{
			background-color: #F6F6F6;
			.info{
				line-height: 20px;
				display: flex;
				align-items: center;
			}
		}
	}
	
	.order{
		border-radius: 10px;
		margin: 20px 15px;
		box-shadow:0 0 9px 3px #ccc;
		padding: 15px 15px 15px 10px;
		display: flex;
		.icon{
			width: 50px;
			image{
				width: 100%;
			}
		}
		.info{
			width: calc(100% - 80px);
			padding-top: 6px;
			padding-left: 5px;
			.name{
				font-size: 16px;
				font-weight: bold;
			}
			.tip{
				color: #676767;
				font-size: 12px;
			}
		}
		.entry{
			width: 30px;
			text-align: right;
			padding-top: 15px;
		}
	}

	
	
</style>
