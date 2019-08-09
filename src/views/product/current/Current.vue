<template>
  <currency-tab
    v-if="currencies.length !== 0"
    :currencies="currencies"
    @currency-change="onCurrencyChange">
    <pull-refresh v-model="isLoading" @refresh="onRefresh(currency)" success-text="加载成功">
      <current-card :data-source="product"></current-card>
      <current-panel></current-panel>
    </pull-refresh>
  </currency-tab>
</template>

<script>
import { head, isEmpty } from 'lodash';
import { PullRefresh, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import CurrencyTab from '../components/CurrencyTab.vue';
import CurrentPanel from './components/CurrentPanel.vue';
import CurrentCard from './components/CurrentCard.vue';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('product/current');

export default {
  name: 'Current',
  components: {
    PullRefresh,
    CurrencyTab,
    CurrentPanel,
    CurrentCard,
  },
  data() {
    return {
      isLoading: false,
      currency: '',
      product: {},
    };
  },
  computed: {
    ...mapState(['currencies']),
    ...mapGetters({
      getProduct: 'getCurrentProductsByCurrency',
    }),
  },
  async mounted() {
    Toast.loading({
      message: '加载中...',
    });
    await this.onRefresh();
    Toast.clear();
  },
  methods: {
    ...mapActions(['getAllCurrentProduct']),
    onCurrencyChange(currency) {
      this.currency = currency;
      this.product = this.getProduct(currency);
    },
    async onRefresh(currency) {
      try {
        await this.getAllCurrentProduct();
        if (!isEmpty(currency)) {
          this.product = this.getProduct(currency);
        } else {
          const initCurrency = head(this.currencies);
          this.currency = initCurrency;
          this.product = this.getProduct(initCurrency);
        }
        this.isLoading = false;
      } catch (error) {
        Toast(error.message);
        this.isLoading = false;
      }
    },
  },
};
</script>
