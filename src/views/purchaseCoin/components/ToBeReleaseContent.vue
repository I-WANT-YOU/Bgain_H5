<template>
  <div>
    <div class="payContent">
      <!--支付信息-->
      <div class="paymentInfo">
        <div>
          <span>实付金额</span>
          <span>{{'¥'+orderInfoById.amount}}</span>
        </div>
        <div>
          <span>单价约</span>
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
          <span>
            {{orderInfoById.quantity}}
            {{this.orderInfoById.dest_currency_type?this.orderInfoById.dest_currency_type.toUpperCase():''}}
          </span>
        </div>
      </div>
      <!--卖家信息-->
      <div class="userInfo">
        <div>
          <span>卖家实名</span>
          <div>
            <span ref="sellerName">{{orderInfoById.pay_name}}</span>
            <div  @click="copyTextFunc(orderInfoById.pay_name)" class="copy-icon-container">
              <svg-icon icon-class="copy_light" class="copy-style"/>
            </div>
          </div>
        </div>
        <div>
          <span>订单号</span>
          <div>
            <span ref="orderNum" >{{orderInfoById.otc_order_id}}</span>
            <div @click="copyTextFunc(orderInfoById.otc_order_id)" class="copy-icon-container">
              <svg-icon icon-class="copy_light" class="copy-style"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { copyText } from '../../../utils/tools';

export default {
  name: 'ToBeReleaseContent',
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
    ]),
  },
  methods: {
    /* 点击保存 */
    copyTextFunc(text) {
      copyText(text);
    },
  },
};
</script>

<style lang="scss" scoped>
  .payContent{
    font-family: PingFangSC-Regular sans-serif;
    letter-spacing: 0;
    .paymentInfo{
      margin:11px 21px 0 21px;
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
    .userInfo{
      margin:11px 21px 0px 21px;
      padding-bottom: 29px;
      border-bottom: 0.51px solid #EEEEEE;
      >div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        >span{
          height: 38px;
          line-height: 38px;
          font-size: 13px;
          color: #6A707D;
        }
        >div{
          display: flex;
          align-items: center;
          .copy-icon-container{
            height: 16px;
            width:16px;
            padding:0 0 3px 7px;
            display: flex;
            align-items: start;
            .copy-style{
              width: 15px;
              height: 15px;
            }
          }
          >span{
            height: 38px;
            line-height: 38px;
            font-size: 13px;
            color: #0F3256;
          }
        }
      }
    }
  }
</style>
