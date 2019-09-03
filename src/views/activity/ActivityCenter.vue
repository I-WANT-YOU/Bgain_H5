<template>
  <div class="activity__container" :class="{setContainer:showSignIn}">
    <nav-bar title="活动中心" :onArrowClick="()=>{this.$router.push('/mine')}" />
    <!--会员值 已登陆-->
    <div class="member-num" v-if="login === true" @click="onGoMemberPage">
      <div class="background">
        <div class="member-info">
          <span>{{userLevel}}</span>
          <span>{{basicInfo.membership_amount}}/{{basicInfo.next_min_membership_num}}</span>
        </div>
        <div class="member-level">
          <img :src="levelImg"/>
        </div>
      </div>
    </div>
    <!--未登录-->
    <div class="member-num-unLogin" @click="onLogin" v-else>
      <div class="background">
        <span>领取会员权益，获得更多奖励</span>
        <div>
          <span>登录</span>
          <span>/</span>
          <span>注册</span>
        </div>
      </div>
    </div>
    <!--会员积分和签到-->
    <div class="member-account" v-if="login">
      <!--积分-->
      <div  @click="toRecord" class="member-integral">
        <div>
          <div>
            <span>{{numberWithThousands(basicInfo.fbp_amt * 1)}}</span><span>&nbsp;BGP</span>
          </div>
          <div>
            <span>BGP明细</span>
          </div>
        </div>
        <div>
          <img src="../../assets/images/active/integral.svg" alt="."/>
        </div>
      </div>
      <!--签到-->
      <div class="member-sign" @click="signIn(isSign)" >
        <div>
          <span>{{isSign?'已签到':'签到'}}</span>
          <span>每日签到</span>
        </div>
        <div>
          <img :src="isSign?signIcon:unSignIcon" alt="." :class="{signInImage:isSign}"/>
        </div>
      </div>
    </div>
    <!--轮播图-->
    <div class="swipe-container"><ActivityCenterSwipe/></div>
    <!--实物列表-->
    <div class="goods-container">
      <GoodList/>
    </div>
     <!--优惠券列表-->
    <div class="coupon-container">
      <CouponList/>
    </div>
     <!--虚拟物品-->
    <div class="virtual-container">
      <VirtualList/>
    </div>
    <!--签到弹窗-->
    <div class="hadSignPop" :class="{showPop:showSignIn}">
      <div class="background"></div>
      <div class="back-img">
        <div>
          <span>获得&nbsp;</span>
          <span>{{isSignInInfo.fbp_amount}}</span>
          <span>&nbsp;BGP</span>
        </div>
        <div>
          <span>已连续签到&nbsp;</span>
          <span>{{isSignInInfo.continuity_sign_num}}</span>
          <span>&nbsp;天</span>
        </div>
        <div @click="closeSignIn">
          <img src="../../assets/images/active/close_x.png" alt="."/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import { numberWithThousands } from '@utils/tools';
import BgainNavBar from '@/components/BgainNavBar.vue';
import ActivityCenterSwipe from './components/ActivityCenterSwipe.vue';
import GoodList from './components/GoodsList.vue';
import CouponList from './components/CouponList.vue';
import VirtualList from './components/VirtualList.vue';
import signIcon from '../../assets/images/active/sign.svg';
import unSignIcon from '../../assets/images/active/unSign.gif';
import levelOne from '../../assets/images/active/level-one.svg';
import levelTwo from '../../assets/images/active/level-two.svg';
import levelThree from '../../assets/images/active/level-three.svg';
import levelFour from '../../assets/images/active/level-four.svg';
import levelFive from '../../assets/images/active/level-five.svg';
import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'ActivityCenter',
  data() {
    return {
      levelImg: '',
      login: false, // 是否登陆
      isLoginText: '已签到',
      isSign: false, // 是否签到
      signIcon,
      unSignIcon,
      userLevel: '', // 用户等级
      showSignIn: false, // 弹窗显示
    };
  },
  components: {
    NavBar: BgainNavBar,
    ActivityCenterSwipe,
    GoodList,
    CouponList,
    VirtualList,
  },
  methods: {
    ...mapActions('user', [
      'getUserSummary',
      'getUserIsSignIn',
    ]),
    ...mapActions('activity', [
      'getBgpProducts',
      'getBanner',
    ]),
    ...mapActions('auth', [
      'isLogin',
    ]),

    // 跳往记录页面
    toRecord() {
      this.$router.push({
        name: 'BGPRecord',
      });
    },

    // 签到
    signIn(hadSigned) {
      if (hadSigned) { // 已签到
        return false;
      }
      this.getUserIsSignIn().then(
        () => {
          this.showSignIn = true;
          return false;
        },
        (err) => {
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
          return false;
        },
      );
      return false;
    },
    // 格式化用户会员数据
    formatUserInfo(userInfo) {
      try {
        switch (userInfo.member_ship_level) {
          case 'V1':
            this.userLevel = '普通会员';
            this.levelImg = levelOne;
            break;
          case 'V2':
            this.userLevel = '初级会员';
            this.levelImg = levelTwo;
            break;
          case 'V3':
            this.userLevel = '黄金会员';
            this.levelImg = levelThree;
            break;
          case 'V4':
            this.userLevel = '钻石会员';
            this.levelImg = levelFour;
            break;
          case 'V5':
            this.userLevel = '至尊会员';
            this.levelImg = levelFive;
            break;
          default:
            break;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 关闭
    closeSignIn() {
      this.showSignIn = false;
      this.isSign = true;
    },
    numberWithThousands(num) {
      return numberWithThousands(num);
    },
    onGoMemberPage() {
      this.$router.push({
        name: 'member',
      });
    },
    onLogin() {
      sessionStorage.setItem('loginFrom', '/activity');
      this.$router.push('/login');
    },
  },
  computed: {
    ...mapState('user', [
      'basicInfo',
      'isSignInInfo',
    ]),
  },
  mounted() {
    Toast.loading({
      message: '加载中...',
    });

    // 获取banner
    this.getBanner().then(
      () => {},
      (err) => {
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
        }
      },
    );

    // 获取商品信息
    this.getBgpProducts().then(
      () => {},
      (err) => {
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
        }
      },
    );

    // 是否登录
    this.isLogin().then(() => {
      this.login = true;
      this.getUserSummary().then(
        () => {
          Toast.clear();
          this.formatUserInfo(this.basicInfo);// 获取数据
          // 判断用户是否签到
          this.isSign = this.basicInfo.had_membership_sign;
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('未登录');
          }
        },
      );
    }, () => {
      this.login = false;
    });
  },
  beforeDestroy() {
    Toast.clear();
  },
};
</script>

