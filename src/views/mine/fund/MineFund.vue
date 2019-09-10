<template>
  <div class="mine-fund">
    <BgainNavBar @click-right="onRecord" title="持仓基金">
      <template v-slot:right class="slot-right">
        <svg-icon icon-class="mine-fund-record" class="record" />
      </template>
    </BgainNavBar>
    <div class="mine-fund-con">
      <div class="information">
        <div class="currency">
          <div @click="showSelectFun" class="currency-wrap">
            <span>{{currency}}估值</span>
            <div class="icon-wrap">
              <svg-icon class="icon-select" icon-class="mine-fund-down" />
            </div>
          </div>
        </div>
        <div class="amount">
          <div
            :class="['num', (amount === '---') ? 'computed' : '']"
          >{{numberWithThousands(amount)}}</div>
          <span class="text">总市值(BTC)</span>
        </div>
        <div class="assets-change">
          <div class="assets-change-con">
            <span
              :class="['num', yesterday * 1 > 0 ? 'loss' : 'profit',
               (yesterday === '---' || yesterday === 0) ? 'computed' : '']"
            >{{numberWithThousands(yesterday)}}</span>
            <span>昨日盈亏(BTC)</span>
          </div>
          <div class="assets-change-con">
            <span
              :class="['num', hold * 1 > 0 ? 'loss' : 'profit',
               (hold === '---' || hold === 0) ? 'computed' : '']"
            >{{numberWithThousands(hold)}}</span>
            <span>持仓收益(BTC)</span>
          </div>
          <div class="assets-change-con">
            <span
              :class="['num',
              holdTotalPnlRatio ? 'loss' : 'profit',
              (holdRate === '---' || holdTotalPnlRatio === 0) ? 'computed' : ''
              ]"
            >{{holdRate}}</span>
            <span>持仓收益率</span>
          </div>
        </div>
        <div v-if="peddingsLength" class="tradeing">
          <div>
            <span class="num">{{peddingsLength}}</span>
            笔交易待确定中，在途资金 {{pending}}{{currency}}
          </div>
          <div @click="$router.push('/mine/fund/trade-pending-record')" class="icon-wrap">
            <svg-icon icon-class="mine-fund-next" class="icon" />
          </div>
        </div>
      </div>
      <div class="record">
        <template v-if="holdFunds.length">
          <FundCard v-for="option in holdFunds" :option="option" :key="option.fund_user_stat_id" />
        </template>
        <template v-else>
          <div class="no-record">
            <svg-icon icon-class="mine-fund-no-record" class="no-record-icon" />
            <div>暂无持仓记录</div>
          </div>
        </template>
      </div>
    </div>
    <ActionSheet v-model="showSelect" :actions="currencyList" @select="onSelect" />
  </div>
</template>

