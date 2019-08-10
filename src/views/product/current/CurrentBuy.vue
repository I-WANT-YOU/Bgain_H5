<template>
  <div class="current-trade__container">
    <bgain-nav-bar title="转入"></bgain-nav-bar>
    <div class="current-trade__content">
      <div class="content__panel">
        <div class="panel__title">转入数量({{currency}})</div>
        <Field
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
          @click="onBuyClick"
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
    <insufficient-balance-dialog v-model="balanceVisible" @cancel="onBalanceCancel"/>
    <payment-password-dialog v-model="visible" @close="onClose" @submit="onSubmitClick"/>
  </div>
</template>

<script>
import { Field, Divider, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainButton from '@/components/BgainButton.vue';
import PaymentPasswordDialog from '../components/PaymentPasswordDialog.vue';
import InsufficientBalanceDialog from '../components/InsufficientBalanceDialog.vue';
import { AUTH_LEVEL } from '@/constants/options';

const { mapGetters, mapActions } = createNamespacedHelpers('product/current');
const { mapGetters: mapUserGetters, mapActions: mapUserActions } = createNamespacedHelpers('user');

export default {
  name: 'CurrentBuy',
  components: {
    BgainNavBar,
    BgainButton,
    PaymentPasswordDialog,
    InsufficientBalanceDialog,
    Field,
    Divider,
  },
  data() {
    return {
      amount: '',
      currency: '',
      visible: false,
      balanceVisible: false,
    };
  },
  watch: {
    amount(newValue, oldValue) {
      const value = newValue.replace(/[^\d.]/g, '');
      if (newValue === '.') {
        this.amount = '0.';
      } else if (oldValue === '0' && newValue.substr(newValue.length - 1) !== '.') {
        this.amount = '0';
      } else if (oldValue.indexOf('.') > 0
        && oldValue.indexOf('.') !== newValue.lastIndexOf('.')
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
    ...mapGetters(['minBuyAmount', 'buyBalance']),
    ...mapUserGetters(['authLevel']),
  },
  async mounted() {
    this.currency = this.$route.params.currency;
    Toast.loading({
      message: '加载中...',
    });
    await this.fetchBuyInfo(this.currency);
    this.checkBalanceDialogVisible();
    Toast.clear();
  },
  methods: {
    ...mapActions(['getCurrentBuyInfo', 'buyCurrentProduct']),
    ...mapUserActions(['getUserSummary']),
    async fetchBuyInfo(currency) {
      try {
        await Promise.all([this.getCurrentBuyInfo(currency), this.getUserSummary()]);
      } catch (error) {
        Toast(error.message);
      }
    },
    async onBuyClick() {
      try {
        if (this.authLevel !== AUTH_LEVEL.TRADE_PASSWORD) {
          this.$router.push({
            name: 'setTradePassword',
          });
        } else {
          this.visible = true;
        }
      } catch (error) {
        Toast(error.message);
      }
    },
    async onSubmitClick(password) {
      try {
        await this.buyCurrentProduct({
          amount: this.amount,
          currency: this.currency,
          password,
        });
        this.$router.push({
          name: 'current-buy-result',
        });
      } catch (error) {
        Toast(error.message);
      }
    },
    checkBalanceDialogVisible() {
      if (this.minBuyAmount > this.buyBalance) {
        this.balanceVisible = true;
      }
    },
    onBalanceCancel() {
      this.$router.push({
        name: 'current',
      });
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
