<template>
  <div class="trade-record-history">
    <BgainNavBar title="历史交易记录" />
    <div class="trade-record-history-con">
      <div v-for='(fund,key) in options'
           :key='key'
           class="trade-record-card">
        <div class="line">
          <span class="product-name">{{fund.fund_name}}</span>
          <span>{{fund.amount}} {{fund.currency_type}}</span>
        </div>
        <div class="line time">
          <span>{{fund.create_date}}</span>
          <span>{{fund.fund_order_status}}</span>
        </div>
        <span :class="['type',fund.trade_type === '认购' ? '' : 'cut']">{{fund.trade_type}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate } from '@utils/tools';

const fundOrderStatusList = [
  {
    type: 'PENDING',
    text: '待确定',
  },
  {
    type: 'CONFIRMED',
    text: '确定',
  },
  {
    type: 'COMPLETE',
    text: '完成',
  },
  {
    type: 'FAILURE',
    text: '失败',
  },
  {
    type: 'CANCEL',
    text: '已撤单',
  },
];
const tradeTypeList = [
  {
    type: 'BUY',
    text: '认购',
  },
  {
    type: 'SELL',
    text: '赎回',
  },
  {
    type: 'SUB_CARRY',
    text: '业绩报酬扣除',
  },
];

const datas = [
  {
    fund_name: '41基金',
    currency_type: 'USDT',
    trade_type: tradeTypeList.filter(item => (item.type === 'BUY'))[0].text,
    create_date: formatDate(1554052999000),
    amount: 28.12345678,
    fund_order_status: fundOrderStatusList.filter(item => (item.type === 'CONFIRMED'))[0].text,
  },
  {
    fund_name: '41基金',
    currency_type: 'USDT',
    trade_type: tradeTypeList.filter(item => (item.type === 'BUY'))[0].text,
    create_date: formatDate(1554052981000),
    amount: 101.101101,
    fund_order_status: fundOrderStatusList.filter(item => (item.type === 'CONFIRMED'))[0].text,
  },
];

export default {
  name: 'TradeRecordHistory',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      options: datas,
    };
  },
};
</script>

<style lang='scss' scoped>
.trade-record-history {
  height: 100%;
  display: flex;
  flex-direction: column;
  .trade-record-history-con {
    flex: 1;
    .trade-record-card {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #0f3256;
      box-sizing: border-box;
      padding: 11px 20px;
      line-height: 20px;
      border-bottom: 1px solid #eeeeee;
      .line {
        display: flex;
        justify-content: space-between;
        &.time {
          font-size: 12px;
          color: #a8aeb9;
        }
      }
      .type {
        font-size: 11px;
        border-radius: 0 0 4px 4px;
        margin-top: 2px;
        width: 32px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        background: #fdf4f4;
        color: #ff5c5c;
        &.cut {
          background: #eaefff;
          color: #3c64ee;
        }
      }
    }
  }
}
</style>
