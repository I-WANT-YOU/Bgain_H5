<template>
  <div class="registerHome">
    <header>
      这是头部
    </header>
    <!--all-->
    <HomeSwipe/>
    <!--all-->
    <div class="home-tip-container">
      <HomeTip/>
    </div>
    <!--登陆注册后有-->
    <div class="notice-container" v-show="userStatus === 'login' || userStatus === 'register'">
      <HomeNotice/>
    </div>
    <!--注册后信息不全有-->
    <div class="guide-container" v-show="userStatus === 'register'">
      <HomeGuide/>
    </div>
    <!--未登录有-->
    <div class="toLogin-container" v-show="userStatus === 'unLogin'">
      <HomeToLogin/>
    </div>
    <div class="list-container">
      <HomeProductList/>
    </div>
    <div class="more-products-container">
      <HomeMoreProducts/>
    </div>
    <div class="footer">
      <BaseFooter/>
    </div>
  </div>
</template>

<script>
import HomeSwipe from '../../components/home/HomeSwipe.vue';
import HomeTip from '../../components/home/HomeTip.vue';
import HomeGuide from '../../components/home/HomeGuide.vue';
import HomeProductList from '../../components/home/HomeProductList.vue';
import HomeMoreProducts from '../../components/home/HomeMoreProducts.vue';
import HomeNotice from '../../components/home/HomeNotice.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import HomeToLogin from '../../components/home/HomeToLogin.vue';

export default {
  name: 'RegisterHome',
  components: {
    HomeSwipe,
    HomeTip,
    HomeToLogin,
    HomeProductList,
    HomeMoreProducts,
    HomeGuide,
    HomeNotice,
    BaseFooter,
  },
  data() {
    return {
      userStatus: '',
    };
  },
  mounted() {
    this.userStatus = this.$route.params.status;
  },
};
</script>

<style lang="scss" scoped>
  .registerHome{
    font-family: PingFangSC-Semibold sans-serif;
    letter-spacing: 0;
    text-align: center;
    /*头部*/
    >header{
      width: 100%;
      height: 49px;
      line-height: 49px;
      background-color: rebeccapurple;
      text-align: center;
    }
    .home-tip-container{
      margin-top: 17px;
      display: flex;
      justify-content: center;
    }
    .notice-container{
      margin-top: 35px;
    }
    .toLogin-container{
      margin-top: 15px;
    }
    .guide-container{
      margin-top:18px;
    }
    .list-container{
      margin-top: 20px;
      width: 100%
    }
    .more-products-container{
      display: flex;
      height: 20px;
      margin-top: 21px;
      justify-content: center;
      align-items: center;
    }
    .footer{
      margin-top: 24px;
    }
  }
</style>
