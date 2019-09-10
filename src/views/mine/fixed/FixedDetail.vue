<template>
  <div class="fixed-detail">
    <BgainNavBar :title="option.product_name" />
    <div class="line income">
      <div class="text">
        <div class="come">{{statu ? '待收' : '已得'}}收益</div>
        <div class="prev">产品原始收益</div>
        <div v-if="option.coupon_profit * 1" class="prev">使用加息卷获得</div>
      </div>
      <div class="num">
        <div class="come">{{option.return_amount}} {{option.payment_currency}}</div>
        <div class="prev">{{option.product_profit}} {{option.payment_currency}}</div>
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
        {{option.product_annual_return * 100}}%
        <span v-if="option.coupon_profit * 1">
          +
          {{option.coupon_annual_return * 100}}%
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
    <div class="line roll-in">
      <div class="text">自动转入天天赚</div>
      <on-off :disabled="statu === 'false' ? true : false" v-model="checked" @change="onAuto" />
    </div>
    <div class="line roll-in">
      <div class="text">
        查看
        <span class="agreement" @click="onAgreement">《投资服务协议》</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate } from '@utils/tools';

const { mapActions } = createNamespacedHelpers('product/fixed');

export default {
  name: 'FixedDetail',
  components: {
    BgainNavBar,
    onOff: Switch,
  },
  data() {
    return {
      checked: false,
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
      this.setAutoPortfolio({
        status: checked,
        id: this.option.id,
      });
    },
    onAgreement() {
      this.$router.push('/agreement/investment');
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
      .prev {
        text-align: right;
      }
    }
  }
  .roll-in {
    margin-top: 10px;
    .text {
      color: #0f3256;
      .agreement {
        color: #3c64ee;
        letter-spacing: 0;
      }
    }
  }
}
</style>
