<template>
  <div class="trade-password">
    <BgainNavBar title="重置交易密码" />
    <div class="trade-password-con">
      <div class="input">
        <Field
          v-model="password"
          type="password"
          @paste.native.capture.prevent
          class="field"
          placeholder="请设置由6位数字组成的新密码"
        />
      </div>
      <div class="input">
        <Field
          v-model="passwords"
          type="password"
          @paste.native.capture.prevent
          class="field"
          placeholder="请确认新交易密码"
        />
      </div>
      <div class="input sendcode">
        <Field
          v-model="sendCode"
          @paste.native.capture.prevent
          class="field code"
          placeholder="请输入验证码"
        />
        <SendCode @onsend="onSend" />
      </div>
      <div :class="['info', showInfo ? '' : 'none']">验证码已发送至{{countryCode}} {{address}}</div>
      <Button class="button" @click="onClick">确定</Button>
    </div>
    <Footer />
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import Footer from '@component/Footer.vue';
import SendCode from '@component/SendCode.vue';
import { Field, Button, Toast } from 'vant';
import done from './done';

export default {
  name: 'ResetTradePassword',
  components: {
    BgainNavBar,
    Field,
    SendCode,
    Button,
    Footer,
  },
  data() {
    return {
      password: '',
      passwords: '',
      info: '',
      countryCode: '+86',
      address: done('12345678901'),
      sendCode: '',
      showInfo: false,
    };
  },
  watch: {
    password(value, old) {
      const re = /^\d{0,6}$/;
      if (!re.test(value)) {
        this.password = old;
      }
      if (value.length > 6) {
        this.password = value.substring(0, 6);
      }
    },
    passwords(value, old) {
      const re = /^\d{0,6}$/;
      if (!re.test(value)) {
        this.passwords = old;
      }
      if (value.length > 6) {
        this.passwords = value.substring(0, 6);
      }
    },
    sendCode(value) {
      if (value.length > 6) {
        this.sendCode = value.substring(0, 6);
      }
    },
  },
  mounted() {
    const countryCode = '+86';
    this.countryCode = countryCode ? countryCode : '';
  },
  methods: {
    onClick() {
      if (this.password.length !== 6) {
        Toast('请输入6位交易密码');
      } else if (this.password !== this.passwords) {
        Toast('两次密码不一致，请重新输入');
      } else if (this.sendCode.length !== 6) {
        Toast('请输入验证码');
      } else {
        // 重置交易密码
      }
    },
    onSend() {
      this.showInfo = true;
    }
  },
};
</script>

<style lang='scss' scoped>
.trade-password {
  height: 100%;
  display: flex;
  flex-direction: column;
  .trade-password-con {
    flex: 1;
    box-sizing: border-box;
    padding: 31px 22px 0;
    .input {
      height: 58px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .field {
        padding: 20px 8px;
      }
      .code {
        width: 200px;
      }
      > span {
        display: flex;
        .icon {
          width: 18px;
          height: 8.4px;
        }
      }
      ::placeholder {
        font-size: 15px;
        color: #cccccc;
        letter-spacing: 0;
      }
      .van-cell:not(:last-child)::after {
        border: 0;
      }
      &.sendcode {
        justify-content: space-between;
        padding-right: 9px;
      }
    }
    .info {
      box-sizing: border-box;
      padding: 20px 0 0 8px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      visibility: visible;
      &.none {
        visibility: hidden;
      }
    }
    .button {
      width: 331px;
      height: 46px;
      margin-top: 30px;
      background: #3c64ee;
      border-radius: 4px;
      color: #ffffff;
    }
  }
}
</style>
