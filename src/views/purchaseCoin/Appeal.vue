<template>
<div class="appeal">
  <BgainNavBar title = '申诉'/>
  <div class="appealReason">
     <!--title-->
    <div class="reason-title">
      <span>请选择申诉理由</span>
    </div>
    <!--单选框-->
    <RadioGroup v-model="radio" class="radioGroup" @change = 'radioChange'>
      <div
        v-for="(item,index) in appealReasons"
        :key="index"
      >
        <Radio :name="index">{{item}}</Radio>
      </div>
    </RadioGroup>
    <!-- 文字输入-->
    <div class="reason-text" v-show = 'otherReason'>
      <textarea v-model="userInput"></textarea>
    </div>
  </div>
  <div class="tradeTips">
    <div><span>交易提示</span></div>
    <div>
      <p v-for="(item,index) in tipsList" :key="index">{{item}}</p>
    </div>
  </div>
  <div class="commit">
    <button :class="{activeButtonStyle:activeButton}" @click="submitAppeal">提交</button>
  </div>
</div>
</template>

<script>
import { RadioGroup, Radio, Toast } from 'vant';
import Vue from 'vue';
import { mapActions } from 'vuex';
import BgainNavBar from '../../components/BgainNavBar.vue';

Vue.use(Toast);
export default {
  name: 'Appeal',
  data() {
    return {
      otherReason: false,
      activeButton: false,
      radio: -1,
      userInput: '',
      appealReasons: [
        '我已完成付款，买家未及时放行',
        '我向卖家多转了钱',
        '其他',
      ],
      tipsList: [
        '1. 提起申诉后资产将会冻结，申诉专员将介入本次交易，直至申诉结束；',
        '2. 恶意申诉属于扰乱平台正常运营秩序行为，情节严重将冻结账户。',
      ],
    };
  },
  components: {
    BgainNavBar,
    RadioGroup,
    Radio,
  },
  methods: {
    ...mapActions('coin/appealingInfo', [
      'postAppealingInfo',
    ]),
    // 单选框改变事件
    radioChange() {
      switch (this.radio) {
        case 0:
          this.activeButton = true;
          this.otherReason = false;
          break;
        case 1:
          this.activeButton = true;
          this.otherReason = false;
          break;
        case 2:
          this.activeButton = true;
          this.otherReason = true;
          break;
        default:
          this.activeButton = false;
          this.otherReason = false;
          break;
      }
    },
    // 提交申诉
    submitAppeal() {
      let params = {};
      if (this.otherReason === true) { // 其他理由
        params = {
          order_id: sessionStorage.getItem('appealPageOrderId'),
          appeal_reason: this.userInput,
        };
      } else {
        params = {
          order_id: sessionStorage.getItem('appealPageOrderId'),
          appeal_reason: this.appealReasons[this.radio],
        };
      }
      // 发送请求
      this.postAppealingInfo(params).then(
        () => {
          this.$toast('提交成功');
        },
        () => {
          this.$toast('提交失败');
        },
      );
    },
  },
  watch: {
    userInput(val) {
      if (val.length === 19) {
        this.userInput = val.substring(0, val.length - 1);
      }
    },
  },
  mounted() {
    this.activeButton = false;
    if (this.$route.params.orderId) {
      const { orderId } = this.$route.params;
      sessionStorage.setItem('appealPageOrderId', orderId);
    }
  },
};
</script>

<style lang="scss" >
  .activeButtonStyle{
    background: #3C64EE!important;
  }
.appeal{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  // 申诉理由
  .appealReason{
      // radio 组件
    .radioGroup{
      font-size: 13px;
      padding:0 30px;
      .van-radio{
        margin-top: 20px;
      }
      .van-radio__icon{
        width: 15px;
        height: 15px;
        line-height: 15px;
        .van-icon{
          width: 15px;
          height: 15px;
        }
      }
    }
    /*title*/
    .reason-title{
      margin-top: 18px;
      padding-left: 20px;
      font-size: 15px;
      color: #6A707D;
      >span{
        height: 21px;
        line-height: 21px;
      }
    }
    .reason-text{
      padding:16px 30px 0 30px;
      >textarea{
        width: 100%;
        height: 140px;
        padding: 0;
        resize:none;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
       font-size: 15px;
      }
    }
  }
  // 交易提示
  .tradeTips{
    padding: 15px 30px 0 30px;
    >div:nth-child(1){
      >span{
        height: 20px;
        font-size: 14px;
        color: #676C8D;
      }
    }
    >div:nth-child(2){
      margin-top: 7px;
      >p{
        margin: 0;
        padding: 0;
        font-size: 12px;
        color: #A8AEB9;
        line-height: 26px;
      }
    }
  }
  // 提交
  .commit{
    margin-top: 33px;
    display: flex;
    justify-content: center;
    >button{
      width: 331px;
      height: 46px;
      background: #D2D8EB;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      border: none;
    }
  }

}
</style>
