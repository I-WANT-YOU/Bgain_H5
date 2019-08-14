<template>
  <div class="fund-detail">
    <BgainNavBar :title="fundOwnerDetail.fund_product_name" />
    <div class="amount-info">
      <div class="amount">{{fundOwnerDetail.holding_market_value}}</div>
      <div class="amount-text">当前市值({{fundOwnerDetail.currency_type}})</div>
      <div class="income">
        <div>
          <div class="num">{{yesterday}}</div>
          <div class="text">昨日盈亏({{fundOwnerDetail.currency_type}})</div>
        </div>
        <div>
          <div class="num">-123.12345678</div>
          <div class="text">持仓收益({{fundOwnerDetail.currency_type}})</div>
        </div>
        <div>
          <div class="num">{{fundOwnerDetail.pnl}}%</div>
          <div class="text">持仓收益率</div>
        </div>
      </div>
      <Collapse class="mune" v-model="mune">
        <CollapseItem name="1">
          <div class="mune-con">
            <div class="left">
              <div class="line">
                <div class="text">持有金额</div>
                <div class="num">1,123.12345678</div>
              </div>
              <div class="line">
                <div class="text">持仓成本</div>
                <div class="num">3.12345678</div>
              </div>
              <div class="line">
                <div class="text">日涨幅</div>
                <div class="num">+3.12%</div>
              </div>
            </div>
            <div class="right">
              <div class="line">
                <div class="text">待确定金额</div>
                <div class="num">{{fundOwnerDetail.pending_amt}}</div>
              </div>
              <div class="line">
                <div class="text">持有份额</div>
                <div class="num">{{fundOwnerDetail.holding_shares}}份</div>
              </div>
              <div class="line">
                <div class="text">最新净值</div>
                <div class="num">{{fundOwnerDetail.nav}}({{navTime}})</div>
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
        <div v-show="tab === '0'" class="cumulative-title">
          <div class="left">日期 {{chart_x}} 累计收益</div>
          <div class="right">
            <div class="item red">
              <span class="dian" />
              业绩报酬未扣减
              <span>{{chart_y}}</span>
            </div>
            <div class="item blue">
              <span class="dian" />
              业绩报酬已扣减
              <span>{{chart_y1}}</span>
            </div>
          </div>
        </div>
        <div v-show="tab === '1'" class="history-title">
          <div class="left">日期 {{chart_x1}}</div>
          <div class="right">收益率 1.15%</div>
        </div>
        <div
          v-show="tab === '0'"
          class="my-echarts"
          ref="echarts"
          style="width: 340px;height: 212px;"
        />
        <div
          v-show="tab === '1'"
          class="my-echarts"
          ref="echarts1"
          style="width: 340px;height: 212px;"
        />
        <div v-show="tab === '0'" class="cumulative-foot">
          <span>08-03</span>
          <span>08-08</span>
        </div>
      </div>
    </div>
    <div class="trade-record">
      <span>交易记录</span>
      <span>
        <svg-icon icon-class="next" class="icon" />
      </span>
    </div>
    <div class="border"></div>
    <div class="trade-rules">
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
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate } from '@utils/tools';
import {
  Collapse,
  CollapseItem,
  Button,
  Toast,
} from 'vant';
import { createNamespacedHelpers } from 'vuex';
import echarts from 'echarts';
import { echartsOption } from './js/format';

const { mapActions, mapState } = createNamespacedHelpers('product/fund');

const seriesTest = [
  '1.0000',
  '1.0023',
  '0.9967',
  '1.0375',
  '1.0443',
  '1.0633',
  '1.0745',
  '1.0464',
  '1.0394',
  '1.0430',
  '1.0409',
  '1.0492',
  '1.0429',
  '1.0513',
  '1.0519',
  '1.0515',
  '1.0400',
  '0.0000',
];

const seriesTest2 = [
  '1.0200',
  '1.2323',
  '0.9967',
  '1.3375',
  '1.1443',
  '1.1633',
  '1.1745',
  '1.1464',
  '1.1394',
  '1.1430',
  '1.1409',
  '1.1492',
  '1.1429',
  '1.1513',
  '1.1519',
  '1.1515',
  '1.1400',
  '0.1000',
];

