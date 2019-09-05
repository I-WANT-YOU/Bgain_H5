<template>
  <div class="mine">
    <Header class="mine-header" :isLogin="login" />
    <div class="mine-content">
      <div class="userInfo">
        <div class="income">
          <div v-if="login" class="login">
            <div class="currency">
              <span>总资产</span>
              <span @click="onClickCurrency" class="currency-type">{{currency}}</span>
              <span @click="onClickCurrency" class="icons-pull">
                <svg-icon icon-class="mine-pull" class="icon-pull" />
              </span>
            </div>
            <div class="assets" @click="onAsset">
              <span>{{asset}}</span>
              <span class="icon">
                <svg-icon icon-class="next" class="icon-next" />
              </span>
            </div>
          </div>
          <div v-else class="logout" @click="onSkip('/login')">请登录/注册</div>
        </div>
        <div class="incomes">
          <div>
            <div>累计收益</div>
            <div class="num" :class="login ? '' : 'loginText'">{{income}}</div>
          </div>
          <div>
            <div>待收收益</div>
            <div class="num" :class="login ? '' : 'loginText'">{{accumulatedIncome}}</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="balance">
          <div class="balance-info">
            <div @click="goLogin('/mine/balance')" class="balance-info-text">
              <span>可用余额({{currency}})</span>
              <span>
                <svg-icon icon-class="next" class="icon-next" />
              </span>
            </div>
            <div :class="login ? '' : 'loginText'">{{balance}}</div>
          </div>
          <div class="top-up">
            <span class="recharge" @click="goLogin('/purchaseCoinHome')">充币</span>
            <span class="extract" @click="goLogin('/extract-coin')">提币</span>
          </div>
        </div>
      </div>
      <div class="investment">
        <div class="title">我的投资</div>
        <div class="icons">
          <div @click="onSkip('/product/current')" class="icon-wrap">
            <svg-icon icon-class="mine-current" class="icon" />
            <span>天天赚</span>
          </div>
          <div @click="goLogin('/mine/fixed')" class="icon-wrap">
            <svg-icon icon-class="mine-fixed" class="icon" />
            <span>定期盈</span>
          </div>
          <div @click="goLogin('/mine/fund')" class="icon-wrap">
            <svg-icon icon-class="mine-fund" class="icon" />
            <span>冠军基金</span>
          </div>
        </div>
      </div>
      <div v-if="showBanner" class="banner">
        <img src="../../assets/images/mine_banner.png" alt />
      </div>
      <div class="option">
        <div class="wrap">
          <div class="item">
            <div class="icon-wrap">
              <svg-icon icon-class="mine-record" class="icon" />
            </div>
            <div @click="goLogin('/asset-record')">
              <div class="title">资金记录</div>
              <div class="info">资金流水，一目了然</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <svg-icon icon-class="mine-coupons" class="icon" />
            </div>
            <div @click="goLogin('/coupon')">
              <div class="title">优惠券</div>
              <div class="info">加息券，红包</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="icon-wrap">
              <svg-icon icon-class="mine-question" class="icon" />
            </div>
            <div @click="go('/commonProblem')">
              <div class="title">常见问题</div>
              <div class="info">投资、充提币、产品介绍</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <svg-icon icon-class="mine-activity" class="icon" />
            </div>
            <div @click="go('/activity')">
              <div class="title">活动中心</div>
              <div class="info">会员、签到、奖励</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ActionSheet v-model="showCurrency" :actions="options" @select="onSelectCurrency" />
    <BgainBaseDialog
      v-model="dialogApp"
      :showCancel="false"
      submitText="下载App"
      content="下载App，了解和查看更多产品详情"
      @cancel="onCancel"
      @submit="onSubmit"
    />
    <div class="footer-fixed">
      <DownApp @func="getMsgFormSon" />
    </div>
    <BaseFooter />
  </div>
</template>

<script>
import { ActionSheet, Toast } from 'vant';
import { mapActions, mapGetters } from 'vuex';
import Header from '@component/mine/Header.vue';
import BaseFooter from '@component/BaseFooter.vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import DownApp from '@component/DownApp.vue';

export default {
  name: 'Mine',
  components: {
    Header,
    ActionSheet,
    BaseFooter,
    BgainBaseDialog,
    DownApp,
  },
  data() {
    return {
      login: false,
      income: '--',
      accumulatedIncome: '--',
      balance: '--',
      currency: 'BTC',
      asset: '0.00',
      showBanner: false,
      showCurrency: false,
      options: ['BTC', 'USDT', 'ETH', 'EOS'],
      msgFormSon: false,
      dialogApp: false,
    };
  },
  mounted() {
    try {
      this.isLogin().then(() => {
        this.login = true;
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '加载中...',
          color: '#1989fa',
        });
        this.getUserBalanceSummary().then(() => {
          Toast.clear();
          this.currency = this.singleCurrency[0].currency;
          this.options = this.currencyss
            .map(item => ({ name: item[0].toLocaleUpperCase() }));
          this.getCurreny();
        });
      }, () => {
        this.login = false;
        Toast.clear();
      });
    } catch (error) {
      Toast.clear();
      Toast(error);
    }
  },
  computed: {
    ...mapGetters('user', ['singleCurrency', 'currencyss', 'kycStatus']),
  },
  methods: {
    ...mapActions('user', ['getUserBalanceSummary', 'getUserSummary']),
    ...mapActions('auth', ['isLogin']),
    getCurreny() {
      // eslint-disable-next-line max-len
      const curreny = this.currencyss.filter(item => (item[0].toLocaleUpperCase() === this.currency))[0][1];
      this.asset = curreny.total_asset;
      this.income = curreny.total_earned_profit;
      this.accumulatedIncome = curreny.expected_profit;
      this.balance = curreny.available_balance;
    },
    onSkip(router) {
      this.$router.push(router);
    },
    onClickCurrency() {
      this.showCurrency = true;
    },
    onSelectCurrency(item) {
      this.currency = item.name;
      this.getCurreny();
      this.showCurrency = false;
    },
    // 从子组件获取参数
    getMsgFormSon(data) {
      this.msgFormSon = data;
    },
    go(router) {
      this.$router.push(router);
    },
    // 未登录
    async goLogin(router) {
      if (this.login) {
        if (router === '/extract-coin') {
          try {
            await this.getUserSummary();
            if (this.kycStatus === 'CERTIFIED') {
              this.$router.push(router);
            } else if (this.kycStatus === 'UN_CERTIFIED') {
              Toast('身份未认证');
            } else if (this.kycStatus === 'FAILED') {
              Toast('身份认证失败');
            } else if (this.kycStatus === 'AUDITING') {
              Toast('身份认证中');
            }
          } catch (error) {
            throw error;
          }
        } else {
          this.$router.push(router);
        }
        // 基金开放
        // else if (router === '/mine/fund') {
        //   this.dialogApp = true;
        // }
      } else {
        this.$router.push('/login');
      }
    },
    onAsset() {
      this.$router.push('/asset');
    },
    onCancel() {
      this.dialogApp = false;
    },
    onSubmit() {
      window.location.href = 'https://fir.im/ngaw';
    },
  },
};
</script>

