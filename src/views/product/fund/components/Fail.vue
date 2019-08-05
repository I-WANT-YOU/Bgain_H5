<template>
  <div class="fail">
    <svg-icon icon-class="buy-result" class="buy-result" />
    <div class="title">提交失败</div>
    <div class="info">失败原因:开放交易日已截止</div>
    <Button class="button" @click="onContinue">继续浏览</Button>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'Success',
  components: {
    Button,
  },
  methods: {
    onContinue() {
      this.$router.push('/product/fund');
    },
  },
};
</script>

<style lang='scss' scoped>
.fail {
  padding-top: 88px;
  .buy-result {
    width: 62px;
    height: 68px;
    margin-bottom: 34px;
  }
  .title {
    margin-bottom: 9px;
    font-size: 20px;
    color: #0f3256;
    line-height: 28px;
  }
  .info {
    margin-bottom: 70px;
    font-size: 14px;
    color: #9aa2b2;
    line-height: 28px;
  }
  .button {
    width: 331px;
    height: 46px;
    font-size: 16px;
    color: #ffffff;
    background: #3c64ee;
    border-radius: 4px;
  }
}
</style>
