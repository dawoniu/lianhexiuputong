<template>
	<view>
		<view class="status">
			<view class="pic">
				<block v-if="data.status<=5">
					<block v-if="data.status==0">
						<view class="qiu"><image src="../../static/images/blue_qiu.png" mode="widthFix"></image></view>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					</block>
					<block v-else>
						<view class="qiu"><image src="../../static/images/blue_qiu.png" mode="widthFix"></image></view>
						<block v-for="t in data.status" :key="t">
							<view class="blue"></view>
							<view class="qiu"><image src="../../static/images/blue_qiu.png" mode="widthFix"></image></view>
						</block>
						<block v-for="t in (5-data.status)" :key="t">
							<view class="hui"></view>
							<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
						</block>
						<view class="hui"></view>
						<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					</block>
				</block>
				<block v-else>
					<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					<view class="hui"></view>
					<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					<view class="hui"></view>
					<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					<view class="hui"></view>
					<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					<view class="hui"></view>
					<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					<view class="hui"></view>
					<view class="qiu"><image src="../../static/images/hui_qiu.png" mode="widthFix"></image></view>
					<view class="hui"></view>
					<view class="qiu"><image src="../../static/images/blue_qiu.png" mode="widthFix"></image></view>
				</block>
			</view>
			<view class="name">
				<view :class="[data.status>=0&&data.status!=9 ? 'blue' : 'hui']">待审核</view>
				<view :class="[data.status>=1&&data.status!=9 ? 'blue' : 'hui']">已发布</view>
				<view :class="[data.status>=2&&data.status!=9 ? 'blue' : 'hui']">已接单</view>
				<view :class="[data.status>=3&&data.status!=9 ? 'blue' : 'hui']">待付款</view>
				<view :class="[data.status>=4&&data.status!=9 ? 'blue' : 'hui']">待评价</view>
				<view :class="[data.status>=5&&data.status!=9 ? 'blue' : 'hui']">已完成</view>
				<view :class="[data.status==9 ? 'blue' : 'hui']">已取消</view>
			</view>
		</view>
		
		<view class="box">
			<view class="main">
				<view class="top">
					<view class="name">
						{{data.categ_name}} <block v-if="data.type==1">一口价订单</block><block v-else>报价订单</block>
					</view>
					<view class="top_right" v-if="data.total_price>0">
						￥{{data.total_price}}
					</view>
				</view>
				
				<view class="time">
					<view class="icon">
						<image src="../../static/images/time.png" mode="widthFix"></image>
					</view>
					<view class="content">
						{{data.customer_time}}
					</view>
					<view class="price">
						<!-- ￥300暂时用不到 -->
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/images/order_people.png" mode="widthFix"></image>
					</view>
					<view class="content">
						{{data.linkman}} | {{data.mobile}}
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/images/order_position.png" mode="widthFix"></image>
					</view>
					<view class="content">
						{{data.position_address}}
					</view>
				</view>
				
				<view class="line"></view>
				<view class="title">故障描述</view>
				<view class="desc">{{data.remark}}</view>
				<view class="pic">
					<view v-for="(item,index) in data.pics" :key='index' class="pics">
						<image :src="item" mode="aspectFit" @tap='preImage(item)'></image>
					</view>
				</view>
				<view class="title">备注</view>
				<view class="desc">{{data.matter}}</view>
			</view>
		</view>
		
		<view class="master" v-if="data.master_id>0&&data.status>1">
			<view class="master_top">为您服务的师傅</view>
			<view class="master_main">
				<view class="thumb"><image :src="data.master.thumb" mode="widthFix"></image></view>
				<view class="right">
					<view class="name">{{data.master.realname}}</view>
					<view class="star">
						<block v-for="t in data.master.star" :key="t">
							<image src="../../static/images/order_star.png" mode="widthFix"></image>
						</block>
					</view>
					<view class="skill">擅长：{{data.master.skill_name}}</view>
				</view>
			</view>
			<view class="but">
				<view @tap="callPhone(data.master.mobile)"><image src="../../static/images/while_phone.png" mode="widthFix"></image></view>
				<view @tap="message"><image src="../../static/images/while_message.png" mode="widthFix"></image></view>
			</view>
		</view>
		
		<block v-if="data.has_master&&data.status==1&&data.type==2">
			<view class="baojia" v-for="(item,index) in data.baoming" :key="index">
				<view class="thumb"><image :src="item.thumb" mode="widthFix"></image></view>
				<view class="info">
					<view class="name">{{item.realname}}</view>
					<view class="star">
						<block v-for="t in item.star" :key="t"><image src="../../static/images/master_star.png" mode="widthFix"></image></block>
					</view>
					<view class="skill">擅长：{{item.skill_name}}</view>
				</view>
				<view class="baojia_right">
					<view class="price">¥{{item.price}}</view>
					<view class="but"><button @tap="select(item.id)">选择</button></view>
				</view>
			</view>
		</block>
		<view class="order">
			<view class="info">订单编号：{{data.order_no}}</view>
			<view class="info">下单时间：{{data.create_time_txt}}</view>
			<!-- <view class="info">接单时间：{{data.status2_time_txt}}</view> -->
		</view>
		
		<view class="foot">
			<view class="contact"><button openType="contact">联系客服</button></view>
			<block v-if="data.type==1">
				<block v-if="data.status==0||data.status==1">
					<view><button class="mx" @tap="cancel()">取消订单</button></view>
					<view><button class="mx" @tap="change()">改为报价下单</button></view>
					<view><button class="check" @tap="editPrice()">修改价格</button></view>
				</block>
				<block v-else-if="data.status==3">
					<view><button class="check" @tap="goPay()">付款</button></view>
				</block>
				<block v-else-if="data.status==4">
					<view><button class="check" @tap="evaluate()">评价</button></view>
				</block>
				<block v-else-if="data.status==9">
					<view><button class="check" @tap="recall()">重新下单</button></view>
				</block>
			</block>
			<block v-else-if="data.type==2">
				<block v-if="data.status==0">
					<view><button class="mx" @tap="cancel()">取消订单</button></view>
					<view><button class="check" @tap="change(data.id,data.type)">改为一口价下单</button></view>
				</block>
				<block v-else-if="data.status==1&&item.has_master==0">
					<view><button class="mx" @tap="cancel()">取消订单</button></view>
					<view><button class="check" @tap="change()">改为一口价下单</button></view>
				</block>
				<block v-else-if="data.status==3">
					<view><button class="check" @tap="goPay()">付款</button></view>
				</block>
				<block v-else-if="data.status==4">
					<view><button class="check" @tap="evaluate()">评价</button></view>
				</block>
				<block v-else-if="data.status==9">
					<view><button class="check" @tap="recall()">重新下单</button></view>
				</block>
			</block>
		</view>
		
		<pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="80">
			<form @submit="formSubmit1">
				<view class="yk">
					<view class="name">填写价格：</view>
					<view class="price">
						<input type="number" placeholder="请输入价格" name="price" />
					</view>
				</view>
				<view class="sub">
					<button formType="submit" type="default">确定</button>
				</view>
			</form>
		</pop>
		
		<pop ref="pop2" :direction="direction" :is_close="true" :is_mask="true" :width="80">
			<form @submit="formSubmit2">
				<view class="eval">
					<view class="thumb"><image :src="master_thumb" mode="widthFix"></image></view>
					<view class="name">{{master_name}}</view>
					<view class="star">
						<block v-for="count in blue_star" :key="count">
							<image src="../../static/images/blue_star.png" mode="widthFix" @tap="checkStar(count,1)"></image>
						</block>
						<block v-for="count in (hui_star)" :key="count">
							<image src="../../static/images/hui_star.png" mode="widthFix" @tap="checkStar(count,2)"></image>
						</block>
					</view>
					<view class="content">
						<textarea value="" placeholder="请输入评价内容" name="content"/>
					</view>
					<view class="sub">
						<button formType="submit">确定</button>
					</view>
				</view>
			</form>
		</pop>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	//弹窗
	import pop from "@/components/ming-pop.vue";
	//弹窗
	import pop2 from "@/components/ming-pop2.vue";
	export default {
		components:{
			pop,
			pop2
		},
		data() {
			return {
				user_info: '',
				data:[],
				id: 0,
				is_preview:false,
				
				//弹窗位置，默认上方
				direction: "up",
				
				//选择的订单索引index
				check_index:0,
				master_thumb:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eodJHgGcKwtDiaWVkzIebbg4t1GrSCp0PDk6DblSkPbQSQ9EsX29G3p8pBB4hbEGibxiaX8jyKERtsCg/132',
				master_name:'王师傅',
				blue_star:5,
				hui_star:0,
				
				
			}
		},
		onLoad(options) {
			this.id = options.id ? options.id : 0;
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				if(!this.is_preview){
					this.initData();
				}
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
					url: interfaces.orderDetail,
					data: {
						id: this.id,
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.is_preview=true;
							
							if(res.data.pics!=''){
								res.data.pics = res.data.pics.split(",");
							}else{
								res.data.pics=[];
							}
							
							res.data.create_time_txt = common.formatDT(res.data.create_time, 'yyyy.MM.dd h:m');
							res.data.status2_time_txt = common.formatDT(res.data.status2_time, 'yyyy.MM.dd h:m');
							res.data.status3_time_txt = common.formatDT(res.data.status3_time, 'yyyy.MM.dd h:m');
							res.data.status9_time_txt = common.formatDT(res.data.status9_time, 'yyyy.MM.dd h:m');
							this.data=res.data;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				})
			},
			//点击报修图片预览图片事件
			preImage(url) {
				wx.previewImage({
					current: url,
					urls: this.data.pics,
				})
			},
			//拨打师傅电话
			callPhone(n) {
				wx.makePhoneCall({
					phoneNumber: n
				});
			},
			//给师傅发信息
			message(){
				wx.showToast({
					title: '功能未开放，敬请期待',
					icon: "none",
				});
			},
			//报价下单选择维修师傅
			select(baoming_id){
				var _this = this;
				//一口价下单改为报价下单
				wx.showModal({
					title: '提示',
					content: '确认要选择该师傅维修吗？',
					success: function(res) {
						if (res.confirm) {
							_this.request({
								url: interfaces.orderSelect,
								header: {
									token: _this.user_info.token
								},
								data: {
									order_id: _this.id,
									baoming_id:baoming_id
								},
								method: 'POST',
								success: res => {
									console.log(res);
									if (res.code == 200) {
										_this.initData();
									} else {
										app.isLogin(res.code, res.msg);
									}
								}
							})
						}
					}
				})
			},
			//普通客户取消订单
			cancel() {
				var _this = this;
				wx.showModal({
					title: '提示',
					content: '确认要取消订单吗？',
					success: function(res) {
						if (res.confirm) {
							_this.request({
								url: interfaces.orderCancel,
								header: {
									token: _this.user_info.token
								},
								data: {
									id: _this.data.id
								},
								method: 'POST',
								success: res => {
									console.log(res);
									if (res.code == 200) {
										_this.data.status=9;
									} else {
										app.isLogin(res.code, res.msg);
									}
								}
							})
						}
					}
				})
			},
			//取消的订单重新下单,订单到待审核状态
			recall(){
				var _this = this;
				wx.showModal({
					title: '提示',
					content: '确认要重新下订单吗？',
					success: function(res) {
						if (res.confirm) {
							_this.request({
								url: interfaces.orderRecall,
								header: {
									token: _this.user_info.token
								},
								data: {
									id: _this.data.id
								},
								method: 'POST',
								success: res => {
									console.log(res);
									if (res.code == 200) {
										_this.data.status = 0;
									} else {
										app.isLogin(res.code, res.msg);
									}
								}
							})
						}
					}
				})
			},
			//一口价改报价下单，报价下单改一口价订单
			change(){
				var _this = this;
				if(this.data.type==1){
					//一口价下单改为报价下单
					wx.showModal({
						title: '提示',
						content: '确认要改为报价下单吗？',
						success: function(res) {
							if (res.confirm) {
								_this.request({
									url: interfaces.orderChange,
									header: {
										token: _this.user_info.token
									},
									data: {
										id: _this.data.id,
										price:0
									},
									method: 'POST',
									success: res => {
										console.log(res);
										if (res.code == 200) {
											_this.data.type = 2;
											_this.data.total_price = 0;
										} else {
											app.isLogin(res.code, res.msg);
										}
									}
								})
							}
						}
					})
				}else{
					//报价下单改为一口价下单
					this.open('center');
				}
			},
			//报价下单修改价格
			editPrice(){
				this.open('center');
			},
			//跳转订单支付页
			goPay() {
				wx.navigateTo({
					url: 'pay?id=' + this.data.id,
				})
			},
			//评价
			evaluate(){
				this.direction = 'center';
				this.master_thumb=this.data.master.thumb;
				this.master_name=this.data.master.realname;
				this.blue_star=this.data.master.star;
				this.hui_star=5-this.data.master.star;
				//打开弹窗
				this.$refs.pop2.show();
			},
			//弹窗组件
			open(direction) {
				this.direction = direction;
				//打开弹窗
				this.$refs.pop.show();
			},
			//表单提交事件，报价下单改为一口价下单，或者一口价下单修改价格
			formSubmit1(e) {
				var data = e.detail.value;
				data.id=this.id;
				if (!data.price >0) {
					wx.showToast({
						title: '请输入正确的价格',
						icon: "none",
					});
					return;
				}
				this.request({
					url: interfaces.orderChange,
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
							
							this.initData();
							this.$refs.pop.close();
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			//表单提交事件，报价下单改为一口价下单，或者一口价下单修改价格
			formSubmit2(e) {
			
				var data = e.detail.value;
				data.id=this.id;
				data.star=this.blue_star;
				this.request({
					url: interfaces.orderEval,
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
						
							this.initData();
							this.$refs.pop2.close();
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			checkStar(count,type){
				if(type==1){
					this.blue_star=count+1;
					this.hui_star=5-this.blue_star;
				}else{
					this.blue_star=this.blue_star+count+1;
					this.hui_star=5-this.blue_star;
				}
			},
		}
	}
</script>

<style lang="scss">
	
	//一口价报价
	.yk{
		display: flex;
		padding-top: 40px;
		line-height: 20px;
		height: 20px;
		.name{
			width: 80px;
		}
		.price{
			width: calc(100% - 80px);
			input{
				line-height: 20px;
				height: 20px;
			}
		}
	}
	.sub{
		padding-top: 50px;
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
	
	.eval{
		.thumb{
			width: 60px;
			margin: 0 auto;
			image{
				width: 100%;
				border-radius: 50%;
			}
		}
		.name{
			text-align: center;
			padding-top: 5px;
		}
		.star{
			text-align: center;
			padding-top: 5px;
			image{
				width: 20px;
				padding: 0 2px;
			}
		}
		.content{
			padding-top: 10px;
			textarea{
				background-color: #F2F2F2;
				height: 60px;
				line-height: 20px;
				padding: 5px;
				width: auto;
			}
		}
		.sub{
			padding-top: 50px;
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
	}
	
	
	
	
	.status{
		.pic{
			display: flex;
			padding: 0 calc((750rpx - 18px * 7) / 14);
			.qiu{
				width: 18px;
				image{
					width: 100%;
				}
			}
			.blue{
				height: 2px;
				margin: 8px 0;
				background-color: #257AFA;
				width: calc((750rpx - 18px * 7) / 7);
			}
			.hui{
				height: 2px;
				margin: 8px 0;
				background-color: #DFDFDF;
				width: calc((750rpx - 18px * 7) / 7);
			}
		}
		.name{
			display: flex;
			//padding: 0 12px;
			justify-content: space-around;
			.blue{
				color: #257AFA;
			}
			.hui{
				color: #848484;
			}
		}
	}
	
	.box{
		margin: 15px 15px 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		.main{
			padding: 10px;
			.top{
				display: flex;
				justify-content: space-between;
				line-height: 20px;
				padding: 10px 0;
				margin-bottom: 10px;
				.name{
					font-size: 16px;
				}
				.top_right{
					color: #FFAE00;
				}
			}
			.time{
				display: flex;
				padding-bottom: 10px;
				.icon{
					width: 20px;
					padding-right: 10px;
					image{
						width: 100%;
					}
				}
				.content{
					color: #676767;
					width: calc(100% - 30px - 50px);
				}
				.price{
					width: 50px;
					color: #FFAE00;
					text-align: right;
				}
			}
			.item{
				display: flex;
				padding-bottom: 10px;
				.icon{
					width: 20px;
					padding-right: 10px;
					image{
						width: 100%;
					}
				}
				.content{
					color: #676767;
				}
			}
			.line{
				width: 100%;
				border-bottom: 1px #ccc solid;
			}
			.title{
				color: #257AFA;
				font-size: 16px;
				padding: 10px 0;
			}
			.desc{
				color: #676767;
				padding-bottom:10px;
			}
			.pic{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}
			.pics{
				display: flex;
				width: calc(((750rpx - 50px) / 3) - 10px);
				height: calc(((750rpx - 50px) / 3) - 10px);
				margin: 5px;
				justify-content: center;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}	
	}
	
	.master{
		color: #fff;
		background-color: #257AFA;
		padding: 5px 8px;
		line-height: 20px;
		margin: 15px 15px 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-radius: 10px;
		
		.master_top{
			padding: 3px 0 8px 0;
		}
		.master_main{
			display: flex;
		}
		.thumb{
			width: 60px;
			padding-right: 8px;
			image{
				width: 100%;
				border-radius: 50%;
			}
		}
		.name{
			font-size: 14px;
		}
		.star image{
			width: 12px;
		}
		.skill{
			font-size: 12px;
		}
		.but{
			display: flex;
			justify-content: space-around;
			padding-top: 10px;
			padding-bottom: 5px;
			view{
				width: 100px;
				text-align: center;
				border: 2px #fff solid;
				line-height: 30px;
				height: 30px;
				border-radius: 15px;
				image{
					width: 20px;
					padding-top: 4px;
				}
			}
		}
	}
	.baojia{
		display: flex;
		color: #676767;
		padding: 8px 8px;
		line-height: 20px;
		margin: 15px 15px 10px 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-radius: 10px;
		.thumb{
			width: 60px;
			padding-right: 8px;
			image{
				width: 100%;
				border-radius: 50%;
			}
		}
		.info{
			width: calc(100% - 118px);
			.name{
				font-size: 14px;
			}
			.star image{
				width: 12px;
			}
			.skill{
				font-size: 12px;
			}
		}
		.baojia_right{
			width: 50px;
			text-align: center;
			.price{
				color: #FFB420;
				padding-bottom: 5px;
			}
			.but{
				button{
					background-color: #257AFA;
					font-size: 12px;
					padding: 0;
					width: 50px;
					color: #fff;
				}
			}
		}
	}
	.order{
		color: #676767;
		padding: 5px 8px;
		line-height: 20px;
		margin: 15px 15px 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-radius: 10px;
		.info{
			padding: 5px 0;
		}
	}
	.foot{
		background-color: #fff;
		color: #257AFA;
		padding: 10px 0;
		box-shadow:0 0 9px 3px #ccc;
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		line-height: 30px;
		justify-content: flex-end;
		view{
			padding: 5px 0;
			width: 25%;
		}
		button{
			height: 30px;
			font-size: 14px;
			width: 80px;
			padding: 0 5px;
			line-height: 30px;
			border-radius: 15px;
		}
		.contact{
			button{
				background-color:transparent;
				color: #257AFA;
			}
			button::after {
				border: 0;
			}
		}
		.mx{
			border: 1px #257AFA solid;
			color: #257AFA;
			background-color: #fff;
		}
		.check{
			color: #fff;
			background-color: #257AFA;
		}
		
	}
	
	
</style>