<style lang='scss' scoped>
.mine {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .mine-content {
    display: flex;
    flex: 1 1 auto;
    margin-top: -82px;
    align-items: center;
    flex-direction: column;
    .userInfo {
      box-sizing: border-box;
      width: 343px;
      height: 220px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 1px 10px 2px rgba(211, 211, 211, 0.31);
      margin-bottom: 15px;
      .income {
        width: 347px;
        height: 99px;
        background: #ffffff;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 14px 17px 17px;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: #0f3256;
        .login {
          .currency {
            display: flex;
            margin-bottom: 12px;
            position: relative;
            .currency-type {
              margin-left: 15px;
            }
            .icons-pull {
              display: flex;
              align-items: center;
              .icon-pull {
                margin-left: 4px;
                width: 10px;
                height: 4.7px;
              }
            }
            .select-currency {
              position: absolute;
              background: #ffffff;
              width: 100px;
              top: 20px;
              left: 13px;
              text-align: center;
              .select-currency-option {
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #eeeeee;
              }
            }
          }
          .assets {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28px;
            padding: 6px 0;
            margin-bottom: 12px;
            .icon {
              display: flex;
              align-content: center;
              .icon-next {
                width: 8px;
                height: 12px;
              }
            }
          }
        }
        .logout {
          height: 100%;
          font-size: 24px;
          color: #0f3256;
          display: flex;
          align-items: center;
        }
      }
      .incomes {
        display: flex;
        font-size: 13px;
        color: #6a707d;
        margin: 3px 0 12px 17px;
        .num {
          width: 165px;
          font-size: 15px;
          color: #0f3256;
          margin-top: 8px;
        }
        .loginText {
          color: #cccccc;
        }
      }
      .line {
        margin-bottom: 11px;
      }
      .balance {
        display: flex;
        width: 343px;
        font-size: 15px;
        color: #0f3256;
        box-sizing: border-box;
        padding: 0 17px;
        justify-content: space-between;
        .balance-info {
          .balance-info-text {
            font-size: 12px;
            color: #6a707d;
            margin-bottom: 6px;
          }
          .icon-next {
            width: 7px;
            height: 12px;
            margin-left: 12.7px;
          }
          .loginText {
            color: #cccccc;
          }
        }
        .top-up {
          margin: 12px 7px 0 0;
          .recharge {
            color: #ff5c5c;
          }
          .extract {
            margin-left: 28px;
          }
        }
      }
    }
    .investment {
      width: 343px;
      height: 130px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      color: #0f3256;
      box-shadow: 0 1px 10px 2px rgba(211, 211, 211, 0.31);
      border-radius: 6px;
      .title {
        font-size: 16px;
        margin: 15px 0 20px 12px;
      }
      .icons {
        display: flex;
        font-size: 14px;
        box-sizing: border-box;
        padding: 0 34px 0 40px;
        justify-content: space-between;
        .icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon {
            width: 25px;
            height: 25px;
            margin-bottom: 10.5px;
          }
        }
      }
    }
    .banner {
      width: 347px;
      height: 90px;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
    .option {
      width: 343px;
      box-shadow: 0 1px 4px 2px rgba(221, 221, 221, 0.23);
      border-radius: 6px;
      padding: 6px 0;
      box-sizing: border-box;
      margin-bottom: 30px;
      .wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .item {
          display: flex;
          box-sizing: border-box;
          padding: 19px 0 19px 12px;
          width: 153px;
          &:nth-child(1),
          &:nth-child(4) {
            width: 164px;
            padding: 19px 0;
            border-right: 1px solid #eeeeee;
          }
          .icon-wrap {
            margin-right: 8.3px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-bottom: 15px;
            .icon {
              width: 15.7px;
              height: 17.8px;
            }
          }
          .title {
            font-size: 14px;
            color: #0f3256;
            letter-spacing: 0;
            margin-bottom: 5px;
          }
          .info {
            font-size: 12px;
            color: #6a707d;
          }
        }
        .line {
          margin: 0;
        }
      }
    }
    .line {
      border: 0;
      width: 325px;
      border-bottom: 1px solid #eeeeee;
      transform: scaleY(0.5);
    }
  }
  .footer-fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
}
</style>