<script>
import { ActionSheet, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import { numberWithThousands } from '@utils/tools';
import FundCard from './components/FundCard.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('product/fund');

export default {
  name: 'MineFund',
  components: {
    BgainNavBar,
    ActionSheet,
    FundCard,
  },
  data() {
    return {
      list: ['1'],
      currency: 'BTC',
      yesterday: '---', // 昨日盈亏
      hold: '---', // 持仓收益
      holdRate: '', // 持仓收益率
      amount: '---', // 资金
      pending: '', // 在途资金
      showSelect: false,
      currencyList: [],
    };
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      await this.getHoldingFunds();
      await this.getFundOrderHistory('pending');
      this.currencyList = Object.keys(this.holdCurencies).map(item => ({
        name: item.toLocaleUpperCase(),
      }));
      this.onChangeCurrency('BTC');
      Toast.clear();
    } catch (error) {
      Toast.clear();
      throw error;
    }
  },
  computed: {
    ...mapGetters(['holdFunds', 'holdCurencies', 'orderHistory', 'peddingsLength', 'holdTotalPnlRatio']),
    ...mapState(['holdingFunds']),
  },
  methods: {
    ...mapActions(['getHoldingFunds', 'getFundOrderHistory']),
    onRecord() {
      // 历史交易记录
      this.$router.push('/mine/fund/trade-record-history');
    },
    numberWithThousands(num) {
      return numberWithThousands(num);
    },
    showSelectFun() {
      this.showSelect = true;
    },
    onChangeCurrency(currency) {
      this.currency = currency;
      const currencys = this.holdCurencies[currency] ? this.holdCurencies[currency]
        : this.holdCurencies[currency.toLocaleLowerCase()];
      if (currencys.total_pnl === 0) {
        this.hold = 0;
      } else {
        this.hold = currencys.total_pnl
          ? this.changeFloat(currencys.total_pnl) : this.hold;
      }
      if (currencys.total_yesterday_change === 0) {
        this.yesterday = 0;
      } else {
        this.yesterday = currencys.total_yesterday_change
          ? this.changeFloat(currencys.total_yesterday_change) : this.yesterday;
      }
      if (currencys.pending_amount === 0) {
        this.pending = 0;
      } else {
        this.pending = this.changeFloat(currencys.pending_amount)
          ? this.changeFloat(currencys.pending_amount) : this.pending;
      }
      this.holdRate = this.holdingFunds.total_pnl_ratio * 1 === 0 ? 0 : `${this.holdingFunds.total_pnl_ratio}%` || '---';
      if (this.holdTotalPnlRatio === 0) {
        this.holdRate = '0%';
      } else {
        this.holdRate = this.holdTotalPnlRatio ? `${this.holdTotalPnlRatio.toFixed(2)}%` : '---';
      }
      if (currencys.total_holding_market_value === 0) {
        this.amount = 0;
      } else {
        this.amount = currencys.total_holding_market_value
          ? currencys.total_holding_market_value : this.amount;
      }
      this.amount = this.changeFloat(this.amount);
    },
    onSelect(item) {
      this.onChangeCurrency(item.name);
      this.showSelect = false;
    },
    addZero(num) {
      const value = num;
      const float = value.toString().split('.');
      if (float.length > 1 && float[1].length < 2) {
        return `${value.toString()}0`;
      }
      return `${value.toString()}.00`;
    },
    changeFloat(num) {
      const float = num.toString().indexOf('.');
      if (this.currency === 'CNY') {
        if ((num.toString().length - float - 1) < 2) {
          return this.addZero(num);
        }
        return num.toString().slice(0, (float + 3));
      }
      if (this.currency === 'USDT') {
        return num.toString().slice(0, (float + 3));
      }
      return num.toString().slice(0, (float + 5));
    },
  },
};
</script>

<style lang='scss'>
.mine-fund {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  .van-nav-bar__right {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .record {
      width: 18px;
      height: 22px;
    }
  }
  .mine-fund-con {
    flex: 1;
    display: flex;
    flex-direction: column;
    .information {
      background: #ffffff;
      .currency {
        width: 100%;
        font-size: 12px;
        color: #6a707d;
        letter-spacing: 0;
        text-align: center;
        margin-bottom: 14px;
        padding-top: 18px;
        line-height: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        .currency-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            .icon-select {
              width: 11.2px;
              height: 7.4px;
              margin-left: 3.9px;
            }
          }
        }
      }
      .amount {
        text-align: center;
        margin-bottom: 20px;
        .num {
          height: 30px;
          font-size: 30px;
          color: #333333;
          line-height: 30px;
          box-sizing: border-box;
          padding: 6px 0;
          &.computed {
            font-size: 12px;
            color: #dee0e4;
          }
        }
        .text {
          font-size: 12px;
          color: #a8aeb9;
        }
      }
      .assets-change {
        display: flex;
        box-sizing: border-box;
        padding: 0 0 12px 20px;
        font-size: 12px;
        color: #a8aeb9;
        .assets-change-con {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .num {
            height: 16px;
            line-height: 16px;
            font-size: 14px;
            color: #333333;
            margin-bottom: 8px;
            &.profit {
              color: #00b870;
            }
            &.loss {
              color: #ff5c5c;
            }
            &.computed {
              font-size: 12px;
              color: #dee0e4;
            }
          }
        }
      }
      .tradeing {
        height: 41px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        border-top: 1px solid #eeeeee;
        font-size: 12px;
        color: #002e00;
        .num {
          color: #3c64ee;
        }
        .icon-wrap {
          display: flex;
          align-items: center;
          align-content: center;
          .icon {
            width: 7px;
            height: 11px;
          }
        }
      }
    }
    .record {
      flex: 1;
      background: #f8f8f8;
      .no-record {
        height: calc(100% - 10px);
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #ffffff;
        margin-top: 10px;
        font-size: 14px;
        color: #a8aeb9;
        .no-record-icon {
          width: 102px;
          height: 78px;
          margin: 60px 0 12px;
        }
      }
    }
  }
}
</style>
