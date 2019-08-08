<template>
  <div class="send-code-wrap">
    <span v-if="!disabled" class="send-code" @click="onClick">{{text}}</span>
    <span v-else class="send-code disabled">{{texts}}</span>
  </div>
</template>

<script>
export default {
  name: 'SendCode',
  props: {
    sendTime: {
      type: Number,
      default: 60,
    },
    autosend: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      text: '发送验证码',
      texts: '已发送()',
      disabled: false,
      timeText: 60,
      timer: null,
    };
  },
  mounted() {
    this.timeText = this.sendTime;
    this.texts = `已发送 (${this.timeText} s)`;
    if (this.autosend) {
      this.onClick();
    }
  },
  methods: {
    onClick() {
      // 触发
      if (!this.disabled) {
        this.timeOut();
        this.disabled = true;
        this.texts = `已发送 (${this.timeText} s)`;
        this.$emit('onsend');
      }
    },
    timeOut() {
      this.timer = setInterval(() => {
        if (this.timeText !== 0) {
          this.texts = `已发送 (${this.timeText} s)`;
          this.timeText = this.timeText - 1;
        } else {
          clearInterval(this.timer);
          this.disabled = false;
          this.timeText = this.sendTime;
          this.text = '重新发送';
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    // 销毁组件前确认销毁
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang='scss' scoped>
.send-code-wrap {
  display: inline-block;
  .send-code {
    font-size: 14px;
    color: #2a55e7;
    letter-spacing: 0;
  }
  .disabled {
    color: #cccccc;
  }
}
</style>
