<template>
	<view>
		
		<view class="top">
			<view class="top_blue">
				
			</view>
			<view class="master">
				<view class="thumb">
					<image :src="master.thumb" mode="widthFix"></image>
				</view>
				<view class="name">
					{{master.realname}}
				</view>
				<view class="star">
					<block v-for="count in master.star" :key="count">
					<image src="../../static/images/master_star.png" mode="widthFix"></image>
					</block>
				</view>
				<view class="info">
					<view>
						好评率：{{master.haoping_rate}}
					</view>
					<view>
						接单数：{{master.order_count}}单
					</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="title">
				师傅擅长
			</view>
			<view class="skill">
				<text v-for="(item,index) in skill" :key="index">{{item}}</text>
			</view>
		</view>
		<view class="box">
			<view class="title">
				用户评价
			</view>
			<view class="content">
				<view class="user" v-for="(item,index) in master.eval" :key="index">
					<view class="user_top">
						<view class="thumb">
							<image :src="item.user_thumb" mode="widthFix"></image>
						</view>
						<view class="info">
							<view class="name">
								{{item.nickname}}
							</view>
							<view class="comment">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="service">
						<view class="thumb">
							<image :src="item.server_thumb" mode="widthFix"></image>
						</view>
						<view class="service_info">
							<view class="name">
								{{item.server_name}}
							</view>
							<view class="star">
								<block v-for="count in item.star" :key="count">
								<image src="../../static/images/master_star.png" mode="widthFix"></image>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	import app from "../../App.vue";
	export default {
		data() {
			return {
				user_info: '',
				master:'',
				skill:[],
				id:1
			}
		},
		onLoad(options) {
			this.id = options.id ? options.id : 1;
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.loadData(this.id);
			} else {
				uni.navigateTo({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			loadData(id) {
				this.request({
					url: interfaces.masterInfo,
					data: {
						id: id
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.master=res.data;
							this.skill=res.data.skill_name.split(",");
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.top{
		position: relative;
		height: 230px;
	}
	.top_blue{
		background-color: #257AFA;
		height: 115px;
	}
	.master{
		border-radius: 10px;
		margin: 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		position: absolute;
		width: calc(100% - 30px);
		background-color: #fff;
		padding: 10px 0;
		top: 50px;
		.thumb{
			margin: 0 auto;
			width: 80px;
			image{
				width: 100%;
				border-radius: 50%;
			}
		}
		.name{
			text-align: center;
		}
		.star{
			width: 60px;
			margin: 0 auto;
			text-align: center;
			image{
				width: 10px;
				display: inline-block;
			}
		}
		.info{
			display: flex;
			justify-content: space-around;
		}
	}
	.box{
		border-radius: 10px;
		margin: 0 15px 15px 15px;
		box-shadow:0 0 9px 3px #ccc;
		padding: 10px 10px;
		.title{
			border-left: 5px #257AFA solid;
			padding-left: 5px;
			font-size: 16px;
			margin: 10px 0 15px 5px;
		}
		.skill{
			text{
				background-color: #F7F7F7;
				margin: 0 5px 10px 5px;
				padding: 3px 5px;
				display: inline-block;
			}
			
		}
		.user{
			margin-bottom: 15px;
			.user_top{
				display: flex;
				.thumb{
					width: 40px;
					margin-right: 8px;
					image{
						width: 100%;
						border-radius: 50%;
					}
				}
				.name{
					font-size: 16px;
				}
				.comment{
					font-size: 12px;
				}
			}
			
			.service{
				display: flex;
				background-color: #F7F7F7;
				height: 60px;
				padding: 5px;
				margin-top: 8px;
				.thumb{
					width: 60px;
					margin-right: 8px;
					image{
						width: 100%;
					}
				}
				.service_info{
					padding-top: 5px;
				}
				.star{
					padding-top: 10px;
					image{
						width: 16px;
					}
				}
			}
		}
		
	}
	
	
	
</style>
