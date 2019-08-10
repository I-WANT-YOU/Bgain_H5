<template>
  <div class="payContent">
    <div class="paymentInfo">
        <div>
          <span>实付金额</span>
          <span>{{'¥'+orderInfoById.amount}}</span>
        </div>
        <div>
          <span>单约价</span>
          <span>
            {{this.orderInfoById.price}}
            {{this.orderInfoById.src_currency_type?
            this.orderInfoById.src_currency_type.toUpperCase():''}}
            /{{this.orderInfoById.dest_currency_type?
            this.orderInfoById.dest_currency_type.toUpperCase():''}}
          </span>
        </div>
        <div>
          <span>数量</span>
          <span>{{orderInfoById.quantity}}</span>
        </div>
      </div>
    <div class="paymentInfo userInfo">
      <div>
        <span>收款人</span>
        <span>{{orderInfoById.pay_name}}</span>
      </div>
      <div>
        <span>{{formateTitle[0]}}</span>
        <span>{{orderInfoById.pay_data}}</span>
      </div>
      <div>
        <span>{{formateTitle[1]}}</span>
        <span>{{orderInfoById.pay_id}}</span>
      </div>
      <div v-show="orderInfoById.pay_type==='ebank'">
        <span>{{formateTitle[2]}}</span>
        <span style = "font-size: 12px;color: #A8AEB9;">切勿备注BTC、Bgain等敏感字样，防冻结</span>
      </div>
      <div>
        <span>订单号</span>
        <span>{{orderInfoById.otc_order_id}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PayContent',
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
    ]),
    // 根据不同的付款方式 生成不同的title
    formateTitle() {
      let currentTitle = [];
      if (this.orderInfoById) {
        switch (this.orderInfoById.pay_type) {
          case 'ebank':
            currentTitle = [
              '银行卡号', '开户行', '开户支行',
            ];
            break;
          case 'weixin':
            currentTitle = [
              '收款二维码', '微信账号', '',
            ];
            break;
          case 'alipay':
            currentTitle = [
              '收款二维码', '支付宝账号', '',
            ];
            break;
          default:
            break;
        }
      }
      return currentTitle;
    },
  },
};
</script>

<style lang="scss" scoped>
  .payContent{
    .paymentInfo{
      margin:11px 21px 0px 21px;
      padding-bottom: 10px;
      border-bottom: 0.51px solid #EEEEEE;
      >div{
        display: flex;
        justify-content: space-between;
        >span{
          height: 38px;
          line-height: 38px;
          font-size: 13px;
        }
        >span:nth-child(1){
          color: #6A707D;
        }
        >span:nth-child(2){
          color: #0F3256;
        }
      }
    }
    .userInfo{}
  }
</style>
