<template>
  <div class="purchase-content">
    <!--tabs-->
    <div class="tabs-container">
      <div class="content-tabs">
          <span v-for="(item,index) in currencyList" :key="index"
                :class="{activeContentTab:activeContentTab === item}"
                @click = "changeContentTab(item)"
          >
            {{item}}
          </span>
      </div>
    </div>
    <!--兑换-->
      <div class="exchange-type">
        <div class="exchange-tabs">
          <span
            v-for="(item,index) in exchangeTabsData"
            :key="index"
            @click = changeExchangeTab(index)
            :class="{activeExchangeTab:activeExchangeTab === index}" >{{item}}
          </span>
        </div>
        <div class="exchange-count">
          <div>
            <label>
              <input :placeholder="placeHolder" v-model="inputValue" type="number"/>
            </label>
          </div>
          <div><span>{{exchangeType}}</span></div>
        </div>
      </div>
    <!--兑换详情-->
    <div class="exchange-info">
      <div v-for="(item,index) in initExchangeInfo" :key="index">
        <span>{{item.title}}</span>
        <span>{{item.content}}</span>
      </div>
    </div>
    <!--手续费-->
    <div class="tips">
      <span>交易0手续费</span>
    </div>
    <!--手续费-->
    <div class="next">
      <button
        @click="next"
        :class="{activeButtonStyle:activeButton}"
        :disabled = !activeButton
      >下一步</button>
    </div>
    <div class="toUserTips">
      <p>
        注：OTC功能由LinkCoin提供服务，平台仅做展示，不提供担保。请在注册地法律允许的范围内，自担风险进行兑换
      </p>
    </div>

    <!--两笔订单进行中-->
    <BgainBaseDialog
      v-model="hasTwoOrders"
      submitText="查看订单"
      content="当前有1笔订单进行中无法继续买币"
      @submit="checkExistingOrders"
      @cancel="()=>{this.hasTwoOrders = false}"
    />
    <!--一笔订单进行中-->
    <BgainBaseDialog
      v-model="hasOneOrder"
      submitText="查看订单"
      content="当前有1笔未完成订单"
      @submit="checkExistingOrders"
      @cancel="()=>{this.hasOneOrder = false}"
    />
    <!--用户余额不足-->
    <BgainBaseDialog
      v-model="userAccount"
      :showCancel="true"
      submitText="立即充币"
      content="您当前可用余额不足，请先冲币"
      @submit="()=>{this.$emit('activeHeaderTabFromChild', 0)}"
      @cancel="()=>{this.userAccount = false}"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import errorMessage from '../../../constants/responseStatus';
import BgainBaseDialog from '../../../components/BgainBaseDialog.vue';

