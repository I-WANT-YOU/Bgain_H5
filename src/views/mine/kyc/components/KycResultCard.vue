<template>
  <div class="kyc-card__container">
    <div class="kyc-card__icon">
      <svg-icon icon-class="kyc-pending" />
    </div>
    <div class="kyc-card__title">审核中</div>
    <div class="kyc-card__title--sub">审核结果将在3个工作日内给出</div>
  </div>
</template>

<script>
export default {
  name: 'KycResultCard',
};
</script>

<style lang="scss" scoped>
  .kyc-card__container {
    height: 100%;
    padding-top: 61px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .kyc-card__icon {
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
    }

    .kyc-card__title--sub {
      margin-top: 9px;
      height: 20px;
      font-size: 14px;
      color: #6A707D;
      line-height: 20px;
    }

    .kyc-card__buttons {
    }
  }
</style>
