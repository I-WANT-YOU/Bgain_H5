<template>
  <div class="home">
    <router-link to="/confirmOrder">支付页面</router-link><br />
    <router-link to="/fillingRecord">冲币记录记录</router-link><br />
    <router-link to="/buyingRecord">购买记录</router-link><br />
    <router-link to="/appeal">申诉</router-link><br />
    <router-link to="/pleasePay">请付款</router-link><br />
    <router-link to="/toBeRelease">待放行</router-link><br />
    <router-link to="/purchaseCoinHome">买币冲币</router-link><br />
    <router-link to="/test">余额不足</router-link><br />
    <router-link to="/homeToLogin">tologin</router-link><br />
    <router-link to="/fixedPurchaseStepTwo">优惠券购买</router-link><br />
    <router-link to="/login">登录</router-link><br/>
    <router-link to="/register">注册</router-link><br/>
    <router-link to="/product/fixed">定期</router-link><br/>
    <router-link to="/product/current">活期</router-link><br/>
    <router-link to="/product/fund">基金</router-link><br/>
    <router-link to="/mine/safety/kyc">KYC</router-link><br/>
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" /><br/>
    <button @click="onClick">Geetest</button><br/>
    <div @click="$router.push({name:'country',params:{fromPath:'home'}})">country</div><br/>
    <router-link to="/registerHome/">----主页------</router-link><br/>
    <router-link to="/registerHome/register">注册业主页</router-link><br/>
    <router-link to="/registerHome/login">登陆页主页</router-link><br />
    <router-link to="/subscriptionResults">认购结果</router-link><br />
    <SendCode @onsend="onSend" ref="sendCode" :sendTime="5" /><br />
    <SendCode />

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
    <router-link :to="{ path: '/passwordconfig/set/tradepassword',
    query : {fillPath:'/'} }">设置交易密码</router-link>
    <br />
    <SendCode ref="sendCode" />
    <br />
    <router-link to='/mine'>我的</router-link>
  </div>
</template>

<script>
import { Loading } from 'vant';
import SendCode from '@component/SendCode.vue';
import Geetest from '../../components/Geetest.vue';

export default {
  name: 'home',
  components: {
    Geetest,
    SendCode,
    Loading,
  },
  data() {
    return {
      geetest: null,
      options: null,
      show: false,
      checked: false,
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
  .loading{
    /*width: 100vw;*/
    /*height: 100vh;*/
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0, 0, 0.2);
  }
.home {
  font-size: 18px;
}
</style>
