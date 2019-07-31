<template>
  <div class="initial" @click="skip">
    <svg-icon icon-class="initial" class="icon-initial" />
    <div class="initial-top"></div>
    <h4 class="title">{{options.fund_name}}</h4>
    <div class="time">
      <span>{{options.period}}</span>
      <span class="day">天</span>
    </div>
    <div class="lock">
      <span>锁定期</span>
    </div>
    <div class="labels">
      <span>{{options.currency_type}}</span>
      <span>{{options.fund_product_type}}</span>
      <span>{{options.risk_level_type}}</span>
    </div>
    <div class="buttons">
      <Button @click="submit" type="info" class="button">
        <span>{{options.min_invest_amt}}</span>
        <span>{{options.currency_type}}</span>
        <span>起投</span>
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Initial',
  props: {
    options: {
      type: Object,
    },
  },
  methods: {
    submit() {
      console.log('2');
    },
    skip() {
      this.$router.push(`/product/fund/initial/${this.options.id}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.initial {
  position: relative;
  box-sizing: border-box;
  background: #ffffff;
  .initial-top {
    height: 15px;
  }
  .icon-initial {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 22px;
  }
  .title {
    margin: 0;
    padding-top: 16px;
    font-size: 15px;
    color: #0f3256;
    letter-spacing: 0;
    text-align: center;
  }
  .time {
    height: 50px;
    margin-top: 10px;
    font-size: 36px;
    color: #ff5c5c;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
    .day {
      font-size: 24px;
      line-height: 33px;
    }
  }
  .lock {
    font-size: 14px;
    color: #a8aeb9;
    letter-spacing: 0;
    text-align: center;
  }
  .labels {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    span {
      display: inline-block;
      box-sizing: border-box;
      width: 40px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #ff5c5c;
      border-radius: 2px;
      font-size: 11px;
      color: #ff5c5c;
      letter-spacing: 0;
      text-align: center;
      margin: 0 6px;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    .button {
      width: 259px;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      color: #ffffff;
      letter-spacing: 0;
      background: #3c64ee;
      border-radius: 4px;
      border: 0;
      text-align: center;
      font-weight: 100;
    }
  }
}
</style>
