<template>
  <div class="fillingDetail">
    <BgainNavBar title = "记录详情"/>
    <div class="detail-tips">
      <img :src="walletRecordDeatil.logo" alt="."/>
      <span>+{{walletRecordDeatil.txn_amount}}</span>
      <span>{{statu}}</span>
    </div>
    <div class="detail-info-one">
      <div class="one-item" v-for="(item,index) in infoOne" :key="index">
        <span>{{item.title}}</span>
        <div>
          <div :class="{active: index === 0}">{{item.content}}</div>
          <span v-show="index === 0" @click="copyText(item.content)">
            <svg-icon icon-class="copy_light" class="copyStyle"/>
          </span>
        </div>

      </div>
    </div>
    <div class="detail-info-one detail-info-two">
      <div class="one-item two-item" v-for="(item,index) in infoTwo" :key="index">
        <span>{{item.title}}</span>
        <span>{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { formatDate, copyText } from '@utils/tools';
import BgainNavBar from '../../components/BgainNavBar.vue';

const { mapActions, mapState } = createNamespacedHelpers('coin/wallet');

export default {
  name: 'FillingDetail',
  components: { BgainNavBar },
  data() {
    // txn_type: "DEPOSIT"
    return {
      infoOne: [],
      infoTwo: [],
      statu: '',
    };
  },
  methods: {
    ...mapActions(['getWalletRecordDetail']),
    copyText(text) {
      return copyText(text);
    },
  },
  computed: {
    ...mapState(['walletRecordDeatil']),
  },
  async mounted() {
    try {
      await this.getWalletRecordDetail(this.$route.params.id);
      this.infoOne = [{
        title: 'TXID',
        content: this.walletRecordDeatil.txn_id ? this.walletRecordDeatil.txn_id : '--',
      },
      {
        title: '充币地址',
        content: this.walletRecordDeatil.dest_address ? this.walletRecordDeatil.dest_address : '--',
      },
      {
        title: '转出地址',
        content: this.walletRecordDeatil.src_address ? this.walletRecordDeatil.src_address : '--',
      }];
      this.infoTwo = [{
        title: '手续费',
        content: `${this.walletRecordDeatil.txn_fee} ${this.walletRecordDeatil.coin}`,
      },
      {
        title: '交易时间',
        content: formatDate(this.walletRecordDeatil.txn_date),
      }];

      this.statu = '交易成功';
      // if (this.walletRecordDeatil.status === 'UNAUDITED') {
      //   this.statu = '待审核';
      // } else if (this.walletRecordDeatil.status === 'REJECT') {
      //   this.statu = '已拒绝';
      // } else if (this.walletRecordDeatil.status === 'SUCCEED') {
      //   this.statu = '交易成功';
      // } else if (this.walletRecordDeatil.status === 'FAILED') {
      //   this.statu = '交易失败';
      // } else if (this.walletRecordDeatil.status === 'PROCESSING') {
      //   this.statu = '处理中';
      // }
    } catch (error) {
      throw error;
    }
  },
};
</script>

<style lang="scss" scoped>
  .copyStyle{
    width: 20px;
    height: 20px;
    margin-left: 4px;
  }
.fillingDetail{
  font-family: PingFangSC-Medium sans-serif;
  letter-spacing: 0;
  .detail-tips{
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    >img{
      width:44px;
      height: 44px;
    }
    >span:nth-child(2){
      height: 25px;
      margin-top: 10px;
      font-size: 18px;
      color: #001426;
      line-height: 25px;

    }
    >span:nth-child(3){
      height: 21px;
      margin-top: 6px;
      font-size: 15px;
      color: #6A707D;
      line-height: 21px;

    }
  }
  .detail-info-one{
    padding:38px 0px 20px 0px;
    margin: 0 13px;
    border-bottom: 0.51px solid #EEEEEE ;
    .one-item{
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      >span{
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        color: #6A707D;
      }
      >div{
        display: flex;
        font-size: 13px;
        color: #0F3256;
        >div{
          width: 263px;
          word-wrap: break-word;
          text-align: right;
        }
        .active{
          width: 238px;
        }
      }

    }
  }
  .detail-info-two{
    padding-top: 19px;
    border: none;
    .two-item{
      >span:nth-child(2){
        font-size: 13px;
        color: #0F3256;
      }
    }
  }
}
</style>
