<template>
  <Popup
    round
    v-on="$listeners"
    v-bind="$attrs"
    :close-on-click-overlay="false"
  >
    <div class="balance__container">
      <svg-icon icon-class="prompt" class="icon-prompt"/>
      <div class="balance__title">您当前可用余额不足，请先充币</div>
      <div class="balance__buttons">
        <Button class="balance__buttons--cancel" @click="onCancel">取消</Button>
        <Button type="info"
                class="balance__buttons--recharge"
                @click="onRechargeClick">
          立即充币
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
  name: 'InsufficientBalanceDialog',
  components: {
    Popup,
    Button,
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onRechargeClick() {
      this.$router.push({
        name: 'PurchaseCoinHome',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .van-popup--round {
    border-radius: 4px;
  }

  .balance__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 305px;
    height: 220px;
    padding-top: 20px;
    box-sizing: border-box;
    background: #ffffff;

    .icon-prompt {
      width: 40px;
      height: 52px;
      margin-top: 8px;
    }

    .balance__title {
      font-size: 16px;
      color: #0F3256;
      line-height: 24px;
      margin-top: 20px;
    }

    .balance__buttons {
      margin-top: 34px;

      .van-button {
        line-height: 40px;
      }

      .balance__buttons--cancel {
        width: 114px;
        height: 40px;
        font-size: 15px;
        border-radius: 4px;
        color: #888888;
        margin-right: 11px;
      }

      .balance__buttons--recharge {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        font-size: 15px;
      }
    }
  }
</style>
