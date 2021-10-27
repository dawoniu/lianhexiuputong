<template>
	<view>
		<official-account></official-account>
		<view class="top">
			<view class="top_blue">
				
			</view>
			<view class="top_main">
				<view class="top_main_tip">
					<view class="left">
						<image src="/static/images/send.png" mode="widthFix"></image>
					</view>
					<view class="right">
						首次下单需要信息登记授权
					</view>
				</view>
				
				<view class="top_address" v-if="address" @tap="editAddress">
					<view class="item">
						<view class="left"><image src="../../static/images/address_people.png" mode="widthFix"></image></view>
						<view class="right">{{address.linkman}} | {{address.mobile}}</view>
					</view>
					<view class="item location">
						<view class="left"><image src="../../static/images/address_position.png" mode="widthFix"></image></view>
						<view class="right">
							师傅将到 {{address.position_address}} 帮助您
						</view>
					</view>
				</view>
				<view class="top_address" v-else>
					<view class="item">
						<view class="left"><image src="../../static/images/address_people.png" mode="widthFix"></image></view>
						<view class="right info">点击填写服务信息</view>
					</view>
					<view class="item location">
						<view class="left"><image src="../../static/images/address_position.png" mode="widthFix"></image></view>
						<view class="right">
							<view class="position">定位具体地址</view>
							<view class="tip">详细地址方便师傅上门</view>
						</view>
					</view>
				</view>
				
				<view class="sub">
					<button @tap="goCateg(0)">立即下单</button>
				</view>
			</view>
		</view>
		
		<view class="banner">
			<swiper :style="{height:swiperh}" circular="true" indicator-dots='true' autoplay="true" @change="bindChange">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<image :src="item.url" @load="imgHeight($event,index)" mode='widthFix'></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="categ-box">
			<block v-for="(item,index) in categ" :key="index">
				<view class="categ" @tap="goCateg(item.id)">
					<view class="categ_img">
						<image :src="item.thumb" mode="widthFix"></image>
					</view>
					<view class="categ_title">{{item.name}}</view>
				</view>
			</block>
			<view class="categ" @tap="goCateg(0)">
				<view class="categ_img">
					<image src="https://www.lianhexiu.com.cn/static/api/images/trade/eZUPuD5Xu404YyUxHfxwy904472Hzy.png" mode="widthFix"></image>
				</view>
				<view class="categ_title">查看更多</view>
			</view>
		</view>
		
		<view class="contact">
			<view class="item" @tap="callPhone('18659608055')">
				<view class="left"><image src="../../static/images/contact_tel.png" mode="widthFix"></image></view>	
				<view>电话咨询</view>
			</view>
			<button openType="contact" class='item'>
				<view class="left"><image src="../../static/images/contact_online.png" mode="widthFix"></image></view>
				<view>在线咨询</view>
			</button>
		</view>
		
		
		<view class="master">
			<view class="master_top">金牌师傅</view>
			<view class="master_main" v-for="(item,index) in master" :key="index" @tap="goDetail(item.id)">
				<view class="thumb"><image :src="item.thumb" mode="widthFix"></image></view>
				<view class="right">
					<view class="name">{{item.realname}}</view>
					<view class="star">
						<block v-for="count in item.star" :key="count">
						<image src="../../static/images/master_star.png" mode="widthFix"></image>
						</block>
					</view>
					<view class="skill">擅长：{{item.skill_name}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	import app from "../../App.vue";
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				token:'',
				banner: [],
				categ:[],
				swiperh: 0,
				imgheights: [],
				dangqian:'',
				address:'',
				master:''
			}
		},
		onLoad() {
			this.loadData();
			this.getCity();
		},
		onShow() {
			//console.log(1);
			//获取用户服务地址
			var _this=this;
			setTimeout(function(){
				if (app.globalData.isRequest == 1) {
					_this.token=app.globalData.user_info.token;
					_this.getDefaultAddress();
				} else {
					// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
					// 所以此处加入 callback 以防止这种情况
					app.isRequestCallback = isRequest => {
						if (isRequest == 1) {
							//console.log(3);
							_this.token=app.globalData.user_info.token;
							_this.getDefaultAddress();
						}
					}
				}
			},1000);
		},
		methods: {
			//动态获取Banner高度，设置swiper高度
			imgHeight(e, index) {
				var imgwidth = e.detail.width,
					imgheight = e.detail.height,
					//宽高比  
					ratio = imgwidth / imgheight;
				//计算的高度值  
				var viewHeight = 750 / ratio;
				var imgheight = viewHeight;
				var imgheights = this.imgheights;
				//把每一张图片的对应的高度记录到数组里  
				imgheights[index] = imgheight + "rpx";
				this.imgheights = imgheights;
				this.swiperh = imgheights[0];
			},
			bindChange(e) {
				// var imgheights=this.imgheights;
				this.swiperh = this.imgheights[e.detail.current];
			},
			
			loadData() {
				this.request({
					url: interfaces.getIndexData,
					data: {
						type: 1
					},
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.banner=res.data.banner;
							this.categ= res.data.categ;
							this.master=res.data.master;
						}
					}
				})
			},
			goDetail: function(id) {
				wx.navigateTo({
					url: '../master/info?id=' + id,
				})
			},

			//获取定位城市
			getCity: function() {
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: addressRes => {
								this.dangqian= addressRes.result.address_component.city;
							}
						})
					},
					fail: err => {
						//console.log(err);
						if (err.errMsg === "getLocation:fail auth deny") {
							wx.showModal({
								title: '提示',
								showCancel: false,
								confirmText: '好的',
								content: '未获取到你的地理位置，暂时无法为你提供服务。请检查是否开启定位权限。或尝试重新打开小程序。',
								success: (res) => {
									if (res.confirm) {
										wx.openSetting({
											success(settingdata) {
												//console.log(settingdata)
												if (settingdata.authSetting['scope.userLocation']) {
													wx.showToast({
														title: '授权成功',
														icon: 'none',
														mask: true,
													})
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														mask: true,
													})
												}
											}
										})
									}
								}
							})
						}
					}
				});
			},
			//获取用户的服务地址
			getDefaultAddress(){
				if(this.token){
					this.request({
						url: interfaces.addressDefault,
						header:{
							token:this.token
						},
						method: 'POST',
						success: res => {
							if (res.code == 200) {
								this.address=res.data;
							}
						}
					})
				}	
			},
			//拨打师傅电话
			callPhone(n) {
				wx.makePhoneCall({
					phoneNumber: n
				});
			},
			//跳转分类页面
			goCateg(id){
				if(this.address){
					wx.navigateTo({
						url: '../categ/index?id=' + id,
					})
				}else{
					wx.navigateTo({
						url:'../address/add'
					})
				}
			},
			//跳转更改用户地址
			editAddress(){
				wx.navigateTo({
					url:'../address/edit'
				})
			}
		}
	}
