<template>
	<view class="lazy-image">
		<image :class="!loaded?'loaded':''" @load="onLoaded" :src="realSrc" mode="widthFix"></image>
		<view :class="loaded?'loaded':''">
			<image :src="placeholdSrc" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholdSrc: {
				type: String,
				default: "/static/images/loading.gif"
			},
			realSrc: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				loaded: false
			}
		},
		methods: {
			onLoaded() {
				this.loaded = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lazy-image {

		width: 100%;
	}

	.lazy-image image {
		width: 100%;
	}

	.lazy-image view {
		background-color: #eee;

		z-index: 2;

		width: 100%;

		transition: opacity 0.4s linear;
	}

	.loaded {
		display: none;
	}
</style>
