<template>
	<div v-if='show' class="lt-full" :style="{background: 'url('+imgs.result+') no-repeat center top',backgroundSize:'cover',position:'fixed'}">
		<h1 class="zmiti-fill-height">
			
			<div class="zmiti-address1">{{address1}}出发</div>
			<div class="zmiti-address2">{{address2}}到达</div>
		</h1>
		
		<div class="zmiti-help-text">我与父母的距离，只差你的助攻</div>
		<div class="zmiti-invite" @touchstart='showMask=true'><img :src="imgs.invite" alt=""></div>

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

		<div v-if='showMask' @touchstart='showMask=false' class="zmiti-mask">
			<img :src='imgs.arrow'/>
		</div>
	</div>
</template>
<script>
	import './css/result.css';
	import imgs from './assets.js'
	export default {
		name:'zmiti-result',
		props:['show','obserable'],
		data(){
			return {
				imgs,
				showMask:false
			}
		},
		methods:{

		},
		mounted(){
			this.obserable.on('setAddress',(data)=>{
				this.address1 = data.address1;
				this.address2 = data.address2;
				this.mobile = data.mobile;
			})
		}
	}
</script>

<style>
	.zmiti-mask{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background: rgba(0,0,0,.5);
	}
	.zmiti-mask img{
		width: 5rem;
		position: absolute;
		right: 0;
		top: 0;
	}
</style>