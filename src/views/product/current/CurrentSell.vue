<template>
  <div class="current-trade__container">
    <bgain-nav-bar title="转出"></bgain-nav-bar>
    <div class="current-trade__content">
      <div class="content__panel">
        <div class="panel__title">转出数量({{currency}})</div>
        <Field
          type="number"
          v-model="value"
          :placeholder="`最多转出 ${maxSellAmount} ${currency}`"
          :border="false">
          <template v-slot:button>
            <div class="panel__all" @click="onClickAll">全部</div>
          </template>
        </Field>
      </div>
      <div class="content__button">
        <bgain-button
          type="info"
          :fluid="true"
          :disabled="value === ''">
          确定
        </bgain-button>
      </div>
      <div class="content__description">
        <div class="content__description--title">转出说明</div>
        <div class="content__description--texts">
          <div>1. 当日12:00前转出，当日不计算收益，预计当日23:59前可到账；</div>
          <div>2. 当日12:00后转出，当日仍计算收益，预计T+1日23:59前到账；</div>
          <div>3. 转出暂不收取任何费用。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainButton from '@/components/BgainButton.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('product/current');

export default {
  name: 'CurrentSell',
  components: {
    BgainButton,
    BgainNavBar,
    Field,
  },
  data() {
    return {
      value: '',
      currency: '',
    };
  },
  computed: {
    ...mapGetters(['maxSellAmount']),
  },
  async mounted() {
    this.currency = this.$route.params.currency;
    Toast.loading({
      message: '加载中...',
    });
    await this.fetchSellInfo(this.currency);
    Toast.clear();
  },
  methods: {
    ...mapActions(['getCurrentSellInfo']),
    async fetchSellInfo(currency) {
      try {
        await this.getCurrentSellInfo(currency);
      } catch (error) {
        Toast(error.message);
      }
    },
    onClickAll() {
      this.value = this.maxSellAmount;
    },
  },
};
</script>

<style lang="scss">
  @import "./style/trade";
</style>
