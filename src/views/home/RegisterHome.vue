<template>
  <div class="registerHome">
    <header>
      <div class="logo-img" @click="()=>{this.$router.push({name:'RegisterHome'})}">
        <svg-icon icon-class="logo" class="logo-icon" />
      </div>
      <div class="user-img">
        <div v-show="userStatus === 'login'" @click="onSafety">
          <svg-icon icon-class="user_write" class="user-icon" />
        </div>
        <div @click="onMenu">
          <svg-icon icon-class="more_write" class="more-icon" />
        </div>
      </div>
    </header>
    <!--all-->
    <HomeSwipe ref="my-swiper" />
    <!--all-->
    <div class="home-tip-container">
      <HomeTip   :text.sync="testData"/>
    </div>
    <!--登陆注册后有-->
    <div class="notice-container" v-show="userStatus === 'login'">
      <HomeNotice />
    </div>
    <!--注册后信息不全有-->
    <div class="guide-container" v-show="guideStatus">
    <!-- <div class="guide-container" > -->
      <HomeGuide :kyc_status="kyc_status" :setPassword="setPassword" :record="record" />
    </div>
    <!--未登录有-->
    <div class="toLogin-container" v-show="userStatus === 'unLogin'">
      <HomeToLogin />
    </div>
    <!--信息列表-->
    <div class="list-container">
      <HomeProductList />
    </div>
    <div class="footer">
      <BaseFooter />
    </div>
    <!--一级页面强制弹窗-->
    <LevelOnePop :showData="popInfo" :show="isPopShow" @close="isPopShow='none'" />
    <Menu v-model="showMenu" @close="showMenu=false"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vant';
import Menu from '@component/mine/Meun.vue';
import errorMessage from '../../constants/responseStatus';
import HomeSwipe from './components/HomeSwipe.vue';
import HomeTip from './components/HomeTip.vue';
import HomeGuide from './components/HomeGuide.vue';
import HomeProductList from './components/HomeProductList.vue';
import HomeNotice from './components/HomeNotice.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import HomeToLogin from './components/HomeToLogin.vue';
import LevelOnePop from '../../components/LevelOnePop.vue';

export default {
  name: 'RegisterHome',
  components: {
    HomeSwipe,
    HomeTip,
    HomeToLogin,
    HomeProductList,
    HomeGuide,
    HomeNotice,
    BaseFooter,
    LevelOnePop,
    Menu,
  },
  data() {
    return {
      testData: '11',
      isPopShow: 'none', // 一级弹窗
      userStatus: 'unLogin',
      kyc_status: 0, // 是否身份认证
      setPassword: 0, // 是否设置了交易密码
      record: 0, // 是否有充值记录
      guideStatus: false, // 新手引导
      showMenu: false,
      msgFormSon: false,
    };
  },
  computed: {
    ...mapState('user', [
      'basicInfo',
    ]),
    ...mapState('home', [
      'recordList',
      'popInfo',
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['my-swiper'].initSwiper();
    });
    // 用户登陆 验证用户信息 // 判断用户是否登陆
    this.isLogin().then(() => {
      this.userStatus = 'login';
      Promise.all([this.getRecord(), this.getUserSummary(), this.getPopInfo()]).then(
        () => {
          if (this.popInfo.is_popup_window === 1) {
            this.isPopShow = 'block';
          } else {
            this.isPopShow = 'none';
          }
          // 是否有充值记录
          if (this.recordList.wallet_record_list.length !== 0) {
            this.record = 1;
          } else {
            this.record = 0;
          }
          // 判断用户是否身份认证
          if (this.basicInfo.kyc_stauts.toLocaleUpperCase() === 'AUDITING') { // 审核中
            this.kyc_status = 1;
          } else if (this.basicInfo.kyc_stauts.toLocaleUpperCase() !== 'CERTIFIED') { // 未认证 || 认证失败
            this.kyc_status = 0;
          } else { // 认证成功
            this.kyc_status = 1;
          }
          // console.log(this.basicInfo.kyc_stauts);
          // 判断用户是否设置了支付密码
          // console.log(this.basicInfo.authlevel);
          if (this.basicInfo.authlevel * 1 === 2) {
            this.setPassword = 1;
          } else if (this.basicInfo.authlevel * 1 === 1) { // 未认证
            this.setPassword = 0;
          }
          if (this.record && this.kyc_status && this.basicInfo.kyc_stauts.toLocaleUpperCase() !== 'AUDITING' && this.setPassword) {
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
    }, (err) => {
      this.userStatus = 'unLogin';
      if (err && err.status) {
        Toast(errorMessage[err.status]);
      }
    });
  },
  methods: {
    test(value) {
      console.log(value);
      this.testData = 'new';
    },
    // 触发action的方法 getRecord
    ...mapActions('user', [
      'getUserSummary',
    ]),
    ...mapActions('auth', [
      'isLogin',
    ]),
    ...mapActions('home', [
      'getRecord',
      'getPopInfo',
    ]),
    // 从子组件获取参数
    getMsgFormSon(data) {
      this.msgFormSon = data;
    },
    onMenu() {
      this.showMenu = true;
    },
    onSafety() {
      this.$router.push('/mine/safety');
    },
  },
};
</script>

<style lang="scss" scoped>
.registerHome {
  font-family: PingFangSC-Semibold sans-serif;
  letter-spacing: 0;
  text-align: center;
  /*头部*/
  > header {
    width: 100%;
    height: 49px;
    background-color: #3c64ee;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-img {
      display:flex;
      align-items: center;
      padding-left: 22.5px;
      .logo-icon {
        width: 71.5px;
        height: 22px;
      }
    }
    .user-img {
      display: flex;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
      }
      > div:nth-child(1) {
        margin-right: 16px;
      }
      > div:nth-child(2) {
        margin-right: 22px;
      }
      .user-icon {
        width: 17px;
        height: 16px;
      }
      .more-icon {
        width: 16px;
        height: 15px;
      }
    }
  }
  .home-tip-container {
    margin-top: 17px;
    display: flex;
    justify-content: center;
  }
  .notice-container {
    margin-top: 35px;
  }
  .toLogin-container {
    margin-top: 15px;
  }
  .guide-container {
    margin-top: 18px;
  }
  .list-container {
    margin-top: 20px;
    width: 100%;
  }
  .footer {
    margin-top: 24px;
  }
}
</style>
