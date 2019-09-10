<template>
  <div class="fund-subscribe">
    <BgainNavBar :title="fundBuyInfo.fund_product_name" />
    <div class="fund-subscribe-con">
      <div v-if="fundBuyInfo.support_fbp" class="tabs">
        <div
          :class="['tab', currency === fundBuyInfo.currency_type ? 'active' : '']"
          @click="onSwitch(fundBuyInfo.currency_type)"
        >{{fundBuyInfo.currency_type}}购买</div>
        <span>|</span>
        <div :class="['tab', currency === 'BGP'?'active':'']" @click="onSwitch('BGP')">BGP购买</div>
      </div>
      <div class="form">
        <div class="info">
          <span>认购数量({{currency}})</span>
          <span
            @click= "goToTradingRules">
            交易规则
            <svg-icon icon-class="next" class="next" />
          </span>
        </div>
        <Field
          v-model="num"
          class="input"
          :disabled="inDisabled"
          :placeholder="`起投${mininvest}${currency}, ${unitPrice}/份`"
          @paste.native.capture.prevent
        />
        <div class="line"></div>
        <div class="balance">
          <span class="balance-title">可用余额</span>
          <span class="balance-num">{{balance}} {{currency}}</span>
        </div>
      </div>
      <div class="poundage">
        预估手续费
        <span>{{currency === 'BGP' ? '0' : poundage}}{{currency}}</span>
      </div>
      <Button
        class="button"
        :disabled="disabled"
        @click="onClick"
      >立即认购</Button>
    </div>
    <InsufficientBalanceDialog v-model="show" @cancel="onCancel" />
    <PaymentPasswordDialog
      @close="maskShow=false"
      @submit="getPaymentPassword"
      v-model="maskShow"
      class="mask"
    />
  </div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import BgainNavBar from '@component/BgainNavBar.vue';
import { strip } from '@utils/tools';
import { Field, Button, Toast } from 'vant';
import { mapActions, mapState } from 'vuex';
import PaymentPasswordDialog from '../components/PaymentPasswordDialog.vue';
import InsufficientBalanceDialog from '../components/InsufficientBalanceDialog.vue';

export default {
  name: 'FundSubscribe',
  components: {
    BgainNavBar,
    Field,
    Button,
    PaymentPasswordDialog,
    InsufficientBalanceDialog,
  },
  data() {
    return {
      currency: 'BTC',
      disabled: true,
      poundage: 0,
      rate: '1%',
      num: '',
      show: false,
      inDisabled: false,
      balance: '100',
      mininvest: '0.01',
      maskShow: false,
      unitPrice: '0.01 BTC',
    };
  },
  mounted() {
    //
    this.getFundBuyInfo(this.$route.params.id).then(() => {
      this.changIcon();
      this.changeRate();
      if (this.fundBuyInfo.min_invest_amt * 1 <= this.balance * 1) {
        this.changIcon();
      } else if (this.fundBuyInfo.support_fbp
        && this.fundBuyInfo.min_inverst_amount_fbp * 1 <= this.fundBuyInfo.balance_fbp * 1) {
        this.changIconBGP();
      } else {
        this.show = true;
      }
    });
  },
  watch: {
    show(value) {
      this.inDisabled = value;
    },
    num(value) {
      this.disabled = true;
      const reg = /^\./;
      const last = /\.$/;
      const num = /^\d+(\.\d+)?$/;
      const zero = /^0\d+/;
      // 按钮
      if (value !== '') {
        this.disabled = false;
      }
      if (reg.test(value)) {
        this.num = '0.';
      } else if (value.indexOf('.') !== -1 && value.lastIndexOf('.') !== value.indexOf('.') && last.test(value)) {
        this.num = value.slice(0, value.length - 1);
      } else if (zero.test(value)) {
        this.num = value.slice(1);
      } else if (!num.test(value * 1)) {
        this.num = value.slice(0, value.length - 1);
      }

      this.onToast(value);
      // if (value * 1 > this.balance * 1) {
      //   this.num = old;
      // }
      this.changeRate();
    },
  },
  methods: {
    ...mapActions({
      getFundBuyInfo: 'product/fund/getFundBuyInfo',
      buyFund: 'product/fund/buyFund',
    }),
    onSwitch(text) {
      this.num = '';
      if (text !== 'BGP') {
        this.changIcon();
      } else {
        this.changIconBGP();
      }
      this.onDialog(text);
    },
    changIconBGP() {
      this.currency = 'BGP';
      this.balance = this.fundBuyInfo.balance_fbp;
      this.mininvest = this.fundBuyInfo.min_inverst_amount_fbp;
      this.unitPrice = '1 BGP';
    },
    changIcon() {
      this.currency = this.fundBuyInfo.currency_type;
      this.balance = this.fundBuyInfo.balance;
      this.mininvest = this.fundBuyInfo.min_invest_amt;
      this.unitPrice = `${this.fundBuyInfo.unit_price} ${this.currency}`;
    },
    changeRate() {
      this.rate = `${this.fundBuyInfo.fund_fee_rate_buy[0].rate1 * 100}%`;
      this.poundage = strip(this.fundBuyInfo.fund_fee_rate_buy[0].rate1 * this.num);
    },
    onDialog(text) {
      if (text === 'BGP' && this.fundBuyInfo.min_inverst_amount_fbp * 1 > this.balance * 1) {
        Toast('您当前的BGP余额不足');
        this.changIcon();
      } else if (text === 'BGP' && this.fundBuyInfo.min_inverst_amount_fbp * 1 <= this.balance * 1) {
        this.changIconBGP();
      } else if (text !== 'BGP' && this.fundBuyInfo.min_invest_amt > this.balance * 1) {
        this.show = true;
        this.changIconBGP();
      } else if (text !== 'BGP' && this.fundBuyInfo.min_invest_amt <= this.balance * 1) {
        this.changIcon();
      }
    },
    onToast(num) {
      const floatNum = num.split('.')[1] && num.split('.')[1];

      // 分币种判断小数点后位数
      let nums = 0;
      if (this.currency === 'BTC') {
        nums = 4;
      } else if (this.currency === 'ETH') {
        nums = 3;
      } else if (this.currency === 'USDT') {
        nums = 1;
      } else if (this.currency === 'EOS') {
        nums = 8;
      } else if (this.currency === 'BGP') {
        nums = 2;
      } else {
        nums = 8;
      }

      if (floatNum && floatNum.length > nums) {
        this.num = this.num.substring(0, this.num.indexOf('.') + (nums + 1));
        Toast(`小数点后最多可输入${nums}位`);
      }

      if (this.num.length && this.num * 1 > this.balance * 1) {
        Toast('可用余额不足，请重新输入');
      }
    },
    onClick() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-基金详情-立即认购']);
      if (this.num.length && this.num < this.mininvest) {
        Toast(`起投金额${this.mininvest}${this.currency}`);
      }
      if (this.mininvest <= this.num && this.num * 1 <= this.balance * 1) {
        this.maskShow = true;
      }
      if (this.num.length && this.num * 1 > this.balance * 1) {
        Toast('可用余额不足，请重新输入');
      }
    },
    onCancel() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-基金详情-取消充币']);
      // 余额 this.fundBuyInfo.balance
      if (this.fundBuyInfo.min_invest_amt * 1 > this.balance * 1
        || this.fundBuyInfo.min_inverst_amount_fbp > this.balance_fbp) {
        this.$router.go(-1);
      }
      this.show = false;
    },
    onConfirm() {
      this.show = false;
      this.$router.push('/');
    },
    getPaymentPassword(paymentPassword) {
      window._czc.push(['_trackEvent', 'click', `冠军基金-${this.fundBuyInfo.currency_type}-购买`]);
      this.buyFund({
        product_id: this.fundBuyInfo.fund_product_id,
        currency_type: this.fundBuyInfo.currency_type,
        payment_password: paymentPassword * 1,
        amount: this.num * 1,
        payment_currency: this.currency === 'BGP' ? 'FBP' : this.currency,
      }).then(() => {
        this.$router.push({ path: '/product/fund/result', query: { status: 'success', currency: this.currency } });
      }).catch(() => {
        this.$router.push({ path: '/product/fund/result', query: { status: 'fail' } });
      });
    },
    /* 跳转交易规则 */
    goToTradingRules() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-基金详情-交易规则']);
      this.$router.push(`/product/fund/trade-rules?productId=${this.fundBuyInfo.fund_product_id}`);
    },
  },
  computed: {
    ...mapState({
      fundBuyInfo: state => state.product.fund.fundBuyInfo,
    }),
  },
};
</script>

