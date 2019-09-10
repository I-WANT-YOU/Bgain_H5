<template>
  <div class="purchase-content">
    <!--tabs-->
    <div class="tabs-container">
      <div class="content-tabs">
          <span v-for="(item,index) in currencyType" :key="index"
                :class="{activeContentTab:activeContentTab === index}"
                @click = "changeContentTab(index)"
          >
            {{item}}
          </span>
      </div>
    </div>
    <!--冲币地址-->
    <div class="purchaseAddress">
      <div>
        <div>
          <span>充币地址</span>
        </div>
        <div v-show="activeContentTab !== 3">
          <!--suppress HtmlFormInputWithoutLabel -->
          <textarea readonly ref="myCopy" v-model="address[activeContentTab]">
          </textarea>
        </div>
        <div v-show="activeContentTab !== 3">
          <button @click="copyText(address[activeContentTab])">点击复制</button>
        </div>

        <div v-show="activeContentTab === 3">
          <div class="address">
            <div>{{address[activeContentTab]
              && address[activeContentTab].split('|')[0] || 'abc'}}</div>
            <div @click="copyText(address[activeContentTab]
            && address[activeContentTab].split('|')[0] || 'abc')">点击复制</div>
          </div>
          <div class="address-title">
            <span>Memo</span>
          </div>
          <div class="address">
            <div>{{address[activeContentTab]
              && address[activeContentTab].split('|')[1] || 'abc'}}</div>
            <div @click="copyText(address[activeContentTab]
            && address[activeContentTab].split('|')[1] || 'abc')">点击复制</div>
          </div>
        </div>
      </div>
      <div class="x-line"></div>
      <div class="QRCode">
        <div ref="qrcode" class="qrcode-img"></div>
      </div>
    </div>
    <div class="coinExplain">
      <div>
        <span>充币说明</span>
      </div>
      <div>
        <p v-for="(item,index) in description[activeContentTab]" :key="index">
          {{item}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { Toast } from 'vant';
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import QRCode from 'qrcodejs2';
import { copyText } from '@utils/tools';
import errorMessage from '../../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'CoinPurchase',
  components: {
  },
  data() {
    return {
      activeContentTab: 0,
      activeExchangeTab: 0,
      headerTabsData: ['充币', '买币'],
      exchangeTabsData: ['按兑换金额', '按兑换数量'],
      qrcode: {},
    };
  },
  mounted() {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...',
    });
    this.getPurchaseCoinAddress().then(
      () => {
        this.$toast.clear();
        this.qrcode = new QRCode(this.$refs.qrcode, {
          text: this.address[this.activeContentTab],
          width: 111,
          height: 111,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H,
        });
      },
      (err) => {
        if (err.status) {
          this.$toast(errorMessage[err.status]);
        } else {
          this.$toast('网络错误');
        }
      },
    );
  },
  methods: {
    ...mapActions('coin/purchaseCoin', [
      'getPurchaseCoinAddress',
    ]),
    copyText(text) {
      window._czc.push(['_trackEvent', 'click', '买币充币-点击复制']);
      return copyText(text);
    },
    changeContentTab(index) {
      this.activeContentTab = index;
      this.qrcode.makeCode(this.address[index]);
    },
  },
  beforeDestroy() {
    this.$toast.clear();
  },
  computed: {
    ...mapState('coin/purchaseCoin', [
      'purchaseCoinInfo',
    ]),
    ...mapGetters('coin/purchaseCoin', [
      'currencyType',
      'description',
      'address',
    ]),
  },
};

</script>

<style lang="scss" scoped>
  .activeContentTab{
    color: #FFFFFF;
  }
  .purchase-content{
    position: relative;
    /*tab*/
    .tabs-container{
      height: 148px;
      background: #3C64EE;
      .content-tabs{
        height: 63px;
        overflow: scroll;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #A6B9FD;
        >span{
          width: 25%;
          height: 30px;
          line-height: 30px;
          flex-shrink: 0;
          display: inline-block;
          text-align: center;
        }
      }
    }
    /*兑换*/
    .purchaseAddress{
      position: absolute;
      width: 359px;
      height:369px;
      top:63px;
      left: 8px;
      right: 8px;
      background: url("../../../assets/images/pruchase/bg-purchase.png") no-repeat;
      background-size: 359px 369px;
      >div:nth-child(1){
        height: 189px;
        >div:nth-child(1){
          padding:20px 0 0 20px;
          font-size: 15px;
          color: #676C8D;
          >span{
            height: 21px;
          }
        }
        >div:nth-child(2){
          display: flex;
          justify-content: center;
          margin-top: 19px;
          padding:0 20px;
          >textarea {
            width: 273px;
            padding: 7px 11px;
            margin: 0;
            line-height: 20px;
            font-size: 14px;
            color: #3C64EE;
            overflow: hidden;
            background: #EDF0FA;
            border: none;
            resize: none;
          }
        }
        >div:nth-child(3){
          display: flex;
          justify-content: center;
          margin-top: 15px;
          >button{
            width: 70px;
            height:26px;
            padding:0;
            background: #3C64EE;
            border-radius: 4px;;
            border:none;
            font-size: 12px;
            color: #FFFFFF;
          }
        }
      }

      .address-title{
        padding-left:20px;
        font-size: 15px;
        color: #676C8D;
      }

      .address{
        display: flex;
        align-items: center;
        >div:nth-child(1){
          width: 200px;
          padding: 7px 11px;
          margin: 10px 10px 10px 30px;
          line-height: 20px;
          font-size: 14px;
          color: #3C64EE;
          overflow: hidden;
          background: #EDF0FA;
        }
        >div:nth-child(2){
          width: 70px;
          height:30px;
          line-height:30px;
          text-align: center;
          padding:0;
          background: #3C64EE;
          border-radius: 4px;;
          border:none;
          font-size: 12px;
          color: #FFFFFF;
        }
      }

      .x-line{
        height: 0;
        width: 314px;
        border-bottom: 1px #3C64EE dashed;
        margin: 0 auto;
      }

      /*二维码*/
      .QRCode{
        display: flex;
        justify-content: center;
        margin-top: 23.5px;
        .qrcode-img{
          width: 111px;
          height: 111px;
        }
      }
    }
    /*冲币说明*/
    .coinExplain{
      margin-top: 258px;
      padding:28px 16px 0 20px;
      >div:nth-child(1){
        font-size: 14px;
        color: #676C8D;
        >span{
          display: inline-block;
          height: 20px;
          line-height: 20px;
        }
      }
      >div:nth-child(2){
        margin-top: 7px;
        font-size: 12px;
        color: #A8AEB9;
        >p{
          margin: 0;
          padding: 0;
          line-height: 22.5px;
        }
      }
    }
  }
</style>
