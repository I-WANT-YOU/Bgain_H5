<template>
  <div class="forget-set-password">
    <Header title="找回登录密码" :backPath="'/forgetPassword'" />
    <div class="form">
      <div class="info">验证码已发送到{{address}}</div>
      <div class="input">
        <Field v-model="formData.code" placeholder="请输入验证码">
          <sendCode @onsend="onSend" ref="sendCode" slot="button" />
        </Field>
      </div>
      <div class="input">
        <Field
          :type="passwordType ? 'password' : ''"
          v-model="formData.password"
          placeholder="请设置8-20位字母及数字组成的密码"
        />
        <span
          :class="['password-is-show',passwordType ? '' : 'show']"
          @click="showPwd('passwordType')"
        ></span>
      </div>
      <div class="input">
        <Field
          :type="confirmPasswordType ? 'password' : ''"
          v-model="formData.confirmPassword"
          placeholder="请再次输入登录密码"
        />
        <span
          :class="['password-is-show',confirmPasswordType ? '' : 'show']"
          @click="showPwd('confirmPasswordType')"
        ></span>
      </div>
      <div class="button">
        <Button tag="div" class="submit-btn" type="info" @click="submit">确定</Button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import sendCode from '@component/SendCode.vue';
import { mapActions } from 'vuex';
import { Field, Button, Toast } from 'vant';

export default {
  name: 'ForgetPasswordSet',
  components: {
    Header,
    Footer,
    sendCode,
    Field,
    Button,
  },
  mounted() {
    if (this.$route.params.type === 'mobile') {
      this.address = `${this.$route.params.countryCode} ${this.$route.params.username}`;
    } else if (this.$route.params.type === 'email') {
      this.address = this.$route.params.username;
    } else {
      console.log('参数不完整');
      // this.$router.push('/login');
    }
    this.$refs.sendCode.onClick();
  },
  data() {
    return {
      address: '+86 12345678',
      formData: {
        code: '',
        password: '',
        confirmPassword: '',
      },
      passwordType: true,
      confirmPasswordType: true,
      options: null,
    };
  },
  methods: {
    ...mapActions({
      getToken: 'auth/getToken',
      resetPassword: 'auth/resetPassword',
    }),
    showPwd(text) {
      const oldValue = this[text];
      this[text] = !oldValue;
    },
    submit() {
      const reg = /^[0-9A-Za-z]{8,20}$/;
      if (this.formData.code.length === 6) {
        if (reg.test(this.formData.password)) {
          if (this.formData.password === this.formData.confirmPassword) {
            this.resetPassword({ username: this.$route.params.username, password: this.formData.password, token: 'sfdfdg' });
          } else {
            Toast('两次输入的密码不一致');
          }
        } else {
          Toast('密码格式不正确');
        }
      } else {
        Toast('请输入验证码');
      }
    },
    onSend() {
      // 发送验证码
      const { params } = this.$route;
      delete params.type;
      this.getToken(params);
    },
  },
};
</script>

<style lang="scss">
.forget-set-password {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .form {
    flex: 1;
    .info {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      margin: 29px 0 11px 30px;
    }
    .input {
      margin: 0 22px;
      height: 58px;
      box-sizing: border-box;
      padding-left: 8px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      letter-spacing: 0;
      ::placeholder {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #cccccc;
      }
      .van-cell {
        box-sizing: border-box;
        padding: 16px 0;
      }
      .code {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #2a55e7;
        letter-spacing: 0;
      }
      .password-is-show {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 18px;
        height: 9px;
        background: url("../../assets/images/none.svg");
        background-size: 100% 100%;
      }
      .show {
        background: url("../../assets/images/display.svg") no-repeat;
        background-size: 100% 100%;
      }
    }
    .button {
      width: 331px;
      height: 46px;
      border-radius: 4px;
      overflow: hidden;
      margin: 78px 0 0 22px;
      .submit-btn {
        width: 100%;
        height: 100%;
        border: 0;
        font-size: 16px;
        color: #fbfcfb;
        letter-spacing: 0;
        text-align: center;
        line-height: 46px;
        background: #3c64ee;
      }
    }
  }
}
</style>
