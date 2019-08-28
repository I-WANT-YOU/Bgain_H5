<template>
  <div class="current-trade__container">
    <bgain-nav-bar title="转出"></bgain-nav-bar>
    <div class="current-trade__content">
      <div class="content__panel">
        <div class="panel__title">转出数量({{currency}})</div>
        <Field
          v-model="amount"
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
          :disabled="amount === ''"
          @click="onSellClick"
        >
          确定
        </bgain-button>
      </div>
      <div class="content__description">
        <div class="content__description--title">转出说明</div>
        <div class="content__description--texts">
          <div>1. 当日14:00前转出，当日不计算收益，预计当日23:59前可到账；</div>
          <div>2. 当日14:00后转出，当日仍计算收益，预计T+1日23:59前到账；</div>
          <div>3. 转出暂不收取任何费用。</div>
        </div>
      </div>
    </div>
    <payment-password-dialog v-model="visible" @close="onClose" @submit="onSubmitClick"/>
  </div>
</template>

<script>
import { Field, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainButton from '@/components/BgainButton.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';
import PaymentPasswordDialog from '../components/PaymentPasswordDialog.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('product/current');
const { mapGetters: mapUserGetters, mapActions: mapUserActions } = createNamespacedHelpers('user');

export default {
  name: 'CurrentSell',
  components: {
    BgainButton,
    BgainNavBar,
    PaymentPasswordDialog,
    Field,
  },
  data() {
    return {
      amount: '',
      currency: '',
      visible: false,
    };
  },
  watch: {
    amount(newValue, oldValue) {
      const value = newValue.toString().replace(/[^\d.]/g, '');
      if (newValue === '.') {
        this.amount = '0.';
      } else if (oldValue === '0' && newValue.substr(newValue.length - 1) !== '.' && newValue !== '') {
        this.amount = '0';
      } else if (oldValue.toString().indexOf('.') > 0
        && oldValue.toString().indexOf('.') !== newValue.lastIndexOf('.')
        && newValue.substr(newValue.length - 1) === '.') {
        Toast('只能输入一个小数点');
        this.amount = value.replace(/\.{2,}/g, '.')
          .replace('.', '$#$')
          .replace(/\./g, '')
          .replace('$#$', '.');
      } else if (!(/^\d+\.?\d{0,8}$/.test(newValue))) {
        this.amount = value.substr(0, value.indexOf('.') + 9);
      } else if (newValue === '') {
        this.amount = '';
      } else {
        this.amount = value;
      }
    },
  },
  computed: {
    ...mapGetters(['maxSellAmount']),
    ...mapUserGetters(['authLevel']),
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
    ...mapActions(['getCurrentSellInfo', 'sellCurrentProduct']),
    ...mapUserActions(['getUserSummary']),
    async fetchSellInfo(currency) {
      try {
        await Promise.all([this.getCurrentSellInfo(currency), this.getUserSummary()]);
      } catch (error) {
        // Toast(error.message);
      }
    },
    onClickAll() {
      this.amount = this.maxSellAmount;
    },
    onSellClick() {
      if (this.amount === '0') {
        Toast('转出数量不可为 0，请重新输入');
      } else if (Number(this.amount) > this.maxSellAmount) {
        Toast(`最多转出 ${this.maxSellAmount} ${this.currency}，请重新输入`);
      } else {
        this.visible = true;
      }
    },
    async onSubmitClick(password) {
      try {
        await this.sellCurrentProduct({
          amount: this.amount,
          currency: this.currency,
          password,
        });
        this.$router.push({
          name: 'current-sell-result',
        });
      } catch (error) {
        Toast(error.message);
      }
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
  @import "./style/trade";
</style>
