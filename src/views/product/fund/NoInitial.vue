<template>
  <div class="noiniaial">
    <BgainNavBar
      :onArrowClick="()=>{this.$router.push('/product/fund')}"
      :title="fundDetail.fund_name ? fundDetail.fund_name : title"
    />
    <div class="info">
      <div class="info-top">
        <span :class="['gains' , fundDetail.up_down >= 0 ? '' : 'active']">
          <span>
            {{fundDetail.up_down >= 0
            ? `+${am}`
            : `-${am}`}}
          </span>
          <span class="percent">%</span>
          <i />
        </span>
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
        <div v-if="fundDetail.status === 'OPEN'" class="purchase">申购倒计时 {{sellTime}}</div>
      </div>
      <div class="echarts">
        <div class="echarts-info">
          <span>日期 {{chart_x}}</span>
          <span class="echarts-info-num">单位净值 {{chart_y}}</span>
        </div>
        <div class="my-echarts" ref="echarts"></div>
      </div>
    </div>
    <div class="tradeshow">
      <div class="title">
        <span>交易说明</span>
        <div @click="goToTradeDescription" class="skip">
          交易规则、常见问题等
          <svg-icon icon-class="next" class="next" />
        </div>
      </div>
      <div class="steps">
        <div class="text">
          <div>
            <div>{{!showstep ? '--' : formatDate(fundDetail.current_time,'MM-DD') }}</div>
            <div class="font">提交认购</div>
          </div>
          <div>
            <div>{{!showstep ? '--' : formatDate(fundDetail.due_date,'MM-DD')}}</div>
            <div class="font">确认份额</div>
          </div>
          <div>
            <div>{{!showstep ? '--' : formatDate(fundDetail.profits_date,'MM-DD')}}</div>
            <div class="font">查看收益</div>
          </div>
          <div>
            <div>{{formatDate(fundDetail.next_open_date,'MM-DD')}}</div>
            <div class="font">下次可交易日</div>
          </div>
        </div>
        <div>
          <div v-if="!showstep" class="step">
            <span class="circle"></span>
            <span class="line"></span>
            <span class="circle"></span>
            <span class="line"></span>
            <span class="circle"></span>
            <span class="line"></span>
            <span class="circle active"></span>
          </div>
          <div v-if="showstep" class="step">
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
        <div @click="onDialog('在选定周期内任一历史时点往后推，产品净值走到最低点时的收益率回撤幅度的最大值', '最大回撤')">
          <svg-icon icon-class="fund-retreat" />
          <div class="percent">{{fundDetail.max_retracement_scale * 1}}%</div>
          <div class="text">最大回撤</div>
        </div>
        <div @click="onDialog('用户需支付的基金管理费，每日按固定比例从基金资产中扣取，每日公布的基金净值为扣除管理费后的净值', '管理费(年化)')">
          <svg-icon icon-class="fund-managementfee" />
          <div class="percent">{{fundDetail.manage_fee_rate * 1}}%</div>
          <div class="text">管理费(年化)</div>
        </div>
        <div @click="onDialog('用户投资收益应分配给基金管理人作为业绩报酬的部分', '业绩报酬')">
          <svg-icon icon-class="fund-meritpay" />
          <div class="percent">{{fundDetail.carry_rate_user}}%</div>
          <div class="text">业绩报酬</div>
        </div>
      </div>
    </div>
    <div class="fundarchives">
      <div class="title">
        <span>基金档案</span>
        <div @click="goToFundFile" class="skip">
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
        <span @click="go('/risk-statement')">
          <svg-icon icon-class="next" class="next" />
        </span>
      </div>
    </div>
    <div class="foot"></div>
    <div class="fixed">
      <Button
        v-if="this.fundDetail.status === 'OPEN'"
        type="info"
        class="button"
        @click="onSubmit"
      >立即认购</Button>
      <div v-else>
        <div class="open">{{formatDate(fundDetail.next_open_date,'YYYY-MM-DD')}}开放认购</div>
        <Button type="info" class="button" @click="onSubmit">到时提醒我</Button>
      </div>
    </div>
    <BgainBaseDialog
      v-model="payment"
      :showCancel="false"
      content
      submitText="设置交易密码"
      @submit="setPayment"
      @cancel="cancelPayment"
    >
      <template v-slot:content>
        <div class="setPay">您还未设置交易密码，暂无法进行购买</div>
      </template>
    </BgainBaseDialog>
    <BgainBaseDialog
      v-model="showDialog"
      :showCancel="false"
      :showClose="false"
      :content="dialogText"
      submitText="我知道了"
      :title="dialogTitle"
      @submit="()=>{this.showDialog = false}"
    />
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import BgainNavBar from '@component/BgainNavBar.vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import { formatDate } from '@utils/tools';
import { mapActions, mapGetters } from 'vuex';
import echarts from 'echarts';
import { Button, Toast } from 'vant';
import { formatRiskText, formatType, echartsOption } from './formatFundData';
import responseStatus from '@/constants/responseStatus';

