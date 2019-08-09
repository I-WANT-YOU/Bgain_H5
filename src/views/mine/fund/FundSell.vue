<template>
  <div class="fund-sell">
    <BgainNavBar :title="title" />
    <div class="fund-sell-con">
      <div class="item">
        <div class="show-info">
          <div class="text">持有份额</div>
          <div>{{holding_shares}}份</div>
        </div>
      </div>
      <div class="item">
        <div class="input">
          <div class="text">赎回份额</div>
          <Field v-model="num" class="field" :placeholder="`最多可赎回${holding_shares}份`" />
          <span @click="onAll" class="all">全部</span>
        </div>
      </div>
      <div class="fee-amt">
        <div class="rules">
          <div>
            <span>预估手续费</span>
            <span class="num">{{num*redemmpt_fee_rate}} {{currency}}</span>
          </div>
          <div class="icon">
            <span class="text">赎回规则</span>
            <svg-icon icon-class="next" class="next" />
          </div>
        </div>
        <div class="text">最终以平台确认为准</div>
      </div>
      <div class="buttons">
        <BgainButton
          :class="disabled ? 'disabled' : ''"
          :disabled="disabled"
          :fluid="true"
          type="info"
          @click="onSell"
        >提交</BgainButton>
      </div>
      <PaymentPasswordDialog v-model="passwordDialog" @close="onClose" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainButton from '@component/BgainButton.vue';
import PaymentPasswordDialog from '@views/product/components/PaymentPasswordDialog.vue';
import { Field, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('product/fund');

export default {
  name: 'FundSell',
  methods: {
    ...mapActions(['sellFundDetail', 'sellFund']),
    onAll() {
      this.num = this.holding_shares;
    },
    onSell() {
      this.passwordDialog = true;
    },
    onClose() {
      this.passwordDialog = false;
    },
    onSubmit(password) {
      // "fund_id":1,
      // "sell_shares":200,
      // "payment_password":123456
      // const params = {
      //   fund_id: '',
      //   sell_shares: this.num,
      //   payment_password: password,
      // };
      // this.sellFund(params);
      console.log(password);
    },
  },
  components: {
    BgainNavBar,
    Field,
    BgainButton,
    PaymentPasswordDialog,
  },
  data() {
    return {
      title: '基金名称',
      holding_shares: '287.71',
      currency: 'BTC',
      redemmpt_fee_rate: 0,
      num: '',
      disabled: true,
      passwordDialog: false,
    };
  },
  watch: {
    num(value) {
      const reg = /^\./;
      const last = /\.$/;
      const num = /^\d+(\.\d+)?$/;
      const zero = /^0\d+/;
      const floatNum = value.split('.')[1] && value.split('.')[1];
      // 按钮
      if (value !== '') {
        this.disabled = false;
      }
      if (reg.test(value)) {
        this.num = '0.';
      } else if (value.indexOf('.') !== -1 && value.lastIndexOf('.') !== value.indexOf('.') && last.test(value)) {
        this.num = value.slice(0, value.length - 1);
      } else if (zero.test(value)) {
        this.num = value.slice(1);
      } else if (!num.test(value * 1)) {
        this.num = value.slice(0, value.length - 1);
      }
      if (!(this.num * 1) && (this.num * 1) === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      if (floatNum && floatNum.length > 2) {
        this.num = this.num.substring(0, this.num.indexOf('.') + 3);
        Toast('小数点最多可输入2位');
      }
      if (value * 1 > this.holding_shares) {
        Toast(`最多可赎回${this.holding_shares}份`);
        this.num = this.holding_shares;
      }
    },
  },
  async mounted() {
    try {
      // console.log(this.$route.query.fund_id, this.$route.query.fund_user_stat_id);
      // const params = {
      //   fund_id: this.$route.query.fund_id,
      //   fund_user_stat_id: this.$route.query.fund_user_stat_id,
      // };
      // await this.sellFundDetail(params); 调不通
    } catch (error) {
      throw error;
    }
  },
};
</script>

<style lang='scss'>
.fund-sell {
  height: 100%;
  width: 100%;
  background: #f8f8f8;
  .fund-sell-con {
    margin-top: 10px;
    .item {
      height: 50px;
      font-size: 14px;
      color: #0f3256;
      padding: 0 20px;
      background: #ffffff;
      border-bottom: 1px solid #eeeeee;
      .show-info,
      .input {
        height: 100%;
        display: flex;
        align-items: center;
        .text {
          width: 90px;
          font-weight: 500;
        }
        .field {
          padding-left: 27px;
          ::placeholder {
            font-size: 14px;
            color: #a8aeb9;
          }
        }
        .all {
          display: inline-block;
          width: 44px;
          font-size: 14px;
          color: #3c64ee;
        }
      }
    }
    .fee-amt {
      font-size: 13px;
      color: #6a707d;
      padding: 15px 20px;
      background: #ffffff;
      .rules {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .num {
          margin-left: 30px;
          font-size: 13px;
          color: #3c64ee;
        }
        .icon {
          display: flex;
          align-items: center;
          .next {
            margin-left: 9px;
            width: 5.3px;
            height: 10px;
          }
        }
      }
      .text {
        font-size: 12px;
        color: #a8aeb9;
      }
    }
    .buttons {
      padding: 0 20px;
      margin-top: 60px;
      font-size: 16px;
      color: #ffffff;
      .disabled {
        background: #d2d8eb;
        border: 0;
      }
    }
  }
}
</style>
