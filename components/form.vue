<template>
	<div v-if='show' class=" zmiti-form" :style='{height:viewH+"px"}' ref='zmiti-form'>
		<div :style="{background:' url('+imgs.formBg+') no-repeat center top',backgroundSize:'cover',padding:'0 0 1rem 0'}">
			<img :src='imgs.title' alt="" class="zmiti-title">
			<div class="zmiti-form-main-ui">
				<div class="zmiti-form-C">
					<div class="zmiti-form-item">
						<div :style='lineStyle'>
							<span><label>*</label>姓名</span>
							<input v-model='ajaxData.username' type="text" name=""/>
						</div>
						<div :style='lineStyle' class="zmiti-sex">
							<span><label>*</label>性别</span>
							<span>{{ajaxData.sex===-1?'':ajaxData.sex*1?'男':'女'}}</span>
							<select v-model='ajaxData.sex'>
								<option value="1">男</option>
								<option value="0">女</option>
							</select>
						</div>
					</div>

					<div class="zmiti-form-item">
						<div :style='lineStyle'>
							<span><label>*</label>民族</span>
							<input type="text" name="" v-model='ajaxData.nation'/>
						</div>
						<div :style='lineStyle' class="zmiti-userage">
							<span><label>*</label>年龄</span>
							<input type="text" name="" v-model='ajaxData.userage'/>
						</div>
					</div>

					<div class="zmiti-form-item1">
						<div>
							<span><label>*</label>孩子居住地(省、县)</span>
						</div>
					</div>
					<div class="zmiti-form-item zmiti-city">
						<div :style="lineStyle">
							<div>
								<section class="zmiti-pro">{{pros1}}</section>
								<span>省</span>
								<select @change='selectedPro1' >
									<option v-for='p in province1' :value='p.label'>{{p.label}}</option>
								</select>
							</div>
							
							<div>
								<section class="zmiti-pro">{{city1}}</section>
								<span>市</span>
								<select @change='getAddress1' >
									<option v-for='p in citys1' :value='p.label'>{{p.label}}</option>
								</select>
							</div>
						</div>
					</div>

					<div class="zmiti-form-item2">
						<div :style='lineStyle'>
							<span><label>*</label>手机联系方式</span>
							<input type="text" name="" v-model='ajaxData.mobile'/>
						</div>
					</div>
					<div class="zmiti-form-item2">
						<div :style='lineStyle'>
							<span><label>*</label>目前监护人</span>
							<input type="text" name="" v-model='ajaxData.gname'/>
						</div>
					</div>

					<div class="zmiti-form-item2">
						<div :style='lineStyle'>
							<span><label>*</label>就读学校</span>
							<input type="text" name="" v-model='ajaxData.schoolname'/>
						</div>
					</div>

					<div class="zmiti-form-item1">
						<div>
							<span><label>*</label>父母现工作地(省、县)</span>
						</div>
					</div>
					<div class="zmiti-form-item zmiti-city">
						<div :style="lineStyle">
							<div>
								<section class="zmiti-pro">{{pros2}}</section>
								<span>省</span>
								<select @change='selectedPro2'>
									<option v-for='p in province2' :value='p.label'>{{p.label}}</option>
								</select>
							</div>
							
							<div>
								<section class="zmiti-pro">{{city2}}</section>
								<span>市</span>
								<select @change='getAddress2' >
									<option v-for='p in citys2' :value='p.label'>{{p.label}}</option>
								</select>
							</div>

							
						</div>


					</div>

					<div class="zmiti-form-item2">
						<div >
							<div><img :src='imgs.sm'/></div>
							<textarea placeholder="来说说你的故事和愿景吧" v-model='ajaxData.content'></textarea>
						</div>
					</div>
					<div class="zmiti-tip">您填写的信息我们为您保密！</div>

					<div class="zmiti-submit-info" @touchend='submitInfo'><img :src='imgs.submitInfo' /></div>

					<div class="zmiti-condition">
						<h2>条件</h2>
						<ul>
							<li>1、生活在贫困地区或者家庭贫困的</li>
							<li>2、2018年春节想去城里与父母团圆的</li>
							<li>3、正就读小学和初中的留守儿童</li>
						</ul>
					</div>


					<div class="zmiti-logo-xc">
						支持：携程
						<img :src='imgs.xc' alt="" />
					</div>
				</div>
			</div>
		</div>
		<Toast :msg='showToastMsg'></Toast>
	</div>
</template>

