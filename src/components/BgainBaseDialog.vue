<template>
  <Popup
    round
    v-on="$listeners"
    v-bind="$attrs"
    :close-on-click-overlay="false"
  >
    <div class="bgain-dialog__container">
      <svg-icon icon-class="close" class="icon-close" @click.native="onCancel"></svg-icon>
      <div class="dialog__title">{{title}}</div>
      <div class="dialog__content">
        <span>{{content}}</span>
      </div>
      <div class="dialog__buttons">
        <Button class="dialog__buttons--cancel" @click="onCancel">{{cancelText}}</Button>
        <Button
          type="info"
          class="dialog__buttons--submit"
          @click="onSubmit">
          {{submitText}}
        </Button>
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
    position: relative;;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 305px;
    height: 220px;
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
      font-size: 15px;
      color: #0F3256;
      line-height: 24px;
    }

    .dialog__content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 16px;
        color: #0F3256;
      }
    }

    .dialog__buttons {

      .van-button {
        line-height: 40px;
      }

      .dialog__buttons--cancel {
        width: 114px;
        height: 40px;
        font-size: 15px;
        border-radius: 4px;
        color: #888888;
        margin-right: 11px;
      }

      .dialog__buttons--submit {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        font-size: 15px;
      }
    }
  }
</style>
