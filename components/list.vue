<template>
	<div v-if='show' class=" lt-full " :style='{height:viewH+"px"}'>
		<div ref='list' class="zmiti-list-main-ui lt-full" :style='{height:viewH+"px",overflow:"hidden"}'>
			<div>
				<img :src='imgs.listtop' />
				<ul>
					<li v-for='item in list' :style="{background: 'url('+imgs.line+') no-repeat center bottom'}">
						<h3>{{item.username}}</h3>
						<div class="zmiti-address">
							<span>{{item.address1}}</span>
							<img :src="imgs.aw" alt="">
							<span>{{item.address2}}</span>
						</div>
						<div class="zmiti-remark">
							{{item.content}}
						</div>
					</li>
				</ul>
				<div @touchend='loadmore' class="zmiti-load-more">{{loadText}}</div>
			</div>
		</div>
		<img @click="closeList" :src='imgs.back' class="zmiti-back" />
	</div>
</template>

<script>
	import './css/list.css';
	import $ from 'jquery';
	import IScroll from 'iscroll';
	import imgs from './assets.js';

	export default {
		props:['obserable'],
		name:'zmitiList',
		data(){
			return {
				loadText:'加载更多...',
				show:false,
				page:1,
				loaded:false,
				pagenum:20,
				viewH:document.documentElement.clientHeight,
				imgs,
				list:[]
			}
		},
		methods:{
			loadmore(){//加载更多
				if(!this.loaded){
					this.page++;
					this.load();
				}
			},
			closeList(){
				this.show = false;
			},
			load(){
				this.loadText = '加载中...'
				$.ajax({
					url:window.protocol+'//api.zmiti.com/v2/h5/select_list',
					type:'post',
					data:{
						status:1,
						worksclassid:2,
						page:this.page,
						pagenum:this.pagenum
					}
				}).done(data=>{
					if(data.getret === 0){
						//this.list =  data.list.concat(data.list);
						data.list.forEach((item,i)=>{
							this.list.push(item);
						})
						
						this.loadText = '加载更多...';
						if(this.list.length>= data.total){
							this.loaded = true;//没有更多数据了
							this.loadText = '没有数据了'
						}
						!this.scroll &&	(this.scroll = new IScroll(this.$refs['list']))
						
						setTimeout(()=>{
							this.scroll.refresh()
						},1000)
					}
				})
			}
		},
		mounted(){
			var {obserable} = this;

			obserable.on('fillList',e=>{
				this.load();
			});

			obserable.on('toggleList',(data)=>{
			 	this.show = data;
			 	if(data){
			 		obserable.trigger({
						type:'fillList'
					})
			 	}
			})

			
		}
	}
</script>