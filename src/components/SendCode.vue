<template>
  <span class="send-code" @click="onClick">{{text}}</span>
</template>

<script>
export default {
  name: 'SendCode',
  props: {
    sendTime: {
      type: Number,
      default: 60,
    }
  },
  data() {
    return {
      text: '发送验证码',
      disabled: false,
      timeText: 60,
      timer: null,
    };
  },
  mounted() {
    this.timeText = this.sendTime;
  },
  methods: {
    onClick() {
      // 触发
      if (!this.disabled) {
        this.disabled = true;
        this.timeOut();
        this.$emit('onsend');
      }
    },
    timeOut() {
      this.timer = setInterval(() => {
        if (this.timeText !== 0) {
          this.text = `${this.timeText}秒后重新发送`;
          this.timeText = this.timeText - 1;
        } else {
          clearInterval(this.timer)
          this.disabled = false;
          this.text = '重新发送';
          this.timeText = this.sendTime;
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    // 销毁组件前确认销毁
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang='scss' scoped>
.send-code {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #2a55e7;
  letter-spacing: 0;
}
</style>
