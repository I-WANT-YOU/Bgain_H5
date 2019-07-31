<template>
  <div class="card__container van-hairline--bottom">
    <div class="card__col">
      <div class="card__col--dark">
        {{title}}
      </div>
      <div class="card__col--gray">
        {{date}}
      </div>
    </div>
    <div class="card__col">
      <div class="card__col--dark">
        {{amount}}
      </div>
      <div class="card__col--gray">
        {{dataSource.currency_type}}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/tools';

const TRADE_TYPE = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export default {
  name: 'TradeRecordsCard',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      const {
        current_trade_type: tradeType,
        current_order_type: orderType,
      } = this.dataSource;
      if (tradeType === TRADE_TYPE.SELL) {
        if (orderType === 'COMPLETED') return '转出成功';
        return '转出受理中';
      }
      return '转入成功';
    },
    date() {
      return formatDate(this.dataSource.created_at);
    },
    amount() {
      const {
        current_trade_type: tradeType,
        amount,
      } = this.dataSource;
      if (tradeType === TRADE_TYPE.SELL) {
        return `-${amount}`;
      }
      return `+${amount}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .card__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 20px;

    .card__col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      &:last-child {
        align-items: flex-end;
      }

      .card__col--dark {
        font-size: 15px;
        color: #0F3256;
        line-height: 21px;
      }

      .card__col--gray {
        font-size: 12px;
        color: #A8AEB9;
        line-height: 17px;
      }
    }
  }
</style>
