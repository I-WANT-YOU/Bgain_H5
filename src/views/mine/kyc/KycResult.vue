<template>
  <div class="kyc-result__container">
    <bgain-nav-bar title="身份认证"></bgain-nav-bar>
    <kyc-result-card status="PENDING"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import KycResultCard from './components/KycResultCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapActions, mapState } = createNamespacedHelpers('user');

export default {
  name: 'KycResult',
  components: {
    KycResultCard,
    BgainNavBar,
  },
  computed: {
    ...mapState(['kycInfo']),
  },
  methods: {
    ...mapActions(['getKycInfo']),
  },
};
</script>

<style lang="scss" scoped>
  .kyc-result__container {
    height: 100%;
  }
</style>
