<template>
  <div class="purchaseCoinHome">
    <header class="header">
      <div class="header-back">
        <svg-icon icon-class="back-fixed" class="header-img"/>
      </div>
      <div class="header-tabs">
        <span v-for="(item,index) in headerTabsData" :key="index"
              :class="{activeHeaderTab:activeHeaderTab === index}"
              @click="changeHeaderTab(index)"
        >{{item}}</span>
      </div>
      <div class="header-action">
        <svg-icon icon-class="purchaseCoinIllustration" class="purchase-img"/>
        <svg-icon icon-class="purchaseCoinRecord" class="purchase-img img-margin"/>
      </div>
    </header>
    <CoinPurchase v-show="activeHeaderTab===0"/>
    <CoinRecharge v-show="activeHeaderTab===1"/>
  </div>

</template>

<script>
import CoinPurchase from './components/CoinPurchase.vue';
import CoinRecharge from './components/CoinRecharge.vue';

export default {
  name: 'purchaseCoinHome',
  components: {
    CoinPurchase,
    CoinRecharge,
  },
  data() {
    return {
      activeHeaderTab: 1,
      headerTabsData: ['充币', '买币'],
    };
  },
  methods: {
    changeHeaderTab(index) {
      this.activeHeaderTab = index;
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
      .purchase-img{
        display: inline-block;
        margin-top: 12px;
        width: 22px;
        height: 22px;
      }
      .img-margin{
        margin-left: 18px;
      }
    }

  }
}
</style>
