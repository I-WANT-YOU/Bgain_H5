<template>
  <div class="fixedStepTwo">
    <BgainNavBar :title="showData.title"/>
    <div class="content">
      <div class="purchaseNum">
        <span>认购数量</span>
        <span>{{showData.investmentAmount}}
          {{showData.currencyType === 'FBP' ? 'BGP' : showData.currencyType}}</span>
      </div>
      <div class="coupon" v-show="showData.currencyType !== 'FBP'">
        <span>选择优惠券</span>
        <div @click="()=>{
        this.$router.push(
        {path:'/fixCoupon',query:{productId:showData.productId,amount:showData.investmentAmount}}
        )
        }">
          <span>可用 {{availabelCoupons.length}} 张</span>
          <svg-icon icon-class="next" class="next-img"/>
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
    <div v-if="showData.currencyType !== 'FBP'" class="turnToAnther">
      <div>
        <span>到期转入活期产品</span>
        <svg-icon icon-class="fixed_icon"/>
      </div>
      <div><van-switch v-model="checked" size = '27px'/></div>
    </div>
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
    <PaymentPasswordDialog
      @close="maskShow=false"
      @submit="getPaymentPassword"
      v-model="maskShow"
    />
  </div>
</template>

<script>
import { Switch, Toast } from 'vant';
import { mapActions, mapState, mapGetters } from 'vuex';
import PublicMethods from '@utils/publicMethods';
import Vue from 'vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import BgainNavBar from '../../../components/BgainNavBar.vue';
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
    };
  },

  components: {
    BgainNavBar,
    'van-switch': Switch,
    PaymentPasswordDialog,
    BgainBaseDialog,
  },

  computed: {
    ...mapState('product/fixed', [
      'availabelCoupons', // 获取优惠券
      'userPortfolio', // 获取预期收益
    ]),
    ...mapState('product/fixed', [
      'fixed',
      'availabelCoupons',
    ]),
    ...mapGetters('user', [
      'authLevel',
    ]),
  },

  methods: {
    ...mapActions('product/fixed', [
      'getAvailableCoupons', // 获取优惠券
      'getUserPortfolio', // 获取预期收益
      'buyFixedProduct', // 用户购买产品
    ]),

    ...mapActions('user', ['getUserSummary']),

    // 立即认购 调用支付密码页面
    immediateBuy() {
      if (this.authLevel === 2) {
        this.maskShow = true;
      } else {
        this.payment = true;
      }
    },

    // 获取支付密码
    getPaymentPassword(val) {
      Toast.loading({
        mask: false,
        message: '加载中...',
      });
      this.password = val;
      this.confirmBuy(); // 调用接口 确认认购
    },
    // 立即认购
    confirmBuy() {
      const params = {
        product_id: this.showData.productId,
        amount: this.showData.investmentAmount,
        amount_currency: this.showData.currencyType,
        payment_currency: this.showData.currencyType,
        payment_password: this.password,
        user_coupon_id: this.$route.query.couponId || '',
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

    // 格式化预计数款日的日期
    formatDate(date) {
      return PublicMethods.createOrderDate(date);
    },

    // 生成展示数据
    createShowdata(isHadCoupon) {
      if (this.showData.currencyType === 'FBP') { // 无优惠券 无预期加息收益
        this.expectedReturnData = [
          {
            name: '预期收益',
            num: `${this.showData.expectedReturn} ${this.showData.currencyType === 'FBP' ? 'BGP' : this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预计收款日',
            num: this.formatDate(this.showData.expected_payment_date, 'YYYY-MM-DD'),
            show: true,
          },
        ];
      } else if (isHadCoupon) { // 有优惠券
        console.log(this.availabelCoupons);
        console.log(this.$route.query);
        // eslint-disable-next-line
        const expectedAdd = (this.showData.investmentAmount * 100000000 * this.availabelCoupons[this.$route.query.index].coupon_return) / 10000000000;
        // eslint-disable-next-line
        const expectedAll = Math.floor((expectedAdd + this.showData.expectedReturn) * 10000000000) / 10000000000;
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
      } else {
        this.expectedReturnData = [
          {
            name: '预期收益',
            num: `${this.showData.expectedReturn} ${this.showData.currencyType}`,
            show: true,
          },
          {
            name: '预期加息收益',
            num: '--',
            show: true,
          },
          {
            name: '预期总收益',
            num: '--',
            show: true,
          },
          {
            name: '预计收款日',
            num: this.formatDate(this.showData.expected_payment_date, 'YYYY_MM_DD'),
            show: true,
          },
        ];
      }
    },

    // 获取优惠券
    getCoupon() {
      const params = {
        id: this.showData.productId,
        amount: this.showData.investmentAmount,
      };
      this.getAvailableCoupons(params).then(
        () => {
          Toast.clear();
          // 判断是否带着优惠券页面返回
          if (JSON.stringify(this.$route.query) === '{}') {
            this.createShowdata(false); // 无
          } else {
            this.createShowdata(true); // 有优惠券
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
    console.log(this.showData);

    // 判断是否设置交易密码
    this.isSetPassword();

    // 获取优惠券
    this.getCoupon();
    // 判断币种还是积分查询 显示不同数据

    // 获取可用优惠券
    Toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...',
    });
  },

  beforeDestroy() {
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
        >span{
          margin-right: 9px;
        }
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
      >span{
        height: 21px;
        font-size: 15px;
        color: #0F3256;
      }
    }
    >div:nth-child(2){
      width:48px;
      height: 28px;
    }
  }
  .purchaseButton{
    display: flex;
    justify-content: center;
    margin-top: 70px;
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
