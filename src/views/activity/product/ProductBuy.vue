<template>
  <div class="product-buy__container">
    <nav-bar title="兑换确认" />
    <address-card :data-source="address" v-if="isShowAddress" />
    <product-buy-info-card :data-source="product"/>
    <div class="buy__button--wrapper">
      <Button type="info" :fluid="true" @click="onBuyClick">确认兑换</Button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import { get } from 'lodash';
import AddressCard from './components/AddressCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainButton from '@/components/BgainButton.vue';
import ProductBuyInfoCard from './components/ProductBuyInfoCard.vue';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('activity');

const PRODUCT_TYPE = {
  ENTITY: 'ENTITY',
  VIRTUAL_WITH_BAR_CODES: ' VIRTUAL_WITH_BAR_CODES',
  COUPON: 'COUPON',
};

export default {
  name: 'ProductBuy',
  components: {
    AddressCard,
    ProductBuyInfoCard,
    NavBar: BgainNavBar,
    Button: BgainButton,
  },
  computed: {
    ...mapState(['address', 'product']),
    ...mapGetters(['orderId']),
    isShowAddress() {
      return get(this.product, 'integral_product_type', 'VIRTUAL_WITH_BAR_CODES') === PRODUCT_TYPE.ENTITY;
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    try {
      Toast.loading({
        duration: 0,
      });
      await Promise.all([this.getAddressDetail(), this.getBgpProductDetail(id)]);
      Toast.clear();
    } catch (error) {
      Toast(error);
    }
  },
  methods: {
    ...mapActions(['getAddressDetail', 'getBgpProductDetail', 'buyBgpProduct']),
    async onBuyClick() {
      const { id } = this.product;
      if (this.isShowAddress && this.address === null) {
        Toast('请添加收货地址');
      } else {
        try {
          Toast.loading({
            duration: 0,
            text: '兑换中...',
          });
          await this.buyBgpProduct(id);
          Toast.clear();
        } catch (error) {
          this.$router.push({
            name: 'product-result-fail',
            params: {
              id,
            },
          });
          Toast.clear();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .product-buy__container {
    height: 100%;
    background: #f8f8f8;

    .buy__button--wrapper {
      margin-top: 60px;
      padding: 0 22px;
    }
  }
</style>
