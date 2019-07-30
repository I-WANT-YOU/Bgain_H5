<template>
  <div class="registerHome">
    <header>
      这是头部
    </header>
    <HomeSwipe/>
    <div class="home-tip-container">
      <HomeTip/>
    </div>
    <div class="notice-container">
      <HomeNotice/>
    </div>
    <div class="guide-container">
      <HomeGuide/>
    </div>
    <div class="list-container">
      <HomeProductList/>
    </div>
    <div class="more-products-container">
      <HomeMoreProducts/>
    </div>
  </div>
</template>

<script>
import HomeSwipe from '../../components/home/HomeSwipe.vue';
import HomeTip from '../../components/home/HomeTip.vue';
import HomeGuide from '../../components/home/HomeGuide.vue';
import HomeProductList from '../../components/home/HomeProductList.vue';
import HomeMoreProducts from '../../components/home/HomeMoreProducts.vue';
import HomeNotice from '../../components/home/HomeNotice.vue';

export default {
  name: 'RegisterHome',
  components: {
    HomeSwipe,
    HomeTip,
    HomeProductList,
    HomeMoreProducts,
    HomeGuide,
    HomeNotice,
  },
};
</script>

<style lang="scss" scoped>
  .registerHome{
    font-family: PingFangSC-Semibold;
    letter-spacing: 0;
    text-align: center;
    /*头部*/
    >header{
      width: 100%;
      height: 49px;
      line-height: 49px;
      background-color: rebeccapurple;
      text-align: center;
    }
    .home-tip-container{
      margin-top: 17px;
      display: flex;
      justify-content: center;
    }
    .notice-container{
      margin-top: 35px;
    }
    .guide-container{
      margin-top:18px;
    }
    .list-container{
      margin-top: 20px;
      width: 100%
    }
    .more-products-container{
      display: flex;
      height: 20px;
      margin-top: 21px;
      justify-content: center;
      align-items: center;
    }
  }
</style>
