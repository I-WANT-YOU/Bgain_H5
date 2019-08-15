<template>
  <div class="registerHome">
    <header>
      <div class="logo-img" @click="()=>{this.$router.push({name:'RegisterHome'})}">
        <svg-icon icon-class="logo" class="logo-icon"/>
      </div>
      <div class="user-img" @click="()=>{this.$router.push({name:'login'})}">
        <div>
          <svg-icon icon-class="user_write" class="user-icon" />
        </div>
        <div>
          <svg-icon icon-class="more_write" class="more-icon"/>
        </div>
      </div>
    </header>
    <!--all-->
    <HomeSwipe/>
    <!--all-->
    <div class="home-tip-container">
      <HomeTip/>
    </div>
    <!--登陆注册后有-->
    <div class="notice-container" v-show="userStatus === 'login'">
      <HomeNotice/>
    </div>
    <!--注册后信息不全有-->
    <div class="guide-container" v-show="guideStatus">
      <HomeGuide
        :kyc_status= "kyc_status"
        :setPassword ="setPassword"
        :record ="record"
      />
    </div>
    <!--未登录有-->
    <div class="toLogin-container" v-show="userStatus === 'unLogin'">
      <HomeToLogin/>
    </div>
     <!--信息列表-->
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
import { mapActions, mapState } from 'vuex';
import errorMessage from '../../constants/responseStatus';
import HomeSwipe from './components/HomeSwipe.vue';
import HomeTip from './components/HomeTip.vue';
import HomeGuide from './components/HomeGuide.vue';
import HomeProductList from './components/HomeProductList.vue';
import HomeMoreProducts from './components/HomeMoreProducts.vue';
import HomeNotice from './components/HomeNotice.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import HomeToLogin from './components/HomeToLogin.vue';

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
      kyc_status: 0, // 是否身份认证
      setPassword: 0, // 是否设置了交易密码
      record: 0, // 是否有充值记录
      guideStatus: false, // 新手引导
    };
  },
  computed: {
    ...mapState('user', [
      'basicInfo',
    ]),
    ...mapState('home', [
      'recordList',
    ]),
  },
  mounted() {
    // 判断用户是否登陆
    if (!localStorage.getItem('access_token')) { // 未登录
      this.userStatus = 'unLogin';
    } else {
      this.userStatus = 'login';
    }
    // 用户登陆 验证用户信息
    if (this.userStatus === 'login') {
      Promise.all([this.getRecord(), this.getUserSummary()]).then(
        () => {
          // 是否有充值记录
          if (this.recordList.wallet_record_list.length !== 0) {
            this.record = 1;
          } else {
            this.record = 0;
          }
          // 判断用户是否身份认证
          if (this.basicInfo.kyc_stauts === 'UN_CERTIFIED') { // 未认证
            this.kyc_status = 0;
          } else {
            this.kyc_status = 1;
          }
          // 判断用户是否设置了支付密码
          if (this.basicInfo.authlevel === '2') { // 未认证
            this.setPassword = 1;
          } else if (this.basicInfo.authlevel === '1') {
            this.setPassword = 0;
          }
          if (this.record && this.kyc_status && this.setPassword) {
            this.guideStatus = false;
          } else {
            this.guideStatus = true;
          }
        },
        // 登陆用户
        (err) => {
          if (err.status) {
            this.$toast(errorMessage[err.status]);
          } else {
            this.$toast('网络错误');
          }
        },
      );
    }
  },
  methods: {
    // 触发action的方法 getRecord
    ...mapActions('user', [
      'getUserSummary',
    ]),
    ...mapActions('home', [
      'getRecord',
      'getAllHomeInfo',
    ]),
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
      background-color: #3C64EE;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo-img{
        padding-left: 22.5px;
        .logo-icon{
          width: 71.5px;
          height: 22px;
        }
      }
      .user-img{
        display: flex;
        align-items: center;
        >div{
          display: flex;
          align-items: center;
        }
        >div:nth-child(1){
          margin-right: 16px;
        } >div:nth-child(2){
            margin-right: 22px;
          }
        .user-icon{
          width: 17px;
          height: 16px;
        }
        .more-icon{
          width: 16px;
          height: 14px;
        }
      }

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
