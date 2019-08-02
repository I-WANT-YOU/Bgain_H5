<template>
  <div class="current-trade__container">
    <bgain-nav-bar title="转入"></bgain-nav-bar>
    <div class="current-trade__content">
      <div class="content__panel">
        <div class="panel__title">转入数量({{currency}})</div>
        <Field
          type="number"
          v-model="amount"
          :placeholder="`起投 ${minBuyAmount} ${currency}`"
          :border="false">
        </Field>
        <divider></divider>
        <div class="panel__subcontent">
          <div class="panel__title--sub">可用余额</div>
          <div class="panel__number">{{buyBalance}} {{currency}}</div>
        </div>
      </div>
      <div class="content__button">
        <bgain-button
          type="info"
          :fluid="true"
          :disabled="amount === ''"
          @click="onSubmitClick"
        >
          转入
        </bgain-button>
      </div>
      <div class="content__description">
        <div class="content__description--title">转入说明</div>
        <div class="content__description--texts">
          <div>1. 当日18:00前转入，预计T+1日开始计息；</div>
          <div>2. 当日18:00后转入，预计T+2日开始计息；</div>
          <div>3. 转入不收取任何费用。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Divider, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainButton from '@/components/BgainButton.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('product/current');

export default {
  name: 'CurrentBuy',
  components: {
    BgainNavBar,
    BgainButton,
    Field,
    Divider,
  },
  data() {
    return {
      amount: '',
      currency: '',
    };
  },
  computed: {
    ...mapGetters(['minBuyAmount', 'buyBalance']),
  },
  async mounted() {
    this.currency = this.$route.params.currency;
    Toast.loading({
      message: '加载中...',
    });
    await this.fetchBuyInfo(this.currency);
    Toast.clear();
  },
  methods: {
    ...mapActions(['getCurrentBuyInfo', 'buyCurrentProduct']),
    async fetchBuyInfo(currency) {
      try {
        await this.getCurrentBuyInfo(currency);
      } catch (error) {
        Toast(error.message);
      }
    },
    async onSubmitClick() {
      try {
        await this.buyCurrentProduct({
          amount: 0.1,
          currency: 'BTC',
          password: '123456',
        });
        this.$router.push({
          name: 'current-buy-result',
        });
      } catch (error) {
        Toast(error.message);
      }
    },
  },
};
</script>

<style lang="scss">
  @import "./style/trade";
</style>
