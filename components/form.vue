<template>
	<div v-if='show' class=" zmiti-form" :style='{height:viewH+"px"}' ref='zmiti-form'>
		<div :style="{background:' url('+imgs.formBg+') no-repeat center top',backgroundSize:'cover',padding:'1rem 0'}">
			<div class="zmiti-form-main-ui">
				<img :src='imgs.title' alt="" class="zmiti-title">
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
							<div :style='lineStyle'>
								<span><label></label>备注</span>
								<input type="text" name="" v-model='ajaxData.content'/>
							</div>
						</div>

					<div class="zmiti-submit-info" @click='submitInfo'><img :src='imgs.submitInfo' /></div>

					<div class="zmiti-condition">
						<h2>条件</h2>
						<ul>
							<li>1、生活在贫困地区或者家庭贫困的</li>
							<li>2、2018年春节想去城里与父母团圆的</li>
							<li>3、正就读小学和初中的留守儿童</li>
						</ul>
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
	export default {
		props:['show'],
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
					 background:'url(../assets/images/line.png) no-repeat center bottom'
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
					username:'小A',
					hymn:0,
					classid:0,
					sort:1,
					sex:-1,
					userage:'',
					nation:'汉',
					address1:'北京',
					address2:'湖北',
					gname:'fly',
					mobile:'15718827182',
					content:"",
					worksclassid:2,//征集留守儿童的h5
					schoolname:'北京XX小学',
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
						//this.city1 = p.label;
						return 0;
					}
				})
			},

			getAddress1(e){
				this.city1 = e.target.value;
				this.address1 = this.city1;
			},
			getAddress2(e){
				this.city2 = e.target.value;
				this.address2 = this.city2;
			},
			submitInfo(){
				var s = this;
				
				if(!s.ajaxData.content){
					s.ajaxData.content  = '无'
				}
				
				if(!s.ajaxData.userage){
					this.showToast('请填写孩子年龄');
					return;
				}
				if(!s.ajaxData.nation){
					this.showToast('请填写民族');
					return;
				}
				
				$.ajax({
					url:window.protocol + '//api.zmiti.com/v2/h5/add_question/',
					type:'post',
					data:s.ajaxData
					}).done((data)=>{
					if(data.getret === 0){
						this.showToast();
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
						}
					}
				})
			}
		},
		mounted(){

			this.fillCitys()
			var scroll = new IScroll(this.$refs['zmiti-form'],{scrollbars:true});

			setTimeout(()=>{
				scroll.refresh();
			},1000)
		}
	}
</script>
