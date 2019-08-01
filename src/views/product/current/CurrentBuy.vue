<template>
  <div class="current-trade__container">
    <bgain-nav-bar title="转入"></bgain-nav-bar>
    <div class="current-trade__content">
      <div class="content__panel">
        <div class="panel__title">转入数量(BTC)</div>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';

export default {
  name: 'CurrentBuy',
  components: { BgainNavBar },
};
</script>

<style lang="scss">
  @import "./style/trade";
</style>
