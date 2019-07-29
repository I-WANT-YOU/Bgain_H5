<template>
  <div class="current">
    <currency-tab :currencies="currencies">
      <div class="content">
        <p class="year">
          今日年化利率
          <svg-icon icon-class="next" class="next"/>
        </p>
        <div class="annual-interest-rate">
          <span>6.84%</span>
        </div>
        <p class="total-amount">
          <span>在投总额</span>
          <span class="amount">1,1123.123456 {{currency}}</span>
        </p>
        <div class="income">
          <div>
            <div class="title">累计收益({{currency}})</div>
            <span>{{accumulatedEarnings}}</span>
          </div>
          <span></span>
          <div>
            <div class="title">昨日收益({{currency}})</div>
            <span>{{earningsYesterday}}</span>
          </div>
        </div>
        <div class="buttons">
          <div class="roll-out">转出</div>
          <div class="roll-in">转入</div>
        </div>
      </div>
    </currency-tab>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CurrencyTab from '../components/CurrencyTab.vue';

const { mapState, mapActions } = createNamespacedHelpers('product/current');

export default {
  name: 'Current',
  components: {
    CurrencyTab,
  },
  data() {
    return {
      currency: 'BTC',
      type: 'BTC',
      totalAmount: '11123.123456',
      annualInterestRate: '6.84',
      earningsYesterday: '0.005',
      accumulatedEarnings: '0.005',
    };
  },
  computed: {
    ...mapState(['currencies']),
  },
  async mounted() {
    try {
      await this.getAllCurrentProduct();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions(['getAllCurrentProduct']),
  },
};
</script>

<style lang="scss" scoped>
  .current {
    width: 100%;

    p {
      margin: 0;
      padding: 0;
    }

    .content {
      .year {
        margin: 24px 0 1px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #a8aeb9;
        letter-spacing: 0;

        .next {
          width: 4.4px;
          height: 9px;
          margin-left: 6.6px;
        }
      }

      .annual-interest-rate {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 59px;
        margin-bottom: 6px;

        span {
          font-size: 42px;
          color: #ff5656;
          letter-spacing: 0;
          line-height: 59px;
        }
      }

      .total-amount {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 19px;
        font-size: 15px;
        color: #a8aeb9;
        letter-spacing: 0;
        line-height: 21px;

        .amount {
          color: #003259;
        }
      }

      .income {
        display: flex;
        align-items: center;
        justify-content: space-around;

        div {
          padding: 0 17px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .title {
            margin-bottom: 5px;
            font-size: 13px;
            color: #a8aeb9;
            letter-spacing: 0;
          }

          span {
            font-size: 16px;
            color: #0f3256;
            letter-spacing: 0;
          }
        }

        > span {
          height: 32px;
          width: 1px;
          background: #eeeeee;
        }
      }

      .buttons {
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
  }
</style>
