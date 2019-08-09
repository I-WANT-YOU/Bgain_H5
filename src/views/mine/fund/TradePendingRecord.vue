<template>
  <div class="trade-pending">
    <BgainNavBar title="待确定中" />
    <div class="trade-pending-con">
      <div v-if="list.length" class="record-show">
        <div v-for="fund in list" @click="onClick(fund.id)" :key='fund.id' class="trade-card">
          <div class="title">
            <span>{{fund.fund_name}}</span>
            <span>{{fund.amount}} {{fund.currency_type}}</span>
          </div>
          <div class="icons">
            <span class="icon">认购</span>
          </div>
        </div>
      </div>
      <div v-else class="record-dis">
        <svg-icon icon-class="mine-fund-no-record" class="icon" />
        <div class="text">暂无待确定交易记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('product/fund');

const statusList = [
  {
    status: 'PENDING',
    text: '待确定',
  },
  {
    status: 'CONFIRMED',
    text: '确定',
  },
  {
    status: 'COMPLETE',
    text: '完成',
  },
  {
    status: 'FAILURE',
    text: '失败',
  },
  {
    status: 'CANCEL',
    text: '已撤单',
  },
];

const tradeTypeList = [
  {
    type: 'BUY',
    text: '认购',
  },
  {
    type: 'SELL',
    text: '赎回',
  },
  {
    type: 'SUB_CARRY',
    text: '业绩报酬扣除',
  },
];


export default {
  name: 'TradePendingRecord',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    Toast.loading({
      duration: 0,
      mask: true,
      forbidClick: true,
      message: '加载中...',
    });
    this.getFundOrderHistory('pending').then(() => {
      this.list = this.orderHistory.map((item) => {
        item.trade_type = tradeTypeList.filter(ite => ite.type === item.trade_type)[0].text;
        /* eslint-disable */
        item.fund_order_status = statusList.filter(ite => ite.status === item.fund_order_status)[0].text;
        /* eslint-enable */
        return item;
      });
      Toast.clear();
    }).catch((error) => {
      Toast.clear();
      throw error;
    });
  },
  methods: {
    ...mapActions(['getFundOrderHistory']),
    onClick(id) {
      console.log(id);
    },
  },
  computed: {
    ...mapGetters(['orderHistory']),
  },
};
</script>

<style lang='scss' scoped>
.trade-pending {
  display: flex;
  flex-direction: column;
  .trade-pending-con {
    flex: 1;
    padding-top: 5px;
    .record-show {
      .trade-card {
        box-sizing: border-box;
        padding: 14px 20px;
        border-bottom: 1px solid #eeeeee;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #0f3256;
        }
        .icons {
          display: flex;
          margin-top: 5px;
          .icon {
            width: 30px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 11px;
            color: #ff5c5c;
            background: #fdf4f4;
            border-radius: 4px 4px 0 0;
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
