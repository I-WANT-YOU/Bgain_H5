<template>
  <Popup round v-on="$listeners" v-bind="$attrs" :close-on-click-overlay="false">
    <!--<div class="bgain-dialog__container" :style="{height:wrapHeight}">-->
    <div class="bgain-dialog__container">
      <svg-icon v-if="showClose"
                icon-class="close" class="icon-close" @click.native="onCancel"></svg-icon>
      <div class="dialog__title">{{title}}</div>
      <div class="dialog__content">
        <span v-if="content !== ''">{{content}}</span>
        <slot name="content"></slot>
      </div>
      <div class="dialog__buttons">
        <Button
          class="dialog__buttons--cancel"
          v-if="showCancel"
          @click="onCancel">{{cancelText}}</Button>
        <Button
          type="info"
          class="dialog__buttons--submit"
          @click="onSubmit"
          :style="{background: submitColor}"
        >{{submitText}}</Button>
      </div>
    </div>
  </Popup>
</template>

<script>
import {
  Popup, Button,
} from 'vant';

export default {
  name: 'BgainBaseDialog',
  components: {
    Popup,
    Button,
  },
  props: {
    title: {
      type: String,
      default: '提示',
      required: false,
    },
    content: {
      type: String,
      default: '确认提交吗',
      required: false,
    },
    cancelText: {
      type: String,
      default: '取消',
      required: false,
    },
    submitText: {
      type: String,
      default: '确定',
      required: false,
    },
    showClose: {
      type: Boolean,
      default: true,
      required: false,
    },
    showCancel: {
      type: Boolean,
      default: true,
      required: false,
    },
    submitColor: {
      type: String,
      default: '',
      required: false,
    },
    wrapHeight: {
      type: String,
      required: false,
    },
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSubmit() {
      this.$emit('submit');
    },
  },
};
</script>

<style lang="scss" scoped>
.van-popup--round {
  border-radius: 4px;
}

.bgain-dialog__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 305px;
  min-height: 200px;
  padding: 24px 0 20px;
  box-sizing: border-box;
  background: #ffffff;

  .icon-close {
    position: absolute;
    right: 12px;
    top: 12px;
    width: 15px;
    height: 15px;
  }

  .dialog__title {
    font-size: 18px;
    color: #000000;
    line-height: 17px;
  }

  .dialog__content {
    flex: 1;
    padding: 20px 20px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    font-family: PingFang SC;
    font-weight: 400;
    align-items: center;
    letter-spacing: 0.15px;
    line-height: 20px;

    span {
      font-family: PingFang SC;
      font-size: 16px;
      line-height: 20px;
      color: #666666;
    }
  }

  .dialog__buttons {
    .van-button {
      line-height: 44px;
      text-align: center;
    }

    .dialog__buttons--cancel {
      width: 114px;
      height: 44px;
      font-size: 16px;
      border-radius: 4px;
      color: #888888;
      margin-right: 11px;
    }

    .dialog__buttons--submit {
      width: 140px;
      height: 44px;
      border-radius: 4px;
      font-size: 16px;
      border: 0;
    }
  }
}
</style>
