const domain = "https://www.lianhexiu.com.cn/lhxptkhapi/";
const interfaces = {
	// 获取首页数据
	getIndexData: domain + "index/index",
	// 项目分类页面初始化
	categInit:domain+"categ/init",
	// 获取默认服务地址
	addressDefault:domain+"address/getdefault",
	// 服务地址详情
	addressDetail:domain+"address/detail",
	// 根据地区id获取省市区详细信息
	addressArea:domain+"address/area",
	// 新增服务地址
	addressAdd:domain+"address/add",
	// 编辑保存服务地址
	addressEdit:domain+"address/edit",
	// 获取师傅详情
	masterInfo: domain + "master/info",
	// 下单选择页面初始化
	selectInit: domain + "order/selectinit",
	//订单页面上传图片
	orderUpload:domain+"order/upload",
	//下订单
	orderAdd:domain+"order/add",
	//服务项目的初始费用，为0则没有初始费用
	categPrice:domain+"categ/price",
	//订单列表
	orderList:domain+"order/orderlist",
	//取消订单
	orderCancel:domain+"order/cancel",
	//重新下订单
	orderRecall:domain+"order/recall",
	//报价下单改一口价下单，一口价下单改报价下单
	orderChange:domain+"order/change",
	//报价的订单选择维修师傅
	orderSelect:domain+"order/select",
	//订单详情
	orderDetail:domain+"order/detail",
	//用户信息
	userInfo:domain+"user/info",
	//费用清单
	orderBill:domain+"order/bill",
	//评论
	orderEval:domain+"order/evaluate",
	
	//上传用户头像
	thumbUpload:domain+"user/thumbupload",
	
}
module.exports = interfaces;
