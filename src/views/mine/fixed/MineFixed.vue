<template>
  <div class="mine-fixed">
    <BgainNavBar>
      <template v-slot:title>
        <div class="tab-wrap">
          <div class="tabs">
            <div @click="onTab('1')" :class="['tab', 'tab1', active==='1'?'active':'']">持有中</div>
            <div @click="onTab('2')" :class="['tab', 'tab2', active==='2'?'active':'']">已结束</div>
          </div>
        </div>
      </template>
    </BgainNavBar>
    <div class="mine-fixed-con">
      <div class="asset-wrap">
        <div v-show="active === '1'" class="holding">
          <div class="info">
            <span>在投资产({{currency}})</span>
            <span class="icon-wrap" @click="showMune = true">
              {{currency}}
              <svg-icon icon-class="mine-pull" class="icon-pull" />
            </span>
          </div>
          <div class="amount">{{numberWithThousands(amount)}}</div>
        </div>
        <div class="income">
          <div class="title">{{active === '1' ? '待收' : '已得'}}收益</div>
          <div class="currencies">
            <div class="icon" v-for="(item,key) in balanceList" :key="key">
              <img class="icon-img" :src="item.icon_url" alt />
              <div class="icon-info">
                <div class="currency-type">{{item.currency_type}}</div>
                <div>{{item.amount}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="no" v-if="!userPortfolio.length">
          <div class="no-record">
            <svg-icon icon-class="mine-fund-no-record" class="no-record-icon" />
            <div>暂无持仓记录</div>
          </div>
        </div>
        <div v-else class="has">
          <FixedCard
            v-for="(item,key) in userPortfolio"
            :status="active === '1'"
            :option="item"
            :key="key"
          />
        </div>
      </div>
    </div>
    <ActionSheet v-model="showMune" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { ActionSheet, Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import { numberWithThousands, changeFloat } from '@utils/tools';
import FixedCard from './components/FixedCard.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('product/fixed');

export default {
  name: 'MineFixed',
  components: {
    BgainNavBar,
    FixedCard,
    ActionSheet,
  },
  data() {
    return {
      active: '1',
      list: [],
      balanceList: [],
      amount: 0,
      currency: 'BTC',
      showMune: false,
      actions: [],
    };
  },
  methods: {
    ...mapActions(['getUserPortfolio', 'getUserPortfolioHistory', 'getUsetFixedHoldingDetail']),
    onTab(tab) {
      this.active = tab;
      this.onChangeList();
    },
    async onChangeList() {
      Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      if (this.active === '1') {
        await this.getUserPortfolio();
        await this.getUsetFixedHoldingDetail(0);
        this.amount = changeFloat(this.userHoldFixedAsset.BTC, 'none');
        this.actions = Object.entries(this.userHoldFixedAsset)
          .filter(item => (item[0] === 'USDT' || item[0] === 'BTC' || item[0] === 'CNY'))
          .map(item => ({ name: item[0] }));
        Toast.clear();
      } else {
        await this.getUserPortfolioHistory();
        await this.getUsetFixedHoldingDetail(1);
        Toast.clear();
      }
      this.balanceList = this.userHoldFixedSummary;
    },
    onSelect(currency) {
      const select = Object.entries(this.userHoldFixedAsset)
        .filter(item => item[0] === currency.name)[0][1];
      this.currency = currency.name;
      this.amount = changeFloat(select, currency.name !== 'CNY' ? 'none' : currency.name);
      this.showMune = false;
    },
    numberWithThousands(num) {
      return numberWithThousands(num);
    },
  },
  computed: {
    ...mapState(['userPortfolio']),
    ...mapGetters(['userHoldFixedAsset', 'userHoldFixedSummary']),
  },
  mounted() {
    this.onChangeList();
    this.currency = 'BTC';
  },
};
</script>

<style lang='scss' scoped>
.mine-fixed {
  background: #f8f8f8;
  .tab-wrap {
    height: 100%;
    display: flex;
    font-size: 14px;
    color: #6a707d;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    margin-top: 10px;
    .tabs {
      display: flex;
      .tab {
        width: 64px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border: 1px solid #eeeeee;
        border-radius: 2px;
        &.tab1 {
          border-radius: 2px 0 0 2px;
          border-right: 0;
        }
        &.tab2 {
          border-radius: 0 2px 2px 0;
          border-left: 0;
        }
        &.active {
          background: #3c64ee;
          color: #ffffff;
        }
      }
    }
  }
  .mine-fixed-con {
    .asset-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 17px 0 10px;
      background: #ffffff;
      .holding {
        width: 335px;
        height: 100px;
        background: url("../../../assets/images/mine-fixed/holding.png");
        background-size: 100% 100%;
        color: #ffffff;
        box-sizing: border-box;
        padding: 24px 0 0 15px;
        .info {
          font-size: 12px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .icon-wrap {
            display: flex;
            align-items: center;
            margin-left: 10px;
            .icon-pull {
              width: 11px;
              height: 7px;
              margin-left: 7px;
            }
          }
        }
        .amount {
          font-size: 24px;
        }
      }
      .income {
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 14px;
        color: #0f3256;
        .title {
          margin-bottom: 11px;
        }
        .currencies {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          .icon {
            width: 50%;
            display: flex;
            align-items: center;
            margin-bottom: 22px;
            .icon-img {
              width: 25px;
              height: 25px;
              margin-right: 12px;
              border-radius: 50%;
            }
            .currency-type {
              font-size: 12px;
              color: #a8aeb9;
              margin-bottom: 6px;
            }
          }
        }
      }
    }
    .list {
      background: #ffffff;
      padding-top: 12.5px;
      .no {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #a8aeb9;
        font-size: 24px;
        .no-record {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          color: #a8aeb9;
          .no-record-icon {
            width: 102px;
            height: 78px;
            margin: 60px 0 12px;
          }
        }
      }
      .has {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