export default {
  name: 'NoInitial',
  components: {
    BgainNavBar,
    BgainBaseDialog,
    Button,
  },
  data() {
    return {
      title: 'ABC多策略整合CTA',
      showstep: false,
      open: false,
      type: '',
      risk: '',
      chart_x: '03-16', // 净值走势日期
      chart_y: '1.0000', // 净值走势单位净值
      payment: false,
      sellTime: '',
      isLogin: '',
      showDialog: false,
      dialogText: '',
      dialogTitle: '',
      am: 0, // 日涨跌幅
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      await this.getFundProductDetail(this.$route.params.id);
      const time = this.fundDetail.next_open_date - this.fundDetail.server_time;
      const dd = parseInt(time / (60 * 60 * 24 * 1000), 0);
      const hh = parseInt((time / (60 * 60 * 1000)) % 24, 0);
      const mm = parseInt((time / (60 * 1000)) % 60, 0);
      this.sellTime = `${dd}天${hh.toString().length < 2 ? `0${hh}` : hh}小时${mm.toString().length < 2 ? `0${mm}` : mm}分`;
      this.type = formatType(this.fundDetail).fund_product_type;
      this.risk = formatRiskText(this.fundDetail).risk_level_type;
      this.setEcharts();
      this.showstep = this.fundDetail.status === 'OPEN';
      this.am = this.fundDetail.market_change_percent;
      Toast.clear();
    } catch (error) {
      Toast('网络加载失败,请重新进入该页面');
      Toast.clear();
    }
  },
  methods: {
    ...mapActions({
      getFundProductDetail: 'product/fund/getFundProductDetail',
      sendRemind: 'product/fund/sendRemind',
      getUserSummary: 'user/getUserSummary',
    }),
    /* 跳转交易说明 */
    goToTradeDescription() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-交易说明']);
      this.$router.push({
        path: '/product/fund/trade-rules',
        query: { productId: this.$route.params.id },
      });
    },
    /* 跳转基金档案 */
    goToFundFile() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-基金档案']);
      this.$router.push({
        path: '/product/fund/product-files',
        query: { productId: this.$route.params.id },
      });
    },
    /* 跳转风险说明 */
    goToRiskDescription() { },
    formatDate(date, format) {
      return formatDate(date, format);
    },
    // 点击最大回撤（3个）
    onDialog(text, title) {
      this.showDialog = true;
      this.dialogText = text;
      this.dialogTitle = title;
    },
    setEcharts() {
      this.chart_x = formatDate(this.fundNavHistories[this.fundNavHistories.length - 1].get_nav_time, 'MM-DD');
      this.chart_y = this.fundNavHistories[this.fundNavHistories.length - 1].nav;
      this.chart = echarts.init(this.$refs.echarts);
      const X = this.fundNavHistories.map(item => item.get_nav_time);
      const series = this.fundNavHistories.map(item => item.nav);
      const min = Math.min.apply(null, series);
      const max = Math.max.apply(null, series);
      const num = (max - min) * 0.3;
      // 触发事件
      this.chart.getZr().on('mousemove', this.onMouseMove);
      this.chart.setOption(echartsOption(X, series, min, max, num));
    },
    onMouseMove(params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);
      if (this.chart.containPixel('grid', pointInPixel)) {
        this.chart_x = this.chart.getOption().xAxis[0].data[pointInGrid[0]];
        this.chart_y = this.fundNavHistories.filter(item => item.get_nav_time === this.chart_x);
        this.chart_y = this.chart_y[0].nav;
        this.chart_x = formatDate(this.chart.getOption().xAxis[0].data[pointInGrid[0]], 'MM-DD');
      }
    },
    async onSubmit() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-到时提醒']);
      try {
        await this.getUserSummary();
      } catch (error) {
        window.sessionStorage.setItem('loginFrom', `/product/fund/noinitial/${this.fundDetail.id}`);
        throw error;
      }
      // 开放认购
      if (this.fundDetail.status === 'OPEN') {
        this.showstep = false;
        if (this.authLevel === 2) { // 1新用户 2设置交易密码
          this.$router.push(`/product/fund/subscribe/${this.fundDetail.id}`);
        } else {
          this.payment = true;
        }
      } else {
        this.showstep = true;
        if (this.authLevel) {
          this.sendRemind({
            fundId: this.fundDetail.id,
            openDate: this.fundDetail.next_open_date,
          }).then(() => {
            Toast('到时会以短信或邮箱的形式提醒您');
          }, (error) => {
            if (error && error.status) {
              Toast(responseStatus[error.status]);
            }
          });
        } else {
          window.sessionStorage.setItem('loginFrom', `/product/fund/noinitial/${this.fundDetail.id}`);
          this.$router.push({ path: '/login' });
        }
      }
    },
    setPayment() {
      sessionStorage.setItem('payment', `/product/fund/noinitial/${this.fundDetail.id}`);
      this.$router.push('/mine/safety/password/payment/set');
    },
    cancelPayment() {
      this.payment = false;
    },
    go(path) {
      window._czc.push(['_trackEvent', 'click', '冠军基金-风险说明']);
      this.$router.push(path);
    },
  },
  computed: {
    ...mapGetters({
      fundDetail: 'product/fund/fundDetail',
      fundNavHistories: 'product/fund/fundNavHistories',
      authLevel: 'user/authLevel',
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
        .percent {
          font-size: 20px;
        }
        i {
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 4.5px 10px;
          margin-bottom: 17px;
          margin-left: 2px;
          border-color: transparent transparent #00b870;
        }
        &.active {
          color: #ff5044;
          i {
            border-style: solid;
            border-width: 10px 5px 0;
            border-color: #ff5044 transparent transparent;
          }
        }
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
      flex-direction: column;
      .echarts-info {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #6a707d;
        box-sizing: border-box;
        padding: 0 20px;
        margin-bottom: 14px;
        .echarts-info-num {
          display: inline-block;
          width: 90px;
          text-align: left;
        }
      }
      .my-echarts {
        width: 345px;
        height: 136px;
      }
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
          width: 95px;
          text-align: center;
        }
      }
      .font {
        margin-top: 7px;
        color: #0f3256;
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
          width: 86px;
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
        align-items: center;
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
  .setPay {
    padding: 0 20px;
    font-size: 16px;
    color: #0f3256;
    letter-spacing: 0.15px;
    text-align: center;
    line-height: 24px;
  }
}
</style>