</script>

<style lang="scss">
	.top{
		position: relative;
		height: 210px;
	}
	.top_blue{
		background-color: #257AFA;
		height: 100px;
	}
	.top_main{
		border-radius: 10px;
		margin: 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		position: absolute;
		width: calc(100% - 30px);
		background-color: #fff;
		top: 10px;
	}
	.top_main_tip{
		display: flex;
		background-color: #FFF5D3;
		line-height: 36px;
		padding-left: 20px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		.left{
			background-color: #C7B370;
			border-radius: 50%;
			height: 24px;
			width: 24px;
			margin-top: 6px;
			image{
				width: 18px;
				padding: 3px 3px;
			}
		}
		.right{
			color: #C7B370;
			padding-left: 15px;
		}
	}
	
	.top_address{
		padding-top: 10px;
		.item{
			display: flex;
			margin: 0 10px;
			padding: 0 5px 10px 0;
		}
		.location{
			background-color: #F6F6F6;
			padding-top: 10px;
		}
		.left{
			padding-right: 10px;
			padding-left: 5px;
			image{
				width: 18px;
			}
		}
		.right{
			font-size: 14px;
			.tip{
				color: #757575;
				font-size: 10px;
			}
		}
		.info{
			color: #257AFA;
		}
	}
	.sub{
		padding-top: 10px;
		padding-bottom: 15px;
		button{
			background-color: #257AFA;
			color: #fff;
			height: 40px;
			line-height: 40px;
			border-radius: 20px;
			width: 150px;
			font-size: 14px;
		}
	}
	
	/* Banner样式 */
	.banner {
		width: calc(100% - 30px);
		position: relative;
		margin: 0 15px;
		top: 15px;
		overflow: hidden;
		swiper{
			border-radius: 10px;
		}
		image {
			width: 100%;
			border-radius: 10px;
		}
	}
	
	/* 导航栏部分 */
	.categ-box {
		padding: 0 10px;
	}
	.categ {
		width: 20%;
		text-align: center;
		padding-top: 15px;
		display: inline-block;
		image {
			width: 43.2%;
		}
	}
	.categ_title {
		font-size: 12px;
		color: #333;
	}
	
	.contact{
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		margin-top: 10px;
		image{
			width: 26px;
			padding-top: 14px;
			padding-right: 10px;
		}
		.item{
		  display: flex;
		  background-color: #C8DCFA;
		  color: #0C4EB3;
		  margin: 5px 10px;
		  width: calc(50% - 20px);
		  line-height: 40px;
		  border-radius: 5px;
		  font-size: 32rpx;
		  font-weight: 500;
		  height: 40px;
		  padding: 3px 0;
		  display: -webkit-flex;
		  align-items:center;
		  justify-content:center;
		}
		button{
			box-sizing: content-box;
			border: 0;
		}
		button::after {
			border: 0;
		}
	}
	.master{
		padding: 0 15px;
		margin-bottom: 15px;
		.master_top{
			padding: 10px 0;
			font-size: 16px;
		}
		.master_main{
			display: flex;
			.thumb{
				width: 60px;
				padding-right: 8px;
				image{
					width: 100%;
					border-radius: 50%;
				}
			}
			.right{
				width:calc(100% - 68px);
				.name{
					font-size: 14px;
				}
				.star image{
					width: 10px;
				}
				.skill{
					color: #676767;
					font-size: 10px;
					word-break: break-all;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
			}
		}
	}
	
</style>
