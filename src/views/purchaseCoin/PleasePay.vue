<!--suppress JSUnusedGlobalSymbols -->
<template>
  <div class="pleasePay">
    <PayHeader
      :title = 'formatedOrderStatus'
      :subTitle = "subTitle"
      :countTime="countTime"
      :buttonTime="buttonTime"
      :onArrowClick="backFunc"/>
    <div class="content-container">
      <!--请付款-->
      <PayContent v-if = "orderStatus === 'pending'"/>
      <!--待放行-->
      <ToBeReleaseContent v-if = "orderStatus === 'payed'" />
      <!--申诉中-->
      <FinishedContent v-if = "orderStatus === 'dispute'" />
      <!--已完成-->
      <FinishedContent v-if = "orderStatus === 'finished'"/>
      <!--已取消-->
      <FinishedContent v-if = "orderStatus === 'canceled'" />
    </div>
    <!--提示信息和按钮-->
    <div class="footer" v-show="!!tips">
      <p>{{tips}}</p>
      <div><button @click="goToNext(orderStatus)"
                   :class="{disabledButton:buttonState}">{{buttonTime}}</button></div>
    </div>
    <BgainBaseDialog
      v-model="isShowConfirm"
      :showCancel="true"
      title="付款确认"
      submitText="付款确认"
      content=""
      @submit="payConfirm"
      @cancel="()=>{this.isShowConfirm=false}"
      :submitColor="popColor"
    >
      <!--suppress XmlUnboundNsPrefix -->
      <template v-slot:content>
        <div style="display: flex;flex-direction: column;align-items: center">
          <span style="font-size: 16px;color: #0F3256;letter-spacing: 0.15px;line-height: 24px;">
            确认已向卖家付款
          </span>
          <span style="font-size: 16px;color: #0F3256;letter-spacing: 0.15px;line-height: 24px;">
            （恶意点击将直接冻结账户）
          </span>
          <div style="display: flex">
            <van-checkbox
              icon-size="15px"
              v-model="confirmChecked"
              @click="changeCheckStatus" />
            <span style="font-size: 12px;line-height: 28px;color: #2A64F7;margin-left: 5px ">
              我以遵守
            </span>
            <span style="font-size: 12px;line-height: 28px;color: #2A64F7;"
                  @click="()=>{legalDeclarationPopShow = true}">
              《资金来源合法声明》
            </span>
          </div>
        </div>
      </template>
    </BgainBaseDialog>
    <LegalDeclarationPop v-show="legalDeclarationPopShow"
                         @popShow = "()=>{this.legalDeclarationPopShow = false}"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Toast, Checkbox } from 'vant';
import Vue from 'vue';
import publicMethods from '@utils/publicMethods';
import PayContent from './components/PayContent.vue';
import ToBeReleaseContent from './components/ToBeReleaseContent.vue';
import PayHeader from './components/PayHeader.vue';
import LegalDeclarationPop from './components/LegalDeclarationPop.vue';
import errorMessage from '../../constants/responseStatus';
import FinishedContent from '@/views/purchaseCoin/components/FinishedContent.vue';
import BgainBaseDialog from '../../components/BgainBaseDialog.vue';

