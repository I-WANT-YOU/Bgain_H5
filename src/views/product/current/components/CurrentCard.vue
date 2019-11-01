<template>
  <div class="current-card__container">
    <div class="card-annual__title" @click="onHistoryRatesClick(dataSource.currency_type)">
      今日年化利率
      <svg-icon icon-class="current-arrow" class="icon-arrow" />
    </div>
    <div class="card__trade-records" @click="onRecordsClick(dataSource.currency_type)">
      <svg-icon icon-class="current-records" class="icon-records"></svg-icon>交易记录
    </div>
    <div class="card-annual__rate">{{dataSource.interest_rate}}</div>
    <div class="card__total-amount">
      <span>在投总额</span>
      <span
        class="number"
      >{{isLogin ? dataSource.reinvest_amount : '-'}} {{isLogin ? dataSource.currency_type : ''}}</span>
    </div>
    <div class="card-profit__panel">
      <div>
        <div class="profit__title">累计收益({{dataSource.currency_type}})</div>
        <span>{{isLogin ? dataSource.total_profit : '-'}}</span>
      </div>
      <span></span>
      <div @click="onHistoryProfitClick(dataSource.currency_type)">
        <div class="profit__title">
          昨日收益({{dataSource.currency_type}})
          <svg-icon icon-class="next" class="icon" />
        </div>
        <span>{{isLogin ? dataSource.yesterday_profit : '-'}}</span>
      </div>
    </div>
    <div class="buttons">
      <div class="roll-out" @click="onSellClick(dataSource.currency_type)">转出</div>
      <div class="roll-in" @click="onBuyClick(dataSource.currency_type)">转入</div>
    </div>
    <BgainBaseDialog
      v-model="showDialog"
      :showCancel="false"
      content="您还未设置交易密码，暂无法进行购买"
      submitText="设置交易密码"
      @submit="onSSSS"
      @cancel="()=>{this.showDialog = false;
       window._czc.push(['_trackEvent', 'click', '天天赚-交易密码-取消']);}"
    />
    <BgainBaseDialog
      v-model="Dialog"
      :showCancel="false"
      title="温馨提示"
      content
      submitText="知道了"
      @submit="()=>{this.Dialog = false}"
      @cancel="()=>{this.Dialog = false}"
      wrapHeight="260px"
    >
      <template v-slot:content>
        <div>
          <div class="holiday">平台休假中，暂不可进行转入/转出，敬请谅解！</div>
          <div class="holiday-rules">
            <div>规则说明:</div>
            <div>中国非周末公休节假日（包括元旦、春节、清明、劳动节、端午、中秋、国庆），平台在不处理天天赚转入、转出业务，节假日后即可恢复正常处理。</div>
          </div>
        </div>
      </template>
    </BgainBaseDialog>
    <!--临时弹窗-->
    <BgainBaseDialog
      v-model="temporaryDialog"
      :showCancel="false"
      :showClose="false"
      title="温馨提示"
      content="由于功能升级，天天赚暂不可转入，您可选购其他产品"
      submitText="知道了"
      @submit="()=>{this.temporaryDialog = false}"
      @cancel="()=>{this.temporaryDialog = false}"
      wrapHeight="260px"
    />
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('user');
const { mapActions: mapAuthActions } = createNamespacedHelpers('auth');
const { mapActions: mapCurrentActions, mapGetters: mapCurrentGetters } = createNamespacedHelpers('product/current');

