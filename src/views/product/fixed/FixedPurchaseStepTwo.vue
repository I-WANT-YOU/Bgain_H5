<template>
  <div class="fixedStepTwo">
    <BgainNavBar :title="showData.title"/>
    <div class="content">
      <div class="purchaseNum">
        <span>认购数量 <span v-if="showData.currencyType === 'BGP'">
          ({{showData.currencyType}})</span></span>
        <span>{{showData.investmentAmount}}
          {{showData.currencyType}}</span>
      </div>
      <div class="coupon" v-show="showData.currencyType !== 'BGP'">
        <span>选择优惠券</span>
        <div @click="selectCoupon()">
          <span>{{showCouponInfo}}</span>
          <svg-icon v-if="availabelCoupons.length" icon-class="next" class="next-img"/>
        </div>
      </div>
      <!--预期收益-->
      <div class="expectedReturn">
        <div v-for="(item,index) in expectedReturnData" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.num}}</span>
        </div>
      </div>
  </div>
    <div v-if="showData.currencyType !== 'BGP'" class="turnToAnther">
      <div>
        <span>到期转入天天赚</span>
        <span @click="onTip">
          <svg-icon icon-class="fixed_tips" class="tips-icon"/>
        </span>
      </div>
      <div>
        <van-switch v-model="checked" class="switch-set" />
      </div>
    </div>
    <div class="tip">购买即表示您已阅读并同意我们的
      <span class="active" @click="goToServiceProtocal">《投资服务协议》</span></div>
    <div class="purchaseButton">
      <button @click="immediateBuy">立即认购</button>
    </div>
    <BgainBaseDialog
      v-model="payment"
      :showCancel="false"
      content="您还未设置交易密码，暂无法进行购买"
      submitText="设置交易密码"
      @submit="setPayment"
      @cancel="cancelPayment"
    />

    <BgainBaseDialog
      v-model="showTip"
      content="即指产品到期回款后，授权平台将本息总额转入天天赚；开通后亦可随时关闭该项功能。"
      submitText="我知道了"
      :showCancel="false"
      :showClose="false"
      @submit="showTip = false"
      @cancel="showTip = false"
      title
    />
    <PaymentPasswordDialog
      @close="maskShow=false"
      @submit="getPaymentPassword"
      v-model="maskShow"
    />
    <!--优惠券列表-->
    <FixCoupon v-show="isShowCoupon" @couponData="computeCouponData"/>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { Switch, Toast } from 'vant';
import { mapActions, mapState, mapGetters } from 'vuex';
import { formatDate, testNum } from '@utils/tools';
import Vue from 'vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import BgainNavBar from '../../../components/BgainNavBar.vue';
import FixCoupon from '../../coupon/FixCoupon.vue';
import errorMessage from '../../../constants/responseStatus';
import PaymentPasswordDialog from '../components/PaymentPasswordDialog.vue';