Vue.use(Toast);
export default {
  name: 'PleasePay',
  components: {
    FinishedContent,
    PayHeader,
    PayContent,
    ToBeReleaseContent,
    BgainBaseDialog,
    'van-checkbox': Checkbox,
    LegalDeclarationPop,
  },
  data() {
    return {
      confirmChecked: false,
      popColor: '#D2D8EB', // 弹窗按钮颜色
      isShowConfirm: false, // 付款弹窗
      payType: '', // 支付类型
      formatedOrderStatus: '', // 中文化的订单状态
      subTitle: '', // 副标题
      orderStatus: '', // 订单状态
      countTime: '',
      buttonTime: '',
      tips: '',
      buttonState: false, // 贷放款页面button 样式
      legalDeclarationPopShow: false, // 声明弹窗
    };
  },
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
      'hadPayInfo',
    ]),
  },
  methods: {
    ...mapActions('coin/orderInfo', [
      'getOrderInfoById', // 根据id获取订单信息
      'confirmHadPay', // 用户点击取人付款
    ]),
    /* 弹窗方法 */
    // 改变check状态
    changeCheckStatus() {
      if (this.popColor === '#3C64EE') {
        this.popColor = '#D2D8EB';
        this.confirmChecked = false;
      } else {
        this.popColor = '#3C64EE';
        this.confirmChecked = true;
      }
    },
    // 进入下一页
    payConfirm() {
      if (this.confirmChecked) {
        Toast.loading({
          mask: false,
          duration: 0,
          message: '加载中...',
        });
        this.confirmHadPay(sessionStorage.getItem('orderId')).then(
          () => {
            Toast.clear();
            switch (this.hadPayInfo.code) {
              case 177:
                Toast('操作失败');
                break;
              case 0:
                if (this.timer) {
                  clearInterval(this.timer);
                }
                this.queryOrderDetailById();
                break;
              default:
                break;
            }
            this.isShowConfirm = false;
          },
          (err) => {
            this.$toast.clear();
            if (err.status) { this.$toast(errorMessage[err.status]); } else {
              this.$toast('网络故障');
            }
            this.isShowConfirm = false;
          },
        );
      }
    },

    // 查询订单信息（调用接口） // 用来二次调用
    queryOrderDetailById() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      const orderId = sessionStorage.getItem('orderId');
      this.getOrderInfoById(orderId).then( // 获取币种列表
        () => {
          this.$toast.clear();
          if (this.orderInfoById.minuend_date) {
            this.deadLineDate = this.orderInfoById.minuend_date;
          }
          // 设置倒计时 传递给header和footer(在待放行和请付款页面需要)
          if (this.orderInfoById.otc_order_status === 'pending') { // 请付款
            if (this.orderInfoById.pay_type === 'alipay') {
              this.tips = `请使用本人（${this.orderInfoById.username}）支付宝向以上账户自行转账`;
            } else if (this.orderInfoById.pay_type === 'weixin') {
              this.tips = '在转账过程中请勿备注BTC、USDT、Bgain等信息，防止回款被拦截、银行卡被冻结等问题';
            } else if (this.orderInfoById.pay_type === 'ebank') {
              this.tips = `请使用本人银行卡（${this.orderInfoById.username}）向以上账户自行转账`;
            }
            this.timer = setInterval(() => {
              this.setTime(this.orderInfoById.otc_order_status);
            }, 1000);
          } else if (this.orderInfoById.otc_order_status === 'payed') { // 待放行
            this.buttonState = true;
            this.tips = '99%的用户会在15分钟内收到资产';
            this.timer = setInterval(() => {
              this.setTime(this.orderInfoById.otc_order_status);
            }, 1000);
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
            this.subTitle = '我已完成付款，买家未及时放行';
            break;
          case 'finished':
            this.formatedOrderStatus = '已完成';
            this.subTitle = '卖家在15分钟内已放行资产';
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
        this.buttonState = false;
        if (status === 'payed') {
          this.countTime = '没有收到资产，请申诉';
          this.buttonTime = '申诉';
        } else if (status === 'pending') {
          this.countTime = '请在00:00内付款给卖家';
          this.buttonTime = '我已付款成功';
        }
      } else {
        // eslint-disable-next-line max-len
        const test = publicMethods.countDownMinute(this.deadLineDate, this.orderInfoById.system_date);
        if (status === 'payed') {
          this.countTime = `预计在${test}内收到资产`;
          this.buttonTime = `申诉（${test}）`;
        } else if (status === 'pending') {
          this.countTime = `请在${test}内付款给卖家`;
          this.buttonTime = '我已付款成功';
        }
        this.deadLineDate = this.deadLineDate - 1000;
      }
    },
    // button点击事件（请付款-->待放行  待放行-->申诉）
    goToNext(orderStatus) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (orderStatus === 'pending') { // 请付款-->待放行
        // 重新查询订单状态
        this.isShowConfirm = true;
      } else if (orderStatus === 'payed') { // 待放行-->申诉
        if (this.orderInfoById.minuend_date - this.orderInfoById.system_date <= 0) {
          this.$router.push(
            {
              name: 'Appeal',
              params: { orderId: this.orderInfoById.id },
            },
          );
        }
      }
    },
    /* 返回上一页 （直接返回买币页面） */
    backFunc() {
      if (this.fromRoute === 'ConfirmOrder') {
        this.$router.go(-2);
      } else if (this.fromRoute === 'appeal') {
        this.$router.go(-3);
      } else {
        this.$router.go(-1);
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
      // 判断进入页面的路由名称
      if (this.$route.params.fromRoute) {
        //  存入session中
        sessionStorage.setItem('fromRoute', this.$route.params.fromRoute);
      } else {
        sessionStorage.setItem('fromRoute', '');
      }
    }
    Toast.loading({
      mask: true,
      message: '加载中...',
    });
    this.fromRoute = sessionStorage.getItem('fromRoute');
    // 根据id查询信息
    this.queryOrderDetailById();
  },
  beforeDestroy() {
    Toast.clear();
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
      >p{
        padding:5px 22px;
        line-height:1.5;
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
        .disabledButton{
          background: #D2D8EB;
        }
      }
    }
  }
</style>
