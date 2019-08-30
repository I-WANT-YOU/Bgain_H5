<template>
<div class="tradeList">
  <p class="trade-title">交易记录</p>
  <ul>
    <div class="noRecord" v-show="showData.length === 0">
      <svg-icon icon-class="noRecord-assets" class="icon-noRecord"/>
      <span>暂无交易记录</span>
      <span
        v-show="currencyType === 'FBP'"
        @click="()=>{this.$router.push({name:'PurchaseCoinHome'})}"
      >立即充币</span>
    </div>
    <li class="tradeList-item"
        v-for="(item,index) in formatTradeList"
        :key="index"
        @click="skipToDetail"
    >
      <div>
        <span>{{item.transaction_type}}</span>
        <div>
          <span>{{item.state}}</span>
          <span>{{item.amount}}</span>
        </div>

      </div>
      <div>
        <span>{{item.showDate}}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import publicMethods from '@utils/publicMethods';

export default {
  name: 'RecordList',
  props: [
    'showData',
    'currencyType',
  ],
  components: {
  },
  methods: {
    skipToDetail() {
      try {
        if (this.showSkipToNext) { // 跳转到详情页面
          this.$router.push({
            path: '/currencyDetails',
            query: { currency: this.showData[0].currency },
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    formatTradeList() {
      return this.showData.map((item) => {
        switch (item.transaction_type) {
          case 'DEPOSIT':
            item.transaction_type = '充币';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'WITHDRAWAL':
            item.transaction_type = '提币';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'BUY':
            item.transaction_type = '认购';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'INVITATION':
            item.transaction_type = '注册奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'SELL':
            item.transaction_type = '投资回款';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'COMMISSION':
            item.transaction_type = '佣金奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'EXPERIENCE_PROFIT':
            item.transaction_type = '体验金收益';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'EXPERIENCE_PROFIT_RESET':
            item.transaction_type = '体验金收益清零';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'TRANSFER':
            item.transaction_type = '转出';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'RECEIVE':
            item.transaction_type = '转入';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'INTEREST':
            item.transaction_type = '利息收益';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_BONUS_REG':
            item.transaction_type = '注册奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_BONUS_KYC':
            item.transaction_type = '身份认证';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_BONUS_INIT_DEPOSIT':
            item.transaction_type = '首充';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_BONUS_INIT_BUY':
            item.transaction_type = '首投';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_BONUS_BUY':
            item.transaction_type = '认购';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'CURRENT_BUY':
            item.transaction_type = '天天赚转入';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'CURRENT_SELL':
            item.transaction_type = '天天赚转出';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_PRIZEPOOL_BUY':
            item.transaction_type = '活动消耗';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'PRIZEPOOL_PROFIT':
            item.transaction_type = '活动奖金';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FUND_BUY':
            item.transaction_type = '认购基金';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'FUND_SELL':
            item.transaction_type = '赎回基金';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_FUNDING_HOLDING':
            item.transaction_type = '基金奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FUND_BUY_CANCEL':
            item.transaction_type = '认购撤单';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'ACTIVITY_BONUS_REG':
            item.transaction_type = '注册奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'ACTIVITY_BONUS_KYC':
            item.transaction_type = '身份认证奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'ACTIVITY_BONUS_FIRST_DEPOSIT':
            item.transaction_type = '首充奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'ACTIVITY_BONUS_BUY':
            item.transaction_type = '投资奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'ACTIVITY_INVITED_BUY':
            item.transaction_type = '活动奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'OTC_BUY':
            item.transaction_type = '买币';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          case 'FBP_SUBSCRIBE':
            item.transaction_type = '积分消耗';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '-';
            break;
          case 'ACTIVITY_REWARD_GGL':
            item.transaction_type = '活动奖励';
            item.showDate = publicMethods.createOrderDate(item.create_at);
            item.state = '+';
            break;
          default:
            break;
        }
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tradeList{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .trade-title{
    margin: 16px 0 0 0 ;
    padding: 0 0 14px 20px;
    line-height: 21px;
    font-family: PingFangSC-Medium sans-serif;
    font-size: 15px;
    color: #0F3256;
    border-bottom: 0.51px solid #EEEEEE;
  }
  .noRecord{
    display: flex;
    padding-top: 75px;
    flex-direction: column;
    align-items: center;
    .icon-noRecord{
      width: 102px;
      height: 78px;
    }
    >span:nth-child(2){
      margin-top: 12px;
      font-size: 14px;
      color: #A8AEB9;
    }
    >span:nth-child(3){
      padding:6px 16px;
      margin-top: 22px;
      font-size: 13px;
      color: #3C64EE;
      border: 0.51px solid #3C64EE;
      border-radius: 2px;
    }
  }
  .tradeList-item{
    height: 49px;
    padding:10px 19px 0 21px;
    display: flex;
    flex-direction: column;
    border-bottom: 0.51px solid  #EEEEEE;
    >div:nth-child(1){
      display: flex;
     justify-content: space-between;
      span{
        font-size: 15px;
        color: #0F3256;
        line-height: 21px;
      }
    }
    >div:nth-child(2){
      height: 100%;
      display: flex;
      >span{
        font-size: 12px;
        color: #A8AEB9;
        line-height: 17px;
      }
    }
  }
}
</style>
