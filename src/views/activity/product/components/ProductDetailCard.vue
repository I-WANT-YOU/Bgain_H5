<template>
  <div class="detail-card__container">
    <div class="detail__header van-hairline--bottom">商品详情</div>
    <div class="detail__content">
      <div class="content__text">{{dataSource.description}}</div>
      <div class="content__button-wrapper">
        <Button type="info" :fluid="true" :disabled="buttonDisabled" @click="onClick">{{buttonText}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainButton from '@/components/BgainButton.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('activity');
const { mapActions: mapAuthActions } = createNamespacedHelpers('auth');

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
  data() {
    return {
      login: false,
    };
  },
  computed: {
    ...mapGetters(['isEnoughBgp', 'isEnoughLevel', 'isEnoughStock']),
    buttonText() {
      if (this.login && !this.isEnoughBgp) {
        return '您的当前积分不足';
      } if (this.login && !this.isEnoughLevel) {
        return '您未达到兑换等级';
      } if (this.login && !this.isEnoughStock) {
        return '商品已售罄';
      }
      return '立即兑换';
    },
    buttonDisabled() {
      return this.login ? (!this.isEnoughBgp || !this.isEnoughLevel || !this.isEnoughStock) : false;
    },
  },
  async mounted() {
    try {
      this.isLogin().then(() => {
        this.login = true;
      }, () => {
        this.login = false;
      });
      if (this.dataSource.id) {
        await this.getBgpProductDetail(this.dataSource.id);
      }
    } catch (error) {
      throw error;
    }
  },
  methods: {
    ...mapActions(['getBgpProductDetail']),
    ...mapAuthActions(['isLogin']),
    onClick() {
      if (this.login) {
        this.onShowDialog();
      } else {
        window.sessionStorage.setItem('loginFrom', `/activity/product/${this.dataSource.id}`);
        this.$router.push('/login');
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
