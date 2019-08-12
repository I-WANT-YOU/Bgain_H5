<template>
  <div @click="onSkip" class="fund-card">
    <div class="title">
      <span class="icon-wrap">
        <svg-icon class="icon" :icon-class="iconClass" />
      </span>
      <span>{{option.fund_product_name}}</span>
    </div>
    <div class="assets-change">
      <div class="con">
        <div class="num">{{option.holding_market_value}}</div>
        <div>持仓市值</div>
      </div>
      <div class="con">
        <!-- eslint-disable -->
        <div class="num">{{!option.yesterday_change ? 0 : option.yesterday_change > 0 ? `+${option.yesterday_change}` : option.yesterday_change}}</div>
        <!-- eslint-enable -->
        <div>昨日盈亏</div>
      </div>
      <div class="con">
        <!-- eslint-disable -->
        <div :class="['num', option.holding_profit > 0 ? '' : 'loss']">{{option.holding_profit > 0 ? `+${option.holding_profit}` : option.holding_profit}}</div>
        <!-- eslint-enable -->
        <div>持仓收益</div>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$router.push(`/mine/fund/fund-hold-detail/${this.option.fund_product_id}`);
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
      }
    }
  }
}
</style>
