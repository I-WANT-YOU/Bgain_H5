<template>
  <currency-tab
    v-if="currencies.length !== 0"
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
import { head, isEmpty } from 'lodash';
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
      currency: '',
      products: [],
    };
  },
  computed: {
    ...mapGetters({
      currencies: 'currencies',
      getProducts: 'getFixedProductsByCurrency',
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
    ...mapActions([
      'getAllFixedProduct',
    ]),
    onCurrencyChange(currency) {
      this.currency = currency;
      this.products = this.getProducts(currency);
    },
    async onRefresh(currency) {
      try {
        await this.getAllFixedProduct();
        if (!isEmpty(currency)) {
          this.products = this.getProducts(currency);
        } else {
          const initCurrency = head(this.currencies);
          this.currency = initCurrency;
          this.products = this.getProducts(initCurrency);
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

<style lang="scss">
  .bg-fixed__content {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
