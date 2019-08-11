<template>
<div class="payHeader">
  <div class="header">
    <div @click="back"><svg-icon icon-class="back-fixed" class="icon-img" /></div>
  </div>
  <div class="pay-title">
    <div class="title-info">
      <div class="info-img">
        <img :src="orderInfoById.icon_url" alt="."/>
      </div>
      <div class="info-text">
        <span>{{title}}</span>
        <span>{{subTitle?subTitle:countTime}}</span>
      </div>
    </div>
    <div class="x-line">
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable max-len */

import { mapState } from 'vuex';
import publicMethods from '@utils/publicMethods';

export default {
  name: 'PayHeader',
  data() {
    return {
      // countTime: '',
      // buttonTime:'',
    };
  },
  props: [
    'title',
    'subTitle',
    'countTime',
    'buttonTime',
  ],
  methods: {
    // 设置倒计时
    setTime() {
      const test = publicMethods.countDownMinute(this.orderInfoById.minuend_date, this.orderInfoById.system_date);
      this.countTime = `预计在${test}内收到资产`;
      this.buttonTime = `申诉（${test}）`;
      this.orderInfoById.minuend_date = this.orderInfoById.minuend_date - 1000;
      if (this.orderInfoById.minuend_date - this.orderInfoById.system_date === 0) {
        this.timer.clearInterval();
        this.countTime = '没有收到资产，请申诉';
        this.buttonTime = '申诉';
      }
    },
    // 回退到上一页
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' });
        return false;
      }
      this.$router.go(-1);
      return false;
    },
  },
  mounted() {
    // this.timer = setInterval(this.setTime, 1000);
  },
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
    ]),
  },
  beforeDestroy() {
    // clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.payHeader{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  background: #3C64EE;
  .header{
    height: 44px;
    display: flex;
    align-items: center;
    .icon-img{
      width: 9.5px;
      height: 18px;
      padding:10px 30px 10px 16px
    }
  }
  .pay-title{
    height: 129px;
    .title-info{
      display: flex;
      justify-content: space-between;
      padding:9px 26px 0 26px;
      .info-img{
        width: 54px;
        height: 54px;
      }
      .info-text{
        >span{
          display: block;
          text-align: right;
          color: #FFFFFF;
        }
        >span:nth-child(1){
          height: 37px;
          line-height: 37px;
          font-size: 26px;
        }
        >span:nth-child(2){
          height: 20px;
          margin-top: 3px;
          line-height: 20px;
          font-size: 14px;
        }
      }
    }
    .x-line{
      width: 353px;
      height: 12px;
      margin: 25px 11px 0px 11px;
      background: #2247C9;
      border-radius: 6px;
    }
  }
}
</style>
