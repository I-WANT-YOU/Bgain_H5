<template>
  <div>
    <header class="header">
      <div @click="()=>{this.$router.go(-1)}">
        <svg-icon icon-class="back" class="back-iocn"/>
      </div>
      <div><span>一分钟昂你读懂Bgain量化基金</span></div>
    </header>
    <van-image class="image-banner" :src="abcFund"/>
  </div>
</template>

<script>
import { Image } from 'vant';
import abcFund from '../../assets/images/staticViews/ABC.png';

export default {
  name: 'AbcFund',
  data() {
    return {
      abcFund,
    };
  },
  components: {
    'van-image': Image,
  },
};
</script>

<style lang="scss" scoped>
  .header{
    height: 44px;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular sans-serif;
    font-size: 18px;
    color: #0F3256;
    letter-spacing: 0;
    text-align: center;
    >div:nth-child(1){
      padding-left: 20px;
      padding-right: 10px;
    }
    >div:nth-child(2){
      padding-right: 39.5px;
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
    }
    .back-iocn{
      width: 9.5px;
      height: 18px;
    }
  }
  .image-banner{
  width: 100%;
  }
</style>
