<template>
  <div class="purchaseCoinHome">
    <header class="header">
      <div class="header-back" @click="back">
        <svg-icon icon-class="back-fixed" class="header-img"/>
      </div>
      <div class="header-tabs">
        <span v-for="(item,index) in headerTabsData" :key="index"
              :class="{activeHeaderTab:activeHeaderTab === index}"
              @click="changeHeaderTab(index)"
        >{{item}}</span>
      </div>
      <div class="header-action">
        <div @click="toTips"  v-show="activeHeaderTab === 1">
          <svg-icon
            icon-class="purchaseCoinIllustration" class="purchase-img"/>
        </div>
        <div @click="toRecords">
          <p :class="{activeRedCircle:false}" @hasRecord="(params)=>{this.activeRedCircle = params}"></p>
          <svg-icon
            icon-class="purchaseCoinRecord" class="purchase-img"/>
        </div>
      </div>
    </header>
    <CoinPurchase v-if="activeHeaderTab===0"/>
    <CoinRecharge @activeHeaderTabFromChild="(params)=>{this.activeHeaderTab = params}" v-else/>
  </div>
</template>

<script>
import CoinPurchase from './components/CoinPurchase.vue';
import CoinRecharge from './components/CoinRecharge.vue';
import {Toast} from 'vant';
import Vue from 'vue';

Vue.use(Toast);
export default {
  name: 'purchaseCoinHome',

  components: {
    CoinPurchase,
    CoinRecharge,
  },

  data() {
    return {
      activeHeaderTab: 0, // 默认冲币 0
      headerTabsData: ['充币', '买币'],
    };
  },

  methods: {
    changeHeaderTab(index) {
      this.activeHeaderTab = index;
    },
    // 跳转到提示
    toTips() {
      this.$router.push({
        name: 'BuyingIllustration',
      });
    },
    // 跳转到历史记录
    toRecords() {
      if (this.activeHeaderTab === 0) { // 冲币历史记录
        this.$router.push({
          name: 'FillingRecord',
        });
      } else if (this.activeHeaderTab === 1) { // 买币记录
        this.$router.push({
          name: 'BuyingRecord',
        });
      }
    },
    // 回退到上一页
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' });
        return false;
      }
      this.$router.go(-1);
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.purchaseCoinHome{
  .activeHeaderTab{
    color: #FFFFFF;
    border-bottom:2px #FFFFFF solid;
  }
  .activeContentTab{
    color: #FFFFFF;
  }
  // 历史记录有小红点
  .activeRedCircle{
    background: red;
  }
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  /*头部*/
  .header{
    height: 46px;
    display: flex;
    background: #3C64EE;
    .header-back{
      height: 46px;
      width: 44px;
      padding-left: 16px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .header-img{
        width: 9.5px;
        height: 18px;
      }
    }
    .header-tabs{
      height: 46px;
      margin-left: 20px;
      display: flex;
      justify-content: space-around;
      flex: 1;
      >span{
        display: inline-block;
        width: 60px;
        height: 22px;
        font-size: 16px;
        color: #FFFFFF;
        padding: 13px 0 9px 0;
        text-align: center;
      }
    }
    .header-action{
      width: 80px;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      >div{
        display: flex;
        align-items: flex-start;
        margin-top: 12px;
        margin-right: 18px;
      }
      // 小红点实现
      >div:nth-child(2){
        position: relative;
        >p{
          position: absolute;
          top:-2px;
          right: -2px;
          border-radius:10px;
          margin:0;
          width: 12px;
          height: 12px;
        }
      }
      .purchase-img{
        display: inline-block;
        width: 22px;
        height: 22px;
      }
    }

  }
}
</style>
