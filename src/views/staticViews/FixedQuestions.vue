<template>
  <div class="wrap">
    <Collapse v-model="active" accordion>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem
          title="预期收益如何计算？"
          name="1"
        >预期收益= 认购数量*预期年化利率*封闭期/365；若使用了优惠券，则使用优惠券后的额外收益也会计算在内。</CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem title="产品到期后本息归还到哪里？" name="2">产品预期收款日，投资款及收益将发放至用户账户余额中，回款完成后即可提现。</CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem title="中途能否提前退出？" name="3">分币宝为固定收益类产品，封闭期内中途不支持提前退出。</CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem title="中途能否转让？" name="4">分币宝为固定收益类产品，封闭期内中途不支持转让。</CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem
          title="购买后至起息日之间所投资的数字货币去哪了？"
          name="5"
        >购买后用户投资金额对应的数字货币将实时从用户可用余额中转入至产品募集账户，待产品募集结束后转移至分币交易所账户由精选的量化投资团队进行委托管理。</CollapseItem>
      </div>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';

export default {
  name: 'RiskStatement',
  components: {
    Collapse,
    CollapseItem,
  },
  data() {
    return {
      active: '',
    };
  },
};
</script>

<style lang="scss">
.wrap {
  height: 100%;
  background: #f8f8f8;
  .van-cell {
    padding: 10px 20px 10px 30px;
  }
  .van-collapse-item__content {
    background: #f8f8f8;
  }
  .van-collapse-item__content{
    padding: 16px 26px 16px 20px;
  }
  .item {
    position: relative;
    font-size: 14px;
    color: #0f3256;
    .icon {
      position: absolute;
      width: 9px;
      height: 9px;
      left: 10px;
      top: 17px;
      border-radius: 50%;
      background: #3c64ee;
      z-index: 1000;
    }
  }
}
</style>
