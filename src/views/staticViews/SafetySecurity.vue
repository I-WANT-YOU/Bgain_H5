<template>
  <div class="wrap">
    <Collapse v-model="active" accordion>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem
          title="资金安全"
          name="1"
        >用户资金与平台资金进行隔离管理，在投资金与用户余额隔离管理，不占用用户流动性，确保支付与资金结算安全。冷热钱包+权限隔离+热密码部署+专线网络隔离等多重安全机制保证资产存储和流转安全。</CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem title="账户安全" name="2">交易所级IT架构与先进加密技术保护用户的账户安全；数据访问和存储隔离，采用先进加密技术，确保用户数据完整可靠。</CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem title="投资安全" name="3">
          第一重保障：底层资产为FinBee与优选的全球数字货币量化基金合作发行的主动管理类金融产品,主要风控及信用增强措施为FinBee对发行的金融产品进行主动管理,
          针对各类风险制定了应对措施,并对金融产品的运营承担主动管理责任。第二重保障：合作量化投资资产为经严格审核筛选的一揽子资产，均为Bgain利用自有资金预合作半年以上进行优选，在发行产品前进行深入的调查并制定完善的风控措施。
        </CollapseItem>
      </div>
      <div class="item">
        <span class="icon"></span>
        <CollapseItem title="投资安全" name="4">
        收集的客户信息仅限于了解客户和开展业务的用途；设有严格的安全系统以防止未经授权的任何人包括本公司职员获取客户信息。对客户提供的信息严格保密，除下列情形外，不会向任何外部人士披露；经过客户事先同意儿披露；应法律法规及监管要求而披露。
        </CollapseItem>
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
  .van-collapse-item__content {
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