export default {
  name: 'CurrentCard',
  components: {
    BgainBaseDialog,
  },
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      login: false,
      al: 1,
      showDialog: false,
      Dialog: false,
      temporaryDialog: false,
    };
  },
  mounted() {
    this.isloginSt().then(() => {
      this.login = true;
      this.getUserSummary().then(() => {
        this.al = this.authLevel;
      });
    }, () => {
      this.login = false;
    });
  },
  computed: {
    ...mapGetters(['authLevel']),
    ...mapCurrentGetters(['holidayStatus']),
  },
  methods: {
    ...mapAuthActions({ isloginSt: 'isLogin' }),
    ...mapActions(['getUserSummary']),
    ...mapCurrentActions(['getHoliday']),
    onRecordsClick(currency) {
      window._czc.push(['_trackEvent', 'click', '天天赚-活期-交易记录']);
      this.$router.push({
        name: 'trade-records',
        params: {
          currency,
        },
      });
    },
    onHistoryRatesClick(currency) {
      this.$router.push({
        name: 'history-rates',
        params: {
          currency,
        },
      });
    },
    onHistoryProfitClick(currency) {
      this.$router.push({
        name: 'history-profit',
        params: {
          currency,
        },
      });
    },
    async onSellClick(currency) {
      window._czc.push(['_trackEvent', 'click', '天天赚-活期-转出']);
      if (this.login) {
        if (this.al === 2) {
          await this.getHoliday();
          if (this.holidayStatus) {
            this.$router.push({
              name: 'current-sell',
              params: {
                currency,
              },
            });
          } else {
            this.Dialog = true;
          }
        } else {
          this.showDialog = true;
        }
      } else {
        sessionStorage.setItem('fromLogin', '/product/current');
        this.$router.push('/login');
      }
    },
    onSSSS() {
      window._czc.push(['_trackEvent', 'click', '天天赚-设置交易密码-确定']);
      sessionStorage.setItem('payment', '/product/current');
      this.$router.push('/mine/safety/password/payment/set');
    },
    async onBuyClick(currency) {
      window._czc.push(['_trackEvent', 'click', '天天赚-活期-转入']);
      if (this.login) {
        if (this.al === 2) {
          await this.getHoliday();
          if (this.holidayStatus) {
            this.temporaryDialog = true;
            // this.$router.push({
            //   name: 'current-buy',
            //   params: {
            //     currency,
            //   },
            // });
          } else {
            this.Dialog = true;
          }
        } else {
          this.showDialog = true;
        }
      } else {
        sessionStorage.setItem('fromLogin', '/product/current');
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.current-card__container {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 24px;

  .card-annual__title {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #a8aeb9;
    line-height: 18px;

    .icon-arrow {
      width: 4.4px;
      height: 9px;
      margin-left: 6.6px;
    }
  }

  .card__trade-records {
    position: absolute;
    top: 16px;
    right: 0;
    background: #fdf4f4;
    padding: 6px 18px 6px 8px;
    border-radius: 17px 0 0 17px;
    font-size: 12px;
    color: #ff5656;
    line-height: 17px;

    .icon-records {
      width: 10px;
      height: 11px;
      margin-right: 5.1px;
    }
  }

  .card-annual__rate {
    text-align: center;
    font-size: 42px;
    line-height: 59px;
    color: #ff5656;

    &::after {
      content: "%";
      display: inline;
      font-size: 26px;
      color: #ff5656;
    }
  }

  .card__total-amount {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px 0 19px;
    font-size: 15px;
    color: #a8aeb9;
    line-height: 21px;

    .number {
      margin-left: 5px;
      color: #003259;
    }
  }

  .card-profit__panel {
    display: flex;
    align-items: center;
    justify-content: space-around;

    > div {
      padding: 0 34px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .profit__title {
        padding: 0;
        margin-bottom: 5px;
        font-size: 13px;
        line-height: 18px;
        color: #a8aeb9;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          width: 11px;
          height: 11px;
          margin-top: 2px;
          margin-left: 2px;
        }
      }

      > span {
        font-size: 16px;
        line-height: 22px;
        color: #0f3256;
      }
    }

    > span {
      height: 32px;
      width: 1px;
      background: #eeeeee;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 19px;

    > div {
      width: 156px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 4px;
      font-size: 16px;
      letter-spacing: 0;

      &.roll-out {
        background: #edf0fa;
        color: #3c64ee;
      }

      &.roll-in {
        background: #3c64ee;
        color: #ffffff;
      }
    }
  }
  .holiday {
    padding: 0 10px;
    font-size: 16px;
    color: #0f3256;
    letter-spacing: 0.15px;
    text-align: center;
    margin-bottom: 6px;
  }
  .holiday-rules{
    margin-bottom: 10px;
    text-align: left;
    font-size: 12px;
    color: #6A707D;
    letter-spacing: 0;
    line-height: 19px;
  }
}
</style>
