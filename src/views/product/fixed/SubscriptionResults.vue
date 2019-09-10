<template>
<div class="subscriptionResults">
  <BgainNavBar :onArrowClick="()=>{this.$router.push('/product/fixed')}" title="认购结果"/>
  <div class="result">
    <div class="result-img">
      <svg-icon v-if="showData.result === 'success'"
                :icon-class="resultImgs[0]"
                class="result-icon"/>
      <svg-icon v-else :icon-class="resultImgs[1]" class="result-icon"/>
    </div>
    <div class="result-text">
      <span v-if="showData.result === 'success'">认购成功</span>
      <span v-else>认购失败</span>
    </div>
    <div class="result-count">
      <span>认购金额 {{showData.amount}}{{showData.currencyType}}</span>
    </div>
  </div>
  <div class="actions">
    <button @click="onSkip('/mine/fixed')">查看详情</button>
    <button class="sure" @click="onSkip('/product/fixed')">继续认购</button>
  </div>
</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import BgainNavBar from '../../../components/BgainNavBar.vue';

export default {
  name: 'SubscriptionResults',
  components: { BgainNavBar },
  data() {
    return {
      showData: {},
      resultImgs: [
        'fixed_result_success',
        'fixed_result_failed',
      ],
    };
  },
  mounted() {
    try {
      if (this.$route.params.fixedBuyResult) {
        sessionStorage.setItem('fixedBuyResult', JSON.stringify(this.$route.params));
      }
      this.showData = JSON.parse(sessionStorage.getItem('fixedBuyResult')).fixedBuyResult;
    } catch (e) {
      throw new Error(e);
    }
  },
  methods: {
    onSkip(router) {
      if (router === '/product/fixed') {
        window._czc.push(['_trackEvent', 'click', '定期盈-购买结果-继续浏览']);
      }
      if (router === '/mine/fixed') {
        window._czc.push(['_trackEvent', 'click', '定期盈-购买结果-查看详情']);
      }
      this.$router.push(router);
    },
  },
};
</script>

<style lang="scss" scoped>
  .subscriptionResults{
    .result{
      font-family: PingFangSC-Regular sans-serif;
      .result-icon{
        width: 59px;
        height: 78px;
      }
      .result-img{
        display: flex;
        justify-content: center;
        margin-top:52px;
      }
      .result-text{
        height: 21px;
        margin-top: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #0F3256;
        line-height: 21px;
      }
      .result-count{
        height: 20px;
        margin-top: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #A8AEB9;
      }
    }
    .actions{
      height: 46px;
      margin: 86px 35px 0 35px;
      display: flex;
      justify-content: space-around;
      >button{
        width: 130px;
        height: 46px;
        font-size: 16px;
        letter-spacing: 0;
        text-align: center;
        line-height: 37.36px;
        border-radius: 4px;
      }
       >button:nth-child(1){
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
       }
      .sure{
        background: #3C64EE;
        color: #FBFCFB;
        border: none;
      }
    }
  }

</style>