<script>
	import './css/form.css';
	import imgs from './assets.js';
	import IScroll from 'iscroll';
	import $ from 'jquery';
	import Toast from './toast.vue';
	import zmitiUtil from './methods.js'
	export default {
		props:['show','obserable'],
		name:'zmiti-form',
		components:{
			Toast
		},
		data(){
			return {
				imgs, 
				showToastMsg:'',
				viewH:document.documentElement.clientHeight,
				lineStyle:{
					 background:'url('+imgs.line+') no-repeat center bottom'
				},
				province1:[],
				province2:[],

				citys1:[],
				citys2:[],

				pros1:'',
				city1:'',

				pros2:'',
				city2:'',
				ajaxData:{
					username:'',
					hymn:0,
					classid:0,
					sort:1,
					sex:-1,
					userage:'',
					nation:'',
					address1:'',
					address2:'',
					gname:'',
					mobile:'',
					content:"",
					worksclassid:2,//征集留守儿童的h5
					schoolname:'',
				}
			}	
		},
		methods:{
			selectedPro1(e){
				this.pros1 = e.target.value;
				this.province1.forEach((p,i)=>{
					if(this.pros1 === p.label){
						this.citys1 = p.children;

						this.city1 = this.citys1[0].label; 
						this.address1 = this.city1;
						this.ajaxData.address1 = this.address1;
						//this.city1 = p.label;
						return 0;
					}
				})
			},
			selectedPro2(e){
				this.pros2 = e.target.value;
				this.province2.forEach((p,i)=>{
					if(this.pros2 === p.label){
						this.citys2 = p.children;
						this.city2 = this.citys2[0].label; 
						this.address2 = this.city2;
						this.ajaxData.address2 = this.address2;
						//this.city1 = p.label;
						return 0;
					}
				})
			},

			getAddress1(e){
				this.city1 = e.target.value;
				this.address1 = this.city1;
				this.ajaxData.address1 = this.address1;

			},
			getAddress2(e){
				this.city2 = e.target.value;
				this.address2 = this.city2;
				this.ajaxData.address2 = this.address2;
			},

			changeURLPar: function(url, arg, val) {
				var pattern = arg + '=([^&]*)';
				var replaceText = arg + '=' + val;
				return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
			},
			submitInfo(){
				var s = this;


				
				if(!s.ajaxData.username){
					this.showToast('请填写姓名');
					return;
				}
				
				if(!s.ajaxData.userage){
					this.showToast('请填写孩子年龄');
					return;
				}
				if(!s.ajaxData.nation){
					this.showToast('请填写民族');
					return;
				}
				if(!s.ajaxData.schoolname){
					this.showToast('请填写就读学校');
					return;
				}
				if(s.ajaxData.sex === -1){
					this.showToast('请填写性别');
					return;
				}

				var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/

				if(!reg.test(s.ajaxData.mobile)){
					this.showToast('请填写正确的手机号');
					return;
				}
				if(!s.ajaxData.content){
					s.ajaxData.content  = '无'
				}
				$.ajax({
					url:window.protocol + '//api.zmiti.com/v2/h5/add_question/',
					type:'post',
					data:s.ajaxData,
					error(){
					}
					}).done((data)=>{
						
						if(data.getret === 0){
							s.showToast();
							/*url = zmitiUtil.changeURLPar(url,'address1',encodeURI(s.ajaxData.address1));
							url = zmitiUtil.changeURLPar(url,'qid',data.qid);
							url = zmitiUtil.changeURLPar(url,'address2',encodeURI(s.ajaxData.address2));*/
							
							setTimeout(()=>{
								$('.iScrollLoneScrollbar').hide();
								s.$emit('entry',s.ajaxData.address1,s.ajaxData.address2,s.ajaxData.mobile);
								
								s.obserable.trigger({
									type:'setAddress',
									data:{
										address1:s.ajaxData.address1,
										address2:s.ajaxData.address2,
										mobile:s.ajaxData.mobile
									}
								});

								var URI = window.location.href.split('#')[0];
								URI = zmitiUtil.changeURLPar(URI,'mobile',encodeURI(s.ajaxData.mobile))
								URI = zmitiUtil.changeURLPar(URI,'address1',encodeURI(s.ajaxData.address1))
								URI = zmitiUtil.changeURLPar(URI,'address2',encodeURI(s.ajaxData.address2))
								URI = zmitiUtil.changeURLPar(URI,'qid',data.qid);

								zmitiUtil.wxConfig('我与父母的距离，就差你的助攻','1人为我与父母春节团聚缩短了1公里，期待你的助攻',URI)
								
							},2000)				

						}
				})
		    },
		    showToast(msg='提交成功！！！',time=2000){
		    	this.showToastMsg = msg;
				setTimeout(()=>{
					this.showToastMsg = '';
				},time)
		    },
			fillCitys(){
				$.ajax({
					url:window.protocol+'//api.zmiti.com/v2/share/get_citylist/',
					type:"post",

				}).done(data=>{
					if(data.getret === 0 ){
						
						if(data.list){

							this.province1 =  data.list[0].children;
							this.province2 =  data.list[0].children;
							this.city1 = this.province1[0].children[0].label;
							this.pros1 = this.province1[0].label;

							this.city2 = this.province1[0].children[0].label;
							this.pros2 = this.province1[0].label;

							this.ajaxData.address1 = this.province1[0].children[0].label;
							this.ajaxData.address2 = this.province1[0].children[0].label;
						}
					}
				})
			}

		},
		
		mounted(){

			this.fillCitys()
			
			var {obserable} = this;
			obserable.on('entryForm',()=>{
				setTimeout(()=>{

					var scroll = new IScroll(this.$refs['zmiti-form'],{scrollbars:true});
					this.scroll = scroll;
					
					setTimeout(()=>{
						scroll.refresh();
					},1000)
				},100)
			});
			
						


		}
	}
</script>
