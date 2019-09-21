<template>
  <div @click="onSkip" class="fund-card">
    <div class="title">
      <span class="icon-wrap">
        <!-- <svg-icon class="icon" :icon-class="iconClass" /> -->
        <img :src="option.icon_url" class="icon" alt />
      </span>
      <span>{{option.fund_product_name}}</span>
    </div>
    <div class="assets-change">
      <div class="con">
        <div class="num">{{numberWithThousands(changeFloat(option.holding_market_value))}}</div>
        <div>持仓市值</div>
      </div>
      <div class="con">
        <div
          :class="['num', option.yesterday_change
        && (option.yesterday_change * 1) > 0 ? 'loss' : 'profit',
        option.yesterday_change && option.yesterday_change === 0 ? 'computed' : '',
        option.yesterday_change ? '' : 'computed']"
        >
          {{!option.yesterday_change
          ? 0 : option.yesterday_change > 0
          ? `+${numberWithThousands(changeFloat(option.yesterday_change))}`
          : numberWithThousands(changeFloat(option.yesterday_change))}}
        </div>
        <div>昨日盈亏</div>
      </div>
      <div class="con">
        <div
          :class="['num', option.holding_profit
        && (option.holding_profit * 1) > 0 ? 'loss' : 'profit',
        option.holding_profit === 0 ? 'computed' : '']"
        >
          {{option.holding_profit > 0
          ? `+${changeFloat(option.holding_profit)}`
          : changeFloat(option.holding_profit)}}
        </div>
        <div>持仓收益</div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberWithThousands } from '@utils/tools';

export default {
  name: 'FundCard',
  props: ['option'],
  computed: {
    iconClass() {
      const str = this.option.currency_type.toLocaleLowerCase();
      return str === 'fbp' ? 'bgp' : str;
    },
  },
  methods: {
    onSkip() {
      this.$router.push({
        path: '/mine/fund/fund-hold-detail',
        query: {
          id: this.option.fund_product_id,
          currencyType: this.option.currency_type,
        },
      });
    },
    changeFloat(num) {
      const float = num.toString().indexOf('.');
      return num.toString().slice(0, (float + 5));
    },
    numberWithThousands(num) {
      return numberWithThousands(num * 1);
    },
  },
};
</script>

<style lang='scss' scoped>
.fund-card {
  box-sizing: border-box;
  padding: 13px 0 0 20px;
  background: #ffffff;
  margin-top: 10px;
  .title {
    font-size: 14px;
    color: #0f3256;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
      .icon {
        width: 50px;
        height: 20px;
      }
    }
  }
  .assets-change {
    display: flex;
    font-size: 12px;
    color: #a8aeb9;
    padding-bottom: 22px;
    .con {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .num {
        margin-bottom: 4px;
        font-size: 14px;
        color: #0f3256;
        &.profit {
          color: #00b870;
        }
        &.loss {
          color: #ff5c5c;
        }
        &.computed {
          color: #000000;
        }
      }
    }
  }
}
</style>
