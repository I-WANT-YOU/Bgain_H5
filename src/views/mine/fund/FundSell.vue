<template>
  <div class="fund-sell">
    <BgainNavBar :title="title" />
    <div class="fund-sell-con">
      <div class="item">
        <div class="show-info">
          <div class="text">持有份额</div>
          <div>{{holdingShares}} 份</div>
        </div>
      </div>
      <div class="item">
        <div class="input">
          <div class="text">赎回份额</div>
          <Field v-model="num" class="field" :placeholder="`最多可赎回${holdingShares}份`" />
          <span @click="onAll" class="all">全部</span>
        </div>
      </div>
      <div class="fee-amt">
        <div class="rules">
          <div>
            <span>预估手续费</span>
            <span class="num">{{num*redemmptFeeRate}} {{currency}}</span>
          </div>
          <div class="icon" @click="goSellRules">
            <span class="text">赎回规则</span>
            <svg-icon icon-class="next" class="next" />
          </div>
        </div>
        <div class="text">最终以平台确认为准</div>
      </div>
      <div class="buttons">
        <BgainButton
          :class="disabled ? 'disabled' : ''"
          :disabled="disabled"
          :fluid="true"
          type="info"
          @click="onSell"
        >提交</BgainButton>
      </div>
      <BgainBaseDialog
        v-model="sellDialog"
        :content="`持有份额不能小于${minHoldShares}份，您可以选择全部赎回或重新输入赎回份额`"
        submitText="重新输入"
        cancelText="全部赎回"
        @submit="onReset"
        @cancel="allSell"
      />
      <PaymentPasswordDialog v-model="passwordDialog" @close="onClose" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { Field, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainButton from '@component/BgainButton.vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import PaymentPasswordDialog from '@views/product/components/PaymentPasswordDialog.vue';
import { strip } from '@utils/tools';

const { mapActions, mapState } = createNamespacedHelpers('product/fund');

export default {
  name: 'FundSell',
  methods: {
    ...mapActions(['sellFundDetail', 'sellFund']),
    onAll() {
      this.num = this.holdingShares;
    },
    onSell() {
      // 最小份额
      if (this.holdingShares !== this.num
        && this.minHoldShares > this.holdingShares * 1 - strip(this.num * 1)) {
        this.sellDialog = true;
      } else {
        this.passwordDialog = true;
      }
    },
    onClose() {
      this.passwordDialog = false;
    },
    onReset() {
      this.num = '';
      this.sellDialog = false;
    },
    allSell() {
      this.num = this.holdingShares;
      this.sellDialog = false;
    },
    async onSubmit(password) {
      const params = {
        fund_id: this.$route.query.fund_id,
        sell_shares: this.num,
        payment_password: password,
      };
      await this.sellFund(params);
    },
    goSellRules() {
      this.$router.push({
        path: '/product/fund/trade-rules',
        query: { productId: this.$route.query.fund_id },
      });
    },
  },
  components: {
    BgainNavBar,
    Field,
    BgainButton,
    PaymentPasswordDialog,
    BgainBaseDialog,
  },
  data() {
    return {
      title: '基金名称',
      holdingShares: '287.71',
      currency: 'BTC',
      redemmptFeeRate: 0,
      num: '',
      disabled: true,
      passwordDialog: false,
      minHoldShares: '1', // 最小持有份额
      sellDialog: false,
    };
  },
  computed: {
    ...mapState(['fundSellDetail']),
  },
  watch: {
    num(value) {
      const reg = /^\./;
      const last = /\.$/;
      const num = /^\d+(\.\d+)?$/;
      const zero = /^0\d+/;
      const floatNum = value.split('.')[1] && value.split('.')[1];
      // 按钮
      if (value !== '') {
        this.disabled = false;
      }
      // 判断位数
      if (reg.test(value)) {
        this.num = '0.';
      } else if (value.indexOf('.') !== -1 && value.lastIndexOf('.') !== value.indexOf('.') && last.test(value)) {
        this.num = value.slice(0, value.length - 1);
      } else if (zero.test(value)) {
        this.num = value.slice(1);
      } else if (!num.test(value * 1)) {
        this.num = value.slice(0, value.length - 1);
      }

      if (floatNum && floatNum.length > 8) {
        this.num = this.num.substring(0, this.num.indexOf('.') + 9);
        Toast('小数点最多可输入8位');
      }

      if (value * 1 > this.holdingShares) {
        Toast(`最多可赎回${this.holdingShares}份, 请重新输入`);
        this.num = this.holdingShares;
      }
      // 判断是否禁用按钮
      if (!(this.num * 1) && (this.num * 1) === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      const params = {
        fundId: this.$route.query.fund_id,
        userId: this.$route.query.fund_user_stat_id,
      };
      await this.sellFundDetail(params);
      this.title = this.$route.query.title;
      this.holdingShares = this.fundSellDetail.holding_shares.toString();
      this.redemmptFeeRate = this.fundSellDetail.redemmpt_fee_rate;
      this.currency = this.fundSellDetail.currency;
      this.minHoldShares = this.fundSellDetail.min_holding_shares;
      Toast.clear();
    } catch (error) {
      Toast.clear();
      Toast(error);
    }
  },
};
</script>

<style lang='scss'>
.fund-sell {
  height: 100%;
  width: 100%;
  background: #f8f8f8;
  .fund-sell-con {
    margin-top: 10px;
    .item {
      height: 50px;
      font-size: 14px;
      color: #0f3256;
      padding: 0 20px;
      background: #ffffff;
      border-bottom: 1px solid #eeeeee;
      .van-cell:not(:last-child)::after {
        border: 0;
      }
      .show-info,
      .input {
        height: 100%;
        display: flex;
        align-items: center;
        .text {
          width: 90px;
          font-weight: 500;
        }
        .field {
          padding-left: 27px;
          ::placeholder {
            font-size: 14px;
            color: #a8aeb9;
          }
        }
        .all {
          display: inline-block;
          width: 44px;
          font-size: 14px;
          color: #3c64ee;
        }
      }
    }
    .fee-amt {
      font-size: 13px;
      color: #6a707d;
      padding: 15px 20px;
      background: #ffffff;
      .rules {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .num {
          margin-left: 30px;
          font-size: 13px;
          color: #3c64ee;
        }
        .icon {
          display: flex;
          align-items: center;
          .next {
            margin-left: 9px;
            width: 5.3px;
            height: 10px;
          }
        }
      }
      .text {
        font-size: 12px;
        color: #a8aeb9;
      }
    }
    .buttons {
      padding: 0 20px;
      margin-top: 60px;
      font-size: 16px;
      color: #ffffff;
      .disabled {
        background: #d2d8eb;
        border: 0;
      }
    }
  }
}
</style>