Vue.use(Toast);
export default {
  name: 'FixedPurchaseStepTwo',
  // this.$set(this.expectedReturnData, 0, changData); // 预期收益
  data() {
    return {
      title: '',
      checked: false,
      showData: {},
      expectedReturnData: [],
      maskShow: false, // 密码弹出框
      password: '',
      payment: false, // 没有设置交易密码弹窗
      isShowCoupon: false, // 是否显示优惠券页面
      showCouponInfo: '', // 优惠券信息展示
      showTip: false,
    };
  },

  components: {
    BgainNavBar,
    'van-switch': Switch,
    PaymentPasswordDialog,
    BgainBaseDialog,
    FixCoupon,
  },

  computed: {
    ...mapState('product/fixed', [
      'availabelCoupons', // 获取优惠券
      'userPortfolio', // 获取预期收益
      'fixed',
    ]),
    ...mapGetters('user', [
      'authLevel',
    ]),
  },

  methods: {
    ...mapActions('product/fixed', [
      'getAvailableCoupons', // 获取可用优惠券
      'getUserPortfolio', // 获取预期收益
      'buyFixedProduct', // 用户购买产品
    ]),
    ...mapActions('user', ['getUserSummary']),

    /* 投资协议 */
    goToServiceProtocal() {
      window._czc.push(['_trackEvent', 'click', '定期盈-投资服务协议']);
      this.$router.push('/agreement/investment');
    },
    /* 接受优惠券参数 */
    computeCouponData(couponData) {
      if (couponData === 'none') {
        this.isShowCoupon = false;
      } else if (couponData === 'cancel') {
        sessionStorage.removeItem('couponData');
        this.isShowCoupon = false;
        this.createShowData(false);
        this.showCouponInfo = `可用 ${this.availabelCoupons.length} 张`;
      } else {
        this.isShowCoupon = false;
        this.createShowData(true, couponData);
        this.showCouponInfo = `可加息 ${this.availabelCoupons[couponData].coupon_value}%`;
        sessionStorage.setItem('couponData', couponData);
      }
    },
    /* 立即认购 调用支付密码页面 */
    immediateBuy() {
      window._czc.push(['_trackEvent', 'click', '定期盈-立即认购']);
      if (this.authLevel === 2) {
        this.maskShow = true;
      } else {
        this.payment = true;
      }
    },
    /* 获取支付密码 */
    getPaymentPassword(val) {
      window._czc.push(['_trackEvent', 'click', '定期盈-输入交易密码-确认']);
      Toast.loading({
        mask: false,
        message: '加载中...',
      });
      this.password = val;
      try {
        this.confirmBuy(); // 调用接口 确认认购
      } catch (error) {
        throw new Error(error);
      }
    },
    /* 立即认购 */
    confirmBuy() {
      if (this.checked) {
        window._czc.push(['_trackEvent', 'click', '定期盈-到期转入天天赚']);
      }
      let couponId = '';
      if (sessionStorage.getItem('couponData') || sessionStorage.getItem('couponData') === '0') {
        const couPonIndex = parseInt(sessionStorage.getItem('couponData'), 10);
        couponId = this.availabelCoupons[couPonIndex].id;
      }
      const params = {
        product_id: this.showData.productId,
        amount: this.showData.investmentAmount,
        amount_currency: this.showData.currencyType,
        payment_currency: this.showData.currencyType,
        payment_password: this.password,
        user_coupon_id: couponId,
        product_type: 'fix_income',
        auto_transfer_in: this.checked,
      };
      // 请求购买接口
      this.buyFixedProduct(params).then(
        () => {
          Toast.clear();
          this.maskShow = false;
          this.$router.push(
            {
              name: 'SubscriptionResults',
              params: {
                fixedBuyResult: {
                  result: 'success',
                  amount: params.amount,
                  currencyType: params.amount_currency,
                },
              },
            },
          );
        },
        () => {
          Toast.clear();
          this.maskShow = false;
          this.$router.push(
            {
              name: 'SubscriptionResults',
              params: {
                fixedBuyResult: {
                  result: 'fail',
                  amount: params.amount,
                  currencyType: params.amount_currency,
                },
              },
            },
          );
        },
      );
    },

    async isSetPassword() {
      try {
        await this.getUserSummary();
      } catch (error) {
        throw error;
      }
    },

    onTip() {
      this.showTip = true;
    },

    // 选择优惠券
    selectCoupon() {
      window._czc.push(['_trackEvent', 'click', '定期盈-选择优惠券']);
      if (this.availabelCoupons.length) {
        this.isShowCoupon = true;
      }
    },

    // 格式化预计数款日的日期
    formatDate(date) {
      return formatDate(date, 'YYYY-MM-DD');
    },
    createShowDataWithoutCoupon() { // 无优惠券
      this.expectedReturnData = [
        {
          name: '预期收益',
          num: `${this.showData.expectedReturn} ${this.showData.currencyType === 'FBP' ? 'BGP' : this.showData.currencyType}`,
          show: true,
        },
        {
          name: '预计收款日',
          num: this.formatDate(this.showData.expected_payment_date),
          show: true,
        },
      ];
    },

    // 生成展示数据
    createShowData(isHadCoupon, index) {
      if (this.showData.currencyType === 'BGP') { // 无优惠券 无预期加息收益
        this.expectedReturnData = [
          {
            name: '预期收益',
            num: `${this.showData.expectedReturn} ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预计收款日',
            num: this.formatDate(this.showData.expected_payment_date),
            show: true,
          },
        ];
      } else if (isHadCoupon) { // 有优惠券
        // eslint-disable-next-line
        const expectedAdd = testNum(this.showData.investmentAmount *  this.availabelCoupons[index].coupon_return);
        // eslint-disable-next-line
        const expectedAll = testNum((parseFloat(expectedAdd*100000000) + parseFloat(this.showData.expectedReturn*100000000))/100000000);
        this.expectedReturnData = [
          {
            name: '预期收益',
            num: `${this.showData.expectedReturn} ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预期加息收益',
            num: `${expectedAdd} ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预期总收益',
            num: `${expectedAll} ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预计收款日',
            num: this.formatDate(this.showData.expected_payment_date),
            show: true,
          },
        ];
        return false;
      }
      if (!isHadCoupon) {
        this.expectedReturnData = [
          {
            name: '预期收益',
            num: `${this.showData.expectedReturn} ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预期加息收益',
            num: `0 ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预期总收益',
            num: `0 ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预计收款日',
            num: this.formatDate(this.showData.expected_payment_date),
            show: true,
          },
        ];
      }
      return false;
    },

    // 获取优惠券
    getCoupon(isGetIndexFromCoupon, index) {
      // 获取可用优惠券
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...',
      });
      const params = {
        id: this.showData.productId,
        amount: this.showData.investmentAmount,
      };
      this.getAvailableCoupons(params).then(
        () => {
          Toast.clear();
          if (isGetIndexFromCoupon) { // 选择了优惠券 然后返回
            this.createShowData(true, index);
            this.showCouponInfo = `可加息 ${this.availabelCoupons[index].coupon_value}%`;
          } else {
            this.createShowData(false); // 初始化页面 无预取收益 无优惠券数据
            if (this.availabelCoupons.length) {
              this.showCouponInfo = `可用 ${this.availabelCoupons.length} 张`;
            } else {
              this.showCouponInfo = '暂无相关优惠券';
            }
          }
        },
        (err) => {
          Toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },

    // 设置交易密码
    setPayment() {
      // 跳转到上设置交易密码页面
      this.payment = false;
      this.$router.push('/mine/safety/password/payment/set');
    },

    // 关闭设置交易密码弹窗
    cancelPayment() {
      this.payment = false;
    },
  },
  mounted() {
    if (this.$route.params.stepTwoData) {
      sessionStorage.setItem('showData', this.$route.params.stepTwoData); // 保存上一页的数据
    }
    this.showData = JSON.parse(sessionStorage.getItem('showData')); // 设置传递的数据
    // 判断是否设置交易密码
    this.isSetPassword();
    if (this.showData.currencyType === 'BGP') {
      this.createShowDataWithoutCoupon();
    } else if (sessionStorage.getItem('couponData') || sessionStorage.getItem('couponData') === '0') { // 刷新本页面
      // 获取可用优惠券
      this.getCoupon(true, sessionStorage.getItem('couponData'));
    } else {
      // 获取可用优惠券
      this.getCoupon(false);
    }
  },

  watch: {
    checked(value) {
      if (value) {
        Toast('自动转入天天赚功能已开启');
      } else {
        Toast('自动转入天天赚功能已关闭');
      }
    },
  },

  beforeDestroy() {
    if (sessionStorage.getItem('couponData') || sessionStorage.getItem('couponData') === '0') {
      sessionStorage.removeItem('couponData');
    }
    Toast.clear();
  },
};
</script>

<style lang="scss" scoped>
.fixedStepTwo{
  width: 100vw;
  height: 100vh;
  background: #F8F8F8;
  .content{
    font-family: PingFangSC-Regular sans-serif;
    letter-spacing: 0;
    text-align: center;
    background: #FFFFFF;
    /*认购数量*/
    .purchaseNum{
      height: 52px;
      padding:0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      color: #0F3256;
      border-bottom: 0.51px solid #E5E9F6;
    }
    /*优惠券*/
    .coupon{
      height: 52px;
      padding:0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.51px solid #E5E9F6;
      .next-img{
        width: 7px;
        height: 11px;
        margin-left: 9px;
      }
      >span{
        font-size: 15px;
        color: #0F3256;
      }
      >div{
        font-size: 12px;
        color: #878F9E;
        display: flex;
        align-items: center;
      }
    }
    /*预期回报*/
    .expectedReturn{
      padding: 10px 21px 10px 21px;
      >div{
        display: flex;
        justify-content: space-between;
        >span{
          height: 33px;
          line-height: 33px;
          font-size: 13px;
          color: #9AA2B2;
        }
      }
    }
  }
  .turnToAnther{
    height: 50px;
    margin-top: 11px;
    padding: 0 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    >div{
      display: flex;
      align-items: center;
      >span{
        height: 25px;
        font-size: 15px;
        color: #0F3256;
        line-height: 25px;
      }
      .tips-icon{
        margin-left: 5px;
        margin-bottom: 7px;
        width: 12px;
        height: 12px;
      }
    }
    >div:nth-child(2){
      .switch-set{
        height: 29px;
        width: 56px;
        .van-switch__node{
          width: 28px;
          height: 28px;
        }
      }
      /*width:48px;*/
      /*height: 28px;*/
    }
  }
 .tip{
    font-size: 12px;
    margin-top: 50px;
    text-align: left;
    padding-left: 30px;
    .active{
      color: #3c64ee;
    }
  }
  .purchaseButton{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    >button{
      width: 331px;
      height: 46px;
      background: #3C64EE;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      border: none;
    }
  }
}
</style>
