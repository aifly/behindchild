import Vue from "vue";
import Main from './components/main.vue'
import Form from './components/form.vue'
import Result from './components/result.vue'
import Share from './components/share.vue'
//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	data() {
		return {
			showMain: false,
			showForm: true,
			showResult: false,
			showShare: false,
			mobile: '',
			address1: '',
			address2: ''
		}
	},
	template: `
		<div>
			<Main :show='showMain'></Main>
			<Form :show='showForm'></Form>
			<Result :show='showResult'></Result>
			<Share :mobile='mobile' :address1='address1' :address2='address2' :show='showShare'></Share>
		</div>
	`,
	components: {
		Main,
		Form,
		Result,
		Share
	},
	methods: {
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return (r[2]);
			return null;
		},
		changeURLPar: function(url, arg, val) {
			var pattern = arg + '=([^&]*)';
			var replaceText = arg + '=' + val;
			return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
		},
		isWeiXin: function() {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		},
	},
	mounted() {
		var mobile = this.getQueryString('mobile');
		var address1 = this.getQueryString('address1');
		var address2 = this.getQueryString('address2');

		this.mobile = mobile;
		this.address1 = decodeURI(address1);
		this.address2 = decodeURI(address2);

		var isShare = mobile && address1 && address2;

		//this.showMain = !isShare;
		//this.showShare = isShare;

	}

})