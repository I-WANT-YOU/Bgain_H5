<template>
  <div class="balance-card__container">
    <div class="card__title">可用余额({{currency}})</div>
    <div class="card__number">{{balance}}</div>
  </div>
</template>

<script>
export default {
  name: 'BalanceCard',
  props: {
    balance: {
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .balance-card__container {
    background: #ffffff;
    padding: 19px 20px 10px;
    margin-bottom: 10px;

    .card__title {
      font-size: 12px;
      color: #0F3256;
      line-height: 17px;
      margin-bottom: 7px;
    }

    .card__number {
      font-size: 34px;
      color: #3C64EE;
      line-height: 48px;
    }
  }
</style>
