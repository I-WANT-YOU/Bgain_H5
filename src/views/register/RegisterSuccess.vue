<template>
  <div class="register-success">
    <Header></Header>
    <div class="con">
      <div class="imageStyle">
        <img alt="." src="../../assets/images/registerSuccess.svg" />
      </div>
      <div class="success-tips">
        <span>注册成功</span>
      </div>
      <div class="info">
        <span>为了保证您在平台交易的资金安全</span>
        <span>还需完成KYC身份认证</span>
      </div>
      <div class="continue-button">
        <button @click="onKyc">继续身份验证</button>
      </div>
      <div class="goToNext">
        <a @click="onHome">跳过此步，先去浏览平台产品</a>
        <img alt="." src="../../assets/images/blue_next.svg" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import Footer from '../../components/Footer.vue';
import Header from '../../components/Header.vue';

export default {
  name: 'RegisterSuccess',
  components: {
    Header,
    Footer,
  },
  methods: {
    onKyc() {
      window._czc.push(['_trackEvent', 'click', '注册成功-继续身份验证']);
      this.$router.push({ path: '/mine/safety/kyc', query: { fromPath: 'register' } });
    },
    onHome() {
      window._czc.push(['_trackEvent', 'click', '注册成功-前往首页']);
      this.$router.push('/product/fund');
    },
  },
};

</script>

<style lang='scss' scoped>
.register-success {
  height: 100%;
  display: flex;
  flex-direction: column;
  .con {
    flex: 1;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      font-family: PingFangSC-Semibold sans-serif;
      letter-spacing: 0;
    }
    .imageStyle {
      height: 78px;
      margin-top: 35px;
      > img {
        width: 73px;
        height: 75px;
      }
    }
    .success-tips {
      margin-top: 16px;
      height: 25px;
      > span {
        font-size: 18px;
        color: #333333;
        font-weight: 600;
      }
    }
    .info {
      height: 40px;
      margin-top: 25px;
      font-size: 13px;
      color: #797979;
      flex-direction: column;
      > span {
        text-align: center;
        line-height: 20px;
      }
    }
    .continue-button {
      margin-top: 33px;
      height: 46px;
      > button {
        width: 331px;
        background: #3c64ee;
        border-radius: 4px;
        font-size: 16px;
        color: #ffffff;
        border: none;
      }
    }
    .goToNext{
      /*height: 24px;  */
      margin-top:51px;
      display:flex;
      align-items: center;
      justify-content: center;
      > a {
        text-decoration-line: none;
        font-size: 14px;
        color: #3c64ee;
        text-align: center;
      }
      > img {
        color: #3c64ee;
        margin-left: 5.5px;
      }
    }
  }
}
</style>
