<template>
  <div class="kyc-card__container">
    <div class="kyc-card__icon">
      <svg-icon :icon-class="options[status].icon"/>
    </div>
    <div class="kyc-card__title">{{options[status].title}}</div>
    <div class="kyc-card__title--sub">{{options[status].subtitle}}</div>
    <div class="kyc-card__buttons" v-if="status === 'FAIL'">
      <bgain-button type="info" :fluid="true" @click="onSkip('/mine/safety/kyc')">重新认证</bgain-button>
    </div>
    <div class="kyc-card__buttons kyc-card__buttons--multi" v-if="status !== 'FAIL'">
      <div class="buttons--default" @click="onSkip('/')">浏览产品</div>
      <div class="buttons--info" @click="onSkip('/purchaseCoinHome')">去充币</div>
    </div>
  </div>
</template>

<script>
import BgainButton from '@/components/BgainButton.vue';

const KYC_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  PENDING: 'PENDING',
};

export default {
  name: 'KycResultCard',
  components: {
    BgainButton,
  },
  props: {
    status: {
      type: String,
      required: true,
      default: KYC_STATUS.FAIL,
      validator(value) {
        return Object.keys(KYC_STATUS)
          .indexOf(value) !== -1;
      },
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      options: {
        SUCCESS: {
          icon: 'kyc-success',
          title: '认证成功',
          subtitle: '',
        },
        FAIL: {
          icon: 'kyc-fail',
          title: '认证失败',
          subtitle: '',
        },
        PENDING: {
          icon: 'kyc-pending',
          title: '审核中',
          subtitle: '审核结果将在3个工作日内给出',
        },
      },
    };
  },
  mounted() {
    console.log(this.status);
  },
  methods: {
    onSkip(router) {
      this.$router.push(router);
    },
  },
};
</script>

<style lang="scss" scoped>
  .kyc-card__container {
    height: calc(100% - 46px);
    padding-top: 61px;
    box-sizing: border-box;

    .kyc-card__icon {
      text-align: center;
      svg {
        width: 117px;
        height: 111px;
      }
    }

    .kyc-card__title {
      margin-top: 30px;
      font-size: 20px;
      color: #0F3256;
      line-height: 21px;
      text-align: center;
    }

    .kyc-card__title--sub {
      margin-top: 9px;
      height: 20px;
      font-size: 14px;
      color: #6A707D;
      line-height: 20px;
      text-align: center;
    }

    .kyc-card__buttons {
      margin-top: 70px;
      padding: 0 22px;
    }

    .kyc-card__buttons--multi {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 35px;

      .buttons--default {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 130px;
        height: 46px;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
        color: #888888;
        font-size: 16px;
      }

      .buttons--info {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 160px;
        height: 46px;
        font-size: 16px;
        color: #FBFCFB;
        background: #3C64EE;
        border-radius: 4px;
      }
    }
  }
</style>
