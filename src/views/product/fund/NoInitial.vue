<template>
  <div class="noiniaial">
    <BgainNavBar :title="title" />
    <div class="info">
      <div class="info-top">
        <span class="gains">+{{fundDetail.market_change_percent}}%</span>
        <span class="texts">
          当前规模
          <span class="text">{{fundDetail.current_size}} {{fundDetail.currency_type}}</span>
        </span>
      </div>
      <div class="info-bottom">
        <span class="gains">日涨跌幅</span>
        <span>
          最新净值({{formatDate(fundDetail.nav_date,'MM-DD')}})
          <span class="text">{{fundDetail.nav}}</span>
        </span>
      </div>
    </div>
    <div class="icons">
      <span class="border">{{fundDetail.currency_type}}</span>
      <span class="border">{{type}}</span>
      <span class="border">{{risk}}</span>
      <span>{{fundDetail.min_invest_amt}}{{fundDetail.currency_type}}起投</span>
    </div>
    <div class="networth">
      <div class="title">
        <span>净值走势</span>
        <div class="purchase">申购倒计时 1天19小时24分</div>
      </div>
      <div class="echarts">
        <div class="my-echarts" ref="echarts" style="width: 286px;height: 136px;"></div>
      </div>
    </div>
    <div class="tradeshow">
      <div class="title">
        <span>交易说明</span>
        <div class="skip">
          交易规则、常见问题等
          <svg-icon icon-class="next" class="next" />
        </div>
      </div>
      <div class="steps">
        <div class="text">
          <div>
            <div>{{showstep ? '--' : ''}}</div>
            <div class="font">认购提交</div>
          </div>
          <div>
            <div>{{showstep ? '--' : ''}}</div>
            <div class="font">确认份额</div>
          </div>
          <div>
            <div>{{showstep ? '--' : ''}}</div>
            <div class="font">查看交易</div>
          </div>
          <div>
            <div>{{formatDate(fundDetail.next_open_date,'MM-DD')}}</div>
            <div class="font">下一次认购开放日</div>
          </div>
        </div>
        <div>
          <div v-if="showstep" class="step">
            <span class="circle"></span>
            <span class="line"></span>
            <span class="circle"></span>
            <span class="line"></span>
            <span class="circle"></span>
            <span class="line"></span>
            <span class="circle active"></span>
          </div>
          <div v-if="!showstep" class="step">
            <span class="circle active"></span>
            <span class="line active"></span>
            <span class="circle active"></span>
            <span class="line active"></span>
            <span class="circle active"></span>
            <span class="line active"></span>
            <span class="circle active"></span>
          </div>
        </div>
      </div>
      <div class="show">
        <div>
          <svg-icon icon-class="fund-retreat" />
          <div class="percent">{{fundDetail.max_retracement_scale * 1}}%</div>
          <div class="text">最大回撤</div>
          <!--  -->
        </div>
        <div>
          <svg-icon icon-class="fund-managementfee" />
          <div class="percent">{{fundDetail.manage_fee_rate * 1}}%</div>
          <div class="text">管理费(年化)</div>
          <!-- manage_fee_rate -->
        </div>
        <div>
          <svg-icon icon-class="fund-meritpay" />
          <div class="percent">{{fundDetail.market_change_percent * 100}}%</div>
          <div class="text">业绩报酬</div>
          <!-- market_change_percent -->
        </div>
      </div>
    </div>
    <div class="fundarchives">
      <div class="title">
        <span>基金档案</span>
        <div class="skip">
          基金团队、策略说明、实盘业绩等
          <svg-icon icon-class="next" class="next" />
        </div>
      </div>
      <div class="team">
        <img :src="fundDetail.png_url" alt />
        <span>{{fundDetail.team_name}}</span>
      </div>
    </div>
    <div class="risk">
      <div class="title">
        <span>风险说明</span>
        <svg-icon icon-class="next" class="next" />
      </div>
    </div>
    <div class="foot"></div>
    <div class="fixed">
      <div v-if="!open" class="open">2019-08-08开放认购</div>
      <Button type="info" class="button">立即认购</Button>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate, strip } from '@utils/tools';
import { mapActions, mapGetters } from 'vuex';
import echarts from 'echarts';
import { Button } from 'vant';
import { formatRisk, formatType } from './formatFundData';

/*
administrator: "NV Capital↵"
carry_rate_user: "30"
closing_date: 1561716000000
create_date: 1558354347000
currency_type: "BTC"
current_size: "15.8752"
current_time: 1564675200000
due_date: 1561651200000
fund_name: "NV全频中性套利1号"
fund_product_type: "Arbitrage"
id: 1
initial_end_date: 1559296800000
initial_start_date: 1558364400000
introduction: "针↵"
issue_number: 2
manage_fee_rate: "0"
market_change_percent: "283.22"
max_retracement_scale: "6.00"
min_holding_shares: "1"
min_invest_amt: "0.01"
nav: "3.7823"
nav_date: 1562774400000
next_open_date: 1563532200000
open_duration: 7
period: 28
png_url: "https://finbee-uat.oss-cn-hongkong.aliyuncs.com/logo2.jpg"
profits_date: 1561737600000
risk_level_type: "R2_MEDIUM_LOW_LEVEL"
status: "CLOSE"
team_name: "NV Capital"
un_open_duration: 21
up_down: 1
*/



