<template>
  <div @click="onSkip" class="fixed-card">
    <div class="fixed-card-title">
      <div class="fixed-name">{{option.product_name}}</div>
      <div
        v-show="statuText !== 'null'"
        :class="['fixed-status',status ? 'active':'']"
      >{{statuText}}</div>
    </div>
    <div class="fixed-card-asset">
      <div class="fixed-card-item">
        <div class="num">{{option.amount}} {{option.payment_currency}}</div>
        <div>认购数量</div>
      </div>
      <div class="fixed-card-item">
        <div class="num">{{option.profit}} {{option.payment_currency}}</div>
        <div>{{status?'待收收益':'已得收益'}}</div>
      </div>
      <div class="fixed-card-item">
        <div class="num">{{showText}}</div>
        <div>{{status?'剩余天数':'回款日期'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@utils/tools';

export default {
  name: 'FixedCard',
  props: {
    option: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    formatDate(date, format) {
      return formatDate(date, format || 'YYYY-MM-DD');
    },
    onSkip() {
      this.$router.push({ path: `/mine/fixed-detail/${this.status}`, query: this.option });
    },
  },
  computed: {
    showText() {
      if (this.status) {
        if (this.option.portfolio_record_status === 'INTEREST_START') {
          return this.option.product_left_days;
        }
        if (this.option.portfolio_record_status === 'DUE'
          || this.option.portfolio_record_status === 'DUE_PENDDING') {
          return '0天';
        }
        return '--';
      }
      return this.formatDate(this.option.end_date);
    },
    statuText() {
      if (this.status) {
        if (this.option.portfolio_record_status === 'INTEREST_START') {
          return '计息中';
        }
        if (this.option.portfolio_record_status === 'DUE'
          || this.option.portfolio_record_status === 'DUE_PENDING') {
          return '回款中';
        }
        if (this.option.portfolio_record_status === 'INTEREST_PENDING') {
          return '待计息';
        }
        if (this.option.portfolio_record_status === 'PURCHASE_START') {
          return '募集中';
        }
      } else {
        return '已结束';
      }
      return 'null';
    },
  },
  mounted() {
    // console.log(this.option);
  },
};
</script>

<style lang="scss" scoped>
.fixed-card {
  width: 335px;
  box-shadow: 0 1px 10px 2px rgba(211, 211, 211, 0.31);
  border-radius: 6px;
  padding: 18px 15px 0;
  box-sizing: border-box;
  margin: 7.5px 0;
  .fixed-card-title {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #0f3256;
    align-items: center;
    margin-bottom: 20px;
    .fixed-status {
      border: 1px solid #bbbbbb;
      border-radius: 2px;
      font-size: 12px;
      color: #999999;
      padding: 3px 7px;
      &.active {
        color: #3c64ee;
        border-color: #3c64ee;
      }
    }
  }
  .fixed-card-asset {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fixed-card-item {
      font-size: 12px;
      color: #a8aeb9;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      .num {
        font-size: 14px;
        color: #6a707d;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
