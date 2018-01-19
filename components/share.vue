<template>
	<div v-if='show' class="lt-full zmiti-share-main-ui" >
		<div :style="{background: 'url('+imgs.share+') no-repeat center top',backgroundSize:'cover'}">
			<h1 class="zmiti-fill-height">
				<div class="zmiti-dis">{{km}}km</div>
				<div class="zmiti-address1">{{address1}}出发</div>
				<div class="zmiti-address2">{{address2}}到达</div>
			</h1>
		
			<div class="zmiti-help-text">我与父母的距离，只差你的助攻</div>
			
			<div v-if='!beginHelp'>
				<div class="zmiti-help-num">
					已经有<span>{{count}}</span>人为TA助攻
				</div>
				<div class="zmiti-help-km">
					共缩短<span>{{scaleKm}}</span>km里程
				</div>
			</div>
			<div v-if='beginHelp' class="zmiti-seal">
				<img :src='imgs.seal'/>
				<div>{{helpDis}}</div>
			</div>
			<div class="zmiti-help-btn">
				<img :src='imgs.help' alt="">
			</div>

			<div class="zmiti-help-title">
				助攻里程帮
			</div>
			<ul class="zmiti-help-list">
				<li v-for='(item,i) in helpList'>
					<div><img :src='item.headimg'/></div>
					<div>
						<div>{{item.nickname}}</div>
						<div>{{helpClassify[item.level].content}}</div>
					</div>
					<div>
						距离 <span>-{{helpClassify[item.level].dis}}</span>km
					</div>
				</li>
			</ul>
			<div class="zmiti-help-title" style="font-size: 12px;">
				显示前10位助攻者
			</div>

			<div class="zmiti-logo1">
				<img :src='imgs.logo1'>
			</div>
		</div>
	</div>
</template>
<script>
	import './css/share.css';
	import imgs from './assets.js'
	export default {
		name:'zmiti-result',
		props:['show','mobile','address1','address2'],
		data(){
			return {
				helpClassify:[
					{
						dis:.1,
						content:'不好意思，意思意思，没别意思！'
					},{
						dis:.5,
						content:'咦，我明明带着车钥匙的，怎么不见了'
					},{
						dis:1,
						content:'哎呀，车链子掉了，下次一定送远一点'
					},{
						dis:3,
						content:'抓住了，我的车可有点颠'
					},{
						dis:8,
						content:'坐稳了，飞机即将起飞'
					}
				],
				imgs,
				helpDis:2,
				
				count:5000,
				km:-211,
				beginHelp:false,
				scaleKm:2135,
				helpList:[
					{
						headimg:imgs.logo,
						nickname:'fly',
						
						level:0
					},
					{
						headimg:imgs.logo,
						nickname:'fly',
						level:1
					},{
						headimg:imgs.logo,
						nickname:'fly',
						level:3
					},{
						headimg:imgs.logo,
						nickname:'fly',
						level:3
					},{
						headimg:imgs.logo,
						nickname:'fly',
						level:2
					},{
						headimg:imgs.logo,
						nickname:'fly',
						level:1
					},{
						headimg:imgs.logo,
						nickname:'fly',
						level:2
					}
				]
			}
		},
		methods:{

		},
		mounted(){

		}
	}
</script>