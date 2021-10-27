<script>
	var handleLogin = require("utils/handleLogin.js");
	export default {
		globalData: {
			isRequest: 0,
			user_info:'',
			token:'',
			serviceadr:''
		},
		//判断是否需要登录
		isLogin: function(code, msg) {
			uni.showToast({
				title: msg,
				icon: 'none',
				mask: true,
				complete: function() {
					setTimeout(function() {
						if (code < 0) {
							wx.navigateTo({
								url: '/pages/auth/index',
							})
						}
					}, 1500)
				}
			})
		},
		onLaunch: function() {
			handleLogin.login(this.$scope);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/icon/iconfont.css");
	page{
	  color: #000;
	  font-size: 28rpx;
	}
</style>
