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
            <div  @click="copyText('sellerName')">
              <svg-icon icon-class="copy_light" class="copy-style"/>
            </div>
          </div>
        </div>
        <div>
          <span>订单号</span>
          <div>
            <span ref="orderNum" >{{orderInfoById.otc_order_id}}</span>
            <div  @click="copyText('orderNum')">
              <svg-icon icon-class="copy_light" class="copy-style"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--提示信息和按钮-->
    <div class="footer">
      <span>99%的用户会在15分钟内收到资产</span>
      <button>申诉（30:00）</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ToBeReleaseContent',
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
    ]),
  },
  methods:{
    copyText(name){
      let input = document.createElement('input');
      input.setAttribute('id', 'copyInput');
      if(name === 'sellerName'){
        input.setAttribute('value', this.orderInfoById.pay_name);
        document.getElementsByTagName('body')[0].appendChild(input);
        document.getElementById('copyInput').select();
        document.execCommand('copy')
        this.$toast('复制成功');
      } else if ( name === 'orderNum'){
        input.setAttribute('value', this.orderInfoById.otc_order_id);
        document.getElementsByTagName('body')[0].appendChild(input);
        document.getElementById('copyInput').select();
        document.execCommand('copy')
        this.$toast('复制成功');
      }
      document.getElementById('copyInput').remove();
    }
  },
};
</script>

<style lang="scss" scoped>
  .copy-style{
    width: 15px;
    height: 15px;
    margin:10px 0 13px 5px;
  }
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
      margin:10px 21px 0 21px;
      padding-bottom: 29px;
      >div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        >span{
          height: 38px;
          line-height: 38px;
          font-size: 13px;
          color: #6A707D;
        }
        >div{
          display: flex;
          align-items: center;
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
  .footer{
    position: fixed;
    bottom: 65px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    >span{
      width: 100%;
      height: 30px;
      padding-left: 22px;
      line-height: 30px;
      font-size: 12px;
      color: #6A707D;
      background: #FAF4DC;
    }
    >button{
      width: 331px;
      height: 46px;
      margin-top: 10px;
      background: #D2D8EB;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      border: none;
      text-align: center;
    }
  }
</style>
