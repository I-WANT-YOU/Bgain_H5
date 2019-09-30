<template>
  <div class="fund-detail">
    <BgainNavBar :title="fundOwnerDetail.fund_product_name" />
    <div class="amount-info">
      <div class="amount">
        {{changeAm(fundOwnerDetail.currency_type,
        fundOwnerDetail.holding_market_value)}}
      </div>
      <div class="amount-text">当前市值({{fundOwnerDetail.currency_type}})</div>
      <div class="income">
        <div>
          <div
            :class="['num', yesterday > 0 ? 'profit' :
            'loss', (yesterday === '--' || yesterday * 1 === 0) ? 'computed' : '']"
          >{{changeAm(fundOwnerDetail.currency_type, yesterday)}}</div>
          <div class="text">昨日盈亏({{fundOwnerDetail.currency_type}})</div>
        </div>
        <div>
          <div
            :class="['num', pnl > 0 ? 'profit' :
            'loss',(pnl === '--' || pnl * 1 === 0 ) ? 'computed' : '']"
          >{{changeAm(fundOwnerDetail.currency_type, pnl)}}</div>
          <div class="text">持仓收益({{fundOwnerDetail.currency_type}})</div>
        </div>
        <div>
          <div
            :class="['num', pnlRatio > 0 ? 'profit' :
            'loss', (pnlRatio === '--' || pnlRatio * 1 === 0 ) ? 'computed' : '']"
          >{{pnlRatio && this.add(pnlRatio)}}%</div>
          <div class="text">持仓收益率</div>
        </div>
      </div>
      <Collapse class="mune" v-model="mune" :border="false">
        <CollapseItem name="1" :border="false">
          <div class="mune-con">
            <div class="left">
              <div class="line">
                <div class="text">持有金额</div>
                <div class="num">
                  {{changeAm(fundOwnerDetail.currency_type,
                  fundOwnerDetail.holding_market_value)}}
                </div>
              </div>
              <div class="line">
                <div class="text">持仓成本</div>
                <div
                  class="num"
                >{{changeAm(fundOwnerDetail.currency_type, fundOwnerDetail.principal)}}</div>
              </div>
              <div class="line">
                <div class="text">日涨幅</div>
                <div class="num">
                  {{fundOwnerDetail.pnl_rate
                  ? fundOwnerDetail.pnl_rate.toFixed(2) : '--'}}
                </div>
              </div>
            </div>
            <div class="right">
              <div class="line">
                <div class="text">待确定金额</div>
                <div
                  class="num"
                >{{changeAm(fundOwnerDetail.currency_type, fundOwnerDetail.pending_amt)}}</div>
              </div>
              <div class="line">
                <div class="text">持有份额</div>
                <div class="num">
                  {{fundOwnerDetail.holding_shares
                  && fundOwnerDetail.holding_shares.toFixed(2)}}份
                </div>
              </div>
              <div class="line">
                <div class="text">最新净值</div>
                <div class="num">{{fundOwnerDetail.nav.toFixed(4)}}({{navTime}})</div>
              </div>
            </div>
          </div>
        </CollapseItem>
      </Collapse>
    </div>
    <div class="echarts">
      <div class="tabs">
        <div :class="['tab', tab === '0' ? 'active' : '']" @click="onChangeTab('0')">累计盈亏</div>
        <div :class="['tab', tab === '1' ? 'active' : '']" @click="onChangeTab('1')">历史收益率</div>
      </div>
      <div class="tab-cons">
        <div v-show="tab === '0' && !isShow">
          <div class="cumulative-title">
            <div class="left">日期 {{chartX}} 累计收益</div>
            <div class="right">
              <div class="item red">
                <span class="dian" />
                业绩报酬未扣减
                <span>{{chartY}} {{fundOwnerDetail.currency_type}}</span>
              </div>
              <div class="item blue">
                <span class="dian" />
                业绩报酬已扣减
                <span>{{chartY1}} {{fundOwnerDetail.currency_type}}</span>
              </div>
            </div>
          </div>
          <div class="my-echarts" ref="echarts" style="width: 340px;height: 212px;" />
          <div class="cumulative-foot">
            <span>{{firstDate}}</span>
            <span>{{lastDate}}</span>
          </div>
        </div>
        <div v-show="tab === '1' && !isShow">
          <div class="history-title">
            <div class="left">日期 {{chartDailyX}}</div>
            <div class="right">收益率 {{chartDailyY ? chartDailyY : '0'}}%</div>
          </div>
          <div class="my-echarts" ref="echarts1" style="width: 340px;height: 212px;" />
        </div>
        <div v-show="isShow" class="no-record">暂无数据</div>
      </div>
    </div>
    <div class="fund-trade-record" @click="onTradeRecord">
      <span>交易记录</span>
      <span>
        <svg-icon icon-class="next" class="icon" />
      </span>
    </div>
    <div class="border"></div>
    <div class="fund-trade-rules" @click="onTradeRules">
      <span>交易规则</span>
      <span>
        <svg-icon icon-class="next" class="icon" />
      </span>
    </div>
    <div class="buttons">
      <Button
        :disabled="!status"
        @click="onSell"
        :class="['sell',status ? '' : 'disabled']"
      >{{status ? '赎回' : '下个开放期可赎回'}}</Button>
      <Button
        :disabled="!status"
        :class="['buy',status ? '' : 'disabled']"
        @click="onBuy"
        type="info"
      >{{status ? '继续认购' : '下个开放期可认购'}}</Button>
    </div>
  </div>
