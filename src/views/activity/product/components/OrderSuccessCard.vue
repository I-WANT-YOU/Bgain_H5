<template>
  <div class="order-result__container">
    <svg-icon icon-class="success" class="icon-success"/>
    <div class="order-result__title">订单已完成</div>
    <div class="order-result__field">
      <div class="field--label">兑换订单号</div>
      <div class="field--value">{{dataSource.order_num}}</div>
    </div>
    <div class="order-result__field">
      <div class="field--label">订单状态</div>
      <div class="field--value">{{status}}</div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';

const ORDER_STATUS = {
  HAD_DISTRIBUTED: '已发放',
  WAIT_SEND: '未发货',
  HAD_SEND: '已发货',
};

export default {
  name: 'OrderSuccessCard',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    status() {
      return ORDER_STATUS[get(this.dataSource, 'integral_product_order_status', 'WAIT_SEND')];
    },
  },
};
</script>

<style lang="scss" scoped>
  .order-result__container {
    margin-top: 10px;
    padding: 20px 20px 18px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-success {
      width: 117px;
      height: 111px;
    }

    .order-result__title {
      margin: 20px 0 38px;
      font-size: 20px;
      color: #333333;
      text-align: center;
      line-height: 21px;
    }

    .order-result__field {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .field--label {
        font-size: 13px;
        color: #666666;
        line-height: 18px;
      }
      .field--value {
        font-size: 13px;
        color: #333333;
        line-height: 18px;
      }
    }
  }
</style>
