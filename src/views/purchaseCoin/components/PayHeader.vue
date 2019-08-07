<template>
<div class="payHeader">
  <div class="header">
    <svg-icon icon-class="back-fixed" class="icon-img"/>
  </div>
  <div class="pay-title">
    <div class="title-info">
      <div class="info-img">
        <img src="../../../assets/images/BTC.svg" alt="."/>
      </div>
      <div class="info-text">
        <span>请付款</span>
        <span>请在15:00内付款给卖家</span>
      </div>
    </div>
    <div class="x-line">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PayHeader',
};
</script>

<style lang="scss" scoped>
.payHeader{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  background: #3C64EE;
  .header{
    height: 44px;
    display: flex;
    align-items: center;
    .icon-img{
      width: 9.5px;
      height: 18px;
      padding:10px 30px 10px 16px
    }
  }
  .pay-title{
    height: 129px;
    .title-info{
      display: flex;
      justify-content: space-between;
      padding:9px 26px 0 26px;
      .info-img{
        width: 54px;
        height: 54px;
      }
      .info-text{
        >span{
          display: block;
          text-align: right;
          color: #FFFFFF;
        }
        >span:nth-child(1){
          height: 37px;
          line-height: 37px;
          font-size: 26px;
        }
        >span:nth-child(2){
          height: 20px;
          margin-top: 3px;
          line-height: 20px;
          font-size: 14px;
        }
      }
    }
    .x-line{
      width: 353px;
      height: 12px;
      margin: 25px 11px 0px 11px;
      background: #2247C9;
      border-radius: 6px;
    }
  }
}
</style>
