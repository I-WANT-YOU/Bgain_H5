<template>
  <div class="current-panel__container">
    <div class="current-panel__card van-hairline--top">
      <div class="card__title">产品亮点</div>
      <div class="panel-hl__content">
        <div class="panel-hl__card">
          <svg-icon icon-class="exchange" class="icon-exchange"></svg-icon>
          <div class="hl-card__text">每日计息<br/>灵活存取</div>
        </div>
        <div class="panel-hl__card">
          <svg-icon icon-class="rise" class="icon-rise"></svg-icon>
          <div class="hl-card__text">超低风险<br/>收益稳健</div>
        </div>
        <div class="panel-hl__card">
          <svg-icon icon-class="lightning" class="icon-lightning"></svg-icon>
          <div class="hl-card__text">申赎0费用<br/>快速到账</div>
        </div>
      </div>
    </div>
    <div class="current-panel__card van-hairline--top">
      <div class="card__title">交易规则</div>
      <div class="panel-rule__card">
        <div class="rule-card__title"><svg-icon icon-class="current-in"></svg-icon>转入</div>
        <div class="card__content">T日18:00（GMT+8）前转入，T+ 1 日计息；</div>
        <div class="card__content">T日18:00（GMT+8）前转入，T+ 2日计息。</div>
      </div>
      <div class="panel-rule__card">
        <div class="rule-card__title"><svg-icon icon-class="current-out"></svg-icon>转出</div>
        <div class="card__content">T日12:00（GMT+8）前转出，T日23:59前可到账；</div>
        <div class="card__content">T日18:00（GMT+8）前转入，T+ 2日计息。</div>
      </div>
      <div class="card__slogan">转入 / 转出均不收取费用。</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentPanel',
};
</script>

<style lang="scss" scoped>
  .current-panel__container {
    margin-top: 30px;
    padding: 30px 0;

    .current-panel__card {
      padding: 30px 20px;

      .card__title {
        font-size: 16px;
        color: #0F3256;
        line-height: 22px;
      }

      .card__slogan {
        padding: 16px 0 6px;
        font-size: 16px;
        color: #0F3256;
        line-height: 24px;
      }
    }

    .panel-hl__content {
      display: flex;
      justify-content: space-between;
      padding: 38px 15px 0;
      align-items: center;
    }

    .panel-hl__card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      svg {
        margin-bottom: 20px;
      }

      .icon-exchange {
        width: 32px;
        height: 29px;
      }

      .icon-rise {
        width: 27.8px;
        height: 30.7px;
      }

      .icon-lightning {
        width: 32px;
        height: 32px;
      }

      .hl-card__text {
        font-size: 14px;
        color: #0F3256;
        line-height: 19px;
        white-space: pre-line;
        text-align: center;
      }
    }

    .panel-rule__card {

      &:nth-child(2) {
        padding-top: 8px;
      }

      .rule-card__title {
        padding: 10px 0;

        svg {
          width: 16px;
          height: 17px;
          margin-right: 8px;
        }

        font-size: 16px;
        line-height: 22px;
        color: #0F3256;
      }

      .card__content {
        font-size: 14px;
        color: #676C8D;
        line-height: 24px;
      }
    }
  }
</style>
