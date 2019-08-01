<template>
  <div class="home">
    <router-link to="/login">登录</router-link><br/>
    <router-link to="/register">注册</router-link><br/>
    <router-link to="/product/fixed">定期</router-link><br/>
    <router-link to="/product/current">活期</router-link><br/>
    <router-link to="/product/fund">基金</router-link><br/>
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" /><br/>
    <button @click="onClick">Geetest</button><br/>
    <div @click="$router.push({name:'country',params:{fromPath:'home'}})">country</div><br/>
    <router-link to="/unLoginHome">未登录业主页</router-link><br/>
    <router-link to="/registerHome">注册业主页</router-link><br/>
    <router-link to="/loginHome">登陆页主页</router-link><br />
    <SendCode @onsend="onSend" ref="sendCode" :sendTime="5" /><br />
    <SendCode />
  </div>
</template>

<script>
import SendCode from '@component/SendCode.vue';
import Geetest from '../../components/Geetest.vue';

export default {
  name: 'home',
  components: {
    Geetest,
    SendCode,
  },
  data() {
    return {
      geetest: null,
      options: null,
    };
  },
  mounted() {
    this.$refs.sendCode.onClick();
  },
  methods: {
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      this.options = options;
    },
    onError() { },
    onClick() {
      this.geetest.verify();
    },
    onSend() {
      console.log('发送');
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-size: 18px;
}
</style>