<style lang='scss'>
.fund-subscribe {
  height: 100%;
  background: #f8f8f8;
  letter-spacing: 0;
  .line {
    height: 0;
    border-bottom: 1px solid #e5e9f6;
    transform: scaleY(0.5);
  }
  .fund-subscribe-con {
    .tabs {
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #6a707d;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 65px;
      background: #ffffff;
      margin-bottom: 11px;
      > span {
        color: #e5e9f6;
      }
      .tab {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: transparent 1px solid;
        &.active {
          color: #2a55e7;
          border-bottom-color: #2a55e7;
        }
      }
    }
    .form {
      box-sizing: border-box;
      padding: 0 21px 0 22px;
      background: #ffffff;
      font-size: 15px;
      color: #0f3256;
      display: flex;
      flex-direction: column;
      .info {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        margin: 26px 0 10px;
        padding: 0 0 0 1px;
        > span:nth-child(2) {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #a8aeb9;
          .next {
            width: 7px;
            height: 11px;
            margin-left: 9px;
          }
        }
      }
      .input {
        width: 334px;
        padding: 18px 0 18px 1px;
        font-size: 18px;
        input::placeholder {
          color: #a8aeb9;
        }
        &.van-cell:not(:last-child)::after {
          border: 0;
        }
      }
      .balance {
        height: 54px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .balance-title {
          font-size: 15px;
          color: #6a707d;
        }
        .balance-num {
          font-size: 15px;
          color: #0f3256;
        }
      }
    }
    .poundage {
      height: 50px;
      margin-top: 11px;
      padding-left: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #0f3256;
      background: #ffffff;
    }
    .button {
      margin: 66px 0 0 22px;
      width: 331px;
      background: #3c64ee;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      &.disabled {
        background: #d2d8eb;
      }
    }
  }
  .dialog {
    width: 305px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 260px;
    .dialog-con {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      .svg-prompt {
        width: 40px;
        height: 52px;
        margin: 24px 0;
      }
      .title {
        font-size: 16px;
        color: #0f3256;
        letter-spacing: 0.15px;
        line-height: 24px;
      }
      .buttons {
        margin-top: 36px;
        .buttons-confirm {
          width: 140px;
          height: 40px;
          background: #3c64ee;
          border-radius: 4px;
          font-size: 15px;
          color: #fbfcfb;
          margin-left: 11px;
        }
        .buttons-cancel {
          width: 114px;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid #e5e9f6;
          border-radius: 4px;
          color: #888888;
        }
      }
    }
  }
}
</style>
