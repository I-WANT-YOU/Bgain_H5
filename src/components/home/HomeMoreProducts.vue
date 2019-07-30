<template>
  <div class="more-products">
    <span>更多产品</span><img alt="." src="../../assets/images/blue_next.svg"/>
  </div>
</template>

<script>
export default {
  name: 'HomeMoreProducts',
};
</script>

<style lang="scss" scoped>
  .more-products{
    font-family: PingFangSC-Regular;
    letter-spacing: 0;
    >span{
      font-size: 14px;
      color: #3C64EE;
      text-align: center;
    }
    >img{
      width: 6px;
      height: 10px;
      margin-left:6px ;
    }
  }
</style>
