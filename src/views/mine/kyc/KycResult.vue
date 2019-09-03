<template>
  <div class="kyc-result__container">
    <bgain-nav-bar :onArrowClick="goSafety" title="身份认证"></bgain-nav-bar>
    <kyc-result-card :status="status" :subtitle="subtitle"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import KycResultCard from './components/KycResultCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapGetters } = createNamespacedHelpers('user');

const STATUS = {
  auditing: 'PENDING',
  failed: 'FAIL',
  certified: 'SUCCESS',
};

export default {
  name: 'KycResult',
  components: {
    KycResultCard,
    BgainNavBar,
  },
  computed: {
    ...mapGetters(['submitKycStatus', 'submitKycMsg']),
    status() {
      console.log(this.submitKycStatus);
      return STATUS[this.submitKycStatus];
    },
    subtitle() {
      if (this.submitKycStatus !== 'failed') return '';
      return this.submitKycMsg;
    },
  },
  methods: {
    onSafety() {
      this.$router.push('/mine/safety');
    },
  },
};
</script>

<style lang="scss" scoped>
  .kyc-result__container {
    height: 100%;
  }
</style>
