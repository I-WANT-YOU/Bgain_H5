<template>
  <div class="currency__tabs">
    <tabs
        sticky
        v-model="currency"
        @click="onCurrencyChange">
      <tab v-for="currency in currencies"
          :key="currency"
          :title="currency"
          :name="currency">
        <slot :currency="currency"></slot>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';

export default {
  name: 'CurrencyTab',
  components: {
    Tabs,
    Tab,
  },
  data() {
    return {
      currency: 'BTC',
      currencies: ['BTC', 'USDT', 'ETH', 'EOS', 'FBP'],
    };
  },
  methods: {
    onCurrencyChange() {
    },
  },
};
</script>

<style lang="scss">
  .currency__tabs {
    flex: 1;

    .van-tabs, .van-tab__pane,.van-pull-refresh, .van-pull-refresh__track {
      height: 100%;
    }

    .van-tabs__content {
     height: calc(100% - 44px);
    }

    .van-tab {
      color: #676C8D;
    }

    .van-tab--active {
      color: #3C64EE;
      font-weight: normal;
    }

    .van-hairline--top-bottom::after {
      border-color: #E5E9F6;
      border-width: 0 0 1px 0;
    }

    .van-tabs__line {
      width: 67px !important;
      height: 2px;
      background-color: #3C64EE;
    }
  }
</style>
