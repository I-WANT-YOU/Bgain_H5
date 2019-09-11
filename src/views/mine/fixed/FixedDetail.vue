<template>
  <div class="fixed-detail">
    <BgainNavBar :title="option.product_name" />
    <div class="line income">
      <div class="text">
        <div class="come">{{statu !== 'false' ? '待收' : '已得'}}收益</div>
        <div v-if="option.coupon_profit * 1" class="prev">产品原始收益</div>
        <div v-if="option.coupon_profit * 1" class="prev">使用加息券获得</div>
      </div>
      <div class="num">
        <div class="come">{{option.profit}} {{option.payment_currency}}</div>
        <div v-if="option.coupon_profit * 1" class="prev">{{option.product_profit}} {{option.payment_currency}}</div>
        <div
          v-if="option.coupon_profit * 1"
          class="prev coupon"
        >{{option.coupon_profit}} {{option.payment_currency}}</div>
      </div>
    </div>
    <div class="line">
      <div class="text">认购数量</div>
      <div class="num">{{option.amount}} {{option.payment_currency}}</div>
    </div>
    <div class="line">
      <div class="text">预期年化利率</div>
      <div class="num">
        {{option.product_expected_annual_return}}
        <span v-if="option.coupon_profit * 1">
          +
          {{option.coupon_annual_return}}
        </span>
      </div>
    </div>
    <div class="line">
      <div class="text">封闭期</div>
      <div class="num">{{option.closed_period}}天</div>
    </div>
    <div class="line">
      <div class="text">收益方式</div>
      <div class="num">一次性还本付息</div>
    </div>
    <div class="line">
      <div class="text">计息周期</div>
      <div class="num">
        {{formatDate(option.interest_start_date)}}
        至
        {{formatDate(option.due_date)}}
      </div>
    </div>
    <div class="line">
      <div class="text">{{statu ? '预计' : ''}}收款日</div>
      <div class="num">{{formatDate(option.product_payment_date)}}</div>
    </div>
    <div class="line roll-in" v-if="!(option.payment_currency === 'BGP' || statu === 'false')">
      <div class="text">
        自动转入天天赚
        <span class="tip-class-wrap" @click="onTip">
          <svg-icon icon-class="fixed_tips" class="tip-class" />
        </span>
      </div>
      <on-off :disabled="statu === 'false' ? true : false" v-model="checked" @change="onAuto" />
    </div>
    <div class="line roll-in" @click="onAgreement">
      <div class="text">
        查看
        <span class="agreement">《投资服务协议》</span>
      </div>
      <div class="next-wrap">
        <svg-icon icon-class="next" class="next" />
      </div>
    </div>
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
  </div>
</template>

<script>
import { Switch, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import { formatDate } from '@utils/tools';

const { mapActions } = createNamespacedHelpers('product/fixed');

export default {
  name: 'FixedDetail',
  components: {
    BgainNavBar,
    BgainBaseDialog,
    onOff: Switch,
  },
  data() {
    return {
      checked: false,
      showTip: false,
      option: {},
      statu: '',
    };
  },
  mounted() {
    this.option = this.$route.query;
    this.statu = this.$route.params.status;
    this.checked = this.option.auto_transfer_in;
  },
  methods: {
    ...mapActions(['setAutoPortfolio']),
    formatDate(num) {
      return formatDate(num * 1, 'YYYY-MM-DD');
    },
    onAuto(checked) {
      if (checked) {
        Toast('自动转入天天赚功能已开启');
      } else {
        Toast('自动转入天天赚功能已关闭');
      }
      this.setAutoPortfolio({
        status: checked,
        id: this.option.id,
      });
    },
    onAgreement() {
      this.$router.push('/agreement/investment');
    },
    onTip() {
      this.showTip = true;
    },
  },
};
</script>

<style lang='scss' scoped>
.fixed-detail {
  height: 100%;
  background: #f8f8f8;
  .line {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 0 20px;
    background: #ffffff;
    .text {
      font-size: 14px;
      color: #6a707d;
    }
    .num {
      font-size: 15px;
      color: #0f3256;
    }
  }
  .income {
    height: auto;
    padding: 25px 20px 16px;
    .prev {
      font-size: 12px;
      color: #a8aeb9;
      margin-top: 10px;
    }
    .coupon {
      color: #ff5c5c;
    }
    .num {
      .come {
        text-align: right;
      }
      .prev {
        text-align: right;
      }
    }
  }
  .roll-in {
    margin-top: 10px;
    .text {
      color: #0f3256;
      position: relative;
      .tip-class-wrap {
        position: absolute;
        right: -20px;
        top: -7px;
        .tip-class {
          width: 14px;
          height: 14px;
        }
      }
      .agreement {
        color: #3c64ee;
        letter-spacing: 0;
      }
    }
    .next-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      .next {
        width: 7px;
        height: 11px;
      }
    }
  }
}
</style>
