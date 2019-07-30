<template>
  <div class="fund">
    <Screen
      :options="options"
      @onReset="onReset"
      @changeItem="changeItem"
      @onChange="onChange"
      @close="close"
    />
    <div class="fund-products-list">
      <div v-for="item in initial" :key="item.id" class="fund-products-list-item initial">
        <svg-icon icon-class="initial" class="icon-initial" />
        <h4 class="title">{{item.fund_name}}</h4>
        <div class="time">
          <span>{{item.period}}</span>
          <span class="day">天</span>
        </div>
        <div class="lock">
          <span>锁定期</span>
        </div>
        <div class="labels">
          <span>{{item.currency_type}}</span>
          <span>{{item.fund_product_type}}</span>
          <span>{{item.risk_level_type}}</span>
        </div>
        <div class="buttons">
          <Button type="info" class="button">
            <span>{{item.min_invest_amt}}</span>
            <span>{{item.currency_type}}</span>
            <span>起投</span>
          </Button>
        </div>
      </div>
      <div class="fund-products-list-item noInitial">
        <h4 class="title">
          <span>NV Capital 中频套利1号</span>
          <svg-icon icon-class="fbp" class="icon-no-initial" />
        </h4>
        <div class="data">
          <div class="top">
            <div class="setup">
              <span>+701.96</span>
              <span class="unit">%</span>
            </div>
            <div class="networth">0.1223</div>
          </div>
          <div class="bottom">
            <div class="left">成立以来</div>
            <div class="right">最新净值(07-11)</div>
          </div>
        </div>
        <div class="label">
          <div class="labels">
            <span>BTC</span>
            <span>指数型</span>
            <span>R3</span>
          </div>
          <div class="time">
            <svg-icon icon-class="start" class="icon" />
            <span>2019-05-12 18:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import Screen from './components/Screen.vue';

const fundProductTypeList = [
  { type: 'SmartBeta', value: '指数更强' },
  { type: 'CTA', value: 'CTA' },
  { type: 'Arbitrage', value: '套利' },
  { type: 'HighFrequency', value: '高频' },
  { type: 'MixedStrategies', value: '混合' },
];
const riskLevelTypeList = [
  { type: 'R1_LOW_RISK', value: 'R1' },
  { type: 'R2_MEDIUM_LOW_LEVEL', value: 'R2' },
  { type: 'R3_MEDIUM_LEVEL', value: 'R3' },
  { type: 'R4_MEDIUM_HIGH_LEVEL', value: 'R4' },
  { type: 'R5_HIGH_LEVEL', value: 'R5' },
];
const fundProducts = [
  {
    id: 1,
    fund_name: 'NV全频中性套利1号',
    period: 28,
    close_duration: 21,
    open_duration: 7,
    currency_type: 'BTC',
    fund_product_type: 'Arbitrage',
    status: 'CLOSE',
    min_invest_amt: '0.01',
    min_holding_shares: '1',
    nav: '3.7823',
    create_date: '1558354347000',
    update_date: '1558410462000',
    initial_start_date: '1558364400000',
    initial_end_date: '1559296800000',
    next_open_date: '1563530400000',
    closing_date: '1561716000000',
    nav_date: '1562774400000',
    ups_and_downs_week: '278.24',
    up_down: null,
    risk_level_type: 'R2_MEDIUM_LOW_LEVEL',
    support_fbp: null,
  },
  {
    id: 2,
    fund_name: 'ABC多策略整合CTA',
    period: 28,
    close_duration: 21,
    open_duration: 7,
    currency_type: 'BTC',
    fund_product_type: 'CTA',
    status: 'INITIAL',
    min_invest_amt: '0.01',
    min_holding_shares: '1',
    nav: '1.0000',
    create_date: '1562311785000',
    update_date: '1562315522000',
    initial_start_date: '1562313600000',
    initial_end_date: '1562882400000',
    next_open_date: '1564696800000',
    closing_date: '1562882400000',
    nav_date: '1562311785000',
    ups_and_downs_week: '0.00',
    up_down: null,
    risk_level_type: 'R3_MEDIUM_LEVEL',
    support_fbp: null,
  },
].map((item) => {
  fundProductTypeList.forEach((ite) => {
    if (ite.type === item.fund_product_type) {
      item.fund_product_type = ite.value;
    }
  });
  riskLevelTypeList.forEach((ite) => {
    if (ite.type === item.risk_level_type) {
      item.risk_level_type = ite.value;
    }
  });
  return item;
});

