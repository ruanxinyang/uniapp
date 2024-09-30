<template>
				<view class="uni-form-item uni-column">
					<input class="uni-input" v-model="userInfo.username" focus placeholder="请输入用户名" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" password v-model="userInfo.password" focus placeholder="请输入密码" />
				</view>
				<button class="uni-button"  @click="userLogin()">登录</button>
				<button class="uni-button" @click="userReguser()">注册</button>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { login, reguser } from '@/utils/user/user.ts';
	const userInfo = reactive({
			username:'',
			password:''
	});
	const userLogin = async function(){
				try{
						const res = await login(userInfo)
						console.log('res',res)
				}catch(e){
					console.log('catch',e)
				}
			
			}
	const userReguser = async function(){
		console.log(userInfo);
				try{
						const res = await reguser(userInfo)
						console.log('res',res)
				}catch(e){
					console.log('catch',e)
				}
			
			}
</script>

<style lang="scss">
	.uni-input{
		margin: 1rem;
		background-color: #fff;
		line-height: 1.5;
		padding: 0.8rem;
		border-radius: 5px;
	}          
	.uni-button{
		margin: 1rem;
		background-color: #00e7e7;
		border: 1px solid #00e7e7;
	}
</style>
