<template>
    <div class="fillingRecord">
      <BgainNavBar title = "冲币记录"/>
      <div class="filling-history">
        <div class="history-item"
             v-for="(item,index) in fillingRecordList"
             :key="index"
             @click="toDetail"
        >
          <div>
            <span>{{item.type}}</span>
            <span>{{item.time}}</span>
          </div>
          <div>
            <span>{{item.amount}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

export default {
  name: 'FillingRecord',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      fillingRecordList: [
        {
          type: 'BTC',
          time: '2018-03-21',
          amount: '+76.990',
        },
        {
          type: 'BTC',
          time: '2018-03-21',
          amount: '+76.990',
        },
        {
          type: 'BTC',
          time: '2018-03-21',
          amount: '+76.990',
        },
        {
          type: 'BTC',
          time: '2018-03-21',
          amount: '+76.990',
        },
      ],
    };
  },
  methods: {
    // 进入详情页面
    toDetail() {
      this.$router.push({
        name: 'FillingDetail',
        params: {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .fillingRecord{
    font-family: PingFangSC-Regular sans-serif;
    letter-spacing: 0;
    .filling-history{
      .history-item{
        padding: 11px 20px 10px 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.51px solid  #EEEEEE;
        border-top: 0.51px solid  #EEEEEE;
        >div:nth-child(1){
          display: flex;
          flex-direction: column;
          >span:nth-child(1){
            height: 21px;
            line-height: 21px;
            font-size: 15px;
            color: #0F3256;
          }
          >span:nth-child(2){
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            color: #A8AEB9;
          }
        }
        >div:nth-child(2){
          display: flex;
          align-items: flex-start;
          >span{
            height: 21px;
            line-height: 21px;
            font-size: 15px;
            color: #0F3256;
          }
        }
      }
    }
  }

</style>