const time = [
  1562860800000,
  1562947200000,
  1563033600000,
  1563120000000,
  1563206400000,
  1563292800000,
  1563379200000,
  1563465600000,
  1563552000000,
  1563638400000,
  1563724800000,
  1563811200000,
  1563897600000,
  1563984000000,
  1564070400000,
  1564156800000,
  1564243200000,
  1565193600000,
];

// currency_type: "btc"
// dates: Array(0)
// fund_product_id: 2
// fund_product_name: "ABC多策略整合CTA"
// fund_product_status_type: "CLOSE"
// holding_market_value: 0
// holding_shares: 0
// nav: 1.05
// nav_date: 1565193600000
// pending_amt: 107.01
// pnl: 0
// pnl_daily: Array(0)
// pnl_rate: null
// pnl_ratio: null
// pnl_ratio_daily: Array(0)
// pnl_without_carry_list: Array(0)
// principal: 0
// yesterday_change: null

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
      chart_x: '03-27',
      chart_x1: '03-27',
      chart_y: '1.1512',
      chart_y1: '1.1512',
    };
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      await this.getFundOwnerDetail(this.$route.params.id);
      // console.log(this.fundOwnerDetail);
      this.$nextTick(() => {
        // this.setEcharts();
      });
      Toast.clear();
    } catch (error) {
      Toast.clear();
      Toast(error);
    }
  },
  methods: {
    ...mapActions(['getFundOwnerDetail']),
    setEcharts() {
      // seriesTest seriesTest2 time 数据
      let option;
      if (this.tab === '0') {
        const min = Math.min.apply(null, seriesTest.concat(seriesTest2));
        const max = Math.max.apply(null, seriesTest.concat(seriesTest2));
        const num = (max - min) * 1.2;
        this.chart = echarts.init(this.$refs.echarts);
        option = echartsOption(time, seriesTest, seriesTest2, min, max, num);
      } else {
        const min = Math.min.apply(null, seriesTest);
        const max = Math.max.apply(null, seriesTest);
        const num = (max - min) * 1.2;
        this.chart = echarts.init(this.$refs.echarts1);
        option = echartsOption(time, seriesTest, '', min, max, num);
      }
      // 触发事件
      this.chart.getZr().on('mousemove', this.onMouseMove);
      // this.chart.setOption(echartsOption(X, series, min, max, num));
      this.chart.setOption(option);
    },
    onMouseMove(params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);
      if (this.chart.containPixel('grid', pointInPixel)) {
        this.chart_x = formatDate(this.chart.getOption().xAxis[0].data[pointInGrid[0]], 'MM-DD');
        this.chart_x1 = formatDate(this.chart.getOption().xAxis[0].data[pointInGrid[0]], 'MM-DD');
        // this.chart_y = seriesTest.filter(item => item === this.chart_x);
        // this.chart_y1 = seriesTest2.filter(item => item === this.chart_x);
      }
    },
    onChangeTab(text) {
      this.tab = text;
      // this.setEcharts();
    },
    onSell() {
      this.$router.push({ path: '/mine/fund/fund-sell', query: { fund_id: this.fundOwnerDetail.fund_product_id, fund_user_stat_id: this.fundOwnerDetail.fund_user_stat_id } });
    },
    onBuy() {
      this.$router.push('/product/fund');
    },
  },
  computed: {
    ...mapState(['fundOwnerDetail']),
    yesterday() {
      return !this.fundOwnerDetail.yesterday_change && this.fundOwnerDetail.yesterday_change !== '0' ? '--' : '0';
    },
    status() {
      return this.fundOwnerDetail.fund_product_status_type === 'OPEN';
    },
    navTime() {
      return formatDate(this.fundOwnerDetail.nav_date, 'MM-DD');
    },
  },
};
</script>

<style lang='scss'>
.fund-detail {
  background: #f8f8f8;
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
    margin-top: 10px;
    background: #ffffff;
    padding-bottom: 21px;
    .tabs {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .tab {
        width: 130px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        color: #0f3256;
        box-sizing: border-box;
        border-bottom: 1px solid transparent;
        &.active {
          color: #3c64ee;
          border-bottom: 1px solid #3c64ee;
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
        margin-top: 14px;
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
  .trade-record,
  .trade-rules {
    background: #ffffff;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #0f3256;
    box-sizing: border-box;
    padding: 0 20px;
    font-weight: 600;
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
