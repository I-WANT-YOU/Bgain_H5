<template>
  <div class="unLoginHome">
    <header>
      这是头部
    </header>
    <HomeSwipe/>
    <div class="home-tip-container">
      <HomeTip/>
    </div>
    <div class="button-container">
      <router-link to="/register">
        <button>注册</button>
      </router-link>
    </div>
    <div class="toLogin">
      <router-link to="/login">已有账号？登录</router-link>
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
import HomeProductList from '../../components/home/HomeProductList.vue';
import HomeMoreProducts from '../../components/home/HomeMoreProducts.vue';

export default {
  name: 'UnLoginHome',
  components: {
    HomeSwipe,
    HomeTip,
    HomeProductList,
    HomeMoreProducts,
  },
};
</script>

<style lang="scss" scoped>
.unLoginHome{
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
  .button-container{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 43px;
    margin-top:26px;
    button{
      width: 325px;
      background: #3C64EE;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 37.36px;
      border: none;
    }
  }
  .toLogin{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 38px;
    margin-top:16px;
    >a{
      width: 105px;
      font-size: 15px;
      color: #3C64EE;
      line-height: 37.36px;
      text-decoration-line: none;
    }

  }
  .list-container{
    width: 100%;
    margin-top:25px;
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
