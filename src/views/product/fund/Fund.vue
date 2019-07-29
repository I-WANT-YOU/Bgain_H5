<template>
  <div class="fund">
    <Screen :options="options" />
    <div>dsfsd</div>
  </div>
</template>

<script>
import Screen from './components/Screen.vue';

export default {
  name: 'Fund',
  components: {
    Screen,
  },
  data() {
    return {
      options: [
        { type: 'currency_type', active: 'all', text: '币种', value: 0, children: ['BTC', 'USDT', 'ETH', 'EOS', 'USDT', 'ETH'] },
        { type: 'fund_product_type', active: 'all', text: '策略类型', value: 1, children: ['CTA', '套利', '高频', '混合'] },
        { type: 'risk_level_type', active: 'all', text: '风险值', value: 2, children: ['R1', 'R2', 'R3', 'R4'] },
      ],
    };
  },
};
// {
//  "currency_type":"USDT", // 货币类型
//  "fund_product_type":"MixedStrategies", // 基金类型
//  "risk_level_type":"R1_LOW_RISK" // 风险等级
// }
</script>

<style lang='scss' scoped>
.fund {
  width: 100%;
}
</style>
