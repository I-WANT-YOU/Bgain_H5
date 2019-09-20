<template>
    <div class="buyingIllustration">
      <BgainNavBar title = "买币说明"/>
      <div class="buyingIllustration-content">
        <p v-for="(item,index) in buyingIllustration" :key="index">{{item}}</p>
      </div>
    </div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

export default {
  name: 'BuyingIllustration',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      buyingIllustration: [
        '1. 请勿备注类似Bgain，BTC、USDT，等数字货币和交易平台的信息；',
        '2. 禁止使用微信、支付宝、他人代付、ATM及柜台转账等第三放转账；',
        '3. 请务必使用本人名下的银行卡通过手机银行或网银进行汇款，否则会遭到商家的退款；',
        '4. 未付款前请勿标记付款，恶意付款系统将会冻结您的账户；',
        '5. 如有任何疑问请联系客服CS@bgain.com；',
        '6. 24小时内订单仍未处理，您可以联系Bgain官方客服CS@bgain.com',
      ],
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.path === '/purchaseCoinHome') {
      to.meta.keepAlive = true;
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.buyingIllustration{
  .buyingIllustration-content{
    padding:16px 18px 0 18px;
    p{
      margin: 0;
      padding: 0;
      font-family: PingFangSC-Regular sans-serif;
      font-size: 13px;
      color: #6A707D;
      line-height: 26px;
    }
  }
}
</style>
