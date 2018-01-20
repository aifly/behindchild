<template>
	<div ref='share' v-if='show' class="lt-full zmiti-share-main-ui" :style='{height:viewH+"px",overflow:"hidden",position:"fixed"}' >
		<div :style="{minHeight:viewH+'px',background: 'url('+imgs.share+') no-repeat center top',backgroundSize:'cover'}">
			<Toast :msg='showToastMsg'></Toast>
			<h1 class="zmiti-fill-height">
				<div class="zmiti-dis">-{{km}}km</div>
				<div class="zmiti-address1">{{address1}}出发</div>
				<div class="zmiti-address2">{{address2}}到达</div>
			</h1>
		
			<div class="zmiti-help-text">我与父母的距离，只差你的助攻</div>
			
			<div v-if='!beginHelp' style="height:2rem;border:1px solid transparent;">
				<div class="zmiti-help-num">
					已经有<span>{{count}}</span>人为TA助攻
				</div>
				<div class="zmiti-help-km">
					共缩短<span>{{km}}</span>km里程
				</div>
			</div>
			<div v-if='beginHelp' class="zmiti-seal">
				<img :src='imgs.seal'/>
				<div>{{helpDis}}</div>
			</div>
			<div class="zmiti-help-btn" @touchend='helpChild'>
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

			<div class="zmiti-restart">
				<a href='./'><img :src='imgs.restart'></a>
			</div>

			<div class="zmiti-logo1">
				<img :src='imgs.logo1'>
			</div>
		</div>
		
	</div>
</template>
<script>
	import './css/share.css';
	import imgs from './assets.js';
	import $ from 'jquery';
	import Toast from './toast.vue';
	import IScroll from 'iscroll'
	export default {
		name:'zmiti-result',
		props:['show','mobile','address1','address2','qid'],
		data(){
			return {
				showToastMsg:'',
				viewH:document.documentElement.clientHeight,
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
					
				]
			}
		},
		components:{
			Toast
		},
		methods:{
			showToast(msg='助力成功！！！',time=2000){
		    	this.showToastMsg = msg;
				setTimeout(()=>{
					this.showToastMsg = '';
				},time)
		    },
			helpChild(){

				if(this.beginHelp){
					this.showToast('您已经为TA助攻过啦');
					return;
				}
				this.beginHelp = true;

				this.timer = setInterval(()=>{

					var index = (Math.random()*this.helpClassify.length)|0;
					this.helpDis = this.helpClassify[index].dis;
					this.level = index;

				},100);

				setTimeout(()=>{
					clearInterval(this.timer);
					var s = this;
					$.ajax({
						type:'post',
						url:window.protocol+'//api.zmiti.com/v2/h5/add_helpchild',
						data:{
							qid:s.qid,
							dis:s.helpDis,
							worksclassid:2,
							openid:window.openid,
							headimgurl:window.headimgurl,
							nickname:window.nickname,
							level:s.level,
							mobile:s.mobile

						}
					}).done((data)=>{
							console.log(data)
						if(data.getret === 0){
							this.showToast();

							this.helpList.push({
								headimg:window.headimgurl||imgs.logo,
								nickname:window.nickname||'新华社网友',
								level:s.level
							});

							setTimeout(()=>{
								s.scroll.refresh();
							},100)


						}
					})
				},2000)
			},
			getHelpList(){
				var s = this;
				$.ajax({
					type:'post',
					url:window.protocol+'//api.zmiti.com/v2/h5/select_helpchild',
					data:{
						qid:s.qid
					},


				}).done(data=>{
					if(data.getret === 0){
						console.log(data);
						this.helpList.length = 0;
						this.count = data.totalnum*1;
						this.km = data.totaldis*1;
						
						data.list.forEach((list,i)=>{

							this.helpList.push({
								headimg:list.headimgurl||imgs.logo,
								nickname:list.nickname||'新华社网友',
								level:list.level
							});


						})
					}
				})
			}
		},
		mounted(){
			setTimeout(()=>{

				if(this.qid && this.mobile && this.address1 && this.address2){

					this.getHelpList();
					this.scroll = new IScroll(this.$refs['share'],{scrollbars:true});
							
					setTimeout(()=>{
						this.scroll.refresh();
					},1000)
				}
			},10)
		}
	}
</script>