Vue.use(Toast);
export default {
  name: 'CoinRecharge',
  components: {
    BgainBaseDialog,
  },
  data() {
    return {
      hasTwoOrders: false, // 两笔未完成的订单
      hasOneOrder: false, // 一笔未完成订单
      marketClose: false, // 第三方闭市
      userAccount: false, // 用户余额足
      popColor: '#3C64EE',
      exchangeTabsData: ['按兑换金额', '按兑换数量'],
      activeExchangeTab: 0,
      exchangeType: '', // 兑换类型
      exchangeInfo: [],
      singleOfferPrice: '', // 单价约
      transactionsNumber: '', // 成交数量
      paymentAmount: '', // 实付金额
      activeButton: false,
      routerData: '',
      inputValue: '',
      placeHolder: '',
      activeContentTab: '',
      currencyList: [], // 币种列表
    };
  },

  methods: {
    // 获取用户信息 判断是否设置交易密码
    ...mapActions('user', [
      'getUserSummary',
      'toGrantAuthorization',
    ]),
    ...mapActions('coin/purchaseCoin', [
      'getCurrencyList', // 获取列表
      'getCurrencyPrice',
    ]),
    ...mapActions('coin/orderInfo', [
      'generateOrderInfo',
    ]),
    // 当用户有两笔订单时候 产看用户订单列表
    checkExistingOrders() {
      this.$router.push({
        name: 'BuyingRecord',
      });
    },
    // 下一步
    next() {
      // 点击下一步 （生成订单的参数）
      const queryData = {
        type: 'BUY',
        coin_symbol: this.activeContentTab,
        currency_symbol: 'CNY',
      };
      if (this.exchangeType === 'CNY') {
        queryData.amount = this.inputValue;
      } else {
        queryData.coin_amount = this.inputValue;
      }
      this.$toast.loading({
        mask: false,
        duration: 0,
        message: '加载中...',
      });
      //  发送请求 生成订单
      this.generateOrderInfo(queryData).then(
        () => {
          Toast.clear();
          if (this.orderInformation.code === 167) { // otc不支持该币种购买
            Toast('不支持该币种购买');
            return false;
          } if (this.orderInformation.code === 168) { // otc待处理订单超过两条（）
            this.hasTwoOrders = true;
            return false;
          } if (this.orderInformation.code === 169) { // otc购买数量为零
            Toast('购买数量为零');
            return false;
          } if (this.orderInformation.code === 170) { // otc 购买金额不在可购买范围之内
            Toast('购买金额不在可购买范围之内');
            return false;
          } if (this.orderInformation.code === 171) { // otc 用户当天可用额度不足
            Toast('用户当天可用额度不足');
            return false;
          } if (this.orderInformation.code === 172) { // otc 第三方服务闭市
            Toast('第三方服务闭市');
            return false;
          } if (this.orderInformation.code === 173) { // otc 订单不存
            Toast('订单不存');
            return false;
          } if (this.orderInformation.code === 174) { // otc 用户没有权限对此订单操作
            Toast('用户没有权限对此订单操作');
            return false;
          } if (this.orderInformation.code === 175) { // otc 当前订单不可申诉
            Toast('当前订单不可申诉');
            return false;
          } if (this.orderInformation.code === 176) { // otc 用户总体可用额度不足
            this.userAccount = true;
            return false;
          } if (this.orderInformation.code === 177) {
            Toast('服务器异常');
            return true;
          } if (this.orderInformation.code === 178) { // otc 用户存在一笔未支付订单(未选支付方式)
            this.hasOneOrder = true;
            return true;
          }
          this.$router.push({
            name: 'ConfirmOrder',
            query: {
              orderId: this.orderInformation.data.id,
            },
          });
          return true;
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },
    // 改变币种
    changeContentTab(currencyType) {
      this.activeContentTab = currencyType;
      this.inputValue = '';
      this.exchangeType = 'CNY';
      // 获取新的币种价格信息
      this.getNewCurrencyPrice(currencyType);
    },
    // 获取币种价格
    getNewCurrencyPrice(currencyType) {
      // 调用接口获取单价
      this.getCurrencyPrice(currencyType).then(
        () => {
          this.$toast.clear();
          this.activeExchangeTab = 0;
          this.exchangeType = 'CNY';
          if (this.currencyPrice.min_quota !== undefined) {
            this.placeHolder = `请输入${this.currencyPrice.min_quota}～${this.currencyPrice.max_quota}`;
          }
          this.singleOfferPrice = `${this.currencyPrice.price}CNY/${this.activeContentTab}`; // 单价约
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },
    // 改变兑换方式
    changeExchangeTab(index) {
      this.activeExchangeTab = index;
      this.inputValue = '';
      if (index === 0) {
        this.placeHolder = `请输入${this.currencyPrice.min_quota}～${this.currencyPrice.max_quota}`;
        this.exchangeType = 'CNY';
      } else {
        this.placeHolder = '请输入兑换数量';
        this.exchangeType = this.activeContentTab;
      }
    },
  },

  computed: {
    ...mapState('coin/purchaseCoin', [
      'currencyData', // 币种列表 是否有订单
      'currencyPrice', //  币种价格
    ]),
    // 订单信息
    ...mapState('coin/orderInfo', [
      'orderInformation',
    ]),
    // 用户信息判断是否设置交易密码
    ...mapState('user', [
      'basicInfo',
    ]),
    // 初始化列表信息（若通过OTC验证）
    initCurrencyList: {
      currencyList: [],
      get() {
        const currencyList = this.currencyData.data.link_coin_currency_types
          .map(item => item.toUpperCase()); // 币种列表
        return currencyList;
      },
    },
    // 生成兑换信息列表
    initExchangeInfo() {
      let data = [];
      // 输入为空时候默认数据
      if (this.inputValue === '') {
        data = [
          {
            title: `单价约  (${this.activeContentTab})`,
            content: `${this.currencyPrice.price}CNY/${this.activeContentTab}`,
          },
          {
            title: `成交数量  (${this.activeContentTab})`,
            content: '--',
          },
          {
            title: '实付金额  (CNY)',
            content: '--',
          },
        ];
      } else if (this.inputValue !== '') {
        if (this.exchangeType !== 'CNY') {
          data = [
            {
              title: `单价约  (${this.activeContentTab})`,
              content: `${this.currencyPrice.price}CNY/${this.activeContentTab}`,
            },
            {
              title: `成交数量  (${this.activeContentTab})`,
              content: this.inputValue,
            },
            {
              title: '实付金额  (CNY)',
              content: `¥${Math.floor(this.inputValue * this.currencyPrice.price * 100) / 100}`,
            },
          ];
        } else {
          data = [
            {
              title: `单价约  (${this.activeContentTab})`,
              content: `${this.currencyPrice.price}CNY/${this.activeContentTab}`,
            },
            {
              title: `成交数量  (${this.activeContentTab})`,
              // eslint-disable-next-line max-len
              content: Math.floor((this.inputValue / this.currencyPrice.price) * 100000000) / 100000000,
            },
            {
              title: '实付金额  (CNY)',
              content: `¥${this.inputValue}`,
            },
          ];
        }
      }
      return data;
    },
  },

  watch: {
    // 监听input输入
    inputValue(val) {
      const lastStr = val.charAt(val.length - 1);
      const regNum = /^[0-9]*$/;
      // 判断小数点
      if (lastStr === '.') {
        if (val.length === 1) { // 首位输入小数点
          this.inputValue = '0.';
        } else if (val.substring(0, val.length - 1).indexOf('.') < 0) { // 小数点第一出现
          this.inputValue = val;
        } else { // 小数点第二次出现
          this.inputValue = val.substring(0, val.length - 1);
        }
        return false;
      }
      // 判断是否是0
      if (lastStr === '0') {
        if (val.charAt(val.length - 2) === '0') { // 前一位也是0
          if (val.length === 2) {
            this.inputValue = val.substring(0, val.length - 1);
          } else {
            this.inputValue = val;
          }
        }
      }

      // 判断是否是数字
      if (regNum.test(lastStr)) {
        this.inputValue = val;
        // 小数点前六位
        if (Math.floor(this.inputValue) > 999999) {
          this.inputValue = val.substring(0, val.length - 1);
        }
        if (this.exchangeType === 'CNY') { // 按兑换金额
          if ((this.inputValue - this.currencyPrice.min_quota) < 0) {
            this.activeButton = false;
          } else if ((this.inputValue - this.currencyPrice.min_quota) >= 0) {
            this.activeButton = true;
          }
        } else if (this.exchangeType !== 'CNY') {
          if (this.inputValue > 0) {
            this.activeButton = true;
          } else {
            this.activeButton = false;
          }
        }
      }
      // 判断小数点后只有8位
      if (this.inputValue.indexOf('.') > -1) { // 有小数点
        if (this.exchangeType === 'CNY') {
          if ((this.inputValue.length - this.inputValue.indexOf('.') - 1) > 2) {
            this.inputValue = val.substring(0, val.length - 1);
            this.$toast('小数点后最多可输入2位');
          } else {
            this.inputValue = val;
          }
        } else if ((this.inputValue.length - this.inputValue.indexOf('.') - 1) > 8) {
          this.inputValue = val.substring(0, val.length - 1);
          this.$toast('小数点后最多可输入8位');
        } else {
          this.inputValue = val;
        }
      }
      return false;
    },
  },
  mounted() {
    this.currencyList = this.currencyData.data.link_coin_currency_types
      .map(item => item.toUpperCase()); // 币种列表
    this.activeContentTab = this.currencyList[0].toString(); // 激活币种显示样式
    this.exchangeType = 'CNY'; // 兑换方式选择
    this.getNewCurrencyPrice(this.activeContentTab);//  获取币种价格
  },
  beforeDestroy() {
    this.$toast.clear();
  },
};
</script>

<style lang="scss" scoped>
  /*设置身份验证弹窗样式*/
  .activeContentTab{
    color: #FFFFFF;
  }
  .activeButtonStyle{
    background: #3C64EE!important;
  }
  .activeExchangeTab{
    color: #3C64EE;
  }
  .purchase-content{
    position: relative;
    font-family: PingFangSC-Regular sans-serif;
    letter-spacing: 0;
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
    .exchange-type{
      position: absolute;
      width: 342px;
      height:120px;
      top:63px;
      left: 16px;
      right: 16px;
      background: #FFFFFF;
      border-radius: 6px;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      >div{
        padding:10px 20px;
      }
      .exchange-tabs{
        font-size: 15px;
        color: #0F3256;
        >span{
          display: inline-block;
          height: 21px;
          padding:10px 0;
        }
        >span:nth-child(2){
          margin-left: 35px;
        }
      }
      .exchange-count{
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
          height: 25px;
          font-size: 18px;
        }
        >div:nth-child(1){
          flex-grow: 1;
          input{
            display: block;
            width: 100%;
            height: 25px;
            padding: 0;
            margin:0;
            line-height: 25px;
            border: none;
            color: #000;
          }
        }
        >div:nth-child(2){
          color: #0F3256;
          >span{
            height: 25px;
            line-height: 28px;
          }
        }
      }
    }
    .exchange-info{
      width: 302px;
      margin: 48px 16px 0 16px;
      padding:0 20px;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      border-radius: 6px;
      >div{
        display: flex;
        justify-content: space-between;
        border-bottom: 0.51px solid #EEEEEE;
        >span{
          height: 55.5px;
          line-height: 55.5px;
          font-size: 15px;
        }
        >span:nth-child(1){
          color: #6A707D;
        }
        >span:nth-child(2){
          color: #0F3256;
        }
      }
    }
  }
  .tips{
    margin-top: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    >span{
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #A8AEB9;
    }
  }
  .next{
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    >button{
      width: 331px;
      height: 46px;
      background: #D2D8EB;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
    }
  }
  .toUserTips{
    margin-top: 35px;
    line-height: 1.5;
    padding:8px 21px;
    font-size: 12px;
    color: #6A707D;
    letter-spacing: 0;
    background: #FAF4DC;
    >p{
      margin: 0;
    }
  }
</style>
