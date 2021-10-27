<template>
	<view>
		<view class="top">
			<scroll-view scroll-x='true'>
				<view class="tab">
					<block v-for="(item,index) in categ" :key="index">
						<view class="item hover" v-if="item.id==id">
							<view class="name">{{item.name}}</view>
							<view class="line"></view>
						</view>
						<view class="item" v-else @tap="scroll(item.id)">
							{{item.name}}
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<view class="content">
			<scroll-view scroll-y="true" :scroll-into-view="intoindex" style="height: calc(100vh - 50px);">
				<view class="main" v-for="(item,index) in categ" :key="index" :id="'id'+item.id">
					<view class="main_top">{{item.name}}</view>
					<view class="box">
						<view class="item" v-for="(itm,idx) in item.child" :key="idx" @tap="goNext(itm.id)">
							<view class="thumb">
								<lazy-image class="lazy-image" :realSrc="itm.thumb"></lazy-image>
							</view>
							<view class="title">
								{{itm.name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	var common = require('../../utils/common.js');
	import lazyImage from "../../components/lazy-image.vue";
	export default {
		components: {
			lazyImage
		},
		data() {
			return {
				id: 1,
				categ: [],
				categ_top: [],
				intoindex: '',
			}
		},
		onLoad(options) {
			this.id = options.id ? options.id : 0;
		},
		onShow() {
			var _this = this;
			this.request({
				url: interfaces.categInit,
				success: ((res) => {
					//console.log(res);
					if (res.code == 200) {
						this.categ = res.data;
						setTimeout(() => {
							new Promise(resolve => {
								let query = wx.createSelectorQuery();
								for (var k in this.categ) {
									query.select('#id' + this.categ[k].id).boundingClientRect();
									//console.log(this.categ[k].id);
								}
								query.exec(function(top) {
									resolve(top);
								});
							}).then(top => {
								_this.categ_top = top;
								_this.scroll(_this.id);
							});
						}, 0);
					}
				})
			});
		},

		methods: {
			//跳转商品详情页
			goNext(id) {
				uni.navigateTo({
					url: '../order/select?id=' + id
				})
			},
			scroll(id) {
				this.intoindex = 'id'+id;
				this.id=id;
			},

			drop(id) {
				//uni.createSelectorQuery().select('.content').boundingClientRect(data=>{//目标位置的节点：类或者id
				// uni.createSelectorQuery().select("#" + id).boundingClientRect(res => { //最外层盒子的节点：类或者id
				// 	//console.log(data);
				// 	console.log(res);

				var top = 0;

				for (var k in this.categ_top) {
					if (this.categ_top[k].id == id) {
						top = this.categ_top[k].top - 60;
					}
				}

				uni.pageScrollTo({
					duration: 100, //过渡时间
					scrollTop: top, //到达距离顶部的top值
				})

				//}).exec();
				//}).exec();
			}
		}
	}
</script>

<style lang="scss">
	.top {
		scroll-view{
			//position: fixed;
			//top: 0;
			height: 50px;
			width: 100%;
		}
	}
	.tab {
		background-color: #257AFA;
		color: #fff;
		font-size: 12px;
		height: 50px;
		white-space: nowrap;
		overflow: auto;
		//top: 0;
		width: 500px;
	}

	.tab .item {
		padding: 0 10px;
		display: inline-block;
		margin-top: 10px;
	}

	.tab .name {
		font-size: 16px;
	}

	.tab .line {
		width: 30px;
		border-top: 3px #fff solid;
		margin: 0 auto;
		margin-top: 5px;
	}

	.content {
		/* margin-top: 60px; */
	}

	.main {
		padding: 5px;
	}

	.main .main_top {
		border-left: 5px #257AFA solid;
		padding-left: 5px;
		font-size: 16px;
		margin: 10px 0 10px 5px;
	}

	.main .box {}

	.main image {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		width: 100%;
	}

	.main .item {
		width: calc(33.33% - 10px);
		display: inline-block;
		background-color: #F9F9F9;
		margin: 5px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.title {
		text-align: center;
	}
</style>
