<template>
	<view>	
		<view class="tab">
			<picker @change="tabChange" :range="tab.name">
				<view class="picker">
					<view>
						{{tab.name[tab_index]}}
					</view>
					<view>
						<image src="../../static/images/xiala.png" mode="widthFix"></image>
					</view>
				</view>
			</picker>
		</view>
		<view class="order">
			
			<block v-if="sum>0">
			<view class="box" v-for="(item,index) in list" :key="index" @tap="goDetail(item.id)">
				<view class="title" v-if="item.type==1">一口价订单</view>
				<view class="title" v-else>报价订单</view>
				<view class="main">
					<view class="top">
						<view class="name">
							{{item.categ_name}}
						</view>
						<view class="top_right">
							<view v-if="item.status==0">
								待审核
							</view>
							<view v-else-if="item.status==1">
								已发布
							</view>
							<view v-else-if="item.status==2">
								已接单
							</view>
							<view v-else-if="item.status==3">
								待付款
							</view>
							<view v-else-if="item.status==4">
								待评价
							</view>
							<view v-else-if="item.status==5">
								已完成
							</view>
							<view v-else-if="item.status==9">
								已取消
							</view>
							<view class="entry">
								<image src="../../static/images/blue_entry.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					
					<view class="time">
						<view class="icon">
							<image src="../../static/images/time.png" mode="widthFix"></image>
						</view>
						<view class="content">
							{{item.customer_time}}
						</view>
						<view class="price" v-if="item.total_price>0">
							￥{{item.total_price}}
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<image src="../../static/images/order_people.png" mode="widthFix"></image>
						</view>
						<view class="content">
							{{item.linkman}} | {{item.mobile}}
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<image src="../../static/images/order_position.png" mode="widthFix"></image>
						</view>
						<view class="content">
							{{item.position_address}}
						</view>
					</view>
					<!-- 一口价下单 -->
					<block v-if="item.type==1">
						<block v-if="item.status==1">	
						
							<block v-if="item.has_master==0">
								<view class="wait">
									<view class="wait_top">
										已等待
									</view>
									<view class="wait_time">
										<jszd :startTime="item.status1_time"></jszd>
									</view>
									<view class="wait_tip">
										请耐心等待 我们正在为您联系附近师傅为您服务
									</view>
									<view class="banshou">
										<image src="../../static/images/banshou.png" mode="widthFix"></image>
									</view>
								</view>
							</block>
							<block v-else-if="item.has_master==1">
								<view class="baojia">
									<view class="baojia_top">已有师傅报价</view>
									<view class="baojia_main" v-for="(itm,idx) in item.baoming" :key="idx" @tap.stop="goMasterInfo(itm.master_id)">
										<view class="thumb"><image :src="itm.thumb" mode="aspectFill"></image></view>
										<view class="info">
											<view class="name">{{itm.realname}}</view>
											<view class="star">
												<block v-for="count in itm.star" :key="count">
												<image src="../../static/images/master_star.png" mode="widthFix"></image>
												</block>
											</view>
											<view class="skill">擅长：{{itm.skill_name}}</view>
										</view>
										<view class="baojia_right">
											<view class="price">¥{{itm.price}}</view>
											<view class="but"><button @tap.stop="select(item.id,itm.id)">选择</button></view>
										</view>
									</view>
								</view>
							</block>
							
							
							
						</block>
						<block v-else-if="item.status>1&&item.master_id>0">
							<view class="master">
								<view class="master_top">为您服务的师傅</view>
								<view class="master_main">
									<view class="thumb"><image :src="item.thumb" mode="aspectFill"></image></view>
									<view class="right">
										<view class="name">{{item.realname}}</view>
										<view class="star">
											<block v-for="count in item.star" :key="count">
											<image src="../../static/images/order_star.png" mode="widthFix"></image>
											</block>
										</view>
										<view class="skill">擅长：{{item.skill_name}}</view>
									</view>
								</view>
							</view>
						</block>
					</block>
					<!-- 报价下单 -->
					<block v-else-if="item.type==2">
						<block v-if="item.status==1">
							<block v-if="item.has_master==0">
								<view class="wait">
									<view class="wait_top">
										已等待
									</view>
									<view class="wait_time">
										<jszd :startTime="item.status1_time"></jszd>
									</view>
									<view class="wait_tip">
										请耐心等待 我们正在为您联系附近师傅为您服务
									</view>
									<view class="banshou">
										<image src="../../static/images/banshou.png" mode="widthFix"></image>
									</view>
								</view>
							</block>
							<block v-else-if="item.has_master==1">
								<view class="baojia">
									<view class="baojia_top">已有师傅报价</view>
									<view class="baojia_main" v-for="(itm,idx) in item.baoming" :key="idx" @tap.stop="goMasterInfo(itm.master_id)">
										<view class="thumb"><image :src="itm.thumb" mode="aspectFill"></image></view>
										<view class="info">
											<view class="name">{{itm.realname}}</view>
											<view class="star">
												<block v-for="count in itm.star" :key="count">
												<image src="../../static/images/master_star.png" mode="widthFix"></image>
												</block>
											</view>
											<view class="skill">擅长：{{itm.skill_name}}</view>
										</view>
										<view class="baojia_right">
											<view class="price">¥{{itm.price}}</view>
											<view class="but"><button @tap.stop="select(item.id,itm.id)">选择</button></view>
										</view>
									</view>
								</view>
							</block>
						</block>
						<block v-else-if="item.status>1&&item.master_id>0">
							<view class="master">
								<view class="master_top">为您服务的师傅</view>
								<view class="master_main">
									<view class="thumb"><image :src="item.thumb" mode="aspectFill"></image></view>
									<view class="right">
										<view class="name">{{item.realname}}</view>
										<view class="star">
											<block v-for="count in item.star" :key="count">
											<image src="../../static/images/order_star.png" mode="widthFix"></image>
											</block>
										</view>
										<view class="skill">擅长：{{item.skill_name}}</view>
									</view>
								</view>
							</view>
						</block>
					</block>
				</view>
				<block v-if="item.type==1">
					<block v-if="item.status==0||item.status==1">
						<view class="foot">
							<view class="foot_item3 cancel" @tap.stop="cancel(item.id)">取消订单</view>
							<view class="foot_item3 b_l blue" @tap.stop="change(item.id,item.type,index)">改为报价下单</view>
							<view class="foot_item3 b_l blue" @tap.stop="editPrice(index)">修改价格</view>
						</view>
					</block>
					<block v-else-if="item.status==3">
						<view class="foot" @tap.stop="goPay(item.id)">
							<view class="foot_item3 blue">付款</view>
						</view>
					</block>
					<block v-else-if="item.status==4">
						<view class="foot" @tap.stop="evaluate(index)">
							<view class="foot_item3 blue">评价</view>
						</view>
					</block>
					<block v-else-if="item.status==9">
						<view class="foot" @tap.stop="recall(item.id,item.type,index)">
							<view class="foot_item3 blue">重新下单</view>
						</view>
					</block>
				</block>
				<block v-else-if="item.type==2">
					<block v-if="item.status==0">
						<view class="foot">
							<view class="foot_item2 cancel" @tap.stop="cancel(item.id)">取消订单</view>
							<view class="foot_item2 b_l blue" @tap.stop="change(item.id,item.type,index)">改为一口价下单</view>
						</view>
					</block>
					<block v-else-if="item.status==1&&item.has_master==0">
						<view class="foot">
							<view class="foot_item2 cancel" @tap.stop="cancel(item.id)">取消订单</view>
							<view class="foot_item2 b_l blue" @tap.stop="change(item.id,item.type,index)">改为一口价下单</view>
						</view>
					</block>
					<block v-else-if="item.status==3">
						<view class="foot" @tap.stop="goPay(item.id)">
							<view class="foot_item3 blue">付款</view>
						</view>
					</block>
					<block v-else-if="item.status==4">
						<view class="foot" @tap.stop="evaluate(index)">
							<view class="foot_item3 blue">评价</view>
						</view>
					</block>
					<block v-else-if="item.status==9">
						<view class="foot" @tap.stop="recall(item.id,item.type,index)">
							<view class="foot_item3 blue">重新下单</view>
						</view>
					</block>
				</block>
			</view>
			</block>
			<block v-else>
				
				<view class="empty">
					<image src="../../static/images/empty.png" mode="widthFix"></image>
					您还没有订单噢
				</view>
				
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
					<view class="thumb"><image :src="master_thumb" mode="aspectFill"></image></view>
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
	//时间走动
	import jszd from "../../components/jszd.vue";
	//弹窗
	import pop from "@/components/ming-pop.vue";
	//弹窗
	import pop2 from "@/components/ming-pop2.vue";
	export default {
		components:{
			jszd,
			pop,
			pop2
		},
		data() {
			return {
				tab:{
					name:["最新订单","待审核","已发布","已接单","待付款","待评价","已完成","已取消"],
					value:["new","0","1","2","3","4","5","9"]
				},
				tab_index:0,
				user_info: '',
				tip: '',
				sum: 0,
				list: [],
				page: 1,
				complete: true,
				//弹窗位置，默认上方
				direction: "up",
				//切换一口价或者报价下单的订单索引index
				price_index:0,
				
				
				//选择的订单索引index
				check_index:0,
				master_thumb:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eodJHgGcKwtDiaWVkzIebbg4t1GrSCp0PDk6DblSkPbQSQ9EsX29G3p8pBB4hbEGibxiaX8jyKERtsCg/132',
				master_name:'王师傅',
				blue_star:5,
				hui_star:0,
				
				
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.loadData(1);
			} else {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		 	if (!this.complete) {
		 		this.page++;
		 		this.loadData(this.page);
			}
		},
		methods: {
			//拨打师傅电话
			callPhone(n) {
				wx.makePhoneCall({
					phoneNumber: n
				});
			},
			//获取数据
			loadData(page) {
				var status= this.tab.value[this.tab_index];
				this.request({
					url: interfaces.orderList,
					data: {
						page: page,
						status: status
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							
							if (page == 1) {
								this.list = [];
							}

							this.sum=res.sum;

							if (!common.isBlank(res.data)) {
					
								this.list = this.list.concat(res.data);
								this.page = page;

								if (this.list.length >= res.sum) {
									this.complete = true;
									this.tip = '数据已全部加载，暂无其他数据';
								} else {
									this.complete = false;
									this.tip = '上拉加载更多';
								}
								
							} else {
								this.complete = true;
								this.tip = '数据已全部加载，暂无其他数据';
							}
							
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				})
			},
			tabChange(e) {
				this.tab_index=e.detail.value;
				this.loadData(1);
			},
			//普通客户取消订单
			cancel(id) {
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
									id: id
								},
								method: 'POST',
								success: res => {
									console.log(res);
									if (res.code == 200) {
										_this.tab_index = 7;
										_this.loadData(1);
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
			recall(id,type,index){
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
									id: id
								},
								method: 'POST',
								success: res => {
									console.log(res);
									if (res.code == 200) {
										if(type==2){
											_this.tab_index = 1;
											_this.loadData(1);
										}else{
											//如果是重新下单，并且是一口价订单，则要重新输入一口价价格
											_this.editPrice(index);
										}
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
			change(id,type,index){
				var _this = this;
				if(type==1){
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
										id: id,
										price:0
									},
									method: 'POST',
									success: res => {
										console.log(res);
										if (res.code == 200) {
											_this.list[index].type = 2;
											_this.list[index].total_price = 0;
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
					this.price_index=index;
				}
			},
			//一口价订单修改价格
			editPrice(index){
				this.open('center');
				this.price_index=index;
			},
			//报价下单选择维修师傅
			select(order_id,baoming_id){
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
									order_id: order_id,
									baoming_id:baoming_id
								},
								method: 'POST',
								success: res => {
									//console.log(res);
									if (res.code == 200) {
										_this.tab_index=3;
										_this.loadData(1);
									} else {
										app.isLogin(res.code, res.msg);
									}
								}
							})
						}
					}
				})
			},
			
			
			//表单提交事件，报价下单改为一口价下单，或者一口价下单修改价格
			formSubmit1(e) {
				var _this = this;
				var data = e.detail.value;
				data.id=this.list[this.price_index].id;
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
							this.list[this.price_index].total_price=data.price;
							this.list[this.price_index].type=1;
							this.$refs.pop.close();
							if(_this.tab_index==7){
								_this.tab_index = 1;
								_this.loadData(1);
							}
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			
			//跳转订单详情页
			goDetail(id) {
				wx.navigateTo({
					url: 'detail?id=' + id,
				})
			},
			//跳转师傅详情
			goMasterInfo(id) {
				wx.navigateTo({
					url: '../master/info?id=' + id,
				})
			},
			//跳转订单支付页
			goPay(id) {
				wx.navigateTo({
					url: 'pay?id=' + id,
				})
			},
			//弹窗组件
			open(direction) {
				this.direction = direction;
				//打开弹窗
				this.$refs.pop.show();
			},
			//弹窗组件
			open2(direction) {
				this.direction = direction;
				//打开弹窗
				this.$refs.pop2.show();
			},
			//评价
			evaluate(index){
				this.check_index=index;
				this.master_thumb=this.list[this.check_index].thumb;
				this.master_name=this.list[this.check_index].realname;
				this.blue_star=this.list[this.check_index].star;
				this.hui_star=5-this.list[this.check_index].star;
				this.open2('center');
			},
			//表单提交事件，报价下单改为一口价下单，或者一口价下单修改价格
			formSubmit2(e) {
				var _this = this;
				var data = e.detail.value;
				data.id=this.list[this.check_index].id;
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
						
							this.list[this.check_index].status=5;
							this.$refs.pop2.close();
							
							if(_this.tab_index==5){
								_this.tab_index = 5;
								_this.loadData(1);
							}
							
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			//选择星数
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
	.empty{
		width: 70%;
		padding-top: 70px;
		margin: 0 auto;
		text-align: center;
		color: #64A4FF;
		font-size: 14px;
		image{
			width: 100%;
		};
	}
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
	.tab{
		background-color: #257AFA;
		line-height: 50px;
		color: #fff;
		padding-left: 15px;
		position: fixed;
		top: 0;
		width: 100%;
		.picker{
			display: flex;
			image{
				width: 18px;
				padding-left: 10px;
				padding-top: 15px;
			}
		}
	}
	.order{
		margin-bottom: 15px;
		margin-top: 65px;
		.box{
			margin: 15px 15px 0 15px;
			box-shadow:0 0 9px 3px #ccc;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			.title{
				background-color: #FFF5D3;
				color: #B5A15C;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				font-size: 16px;
				line-height: 40px;
				padding-left: 10px;
			}
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
						display: flex;
						color: #257AFA;
						.entry{
							width: 6px;
							padding-left: 5px;
							image{
								width: 100%;
								padding-top: 4px;
							}
						}
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
						width: calc(100% - 30px - 65px);
					}
					.price{
						width: 65px;
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
				.wait{
					background-color: #257AFA;
					color: #fff;
					position: relative;
					padding: 5px 8px;
					line-height: 25px;
					.wait_top{
						font-size: 12px;
					}
					.wait_time{
						font-size: 18px;
					}
					.wait_tip{
						font-size: 12px;
					}
					.banshou{
						width: 40px;
						position: absolute;
						top: 23px;
						right: 13px;
						image{
							width: 100%;
						}
					}
				}
				.master{
					color: #fff;
					background-color: #257AFA;
					padding: 5px 8px;
					line-height: 20px;
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
							height: 60px;
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
				}
				.baojia{
					padding-top: 10px;
					.baojia_top{
						color: #257AFA;
						font-size: 10px;
						padding-bottom: 10px;
					}
					.baojia_main{
						display: flex;
						border-bottom: 1px #ccc solid;
						margin-bottom: 10px;
						.thumb{
							width: 60px;
							padding-right: 8px;
							image{
								width: 100%;
								border-radius: 50%;
								height: 60px;
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
								word-break: break-all;
								display: -webkit-box;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}
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
			}
			.foot{
				border-top: 1px #ccc solid;
				display: flex;
				justify-content: space-around;
				line-height: 50px;
				.foot_item3{
					width: calc(100% / 3);
					text-align: center;
				}
				.foot_item2{
					width: 50%;
					text-align: center;
				}
				.cancel{
					color: #969696;
				}
				.blue{
					color: #257AFA;
				}
				.b_l{
					border-left: 1px #ccc solid;
					box-sizing: border-box;
				}
			}
		}
	}
	
	.eval{
		.thumb{
			width: 60px;
			margin: 0 auto;
			image{
				width: 100%;
				border-radius: 50%;
				height: 60px;
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
	
</style>
