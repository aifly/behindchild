import Vue from "vue";
import Main from './components/main.vue'
import Form from './components/form.vue'
import Result from './components/result.vue'
import Share from './components/share.vue'
import Obserable from './components/obserable.js';
import zmitiUtil from './components/methods.js'
var obserable = new Obserable();
//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	data() {
		return {
			showMain: true,
			showForm: false,
			showResult: false,
			showShare: false,
			mobile: '',
			address1: '',
			address2: '',
			qid:'',
			obserable
		}
	},
	template: `
		<div>
			<Main :obserable='obserable' @entryForm='entryForm' :show='showMain'></Main>
			<Form :obserable='obserable' @entry='entryResult' :show='showForm'></Form>
			<Result :obserable='obserable' :mobile='mobile' :qid='qid' :address1='address1' :address2='address2' :show='showResult'></Result>
			<Share :obserable='obserable' :mobile='mobile' :qid='qid' :address1='address1' :address2='address2' :show='showShare'></Share>
		</div>
	`,
	components: {
		Main,
		Form,
		Result,
		Share
	},
	methods: {
		entryForm(){
			this.showMain = false;
			this.showForm = true;
		},
		entryResult(address1,address2,mobile){

			this.address1 = address1;
			this.address2 = address2;
			this.mobile = mobile;
			this.showMain = false;
			this.showResult = true;
		},
		
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


		

	}

})