<template>
  <div class="detail-card__container">
    <div class="detail__header van-hairline--bottom">商品详情</div>
    <div class="detail__content">
      <div class="content__text">{{dataSource.description}}</div>
      <div class="content__button-wrapper">
        <Button
          type="info"
          :fluid="true"
          :disabled="buttonDisabled"
          @click="onClick">{{buttonText}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import BgainButton from '@/components/BgainButton.vue';

const { mapGetters } = createNamespacedHelpers('activity');
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user');

export default {
  name: 'ProductDetailCard',
  components: {
    Button: BgainButton,
  },
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
    onShowDialog: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['isEnoughBgp', 'isEnoughLevel', 'isEnoughStock']),
    ...mapUserState(['basicInfo']),
    buttonText() {
      if (!this.isEnoughBgp) {
        return '您的当前积分不足';
      } if (!this.isEnoughLevel) {
        return '您未达到兑换等级';
      } if (!this.isEnoughStock) {
        return '商品已售罄';
      }
      return '立即兑换';
    },
    buttonDisabled() {
      return !this.isEnoughBgp || !this.isEnoughLevel || !this.isEnoughStock;
    },
  },
  async mounted() {
    try {
      await this.getUserSummary();
    } catch (error) {
      throw error;
    }
  },
  methods: {
    ...mapUserActions(['getUserSummary']),
    onClick() {
      if (isEmpty(this.basicInfo)) {
      } else {
        this.onShowDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .detail-card__container {
    margin-top: 10px;
    background: #ffffff;

    .detail__header {
      padding: 15px 20px;
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }

    .detail__content {
      padding: 14px 20px 30px;

      .content__text {
        font-size: 12px;
        color: #666666;
        line-height: 22px;
        white-space: pre-line;
      }

      .content__button-wrapper {
        margin-top: 30px;
      }
    }
  }
</style>
