<template>
  <div class="purchase-content">
    <!--tabs-->
    <div class="tabs-container">
      <div class="content-tabs">
          <span v-for="(item,index) in currencyListToUp" :key="index"
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
              <input :placeholder="placeHolder" v-model="inputValue"/>
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
      <button>下一步</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions, mapState, mapGetters } from 'vuex';
import errorMessage from '../../../constants/responseStatus';

export default {
  name: 'CoinRecharge',
  components: {
    // eslint-disable-next-line
      Toast,
  },
  data() {
    return {
      activeContentTab: '',
      activeExchangeTab: 0,
      headerTabsData: ['充币', '买币'],
      exchangeTabsData: ['按兑换金额', '按兑换数量'],
      placeHolder: '',
      inputValue: '',
      exchangeType: 'CNY', // 兑换
      exchangeInfo: [],
      transactionsNumber: '', // 成交数量
      paymentAmount: '', // 实付金额
    };
  },
  async mounted() {
    this.getCurrencyList().then(
      () => {
        const selectedCurrency = this.currencyListToUp[0];
        this.activeContentTab = selectedCurrency;
        // 调用接口获取单价
        this.getCurrencyPrice(this.currencyListToUp[0]).then(
          () => {
            this.activeContentTab = this.currencyPrice.currency_type.toUpperCase();
            this.placeHolder = `请输入${this.currencyPrice.min_quota}～${this.currencyPrice.max_quota}`;
          },
          (err) => {
            if (err.status) { this.$toast(errorMessage[err.status]); } else {
              this.$toast('网络故障');
            }
          },
        );
      },
      (err) => {
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
        }
      },
    );
  },
  methods: {
    ...mapActions('coin/purchaseCoin', [
      'getCurrencyList',
      'getCurrencyPrice',
    ]),
    // 改变币种
    changeContentTab(index) {
      this.activeContentTab = index;
      this.exchangeType = 'CNY';
    },
    // 改变兑换方式
    changeExchangeTab(index) {
      this.activeExchangeTab = index;
      this.inputValue = '';
      if (index === 0) {
        this.placeHolder = `请输入${this.currencyPrice.min_quota}～${this.currencyPrice.max_quota}`;
        this.exchangeType = 'CNY';
      } else {
        this.placeHolder = '请输入法币数量';
        this.exchangeType = this.activeContentTab;
      }
    },
  },
  computed: {
    ...mapState('coin/purchaseCoin', [
      'currencyList',
      'currencyPrice',
    ]),
    ...mapGetters('coin/purchaseCoin', [
      'currencyListToUp',
    ]),
    // 生成兑换信息列表
    initExchangeInfo() {
      let data = [];
      // 输入为空时候默认数据
      if (this.inputValue === '') {
        data = [
          {
            title: `单约价  (${this.activeContentTab})`,
            content: `${this.currencyPrice.price}CNY/${this.activeContentTab}`,
          },
          {
            title: `成交数量  (${this.activeContentTab})`,
            content: '--',
          },
          {
            title: `实付金额  (${this.activeContentTab})`,
            content: '--',
          },
        ];
      } else if (this.inputValue !== '') {
        if (this.exchangeType === 'CNY') {
          data = [
            {
              title: `单约价  (${this.activeContentTab})`,
              content: `${this.currencyPrice.price}CNY/${this.activeContentTab}`,
            },
            {
              title: '成交数量',
              content: this.inputValue,
            },
            {
              title: '实付金额',
              content: `¥${this.inputValue * this.currencyPrice.price}`,
            },
          ];
        } else {
          data = [
            {
              title: `单约价  (${this.activeContentTab})`,
              content: `${this.currencyPrice.price}CNY/${this.activeContentTab}`,
            },
            {
              title: '成交数量',
              content: this.inputValue / this.currencyPrice.price,
            },
            {
              title: '实付金额',
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
    },
  },
};

</script>

<style lang="scss" scoped>
  .activeContentTab{
    color: #FFFFFF;
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
          input{
            display: block;
            height: 25px;
            padding: 0;
            margin:0;
            line-height: 25px;
            border: none;
            color: #3C64EE;
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
      background: #3C64EE;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
    }
  }
</style>
