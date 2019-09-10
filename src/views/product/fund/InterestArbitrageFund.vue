<template>
  <div class="container">
    <BgainNavBar :onArrowClick="onArrowClick" title="冠军套利母基金"/>
    <van-image class="image-banner" :src="InterestArbitrageFund"/>
    <div class="buttonContainer"
         @click="onSkip">
      <van-image class="image-button" :src="CTAButton"/>
    </div>
        <BgainBaseDialog
      v-model="payment"
      :showCancel="false"
      content="您还未设置交易密码，暂无法进行购买"
      submitText="设置交易密码"
      @submit="setPayment"
      @cancel="cancelPayment"
    />
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { Image } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import { mapActions, mapGetters } from 'vuex';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import InterestArbitrageFund from '../../../assets/images/staticViews/InterestArbitrageFund.png';
import CTAButton from '../../../assets/images/staticViews/CTAButton.png';

export default {
  name: 'InterestArbitrageFund',
  data() {
    return {
      InterestArbitrageFund,
      CTAButton,
      payment: false,
    };
  },
  components: {
    'van-image': Image,
    BgainNavBar,
    BgainBaseDialog,
  },
  computed: {
    ...mapGetters({
      authLevel: 'user/authLevel',
    }),
  },
  methods: {
    ...mapActions({
      getUserSummary: 'user/getUserSummary',
    }),
    async onSkip() {
      window._czc.push(['_trackEvent', 'click', '冠军套利母基金-0.01起投']);
      try {
        await this.getUserSummary();
      } catch (error) {
        window.sessionStorage.setItem('loginFrom', `/product/fund/initial/In/${this.$route.params.id}`);
        throw error;
      }
      // 开放认购
      this.showstep = false;
      if (this.authLevel === 2) { // 1新用户 2设置交易密码
        this.$router.push(`/product/fund/subscribe/${this.$route.params.id}`);
      } else {
        this.payment = true;
      }
    },
    setPayment() {
      sessionStorage.setItem('payment', `/product/fund/noinitial/${this.$route.params.id}`);
      this.$router.push('/mine/safety/password/payment/set');
    },
    cancelPayment() {
      this.payment = false;
    },
    onArrowClick() {
      this.$router.push('/product/fund');
    },
  },
};
</script>

<style lang="scss" scoped>
  .image-banner{
    position: relative;
    width: 100%;
  }
  .buttonContainer{
    position: absolute;
    left: 97px;
    right: 97px;
    top: 420px;
    .image-button{
      width:181px;
      height: 52px;
    }
  }
</style>
