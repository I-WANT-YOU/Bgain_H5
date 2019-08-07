<template>
<div class="buyingRecord">
  <BgainNavBar title = "买币记录"/>
  <div class="record-history">
    <div class="history-item" v-for="(item,index) in historyInfo" :key="index">
      <div class="history-header">
        <div>
          <span>{{item.type}}</span>
          <span>{{item.time}}</span>
        </div>
        <span>{{item.status}}</span>
      </div>
      <div class="history-content">
        <div>
          <span>{{item.num}}</span>
          <span>数量</span>
        </div>
        <div>
          <span>{{item.amount}}</span>
          <span>交易总额（cny）</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

export default {
  name: 'BuyingRecord',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      historyInfo: [
        {
          type: 'USDT',
          time: '2018-03-21 11:30',
          status: '请付款',
          num: '13.736263654',
          amount: '100',
        },
        {
          type: 'USDT',
          time: '2018-03-21 11:30',
          status: '待放行',
          num: '13.736263654',
          amount: '100',
        },
        {
          type: 'USDT',
          time: '2018-03-21 11:30',
          status: '请付款',
          num: '13.736263654',
          amount: '100',
        },
        {
          type: 'USDT',
          time: '2018-03-21 11:30',
          status: '请付款',
          num: '13.736263654',
          amount: '100',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.buyingRecord{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .record-history{
    margin-top: 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history-item{
      width: 335px;
      height: 125px;
      margin-top:15px;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      border-radius: 6px;
      .history-header{
        margin-top: 15px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        span{
          height: 21px;
          line-height: 21px;
        }
        >div{
          display: flex;
          >span:nth-child(1){
            font-size: 15px;
            color: #0F3256;
          }
          >span:nth-child(2){
            margin-left: 10px;
            font-size: 12px;
            color: #A8AEB9
          }
        }
        >span:nth-child(2){
          font-size: 15px;
          color: #FF5C5C;
        }
      }
      .history-content{
        padding: 0 30px 16px 30px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        >div{
          display: flex;
          flex-direction: column;
        }
        >div{
          >span{
            display: block;
          }
          >span:nth-child(1){

            line-height: 28px;
            font-size: 20px;
            color: #0F3256;
          }
          >span:nth-child(2){
            height: 17px;
            margin-top: 8px;
            line-height: 17px;
            text-align: center;
            font-size: 12px;
            color: #A8AEB9;
          }
        }
        >div:nth-child(2){
          >span:nth-child(1){
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
