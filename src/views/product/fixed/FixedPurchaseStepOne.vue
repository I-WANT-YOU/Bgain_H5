<template>
  <div class="fixed-step-one">
    <BgainNavBar :title="title"/>
    <div class="purchase-info">
      <div class="info-one">
        <div class="info-num">
          <span>{{fixedBuyInfo.annual_return}}</span>
          <span>%</span>
        </div>
        <div class="info-text">预期年化利率</div>
      </div>
      <div class="info-two">
        <div class="info-num">
          <span>{{expectedReturn}}</span>
        </div>
        <div class="info-text">预期收益({{tabActiveType === 'BGP' ? 'BGP' : tabActiveType}})</div>
      </div>
    </div>
    <!--tab-->
    <div class="purchase-step">
      <div class="tabs-title" v-show="isTabsShow">
        <div>
          <span :class="{tabTitleActive:tabActiveCurrency}"
                @click="changeTab('currency')" >{{fixedBuyInfo.currency+'购买'}}</span>
        </div>
        <div class="y-line"></div>
        <div>
          <span :class="{tabTitleActive:tabActiveFBP}"
                @click="changeTab('FBP')">BGP购买</span>
        </div>
      </div>
      <div class="tabs-content">
        <div class="tabs-content-title">
          <span>认购数量({{tabActiveType === 'BGP' ? 'BGP' : tabActiveType}})</span>
        </div>
        <div class="lestPurchase">
          <!--suppress HtmlFormInputWithoutLabel -->
          <input ref='inputFile'
                 :placeholder=
                   "'起投' + placeHolder + (tabActiveType === 'BGP' ? 'BGP' : tabActiveType)"
                  v-model="investmentAmount"
          />
        </div>
        <div class="availableBalance">
         <span>可用余额</span><span>{{AllAccount}}
           {{tabActiveType === "BGP" ? 'BGP' : tabActiveType}}</span>
        </div>
      </div>
    </div>
    <div class="button-container">
      <Button
        type="info"
        :disabled="!activeButton"
        @click="toStepTwo">下一步</Button>
    </div>
    <!--当前余额不足的弹窗-->
    <div class="pop-container" v-show="popShow"><FixedPop/></div>
  </div>
</template>

<script>
import { Toast, Button } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import { strip } from '@utils/tools';
import BgainNavBar from '../../../components/BgainNavBar.vue';
import errorMessage from '../../../constants/responseStatus';
import FixedPop from './components/FixedPop.vue';

const { mapActions, mapState } = createNamespacedHelpers('product/fixed');

