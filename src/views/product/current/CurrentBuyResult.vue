<template>
  <div class="current-result__container">
    <bgain-nav-bar title="转入结果" :show-arrow="false"></bgain-nav-bar>
    <div class="current-result__content">
      <div class="content-steps">
        <svg-icon icon-class="passed" class="icon-passed"></svg-icon>
        <div class="divider--blue"></div>
        <svg-icon icon-class="clock" class="icon-clock"></svg-icon>
        <div class="divider--gray"></div>
        <svg-icon icon-class="clock" class="icon-clock"></svg-icon>
      </div>
      <div class="content-text__cards">
        <div class="content-text__card">
          <div class="card__title">转入成功</div>
          <div class="card__content">转入{{buyAmount}} {{currency}}</div>
        </div>
        <div class="content-text__card">
          <div class="card__title">计算收益</div>
          <div class="card__content">预计{{startDate}} 开始计息</div>
        </div>
        <div class="content-text__card">
          <div class="card__title">收益到账</div>
          <div class="card__content">预计{{endDate}} 可看到收益</div>
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
  name: 'CurrentBuyResult',
  components: {
    BgainButton,
    BgainNavBar,
  },
  computed: {
    ...mapGetters('product/current', ['buyAmount', 'buyStartDate']),
    currency() {
      return this.$route.params.currency;
    },
    startDate() {
      return dayjs(this.buyStartDate).format('MM-DD');
    },
    endDate() {
      return dayjs(this.buyStartDate).add(1, 'day').format('MM-DD');
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
