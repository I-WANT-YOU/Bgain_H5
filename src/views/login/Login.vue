<template>
  <div class="login">
    <Header />
    <div class="con">
      <h3>欢迎来到Bgain</h3>
      <form>
        <div class="input">
          <Field v-model.trim="username" placeholder="请输入登录账号" />
        </div>
        <div class="input">
          <Field
            v-model.trim="password"
            :type="isShowPwd ? '' : 'password'"
            placeholder="请输入登录密码"
            @click-right-icon="showPwd"
          />
          <span :class="['password-is-show',isShowPwd ? 'show':'']" @click="showPwd"></span>
        </div>
        <div class="forget-password">
          <span @click="forgetPwd">忘记密码？</span>
        </div>
        <div class="button">
          <Button
            tag="div"
            :class="['login-btn', disabled ? 'button-disabled':'']"
            :disabled="disabled"
            type="info"
            @click="submit"
          >登录</Button>
        </div>
      </form>
      <p class="to-register">
        <span>没有账号，</span>
        <router-link class="to-register-btn" to="/register">立即注册</router-link>
        <i></i>
      </p>
    </div>
    <Footer />
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" />
  </div>
</template>

<script>
import { Field, Button, Toast } from 'vant';
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import Geetest from '@component/Geetest.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    Header,
    Field,
    Button,
    Footer,
    Geetest,
  },
  data() {
    return {
      username: '',
      password: '',
      isShowPwd: false,
      disabled: true,
      options: null,
      geetest: null,
      once: true,
    };
  },
  watch: {
    username(Value) {
      if (Value !== '' && this.password !== '') {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    password(Value) {
      if (Value !== '' && this.username !== '') {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    showPwd() {
      this.isShowPwd = !this.isShowPwd;
    },
    submit() {
      let flag;
      const { username, password } = this;
      const reg = /^[0-9]{1,}$/;
      const mobile = /^[0-9]{1,15}$/;
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;// eslint-disable-line no-useless-escape
      if (reg.test(username)) {
        if (mobile.test(username)) {
          flag = true;
        } else {
          flag = false;
          Toast('手机格式有误，请重新输入');
        }
      } else {
        flag = false;
        if (re.test(username)) {
          flag = true;
        } else {
          flag = false;
          Toast('邮箱格式有误，请重新输入');
        }
      }
      if (flag) {
        if (this.once) {
          this.login({
            username,
            password,
          }).then(() => {
            this.once = false;
          }).catch(() => {
            this.once = false;
          });
        } else {
          // 滑块验证
          this.geetest.verify();
        }
      }
    },
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      const { username, password } = this;
      this.options = options;
      try {
        this.login({
          username,
          password,
          geetestOptions: options,
        });
      } catch (error) {
        throw error;
      }
    },
    onError() {

    },
    forgetPwd() { // 修改密码
      this.$router.history.push('/forgetPassword');
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    height: 44px;
  }
  .con {
    width: 100%;
    padding: 0 22px;
    flex: 1;
    box-sizing: border-box;
    h3 {
      font-size: 22px;
      padding-left: 8px;
      color: #222222;
      letter-spacing: 0;
      font-weight: 400;
    }
    form {
      .input {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 1px solid #eeeeee;
        position: relative;
        .van-cell:not(:last-child)::after {
          border: 0;
        }
        .van-field__control::placeholder {
          color: #ccc;
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
      .forget-password {
        margin: 11px 0 36px;
        padding-left: 12px;
        font-size: 14px;
        color: #888888;
      }
      .button {
        width: 100%;
        height: 46px;
        border-radius: 4px;
        overflow: hidden;
        .login-btn {
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
        .button-disabled {
          background: #d2d8eb;
        }
      }
    }
    .to-register {
      display: flex;
      margin: 131px 0 0;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .to-register-btn {
        color: #3c64ee;
      }
      i {
        display: inline-block;
        margin-left: 8px;
        width: 9px;
        height: 11px;
        background: url("../../assets/images/next.svg");
      }
    }
  }
}
</style>
