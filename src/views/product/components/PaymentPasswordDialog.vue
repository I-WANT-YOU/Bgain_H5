<template>
  <Popup
    round
    v-on="$listeners"
    v-bind="$attrs"
    :close-on-click-overlay="false"
  >
    <div class="payment-pwd__container">
      <svg-icon icon-class="close" class="icon-close" @click.native="onClose"></svg-icon>
      <div class="payment-pwd__title">输入交易密码</div>
      <Field
        type="password"
        v-model="password"
        @input="onInput"
        placeholder="请输6位数字"
        :border="false"
      >
      </Field>
      <divider></divider>
      <div class="forgot-pwd" @click="onForgotClick">忘记密码</div>
      <div class="payment-pwd__button" @click="onSubmit">确认</div>
    </div>
  </Popup>
</template>

<script>
import {
  Popup, Field, Divider, Toast,
} from 'vant';

export default {
  name: 'PaymentPasswordDialog',
  components: {
    Popup,
    Field,
    Divider,
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    onClose() {
      this.password = '';
      this.$emit('close');
    },
    onForgotClick() {
      this.$router.push({
        path: '/passwordconfig/reset/tradepassword',
      });
    },
    onSubmit() {
      if (this.validValue()) {
        this.$emit('submit', this.password);
      }
    },
    onInput(value) {
      const re = /^\d+$/;
      if (!re.test(value)) {
        this.password = value.slice(0, value.length - 1);
      }
      if (value.length > 6) {
        this.password = value.slice(0, 6);
      }
    },
    validValue() {
      if (this.password === '') {
        Toast('请输入交易密码');
        return false;
      }
      if (this.password.length < 6) {
        Toast('请输入6位数字交易密码');
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .van-popup--round {
    border-radius: 4px;
  }

  .payment-pwd__container {
    position: relative;
    width: 305px;
    height: 220px;
    padding: 20px 26px;
    box-sizing: border-box;
    background: #ffffff;

    .payment-pwd__title {
      margin-bottom: 25.5px;
      font-size: 15px;
      color: #6A707D;
      line-height: 21px;
      text-align: center;
    }

    .icon-close {
      position: absolute;
      right: 12px;
      top: 12px;
      width: 15px;
      height: 15px;
    }

    .van-cell {
      padding: 7.5px 0;
      font-size: 14px;
      line-height: 20px;

      .van-field__control {
        color: #A8AEB9;
      }
    }

    .van-divider {
      margin: 0;
    }

    .forgot-pwd {
      width: max-content;
      margin-top: 8.5px;
      font-size: 13px;
      color: #0F3256;
      line-height: 18px;
    }

    .payment-pwd__button {
      margin: 31px auto 0;
      width: 140px;
      padding: 10px 0;
      border-radius: 4px;
      color: #ffffff;
      font-size: 15px;
      line-height: 21px;
      text-align: center;
      background: #3C64EE;
    }
  }
</style>
