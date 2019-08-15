<template>
<div class="confirmOrder">
  <BgainNavBar title = "确认订单"/>
  <div class="paymentMethods">
    <div class="paymentMethods-title"><span>支付方式</span></div>
    <div class="paymentMethods-content">
      <div v-for="(item,key,index) in paymentType"
           :class="{activeSelected:selectedIndex === index}"
           :key="index"
           @click="toggleSelect(index)">
        <div>
          <svg-icon icon-class="selected_order" style = "width: 26px;height: 26px"
                    v-show="selectedIndex === index"/>
        </div>
        <div>
          <svg-icon :icon-class=key style = "width: 60px;height: 44px"/>
        </div>
        <div>
          <span>{{toCN(key)}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="paymentInfo">
      <div v-for="(item,index) in orderInfo" :key="index">
        <span>{{item.title}}</span>
        <span>{{item.content}}</span>
      </div>
  </div>
  <div class="pushOrder"><button @click="orderSubmit">提交订单</button></div>
</div>
</template>

<script>
import { Toast } from 'vant';
import Vue from 'vue';
import { mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapGetters('coin/orderInfo', [
      'paymentType',
    ]),
  },
  methods: {
    toggleSelect(index) {
      this.selectedIndex = index;
    },
    ...mapActions('coin/orderInfo', [
      'getOrderInfoById',
      'submitOrder',
    ]),
    // 格式化银行微信支付宝为中文
    toCN(type){
      let payType = '';
      switch (type) {
        case 'ebank':
          payType ='银行卡';
          break;
        case 'weixin':
          payType = '微信';
          break;
        case 'alipay':
          payType = '支付宝';
          break;
      }
      return payType;
    },
    // 提交订单
    orderSubmit() {
      Toast.loading({
        mask: false,
        message: '加载中...'
      })
      const currentParams = {
        pay_type: 'EBANK',
        id: this.orderInformation.id,
      };
      this.submitOrder(currentParams).then(
        () => {
          Toast.clear();
          // 跳转到请付款页面
          this.$router.push({
            name:'PleasePay',
            params:{orderId:this.orderInformation.id}
          })
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },
  },

  mounted() {
    // 从路由中获取订单id
    const orderInfo = this.$route.params;
    // 根据订单id查询订单
    try {
      if (orderInfo.data) {
        sessionStorage.setItem('orderInfo', orderInfo.data);
        sessionStorage.setItem('orderId', orderInfo.orderId);
      }
    } catch (e) {
      console.log(e);
    }
    this.orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    this.orderId = sessionStorage.getItem('orderId');
    console.log(this.orderId);
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
       background: #3C64EE;
       border-radius: 4px;
       border: none;
     }
   }
}
</style>
