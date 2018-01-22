import Vue from "vue";
import Main from './components/main.vue'
import Form from './components/form.vue'
import Result from './components/result.vue'
import Share from './components/share.vue'
import List from './components/list.vue'
import Obserable from './components/obserable.js';
import zmitiUtil from './components/methods.js'
import $ from 'jquery';
var obserable = new Obserable();
//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	data() {
		return {
			showMain: false,
			showForm: false,
			showResult: false,
			showShare: false,
			showList: true,
			mobile: '',
			address1: '',
			rotate: false,
			address2: '',
			qid: '',
			play: './assets/images/play.png',
			music: './assets/music/bg-1.mp3',
			obserable
		}
	},
	template: `
		<div>
			<Main :obserable='obserable' @entryForm='entryForm' :show='showMain'></Main>
			<Form :obserable='obserable' @entry='entryResult' :show='showForm'></Form>
			<Result :obserable='obserable' :mobile='mobile' :qid='qid' :address1='address1' :address2='address2' :show='showResult'></Result>
			<List :obserable='obserable'  :show='showList'></List>
			<Share :obserable='obserable' :mobile='mobile' :qid='qid' :address1='address1' :address2='address2' :show='showShare'></Share>
			<audio :src='music' autoplay ref='audio' loop></audio>
			<div @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}'>
				<img :src='play'/>
			</div>
		</div>
	`,
	components: {
		Main,
		Form,
		Result,
		Share,
		List
	},
	methods: {
		entryForm() {
			this.showMain = false;
			this.showForm = true;
		},
		entryResult(address1, address2, mobile) {

			this.address1 = address1;
			this.address2 = address2;
			this.mobile = mobile;
			this.showMain = false;
			this.showResult = true;
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		}

	},
	created() {
		//zmitiUtil.getOauthurl();
	},
	mounted() {
		var mobile = zmitiUtil.getQueryString('mobile');
		var address1 = zmitiUtil.getQueryString('address1');
		var address2 = zmitiUtil.getQueryString('address2');
		var qid = zmitiUtil.getQueryString('qid');
		this.mobile = mobile;
		this.address1 = decodeURI(address1);
		this.address2 = decodeURI(address2);
		this.qid = decodeURI(qid);

		var isShare = mobile && address1 && address2;

		this.showMain = !isShare;
		this.showShare = isShare;

		zmitiUtil.wxConfig('为你圆梦', '@留守儿童 新华社喊你来许愿！有机会得团圆基金哦')



		if (this.showShare) {
			zmitiUtil.getOauthurl();
		}

		$(this.$refs['audio']).on('play', () => {
			this.rotate = true;
		}).on('pause', () => {
			this.rotate = false;
		});

		this.$refs['audio'].play();
		var s = this;
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				s.$refs['audio'].play();
			});
		}, false);

		var i = 0;
		$(document).one('touchstart', (e) => {
			if (i === 0) {
				this.$refs['audio'].play();
				i++;
			}
		})
	}

})

Vue.prototype.$dest = () => {
	console.log(123);
}