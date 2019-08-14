<template>
  <div class="info-card__container">
    <div class="product__name">{{dataSource.integral_product_name}}</div>
    <div class="product__price-wrapper">
      <div class="product__price">
        <div class="product__price-bgp">
          <svg-icon icon-class="product-bgp" />
          {{price}}
        </div>
        <div class="product__price-real">{{originPrice}}</div>
      </div>
      <div class="product__stoke">
        <div class="stoke__text">库存：</div>
        <div class="stoke__value">{{dataSource.stock}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberWithThousands } from '@/utils/tools';

export default {
  name: 'ProductInfoCard',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return numberWithThousands(this.dataSource.fbpprice_record);
    },
    originPrice() {
      return numberWithThousands(this.dataSource.origin_fbpprice_record);
    },
  },
};
</script>

<style lang="scss" scoped>
  .info-card__container {
    padding: 10px 20px;
    background: #ffffff;

    .product__name {
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }

    .product__price-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;

      .product__price {
        display: flex;

        .product__price-bgp {
          .icon-bgp {
            width: 18px;
            height: 16px;
            margin-right: 7px;
          }

          font-size: 20px;
          line-height: 28px;
          color: #3C64EE;
        }

        .product__price-real {
          margin-left: 13px;
          font-size: 15px;
          line-height: 28px;
          color: #999999;
          text-decoration: line-through;
        }
      }

      .product__stoke {
        display: flex;

        .stoke__text {
          font-size: 12px;
          color: #666666;
          line-height: 28px;
        }

        .stoke__value {
          font-size: 15px;
          color: #2A2A2A;
          line-height: 28px;
        }
      }
    }
  }
</style>
