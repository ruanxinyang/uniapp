<template>
<!-- 				<view class="uni-form-item uni-column">
					<input class="uni-input" v-model="userInfo.username" focus placeholder="请输入用户名" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" password v-model="userInfo.password" focus placeholder="请输入密码" />
				</view>
				<button class="uni-button"  @click="userLogin()" :disabled="userInfo.password.length < 6 || userInfo.username.length < 6 ">登录</button>
				<button class="uni-button" @click="userReguser()" :disabled="userInfo.password.length < 6 || userInfo.username.length < 6" >注册</button>
				<uni-popup ref="message" type="message">
								<uni-popup-message type="success" :message="messageText" :duration="2000"></uni-popup-message>
				</uni-popup> -->
				<view>
					<navbar :isHome="true"/>
					<view>
						<view class="weui-cell" style="background: #fff9eb;">
							<view class="weui-cell_bd">
								<text style="color: #be9719;font-size: 13px;">点击右上角“添加到我的小程序”，方便下次找到！</text>
							</view>
							<view class="weui-cell_ft">
								X
							</view>
						</view>
					</view>
					<view v-if="swiper && swiper.length>0" class="index-swiper">
						<swiper autoplay circular :interval="4000" :duration="500">
							<block v-for="(item,index) in swiper" :key="index">
								<swiper-item>
									<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
								</swiper-item>
							</block>
						</swiper>
					</view>
					<view v-if="nav2 && nav2.length > 0" class="nav2-list">
						<block v-for="(item,index) in nav2" :key="index">
							<view class="nav2-item" @click="goNav2Tap(item)" :data-index="index">
								<view class="nav2-pic">
									<image :src="item.pic_image_url" mode="widthFix"></image>
								</view>
							</view>
						</block>
						
					</view>
				</view>
</template>
<script setup>
import { reactive, ref, toRaw } from 'vue';
import { login, reguser, init, getSwiper } from '@/utils/user/user.ts';
import { useUsersStore } from '@/store/user.ts';
import { onLoad } from '@dcloudio/uni-app'
	const userInfo = reactive({
			username:'',
			password:'',
			code:'123123123'
	});
	const swiper = ref([])
	const nav2 = ref([])
	const users = useUsersStore()
	const messageText = ref('');
	const message = ref(null);
	const messageToggle = (type) => {
				messageText.value = type;
				message.value.open()
			}
	const userLogin = async function(){ 
				try{
						const res = await login(userInfo)
						if(res.status === 0){
							// messageToggle('登录成功')
							users.getToken(res.token)
						}else{
							// messageToggle('登录失败')
						}
				}catch(e){
					console.log('catch',e)
					// messageToggle(e)
				}
			
			}
	const userReguser = async function(){
				try{
						const res = await reguser(userInfo)
						console.log('res',res)
						if(res.status === 0){
							messageToggle('注册成功')
						}else{
							messageToggle('注册失败')
						}
				}catch(e){
					console.log('catch',e)
					messageToggle(e)
				}
			
			}
	const getSwipers = async function(){
				const res = await init(userInfo)
				const { id } = res.data.area;
				if(id){
					const swipers = await getSwiper(id)
					console.log(swipers);
					swiper.value = swipers.data ? swipers.data.slides : [],
					nav2.value = swipers.data ? swipers.data.nav2s : []
				}
			}
	onLoad(()=>{
		userLogin();
		getSwipers()
	})
	const goNav2Tap = function(item){
		console.log(toRaw(item));
		console.log(toRaw(nav2.value));
	}
</script>

<style lang="scss">
	.weui-cell{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx;
	}
	.weui-cell_ft{
		margin-right: 10rpx;
	}
	.index-swiper{
		padding: 10rpx 10rpx 0 10rpx;
		overflow: hidden;
		swiper{
			overflow: hidden;
			border-radius: 10rpx;
			height: 320rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.nav2-list{
		display: flex;
		flex-wrap: nowrap;
		padding: 10rpx;
		.nav2-item{
			width: 50%;
			padding: 10rpx 5rpx;
			.nav2-pic{
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