export default {
  name: 'FixedPurchaseStepOne',
  data() {
    return {
      isTabsShow: false,
      tabActiveType: '', // 显示币种/FBP 仅做展示
      tabActiveCurrency: false, // 币种tab激活 激活tab样式 在最大最小中判断
      tabActiveFBP: false, // FBPtab激活 在最大最小中判断
      title: '', // 标题
      // currency: '',
      canUseCurrency: false, // 是否可用币种 弹窗提示是否可用
      canUseFBP: false, // 是否可用FBP   toast提示是否可用
      popShow: false, // 遮罩层 显示余额不足
      placeHolder: '',
      AllAccount: '',
      investmentAmount: '',
      oldValue: '',
      activeButton: false,
      productId: '',
      // expectedReturn: '-',
    };
  },

  mounted() {
    if (this.$route.params.info) {
      sessionStorage.setItem('info', this.$route.params.info);
    }
    const info = JSON.parse(sessionStorage.getItem('info'));
    this.productId = info.productId;
    this.getFixedBuyInfo(info.productId).then(
      () => {
        // 设置title
        this.title = info.title;
        const localFixedBuyInfo = this.fixedBuyInfo;
        // 判断是否支持FBP购买(route传递的数据)
        this.purchaseProcess(info, localFixedBuyInfo);
      },
      (err) => {
        if (err.status) {
          this.$toast(errorMessage[err.status]);
        } else {
          this.$toast('请您登录');
        }
      },
    );
  },

  components: {
    BgainNavBar,
    FixedPop,
    Button,
    // eslint-disable-next-line vue/no-unused-components
    Toast,
  },
  watch: {
    investmentAmount(val) {
      const lastStr = val.charAt(val.length - 1);
      const regNum = /^[0-9]*$/;
      // 判断小数点
      if (lastStr === '.') {
        if (val.length === 1) { // 首位输入小数点
          this.investmentAmount = '0.';
        } else if (val.substring(0, val.length - 1).indexOf('.') < 0) { // 小数点第一出现
          this.investmentAmount = val;
        } else { // 小数点第二次出现
          this.investmentAmount = val.substring(0, val.length - 1);
        }
        return false;
      }
      // 判断是否是0
      if (lastStr === '0') {
        if (val.charAt(val.length - 2) === '0') { // 前一位也是0
          if (val.length === 2) {
            this.investmentAmount = val.substring(0, val.length - 1);
          } else {
            this.investmentAmount = val;
          }
        }
      }
      // 判断是否是数字
      if (regNum.test(lastStr)) { // 输入是数字
        this.investmentAmount = val;
        // 判断是否大于可用余额 大于产品剩余剩余额度
        if (this.tabActiveCurrency === true) {
          // 判断是否激活按钮 进行下一步
          if ((this.investmentAmount - this.fixedBuyInfo.min_inverst_amount) >= 0) {
            this.activeButton = true;
          }
          if ((this.investmentAmount - this.fixedBuyInfo.available) > 0) {
            this.investmentAmount = val.substring(0, val.length - 1);
            this.$toast(`产品额度不足，您最多可认购${this.fixedBuyInfo.available}${this.fixedBuyInfo.currency}`);
          }
          if ((this.investmentAmount - this.fixedBuyInfo.balance) > 0) {
            this.investmentAmount = val.substring(0, val.length - 1);
            this.$toast('您的可用余额不足，请重新输入');
          }
        }
        if (this.tabActiveFBP === true) {
          if ((this.investmentAmount - this.fixedBuyInfo.min_inverst_amount_fbp) >= 0) {
            this.activeButton = true;
          } else {
            this.activeButton = false;
          }
          if ((this.investmentAmount - this.fixedBuyInfo.available) > 0) {
            this.investmentAmount = val.substring(0, val.length - 1);
            this.$toast(`产品额度不足，您最多可认购${this.fixedBuyInfo.available}${this.fixedBuyInfo.currency}`);
          }
          if ((this.investmentAmount - this.fixedBuyInfo.balance_fbp) > 0) {
            this.investmentAmount = val.substring(0, val.length - 1);
            this.$toast('您的可用余额不足，请重新输入');
          }
        }
      } else { // 输入的是非数字
        this.investmentAmount = val.substring(0, val.length - 1);
        return false;
      }


      // 判断小数点后只有8位
      if (this.investmentAmount.indexOf('.') > -1) { // 有小数点
        if ((this.investmentAmount.length - this.investmentAmount.indexOf('.') - 1) > 8) {
          this.investmentAmount = val.substring(0, val.length - 1);
          this.$toast('小数点后最多可输入8位');
        } else {
          this.investmentAmount = val;
        }
      }
      return false;
    },
  },
  computed: {
    ...mapState([
      'fixedBuyInfo',
    ]),
    expectedReturn() {
      let expected = '-';
      if (this.investmentAmount) {
        expected = strip((this.investmentAmount * 100000000 * this.fixedBuyInfo.expected_return)
          / 100000000, 8);
      }
      return expected;
    },
  },
  methods: {
    ...mapActions(
      ['getFixedBuyInfo'],
    ),
    toStepTwo() {
      const routeData = {
        investmentAmount: this.investmentAmount,
        expectedReturn: this.expectedReturn,
        currencyType: this.tabActiveType,
        productId: this.productId,
        title: this.title,
        expected_payment_date: JSON.parse(sessionStorage.getItem('info')).expected_payment_date,
      };
      const stepTwoData = JSON.stringify(routeData);
      this.$router.push({
        name: 'FixedPurchaseStepTwo',
        params: {
          stepTwoData,
        },
      });
    },
    // 购买逻辑判断
    purchaseProcess(info, localFixedBuyInfo) {
      // 判断是否支持FBP购买(route传递的数据)
      if (info.support_fbp === false) { // 不支持FBP购买
        this.isTabsShow = false; // 设置tabTitle不可见
        // 判断BTC/FBP余额是否大于起投金额 选择初始TAB页面（本页面接口）
        if (localFixedBuyInfo.balance * 1 >= localFixedBuyInfo.min_inverst_amount * 1) { // 本金>最小
          this.canUseCurrency = true; // 币种可以购买
          this.placeHolder = localFixedBuyInfo.min_inverst_amount;
          this.AllAccount = localFixedBuyInfo.balance; // 余额
          this.tabActiveType = localFixedBuyInfo.currency; // 认购数量
          this.tabActiveCurrency = true; // tab页面为币种
        } else {
          // 显示弹窗 提示用户余额不足
          this.popShow = true;
        }
      } else { // 支持BGP购买
        this.isTabsShow = true; // Tba可切换
        // 判断BTC/BGP余额是否大于起投金额 选择初始TAB页面（本页面接口）
        if (localFixedBuyInfo.balance * 1 >= localFixedBuyInfo.min_inverst_amount * 1) {
          this.tabActiveCurrency = true; // tab页面为币种
          this.canUseCurrency = true; // 币种可以购买
          this.tabActiveType = localFixedBuyInfo.currency; // 认购数量
          this.placeHolder = localFixedBuyInfo.min_inverst_amount;
          this.AllAccount = localFixedBuyInfo.balance; // 余额
          // 判断FBP是否有足够余额
          if (localFixedBuyInfo.balance_fbp * 1 >= localFixedBuyInfo.min_inverst_amount_fbp * 1) {
            this.canUseFBP = true; // FBP可以购买
          } else {
            this.canUseFBP = false; // FBP不可以购买
          }
        } else {
          this.canUseCurrency = false; // BTC不可以购买
          // 判断FBP是否有足够余额
          if (localFixedBuyInfo.balance_fbp * 1 >= localFixedBuyInfo.min_inverst_amount_fbp * 1) {
            this.tabActiveFBP = true; // tab页面为FBP
            this.tabActiveType = 'BGP'; // 认购数量
            this.canUseFBP = true; // FBP可以购买
            this.placeHolder = localFixedBuyInfo.min_inverst_amount_fbp;
            this.AllAccount = localFixedBuyInfo.balance_fbp;
          } else {
            this.canUseFBP = false; // FBP不可以购买
            this.popShow = true;
          }
        }
      }
    },
    // 改变Tabs
    changeTab(text) {
      this.activeButton = false;
      switch (text) {
        case 'currency':
          if (this.canUseCurrency === false) {
            this.popShow = true;
            // this.$toast(`可用${this.fixedBuyInfo.currency}余额不足`);
          } else {
            this.tabActiveCurrency = true; // 币种tab激活
            this.tabActiveFBP = false; // FBPtab激活
            this.tabActiveType = this.fixedBuyInfo.currency;
            this.investmentAmount = '';
            this.placeHolder = this.fixedBuyInfo.min_inverst_amount;
            this.AllAccount = this.fixedBuyInfo.balance;
          }
          break;
        case 'FBP':
          if (this.canUseFBP === false) {
            this.$toast('可用BGP余额不足');
          } else {
            this.tabActiveCurrency = false; // 币种tab激活
            this.tabActiveFBP = true; // FBPtab激活
            this.tabActiveType = 'BGP';
            this.investmentAmount = '';
            this.placeHolder = this.fixedBuyInfo.min_inverst_amount_fbp;
            this.AllAccount = this.fixedBuyInfo.balance_fbp;
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .activeStyle{
    background: #3C64EE!important;
  }
  .tabTitleActive{
    color: #2A55E7;
    padding-bottom: 10px;
    border-bottom: solid 2px #2A55E7;
  }
  .fixed-step-one{
    height: 100vh;
    background: #F8F8F8;
    font-family: PingFangSC-Regular,sans-serif;
    /*购买信息*/
    .purchase-info{
      display: flex;
      padding: 31px 10px 29px 10px;
      background: #FFFFFF;
      >div{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .info-one{
        .info-num{
          display: flex;
          align-items: baseline;
          >span{
            display: block;
            color: #FF5C5C;
          }
          >span:nth-child(1){
            height: 40px;
            font-size: 28px;
            line-height: 40px;
          }
          >span:nth-child(2){
            height: 33px;
            font-size: 24px;
            color: #FF5C5C;
            line-height: 33px;
          }
        }
        .info-text{
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          color: #6A707D;
        }
      }
      .info-two{
        .info-num{
          display: flex;
          align-items: baseline;
          >span{
            display: block;
            color:  #0F3256;;
          }
          >span:nth-child(1){
            height: 40px;
            font-size: 20px;
            line-height: 40px;
          }
          >span:nth-child(2){
            height: 33px;
            line-height: 33px;
            font-size: 24px;
          }
        }
        .info-text{
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          color: #6A707D;
        }
      }

    }
  }
  .purchase-step{
    margin-top:11px;
    background:#FFFFFF;
    .tabs-title{
      display: flex;
      height: 47px;
      border-bottom: 0.51px solid #E5E9F6;
      font-size: 15px;
      color: #6A707D;;
      letter-spacing: 0;
      .y-line{
        width: 1px;
        height: 20px;
        margin:10px 0;
        background: #E5E9F6;
      }
      >div{
        width: 50%;
        height: 47px;
        display: flex;
        justify-content: center;
        >span{
          // width: 61px;
          padding-top: 15px;
          height: 21px;
        }
      }
    }
  }
  .tabs-content{
    padding:26.5px 21px 0 22px;
    .tabs-content-title{
      padding-bottom: 26px;
      height: 21px;
      line-height: 21px;
      font-size: 15px;
      color: #0F3256;
    }
    .lestPurchase{
      height: 25px;
      display: flex;
      align-items: center;
      /*padding:20px 0 18px 0;*/
      >input {
        height: 25px;
        border: none;
        font-size: 18px;
      }
      input::-webkit-input-placeholder {
        color: #A8AEB9;
      }
      input::-moz-placeholder {
        color: #A8AEB9;
      }
      input:-moz-placeholder {
        color: #A8AEB9;
      }
      input:-ms-input-placeholder {
        color: #A8AEB9;
      }
    }
    .availableBalance{
      height: 21px;
      padding:26px 0 17px 0;
      display: flex;
      justify-content: space-between;
      >span:nth-child(1){
         font-size: 15px;
         color: #6A707D;
       }
      >span:nth-child(2){
        font-size: 15px;
        color: #0F3256;
      }
    }
  }
  .button-container{
    height: 216px;
    display: flex;
    justify-content: center;
    align-items: center;
    >button{
      width: 331px;
      height: 46px;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      border: none;
    }
  }
  .pop-container{
    position: fixed;
    top: 0;
    z-index: 999;
  }
</style>
