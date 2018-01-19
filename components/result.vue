<template>
	<div v-if='show' class="lt-full" :style="{background: 'url('+imgs.result+') no-repeat center top',backgroundSize:'cover'}">
		<h1 class="zmiti-fill-height">
			
			<div class="zmiti-address1">{{address1}}出发</div>
			<div class="zmiti-address2">{{address2}}到达</div>
		</h1>
		
		<div class="zmiti-help-text">我与父母的距离，只差你的助攻</div>
		<div class="zmiti-invite"><img :src="imgs.invite" alt=""></div>

		<div class="zmiti-help-money">
			<h2>团圆基金,助你圆梦</h2>
			<span>(新华社新媒体中心提供）</span>
		</div>

		<div class="zmiti-share-text">
			将此页面分享给好友，邀请好友为你积累里程，缩短你与父母间的距离，有机会获得新华社新媒体中心为你提供的团圆基金。
		</div>

		<div class="zmiti-logo">
			<img :src='imgs.logo' alt="" />
			新华社新媒体中心
		</div>
	</div>
</template>
<script>
	import './css/result.css';
	import imgs from './assets.js'
	export default {
		name:'zmiti-result',
		props:['show','address1','address2','mobile'],
		data(){
			return {
				imgs
			}
		},
		methods:{

		},
		mounted(){

		}
	}
</script>