<template>
	<view>
		<view class="ba">
			<image src="../../static/images/ba.png" mode="widthFix"></image>
		</view>
		<form @submit="formSubmit">
		<view class="box">
			<view class="title">
				服务信息
			</view>
			<view class="item">
				<view class="name">上门时间：</view>
				<view class="time">
					<picker mode="multiSelector" @change="bindMultiPickerChange" value="0" :range="multiArray">
						{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}
					</picker>
				</view>
				<view class="entry">></view>
			</view>
			<view class="item">
				<view class="name">现场照片：</view>
			</view>
			<view class="pic">
				<view v-for="(item,index) in img_list" :key='index' class="pics">
					<image :src="item" mode="aspectFit" @tap='preImage(item)'></image>
					<view class="pic_delete" @tap="picsDelete(index)">X</view>
				</view>
				<view class="addpics" @tap="choosePic">
					<image src="../../static/images/upload.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="gz">
				<view class="name">报修故障：</view>
				<view class="area">
					<textarea placeholder="请描述报修故障及内容" placeholder-style="line-height:20px;padding-top:5px" name="remark"></textarea>
				</view>
			</view>
		</view>
		
		<view class="box" v-if="type==1">
			<view class="bj">
				<view class="name">一口价报价：</view>
				<view class="price">
					<input :placeholder="categ_price" name="b_price" value="" />
				</view>
			</view>
		</view>
		
		<view class="box">
			<view class="bj">
				<view class="name">填写备注：</view>
				<view class="remark">
					<input placeholder="尽可能清晰描述现场故障" name="matter" />
				</view>
			</view>
		</view>
		
		<view class="tip">
			温馨提示:1，严谨按系统下单流程保证各人资金安全 2， 保持通话畅通，方便师傅联系 3，灌注微信通知，接受是 师傅事实价格说明
		</view>
		
		<view class="sub">
			<button formType="submit" type="default" :disabled="prohibit">下单</button>
		</view>
		</form>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	export default {
		data() {
			return {
				user_info: '',
				type:'',
				categ_id:'',
				categ_price:0,
				categ_price_txt:'',
				img_list: [
					// 'https://www.lianhexiu.com.cn/uploads/order/20210308/4c5d09b1b9657fad7e25c4f294699084.jpg',
					// 'https://www.lianhexiu.com.cn/uploads/order/20210308/4c5d09b1b9657fad7e25c4f294699084.jpg',
					// 'https://www.lianhexiu.com.cn/uploads/order/20210308/4c5d09b1b9657fad7e25c4f294699084.jpg'
				], //照片数组
				img_num: 0, //照片的数量
				multiArray: [
					[],
					[]
				], //上门时间数组
				multiIndex: [0, 0],
				prohibit: false,
			}
		},
		onLoad(options) {
			this.type=options.type ? options.type : 0;
			this.categ_id=options.categ_id ? options.categ_id : 0;

			//从0天开始循环出之后7天
			for (let i = 0; i < 7; i++) {
				this.getDay(i);
			}
			this.getHours();
			
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.categPrice();
			} else {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			categPrice(){
				this.request({
					url: interfaces.categPrice,
					data:{
						id:this.categ_id
					},
					method: 'POST',
					success: res => {
						//console.log(res);
						if (res.code == 200) {
							this.categ_price=res.data;
							// this.categ_price_txt='推荐价格：'+res.data+'元';
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			// goBack(num){
			// 	wx.navigateBack({
			// 		delta: num
			// 	})
			// },
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
	
				this.multiArray[0].push(tYear + "-" + tMonth + "-" + tDate);
			},
			getHours() {
				var today = new Date();
				var tHours = today.getHours();
				for (let i = tHours; i <= 22; i = i + 2) {
					this.multiArray[1].push(i + ":00~" + (i + 2) + ":00");
				}
			},
			//当长度为1时，前面加个0，例如 7月改称07月
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},

			bindMultiPickerChange(e) {
				//console.log(e);
				this.multiIndex=e.detail.value;
			},

			
			//参数一 e 数据源
			//参数二 t 成功success的数量
			//参数三 a 失败fail的数量
			//参数四 i 完成comlete的数量
			//参数五 n 要上传的图片数量
			uploadDIY: function(e, t, a, i, n) {
				var o = this,
					s = this;
				wx.uploadFile({
					url: interfaces.orderUpload,
					filePath: e[i],
					name: "file",
					header: {
						'content-type': 'application/json',
						token:s.token
					},
					success: function(e) {
						e.data=JSON.parse(e.data);
						var num = s.img_list.length + 1;
						t++;
						s.img_list.push(e.data);
						s.img_num = num;
					},
					fail: function(e) {
						a++;
					},
					complete: function() {
						++i == n ? wx.hideLoading() : o.uploadDIY(e, t, a, i, n);
					}
				});
			},
			choosePic: function() {
				var a = this;
				wx.chooseImage({
					count: 6,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: function(e) {
						e.tempFilePaths;
						var t = e.tempFilePaths.length;
						a.uploadDIY(e.tempFilePaths, 0, 0, 0, t);
					}
				});
			},

			//表单提交事件
			formSubmit: function(e) {

				var data = e.detail.value;
				data.categ_id = this.categ_id;
				data.type=this.type;
				
				
				if (common.isBlank(data.remark)) {
					wx.showToast({
						title: '请描述报修故障及内容',
						icon: "none",
					});
					return;
				}
				
				// data.linkman=this.address.linkman;
				// data.mobile=this.address.mobile;
				// data.position_address=this.address.position_address;
				// data.position_city=this.address.position_city;
				// data.longitude=this.address.longitude;
				// data.latitude=this.address.latitude;

				data.customer_time = this.multiArray[0][this.multiIndex[0]] + " " + this.multiArray[1][this.multiIndex[1]];
				data.pics = this.img_list.join();
				this.prohibit= true;
				
				this.request({
					url: interfaces.orderAdd,
					data: data,
					header: {
						token:this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							wx.reLaunch({
								url: 'index',
							})
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},

			//点击报修图片预览图片事件
			preImage(url) {
				wx.previewImage({
					current: url,
					urls: this.img_list,
				})
			},

			//删除订单图片
			picsDelete(index) {
				this.img_list.splice(index, 1);
				this.img_num--;
			}
		}
	}
</script>

<style lang="scss">
	.ba{
		width: 100%;
		image{
			width: 100%;
		}
	}
	.box{
		border-radius: 10px;
		margin: 15px 15px 15px 15px;
		box-shadow:0 0 9px 3px #ccc;
		padding: 10px 10px;
		.title{
			border-left: 5px #257AFA solid;
			padding-left: 5px;
			font-size: 16px;
			margin: 10px 0 15px 5px;
			color: #257AFA;
		}
		.item{
			display: flex;
			line-height: 40px;
			.name{
				width: 80px;
				font-size: 16px;
			}
			.time{
				width: calc(100% - 110px);
			}
			.entry{
				width: 30px;
				text-align: right;
			}
		}
		.pic{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
		.pics{
			display: flex;
			position: relative;
			width: calc(((750rpx - 50px) / 3) - 10px);
			height: calc(((750rpx - 50px) / 3) - 10px);
			margin: 5px;
			justify-content: center;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.addpics {
			position: relative;
			display: flex;
			width: calc(((750rpx - 50px) / 3) - 10px);
			height: calc(((750rpx - 50px) / 3) - 10px);
			margin: 5px;
			justify-content: center;
			background-color: #F0F3F5;
			image{
				position: absolute;
				width: 50px;
				top: calc(50% - 25px);
				left: calc(50% - 25px);
			}
		}
		.pic_delete {
			position: absolute;
			right: 0;
			top: 0;
			width: 20px;
			height: 20px;
			color: #000;
			font-size: 20px;
			line-height: 20px;
			text-align: center;
			background-color: #fff;
		}
		.gz{
			display: flex;
			padding-top: 10px;
			.name{
				width: 80px;
				font-size: 16px;
			}
			.area{
				width: calc(100% - 80px);
				textarea {
					width: 100%;
					height: 60px;
					line-height: 20px;
					padding-top: 2px;
				}
			}
		}
		.bj{
			display: flex;
			justify-content: space-between;
			padding: 15px 0;
			.name{
				font-size: 16px;
			}
			input{
				text-align: right;
			}
			.remark{
				width: calc(100% - 80px);
				input{
					width: 100%;
				}
			}
		}
	}
	.tip{
		color: #257AFA;
		padding: 0 15px;
	}
	.sub{
		width: 60%;
		margin: 15px auto;
		button{
			background-color: #257AFA;
			color: #fff;
			height: 40px;
			line-height: 40px;
			border-radius: 20px;
			width: 100%;
			font-size: 14px;
		}
	}
	
	
</style>
