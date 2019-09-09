<template>
  <span class="trade-rules">
    <BgainNavBar title="交易说明" />
    <span class="trade-rules-con">
      <Tabs
        class="tabs"
        title-active-color="#3c64ee"
        title-inactive-color="#0F3256"
        line-width="90"
        color="#3c64ee"
        line-height="2"
        :swipeable="true"
      >
        <Tab class="tab" title="认购规则">
          <div class="icons">
            <div class="icon">
              <span>
                <svg-icon class="svg-icon" icon-class="fund-subscribe" />
              </span>
              <span>认购</span>
              <span class="text">交易开放期内</span>
            </div>
            <div class="icon">
              <span>
                <svg-icon class="svg-icon" icon-class="fund-share" />
              </span>
              <span>平台确认份额</span>
              <span class="text">开放期截止日</span>
            </div>
            <div class="icon">
              <span>
                <svg-icon class="svg-icon" icon-class="fund-income" />
              </span>
              <span>查看收益</span>
              <span class="text">开放期结束</span>
            </div>
          </div>
          <table class="table" border="1">
            <tr class="theader">
              <td colspan="2">{{currency}}</td>
            </tr>
            <tr class="ttitle">
              <td>交易类型</td>
              <td>手续费率</td>
            </tr>
            <tr>
              <td>认购</td>
              <td>
                <span class="rate">{{rateBuy.length && rateBuy[0].rate * 100}}%</span>
                <span class="rate old">({{rateBuy.length && rateBuy[0].rate1 * 100}}%)</span>
              </td>
            </tr>
          </table>
          <div class="info">*实际交易费率以平台确认费率为准</div>
        </Tab>
        <Tab class="tab" title="赎回规则">
          <div class="icons">
            <div class="icon">
              <span>
                <svg-icon class="svg-icon" icon-class="fund-redemption" />
              </span>
              <span>赎回</span>
              <span class="text">交易开放期内</span>
            </div>
            <div class="icon">
              <span>
                <svg-icon class="svg-icon" icon-class="fund-share" />
              </span>
              <span>平台确认份额</span>
              <span class="text">开放期截止日</span>
            </div>
            <div class="icon">
              <span>
                <svg-icon class="svg-icon" icon-class="fund-redemption-account" />
              </span>
              <span>赎回款到账</span>
              <span class="text">开放期结束</span>
            </div>
          </div>
          <table class="table" border="1">
            <tr class="theader">
              <td colspan="3">{{currency}}</td>
            </tr>
            <tr class="ttitle">
              <td>交易类型</td>
              <td>持仓周期</td>
              <td>手续费率</td>
            </tr>

            <tr v-for="(rate,key) in (rateSell)" :key="key">

              <td v-if="key===0" :rowspan="(rateSell.length + 1)">赎回</td>
              <td v-if="key===0">0~{{rateSell[0].data}}天(不含)</td>
              <td v-if="key===0">
                <span class="rate">{{rateSell[0].rate * 100}}%</span>
                <span class="rate old">({{rateSell[0].rate1 * 100}}%)</span>
              </td>

              <td v-if="key!==0">{{ rateSell[key-1].data}}~{{rateSell[key].data}}天(不含)</td>
              <td v-if="key!==0">
                <span class="rate">{{rateSell[key].rate * 100}}%</span>
                <span class="rate old">({{rateSell[key].rate1 * 100}}%)</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="gts">
                  <span class="gt">
                    <div class="top">&gt;</div>
                    <div>=</div>
                  </span>
                  <span>{{rateSell.length && rateSell[rateSell.length-1] ? rateSell[rateSell.length-1].data : 0}}天</span>
                </div>
              </td>
              <td>
                <span class="rate">
                  {{rateSell.length && rateSell[rateSell.length-1]
                  ? rateSell[rateSell.length-1].rate * 100 : 0}}%
                </span>
                <span class="rate old">
                  ({{rateSell.length && rateSell[rateSell.length-1]
                  ? rateSell[rateSell.length-1].rate1 * 100 : 0}}%)
                </span>
              </td>
            </tr>
          </table>
          <div class="info">*实际交易费率以平台确认费率为准</div>
        </Tab>
        <Tab class="tab" title="平台管理费">
          <div class="manage_fee_rate">
            平台管理费(年化) : {{ manage_fee_rate }}
            <span
              class="no-discount"
            >&nbsp;({{manage_fee_rate_no_discount}})&nbsp;</span> , 按日计提
          </div>
          <div class="manage_fee_rate_text">用户需支付的基金管理费，每日按固定比例从基金资产中扣取，每日公布的基金净值为扣除管理费的净值。</div>
        </Tab>
        <Tab class="tab" title="业绩报酬">
          <div class="manage_fee_rate">业绩报酬分成比例 : {{carry_rate_user}}</div>
          <div class="carry_rate_user_text">业绩报酬分为用户投资收益应分配给基金管理人的部分。</div>
          <div class="eg">
            <div>* 业绩报酬按照份额进行扣除</div>
            <div>举例 :</div>
            <div>平台业绩报酬分成比例位30%, 用户持仓市值位20000, 投资成本为18000。</div>
            <div>若一期期末持仓收益为2000, 则对(2000-0)的收益增值部分按照比例计提业绩报酬</div>
            <div>若二期期末持仓收益为3000, 则对(3000-2000)的收益增值部分按照比例计提业绩报酬</div>
            <div>扣除业绩报酬当天的产品净值是1.5</div>
            <div>则应扣除的业绩报酬金额= （3000-2000） * 30% = 300</div>
            <div>应扣除的业绩报酬份额=300/1.5=200份</div>
          </div>
        </Tab>
      </Tabs>
    </span>
  </span>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { Tab, Tabs } from 'vant';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TradeRules',
  components: {
    BgainNavBar,
    Tab,
    Tabs,
  },
  data() {
    return {
      carry_rate_user: '30%',
      manage_fee_rate: '1%',
      manage_fee_rate_no_discount: '2%',
      currency: 'BTC',
      rateBuy: [],
      rateSell: [],
    };
  },
  mounted() {
    this.getFundTradeRules(this.$route.query.productId).then(() => {
      this.carry_rate_user = `${this.fundTradeRules.carry_rate_user * 100}%`;
      this.manage_fee_rate = `${this.fundTradeRules.manage_fee_rate * 100}%`;
      this.manage_fee_rate_no_discount = `${this.fundTradeRules.manage_fee_rate_no_discount * 100}%`;
      this.currency = this.fundTradeRules.currency_type;
      this.rateBuy = this.fundTradeRules.fund_fee_rate_buy;
      this.rateSell = this.fundTradeRules.fund_fee_rate_sell;
    });
  },
  methods: {
    ...mapActions({
      getFundTradeRules: 'product/fund/getFundTradeRules',
    }),
  },
  computed: {
    ...mapState('product/fund', ['fundTradeRules']),
    rateBuyArr() {
      return this.rateBuy.slice(1);
    },
  },
};
</script>

