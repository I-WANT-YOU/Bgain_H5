<!--suppress JSUnusedGlobalSymbols -->
<template>
  <div class="pleasePay">
    <PayHeader
      :title = 'formatedOrderStatus'
      :subTitle = "subTitle"
      :countTime="countTime"
      :buttonTime="buttonTime"/>
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
    <!--提示信息和按钮-->
    <div class="footer" v-show="!!tips">
      <span>{{tips}}</span>
      <div><button @click="goToNext(orderStatus)">{{buttonTime}}</button></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vant';
import Vue from 'vue';
import publicMethods from '@utils/publicMethods';
import PayContent from './components/PayContent.vue';
import ToBeReleaseContent from './components/ToBeReleaseContent.vue';
import PayHeader from './components/PayHeader.vue';
import errorMessage from '../../constants/responseStatus';
import FinishedContent from '@/views/purchaseCoin/components/FinishedContent.vue';

Vue.use(Toast);
export default {
  name: 'PleasePay',
  components: {
    FinishedContent, PayHeader, PayContent, ToBeReleaseContent,
  },
  data() {
    return {
      payType: '', // 支付类型
      formatedOrderStatus: '', // 中文化的订单状态
      subTitle: '', // 副标题
      orderStatus: '', // 订单状态
      countTime: '',
      buttonTime: '',
      tips: '',
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
    // 查询订单信息（调用接口） // 用来二次调用
    queryOrderDetailById() {
      const orderId = sessionStorage.getItem('orderId');
      this.getOrderInfoById(orderId).then( // 获取币种列表
        () => {
          this.$toast.clear();
          // 设置倒计时 传递给header和footer(在待放行和请付款页面需要)
          if (this.orderInfoById.otc_order_status === 'pending') { // 请付款
            this.tips = `请使用本人银行卡（${this.orderInfoById.username}）向以上账户自行转账`;
            this.timer = setInterval(this.setTime(this.orderInfoById.otc_order_status), 1000);
          } else if (this.orderInfoById.otc_order_status === 'payed') { // 待放行
            this.tips = '99%的用户会在15分钟内收到资产';
            this.timer = setInterval(this.setTime(this.orderInfoById.otc_order_status), 1000);
          }

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
    // 用户订单状态和倒计时
    setOrderStatus() {
      if (this.orderInfoById.otc_order_status) {
        switch (this.orderInfoById.otc_order_status) {
          case 'pending':
            this.formatedOrderStatus = '请付款';
            this.subTitle = ''; // 倒计时
            break;
          case 'payed':
            this.formatedOrderStatus = '待放行';
            this.subTitle = ''; // 倒计时
            break;
          case 'dispute':
            this.formatedOrderStatus = '申诉中';
            this.subTitle = this.orderInfoById.dispute_reason;
            break;
          case 'finished':
            this.formatedOrderStatus = '已完成';
            this.subTitle = '卖家在15分总内已放行资产';
            break;
          case 'canceled':
            this.formatedOrderStatus = '已关闭';
            this.subTitle = this.orderInfoById.cancel_reason;
            break;
          default:
            break;
        }
      }
    },
    // 设置倒计时
    setTime(status) {
      if (this.orderInfoById.minuend_date - this.orderInfoById.system_date <= 0) { // 倒计时结束
        clearInterval(this.timer);
        if (status === 'payed') {
          this.countTime = '没有收到资产，请申诉';
          this.buttonTime = '申诉';
        } else if (status === 'pending') {
          this.countTime = '请在00:00内付款给卖家';
          this.buttonTime = '我已付款成功';
        }
      } else {
        // eslint-disable-next-line max-len
        const test = publicMethods.countDownMinute(this.orderInfoById.minuend_date, this.orderInfoById.system_date);
        if (status === 'payed') {
          this.countTime = `预计在${test}内收到资产`;
          this.buttonTime = `申诉（${test}）`;
        } else if (status === 'pending') {
          this.countTime = `请在${test}内付款给卖家`;
          this.buttonTime = '我已付款成功';
        }
        this.orderInfoById.minuend_date = this.orderInfoById.minuend_date - 1000;
      }
    },
    // button点击事件（请付款-->待放行  待放行-->申诉）
    goToNext(orderStatus) {
      if (orderStatus === 'pending') { // 请付款-->待放行
        // 重新查询订单状态
        this.queryOrderDetailById();
      } else if (orderStatus === 'payed') { // 待放行-->申诉
        this.$router.push(
          {
            name: 'Appeal',
            params: { orderId: this.orderInfoById.id },
          },
        );
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
    // const orderId = sessionStorage.getItem('orderId');
    this.queryOrderDetailById();
    // 请求订单信息
    // this.getOrderInfoById(orderId).then( // 获取币种列表
    //   () => {
    //     this.$toast.clear();
    //     // 设置倒计时 传递给header和footer(在待放行和请付款页面需要)
    //     if (this.orderInfoById.otc_order_status === 'pending') { // 请付款
    //       this.tips = `请使用本人银行卡（${this.orderInfoById.username}）向以上账户自行转账`;
    //       this.timer = setInterval(this.setTime(this.orderInfoById.otc_order_status), 1000);
    //     } else if (this.orderInfoById.otc_order_status === 'payed') { // 待放行
    //       this.tips = '99%的用户会在15分钟内收到资产';
    //       this.timer = setInterval(this.setTime(this.orderInfoById.otc_order_status), 1000);
    //     }
    //
    //     // 设置订单不同状态
    //     // 根据不同支付类型和订单不同的状态 渲染不同的组件
    //     this.payType = '';
    //     this.orderStatus = this.orderInfoById.otc_order_status;
    //     // 设置header的title和subtitle
    //     this.setOrderStatus();
    //   },
    //   (err) => {
    //     this.$toast.clear();
    //     if (err.status) { this.$toast(errorMessage[err.status]); } else {
    //       this.$toast('网络故障');
    //     }
    //   },
    // );
  },
  beforeDestroy() {
    this.$toast.clear();
    clearInterval(this.timer);
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
    .footer{
      >span{
        display: block;
        height: 30px;
        padding-left: 22px;
        line-height: 30px;
        font-size: 12px;
        color: #6A707D;
        background: #FAF4DC;
      }
      >div{
        display: flex;
        justify-content: center;
        >button{
          width: 331px;
          height: 46px;
          margin-top: 10px;
          background: #3C64EE;
          border-radius: 4px;
          font-size: 16px;
          color: #FFFFFF;
          border: none;
          text-align: center;
        }
      }

    }
  }

</style>
