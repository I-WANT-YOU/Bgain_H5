<template>
  <div class="kyc-result__container">
    <bgain-nav-bar :onArrowClick="goSafety" title="身份认证"></bgain-nav-bar>
    <kyc-result-card :status="status" :subtitle="subtitle" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import KycResultCard from './components/KycResultCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('user');

const STATUS = {
  auditing: 'PENDING',
  failed: 'FAIL',
  rejected: 'REJECTED',
  certified: 'SUCCESS',
  unaudited: 'PENDING',
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
      return STATUS[this.submitKycStatus.toLocaleLowerCase()];
    },
    subtitle() {
      if (this.submitKycStatus.toLocaleLowerCase() !== 'failed'
        && this.submitKycStatus.toLocaleLowerCase() !== 'rejected') return '';
      return this.submitKycMsg;
    },
  },
  async mounted() {
    /* 监听浏览器回退操作 */
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.watchBack);
    }
    try {
      await this.getKycInfo();
    } catch (error) {
      throw error;
    }
  },
  methods: {
    ...mapActions(['getKycInfo']),
    /* 处理回退事件 */
    watchBack() {
      window.removeEventListener('popstate', this.watchBack);
      window.history.go(-1);
    },
    goSafety() {
      this.$router.push('/mine/safety');
    },
    goBack() {
      sessionStorage.clear();
      this.$router.replace('/mine/safety');
    },
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false);
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.clear();
    next();
  },
};
</script>

<style lang="scss" scoped>
.kyc-result__container {
  height: 100%;
}
</style>
