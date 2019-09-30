<template>
  <div class="payContent">
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
          <span>{{orderInfoById.quantity+' '+orderInfoById.dest_currency_type}}</span>
        </div>
      </div>
    <div class="paymentInfo">
      <!--收款人-->
      <div class="hasCopy">
        <span>收款人</span>
        <div>
          <span ref="sellerName">{{orderInfoById.pay_name}}</span>
          <div  @click="copyTextFunc(orderInfoById.pay_name)" class="copy-icon-container">
            <svg-icon icon-class="copy_light" class="copy-style"/>
          </div>
        </div>
      </div>
      <!--收款二维码或者其他-->
      <div>
        <span>{{formateTitle[0]}}</span>
        <span v-show="orderInfoById.pay_type==='ebank'">{{orderInfoById.pay_data}}</span>
        <div class="qrcode_click"
             v-show="orderInfoById.pay_type!=='ebank'"
             @click="()=>{this.showCodePop = true}">
          <svg-icon icon-class="qr_click" class="qrcode-copy"></svg-icon>
        </div>
      </div>
      <!--支付账号-->
      <div class="hasCopy">
        <span>{{formateTitle[1]}}</span>
        <div>
          <span ref="sellerName">{{orderInfoById.pay_id}}</span>
          <div  @click="copyTextFunc(orderInfoById.pay_id)" class="copy-icon-container">
            <svg-icon icon-class="copy_light" class="copy-style"/>
          </div>
        </div>
      </div>
      <!--当支付方式为银行卡时候的提示-->
      <div v-show="orderInfoById.pay_type==='ebank'">
        <span>{{formateTitle[2]}}</span>
        <span style = "font-size: 12px;color: #A8AEB9;">切勿备注BTC、Bgain等敏感字样，防冻结</span>
      </div>
      <!--订单号-->
      <div class="hasCopy">
        <span>订单号</span>
        <div>
          <span ref="sellerName">{{orderInfoById.otc_order_id}}</span>
          <div  @click="copyTextFunc(orderInfoById.otc_order_id)" class="copy-icon-container">
            <svg-icon icon-class="copy_light" class="copy-style"/>
          </div>
        </div>
      </div>
    </div>
    <!--支付宝微信二维码弹窗-->
    <div class="hadCodePop" :class="{showPop:showCodePop}">
      <div class="background"></div>
      <div class="img-container">
        <div class="back-img">
          <span>{{qRCodeTitle}}收款二维码</span>
          <div ref="qrcode" class="qrcode-img"></div>
          <button @click="downloadImage">{{iosButton?'长按图片保存':'保存图片'}}</button>
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
import { copyText, checkPhoneType } from '../../../utils/tools';

Vue.use(Toast);
export default {
  name: 'PayContent',
  data() {
    return {
      showCodePop: false, // 是都显示弹窗
      qRCode: {}, // 二维码
      qRCodeTitle: '',
      iosButton: false, // ios时候显示 长按保存按钮
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
            this.showCodePop = false;
            break;
          case 'alipay':
            currentTitle = [
              '收款二维码', '支付宝账号', '',
            ];
            this.qRCodeTitle = '支付宝';
            this.showCodePop = false;
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
    // 判断机型
    const phoneType = checkPhoneType();
    if (phoneType === 'IOS') {
      this.iosButton = true;
    }
  },

  methods: {
    /* 关闭弹窗 */
    closeCodePop() {
      this.showCodePop = false;
    },

    /* 点击保存图片//imgurl 图片地址 */
    downloadImage(imgUrl, name) {
      if (checkPhoneType() === 'IOS') {
        return false;
      }
      const a = document.createElement('a');
      // 将a的download属性设置为我们想要下载的图片名称
      a.download = name || 'pic';
      // 将生成的URL设置为a.href属性
      a.href = document.getElementsByTagName('img')[1].src;
      // 触发a的单击事件
      a.click();
      Toast('保存成功');
      a.remove();
      return true;
    },
    /* 点击保存 */
    copyTextFunc(text) {
      copyText(text);
    },
  },
};
</script>

<style lang="scss" scoped>
  /*二维码弹窗*/
  .showPop{
    display: block!important;
  }
  // 可点击二维码
  .qrcode_click{
    width:18px;
    height: 18px;
    .qrcode-copy{
      width:17px;
      height: 17px;
    }
  }
  .payContent{
    .paymentInfo{
      margin:11px 21px 0 21px;
      padding-bottom: 10px;
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
            margin:0 0 3px 7px;
            display: flex;
            align-items: center;
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
