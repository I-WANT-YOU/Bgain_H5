<template>
<div class="confirmOrder">
  <BgainNavBar title = "确认订单"/>
  <div class="paymentMethods">
    <div class="paymentMethods-title"><span>支付方式</span></div>
    <div class="paymentMethods-content">
      <div v-for="(item,index) in paymentMethods"
           :class="{activeSelected:selectedIndex === index}"
           :key="index"
           @click="toggleSelect(index)">
        <div>
          <svg-icon icon-class="selected_order" style = "width: 26px;height: 26px"
                    v-show="selectedIndex === index"/>
        </div>
        <div>
          <svg-icon icon-class="weixin" style = "width: 60px;height: 44px"/>
        </div>
        <div>
          <span>{{item}}</span>
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
  <div class="pushOrder"><button>提交订单</button></div>
</div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

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
  methods: {
    toggleSelect(index) {
      this.selectedIndex = index;
    },
  },
  mounted() {
    const orderInfo = this.$route.params;
    console.log(orderInfo);
    try {
      if (orderInfo.data) {
        sessionStorage.setItem('orderInfo', orderInfo.data);
      }
    } catch (e) {
      console.log(e);
    }
    this.orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
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
       justify-content: space-between;
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
