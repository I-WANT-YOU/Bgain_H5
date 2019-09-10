<template>
  <currency-tab
    v-if="currencies.length !== 0"
    :currencies="currencies"
    :latestCurrency="latestCurrency"
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
/* eslint-disable no-underscore-dangle */

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
      latestCurrency: '',
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
    if (this.$route.query.currentType) { // 从详情页面返回
      this.latestCurrency = this.$route.query.currentType;
    }
    await this.onRefresh();
    Toast.clear();
  },
  methods: {
    ...mapActions([
      'getAllFixedProduct',
    ]),
    onCurrencyChange(currency) {
      window._czc.push(['_trackEvent', 'click', `定期盈-币种Tab-${currency}`]);
      this.currency = currency;
      this.products = this.getProducts(currency);
    },
    async onRefresh(currency) {
      try {
        await this.getAllFixedProduct();
        if (this.$route.query.currentType) {
          const initCurrency = this.$route.query.currentType;
          this.currency = initCurrency;
          this.products = this.getProducts(initCurrency);
        } else if (!isEmpty(currency)) {
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
