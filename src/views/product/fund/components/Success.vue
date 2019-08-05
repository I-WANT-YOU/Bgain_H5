<template>
  <div class="success">
    <svg-icon icon-class="buy-result" class="buy-result" />
    <div class="title">您的认购申请已提交</div>
    <div class="info">
      <span class="icon">日涨跌幅</span>
      <span>认购金额 {{amount}} {{currency}}</span>
      <span class="none">日涨跌幅</span>
    </div>
    <div class="message">该交易成功与否以平台确认结果为准,请及时关注消息通知</div>
    <div class="line"></div>
    <div class="steps">
      <div class="step">
        <svg-icon icon-class="step-active" class="icon" />
        <div class="step-title">扣减资金,提交认购申请</div>
        <div class="step-time">{{confirm_date}}</div>
      </div>
      <div class="step">
        <svg-icon icon-class="step-inactive" class="icon" />
        <div class="step-title">确认份额,募集期结束,进入锁定期</div>
        <div class="step-time">{{submit_date}}</div>
      </div>
      <div class="step">
        <svg-icon icon-class="step-inactive" class="icon" />
        <div class="step-title">进入开放期,基金可赎回或继续认购</div>
        <div class="step-time">{{next_open_date}}至{{next_end_date}}</div>
      </div>
    </div>
    <div class="buttons">
      <Button class="show">查看详情</Button>
      <Button class="continue" @click="onContinue">继续浏览</Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Success',
  props: ['currency'],
  methods: {
    onContinue() {
      this.$router.push('/product/fund');
    },
  },
  computed: {
    ...mapState({
      fundBuyResult: 'product/fund/fundBuyResult',
    }),
    ...mapGetters({
      next_end_date: 'product/fund/next_end_date',
      confirm_date: 'product/fund/confirm_date',
      submit_date: 'product/fund/submit_date',
      next_open_date: 'product/fund/next_open_date',
      amount: 'product/fund/amount',
    }),
  },
};
</script>

<style lang='scss'>
.success {
  padding-top: 56px;
  .buy-result {
    width: 62px;
    height: 68px;
    margin-bottom: 27px;
  }
  .title {
    font-size: 18px;
    color: #0f3256;
    text-align: center;
    line-height: 26px;
  }
  .info {
    width: 100%;
    height: 26px;
    display: flex;
    box-sizing: border-box;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    font-size: 14px;
    color: #676c8d;
    text-align: center;
    line-height: 26px;
    .icon {
      font-size: 12px;
      color: #9aa2b2;
    }
    .none {
      visibility: hidden;
    }
  }
  .message {
    font-size: 12px;
    color: #9aa2b2;
    margin-bottom: 18px;
  }
  .line {
    width: 335px;
    border-bottom: 1px solid #e5e9f6;
    transform: scaleY(0.5);
  }
  .steps {
    width: 100%;
    padding: 16px 47px 0;
    box-sizing: border-box;
    margin-bottom: 9px;
    .step {
      height: 72px;
      position: relative;
      border-left: 1px solid #e9ecf0;
      font-size: 12px;
      color: #9aa2b2;
      letter-spacing: 0;
      &:nth-child(3) {
        border: 0;
      }
      &:nth-child(1) {
        > div {
          border-left: 1px solid #3c64ee;
        }
      }
      .icon {
        position: absolute;
        top: 0;
        left: -10px;
        width: 20px;
        height: 20px;
      }
      > div {
        box-sizing: border-box;
        padding: 2px 0 0 34px;
        margin-bottom: 4px;
        margin-left: -1px;
        &.step-time {
          padding-bottom: 6px;
        }
      }
    }
  }
  .buttons {
    font-size: 16px;
    display: flex;
    .show {
      width: 120px;
      height: 46px;
      border: 1px solid #e5e9f6;
      background: #ffffff;
      border-radius: 4px;
    }
    .continue {
      background: #3c64ee;
      margin-left: 15px;
      width: 180px;
      height: 46px;
      border-radius: 4px;
      border: 0;
      color: #ffffff;
    }
  }
}
</style>
