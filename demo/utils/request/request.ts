const url_all = {
	//dev: 'http://localhost:3017', // 开发
	dev: 'https://code.itndedu.com/pz',
}
export const request =(options = {
	showLoading: false,
})=>{
	 if(options.showLoading){
		 showLoading()
	 }
	return new Promise((resolve,rejects)=>{
		handleRequest(options,resolve,rejects)
	})
}
function showLoading() {
	const isShowLoading = uni.getStorageSync('isShowLoading')
	if(isShowLoading){
		uni.hideLoading()
		uni.setStorageSync('isShowLoading',false)
	}
	uni.showLoading({
		title: '加载中...',
		complete: () => {
			uni.setStorageSync('isShowLoading',true)
			},
			fail: () => {
				uni.setStorageSync('isShowLoading',false)
			}
	})
}
// 发起请求
function handleRequest(options: any, resolve: Function, reject: Function) {
	uni.request({
		url: url_all.dev + options.url,
		method: options.method ? options.method : 'POST',
		header: options.header ? options.header : {},
		dataType: options.dataType ? options.dataType : 'json',
		data: options.data ? options.data : {},
		success: (response) => {
			uni.hideLoading()
			return resolve(response.data)
		},
		fail: (fail) => {
			console.log('fail',fail)
			return reject(fail);
		}
	})
}
