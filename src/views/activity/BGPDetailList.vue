<template>
  <div class="detailList">
    <nav-bar title="BGP明细" />
    <div class="detail-list">
      <div class="detail-item" v-for="(item,index) in detailList.operation_logs" :key="index">
        <div>
          <span>{{changeTr(item.transaction_type)}}</span>
          <span>{{item.fbp_type === 'INCREASE'?'+':'-'}}{{item.amount}}</span>
        </div>
        <div>
          {{createOrderDate(item.create_at)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import { formatDate } from '@utils/tools';
import BgainNavBar from '@/components/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'BGPDetailList',
  components: {
    NavBar: BgainNavBar,
  },
  computed: {
    ...mapState('activity', [
      'detailList',
    ]),
  },
  methods: {
    ...mapActions('activity', [
      'getBGPDetailList',
    ]),
    // 时间格式化
    createOrderDate(date) {
      return formatDate(date);
    },
    changeTr(type) {
      switch (type) {
        case 'DEPOSIT':
          type = '充币';
          break;
        case 'WITHDRAWAL':
          type = '提币';
          break;
        case 'BUY':
          type = '认购';
          break;
        case 'INVITATION':
          type = '注册奖励';
          break;
        case 'SELL':
          type = '投资回款';
          break;
        case 'COMMISSION':
          type = '佣金奖励';
          break;
        case 'EXPERIENCE_PROFIT':
          type = '体验金收益';
          break;
        case 'EXPERIENCE_PROFIT_RESET':
          type = '体验金收益清零';
          break;
        case 'TRANSFER':
          type = '转出';
          break;
        case 'RECEIVE':
          type = '转入';
          break;
        case 'INTEREST':
          type = '利息收益';
          break;
        case 'FBP_BONUS_REG':
          type = '注册奖励';
          break;
        case 'FBP_BONUS_KYC':
          type = '身份认证';
          break;
        case 'FBP_BONUS_INIT_DEPOSIT':
          type = '首充';
          break;
        case 'FBP_BONUS_INIT_BUY':
          type = '首投';
          break;
        case 'FBP_BONUS_BUY':
          type = '认购';
          break;
        case 'CURRENT_BUY':
          type = '天天赚转入';
          break;
        case 'CURRENT_SELL':
          type = '天天赚转出';
          break;
        case 'FBP_PRIZEPOOL_BUY':
          type = '活动消耗';
          break;
        case 'PRIZEPOOL_PROFIT':
          type = '活动奖金';
          break;
        case 'FUND_BUY':
          type = '认购基金';
          break;
        case 'FUND_SELL':
          type = '赎回基金';
          break;
        case 'FBP_FUNDING_HOLDING':
          type = '基金奖励';
          break;
        case 'FUND_BUY_CANCEL':
          type = '认购撤单';
          break;
        case 'ACTIVITY_BONUS_REG':
          type = '注册奖励';
          break;
        case 'ACTIVITY_BONUS_KYC':
          type = '身份认证奖励';
          break;
        case 'ACTIVITY_BONUS_FIRST_DEPOSIT':
          type = '首充奖励';
          break;
        case 'ACTIVITY_BONUS_BUY':
          type = '投资奖励';
          break;
        case 'ACTIVITY_INVITED_BUY':
          type = '活动奖励';
          break;
        case 'OTC_BUY':
          type = '买币';
          break;
        case 'FBP_SUBSCRIBE':
          type = '积分消耗';
          break;
        case 'FBP_MEMBERSHIP_SIGN':
          type = '签到';
          break;
        case 'FBP_CONVERT':
          type = '积分兑换';
          break;
        case 'FBP_BONUS_INVITED_REGISTER':
          type = '邀友奖励';
          break;
        default:
          break;
      }
      return type;
    },
  },
  mounted() {
    Toast.loading({
      message: '加载中...',
    });
    this.getBGPDetailList().then(
      () => {
        Toast.clear();
      },
      (err) => {
        this.$toast.clear();
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
        }
      },
    );
  },
  beforeDestroy() {
    Toast.clear();
  },
};
</script>

<style lang="scss" scoped>
.detailList{
  font-family: PingFangSC-Regular sans-serif;
  .detail-item{
    height: 60px;
    padding:0 20px;
    border-bottom: 0.51px solid #EEEEEE;
  >div:nth-child(1){
    display: flex;
    justify-content: space-between;
    margin-top: 11px;
    >span{
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }
  }
    >div:nth-child(2){
      font-size: 12px;
      color: #999999;
      line-height: 17px;
    }
  }
}
</style>
