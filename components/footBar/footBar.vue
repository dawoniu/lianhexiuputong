<template>
	<view class="bottom">
		<view class="nav-box">
			
			<view v-if="tarbar==0" class="nav-tab">
				<view class="nav-icon">
					<view class="circle">
						<image src="/static/images/footbar/index_active.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text-active">
					首页
				</view>
			</view>
			<view v-else class="nav-tab" @click="toIndex(0)">
				<view class="nav-icon">
					<view class="circle">
						<image src="/static/images/footbar/index.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text">
					首页
				</view>
			</view>
			
			<view v-if="tarbar==1" class="nav-tab">
				<view class="nav-icon" >
					<view class="circle">
						<image src="/static/images/footbar/order_active.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text-active">
					订单管理
				</view>
			</view>
			<view v-else class="nav-tab" @click="toIndex(1)">
				<view class="nav-icon">
					<view class="circle">
						<image src="/static/images/footbar/order.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text">
					订单管理
				</view>
			</view>
			
			<view class="nav-tab nav-tab-active" @click="toIndex(2)">
				<view class="nav-icon" >
					<view class="circle">
						<image src="/static/images/footbar/add.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text-active">
					发布订单
				</view>
			</view>
			
			<view v-if="tarbar==3" class="nav-tab">
				<view class="nav-icon" >
					<view class="circle">
						<image src="/static/images/footbar/address_active.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text-active">
					服务地址
				</view>
			</view>
			
			<view v-else class="nav-tab" @click="toIndex(3)">
				<view class="nav-icon" >
					<view class="circle">
						<image src="/static/images/footbar/address.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text">
					服务地址
				</view>
			</view>
			<view v-if="tarbar==4" class="nav-tab">
				<view class="nav-icon" >
					<view class="circle">
						<image src="/static/images/footbar/my_active.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text-active">
					我的
				</view>
			</view>
			<view v-else class="nav-tab" @click="toIndex(4)">
				<view class="nav-icon" >
					<view class="circle">
						<image src="/static/images/footbar/my.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-text">
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:['/pages/index/index','/pages/order/index','/pages/order/category','/pages/address/index','/pages/my/index']
			}
		},
		props: {
			tarbar: {
				type: Number,
				default: 5
			},
		},
		onLoad() {

		},
		methods: {
			toPage(url) {
				uni.redirectTo({
					url
				})
			},
			toIndex(index) {
				if(index!=this.tarbar){
					this.toPage(this.url[index]);
				}
				
				//this.$emit('toIndex', index)
				//this.home = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: $navHeight;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fff;
		z-index: 10;
	}

	.nav-tab {
		fiex: 1;
		text-align: center;
		width: 100%;
		height: $navHeight;
	}

	.nav-icon {
		height: 30px;
		color: $mediumGrey;
		box-sizing:border-box;
		padding: 4px 0 2px 0;
	}
	
	.nav-icon .iconfont {
		font-size: 20px;
	}
	
	.nav-icon image{
		width:26px;
	}
	
	.nav-text {
		font-size: 11px;
		height: 19px;
		color: $mediumGrey;
		font-weight: 400;
	}
	.nav-text-active {
		font-size: 11px;
		height: 19px;
		color: $dominantHue;
		font-weight: 400;
	}

	.nav-tab-active .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		top: -14px;
		left: calc(50% - 19px);
	}
	.nav-tab-active .circle image {
		width: 38px;
	}

	.nav-tab-active .iconfont {
		color: #fff;
	}

	.nav-tab-active .nav-text{
		color: $dominantHue;
	}
	.nav-box{
		/* position: absolute; */
		display: flex;
		width: 100%;
		box-sizing:border-box;
	}

	/*苹果x适配 H5APP*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}
	
</style>