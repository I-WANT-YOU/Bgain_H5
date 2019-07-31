<template>
  <div class="current-card__container">
    <div class="card-annual__title" @click="onHistoryRatesClick">
      今日年化利率
      <svg-icon icon-class="current-arrow" class="icon-arrow"/>
    </div>
    <div class="card__trade-records" @click="onRecordsClick">
      <svg-icon icon-class="current-records" class="icon-records"></svg-icon>
      交易记录
    </div>
    <div class="card-annual__rate">{{dataSource.interest_rate}}</div>
    <div class="card__total-amount">
      <span>在投总额</span>
      <span class="number">{{dataSource.reinvest_amount}} {{dataSource.currency_type}}</span>
    </div>
    <div class="card-profit__panel">
      <div>
        <div class="profit__title">累计收益({{dataSource.currency_type}})</div>
        <span>{{dataSource.total_profit}}</span>
      </div>
      <span></span>
      <div>
        <div class="profit__title">昨日收益({{dataSource.currency_type}})</div>
        <span>{{dataSource.yesterday_profit}}</span>
      </div>
    </div>
    <div class="buttons">
      <div class="roll-out">转出</div>
      <div class="roll-in">转入</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentCard',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onRecordsClick() {
      this.$router.push({
        name: 'trade-records',
      });
    },
    onHistoryRatesClick() {
      this.$router.push({
        name: 'history-rates',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .current-card__container {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 24px;

    .card-annual__title {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #a8aeb9;
      line-height: 18px;

      .icon-arrow {
        width: 4.4px;
        height: 9px;
        margin-left: 6.6px;
      }
    }

    .card__trade-records {
      position: absolute;
      top: 16px;
      right: 0;
      background: #FDF4F4;
      padding: 6px 18px 6px 8px;
      border-radius: 17px 0 0 17px;
      font-size: 12px;
      color: #FF5656;
      line-height: 17px;

      .icon-records {
        width: 10px;
        height: 11px;
      }
    }

    .card-annual__rate {
      text-align: center;
      font-size: 42px;
      line-height: 59px;
      color: #ff5656;

      &::after {
        content: '%';
        display: inline;
        font-size: 26px;
        color: #ff5656;
      }
    }

    .card__total-amount {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6px 0 19px;
      font-size: 15px;
      color: #a8aeb9;
      line-height: 21px;

      .number {
        margin-left: 5px;
        color: #003259;
      }
    }

    .card-profit__panel {
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        padding: 0 17px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .profit__title {
          margin-bottom: 5px;
          font-size: 13px;
          line-height: 18px;
          color: #a8aeb9;
        }

        span {
          font-size: 16px;
          line-height: 22px;
          color: #0f3256;
        }
      }

      > span {
        height: 32px;
        width: 1px;
        background: #eeeeee;
      }
    }

    .buttons {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 19px;

      > div {
        width: 156px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 4px;
        font-size: 16px;
        letter-spacing: 0;

        &.roll-out {
          background: #edf0fa;
          color: #3c64ee;
        }

        &.roll-in {
          background: #3c64ee;
          color: #ffffff;
        }
      }
    }
  }
</style>
