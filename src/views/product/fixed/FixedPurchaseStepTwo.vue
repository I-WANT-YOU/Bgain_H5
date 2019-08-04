<template>
  <div class="fixedStepTwo">
    <BgainNavBar :title="title"/>
    <div class="content">
      <div class="purchaseNum">
        <span>认购数量</span>
        <span>0.0005 BTC</span>
      </div>
      <div class="coupon">
        <span>选择优惠券</span>
        <div>
          <span>可用 5 张</span>
          <svg-icon icon-class="next" class="next-img"/>
        </div>
      </div>
      <div class="expectedReturn">
        <div v-for="(item,index) in expectedReturnData" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.num}}</span>
        </div>
      </div>
  </div>
    <div class="turnToAnther">
      <div>
        <span>到期转入活期产品</span>
        <svg-icon icon-class="fixed_icon"/>
      </div>
      <div><van-switch v-model="checked" size = '27px'/></div>
    </div>
    <div class="purchaseButton">
      <button>立即认购</button>
    </div>
  </div>
</template>

<script>
import { Switch } from 'vant';
import BgainNavBar from '../../../components/BgainNavBar.vue';


export default {
  name: 'FixedPurchaseStepTwo',
  data() {
    return {
      title: 'zhehsi title',
      checked: true,
      expectedReturnData:
        [
          {
            name: '预期收益',
            num: '346.999',
          },
          {
            name: '预期加息收益',
            num: '346.999',
          },
          {
            name: '预期总收益',
            num: '346.999',
          },
          {
            name: '预计收款日',
            num: '346.999',
          },
        ],
    };
  },
  components: {
    BgainNavBar,
    'van-switch': Switch,
  },
};
</script>

<style lang="scss" scoped>
.fixedStepTwo{
  width: 100vw;
  height: 100vh;
  background: #F8F8F8;
  .content{
    font-family: PingFangSC-Regular sans-serif;
    letter-spacing: 0;
    text-align: center;
    background: #FFFFFF;
    /*认购数量*/
    .purchaseNum{
      height: 52px;
      padding:0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      color: #0F3256;
      border-bottom: 0.51px solid #E5E9F6;
    }
    /*优惠券*/
    .coupon{
      height: 52px;
      padding:0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.51px solid #E5E9F6;
      .next-img{
        width: 7px;
        height: 11px;
      }
      >span{
        font-size: 15px;
        color: #0F3256;
      }
      >div{
        font-size: 12px;
        color: #878F9E;
        display: flex;
        align-items: center;
        >span{
          margin-right: 9px;
        }
      }
    }
    /*预期回报*/
    .expectedReturn{
      padding: 10px 21px 10px 21px;
      >div{
        display: flex;
        justify-content: space-between;
        >span{
          height: 33px;
          line-height: 33px;
          font-size: 13px;
          color: #9AA2B2;
        }
      }
    }
  }
  .turnToAnther{
    height: 50px;
    margin-top: 11px;
    padding: 0 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    >div{
      >span{
        height: 21px;
        font-size: 15px;
        color: #0F3256;
      }
    }
    >div:nth-child(2){
      width:48px;
      height: 28px;
    }
  }
  .purchaseButton{
    display: flex;
    justify-content: center;
    margin-top: 70px;
    >button{
      width: 331px;
      height: 46px;
      background: #3C64EE;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      border: none;
    }
  }
}
</style>
