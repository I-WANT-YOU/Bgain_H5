<template>
  <div class="trade-record-history">
    <BgainNavBar title="历史交易记录" />
    <div class="trade-record-history-con">
      <div v-if="options.length" class="record-show">
        <div @click="onSk(fund)" v-for="fund in options" :key="fund.id" class="trade-record-card">
          <div class="line">
            <span class="product-name">{{fund.fund_name}}</span>
            <span>{{fund.amount}} {{fund.currency_type}}</span>
          </div>
          <div class="line time">
            <span>{{fund.create_date}}</span>
            <span>{{fund.fund_order_status}}</span>
          </div>
          <div class="icon-wrap">
            <svg-icon
              class="buy"
              v-if="fund.trade_type !== 'SUB_CARRY'"
              :icon-class="fund.trade_type === 'BUY'
              ?'mine-record-buy':'mine-record-sell'"
            />
            <svg-icon class="carry" v-else icon-class="mine-record-carry" />
          </div>
        </div>
      </div>
      <div v-else class="record-dis">
        <svg-icon icon-class="mine-fund-no-record" class="icon" />
        <div class="text">暂无历史交易记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import format from './js/format';

const { mapActions, mapGetters } = createNamespacedHelpers('product/fund');

export default {
  name: 'TradeRecordHistory',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      options: [],
    };
  },
  mounted() {
    Toast.loading({
      duration: 0,
      mask: true,
      forbidClick: true,
      message: '加载中...',
    });
    this.getFundOrderHistory().then(() => {
      this.options = this.orderHistory.map(item => format(item));
      Toast.clear();
    });
  },
  methods: {
    ...mapActions(['getFundOrderHistory']),
    onSk(fund) {
      this.$router.push({
        path: '/mine/fund/transaction-details',
        query: {
          id: fund.id,
        },
      });
    },
  },
  computed: {
    ...mapGetters(['orderHistory']),
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
    .record-show {
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
        .icon-wrap {
          margin-top: 4px;
          .buy {
            width: 32px;
            height: 18px;
          }
          .carry {
            width: 78px;
            height: 18px;
          }
        }
      }
    }
    .record-dis {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 130px;
        height: 98px;
        margin: 102px 0 23px;
      }
      .text {
        font-size: 14px;
        color: #a8aeb9;
      }
    }
  }
}
</style>
