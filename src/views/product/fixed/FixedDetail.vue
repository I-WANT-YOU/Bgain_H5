<template>
  <div class="fixed-detail">
    <header>
      <div @click="back"><svg-icon icon-class="back-fixed" class="header-img"/></div>
      <div><span>{{fixed.product_name}}</span></div>
    </header>
    <!--头部信息-->
    <div class="fixed-message">
      <div class="message-detail">
        <div class="annual-interest-rate">
          <div><span>{{this.fixed.annual_rate}}</span><span>%</span></div>
          <div><span>预期年化利率</span></div>
        </div>
        <div class="locked-period">
          <div><span>{{this.fixed.closed_period}}</span><span>天</span></div>
          <div><span>锁定期</span></div>
        </div>
      </div>
      <div class="message-tips">
        <div>100%兑付</div>
        <div>账户安全保障</div>
        <div>5EOS起诉</div>
      </div>
    </div>
    <!--交易流程-->
    <div class="transactionProcess">
      <div class="transactionProcess-title">
        <div>
          <span>交易流程</span>
        </div>
        <div v-show="countDownTimeIsShow">
          <span>&nbsp;&nbsp;申购倒计时&nbsp;&nbsp;</span>
          <span>{{this.countDownTimer}}&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="steps-container">
        <FixedDetailSteps
          :father-current-step = this.currentStep
          :from-father-date = this.toChildDate
        />
      </div>
    </div>
    <!--产品信息-->
    <div class="fixed-info">
      <div>
        <span>产品类型</span>
        <span>固定收益产品</span>
      </div>
      <div>
        <span>收益方式</span>
        <span>一次性还本付息</span>
      </div>
      <div>
        <span>投资去向</span>
        <span>由Bagin平台精选量化套利投资组合</span>
      </div>
      <span>固定期限理财，产品结束前不可退出</span>
    </div>
    <!--安全保障-->
    <div class="middle-line"></div>
    <div class="security" @click="goPage('/fixed-safety-security')">
      <span>安全保障</span>
      <span>
        <svg-icon icon-class="next"/>
      </span>
    </div>
    <div class="middle-line"></div>
    <div class="security" @click="goPage('/fixed-questions')">
      <span>常见问题</span>
      <span>
        <svg-icon icon-class="next"/>
      </span>
    </div>
    <div class="confirm" :class="{cancelMargin:msgFormSon}">
      <button @click="purchase">立即认购</button>
    </div>
    <footer :class="{hideFooter:msgFormSon}">
      <DownApp  @func="getMsgFormSon"/>
    </footer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import FixedDetailSteps from './components/FiedDetailSteps.vue';
import errorMessage from '../../../constants/responseStatus';
import DownApp from '../../../components/DownApp.vue';

const { mapActions, mapState } = createNamespacedHelpers('product/fixed');

