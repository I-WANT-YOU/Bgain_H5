<template>
  <div class="forget-set-password">
    <Header title="找回登录密码" :backPath="'/forgetPassword'" />
    <div class="form">
      <div class="info">验证码已发送至 {{address}}</div>
      <div class="input">
        <Field
          v-model="formData.code"
          @input="changeCode"
          placeholder="请输入验证码"
          autocomplete="new-password"
        >
          <sendCode @onsend="onSend" ref="sendCode" slot="button" />
        </Field>
      </div>
      <div class="input">
        <Field
          :type="passwordType ? 'password' : ''"
          v-model="formData.password"
          placeholder="请设置8-20位字母及数字组成的密码"
          autocomplete="new-password"
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
import { mapActions } from 'vuex';
import { Field, Button, Toast } from 'vant';
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import sendCode from '@component/SendCode.vue';
import { getDesensitizedUsername } from '@utils/tools';
import responseStatus from '@/constants/responseStatus';

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
    if (this.$route.query.type === 'mobile') {
      this.address = `${this.$route.query.countryCode} ${getDesensitizedUsername(this.$route.query.username)}`;
    } else if (this.$route.query.type === 'email') {
      this.address = getDesensitizedUsername(this.$route.query.username);
    } else {
      console.log('参数不完整');
    }
    this.$refs.sendCode.onClick();
    this.formData.code = '';
    this.formData.password = '';
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
    changeCode(value) {
      if (value.length > 6) {
        this.formData.code = value.slice(0, 6);
      }
    },
    showPwd(text) {
      const oldValue = this[text];
      this[text] = !oldValue;
    },
    submit() {
      const reg = /^[0-9A-Za-z]{8,20}$/;
      if (this.formData.code.length === 6) {
        if (reg.test(this.formData.password)) {
          if (this.formData.password === this.formData.confirmPassword) {
            try {
              this.resetPassword({
                username: this.$route.query.username,
                password: this.formData.password,
                token: this.formData.code,
              }).then(() => {
                this.$router.push('/login');
              }).catch((error) => {
                Toast(responseStatus[error.status]);
              });
            } catch (error) {
              Toast(responseStatus[error.status]);
            }
          } else {
            Toast('两次输入的密码不一致');
          }
        } else {
          Toast('密码格式不正确');
        }
      } else {
        Toast('请输入正确的验证码');
      }
    },
    onSend() {
      // 发送验证码
      const querys = this.$route.query;
      delete querys.type;
      this.getToken({
        username: querys.username,
        countryCode: querys.countryCode,
        geetestOptions: {
          geetest_challenge: querys.geetest_challenge,
          geetest_seccode: querys.geetest_seccode,
          geetest_validate: querys.geetest_validate,
        },
      });
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
  font-family: PingFangSC-Regular;
  .form {
    flex: 1;
    .info {
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
      // border-bottom: 1px solid #eeeeee;
      position: relative;
      font-size: 15px;
      letter-spacing: 0;
      ::placeholder {
        font-size: 15px;
        color: #cccccc;
      }
      .van-cell {
        box-sizing: border-box;
        padding: 16px 0;
        &:not(:last-child)::after {
          border: 0;
        }
      }
      .code {
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
      &:not(:last-child)::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0;
        border-bottom: 0.02667rem solid #e5e9f6;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
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
