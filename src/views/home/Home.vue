<template>
  <div class="home">
    注册
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-link to="/product/fixed">定期</router-link>
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" />
    <button @click="onClick">Geetest</button>
    <div @click="$router.push({name:'country',params:{fromPath:'home'}})">country</div>
    <router-link to="/unLoginHome">未登录业主页</router-link>
    <br />
    <SendCode @onsend="onSend" ref="sendCode" :sendTime="5" />
    <br />
    <SendCode />
  </div>
</template>

<script>
import Geetest from '../../components/Geetest.vue';
import SendCode from '@component/SendCode.vue';

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
