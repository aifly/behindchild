<template>
  	  <section v-if='show' class="zmiti-main-ui lt-full" style="background: url(../assets/images/bg.jpg) no-repeat center bottom;background-size: cover">
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

          <img :src='imgs.text' class="zmiti-text" />
          <img :src='imgs.zhengji' class="zmiti-zhengji" />
          <img :src='imgs.t1' class="zmiti-t1" />
          <img :src='imgs.t2' class="zmiti-t2" />
          <img :src='imgs.t3' class="zmiti-t3" />
          <img :src='imgs.t4' class="zmiti-t4" />
          <img :src='imgs.entry' class="zmiti-entry" />
          
  	  </section>
</template>

<script>
import './css/main.css';
import $ from 'jquery';
import imgs from './assets.js'
export default {
  props:['show'],
  name: 'index',
  data(){
  	return {
       qid:-1,
       imgs,
  		 ajaxData:{
         username:'小A',
         hymn:0,
         classid:0,
         sort:1,
         sex:0,
         userage:2,
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
    
    submitInfo(){
      var s = this;

      console.log(s.ajaxData);
      if(!s.ajaxData.content){
        s.ajaxData.content  = '无'
      }
      $.ajax({
        url:window.protocol + '//api.zmiti.com/v2/h5/add_question/',
        type:'post',
        data:s.ajaxData
      }).done((data)=>{
        console.log(data);
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
  },
  components: {
  	 
  }
}
</script>

