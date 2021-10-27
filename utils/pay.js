const apiurl = 'https://www.lianhexiu.com.cn/lhxptkhapi/';

/*
调起微信支付
@param 支付订单ID,由订单ID在服务器端查询获得金额
*/
function pay(order_id) {
	uni.login({
		success: res => {
			//code 用于获取openID的条件之一
			var code = res.code;
			uni.request({
				url: apiurl + 'pay/pay',
				method: "POST",
				data: {
					order_id: order_id,
					code: code
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: function(res) { //后端返回的数据
					console.log(res);
					if (res.data.code == 200) {
						if (res.data.data == 'ok') {
							wx.switchTab({
								url: '/pages/order/index'
							})
						} else {
							var data = res.data.data;
							console.log(data);
							wx.requestPayment({
								timeStamp: data['timeStamp'],
								nonceStr: data['nonceStr'],
								package: data['package'],
								signType: data['signType'],
								paySign: data['paySign'],
								success: function(res) {
									wx.switchTab({
										url: '/pages/order/index'
									})
									// if(type==1){
									// 	wx.redirectTo({
									// 	  url: '/pages/customer/order/index?status=2'
									// 	})
									// }else{
									// 	wx.redirectTo({
									// 	  url: '/pages/customer/order/index?status=3'
									// 	})
									// }
									//console.log(res);
								},
								fail: function(res) {
									wx.switchTab({
										url: '/pages/order/index'
									})
								},
								
							})
						}
					}
				}
			});
		}
	})
}

module.exports = {
	pay: pay
};
