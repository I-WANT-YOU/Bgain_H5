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
    <!--支付宝微信二维码弹窗-->
    <div class="hadCodePop" :class="{showPop:showCodePop}">
      <div class="background"></div>
      <div class="back-img">
        <div ref="qrcode" class="qrcode-img"></div>
        <div @click="closeCodePop">
          <svg-icon icon-class="close_x" alt="."/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QRCode from 'qrcodejs2';

export default {
  name: 'PayContent',
  data(){
    return{
      showCodePop: false, // 是都显示弹窗
      qRCode: {}, // 二维码
    }
  },
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
            this.showCodePop = false;
            break;
          case 'weixin':
            currentTitle = [
              '收款二维码', '微信账号', '',
            ];
            this.showCodePop = true;
            break;
          case 'alipay':
            currentTitle = [
              '收款二维码', '支付宝账号', '',
            ];
            this.showCodePop = true;
            break;
          default:
            break;
        }
      }
      return currentTitle;
    },
  },
  mounted(){
    // 判断支付宝和微信 显示二维码
    this.qRCode = new QRCode(this.$refs.qrcode, {
      text: '', // 二维码code
      width: 111,
      height: 111,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    })
  },

  methods:{
    /*关闭弹窗*/
    closeCodePop(){
      this.showCodePop = false;
    }
  },
};
</script>

<style lang="scss" scoped>
  /*二维码弹窗*/
  .showPop{
    display: block;
  }
  /*二维码图片*/
  .qrcode-img{
    width: 111px;
    height: 111px;
  }
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
    // 弹窗
    .hadCodePop{
      position: absolute;
      display: none;
      top: 0;
      .background{
        width: 100vw;
        height: 100vh;
        display: flex;
        opacity: 0.6;
        background: #000000;
        z-index: 99;
      }
      .back-img{
        position: absolute;
        left: 22.5px;
        top: 150px;
        width: 320px;
        height: 291px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
</style>
