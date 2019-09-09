<template>
  <div class="extract-coin">
    <BgainNavBar goBack="/mine" title="提币">
      <template v-slot:right>
        <div @click="skip" class="record-wrap">
          <svg-icon icon-class="extract-coin-record" class="record" />
        </div>
      </template>
    </BgainNavBar>
    <div class="extract-coin-con">
      <div class="line">
        <BgainBaseField label-width="74px" label="选择币种" required>
          <template v-slot:input>
            <span>{{currency}}</span>
          </template>
          <template v-slot:button>
            <div @click="showSelect" class="icon-wrap">
              <svg-icon icon-class="mine-pull" class="icon" />
            </div>
          </template>
        </BgainBaseField>
        <BgainBaseField
          label-width="74px"
          v-model="address"
          label="提币地址"
          required
          placeholder="请填写提币地址"
        />
        <BgainBaseField label-width="74px" label="提币数量" required>
          <template v-slot:input>
            <input
              class="input"
              v-model="coin"
              :placeholder="`最少可提 ${min} ${currency}`"
              type="text"
            />
            <div class="input-text">可提现额度 : {{amount}} {{currency}}</div>
          </template>
          <template v-slot:button>
            <span class="all" @click="onAll">全部</span>
          </template>
        </BgainBaseField>
        <BgainBaseField label-width="74px" required label="手续费">
          <template v-slot:input>
            <span>{{fees}} {{currency}}</span>
          </template>
        </BgainBaseField>
      </div>

      <BgainButton type="info" @click="onSubmit" class="button">提交</BgainButton>
      <div class="coin-info">
        <div class="title">提币说明</div>
        <div class="ol">{{description}}</div>
      </div>
    </div>
    <BgainBaseDialog
      :showCancel="false"
      :submitText="dialogText.button"
      :content="dialogText.content"
      v-model="showDialog"
      @submit="onSkip"
      @cancel="goBack"
    />
    <BgainBaseDialog
      v-model="payment"
      :showCancel="false"
      content="您还未设置交易密码，暂无法进行购买"
      submitText="设置交易密码"
      @submit="setPayment"
      @cancel="cancelPayment"
    />
    <PaymentPasswordDialog @close="onClose" @submit="getPaymentPassword" v-model="maskShow" />
    <ActionSheet v-model="selsct" @select="onSelect" :actions="option" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ActionSheet, Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainBaseField from '@component/BgainBaseField.vue';
import BgainButton from '@component/BgainButton.vue';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import PaymentPasswordDialog from '@views/product/components/PaymentPasswordDialog.vue';
import responseStatus from '@/constants/responseStatus';

