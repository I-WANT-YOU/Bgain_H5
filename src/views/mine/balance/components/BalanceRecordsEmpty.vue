<template>
  <div class="bgain-empty__container">
    <img
      src="../../../../assets/images/empty.png"
      alt="暂无数据"
      class="bgain-empty__image"
    >
    <div class="bgain-empty__title">
      {{title}}
    </div>
    <div class="bgain-empty__button-wrap" v-if="currency !== 'BGP'">
      <div class="button" @click="onGoRecharge">立即充币</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceRecordsEmpty',
  props: {
    title: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  methods: {
    onGoRecharge() {
      this.$router.push({
        name: 'PurchaseCoinHome',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .bgain-empty__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 60px;

    .bgain-empty__image {
      width: 130px;
      height: 98px;
    }

    .bgain-empty__title {
      margin-top: 20px;
      font-size: 14px;
      color: #A8AEB9;
      line-height: 20px;
    }

    .bgain-empty__button-wrap {
      margin-top: 16px;
      .button {
        border: 1px solid #3C64EE;
        border-radius: 2px;
        padding: 5px 16px;
        font-size: 13px;
        color: #3C64EE;
        line-height: 18px;
      }
    }
  }
</style>
