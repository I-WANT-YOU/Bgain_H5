<template>
  <div class="pleasePay">
    <PayHeader :title = 'formatedOrderStatus' :subTitle = "subTitle"/>
    <div class="content-container">
      <!--请付款-->
      <PayContent v-if = "orderStatus === 'pending'"/>
      <!--待放行-->
      <ToBeReleaseContent v-if = "orderStatus === 'payed'" />
      <!--申诉中-->
      <PayContent v-if = "orderStatus === 'dispute'" />
      <!--已完成-->
      <FinishedContent v-if = "orderStatus === 'finished'"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vant';
import Vue from 'vue';
import PayContent from './components/PayContent.vue';
import ToBeReleaseContent from './components/ToBeReleaseContent.vue';
import PayHeader from './components/PayHeader.vue';
import errorMessage from '../../constants/responseStatus';
import FinishedContent from "@/views/purchaseCoin/components/FinishedContent.vue";

Vue.use(Toast);
export default {
  name: 'PleasePay',
  components: {FinishedContent, PayHeader, PayContent, ToBeReleaseContent },
  data() {
    return {
      payType:'',
      formatedOrderStatus: '',
      subTitle:'',
    };
  },
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
    ]),
  },
  methods: {
    ...mapActions('coin/orderInfo', [
      'getOrderInfoById',
    ]),
    // 用户订单状态和倒计时
    setOrderStatus() {
      if (this.orderInfoById.otc_order_status) {
        switch (this.orderInfoById.otc_order_status) {
          case 'pending':
            this.formatedOrderStatus = '请付款';
            this.subTitle = '';
            break;
          case 'payed':
            this.formatedOrderStatus = '待放行';
            this.subTitle = '';
            break;
          case 'dispute':
            this.formatedOrderStatus = '申诉中';
            this.subTitle = '我已完成付款，买家未及时放行';
            break;
          case 'finished':
            this.formatedOrderStatus = '已完成';
            this.subTitle = '卖家在15分总内已放行资产';
            break;
          case 'canceled':
            this.formatedOrderStatus = '已关闭';
            this.subTitle = '卖家在15分总内已放行资产';
            break;
          default:
            break;
        }
      }
    },
  },
  mounted() {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...',
    });
    // 获取订单ID
    if (this.$route.params.orderId) {
      const { orderId } = this.$route.params;
      sessionStorage.setItem('orderId', orderId); // 存入本地
    }
    const orderId = sessionStorage.getItem('orderId');
    this.getOrderInfoById(orderId).then( // 获取币种列表
      () => {
        this.$toast.clear();
        // 设置订单不同状态
        // 根据不同支付类型和订单不同的状态 渲染不同的组件
        this.payType = '';
        this.orderStatus = this.orderInfoById.otc_order_status;
        // 设置header的title和subtitle
        this.setOrderStatus();
      },
      (err) => {
        this.$toast.clear();
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
        }
      },
    );
  },
  beforeDestroy() {
    this.$toast.clear();
  },
};
</script>

<style lang="scss" scoped>
  .pleasePay{
    .content-container{
      position: relative;
      width: 343px;
      top:-30px;
      left: 16px;
      right: 16px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      border-radius: 0 0 4px 4px;
    }
  }

</style>