export default {
  name: 'ExtractCoin',
  components: {
    BgainNavBar,
    BgainBaseField,
    BgainButton,
    BgainBaseDialog,
    ActionSheet,
    PaymentPasswordDialog,
  },
  data() {
    return {
      address: '',
      coin: '',
      showDialog: false,
      dialogText: {
        content: '为保证您在平台交易的资金安全请先完成身份认证',
        button: '身份认证',
        path: '/mine',
      },
      option: [],
      currency: 'BTC',
      min: '0.005',
      fees: '0.005',
      description: '',
      selsct: false,
      amount: '',
      payment: false,
      maskShow: false,
    };
  },
  watch: {
    coin() {

    },
  },
  computed: {
    ...mapGetters('user', ['kycStatus', 'authLevel', 'username']),
    ...mapGetters('coin/wallet', ['wallets']),
  },
  methods: {
    ...mapActions('user', ['getUserSummary']),
    ...mapActions('coin/wallet', ['getWalletInfo', 'getWithdrawal']),
    // 判断是否显示弹窗
    async dialog() {
      if (this.kycStatus === 'CERTIFY_FAILED') {
        this.showDialog = true;
        this.dialogText = {};
        this.dialogText = {
          content: '您的身份消息认证失败请重新认证',
          button: '重新认证',
          path: '/mine/safety/kyc',
        };
      } else if (this.kycStatus === 'AUDITING') {
        this.showDialog = true;
        this.dialogText = {
          content: '您的身份认证申请已提交，审核结果将在3个工作日内公布',
          button: '知道了',
          path: '/mine',
        };
      } else if (this.kycStatus === 'UN_CERTIFIED') {
        this.showDialog = true;
        this.dialogText = {
          content: '为保证您在平台交易的资金安全请先完成身份认证',
          button: '身份认证',
          path: '/mine/safety/kyc',
        };
      } else if (this.kycStatus === 'CERTIFIED') {
        await this.getWalletInfo();
        this.option = this.wallets.map(item => ({ name: item.currency_type }));
        this.changeInfo(this.wallets[0]);
      }
    },
    onSkip() {
      this.$router.push(this.dialogText.path);
    },
    setPayment() {
      this.$router.push('/mine/safety/password/payment/set');
    },
    // 交易密码
    async getPaymentPassword(password) {
      try {
        await this.getWithdrawal({
          address: this.address,
          paymentPassword: password,
          currency: this.currency,
          amount: this.coin,
        });
        this.$router.push({ name: 'Mine', params: { toast: '提币成功' } });
      } catch (error) {
        Toast(responseStatus[error.status]);
      }
    },
    cancelPayment() {
      this.payment = false;
    },
    skip() {
      this.$router.push('/extract-coin-record');
    },
    showSelect() {
      this.selsct = true;
    },
    onClose() {
      this.maskShow = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    onSelect(select) {
      const selected = this.wallets.find(item => item.currency_type === select.name);
      this.changeInfo(selected);
    },
    changeInfo(option) {
      this.coin = '';
      this.currency = option.currency_type;
      this.description = option.description;
      this.amount = option.amount;
      this.fees = option.fees;
      this.fees = option.fees;
      this.min = option.min;
      this.selsct = false;
    },
    onAll() {
      this.coin = this.amount;
    },
    onSubmit() {
      if (this.address === '') {
        Toast('提币地址不能为空');
      } else if (this.coin < this.min) {
        Toast('提现额度不足');
      } else if (this.coin > this.amount) {
        Toast('余额不足');
      } else if (this.authLevel === 2) { // 已设置交易密码
        this.maskShow = true;
      } else {
        this.payment = true; // 未设置交易密码
      }
    },
  },
  async mounted() {
    try {
      await this.getUserSummary();
      // kyc验证弹窗
      this.dialog(this.kycStatus);
    } catch (error) {
      throw error;
    }
  },
};
</script>

<style lang="scss">
.extract-coin {
  height: 100%;
  background: #f8f8f8;
  .record-wrap {
    display: flex;
    padding-bottom: 10px;
    .record {
      width: 18px;
      height: 22px;
      margin-top: 10px;
    }
  }
  .extract-coin-con {
    .line {
      background: #ffffff;
      padding-left: 10px;
      .van-cell--required::before {
        left: 13px;
      }
      .van-field__body {
        align-items: stretch;
      }
      .van-cell .bgain__field-override span {
        font-size: 14px;
        color: #001426;
        line-height: 20px;
      }
      .icon-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        .icon {
          width: 11px;
          height: 7px;
        }
      }
      .input {
        height: 20px;
        border: 0;
        margin-bottom: 10px;
        &::placeholder {
          font-size: 14px;
          color: #a8aeb9;
        }
      }
      .input-text {
        font-size: 12px;
        color: #0f3256;
      }
      .all {
        font-size: 13px;
        color: #3c64ee;
        margin-top: -30px;
      }
    }
    .button {
      width: 331px;
      margin: 60px 22px 0;
    }
    .coin-info {
      padding: 40px 0 0 22px;
      .title {
        font-size: 14px;
        color: #676c8d;
        margin-bottom: 7px;
      }
      .ol {
        font-size: 12px;
        color: #a8aeb9;
        line-height: 26px;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
