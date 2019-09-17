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
        <span v-show="orderInfoById.pay_type==='ebank'">{{orderInfoById.pay_data}}</span>
        <div class="qrcode_click"
             v-show="orderInfoById.pay_type!=='ebank'"
             @click="()=>{this.showCodePop = true}">
          <svg-icon icon-class="qr_click" class="qrcode-copy"></svg-icon>
        </div>
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
      <div class="img-container">
        <div class="back-img">
          <span>{{qRCodeTitle}}收款二维码</span>
          <div ref="qrcode" class="qrcode-img"></div>
          <button @click="downloadImage">保存图片</button>
        </div>
        <div class="y-line"></div>
        <div @click="closeCodePop" class="close-img">
          <svg-icon icon-class="close_qrd" alt="." class="close-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QRCode from 'qrcodejs2';
import { Toast } from 'vant';
import Vue from 'vue';

Vue.use(Toast);
export default {
  name: 'PayContent',
  data() {
    return {
      showCodePop: true, // 是都显示弹窗
      qRCode: {}, // 二维码
      qRCodeTitle: '',
    };
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
            this.qRCodeTitle = '微信';
            this.showCodePop = true;
            break;
          case 'alipay':
            currentTitle = [
              '收款二维码', '支付宝账号', '',
            ];
            this.qRCodeTitle = '支付宝';
            this.showCodePop = true;
            break;
          default:
            break;
        }
      }
      return currentTitle;
    },
  },
  mounted() {
    // 判断支付宝和微信 显示二维码
    this.qRCode = new QRCode(this.$refs.qrcode, {
      id: 'qRImage',
      text: this.orderInfoById.pay_data, // 二维码code
      width: 111,
      height: 111,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  },

  methods: {
    /* 关闭弹窗 */
    closeCodePop() {
      this.showCodePop = false;
    },

    // 点击保存图片//imgurl 图片地址
    downloadImage(imgUrl, name) {
      console.log(document.getElementsByTagName('img'));
      const a = document.createElement('a');
      // 将a的download属性设置为我们想要下载的图片名称
      a.download = name || 'pic';
      // 将生成的URL设置为a.href属性
      a.href = document.getElementsByTagName('img')[1].src;
      // 触发a的单击事件
      a.click();
      Toast('保存成功');
      a.remove();
    },
  },
};
</script>

<style lang="scss" scoped>
  /*二维码弹窗*/
  .showPop{
    display: block!important;
  }
  /*二维码图片*/
  .qrcode-img{
    width: 111px;
    height: 111px;
  }
  // 可点击二维码
  .qrcode_click{
    width:15px;
    height: 15px;
    .qrcode-copy{
      width:15px;
      height: 15px;
      vertical-align:0;
    }
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
      position: fixed;
      display: none;
      top: 0;
      left: 0;
      height: 0;
      .background{
        width: 100vw;
        height: 100vh;
        opacity: 0.6;
        background: #000000;
        z-index: 99;
      }
      .img-container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        padding-top:130px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .back-img{
        width: 320px;
        height: 291px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        box-shadow: 0 7px 24px 0 rgba(83,83,83,0.10);
        border-radius: 4px;
        >span{
          font-size: 13px;
          line-height: 18px;
          color: #0F3256;
          margin-top: 30px;
        }
        .qrcode-img{
          margin-top:22px;
        }
        >button{
          margin-top: 30px;
          width: 110px;
          height: 34px;
          font-size: 13px;
          color: #FFFFFF;
          background: #3C64EE;
          border: none;
          border-radius: 4px;
        }
      }
      .y-line{
        height: 50px;
        width: 2px;
        background: #FFFFFF;
      }
      .close-img{
        width: 32px;
        height: 32px;
        left: 155.5px;
        top: 414px;
      }
    }
  }
</style>