export default {
  name: 'Fund',
  components: {
    Screen,
    Button,
  },
  data() {
    return {
      options: [
        {
          type: 'currency_type',
          active: 'all',
          text: '币种',
          value: 0,
          children: ['BTC', 'USDT', 'ETH', 'EOS', 'USDT1', 'ETH1'],
        },
        {
          type: 'fund_product_type',
          active: 'all',
          text: '策略类型',
          value: 1,
          children: ['指数更强', 'CTA', '套利', '高频', '混合'],
        },
        {
          type: 'risk_level_type',
          active: 'all',
          text: '风险值',
          value: 2,
          children: ['R1', 'R2', 'R3', 'R4', 'R5'],
        },
      ],
      initial: fundProducts.filter(item => item.status === 'INITIAL'),
      others: fundProducts.filter(item => item.status !== 'INITIAL'),
    };
  },
  methods: {
    onReset() {
      this.options = this.options.map((item) => {
        item.active = 'all';
        return item;
      });
    },
    changeItem(type, text) {
      this.options = this.options.map((item) => {
        if (item.type === type) {
          item.active = text;
        }
        return item;
      });
    },
    onChange() {
      const params = {};
      this.options.forEach((item) => {
        params[item.type] = item.active;
        if (params[item.type] === 'all') {
          delete params[item.type];
        }
        if (item.type === 'fund_product_type') {
          fundProductTypeList.forEach((ite) => {
            if (ite.value === item.active) {
              params[item.type] = ite.type;
            }
          });
        }
        if (item.type === 'risk_level_type') {
          riskLevelTypeList.forEach((ite) => {
            if (ite.value === item.active) {
              params[item.type] = ite.type;
            }
          });
        }
      });
    },
    close(options) {
      this.options = options.map(item => item);
    },
  },
};
// {
//  "currency_type":"USDT", // 货币类型
//  "fund_product_type":"MixedStrategies", // 基金类型
//  "risk_level_type":"R1_LOW_RISK" // 风险等级
// }
</script>

<style lang='scss' scoped>
.fund {
  width: 100%;
  .fund-products-list {
    box-sizing: border-box;
    padding: 15px 21px 0 20px;
    .fund-products-list-item {
      width: 100%;
      background: #ffffff;
      box-shadow: 0 1px 10px 2px rgba(211, 211, 211, 0.31);
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .labels {
      span {
        display: inline-block;
        box-sizing: border-box;
        width: 40px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #ff5c5c;
        border-radius: 2px;
        font-size: 11px;
        color: #ff5c5c;
        letter-spacing: 0;
        text-align: center;
        margin: 0 6px;
      }
    }
    .initial {
      position: relative;
      .icon-initial {
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 22px;
      }
      .title {
        margin: 0;
        padding-top: 16px;
        font-size: 15px;
        color: #0f3256;
        letter-spacing: 0;
        text-align: center;
      }
      .time {
        height: 50px;
        margin-top: 10px;
        font-size: 36px;
        color: #ff5c5c;
        letter-spacing: 0;
        text-align: center;
        line-height: 50px;
        .day {
          font-size: 24px;
          line-height: 33px;
        }
      }
      .lock {
        font-size: 14px;
        color: #a8aeb9;
        letter-spacing: 0;
        text-align: center;
      }
      .labels {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
      }
      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        .button {
          width: 259px;
          height: 36px;
          line-height: 36px;
          font-size: 15px;
          color: #ffffff;
          letter-spacing: 0;
          background: #3c64ee;
          border-radius: 4px;
          border: 0;
          text-align: center;
          font-weight: 100;
        }
      }
    }
    .noInitial {
      box-sizing: border-box;
      padding: 12px 20px;
      .title {
        display: flex;
        align-items: center;
        margin: 0;
        height: 20px;
        font-size: 14px;
        color: #0f3256;
        letter-spacing: 0;
        font-weight: 400;
        margin-bottom: 10px;
        .icon-no-initial {
          width: 30px;
          height: 16px;
          margin-left: 5px;
          font-size: 11px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
        }
      }
      .data {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        > div {
          display: flex;
          > div {
            flex: 1;
          }
          &.top {
            display: flex;
            .setup {
              font-size: 24px;
              color: #67bb74;
              letter-spacing: 0;
              line-height: 33px;
              .unit {
                font-size: 18px;
                color: #67bb74;
                letter-spacing: 0;
                line-height: 25px;
              }
            }
            .networth {
              font-size: 18px;
              color: #0f3256;
              letter-spacing: 0;
              box-sizing: border-box;
              padding: 8px 0 0 16px;
            }
          }
          &.bottom {
            display: flex;
            font-size: 12px;
            color: #a8aeb9;
            letter-spacing: 0;
            margin-bottom: 12px;
            .right {
              box-sizing: border-box;
              padding-left: 16px;
            }
          }
        }
      }
      .label {
        height: 42px;
        display: flex;
        align-items: center;
        > div {
          flex: 1;
        }
        .labels {
          display: flex;
          > span {
            height: 18px;
            margin: 0 10px 0 0;
          }
        }
        .time {
          box-sizing: border-box;
          padding-left: 10px;
          font-size: 12px;
          color: #676c8d;
          letter-spacing: 0;
          .icon {
            width: 14px;
            height: 14px;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
