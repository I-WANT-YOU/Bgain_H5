<template>
  <div class="kyc-result__container">
    <bgain-nav-bar title="身份认证"></bgain-nav-bar>
    <kyc-result-card />
  </div>
</template>

<script>
import KycResultCard from './components/KycResultCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

export default {
  name: 'KycResult',
  components: {
    KycResultCard,
    BgainNavBar,
  },
};
</script>

<style lang="scss" scoped>
  .kyc-result__container {
    height: 100%;
  }
</style>
