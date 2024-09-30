const url_all = {
	dev: 'http://localhost:3017', // 开发
}
export const request =(options={})=>{
	return new Promise((resolve,rejects)=>{
		handleRequest(options,resolve,rejects)
	})
}
// 发起请求
function handleRequest(options: any, resolve: Function, reject: Function) {
	uni.request({
		url: url_all.dev + options.url,
		method: options.method,
		data: options.data,
		success: (response) => {
			return resolve(response.data)
		},
		fail: (fail) => {
			console.log('fail',fail)
			return reject(fail);
		}
	})
}
