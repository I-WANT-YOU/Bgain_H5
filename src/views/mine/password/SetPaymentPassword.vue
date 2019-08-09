<template>
  <div class="trade">
    <BgainNavBar title="设置交易密码" />
    <div class="trade-password">
      <div class="input">
        <Field
          v-model="password"
          :type="passwordShow ?'':'password'"
          class="field"
          placeholder="请设置由6位数字组成的交易密码"
        />
        <span @click="onChange('passwordShow')">
          <svg-icon v-show="!passwordShow" icon-class="show" class="icon" />
          <svg-icon v-show="passwordShow" icon-class="hidden" class="icon" />
        </span>
      </div>
      <div class="input">
        <Field
          v-model="passwords"
          :type="passwordsShow ?'':'password'"
          class="field"
          placeholder="请确认交易密码"
        />
        <span @click="onChange('passwordsShow')">
          <svg-icon v-show="!passwordsShow" icon-class="show" class="icon" />
          <svg-icon v-show="passwordsShow" icon-class="hidden" class="icon" />
        </span>
      </div>
      <Button class="button" @click="onClick">确定</Button>
    </div>
    <Footer />
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import Footer from '@component/Footer.vue';
import { Field, Button, Toast } from 'vant';

export default {
  name: 'SetPaymentPassword',
  components: {
    BgainNavBar,
    Footer,
    Field,
    Button,
  },
  data() {
    return {
      password: '',
      passwords: '',
      passwordShow: false,
      passwordsShow: false,
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
  },
  methods: {
    onChange(text) {
      this[text] = !this[text];
    },
    onClick() {
      if (this.password !== this.passwords) {
        Toast('两次密码不一致，请重新输入');
      } else {
        // 设置交易密码
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.trade {
  height: 100%;
  display: flex;
  flex-direction: column;
  .trade-password {
    flex: 1;
    box-sizing: border-box;
    padding: 34px 22px 0;
    .input {
      height: 58px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .field {
        padding: 20px 8px;
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
    }
    .button {
      width: 331px;
      height: 46px;
      margin-top: 70px;
      background: #3c64ee;
      border-radius: 4px;
      color: #ffffff;
    }
  }
}
</style>