</template>

<script>
import { head, last } from 'lodash';
import {
  Collapse,
  CollapseItem,
  Button,
  Toast,
} from 'vant';
import { createNamespacedHelpers } from 'vuex';
import echarts from 'echarts';
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate } from '@utils/tools';
import { echartsOption } from './js/format';

const { mapActions, mapState } = createNamespacedHelpers('product/fund');

// 业绩报酬未扣减 pnl_daily
// 收益率 pnl_ratio_daily
// 业绩报酬已扣减 pnl_without_carry_list

export default {
  name: 'FundDetail',
  components: {
    BgainNavBar,
    Collapse,
    CollapseItem,
    Button,
  },
  data() {
    return {
      option: {},
      mune: [],
      tab: '0',
      chartX: '03-27',
      chartDailyX: '03-27',
      chartY: '1.1512',
      chartY1: '1.1512',
      chartDailyY: '0',
      pnl_daily: [],
      pnl_without_carry_list: [],
      pnl_ratio_daily: [],
      dates: [],
      firstDate: '01-01',
      lastDate: '01-01',
    };
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      await this.getFundOwnerDetail({
        id: this.$route.query.id,
        currencyType: this.$route.query.currencyType,
      });
      this.pnl_daily = this.fundOwnerDetail.pnl_daily;
      this.pnl_without_carry_list = this.fundOwnerDetail.pnl_without_carry_list;
      this.pnl_ratio_daily = this.fundOwnerDetail.pnl_ratio_daily;
      this.dates = this.fundOwnerDetail.dates;
      this.firstDate = this.formatDate(head(this.dates));
      this.lastDate = this.formatDate(last(this.dates));
      // 初始化日期和业绩报酬
      this.chartX = this.formatDate(last(this.dates));
      this.chartY = (last(this.pnl_daily) * 1).toFixed(6);
      this.chartY1 = (last(this.pnl_without_carry_list) * 1).toFixed(6);
      // 初始化历史收益率日期和收益率
      this.chartDailyX = this.formatDate(last(this.dates));
      this.chartDailyY = (last(this.pnl_ratio_daily) * 100).toFixed(2);
      this.$nextTick(() => {
        this.pnlRatioEcharts();
        this.pnlRatioDailyEcharts();
      });
      Toast.clear();
    } catch (error) {
      Toast.clear();
      Toast(error);
    }
  },
  methods: {
    ...mapActions(['getFundOwnerDetail']),
    formatDate(time) {
      return formatDate(time, 'MM-DD');
    },
    changeAm(text = 'BTC', num = 0) {
      if (num === '--') {
        return '--';
      }
      if (text === 'USDT') {
        return this.slice(num, 3);
      }
      if (text === 'CNY') {
        return num.toFixed(2);
      }
      return parseFloat(this.slice(num, 5));
    },
    // 累计盈亏
    pnlRatioEcharts() {
      const all = this.pnl_without_carry_list.concat(this.pnl_daily);
      const min = Math.min.apply(null, all);
      const max = Math.max.apply(null, all);
      const num = (max - min) * 0.4;
      this.chart = echarts.init(this.$refs.echarts);
      this.chart.setOption(echartsOption(this.dates,
        this.pnl_without_carry_list,
        this.pnl_daily, min, max, num));
      //  触发事件
      this.chart.getZr().on('mousemove', this.onPnlRatioEchartsMouseMove);
    },
    onPnlRatioEchartsMouseMove(params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);
      if (this.chart.containPixel('grid', pointInPixel)) {
        const x = this.chart1.getOption().xAxis[0].data[pointInGrid[0]];
        this.chartX = formatDate(this.chart.getOption().xAxis[0].data[pointInGrid[0]], 'MM-DD');
        this.chartY = (this.pnl_daily[this.dates
          .findIndex(item => item === x)] * 1).toFixed(6);
        this.chartY1 = (this.pnl_without_carry_list[this.dates
          .findIndex(item => item === x)] * 1).toFixed(6);
      }
    },
    // 历史收益率
    pnlRatioDailyEcharts() {
      const min1 = Math.min.apply(null, this.pnl_ratio_daily);
      const max1 = Math.max.apply(null, this.pnl_ratio_daily);
      const num1 = (max1 - min1) * 0.3;
      this.chart1 = echarts.init(this.$refs.echarts1);
      this.chart1.setOption(echartsOption(this.dates,
        this.pnl_ratio_daily, '', min1, max1, num1));
      this.chart1.getZr().on('mousemove', this.onPnlRatioDailyEchartsMouseMove);
    },
    onPnlRatioDailyEchartsMouseMove(params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);
      if (this.chart.containPixel('grid', pointInPixel)) {
        const x = this.chart1.getOption().xAxis[0].data[pointInGrid[0]];
        this.chartDailyX = formatDate(x, 'MM-DD');
        this.chartDailyY = (this.pnl_ratio_daily[this.dates
          .findIndex(item => item === x)] * 100).toFixed(2);
      }
    },
    slice(num, length = 3) {
      return num.toString().substring(0, num.toString().indexOf('.') + length);
    },
    onChangeTab(text) {
      this.tab = text;
    },
    onSell() {
      this.$router.push({
        path: '/mine/fund/fund-sell',
        query: {
          fund_id: this.fundOwnerDetail.fund_product_id,
          fund_user_stat_id: this.fundOwnerDetail.fund_user_stat_id,
          title: this.fundOwnerDetail.fund_product_name,
        },
      });
    },
    onBuy() {
      this.$router.push(`/product/fund/subscribe/${this.fundOwnerDetail.fund_product_id}`);
    },
    onTradeRules() {
      this.$router.push({
        path: '/product/fund/trade-rules',
        query: { productId: this.$route.query.id },
      });
    },
    onTradeRecord() {
      this.$router.push({
        path: '/mine/fund/trade-record-history',
        query: {
          productId: this.$route.query.id,
          title: '交易记录',
        },
      });
    },
    add(num) {
      if (num * 1 > 0) {
        return `+${num}`;
      }
      if (num * 1 < 0) {
        return `-${num}`;
      }
      return num;
    },
  },
  computed: {
    ...mapState(['fundOwnerDetail']),
    yesterday() {
      if (this.fundOwnerDetail.yesterday_change) {
        return this.add(this.fundOwnerDetail.yesterday_change);
      }
      return !this.fundOwnerDetail.yesterday_change && this.fundOwnerDetail.yesterday_change * 1 !== 0 ? '--' : '0';
    },
    pnl() {
      if (this.fundOwnerDetail.pnl) {
        return this.add(this.fundOwnerDetail.pnl);
      }
      return !this.fundOwnerDetail.pnl && this.fundOwnerDetail.pnl * 1 !== 0 ? '--' : '0';
    },
    pnlRatio() {
      if (this.fundOwnerDetail.pnl_ratio) {
        return (this.fundOwnerDetail.pnl_ratio * 100).toFixed(2);
      }
      return !this.fundOwnerDetail.pnl_ratio && this.fundOwnerDetail.pnl_ratio * 100 !== 0 ? '--' : '0';
    },
    status() {
      return this.fundOwnerDetail.fund_product_status_type === 'OPEN'
        || this.fundOwnerDetail.fund_product_status_type === 'INITIAL';
    },
    navTime() {
      return formatDate(this.fundOwnerDetail.nav_date, 'MM-DD');
    },
    isShow() {
      if (this.tab === '0' && this.pnl_daily.length && this.pnl_without_carry_list.length) {
        return false;
      }
      if (this.tab === '1' && this.pnl_ratio_daily.length) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang='scss'>
.fund-detail {
  background:#f4f4f4;
  .amount-info {
    margin-bottom: 10px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .amount {
      font-size: 30px;
      color: #333333;
      margin: 27px 0 8px;
    }
    .amount-text {
      font-size: 12px;
      color: #a8aeb9;
    }
    .income {
      display: flex;
      width: 100%;
      font-size: 14px;
      color: #333333;
      justify-content: space-around;
      margin-top: 20px;
      text-align: center;
      .num {
        margin-bottom: 8px;
        &.profit {
          color: #00b870;
        }
        &.loss {
          color: #ff5c5c;
        }
        &.computed {
          font-size: 12px;
          color: #000000;
        }
      }
      .text {
        font-size: 12px;
        color: #a8aeb9;
      }
    }
    .mune {
      width: 100%;
      .van-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 15px;
      }
      .van-collapse-item__content {
        background: #f4f4f4;
      }
      .mune-con {
        width: 100%;
        font-size: 12px;
        color: #a8aeb9;
        display: flex;
        .left,
        .right {
          flex: 1;
          .line {
            display: flex;
            .text {
              width: 67px;
            }
          }
        }
        .left {
          .line {
            .text {
              width: 57px;
            }
          }
        }
      }
    }
  }
  .echarts {
    margin: 10px 0;
    background: #ffffff;
    padding-bottom: 21px;
    .tabs {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid #f4f4f4;
      .tab {
        width: 130px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        color: #0f3256;
        box-sizing: border-box;
        border-bottom: 2px solid transparent;
        &.active {
          color: #3c64ee;
          border-bottom: 2px solid #3c64ee;
        }
      }
    }
    .tab-cons {
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      .cumulative-title,
      .history-title {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #6a707d;
        margin: 14px 0 20px;
        .right {
          display: flex;
          align-items: center;
          flex-direction: column;
          .item {
            margin-bottom: 6px;
            .dian {
              display: inline-block;
              width: 5px;
              height: 5px;
              border-radius: 50%;
            }
            &.red {
              span {
                color: #ff5c5c;
              }
              .dian {
                background: #ff5c5c;
              }
            }
            &.blue {
              span {
                color: #3c64ee;
              }
              .dian {
                background: #3c64ee;
              }
            }
          }
        }
      }
      .cumulative-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        color: #999999;
        box-sizing: border-box;
        padding-left: 23px;
      }
    }
  }
  .no-record {
    height: 300px;
    line-height: 300px;
    text-align: center;
    font-size: 14px;
    color: #a8aeb9;
  }
  .fund-trade-record,
  .fund-trade-rules {
    background: #ffffff;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #0f3256;
    box-sizing: border-box;
    padding: 0 20px;
    .icon {
      width: 7px;
      height: 11px;
    }
  }
  .trade-record {
    margin-top: 10px;
  }
  .border {
    content: "";
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    transform: scaleY(0.5);
  }
  .buttons {
    padding: 10px 20px;
    background: #ffffff;
    margin-top: 10px;
    font-size: 14px;
    letter-spacing: 0;
    .sell {
      width: 130px;
      margin-right: 15px;
      padding: 0;
      text-align: center;
      color: #3c64ee;
      border-radius: 4px;
      border: 1px solid #e5e9f6;
      &.disabled {
        color: #d2d8eb;
      }
    }
    .buy {
      width: 186px;
      border-radius: 4px;
      &.disabled {
        background: #d2d8eb;
        border-color: #e5e9f6;
        color: #fbfcfb;
      }
    }
  }
}
</style>
