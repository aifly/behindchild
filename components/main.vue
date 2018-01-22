<template>
  	  <section v-if='show' class="zmiti-main-ui lt-full" :style="{background:'url('+imgs.bg+') no-repeat center bottom',backgroundSize: 'cover'}">
  	  		<!-- <input type="text" class="zmiti-username" v-model='ajaxData.username' placeholder="请输入姓名" />
                    <input type="text" class="zmiti-userage" placeholder="请输入年龄" v-model='ajaxData.userage' />
                    <input type="text" class="zmiti-nation" placeholder="输入民族" v-model='ajaxData.nation' />
                    <input type="radio" name="sex" checked="ajaxData.sex" v-model='ajaxData.sex'>男
                    <input type="radio" name="sex" checked="ajaxData.sex" v-model='ajaxData.sex'>女
                    <input type="text" placeholder="孩子居住地/省县" v-model='ajaxData.address1'/>
                    <input type="text" placeholder="父母居住地/省县" v-model='ajaxData.address2' />
                    <input type="text" placeholder="监护人姓名" v-model='ajaxData.gname'/>
                    <input type="text" placeholder="手机联系方式" v-model='ajaxData.mobile' />
                    <input type="text" placeholder="就读学校" v-model='ajaxData.schoolname'/>
                    <input type="text" placeholder="备注" v-model='ajaxData.content' >
                    <div @click='submitInfo'>提交</div> -->
          
          <img :src='imgs.logo' class="zmiti-logo-index" />
          <img :src='imgs.text' class="zmiti-text" />
          <img :src='imgs.zhengji' class="zmiti-zhengji" />
          <img :src='imgs.t1' class="zmiti-t1" />
          <img @click='entryForm' :src='imgs.entry' class="zmiti-entry" />
          <div @click='lookMore' class="zmiti-look">查看更多梦想</div>
  	  </section>
</template>

<script>
import './css/main.css';
import $ from 'jquery';
import imgs from './assets.js'
export default {
  props:['show','obserable'],
  name: 'index',
  data(){
  	return {
       qid:-1,
       imgs,
  		 ajaxData:{
          
       }

  	}
  },
  methods:{
    entryForm(){
      this.$emit('entryForm');
      this.obserable.trigger({
        type:'entryForm'
      })
    },
    lookMore(){
      var {obserable} = this;
      obserable.trigger({
        type:'toggleList',
        data:true
      })
    },
    clickHymn(){//点赞

      var qid = this.getQueryString('qid'),
          num = 0;
      $.ajax({
        type:'post',
        url:window.protocol+'//api.zmiti.com/v2/h5/click_hymn/',
        data:{
          qid,
          num
        }
      })

    }
  },
  mounted(){


    //this.$dest();

  },
  components: {
  	 
  }
}
</script>

