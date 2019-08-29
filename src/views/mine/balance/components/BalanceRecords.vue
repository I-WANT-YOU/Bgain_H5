<template>
  <div class="records__container">
    <div class="records__title van-hairline--bottom">交易记录</div>
    <div v-if="dataSource.length !== 0">
      <div
        class="record__card van-hairline--bottom"
        v-for="record in dataSource"
        :key="record.id">
        <div class="card__wrapper--left">
          <div class="card__label">{{getTransactionType(record.transaction_type)}}</div>
          <div class="card__date">{{getDate(record.createAt)}}</div>
        </div>
        <div class="card__balance">{{getSymbol(record.transaction_type)}}{{record.amount}}</div>
      </div>
    </div>
    <balance-records-empty v-else title="暂无交易记录" :currency="currency"/>
  </div>
</template>

<script>
import { formatDate } from '@utils/tools';
import BalanceRecordsEmpty from './BalanceRecordsEmpty.vue';
import { TRANSACTION_TYPE, TRANSACTION_TYPE_PLUS } from '@/constants/options';

export default {
  name: 'BalanceRecords',
  components: { BalanceRecordsEmpty },
  props: {
    dataSource: {
      type: Array,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  methods: {
    getTransactionType(type) {
      return type && TRANSACTION_TYPE[type];
    },
    getDate(date) {
      return formatDate(date);
    },
    getSymbol(type) {
      return TRANSACTION_TYPE_PLUS.includes(type) ? '+' : '-';
    },
  },
};
</script>

<style lang="scss" scoped>
  .records__container {
    background: #ffffff;
    flex: 1;

    .records__title {
      padding: 15px 20px;
      font-size: 15px;
      color: #0F3256;
      line-height: 21px;
    }

    .record__card {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .card__wrapper--left {
        display: flex;
        flex-direction: column;
      }

      .card__label {
        font-size: 15px;
        color: #0F3256;
        line-height: 21px;
      }

      .card__date {
        font-size: 12px;
        color: #A8AEB9;
        line-height: 17px;
      }

      .card__balance {
        font-size: 15px;
        color: #0F3256;
        line-height: 21px;
      }
    }
  }
</style>
