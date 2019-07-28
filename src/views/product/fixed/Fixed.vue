<template>
  <currency-tab>
    <template v-slot:default="{currency}">
      <pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="加载成功">
        <div class="bg-fixed__content">
          <fixed-card :data-source="fixed" />
        </div>
      </pull-refresh>
    </template>
  </currency-tab>
</template>

<script>
import { PullRefresh } from 'vant';
import CurrencyTab from '../components/CurrencyTab.vue';
import FixedCard from './components/FixedCard.vue';

export default {
  name: 'Fixed',
  components: {
    CurrencyTab,
    PullRefresh,
    FixedCard,
  },
  data() {
    return {
      isLoading: false,
      fixed: {},
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss">
  .bg-fixed__content {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
