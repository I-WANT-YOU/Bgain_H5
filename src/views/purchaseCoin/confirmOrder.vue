<template>
<div class="confirmOrder">
  <BgainNavBar title = "确认订单"/>
  <div class="paymentMethods">
    <div class="paymentMethods-title"><span>请选择支付方式</span></div>
    <div class="paymentMethods-content">
      <div v-for="(item,key,index) in paymentType"
           :class="{activeSelected:selectedIndex === index}"
           :key="index"
           @click="toggleSelect(index,key)">
        <div>
          <svg-icon icon-class="selected_order" class="check-icon"
                    v-show="selectedIndex === index"/>
        </div>
        <div>
          <svg-icon :icon-class=key class="paymentType-icon" />
        </div>
        <div>
          <span>{{toCN(key)}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="paymentInfo">
      <div>
        <span>单价约：</span>
        <span>{{orderInfoById.price+' '
          +orderInfoById.src_currency_type+'/'+orderInfoById.dest_currency_type}}</span>
      </div>
    <div>
      <span>数量：</span>
      <span>{{orderInfoById.quantity+ ' '+ orderInfoById.dest_currency_type}}</span>
    </div>
    <div>
      <span>实付金额：</span>
      <span>{{orderInfoById.amount+' '+orderInfoById.src_currency_type}}</span>
    </div>
  </div>
  <div class="pushOrder">
    <button :class="{activeButton:activatedButton}" @click="orderSubmit">提交订单</button>
  </div>
</div>
</template>

<script>
import { Toast } from 'vant';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import BgainNavBar from '../../components/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'confirmOrder',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      selectedIndex: -1,
      paymentMethods: ['支付宝', '微信', '银行开支付'],
      orderInfo: [],
      paymentType: [],
      selectedPayType: '',
      activatedButton: false, // 按钮是否激活
      initExchangeInfo: [
        {
          title: '单约价',
          content: '--',
        },
        {
          title: '成交数量',
          content: '--',
        },
        {
          title: '实付金额',
          content: '--',
        },
      ],
    };
  },
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
      'orderInformation', // 生成订单接口 返回信息
      'allPayInfo', // 选择支付方式后接口 返回的信息
    ]),
  },
  methods: {
    ...mapActions('coin/orderInfo', [
      'getOrderInfoById',
      'submitOrder',
    ]),
    /* 选择支付类型 */
    toggleSelect(index, type) {
      this.selectedPayType = type;
      this.selectedIndex = index;
      this.activatedButton = true;
    },
    /* 格式化银行微信支付宝为中文 */
    toCN(type) {
      let payType = '';
      switch (type) {
        case 'ebank':
          payType = '银行卡';
          break;
        case 'weixin':
          payType = '微信';
          break;
        case 'alipay':
          payType = '支付宝';
          break;
        default:
          break;
      }
      return payType;
    },
    /* 提交订单 */
    orderSubmit() {
      if (this.activatedButton === false) {
        return false;
      }
      Toast.loading({
        mask: false,
        message: '加载中...',
      });
      const currentParams = {
        pay_type: this.selectedPayType.toUpperCase(),
        id: this.orderId,
      };
      this.submitOrder(currentParams).then(
        () => {
          Toast.clear();
          // 跳转到请付款页面
          this.$router.push({
            name: 'PleasePay',
            params: { orderId: this.orderId, fromRoute: 'ConfirmOrder' },
          });
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
      return true;
    },
  },
  mounted() {
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId;
      this.getOrderInfoById(this.$route.query.orderId).then(
        () => {
          this.paymentType = this.orderInfoById.payment_type;
        },
        () => {
          Toast('网络错误');
        },
      );
    }
  },

  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.path === '/purchaseCoinHome') {
      to.meta.keepAlive = true; // B 跳转到 A 时，让 A 缓存，即不刷新
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
  .activeSelected{
    border: 1px solid #3C64EE!important;
  }
.confirmOrder{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
   .paymentMethods{
     margin-top: 16px;
     .paymentMethods-title{
       padding-left: 20px;
       >span{
         height: 21px;
         line-height: 21px;
         font-size: 15px;
         color: #6A707D;
       }
     }
     .paymentMethods-content{
       padding:0 30px;
       margin-top: 11px;
       display: flex;
       justify-content: space-around;
       >div{
         position: relative;
         width: 90px;
         height: 103px;
         border: 1px solid #FFFFFF;
         background: #F0F3FC;
         border-radius: 4px;
         font-size: 12px;
         color: #0F3256;
         text-align: center;
         .check-icon{
           width: 26px;
           height: 26px
         }
         .paymentType-icon{
           width: 60px;
           height: 44px;
         }
         >div:nth-child(1){
           position: absolute;
           top:0;
           right: 0;
         }
         >div:nth-child(2){
           margin-top: 18px;
         }
         >div:nth-child(3){
           margin-top: 4px;
           >span{
             height: 17px;
             line-height: 17px;
           }
         }
       }
     }
   }
   .paymentInfo{
    margin-top: 20px;
    padding:0 30px;
    background: #FFFFFF;
    border-radius: 6px;
    >div{
      display: flex;
      justify-content: space-between;
      >span{
        height: 41px;
        line-height: 41px;
        font-size: 15px;
      }
      >span:nth-child(1){
        color: #666666;
      }
      >span:nth-child(2){
        color: #0F3256;
      }
    }
  }
   .pushOrder{
     margin-top: 154px;
     text-align: center;
     >button{
       width: 331px;
       height: 46px;
       font-size: 16px;
       color: #FFFFFF;
       background: #D2D8EB;
       border-radius: 4px;
       border: none;
     }
     .activeButton{
       background: #3C64EE;
     }
   }
}
</style>
