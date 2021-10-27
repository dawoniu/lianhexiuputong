<template>
	<view>
		<form @submit="formSubmit">
			<view class="box">
				<view class="item">
					<view class="name">联系人:</view>
					<view class="input"><input placeholder="请填写联系人姓名" name='linkman' :value="data.linkman"></input></view>
				</view>
				<view class="item">
					<view class="name"></view>
					<view class="input">
						<button class="active" v-if="sex==1">先生</button>
						<button v-else @tap="changeSex(1)">先生</button>
						<button class="active" v-if="sex==2">女士</button>
						<button v-else @tap="changeSex(2)">女士</button>
					</view>
				</view>
				<view class="item">
					<view class="name">手机号:</view>
					<view class="input"><input type="number" name='mobile' placeholder="请输入手机号码" :value="data.mobile"></input></view>
				</view>
				<view class="item">
					<view class="name">服务地址</view>
					<view class="input">
						<input name='position_address' @tap="openMap" disabled="true" placeholder="请定位您的服务地址" :value="data.position_address"></input>
						<input hidden="true" name='latitude' :value="data.latitude"></input>
						<input hidden="true" name='longitude' :value="data.longitude"></input>
						<input hidden="true" name='province_id' :value="data.province_id"></input>
						<input hidden="true" name='city_id' :value="data.city_id"></input>
						<input hidden="true" name='area_id' :value="data.area_id"></input>
						<input hidden="true" name='province_name' :value="data.province_name"></input>
						<input hidden="true" name='city_name' :value="data.city_name"></input>
						<input hidden="true" name='area_name' :value="data.area_name"></input>
					</view>
					<view class="entry" @tap="openMap">></view>
				</view>
				<view class="item">
					<view class="name">详细地址:</view>
					<view class="input"><input placeholder="请输入详细地址" name='address' :value="data.address"></input></view>
				</view>
			</view>
			
			<view class="foot">
				<button formType="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				data:{
					position_address:'',
					latitude:0,
					longitude:0,
					province_id:0,
					city_id:0,
					area_id:0,
					province_name:'',
					city_name:'',
					area_name:'',
					address:''
				},
				user_info: '',
				sex:1,
				is_preview:0
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				if(!this.is_preview){
					this.loadData();
				}
			}else{
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			//获取普通客户服务地址信息
			loadData() {
				this.request({
					url: interfaces.addressDefault,
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							this.data=res.data;
							this.sex=res.data.sex;
							this.is_preview=1;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			changeSex(sex){
				this.sex=sex;
			},
			//表单提交事件
			formSubmit: function(e) {
				var data = e.detail.value;
				data.sex=this.sex;
				if (data.linkman == '') {
					wx.showToast({
						title: '请输入联系人',
						icon: "none",
					});
					return;
				}
				if (!common.checkMobile(data.mobile)) {
					wx.showToast({
						title: '手机号码格式有误',
						icon: "none",
					});
					return;
				}
				if (data.position_address == '') {
					wx.showToast({
						title: '请定位您的服务地址',
						icon: "none",
					});
					return;
				}
				if (data.address == '') {
					wx.showToast({
						title: '请输入详细地址',
						icon: "none",
					});
					return;
				}
				this.request({
					url: interfaces.addressEdit,
					data: data,
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							wx.showToast({
								title: res.msg,
								icon: 'success'
							})
							setTimeout(function() {
								//返回地址列表
								wx.navigateBack({
									delta: 1
								})
							}, 1500);
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			//打开腾讯地图
			openMap() {
				wx.chooseLocation({
					success: e => {
						//console.log(e);
						this.data.position_address = e.address;
						this.data.latitude = e.latitude;
						this.data.longitude = e.longitude;
						this.getArea(e.latitude,e.longitude);
					},
					fail: err => {
						//console.log(err);
						if (err.errMsg === "chooseLocation:fail auth deny") {
							wx.showModal({
								title: '提示',
								content: '只有授权成功才能使用此功能，是否手动开启授权？',
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
			//根据经纬度逆推数据库里 省市区
			getArea(latitude,longitude) {
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						qqmapsdk.reverseGeocoder({
							location: {
								latitude:latitude,
								longitude:longitude
							},
							success: addressRes => {
								//console.log(addressRes);
								addressRes.result.ad_info.adcode;
								//根据获取到的地区id，去获取省市区id
								this.getAllAddress(addressRes.result.ad_info.adcode);
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
			//根据地区id获取省市区完整数据
			getAllAddress(adcode){
				this.request({
					url: interfaces.addressArea,
					data: {
						adcode:adcode
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.data.province_id=res.data.province_id;
							this.data.city_id=res.data.city_id;
							this.data.area_id=res.data.area_id;
							this.data.province_name=res.data.province_name;
							this.data.city_name=res.data.city_name;
							this.data.area_name=res.data.area_name;
						} else {
							wx.showToast({
								title: '请您手动选择您的所属区域',
								icon: 'none',
								mask: true,
							})
						}
					}
				});
			}
			
			
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 10px 10px;
		margin-bottom: 70px;
		.item {
			display: flex;
			height: 40px;
			line-height: 40px;
			.name{
				width: 80px;
				font-size: 14px;
				font-weight: bold;
			}
			.input{
				width: calc(100% - 100px);
				input{
					height: 40px;
					line-height: 40px;
				}
				button{
					width: 80px;
					display: inline-block;
					font-size: 12px;
					margin: 0 10px 0 0;
					color: #000000;
					background-color: #C6C6C6;
					height: 30px;
					border-radius: 15px;
				}
				.active{
					background-color: #257AFA;
					color: #fff;
				}
			}
			.entry{
				width: 20px;
				text-align: right;
			}
		}
	}
	.foot{
		padding-top: 50px;
		width: 70%;
		margin: 0 auto;
		button{
			margin: 10px;
			font-size: 16px;
			line-height: 40px;
			height: 40px;
			color: #fff;
			background-color: #257AFA;
			border-radius: 20px;
		}
		.delete{
			color: #F90000;
			background-color: #fff;
		}
	}
	
	
</style>
