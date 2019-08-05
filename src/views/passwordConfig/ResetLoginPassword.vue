<template>
  <div class="reset-password">
    <BgainNavBar title="修改登录密码" />
    <div class="reset-password-con">
      <div class="input">
        <Field
          v-model="oldPassword"
          @paste.native.capture.prevent
          type="password"
          class="field"
          placeholder="请输入原始登录密码"
        />
      </div>
      <div class="input">
        <Field
          v-model="password"
          type="password"
          class="field"
          placeholder="请设置由8-20位数字及字母组成的新登录密码"
        />
      </div>
      <div class="input">
        <Field
          v-model="passwords"
          @paste.native.capture.prevent
          type="password"
          class="field"
          placeholder="请确认新登录密码"
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
import { mapActions } from 'vuex';


export default {
  name: 'SetTradePassword',
  components: {
    BgainNavBar,
    SendCode,
    Field,
    Button,
    Footer,
  },
  data() {
    return {
      oldPassword: '',
      password: '',
      passwords: '',
      info: '',
      countryCode: '',
      address: done('12345678901'),
      sendCode: '',
      showInfo: false,
    };
  },
  watch: {
    sendCode(value) {
      if (value.length > 6) {
        this.sendCode = value.substring(0, 6);
      }
    },
    address(value) {
      this.address = done(value);
    },
  },
  mounted() {
    const countryCode = '+86';
    this.countryCode = countryCode ? countryCode : '';
  },
  methods: {
    ...mapActions({
      changePassword: 'auth/changePassword',
      getToken: 'auth/getToken',
    }),
    onClick() {
      const reg = /\d/;
      const regs = /[A-Za-z]/;
      if (this.oldPassword === '') {
        Toast('请输原始登录密码');
      } else if (!this.password || this.password.length < 8 || this.password.length > 20 || !reg.test(this.password) || !regs.test(this.password)) {
        Toast('请输入8-20位字母及数字组成的密码');
      } else if (this.password !== this.passwords) {
        Toast('两次密码不一致，请重新输入');
      } else if (this.sendCode === '' || this.sendCode.length !== 6) {
        Toast('请输入验证码');
      } else {
        // 改变密码
        this.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.password,
        });
      }
    },
    onSend() {
      this.showInfo = true;
      this.getToken({
        countryCode: this.countryCode,
        username: "",
      })
    },
  },
};
</script>

<style lang='scss' scoped>
.reset-password {
  height: 100%;
  display: flex;
  flex-direction: column;
  .reset-password-con {
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
