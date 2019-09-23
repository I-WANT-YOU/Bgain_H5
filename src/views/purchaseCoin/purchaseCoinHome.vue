<template>
  <div class="purchaseCoinHome">
    <header class="header">
      <div class="header-back" @click="back">
        <svg-icon icon-class="back-fixed" class="header-img"/>
      </div>
      <div class="header-tabs">
        <span v-for="(item,index) in headerTabsData" :key="index"
              :class="{activeHeaderTab:activeHeaderTab === index}"
              @click="changeHeaderTab(index)"
        >{{item}}</span>
      </div>
      <!--历史记录和用户提示-->
      <div class="header-action">
        <div @click="toTips"  v-show="activeHeaderTab === 1">
          <svg-icon
            icon-class="purchaseCoinIllustration" class="purchase-img"/>
        </div>
        <div @click="toRecords">
          <p
             :class="{activeRedCircle:false}"
             @hasRecord="(params)=>{this.activeRedCircle = params}"></p>
          <svg-icon
            icon-class="purchaseCoinRecord" class="purchase-img"/>
        </div>
      </div>
    </header>
    <CoinPurchase v-if="activeHeaderTab===0"/>
    <CoinRecharge @activeHeaderTabFromChild="(params)=>{this.activeHeaderTab = params}" v-else/>
    <!--设置交易密码-->
    <BgainBaseDialog
      v-model="showPasswordDialog"
      :showCancel="false"
      content="您还未设置交易密码，暂无法进行购买"
      submitText="设置交易密码"
      @submit="goToSetPassword"
      @cancel="()=>{this.showPasswordDialog = false}"
    />
    <!--身份验证-->
    <BgainBaseDialog
      :showCancel="false"
      :title="dialogText.title"
      :submitText="dialogText.button"
      :content="dialogText.content"
      v-model="showAuthenticationDialog"
      @submit="goToAuthentication"
      @cancel="()=>{this.showAuthenticationDialog = false}"
    />
    <!--已认证去授权-->
    <BgainBaseDialog
      v-model="isShowAuthorize"
      :showCancel="false"
      title="确认授权"
      submitText="一键授权"
      content="确认授权Bgain开通OTC服务"
      @submit="goToAuthorize"
      @cancel="()=>{this.isShowAuthorize = false}"
    />
    <!--一级非身份证验证通过-->
    <BgainBaseDialog
      v-model="showSecondAuthenticationDialog"
      :showCancel="false"
      submitText="身份认证"
      content="为保证您在平台交易的资金安全请先完成身份认证"
      @submit="goToSecondAuthentication"
      @cancel="()=>{this.showSecondAuthenticationDialog = false}"
    >
    </BgainBaseDialog>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { mapActions, mapState, createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import Vue from 'vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import CoinPurchase from './components/CoinPurchase.vue';
import CoinRecharge from './components/CoinRecharge.vue';
import errorMessage from '../../constants/responseStatus';

const { mapActions: userMapActions, mapGetters } = createNamespacedHelpers('user');

Vue.use(Toast);
export default {
  name: 'purchaseCoinHome',

  components: {
    CoinPurchase,
    CoinRecharge,
    BgainBaseDialog,
  },

  data() {
    return {
      activeHeaderTab: 0, // 默认冲币 0
      // headerTabsData: ['充币'],
      headerTabsData: ['充币', '买币'],
      showPasswordDialog: false, // 设置交易密码
      showAuthenticationDialog: false, // 身份认证
      showSecondAuthenticationDialog: false, // 一级非身份证验证通过
      isShowAuthorize: false, // 一键授权
      dialogText: {
        content: '为保证您在平台交易的资金安全请先完成身份认证',
        button: '身份认证',
        path: '/mine',
      },
    };
  },
  computed: {
    ...mapState('coin/purchaseCoin', [
      'currencyData', // 币种列表 是否有订单
      'currencyPrice', //  币种价格
    ]),
    // 订单信息
    ...mapState('coin/orderInfo', [
      'orderInformation',
    ]),
    // 用户信息判断是否设置交易密码
    ...mapGetters(['authLevel', 'otcStatus', 'kycStatus']),
  },

  methods: {
    // 获取用户信息 判断是否设置交易密码
    ...userMapActions(['getUserSummary', 'toGrantAuthorization']),
    // 获取用户身份验证状态或者币种列表
    ...mapActions('coin/purchaseCoin', [
      'getCurrencyList', // 获取列表
      'getCurrencyPrice',
    ]),
    ...mapActions('coin/orderInfo', [
      'generateOrderInfo',
    ]),

    async changeHeaderTab(index) {
      if (index === 0) {
        window._czc.push(['_trackEvent', 'click', '买币充币-充币Tab']);
        this.activeHeaderTab = index;
      }
      if (index === 1) {
        window._czc.push(['_trackEvent', 'click', '买币充币-买币Tab']);
        /* 判断用户是否设置了交易密码 */
        await this.getUserState();
      }
    },
    /* 跳转到提示 */
    toTips() {
      window._czc.push(['_trackEvent', 'click', '买币充币-买币提示']);
      this.$router.push({
        name: 'BuyingIllustration',
      });
    },
    /*  跳转到历史记录 */
    toRecords() {
      if (this.activeHeaderTab === 0) { // 冲币历史记录
        window._czc.push(['_trackEvent', 'click', '买币充币-充币'
        + '记录']);
        this.$router.push({
          name: 'FillingRecord',
        });
      } else if (this.activeHeaderTab === 1) { // 买币记录
        window._czc.push(['_trackEvent', 'click', '买币充币-买币记录']);
        this.$router.push({
          name: 'BuyingRecord',
        });
      }
    },
    /* 回退到上一页 */
    back() {
      if (this.$route.params.from === 'kyc-result') {
        this.$router.push({ path: '/mine/safety' });
        return false;
      }
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' });
        return false;
      }
      this.$router.go(-1);
      return false;
    },
    /* 跳转设置交易密码 */
    goToSetPassword() {
      sessionStorage.setItem('payment', '/purchaseCoinHome'); // payment 暂时不懂
      this.$router.push('/mine/safety/password/payment/set');
    },
    /* 跳转到身份认证 */
    goToAuthentication() {
      if (this.dialogText.path === '') {
        this.showAuthenticationDialog = false;
      } else if (this.dialogText.path === 'kyc') {
        this.$router.push({ name: 'kyc', query: { type: 'KYC' } });
      } else if (this.dialogText.path === 'otc') {
        this.$router.push({ name: 'kyc', query: { type: 'OTC' } });
      }
    },
    /* 跳转到身份认证(一级非身份证验证已过) */
    goToSecondAuthentication() {
      this.$router.push({ name: 'kyc', query: { type: 'OTC' } });
    },

    /* 一键授权 */
    goToAuthorize() {
      this.toGrantAuthorization().then(
        () => {
          // 授权成功
          this.isShowAuthorize = false;
          this.dialogText = {
            content: '您的身份认证申请已提交，审核结果将在1个工作日内公布',
            button: '知道了',
            path: '',
          };
          this.showAuthenticationDialog = true;
        },
        () => {
          Toast('授权失败');
        },
      );
    },
    /* 判断用户 1是否设置交易密码 */
    getUserState() {
      this.getUserSummary().then(
        () => {
          if (this.authLevel === 2) { // 用户设置了交易密码
          // 判断用户是否进行了OTC认证
            this.getUserAuthenticationState();
          } else { // 未设置交易密码 弹窗 提示跳转
            this.showPasswordDialog = true;
          }
        },
        (err) => {
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },
    /* 判断用户身份认证状态 */
    // 获取币种列表（设计交易密码 设置OYC 设置KYC）
    getUserAuthenticationState() {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...',
      });
      this.getCurrencyList().then( // 获取币种列表
        () => {
          this.$toast.clear();
          // 判断是否进行了OTC认证
          if (this.currencyData.code === 165) { // 未进行OTC判断
            switch (this.currencyData.data.link_coin_currency_types[0].is_kyc) {
              case -1: // KYC认证 （非身份证认证）
                this.showSecondAuthenticationDialog = true;
                break;
              case 0: // KYC未验证
                this.dialogText = {
                  title: '未认证',
                  content: '为保证您在平台交易的资金安全请先完成身份认证',
                  button: '身份认证',
                  path: 'kyc',
                };
                this.showAuthenticationDialog = true;
                break;
              case 1: // KYC审核中
                this.dialogText = {
                  title: '审核中',
                  content: '您的身份认证申请已提交，审核结果将在3个工作日内公布',
                  button: '知道了',
                  path: '',
                };
                this.showAuthenticationDialog = true;
                break;
              case 2: // OTC审核中
                this.dialogText = {
                  title: '审核中',
                  content: '您的OTC身份认证申请已提交，审核结果将在1个工作日内公布',
                  button: '知道了',
                  path: '',
                };
                this.showAuthenticationDialog = true;
                break;
              case 3: // KYC重新验证
                this.dialogText = {
                  content: '您的身份信息认证失败，请重新验证',
                  button: '重新认证',
                  path: 'kyc',
                };
                this.showAuthenticationDialog = true;
                break;
              case 4: // OTC重新验证
                this.dialogText = {
                  content: '您的身份信息认证失败，重新验证进行买币',
                  button: '重新认证',
                  path: 'otc',
                };
                this.showAuthenticationDialog = true;
                break;
              case 5: // 已认证去授权
                this.isShowAuthorize = true;
                break;
              case 6: // 成功
                break;
              default:
                break;
            }
          } else if (this.currencyData.code === 166) { // 服务异常
            Toast('服务器异常');
          } else if (this.currencyData.code === 167) { // otc不支持该币种购买
            Toast('服务器异常');
          } else if (this.currencyData.code === 169) { // otc购买数量为零
            Toast('服务器异常');
          } else if (this.currencyData.code === 170) { // otc 购买金额不在可购买范围之内
            Toast('服务器异常');
          } else if (this.currencyData.code === 171) { // otc 用户当天可用额度不足
            Toast('服务器异常');
          } else if (this.currencyData.code === 172) { // otc 第三方服务闭市
            this.dialogText = {
              content: '闭市时间，购买停止',
              button: '知道了',
              path: '',
            };
            this.showAuthenticationDialog = true;
          } else if (this.currencyData.code === 173) { // otc 订单不存
            Toast('服务器异常');
          } else if (this.currencyData.code === 174) { // otc 用户没有权限对此订单操作
            Toast('服务器异常');
          } else if (this.currencyData.code === 175) { // otc 当前订单不可申诉
            Toast('服务器异常');
          } else if (this.currencyData.code === 176) { // otc 用户总体可用额度不足
            Toast('服务器异常');
          } else if (this.currencyData.code === 178) { // 服务异常
            Toast('服务器异常');
          } else {
            this.activeHeaderTab = 1; // 设置tab切换
          }
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.path === '/fillingRecord' || to.path === '/buyingIllustration' || to.path === '/buyingRecord' || to.path === '/confirmOrder') {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.purchaseCoinHome{
  .activeHeaderTab{
    color: #FFFFFF;
    border-bottom:2px #FFFFFF solid;
  }
  .activeContentTab{
    color: #FFFFFF;
  }
  // 历史记录有小红点
  .activeRedCircle{
    background: red;
  }
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  /*头部*/
  .header{
    height: 46px;
    display: flex;
    background: #3C64EE;
    .header-back{
      height: 46px;
      width: 44px;
      padding-left: 16px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .header-img{
        width: 9.5px;
        height: 18px;
      }
    }
    .header-tabs{
      height: 46px;
      margin-left: 20px;
      display: flex;
      justify-content: space-around;
      flex: 1;
      >span{
        display: inline-block;
        width: 60px;
        height: 22px;
        font-size: 16px;
        color: #FFFFFF;
        padding: 13px 0 9px 0;
        text-align: center;
      }
    }
    .header-action{
      width: 80px;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      >div{
        display: flex;
        align-items: flex-start;
        margin-top: 12px;
        margin-right: 18px;
      }
      // 小红点实现
      >div:nth-child(2){
        position: relative;
        >p{
          position: absolute;
          top:-2px;
          right: -2px;
          border-radius:10px;
          margin:0;
          width: 12px;
          height: 12px;
        }
      }
      .purchase-img{
        display: inline-block;
        width: 22px;
        height: 22px;
      }
    }

  }
}
</style>