<style lang="scss" scoped>
  .showPop{
    display: block!important;
  }
  .signInImage{
    width: 46px!important;
    height: 46px!important;
  }
  /*.set*/
  .setContainer{
    width: 100vw!important;
    height: 100vh!important;
    overflow: hidden;
  }
.activity__container{
  font-family: PingFangSC-Medium sans-serif;
  /*会员*/
  .member-num{
    margin-top:9px;
    display: flex;
    justify-content: center;
    .background{
      width: 335px;
      height: 140px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-shadow: 0 4px 14px 0 rgba(39,46,210,0.5);
      border-radius: 6px;
      background: url('../../assets/images/active/member-background.svg');
      background-size:100% 100%;
      .member-info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        color: #FFFFFF;
        padding-left: 26px;
        >span:nth-child(1){
          margin-top: 34px;
          font-size: 23px;
          line-height: 32px;
        }
        >span:nth-child(2){
          line-height: 21px;
          margin-top: 2px;
          font-size: 15px;
          letter-spacing: 0.14px;
        }
      }
      .member-level{
        padding-right: 15px;
      }
    }
  }
  .member-num-unLogin{
    margin-top:9px;
    display: flex;
    justify-content: center;
    .background{
      width: 335px;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      box-shadow: 0 4px 14px 0 rgba(39,46,210,0.5);
      border-radius: 6px;
      background: url('../../assets/images/active/member-background.svg');
      background-size:100% 100%;
      >span{
        margin-top: 44px;
        font-size: 15px;
        line-height: 21px;
        color: #FFFFFF;
        letter-spacing: 0.14px;
      }
      >div{
        margin-top: 9px;
        display: flex;
        justify-content: center;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
        letter-spacing: 0.15px;
      }
    }
  }
  /*积分和签到*/
  .member-account{
    margin-top: 9px;
    display: flex;
    display: flex;
    justify-content: space-between;
    .member-integral{
      padding-left: 30px;
      display: flex;
      justify-content: space-between;
      >div:nth-child(1){
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        >div:nth-child(1){
          color: #333333;
          >span:nth-child(1){
            font-size: 20px;
            line-height: 28px;
          }
          >span:nth-child(2){
            font-size: 10px;
            line-height: 14px;
          }
        }
        >div:nth-child(2){
          >span{
            display: block;
            font-size: 12px;
            color: #999999;
            line-height: 17px;
          }
        }
      }
      >div:nth-child(2){
        margin-left: 14px;
        display: flex;
        align-items: flex-end;
        >img{
          width: 46px;
          height: 46px;
        }
      }
    }
    .member-sign{
      padding-right: 30px;
      display: flex;
      justify-content: flex-end;
      /*积分*/
      >div:nth-child(1){
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        >span:nth-child(1){
          font-size: 13px;
          color: #333333;
          line-height: 28px;
        }
        >span:nth-child(2){
          font-size: 12px;
          color: #999999;
          line-height: 17px;
        }
      }
      /*签到*/
      >div:nth-child(2){
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 55px;
        height: 65px;
        margin-left: 5px;
        >img{
          width: 55px;
          height: 65px;
        }
      }
    }
  }
  /*轮播图*/
  .swipe-container{
    /*padding: 29px 20px 0 20px;*/
    padding: 29px 0 0 0;
    display: flex;
    justify-content: center;
  }
  .goods-container{
    padding-top: 29px;
  }
  .coupon-container{
  }
  // 弹窗
  .hadSignPop{
    position: absolute;
    display: none;
    top: 0;
    .background{
      width: 100vw;
      height: 100vh;
      display: flex;
      opacity: 0.6;
      background: #000000;
      z-index: 99;
    }
    .back-img{
      position: absolute;
      left: 22.5px;
      top: 150px;
      width: 320px;
      height: 291px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: url("../../assets/images/active/signSuccess.png");
      background-size:320px 291px ;
      z-index: 120;
      >div{
        >span:nth-child(2){
          color: #FF333333;
          font-weight: bold;
        }
      }
      >div:nth-child(1){
        margin-top: 158px;
        font-size: 20px;
        color: #333333;
        >span{
          line-height: 25px;
        }
        >span:nth-child(2){
          line-height: 32px;
          font-size: 30px;
        }
      }
      >div:nth-child(2){
        font-size: 14px;
        color: #333333;
        .span{
          line-height: 25px;
        }
        >span:nth-child(2){
          line-height: 30px;
          font-size: 18px;
        }
      }
      >div:nth-child(3){
        margin-top: 115px;
        >img{
          width: 25px;
          height: 25px;
        }
      }
      }
    }
}
</style>
