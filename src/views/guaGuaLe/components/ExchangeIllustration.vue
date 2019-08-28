<template>
  <div class="illustration">
    <div class="pop">
      <p class="title">兑换说明</p>
      <div class="content">
        <p class="subTitle">截止日期</p>
        <p class="info info-one">2019.8.30 23:59:59失效，请及时兑换</p>
        <p class="subTitle">兑换方法</p>
        <p class="info inf-top">
          1. 卡券兑换方法：输入兑换券码即可兑换
          相应数额的USDT，兑换后可至账户中
          查看；
        </p>
        <p class="info">
          2. 每个奖品兑换券码仅可兑换一次，多次
          兑换无效；
        </p>
        <p class="info">
          3. 如在兑换中有任何疑问可联系客服
          （微信号：Bgainkefu）；
        </p>
      </div>
    </div>
    <div class="close">
      <img src="../../../assets/images/guaGuaLe/close_x.png"
           @click="()=>{this.$emit('close','true')}"
           alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeIllustration',
};
</script>

<style lang="scss" scoped>
  .illustration{
    padding-top: 55px;
    background: rgba(1,1,1,0.8);
    font-family:PingFang SC sans-serif;
    .pop{
      width: 271px;
      height: 479px;
      margin: auto;
      padding: 0 37px;
      display: flex;
      flex-direction: column;
      background: url("../../../assets/images/guaGuaLe/pop_detail.png") no-repeat;
      background-size:345px 479px;
      p{
        margin: 0;
      }
      .title{
        height:22px;
        margin: 45px auto 0;
        font-size:24px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:11px;
      }
      .content{
        padding-top: 80px;
        .subTitle{
          font-size:13px;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:27px;
          text-align: center;
          width:77px;
          height:27px;
          background:linear-gradient(90deg,rgba(61,174,251,1) 0%,rgba(124,206,200,1) 100%);
          border-radius:13px;
        }
        .info{
          font-size:14px;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:23px;
        }
        .info-one{
          padding: 10px 0;
        }
        .inf-top{
          padding-top: 10px;
        }
      }
    }
    .close{
      text-align: center;
      >img{
        width: 33px;
        height: 33px;
      }
    }
  }
</style>
