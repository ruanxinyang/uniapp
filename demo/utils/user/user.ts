import {request} from '../request/request.ts';
export const reguser =(options: object)=>{
	return request({
		url:'/api/reguser',
		method:'POST',
		data:options
	})
}
export const login =(options: object)=>{
	return request({
		//url:'/api/login',
		url: '/auth/wxLogin',
		method:'GET',
		data:options
	})
}
export const init =(options: object)=>{
	return request({
		//url:'/api/login',
		url: '/app/init',
		method:'GET',
		data:options
	})
}
export const getSwiper =(options: object)=>{
	return request({
		//url:'/api/login',
		url: '/Index/index',
		method:'GET',
		data:options
	})
}