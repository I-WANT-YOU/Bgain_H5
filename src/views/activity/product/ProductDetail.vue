<template>
  <div class="product-detail__container">
    <nav-bar title="商品详情页" :on-arrow-click="onGoActivity"/>
    <div class="product-detail__content">
      <swipe @change="onChange" style="height: 240px">
        <swipe-item :key="image" v-for="image in images">
          <VanImage :src="image" width="100%" height="240px"/>
        </swipe-item>

        <div class="custom-indicator" slot="indicator">
          <span class="indicator__index--current">{{ current + 1 }}</span>
          <span class="indicator__index--center">/</span>
          <span class="indicator__index--total">{{images.length}}</span>
        </div>
      </swipe>

      <product-info-card :data-source="product" />
      <product-detail-card :data-source="product" :on-show-dialog="onShow"/>
    </div>
    <bgain-base-dialog
      v-model="visible"
      @cancel="onCancel"
      @submit="onSubmit"
      :content="content"
    />
  </div>
</template>

<script>
import { get } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import {
  Swipe, SwipeItem, Image, Toast,
} from 'vant';
import { strip } from '@utils/tools';
import BgainBaseDialog from '@/components/BgainBaseDialog.vue';
import ProductDetailCard from './components/ProductDetailCard.vue';
import ProductInfoCard from './components/ProductInfoCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapActions, mapState } = createNamespacedHelpers('activity');

const LIMIT_ERROR = {
  TOTAL_BY_DAY: '今日已到达兑换上限',
  TOTAL: '已到达兑换上限',
};

export default {
  name: 'ProductDetail',
  components: {
    BgainBaseDialog,
    NavBar: BgainNavBar,
    Swipe,
    SwipeItem,
    VanImage: Image,
    ProductInfoCard,
    ProductDetailCard,
  },
  data() {
    return {
      current: 0,
      visible: false,
    };
  },
  computed: {
    ...mapState(['product']),
    images() {
      return JSON.parse(get(this.product, 'detail_png_url', '[]'));
    },
    content() {
      const { fbpprice_record: price, fbpamt_record: amount } = this.product;
      return `该商品使用 ${price}BGP 兑换兑换后，剩余 ${strip(parseInt(amount, 10) - parseInt(price, 10))}BGP确定兑换？`;
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    try {
      Toast.loading({
        duration: 0,
      });
      await this.getBgpProductDetail(id);
      Toast.clear();
    } catch (error) {
      Toast(error);
    }
  },
  methods: {
    ...mapActions(['getBgpProductDetail']),
    onChange(index) {
      this.current = index;
    },
    onShow() {
      this.visible = true;
    },
    onCancel() {
      this.visible = false;
    },
    onSubmit() {
      const { is_reach_limit_time: isReach, purchase_limit_type: limitType } = this.product;
      if (isReach) {
        Toast(LIMIT_ERROR[limitType]);
      } else {
        this.$router.push({
          name: 'product-buy',
          params: {
            id: this.product.id,
          },
        });
      }
    },
    onGoActivity() {
      this.$router.push({
        name: 'activity',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .product-detail__container {
    height: 100%;
    background: #f8f8f8;

    .product-detail__content {
      .custom-indicator {
        position: absolute;
        right: 16px;
        bottom: 16px;
        padding: 0 8px;
        border-radius: 10px;
        color: #fff;
        background: rgba(0,0,0,0.30);
        line-height: 18px;
        font-size: 16px;

        .indicator__index--current {
          font-size: 16px;
        }
        .indicator__index--center {
          font-size: 13px;
        }
        .indicator__index--total {
          font-size: 12px;
        }
      }
    }
  }
</style>
