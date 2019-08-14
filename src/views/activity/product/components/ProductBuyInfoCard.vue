<template>
  <div class="buy-card__container">
    <div class="buy-card__title van-hairline--bottom">{{title}}</div>
    <div class="buy-card__content">
      <div class="content__info--wrapper">
        <VanImage
          height="86px"
          width="80px"
          :src="dataSource.thumbnail_url"
          style="margin-right: 16px"/>
        <div class="content__info">
          <div class="content__info-text van-ellipsis">{{dataSource.integral_product_name}}</div>
          <div class="content__info-text">
            <span class="content__info-number">x1</span>{{originPrice}}积分
          </div>
        </div>
      </div>
      <div class="content__price">{{price}}</div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant';
import { numberWithThousands } from '@utils/tools';

export default {
  name: 'ProductBuyInfoCard',
  components: {
    VanImage: Image,
  },
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '兑换信息',
    },
  },
  computed: {
    price() {
      return numberWithThousands(this.dataSource.fbpprice);
    },
    originPrice() {
      return numberWithThousands(this.dataSource.origin_fbpprice);
    },
  },
};
</script>

<style lang="scss" scoped>
  .buy-card__container {
    background: #ffffff;

    .buy-card__title {
      margin-top: 10px;
      padding: 15px 20px;
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }

    .buy-card__content {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content__info--wrapper {
        display: flex;
        align-items: center;

        .content__info {
          display: flex;
          flex-direction: column;

          :first-child {
            margin-bottom: 5px;
          }

          .content__info-text {
            max-width: 130px;
            font-size: 13px;
            color: #333333;
            line-height: 18px;
          }

          .content__info-number {
            font-size: 13px;
            color: #999999;
            line-height: 18px;
            margin-right: 10px;
          }
        }
      }

      .content__price {
        font-size: 20px;
        color: #3C64EE;
        line-height: 28px;
      }
    }
  }
</style>