export default {
  name: 'NoInitial',
  components: {
    BgainNavBar,
    Button,
  },
  data() {
    return {
      title: 'ABC多策略整合CTA',
      showstep: true,
      open: false,
      type: '',
      risk: '',
    };
  },
  mounted() {
    this.getFundProductDetail(this.$route.params.id).then(() => {
      console.log(this.fundDetail);

      console.log(this.fundNavHistories);
      console.log(this.$refs.echarts);
      this.type = formatType(this.fundDetail).fund_product_type;
      this.risk = formatRisk(this.fundDetail).risk_level_type;
      this.chart = echarts.init(this.$refs.echarts);
      const X = this.fundNavHistories.map((item) => formatDate(item.get_nav_time, 'MM-DD'));
      const series = this.fundNavHistories.map((item) => item.nav);
      const min = Math.min.apply(null, series);
      const max = Math.max.apply(null, series);
      const num = (max - min) * 1.2;
      const option = {
        grid: {
          left: '14%',
          right: '0%',
          bottom: '5%',
          top: '5%',
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['净值']
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          show: false,
          type: 'category',
          data: X,
        },

        yAxis: {
          show: true,
          type: 'value',
          min: strip(min - num, 4),
          max: strip(max * 1 + num, 4),
        },
        series: [{
          data: series,
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            width: 1,
            color: '#4770F5',
          },
          areaStyle: {
            normal: {
              opacity: 0.2,
              color: `#C6D0F0`,
            },
          },
        },
        ],
      };
      this.chart.setOption(option);
    });
  },
  methods: {
    ...mapActions({
      getFundProductDetail: 'product/fund/getFundProductDetail',
    }),
    formatDate(date, format) {
      return formatDate(date, format);
    },
  },
  computed: {
    ...mapGetters({
      fundDetail: 'product/fund/fundDetail',
      fundNavHistories: 'product/fund/fundNavHistories',
    }),
  },
};
</script>

<style lang='scss' scoped>
.noiniaial {
  background: #f8f8f8;
  .title {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #0f3256;
    box-sizing: border-box;
    padding-left: 20px;
    font-weight: 600;
    border-bottom: 1px solid #e5e9f6;
    .skip {
      font-weight: 400;
      font-size: 12px;
      color: #a8aeb9;
      letter-spacing: 0;
    }
    .next {
      width: 7px;
      height: 11px;
      margin-right: 20px;
    }
  }
  .info {
    height: 103px;
    font-size: 12px;
    color: #a8aeb9;
    box-sizing: border-box;
    padding: 28px 0 20px 24px;
    border-bottom: 1px solid #e5e9f6;
    background: #fff;
    .info-top {
      margin-bottom: 9px;
      display: flex;
      .gains {
        width: 151px;
        font-size: 28px;
        color: #00b870;
      }
      .texts {
        padding-top: 13px;
      }
    }
    .info-bottom {
      display: flex;
      .gains {
        width: 151px;
      }
    }
    .text {
      font-size: 13px;
      color: #0f3256;
    }
  }
  .icons {
    height: 41px;
    display: flex;
    align-items: center;
    font-size: 11px;
    color: #6a707d;
    letter-spacing: 0;
    box-sizing: border-box;
    padding-left: 4px;
    margin-bottom: 10px;
    background: #ffffff;
    span {
      padding: 0 16px;
      &.border {
        border-right: 1px solid #e5e9f6;
      }
    }
  }
  .networth {
    background: #ffffff;
    margin-bottom: 10px;
    .title {
      .purchase {
        width: 168px;
        height: 24px;
        background: #fdf4f4;
        border-radius: 100px 2px 2px 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #ff5044;
        font-weight: 400;
      }
    }
    .echarts {
      height: 209px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .tradeshow {
    background: #ffffff;
    margin-bottom: 10px;
    .steps {
      font-size: 11px;
      color: #a8aeb9;
      letter-spacing: 0;
      margin-bottom: 31.4px;
      .text {
        display: flex;
        margin-top: 31px;
        > div {
          width: 90px;
          text-align: center;
        }
      }
      .font {
        margin-top: 7px;
      }
      .step {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        .circle {
          height: 7px;
          width: 7px;
          box-sizing: border-box;
          border: 2px solid #e5e9f6;
          border-radius: 100%;
          &.active {
            border-color: #3c64ee;
          }
        }
        .line {
          height: 2px;
          width: 87px;
          background: #e5e9f6;
          &.active {
            background: #3c64ee;
          }
        }
      }
    }
    .show {
      display: flex;
      justify-content: space-around;
      text-align: center;
      > div {
        display: flex;
        flex-direction: column;
      }
      .percent {
        font-size: 15px;
        color: #0f3256;
        margin-top: 15px;
      }
      .text {
        font-size: 12px;
        color: #002e00;
        text-align: center;
        line-height: 21px;
        padding-bottom: 24px;
      }
    }
  }
  .fundarchives {
    background: #ffffff;
    margin-bottom: 10px;
    .team {
      height: 94px;
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #6a707d;
      letter-spacing: 0;
      img {
        width: 60px;
        height: 60px;
        margin: 0 23px 0 20px;
      }
    }
  }
  .risk {
    background: #ffffff;
    margin-bottom: 24px;
  }
  .foot {
    height: 70px;
    width: 100%;
  }
  .fixed {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .open {
      height: 32px;
      line-height: 32px;
      width: 100%;
      background: #fdf4f4;
      font-size: 12px;
      color: #ff5044;
      text-align: center;
    }
    .button {
      height: 50px;
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
