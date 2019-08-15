<template>
  <div class="result__container">
    <nav-bar title="兑换结果" :on-arrow-click="onContinue"/>
    <address-card :data-source="address" v-if="isShowAddress"/>
    <order-success-card :data-source="buyResult"/>
    <product-buy-info-card title="兑换商品" :data-source="buyResult"/>
    <div class="result__button--wrapper">
      <Button type="info" :fluid="true" @click="onContinue">继续兑换</Button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { get } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import OrderSuccessCard from './components/OrderSuccessCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainButton from '@/components/BgainButton.vue';
import AddressCard from './components/AddressCard.vue';
import ProductBuyInfoCard from './components/ProductBuyInfoCard.vue';

const { mapState, mapActions } = createNamespacedHelpers('activity');

const PRODUCT_TYPE = {
  ENTITY: 'ENTITY',
  VIRTUAL_WITH_BAR_CODES: ' VIRTUAL_WITH_BAR_CODES',
  COUPON: 'COUPON',
};

export default {
  name: 'ProductResult',
  components: {
    OrderSuccessCard,
    ProductBuyInfoCard,
    AddressCard,
    NavBar: BgainNavBar,
    Button: BgainButton,
  },
  computed: {
    ...mapState(['address', 'buyResult']),
    isShowAddress() {
      return get(this.product, 'integral_product_type', 'VIRTUAL_WITH_BAR_CODES') === PRODUCT_TYPE.ENTITY;
    },
  },
  async mounted() {
    const { orderId } = this.$route.params;
    try {
      Toast.loading({
        duration: 0,
      });
      await Promise.all([
        this.getAddressDetail(),
        this.getBuyProductResultByOrderId(orderId),
      ]);
      Toast.clear();
    } catch (error) {
      Toast(error);
      Toast.clear();
    }
  },
  methods: {
    ...mapActions(['getAddressDetail', 'getBuyProductResultByOrderId']),
    onContinue() {
      const { integral_product_id: productId = -1 } = this.buyResult;
      this.$router.push({
        name: 'product-detail',
        params: {
          id: productId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .result__container {
    height: 100%;
    background: #f8f8f8;

    .result__button--wrapper {
      padding: 0 22px;
      margin: 60px 0 30px;
    }
  }
</style>
