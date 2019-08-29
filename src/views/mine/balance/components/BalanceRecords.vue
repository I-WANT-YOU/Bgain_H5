<template>
  <div class="records__container">
    <div class="records__title van-hairline--bottom">交易记录</div>
    <div v-if="dataSource.length !== 0">
      <div
        class="record__card van-hairline--bottom"
        v-for="record in dataSource"
        :key="record.id">
        <div class="card__wrapper--left">
          <div class="card__label">{{changeTr(record.transaction_type)}}</div>
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
    changeTr(type) {
      switch (type) {
        case 'DEPOSIT':
          type = '充币';
          break;
        case 'WITHDRAWAL':
          type = '提币';
          break;
        case 'BUY':
          type = '认购';
          break;
        case 'INVITATION':
          type = '注册奖励';
          break;
        case 'SELL':
          type = '投资回款';
          break;
        case 'COMMISSION':
          type = '佣金奖励';
          break;
        case 'EXPERIENCE_PROFIT':
          type = '体验金收益';
          break;
        case 'EXPERIENCE_PROFIT_RESET':
          type = '体验金收益清零';
          break;
        case 'TRANSFER':
          type = '转出';
          break;
        case 'RECEIVE':
          type = '转入';
          break;
        case 'INTEREST':
          type = '利息收益';
          break;
        case 'FBP_BONUS_REG':
          type = '注册奖励';
          break;
        case 'FBP_BONUS_KYC':
          type = '身份认证';
          break;
        case 'FBP_BONUS_INIT_DEPOSIT':
          type = '首充';
          break;
        case 'FBP_BONUS_INIT_BUY':
          type = '首投';
          break;
        case 'FBP_BONUS_BUY':
          type = '认购';
          break;
        case 'CURRENT_BUY':
          type = '天天赚转入';
          break;
        case 'CURRENT_SELL':
          type = '天天赚转出';
          break;
        case 'FBP_PRIZEPOOL_BUY':
          type = '活动消耗';
          break;
        case 'PRIZEPOOL_PROFIT':
          type = '活动奖金';
          break;
        case 'FUND_BUY':
          type = '认购基金';
          break;
        case 'FUND_SELL':
          type = '赎回基金';
          break;
        case 'FBP_FUNDING_HOLDING':
          type = '基金奖励';
          break;
        case 'FUND_BUY_CANCEL':
          type = '认购撤单';
          break;
        case 'ACTIVITY_BONUS_REG':
          type = '注册奖励';
          break;
        case 'ACTIVITY_BONUS_KYC':
          type = '身份认证奖励';
          break;
        case 'ACTIVITY_BONUS_FIRST_DEPOSIT':
          type = '首充奖励';
          break;
        case 'ACTIVITY_BONUS_BUY':
          type = '投资奖励';
          break;
        case 'ACTIVITY_INVITED_BUY':
          type = '活动奖励';
          break;
        case 'OTC_BUY':
          type = '买币';
          break;
        case 'FBP_SUBSCRIBE':
          type = '积分消耗';
          break;
        case 'FBP_MEMBERSHIP_SIGN':
          type = '签到';
          break;
        case 'FBP_CONVERT':
          type = '积分兑换';
          break;
        default:
          break;
      }
      return type;
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
