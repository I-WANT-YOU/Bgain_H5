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
    <div class="toLogin-container" v-show="userStatus === ''">
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
import { mapActions, mapState } from 'vuex';
import errorMessage from '../../constants/responseStatus';
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
    this.userStatus = this.$route.params.status;
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
  },
  methods: {
    // 触发action的方法 getRecord
    ...mapActions('user', [
      'getUserSummary',
    ]),
    ...mapActions('home', [
      'getRecord',
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
