<template>
    <div class="countDown">
      <span v-show="!isTimeOut">{{'已发送'+countDownTime+'S'}}</span>
      <span
        v-show="isTimeOut"
        @click="sendCode"
        class="repeat"
      >重新发送</span>
    </div>
</template>

<script>
export default {
  name: 'CountDown',
  data() {
    return {
      countDownTime: 60,
      isTimeOut: false,
    };
  },
  methods: {
    sendCode() {
      this.$emit('sendCodeAgain', true);
      this.countDownTime = 60;
      this.isTimeOut = false;
      this.countDown();
    },
    countDown() {
      this.timer = setInterval(() => {
        console.log(this.countDownTime);
        if (this.countDownTime >= 1) {
          this.countDownTime -= 1;
        } else {
          this.isTimeOut = true;
          window.clearInterval(this.timer);
        }
      }, 1000);
    },
  },
  mounted() {
    this.countDown();
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
  .countDown{
    display: block;
    >span{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size:15px;
      font-family:PingFang SC sans-serif;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
    .repeat{
      color:#01A3FC;
    }
  }
</style>
