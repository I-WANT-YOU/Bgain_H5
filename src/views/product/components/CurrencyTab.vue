<template>
  <div class="currency__tabs">
  <tabs v-model="active" sticky>
    <tab v-for="index in 4" :title="'选项 ' + index">
      内容 {{ index }}
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
      active: 1,
    };
  },
};
</script>

<style lang="scss">
  .currency__tabs {
    .van-tabs__wrap {
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
