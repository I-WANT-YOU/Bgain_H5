<template>
  <div class="transaction-details">
    <BgainNavBar title="交易详情" />
    <div class="fund-info">
      <div class="icon-wrap">
        <svg-icon
          class="buy"
          v-if="$route.query.type !== 'SUB_CARRY'"
          :icon-class="fundOrderDetail.trade_type === 'BUY'?'mine-record-buy':'mine-record-sell'"
        />
        <svg-icon class="carry" v-else icon-class="mine-record-carry" />
      </div>
      <div class="fund-name">{{fundOrderDetail.fund_product_name}}</div>
      <div class="fund-amount">{{fundOrderDetail.amount}}</div>
      <diV class="fund-currency">
        {{ $route.query.type !== 'SUB_CARRY' ? '认购金额' : '扣除金额'}}
        ({{fundOrderDetail.payment_currency || fundOrderDetail.currency_type}})
      </diV>
      <div :class="['type-change', $route.query.type !== 'SUB_CARRY' ? 'nor' : '']"></div>
      <div v-if="$route.query.type !== 'SUB_CARRY'" class="steps">
        <div class="step">
          <svg-icon class="step-icon" icon-class="step" />
          <!-- <svg-icon class="step-icon" icon-class="steps"/> -->
        </div>
        <div class="step-text">
          <div class="step-x active">
            <div v-if="fundOrderDetail.trade_type === 'BUY'">扣减资金，提交认购申请</div>
            <div v-else>冻结基金份额，提交赎回申请</div>
            <div>{{formatDate(fundOrderDetail.create_at)}}</div>
          </div>
          <div class="step-x">
            <div v-if="fundOrderDetail.trade_type === 'BUY'">确定份额，募集期结束，进入锁定期</div>
            <div v-else>确定赎回，扣减基金份额</div>
            <div>{{formatDate(fundOrderDetail.confirmed_date)}}</div>
          </div>
          <div class="step-x">
            <div v-if="fundOrderDetail.trade_type === 'BUY'">进入开放期，基金可赎回或继续认购</div>
            <div v-else>赎回资金到账</div>
            <div>
              {{formatDate((fundOrderDetail.next_start_date))}}
              至 {{formatDate((fundOrderDetail.next_end_date))}}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="fundOrderDetail.fund_order_status === '待确定'"
        @click="onCancelOrder"
        class="cancel-order"
      >
        <span>撤单</span>
        <svg-icon icon-class="next" class="cancel-order-icon" />
      </div>
    </div>
    <div v-if="$route.query.type !== 'SUB_CARRY'" class="trade-info">
      <div class="title">交易信息</div>
      <div class="show">
        <div class="text">
          <span class="left">交易类型</span>
          <span>{{fundOrderDetail.trade_type === 'BUY' ? '认购' : '赎回'}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">交易状态</span>
          <span>{{fundOrderDetail.fund_order_status}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">交易时间</span>
          <span>{{formatDate(fundOrderDetail.create_at)}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">订单编号</span>
          <span>{{fundOrderDetail.order_num}}</span>
        </div>
      </div>
    </div>
    <div v-if="fundOrderDetail.fund_order_status === '完成'" class="confirm-info">
      <div class="title">确定信息</div>
      <div class="show">
        <div class="text">
          <span class="left">确定金额</span>
          <span>{{fundOrderDetail.confirmed_shares}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">确定份额</span>
          <span>{{fundOrderDetail.confirmed_shares}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">确定净值</span>
          <span>{{fundOrderDetail.confirmed_nav}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">手续费</span>
          <span>{{fundOrderDetail.fee_amt}}{{fundOrderDetail.currency_type}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">确定时间</span>
          <span>{{formatDate(fundOrderDetail.confirmed_date)}}</span>
        </div>
      </div>
    </div>
    <div v-if="$route.query.type === 'SUB_CARRY'" class="deduction-info">
      <div class="title">扣除信息</div>
      <div class="show">
        <div class="text">
          <span class="left">扣除份额</span>
          <span>{{fundOrderDetail.shares}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">产品净值</span>
          <span>{{fundOrderDetail.nav}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">扣除金额</span>
          <span>{{fundOrderDetail.amount}} {{fundOrderDetail.currency_type}}</span>
        </div>
      </div>
      <div class="show">
        <div class="text">
          <span class="left">扣除时间</span>
          <span>{{formatDate(fundOrderDetail.sub_date)}}</span>
        </div>
      </div>
    </div>
    <BgainBaseDialog
      v-model="showDialog"
      content="您是否确认撤消该笔交易订单?"
      @cancel="onCancel"
      @submit="showPaymentDialog"
    />
    <PaymentPasswordDialog v-model="showPayment" @submit="onSurePayment" @close="onClosePayment" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import PaymentPasswordDialog from '@views/product/components/PaymentPasswordDialog.vue';
import { formatDate } from '@utils/tools';
import responseStatus from '@/constants/responseStatus';
import format from './js/format';

const { mapActions, mapState } = createNamespacedHelpers('product/fund');

export default {
  name: 'TransactionDetails',
  components: {
    BgainNavBar,
    BgainBaseDialog,
    PaymentPasswordDialog,
  },
  data() {
    return {
      options: [],
      showDialog: false,
      showPayment: false,
    };
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      if (this.$route.query.type === 'SUB_CARRY') {
        await this.getSubCarryDetail(this.$route.query.id);
      } else {
        await this.getFundOrderDetail(this.$route.query.id);
      }
      this.option = format(this.fundOrderDetail);

      Toast.clear();
    } catch (error) {
      Toast.clear();
      if (error && error.status) {
        Toast(responseStatus[error.status]);
      }
    }
  },
  methods: {
    ...mapActions(['getFundOrderDetail', 'cancelOrder', 'getSubCarryDetail']),
    formatDate(date) {
      return formatDate(date);
    },
    onCancel() {
      this.showDialog = false;
    },
    showPaymentDialog() {
      this.showDialog = false;
      this.showPayment = true;
    },
    onCancelOrder() {
      this.showDialog = true;
    },
    onClosePayment() {
      this.showPayment = false;
    },
    onSurePayment(password) {
      this.cancelOrder({
        orderId: this.$route.query.id,
        password,
      }).then(() => {
        this.$router.go(-1);
      });
    },
  },
  computed: {
    ...mapState(['fundOrderDetail']),
  },
};
</script>

<style lang='scss' scoped>
.transaction-details {
  background: #fbfbfb;
  height: 100%;
  .fund-info {
    box-sizing: border-box;
    background: #ffffff;
    padding: 0 20px;
    position: relative;
    .icon-wrap {
      .buy {
        width: 32px;
        height: 18px;
      }
      .carry {
        width: 78px;
        height: 18px;
      }
    }
    .fund-name {
      text-align: center;
      font-size: 14px;
      color: #0f3256;
      margin: 18px 0 8px;
    }
    .fund-amount {
      text-align: center;
      font-size: 26px;
      color: #0f3256;
      margin-bottom: 8px;
    }
    .fund-currency {
      font-size: 12px;
      color: #a8aeb9;
      text-align: center;
      padding-bottom: 14px;
    }

    .type-change {
      width: 100%;
      &.nor {
        &::after {
          display: block;
          content: "";
          width: 100%;
          border-bottom: 1px dashed #dddddd;
          transform: scaleY(0.5);
        }
      }
    }

    .steps {
      display: flex;
      .step {
        .step-icon {
          height: 145px;
          width: 20px;
          margin: 22px 0 35px 18px;
        }
      }
      .step-text {
        box-sizing: border-box;
        margin-left: 25px;
        padding-top: 24px;
        font-size: 12px;
        color: #a8aeb9;
        letter-spacing: 0;
        .step-x {
          margin-bottom: 35px;
          &:nth-child(3) {
            margin-bottom: 0;
          }
          &.active {
            color: #6a707d;
          }
        }
      }
    }
    .cancel-order {
      position: absolute;
      font-size: 14px;
      color: #3c64ee;
      display: flex;
      align-items: center;
      right: 20px;
      top: 28px;
      .cancel-order-icon {
        width: 5px;
        height: 10px;
        margin-left: 4px;
      }
    }
  }
  .trade-info,
  .confirm-info,
  .deduction-info {
    margin-top: 10px;
    color: #0f3256;
    background: #ffffff;
    .title {
      font-size: 15px;
      box-sizing: border-box;
      height: 50px;
      padding-left: 15px;
      line-height: 50px;
      font-weight: 600;
    }
    .show {
      font-size: 14px;
      &::before {
        display: block;
        content: "";
        width: 100%;
        border-top: 1px solid #eeeeee;
      }
      .text {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 20px 0 15px;
        .left {
          color: #a8aeb9;
        }
      }
    }
  }
}
</style>