<style lang='scss'>
.trade-rules {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .trade-rules-con {
    width: 100%;
    display: flex;
    flex: 1;
    .tabs {
      font-size: 14px;
      color: #0f3256;
      letter-spacing: 0;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      [class*="van-hairline"]::after {
        border: 0;
        border-bottom: 1px solid #dddddd;
      }
      .van-tabs__content {
        flex: 1;
        width: 100%;
      }
      .tab {
        width: 100%;
        height: 100%;
        .icons {
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
          .icon {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
            color: #0f3256;
            text-align: center;
            .svg-icon {
              width: 26px;
              height: 26px;
              margin: 20px 0 15.6px;
            }
            .text {
              font-size: 12px;
              color: #cccccc;
              margin-top: 3px;
            }
          }
        }
        .table {
          width: 332px;
          text-align: center;
          font-size: 13px;
          color: #6a707d;
          margin-left: 21px;
          border: 1px solid #eeeeee;
          border-collapse: collapse;
          .theader {
            font-size: 15px;
            color: #0f3256;
            background: #f4f6ff;
          }
          .ttitle {
            font-size: 12px;
            color: #0f3256;
          }
          tr {
            height: 35px;
          }
          .gts {
            display: flex;
            align-items: center;
            justify-content: center;
            .gt {
              font-size: 10px;
              transform: scaleY(0.9);
              margin-right: 4px;
              .top {
                margin-bottom: -6px;
              }
            }
          }
          .rate {
            font-size: 13px;
            color: #6a707d;
            letter-spacing: 0;
            &.old {
              font-size: 11px;
              color: #9aa2b2;
              text-decoration: line-through;
              margin-left: 8px;
            }
          }
        }
        .info {
          font-size: 12px;
          color: #9aa2b2;
          letter-spacing: 0;
          margin: 15.7px 0 0 20px;
        }
        .manage_fee_rate {
          margin: 0 0 6px 20px;
          padding-top: 20px;
          box-sizing: border-box;
          font-size: 14px;
          color: #0f3256;
        }
        .no-discount {
          font-size: 11px;
          color: #9aa2b2;
          text-decoration: line-through;
        }
        .manage_fee_rate_text {
          margin: 0 18px;
          font-size: 14px;
          color: #6a707d;
          letter-spacing: 0.32px;
          line-height: 26px;
        }
        .carry_rate_user_text {
          margin-left: 20px;
          font-size: 14px;
          color: #6a707d;
          letter-spacing: 0;
          line-height: 25px;
        }
        .eg {
          padding: 0 16px 0 20px;
          box-sizing: border-box;
          font-size: 13px;
          color: #9aa2b2;
          letter-spacing: 0;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
