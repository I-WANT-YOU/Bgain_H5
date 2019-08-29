<template>
  <div class="extract-coin-record-detail">
    <BgainNavBar title="记录详情" />
    <div class="con">
      <div class="icon-info">
        <img class="icon" :src="walletRecordDeatil.logo" alt />
        <div class="amount">-{{numberWithThousands(walletRecordDeatil.txn_amount)}}</div>
        <div class="status">{{statu}}</div>
      </div>
      <div class="line">
        <span>TXID</span>
        <div>
          {{walletRecordDeatil.txn_id ? walletRecordDeatil.txn_id : '--'}}
          <span
            @click="copyText(walletRecordDeatil.txn_id)"
            v-if="walletRecordDeatil.txn_id"
          >
            <svg-icon icon-class="copy_light" />
          </span>
        </div>
      </div>
      <div class="line">
        <span>提币地址</span>
        <div>{{walletRecordDeatil.src_address ? walletRecordDeatil.src_address : '--'}}</div>
      </div>
      <div class="line">
        <span>转出地址</span>
        <div>{{walletRecordDeatil.dest_address ? walletRecordDeatil.dest_address : '--'}}</div>
      </div>
      <div class="trade">
        <div class="line">
          <span>交易时间</span>
          <div>{{formatDate(walletRecordDeatil.txn_date)}}</div>
        </div>
        <div class="line">
          <span>手续费</span>
          <div v-if="!walletRecordDeatil.txn_fee && walletRecordDeatil.txn_fee * 1 !== 0">--</div>
          <div v-else>{{walletRecordDeatil.txn_fee}}{{walletRecordDeatil.coin}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate, numberWithThousands, copyText } from '@utils/tools';
import responseStatus from '@/constants/responseStatus';

export default {
  name: 'ExtractCoinRecordDetail',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      statu: '',
    };
  },
  async mounted() {
    try {
      await this.getWalletRecordDetail(this.$route.params.id);
      if (this.walletRecordDeatil.status === 'UNAUDITED') {
        this.statu = '待审核';
      } else if (this.walletRecordDeatil.status === 'REJECT') {
        this.statu = '已拒绝';
      } else if (this.walletRecordDeatil.status === 'SUCCEED') {
        this.statu = '提币成功';
      } else if (this.walletRecordDeatil.status === 'FAILED') {
        this.statu = '提币失败';
      } else if (this.walletRecordDeatil.status === 'PROCESSING') {
        this.statu = '处理中';
      }
    } catch (error) {
      Toast(responseStatus[error.status]);
    }
  },
  computed: {
    ...mapState('coin/wallet', ['walletRecordDeatil']),
  },
  methods: {
    ...mapActions('coin/wallet', ['getWalletRecordDetail']),
    formatDate(num) {
      return formatDate(num, 'YYYY-MM-DD hh:mm:ss');
    },
    numberWithThousands(num) {
      return numberWithThousands(num);
    },
    copyText(text) {
      return copyText(text);
    },
  },
};
</script>

<style lang="scss" scoped>
.extract-coin-record-detail {
  .con {
    padding: 0 20px;
    .icon-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 15px;
      color: #6a707d;
      margin: 16px 0 38px;
      .icon {
        width: 44px;
        height: 44px;
        margin-bottom: 10px;
      }
      .amount {
        font-size: 18px;
        color: #001426;
        letter-spacing: 0;
        line-height: 25px;
        margin-bottom: 6px;
      }
    }
    .line {
      display: flex;
      font-size: 13px;
      color: #6a707d;
      justify-content: space-between;
      margin-bottom: 16px;
      height: 36px;
      > span {
        width: 100px;
      }
      > div {
        width: 235px;
        font-size: 13px;
        color: #0f3256;
        text-align: right;
        word-break: break-all;
      }
    }
    .trade {
      border-top: 1px solid #eeeeee;
      margin-top: 4px;
      padding-top: 15px;
      .line {
        align-items: center;
        margin: 0;
      }
    }
  }
}
</style>
