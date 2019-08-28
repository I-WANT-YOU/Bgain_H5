<template>
  <div class="winning">
    <div class="registerOne-container">
      <div class="registerOne">
        <!--输入验证码-->
        <div class="commonInput">
          <IdentifyingCodeInput
            v-model="codeInputValue"
            placeHolderValue="请输入验证码"
            maxlength="6"
            v-on:sendCodeAgain ="sendCode"
          />
        </div>
        <div class="commonInput" >
          <BaseImgInput v-model="passwordInputValue"
                     placeHolderValue="8-20位字母及数字组成的密码"
                     typeValue="password"
                     maxlength="20"
          />
        </div>
        <div class="commonInput">
          <BaseImgInput v-model="repeatPasswordInputValue"
                     placeHolderValue="请再次确认登录密码"
                     typeValue="password"
                     maxlength="20"
          />
        </div>
        <div class="buttons" >
          <button @click="nextStep">下一步</button>
        </div>
      </div>
    </div>
    <div class="footerContainer"> <Footer/></div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions } from 'vuex';
import Footer from './components/Footer.vue';
import BaseImgInput from './components/BaseImgInput.vue';
import IdentifyingCodeInput from './components/IdentifyingCodeInput.vue';
import showPassword from '../../assets/images/guaGuaLe/eye_open.svg';
import hidePassword from '../../assets/images/guaGuaLe/eye_close.svg';
import errorMessage from '../../constants/responseStatus';

export default {
  name: 'ActiveForgetPasswordTwo',
  data() {
    return {
      state: 'registerOne',
      codeInputValue: '', // 验证码
      passwordInputValue: '', // 密码
      repeatPasswordInputValue: '', // 二次密码
      showPassword,
      hidePassword,
    };
  },
  components: {
    Footer,
    BaseImgInput,
    IdentifyingCodeInput,
  },
  watch: {
    /* 舰艇验证码长度 */
    codeInputValue() {
      if (this.codeInputValue && this.codeInputValue.length > 6) {
        this.codeInputValue = this.codeInputValue.substring(0, this.codeInputValue.length - 1);
      }
    },
  },
  methods: {
    ...mapActions({
      getToken: 'auth/getToken',
      resetPassword: 'auth/resetPassword',
    }),
    ...mapActions('user', [
      'getActiveVerificationCode',
    ]),
    /* 调用发送验证码的接口 */
    sendCode() {
      // 发送验证码
      const requestParams = {
        target: this.userName,
        country_calling_code: '+86',
      };
      this.getActiveVerificationCode(requestParams).then(
        () => {
          // 跳转到下一个页面
          this.$router.push({
            name: 'ActiveForgetPasswordTwo',
            query: {
              accountNum: this.accountInputValue,
            },
          });
        },
        (err) => {
          if (err) {
            Toast(err);
          } else {
            Toast('网络错误');
          }
        },
      );
    },
    /* 调用重置密码接口 */
    resetOldPassword(params) {
      return this.resetPassword(params);
    },
    /* 校验验证码的格式 */
    checkCode(code) {
      if (code.length === 0) {
        Toast('验证码不能为空');
        return false;
      }
      if (code.length < 6) {
        Toast('验证码错误');
        return false;
      }
      return true;
    },
    /* 校验密码 */
    checkPassword(password) {
      // 密码校验
      if (password.length === 0) {
        Toast('密码不能为空');
        return false;
      }
      if (password.length < 8 || password.length > 20) {
        Toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      if (!regPassword.test(password)) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      return true;
    },
    /* 校验二次密码是否一致 */
    checkRepeatPassword(repeatPassword, password) {
      if (repeatPassword.length === 0) {
        Toast('确认密码不能为空');
        return false;
      }
      if (repeatPassword !== password) {
        Toast('两次密码输入不一致');
        return false;
      }
      return true;
    },
    /* 点击下一步 */
    nextStep() {
      // 1 调用后台你接口判断是否成功 成功 进入登录页面 失败进行提示
      // 校验输入格式
      if (this.checkCode(this.codeInputValue)
        && this.checkPassword(this.passwordInputValue)
        && this.checkRepeatPassword(this.repeatPasswordInputValue, this.passwordInputValue)) {
        // 调用接口 重置密码
        const resetPasswordParams = {
          username: this.userName,
          password: this.passwordInputValue,
          token: this.codeInputValue,
        };
        this.resetOldPassword(resetPasswordParams).then(
          () => {
            // 校验通过 调用接口
            this.$router.push({
              name: 'ActiveLoginOne',
            });
          },
          (err) => {
            if (err.status) {
              Toast(errorMessage[err.status]);
            } else {
              Toast('网络错误');
            }
          },
        );
      }
      return false;
    },
  },
  mounted() {
    if (this.$route.query) {
      this.userName = this.$route.query.accountNum;
    }
  },
  beforeDestroy() {
  },
};
</script>

<style lang="scss" scoped>
.winning{
  position: relative;
  width: 100vw;
  min-height: 677px;
  overflow-y: scroll;
  background: url("../../assets/images/guaGuaLe/bg_all.jpg") no-repeat;
  background-size: 100% 100%;
  /*注册页面1*/
  .registerOne-container{
    margin-top: 287px;
    .registerOne{
      font-family:PingFang SC sans-serif;
      /*padding-top: 32px;*/
      /*发送验证码*/
      .commonInput{
        margin-bottom: 15px;
      }
      /*button*/
      .buttons{
        margin-top: 25px;
        display: flex;
        justify-content: center;
        >button{
          width: 211px;
          height: 55px;
          background: url("../../assets/images/guaGuaLe/bg-basebutton.png") no-repeat;
          background-size: 211px 55px;
          font-size:15px;
          font-weight:bold;
          color:rgba(254,254,254,1);
          border:none;
        }
      }
    }
  }
  .footerContainer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
