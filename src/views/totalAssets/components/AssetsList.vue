<template>
<div class="assetsList">
  <div class="x-line" v-show="showSkipToNext"></div>
  <ul>
    <li class="assetsList-item"
        v-for="(item,index) in showData"
        :key="index"
        @click="skipToDetail"
    >
      <div>
        <van-image :src="item.icon_url" class="currency-icon"/>
        <span>{{item.currency}}</span>
      </div>
      <div>
        <span>{{item.total_asset||item.amount}}</span>
        <svg-icon icon-class="next" class="icon-next" v-show="showSkipToNext"/>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import { Image } from 'vant';

export default {
  name: 'AssetsList',
  props: [
    'showData',
    'showSkipToNext',
  ],
  components: {
    'van-image': Image,
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
};
</script>

<style lang="scss" scoped>
.assetsList{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .x-line{
    height: 10px;
    background: #F8F8F8;
  }
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
      .icon-next{
        width: 7px;
        height: 11px;
        margin-left: 14px;
      }
    }
  }
}
</style>
