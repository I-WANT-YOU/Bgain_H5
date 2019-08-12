<template>
  <div class="fixed-detail">
    <BgainNavBar :title="option.product_name" />
    <div class="line income">
      <div class="text">已得收益</div>
      <div class="num">0.111111111 {{option.payment_currency}}</div>
    </div>
    <div class="line">
      <div class="text">认购数量</div>
      <div class="num">{{option.amount}} {{option.payment_currency}}</div>
    </div>
    <div class="line">
      <div class="text">预期年化利率</div>
      <div class="num">16% + 16%</div>
    </div>
    <div class="line">
      <div class="text">封闭期</div>
      <div class="num">{{option.closed_period}}天</div>
    </div>
    <div class="line">
      <div class="text">收益方式</div>
      <div class="num">一次性还本付息</div>
    </div>
    <div class="line">
      <div class="text">计息周期</div>
      <div class="num">2018-09-10 至 2018-10-07</div>
    </div>
    <div class="line">
      <div class="text">收款日</div>
      <div class="num">2018-10-11</div>
    </div>
    <div class="line roll-in">
      <div class="text">自动转入分币宝</div>
      <on-off v-model="checked" />
    </div>
    <div class="line roll-in">
      <div class="text">
        查看
        <span class="agreement">《投资服务协议》</span>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { Switch } from 'vant';

export default {
  name: 'FixedDetail',
  components: {
    BgainNavBar,
    onOff: Switch,
  },
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: false,
      option: {},
      statu: {},
    };
  },
  mounted() {
    console.log(this.statu);
    this.option = this.$route.query;
    this.statu = this.$route.params.status;
    console.log(this.option);
    if (this.$route.params.status === 'true') {
      console.log('1');
    } else {
      console.log('2');
    }
  },
};
</script>

<style lang='scss' scoped>
.fixed-detail {
  height: 100%;
  background: #f8f8f8;
  .line {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 0 20px;
    background: #ffffff;
    .text {
      font-size: 14px;
      color: #6a707d;
    }
    .num {
      font-size: 15px;
      color: #0f3256;
    }
  }
  .roll-in {
    margin-top: 10px;
    .text {
      color: #0f3256;
      .agreement {
        color: #3c64ee;
        letter-spacing: 0;
      }
    }
  }
}
</style>
