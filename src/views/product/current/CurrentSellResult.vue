<template>
  <div class="current-result__container">
    <bgain-nav-bar title="转出结果" :show-arrow="false"></bgain-nav-bar>
    <div class="current-result__content">
      <div class="content-steps">
        <svg-icon icon-class="passed" class="icon-passed"></svg-icon>
        <div class="divider--blue"></div>
        <svg-icon icon-class="clock" class="icon-clock"></svg-icon>
      </div>
      <div class="content-text__cards">
        <div class="content-text__card">
          <div class="card__title">转出申请提交</div>
          <div class="card__content">转出{{sellAmount}} {{currency}}</div>
        </div>
        <div class="content-text__card">
          <div class="card__title">资金到账</div>
          <div class="card__content">预计{{date}} 资金可到账</div>
        </div>
      </div>
    </div>
    <div class="current-result__button">
      <bgain-button type="info" :fluid="true" @click="onGoBackClick">返回</bgain-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
import BgainButton from '@/components/BgainButton.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

export default {
  name: 'CurrentSellResult',
  components: {
    BgainButton,
    BgainNavBar,
  },
  computed: {
    ...mapGetters('product/current', ['sellAmount', 'sellDate']),
    date() {
      return dayjs(this.sellDate).format('MM-DD');
    },
    currency() {
      return this.$route.params.currency;
    },
  },
  methods: {
    onGoBackClick() {
      this.$router.push({
        path: '/product/current',
      });
    },
  },
};
</script>

<style lang="scss">
  @import "./style/result";
</style>
