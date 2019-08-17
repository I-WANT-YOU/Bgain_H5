<template>
<div class="assetsList">
  <ul>
    <li class="assetsList-item" v-for="item in [1,3,4,5]">
      <div>
        <van-image :src="item.url" class="currency-icon"/>
        <span>BTC</span>
      </div>
      <div>
        <span>10000.33</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import { Image } from 'vant';

export default {
  name: 'AssetsList',
  components: {
    'van-image': Image,
  },
};
</script>

<style lang="scss" scoped>
.assetsList{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .assetsList-item{
    height: 49px;
    padding:0 19px 0 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.51px solid  #EEEEEE;
    >div:nth-child(1){
      display: flex;
      align-items: center;
      .currency-icon{
        width: 25px;
        height: 25px;
      }
      >span{
        margin-left: 18px;
        font-size: 14px;
        color: #0F3256;
        line-height: 26px;
      }
    }
    >div:nth-child(2){
      display: flex;
      align-items: center;
      >span{
        font-size: 14px;
        color: #0F3256;
        line-height: 26px;
      }
    }
  }
}
</style>
