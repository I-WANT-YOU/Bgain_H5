<template>
  <div class="fillingDetail">
    <BgainNavBar title = "记录详情"/>
    <div class="detail-tips">
      <img src="../../assets/images/BTC.svg" alt="."/>
      <span>{{detailInfo.amount}}</span>
      <span>{{detailInfo.status}}</span>
    </div>
    <div class="detail-info-one">
      <div class="one-item" v-for="(item,index) in detailInfo.infoOne" :key="index">
        <span>{{item.title}}</span>
        <div>
          <textarea
            :cols="index===0?33:35"
            readonly
            v-model="item.content"></textarea>
          <svg-icon icon-class="copy_light" class="copyStyle" v-show="index === 0"/>
        </div>

      </div>
    </div>
    <div class="detail-info-one detail-info-two">
      <div class="one-item two-item" v-for="(item,index) in detailInfo.infoTwo" :key="index">
        <span>{{item.title}}</span>
        <span>{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

export default {
  name: 'FillingDetail',
  components: { BgainNavBar },
  data() {
    return {
      detailInfo: {
        type: 'BTC',
        amount: '2.8474638',
        status: '交易成功',
        infoOne: [
          {
            title: 'TXID',
            content: '4e83rhfjisodghiodfhmgiofdjhiodfnmhioruhjiorhmtogmnhg',
          },
          {
            title: '充币地址',
            content: '4e83rhfjisodghiodfhmgiofdjhiodfnmghioruhjiorhmtogmnhg',
          },
          {
            title: '转出地址',
            content: '4e83rhfjisodghiodfhmgiofdjhiodfnmghioruhjiorhmtogmnhg',
          },
        ],
        infoTwo: [
          {
            title: '手续费',
            content: '0.000073278 ETH',
          },
          {
            title: '交易时间',
            content: '2019-07-30 23:23:23',
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
  .copyStyle{
    width: 15px;
    height: 15px;
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
    margin: 0 20px;
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
        textarea{
          font-size: 13px;
          color: #0F3256;
          padding: 1px;
          resize:none;
          border: none;
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
