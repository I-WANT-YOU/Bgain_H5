<template>
  <div class="home-tip">
    <img src="../../assets/images/home_tip.svg" alt="."/>
    <span>Bgain品牌全新升级，2.0上线等你来</span>
    <img src="../../assets/images/home_next.svg" alt="."/>
  </div>
</template>

<script>
export default {
  name: 'HomeTip',
};
</script>

<style lang="scss" scoped>
  .home-tip{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    width: 340px;
    height: 30px;
    font-family: PingFangSC-Regular;
    letter-spacing: 0;
    text-align: center;
    >img{
      width: 20px;
      height: 20px;
    }
    >img:nth-child(1){
      margin-left: 15px;
    }
    /*>img:nth-child(2){*/
      /*margin-left: 40px;*/
    /*}*/
    >span{
      font-size: 14px;
      color: #2A55E7;
      margin-left: 12px;
      margin-right: 40px;
    }
  }
</style>