// noinspection ES6ShorthandObjectProperty
export default {
  name: 'FixedDetail',
  components: {
    FixedDetailSteps,
    // eslint-disable-next-line
    Toast,
    DownApp,
  },
  data() {
    return {
      countDownTimeIsShow: false,
      countDownTimer: '',
      currentStep: 0,
      msgFormSon: false,
      toChildDate: [],
    };
  },
  mounted() {
    this.getFixedProductById(this.$route.params.id).then(
      () => {
        // 设置购买流程（包含倒计时）
        this.setSteps(this.fixed.product_progress_status_type);
        // 认购开始日期 起息日 到期日 预计收款日
        this.stepTime(
          [this.fixed.purchase_start_date, this.fixed.interest_start_date,
            this.fixed.due_date, this.fixed.expected_payment_date],
        );
      },
      (err) => {
        if (err.status) {
          this.$toast(errorMessage[err.status]);
        } else {
          this.$toast('服务器错误');
        }
      },
    );
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState([
      'fixed',
    ]),
  },
  methods: {
    // 立即认购
    purchase() {
      const info = JSON.stringify({
        productId: this.$route.params.id,
        support_fbp: this.fixed.support_fbp,
        title: this.fixed.product_name,
        expected_payment_date: this.fixed.expected_payment_date,
      });
      this.$router.push({
        name: 'FixedPurchaseStepOne',
        params: {
          info,
        },
      });
    },
    // 从子组件获取参数
    getMsgFormSon(data) {
      this.msgFormSon = data;
    },
    ...mapActions(
      ['getFixedProductById'],
    ),
    // 返回上一层
    back() {
      this.$router.go(-1);
    },
    // 设置购买流程
    setSteps(status) {
      switch (status) {
        case '"PURCHASE_START':
          // 设置申购倒计时
          this.currentStep = 1;
          this.timer = setInterval(() => { this.countDown(this.fixed.due_date); }, 60000);
          this.countDownTimeIsShow = true;
          break;
        case 'INTEREST_PENDING':
          this.currentStep = 1;
          break;
        case 'PURCHASE_END':
          this.currentStep = 2;
          break;
        case 'INTEREST_START':
          this.currentStep = 2;
          break;
        case 'DUE':
          this.currentStep = 3;
          break;
        case 'PAID':
          this.currentStep = 4;
          break;
        default:
          this.currentStep = 0;
          break;
      }
    },
    //  设置倒计时
    countDown(time) {
      if (time - Date.now() < 0) {
        this.countDownTimeIsShow = false;
        return false;
      }
      const date = time - Date.now();
      let seconds = Math.floor((date / 1000) % 60); // 所余秒数
      let minutes = Math.floor(((date / 1000) / 60) % 60); // 所余分钟数
      let hour = Math.floor((((date / 1000) / 60) / 60) % 24); // 所余时钟数
      let day = Math.floor((((date / 1000) / 60) / 60) / 24); // 天数
      if (day < 0) {
        day = 0;
      }
      if (hour < 0) {
        hour = 0;
      }
      if (minutes < 0) {
        minutes = 0;
      }
      if (seconds < 0) {
        seconds = 0;
        this.countDownTimeIsShow = false;
        clearInterval(this.timer);
      }
      this.countDownTimer = `${day}天${hour}小时${minutes}分${seconds}秒`;
      return true;
    },
    // 格式化时间
    stepTime(inputTime) {
      // eslint-disable-next-line
      const formatDate = [];
      const types = ['认购开始', '起息日', '到期日', '预期收款日'];
      inputTime.map((item, index) => {
        const time = new Date(item);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minute = time.getMinutes();
        if (year < 10) {
          year = `0${year}`;
        }
        if (month < 10) {
          month = `0${month}`;
        }
        if (day < 10) {
          day = `0${day}`;
        }
        if (hours < 10) {
          hours = `0${hours}`;
        }
        if (minute < 10) {
          minute = `0${minute}`;
        }
        const big = `${year}-${month}-${day}`;
        const small = `${hours}:${minute}`;
        const formateTime = {
          type: types[index],
          big,
          small,
        };
        this.toChildDate.push(formateTime);
        return true;
      });
    },
    goPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
    .hideFooter{
      display: none;
    }
    .cancelMargin{
      margin-bottom: 0!important;
    }
  .fixed-detail{
    margin: 0;
    padding: 0;
    font-family: PingFangSC-Regular;
    letter-spacing: 0;
    /*头部*/
    >header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      height: 52px ;
      padding-right: 37px;
      background: #6F9DF8 url("../../../assets/images/fixedDetail/back_small.png");
      background-size: 100% 52px ;
      >div{
        height: 24px;
        display: flex;
        align-items: center;
        .header-img{
          display: block;
          width: 10px;
          height: 18px;
        }
        >span{
          display: block;
          height: 24px;
          line-height: 24px;
          text-align: center;
          font-size: 17px;
          color: #FFFFFF;
        }
      }
      >div:nth-child(1){
        padding: 0 7.7px 0 19.3px;
      }
      >div:nth-child(2){
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /*头部信息*/
    .fixed-message{
      margin-top: 52px;
      padding-bottom: 21px;
      color: #FFFFFF;
      background: #6F9DF8 url("../../../assets/images/fixedDetail/back_big.png");
      background-size: 100% 100% ;
      /*数字信息*/
      .message-detail{
        display: flex;
        padding: 0 20px;
        >div{
          width: 50%;
        }
        /*数据展示*/
        .annual-interest-rate{
          >div:nth-child(1){
            display: flex;
            align-items: baseline;
            justify-content: center;
            >span{
              display: block;
              text-align: center;
            }
            >span:nth-child(1){
              height: 50px;
              font-size: 42px;
              line-height: 50px;
            }
            >span:nth-child(2){
              height: 34px;
              font-size: 24px;
              line-height: 34px;
            }
          }
          >div:nth-child(2){
            display: flex;
            justify-content: center;
            >span{
              display: block;
              height: 17px;
              line-height: 17px;
              font-size: 12px;
            }
          }
        }
        .locked-period{
          >div:nth-child(1){
            display: flex;
            align-items: baseline;
            justify-content: center;
            >span{
              display: block;
            }
            >span:nth-child(1){
              height: 50px;
              font-size: 36px;
              line-height: 50px;
            }
            >span:nth-child(2){
              height: 34px;
              font-size: 24px;
              line-height: 34px;
            }
          }
          >div:nth-child(2){
            display: flex;
            justify-content: center;
            >span{
              display: block;
              height: 17px;
              line-height: 17px;
              font-size: 12px;
            }
          }
        }
      }
      /*提示信息*/
      .message-tips{
        display: flex;
        justify-content: space-between;
        margin: 21px 49px 0 60px ;
        font-size: 12px;
        color: #C9D5FF;
        >div{
          width: 80px ;
          height: 20px;
          border: 0.51px solid #99AEF6;
          border-radius: 2px;
          text-align: center;
          line-height: 20px;
        }
      }
    }
    /*交易流程*/
    .transactionProcess{
      .transactionProcess-title{
        display: flex;
        justify-content: space-between;
        border-bottom: #D8D8D8 solid 0.51px;
        >div{
          height: 21px;
          line-height: 21px;
          margin:17px 0 14px 0;
        }
        >div:nth-child(1){
          margin-left: 20px ;
          font-size: 15px;
          color: #0F3256;
        }
        >div:nth-child(2){
          display: flex;
          background: url(../../../assets/images/rectangle-fixed.svg) no-repeat;
          font-size: 12px;
          color: #FF5044;
          >span{
            display: block;
          }
        }
      }
    }
    .fixed-info{
      font-size: 13px;
      color: #6A707D;
      >div{
        height: 38px;
        display: flex;
        margin: 0 22px;
        justify-content: space-between;
        align-items: center;
        >span{
          display: block;
        }
        >span:nth-child(1){
          color: #9AA2B2;
        }
      }
      >div:nth-child(1){
        margin-top: 14px;
      }
      >span{
        display: block;
        height: 16px;
        margin:11px 0 21px 21px;
        font-size: 11px;
        color: #9AA2B2;
      }
    }
    .middle-line{
      height: 10px;
      background: #F8F8F8;
    }
    .security{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #0F3256;
      padding:0 20px;
    }
    .confirm{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 138px;
      background: #F8F8F8;
      margin-bottom: 63px;
      >button{
        width: 331px;
        height: 46px;
        border: none;
        background: #3C64EE;
        border-radius: 4px;
        font-size: 16px;
        color: #FBFCFB;
      }
    }
    >footer{
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
</style>
