<template>
  <div class="fixed-card__container">
    <div class="fixed-card__title">
      7天抢先体验计划44期
    </div>
    <div class="fixed-card__content">
      <div class="content__card">
        <span class="content__value--red">6</span>
        <div class="content__label">预期年化利率</div>
      </div>
      <div class="content__card">
        <span class="content__value--black content__value--black-unit">14</span>
        <div class="content__label">锁定期</div>
      </div>
      <div class="content__card">
        <span class="content__value--black">0.002</span>
        <div class="content__label">起投金额</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedCard',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .fixed-card__container {
    box-sizing: border-box;
    width: 335px;
    padding: 16px 40px 16px 20px;
    background: #FFFFFF;
    box-shadow: 0 1px 10px 2px rgba(211, 211, 211, 0.31);
    border-radius: 6px;

    .fixed-card__title {
      font-size: 15px;
      line-height: 21px;
      color: #0F3256;
    }

    .fixed-card__content {
      display: flex;
      justify-content: space-between;
      padding-top: 11px;

      .content__card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .content__value--red {
          font-size: 28px;
          color: #FF5C5C;
          line-height: 28px;

          &::after {
            content: '%';
            display: inline;
            color: #FF5C5C;
            font-size: 18px;
          }
        }

        .content__value--black {
          font-size: 20px;
          line-height: 28px;
          color: #0F3256;
        }

        .content__value--black-unit::after {
          content: '天';
          display: inline;
          font-size: 16px;
        }

        .content__label {
          margin-top: 4px;
          font-size: 12px;
          color: #A8AEB9;
          line-height: 17px;
        }
      }
    }
  }
</style>
