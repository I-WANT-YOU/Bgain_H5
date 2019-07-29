<template>
  <currency-tab
    :currencies="currencies"
    @currency-change="onCurrencyChange"
  >
    <pull-refresh v-model="isLoading" @refresh="onRefresh(currency)" success-text="加载成功">
      <div class="bg-fixed__content">
        <fixed-card
          v-for="product in products"
          :key="product.product_id"
          :data-source="product"/>
      </div>
    </pull-refresh>
  </currency-tab>
</template>

<script>
import { PullRefresh, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import CurrencyTab from '../components/CurrencyTab.vue';
import FixedCard from './components/FixedCard.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('product/fixed');

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
      currency: 'BTC',
      products: [],
      fixed: {},
    };
  },
  computed: {
    ...mapGetters({
      currencies: 'currencies',
      getProducts: 'getFixedProductsByCurrency',
    }),
  },
  mounted() {
    this.onRefresh(this.currency);
  },
  methods: {
    ...mapActions([
      'getFixedProducts',
    ]),
    onCurrencyChange(currency) {
      this.currency = currency;
      this.products = this.getProducts(currency);
    },
    async onRefresh(currency) {
      try {
        await this.getFixedProducts();
        this.products = this.getProducts(currency);
        this.isLoading = false;
      } catch (error) {
        Toast(error.message);
        this.isLoading = false;
      }
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
