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
		url:'/api/login',
		method:'POST',
		data:options
	})
}