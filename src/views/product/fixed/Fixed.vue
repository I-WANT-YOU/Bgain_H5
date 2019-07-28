<template>
  <currency-tab>
    <template v-slot:default="{currency}">
      <pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="bg-fixed__content">
          <p>{{currency}}</p>
        </div>
      </pull-refresh>
    </template>
  </currency-tab>
</template>

<script>
import { PullRefresh, Toast } from 'vant';
import CurrencyTab from '../components/CurrencyTab.vue';

export default {
  name: 'Fixed',
  components: {
    CurrencyTab,
    PullRefresh,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss">

</style>
