<template>
<div class="subscriptionResults">
  <BgainNavBar title="认购结果"/>
  <div class="result">
    <div class="result-img">
      <svg-icon :icon-class="resultImgs[0]" class="result-icon"/>
    </div>
    <div class="result-text">
      <span>认购成功</span>
    </div>
    <div class="result-count">
      <span>认购金额 23.234 FBP</span>
    </div>
  </div>
  <div class="actions">
    <button>查看详情</button>
    <button>继续认购</button>
  </div>
</div>
</template>

<script>
import BgainNavBar from '../../../components/BgainNavBar.vue';

export default {
  name: 'SubscriptionResults',
  components: { BgainNavBar },
  data() {
    return {
      resultImgs: [
        'fixed_result_success',
        'fixed_result_failed',
      ],
    };
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
      justify-content: space-between;
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
      >button:nth-child(2){
        background: #3C64EE;
        color: #FBFCFB;
        border: none;
      }
    }
  }

</style>
