<template>
  <div class="home">
    注册
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-link to="/product/fixed">定期</router-link>
    <router-link to="/product/current">活期</router-link>
    <router-link to="/product/fund">基金</router-link>
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" />
    <button @click="onClick">Geetest</button>
    <div @click="$router.push({name:'country',params:{fromPath:'home'}})">country</div>
    <router-link to="/unLoginHome">未登录业主页</router-link>
    <br />
    <router-link to="/registerHome">注册业主页</router-link>
    <br />
    <router-link to="/loginHome">登陆页主页</router-link>
    <router-link to="/product/fund/subscribe/1">基金认证页面</router-link>
    <router-link to="/product/fund/result">基金认证结果</router-link>
    <router-link to="/passwordConfig">密码设置</router-link>
    <br />
    <router-link :to="{ path: '/passwordconfig/set/tradepassword', query : {fillPath:'/'} }">设置交易密码</router-link>
    <br />
    <SendCode ref="sendCode" />
    <br />
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
      show: false,
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
