<template>
  <div @click="onSkip" class="fixed-card">
    <div class="fixed-card-title">
      <div class="fixed-name">{{option.product_name}}</div>
      <div :class="['fixed-status',status?'active':'']">{{status?'计息中':'已结束'}}</div>
    </div>
    <div class="fixed-card-asset">
      <div class="fixed-card-item">
        <div class="num">{{option.amount}} {{option.payment_currency}}</div>
        <div>认购数量</div>
      </div>
      <div class="fixed-card-item">
        <div class="num">{{option.return_amount}} {{option.payment_currency}}</div>
        <div>已得收益</div>
      </div>
      <div class="fixed-card-item">
        <div class="num">
          {{option.portfolio_record_status === 'INTEREST_START'
          ? option.product_left_days
          : 'DUE' || 'DUE_PENDDING' ? '0'
          : '--'}}
        </div>
        <div>{{option.portfolio_record_status==='PURCHASE_START'?'剩余天数':'回款日期'}}</div>
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
  mounted() {
    // console.log(this.option);
    // product_left_days
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
