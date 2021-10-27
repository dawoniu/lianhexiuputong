<template>
	<view>
		<form @submit="formSubmit">
			<view class="box">
				<view class="thumb">
					<view class="name">头像</view>
					<view class="mpics">
						<view v-if='thumb'>
							<image :src="thumb" mode="aspectFit"></image>
						</view>
						<view class="addpics" @tap="choosePic()">
							<image src="/static/images/upload.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="name">昵称</view>
					<view class="input"><input placeholder="请填写昵称" name='nickname'></input></view>
				</view>
				<view class="item">
					<view class="name">联系人</view>
					<view class="input"><input placeholder="请填写联系人姓名" name='linkman'></input></view>
				</view>
				<view class="item">
					<view class="name"></view>
					<view class="input">
						<button type="default" class="active" v-if="sex==1">先生</button>
						<button type="default" v-else @tap="changeSex(1)">先生</button>
						<button type="default" class="active" v-if="sex==2">女士</button>
						<button type="default" v-else @tap="changeSex(2)">女士</button>
					</view>
				</view>
				<view class="item">
					<view class="name">手机号</view>
					<view class="input"><input type="number" name='mobile' placeholder="请输入手机号码"></input></view>
				</view>
				<view class="item">
					<view class="name">服务地址</view>
					<view class="input">
						<input name='position_address' @tap="openMap" disabled="true" placeholder="请选择服务区域" :value="position_address"></input>
						<input hidden="true" name='latitude' :value="latitude"></input>
						<input hidden="true" name='longitude' :value="longitude"></input>
						<input hidden="true" name='province_id' :value="province_id"></input>
						<input hidden="true" name='city_id' :value="city_id"></input>
						<input hidden="true" name='area_id' :value="area_id"></input>
						<input hidden="true" name='province_name' :value="province_name"></input>
						<input hidden="true" name='city_name' :value="city_name"></input>
						<input hidden="true" name='area_name' :value="area_name"></input>
					</view>
					<view class="entry" @tap="openMap">></view>
				</view>
			</view>
			<view class='foot'>
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
				user_info: '',
				position_address: '',
				latitude: '',
				longitude: '',
				province_id:'',
				city_id:'',
				area_id:'',
				province_name:'',
				city_name:'',
				area_name:'',
				sex:1,
				thumb:''
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (!this.user_info) {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},

		methods: {
			changeSex(sex){
				this.sex=sex;
			},
			//表单提交事件
			formSubmit: function(e) {
				var _this = this;
				var data = e.detail.value;
				data.sex=this.sex;
				
				if(this.thumb==''){
					wx.showToast({
						title: '请上传头像',
						icon: "none",
					});
					return;
				}
				data.thumb=this.thumb;
				if(data.nickname==''){
					wx.showToast({
						title: '请输入您的昵称',
						icon: "none",
					});
					return;
				}
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
						title: '请获取服务地址',
						icon: "none",
					});
					return;
				}

				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});

				qqmapsdk.reverseGeocoder({
					location: {
						latitude: data.latitude,
						longitude: data.longitude,
					},
					success: addressRes => {
						addressRes.result.ad_info.adcode;
						//根据获取到的地区id，去获取省市区id
						this.getAllAddress(addressRes.result.ad_info.adcode,data);
					}
				})
			},

			openMap() {
				wx.chooseLocation({
					success: e => {
						console.log(e);
						this.position_address = e.address;
						this.latitude = e.latitude;
						this.longitude = e.longitude;
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
			//根据地区id获取省市区完整数据
			getAllAddress(adcode,data){
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
						if (res.code == 200) {
							data.province_id=res.data.province_id;
							data.city_id=res.data.city_id;
							data.area_id=res.data.area_id;
							data.province_name=res.data.province_name;
							data.city_name=res.data.city_name;
							data.area_name=res.data.area_name;
							this.saveAddress(data);
						} else {
							wx.showToast({
								title: '请您手动选择您的所属区域',
								icon: 'none',
								mask: true,
							})
						}
					}
				});
			},
			//保存服务地址
			saveAddress(data){
				var _this=this;
				this.request({
					url: interfaces.addressAdd,
					data: data,
					header: {
						token: _this.user_info.token
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
			
			choosePic() {
				var a = this;
				wx.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: function(e) {
						console.log(e);
						e.tempFilePaths;
						var t = e.tempFilePaths.length;
						a.uploadDIY(e.tempFilePaths, 0, 0, 0, t);
					}
				});
			},
			
			//参数一 e 数据源
			//参数二 t 成功success的数量
			//参数三 a 失败fail的数量
			//参数四 i 完成comlete的数量
			//参数五 n 要上传的图片数量
			uploadDIY: function(e, t, a, i, n) {
				//console.log(11);
				var o = this,
					s = this;
			
				wx.uploadFile({
					url: interfaces.thumbUpload,
					filePath: e[i],
					name: "file",
					header: {
						'content-type': 'application/json'
					},
					formData: {
						token: s.user_info.token
					},
					success: function(e) {
						//console.log(e);
						e.data=JSON.parse(e.data);	
						s.thumb=e.data;
					},
					fail: function(e) {
						//console.log(e);
						a++;
					},
					complete: function() {
						++i == n ? wx.hideLoading() : o.uploadDIY(e, t, a, i, n);
					}
				});
			},
			
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
		.thumb {
			display: flex;
			.name{
				width: 80px;
				font-size: 14px;
				font-weight: bold;
			}
			.mpics {
				width: calc(100% - 100px);
				display: flex;
				flex-wrap: wrap;
			}
			.mpics view {
				width: calc((750rpx - 20px) / 3 - 10px);
				height: calc((750rpx - 20px) / 3 - 10px);
				margin: 5px;
			}
			.mpics image {
				width: 100%;
				height: 100%;
			}
			.mpics .addpics {
				position: relative;
				width: calc((750rpx - 20px) / 3 - 14px);
				height: calc((750rpx - 20px) / 3 - 14px);
				margin: 5px;
				border: 2px #eeeeee solid;
			}
			
			.mpics .addpics image {
				position: absolute;
				width: 50px;
				left: calc(50% - 25px);
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
