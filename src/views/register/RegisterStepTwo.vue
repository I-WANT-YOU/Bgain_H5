<template>
  <div class="register-two">
    <Header></Header>
    <div class="verification-code">
      <div class="code">
        <Field
          type="number"
          v-if="$route.params.countryCode"
          maxlength="6"
          v-model="verificationCode" placeholder="请输入验证码" />
          <Field
          v-else
          maxlength="6"
          v-model="verificationCode" placeholder="请输入验证码" />
      </div>
      <SendCode @onsend="getVerificationCode" ref="sendCode" />
    </div>
    <div v-show="address" class="text">验证码已发送至 {{address}}</div>
    <div class="button">
      <Button
        :loading="buttonIsLoading"
        :disabled='activeButton'
        @click="confirm()">确定
      </Button >
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  Field, Button, Toast,
} from 'vant';
import { mapActions } from 'vuex';
import SendCode from '@component/SendCode.vue';
import { getDesensitizedUsername } from '@utils/tools';
import errorMessage from '../../constants/responseStatus';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: 'RegisterStepTwo',
  components: {
    Header,
    Footer,
    Field,
    Button,
    SendCode,
    // eslint-disable-next-line vue/no-unused-components
    Toast,
  },
  data() {
    return {
      verificationCode: '',
      activeButton: true,
      registerData: {},
      buttonIsLoading: false, // 按钮是否加载
      countDown: 6,
      myTime: '',
      isShowTime: true,
      address: '',
    };
  },
  mounted() {
    this.address = `${this.$route.params.countryCode
      ? this.$route.params.countryCode : ''} ${getDesensitizedUsername(this.$route.params.username)}`;
    if (this.$route.params) {
      // 获取验证码参数
      this.tokenData = {
        username: this.$route.params.username,
        geetestOptions: this.$route.params.geetestOptions,
      };
      if (!this.$route.params.countryCode) {
        this.registerData = {
          invitationCode: this.$route.params.invitationCode,
          password: this.$route.params.password,
          username: this.$route.params.username,
        };
      } else {
        this.registerData = {
          countryCode: this.$route.params.countryCode,
          invitationCode: this.$route.params.invitationCode,
          password: this.$route.params.password,
          username: this.$route.params.username,
        };
      }
    }
    this.$refs.sendCode.onClick();
  },
  methods: {
    // 触发action的方法
    ...mapActions('auth', [
      'register',
      'getToken',
    ]),
    // 获取验证码
    async getVerificationCode() {
      this.$toast('验证码已发送');
      try {
        await this.getToken({
          username: this.$route.params.username,
          countryCode: this.$route.params.countryCode,
          geetestOptions: {
            geetest_challenge: this.$route.params.geetest_challenge,
            geetest_seccode: this.$route.params.geetest_seccode,
            geetest_validate: this.$route.params.geetest_validate,
          },
        });
      } catch (error) {
        this.$toast(errorMessage[error.status]);
      }
    },
    // 点击确定
    confirm() {
      // const regPhone = /^[0-9]{1,15}$/;
      // if (!regPhone.test(this.verificationCode)) {
      //   this.$toast('验证码格式不正确');
      //   return false;
      // }
      this.buttonIsLoading = true;
      const registerData = {
        ...this.registerData,
        token: this.verificationCode,
      };
      this.register(registerData).then(
        () => {
          this.buttonIsLoading = false;
          this.$router.push('/RegisterSuccess');
        },
        (error) => {
          this.buttonIsLoading = false;
          this.$toast(errorMessage[error.status]);
        },
      );
      return false;
    },
  },
  watch: {
    verificationCode() {
      // this.verificationCode = val;
      if (this.verificationCode.length === 6) {
        this.activeButton = false;
      } else {
        this.activeButton = true;
      }
    },
    countDown() {
      if (this.countDown === 0) {
        clearInterval(this.myTime);
        this.isShowTime = false;
      }
    },
  },
  computed: {
    verificationMessage() {
      return this.$store.state;
    },
  },
};
</script>

<style lang='scss' scoped>
  .register-two{
    .verification-code{
      height: 55px;
      margin:36px 23px 0px 23px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #EEEEEE;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #CCCCCC;
      letter-spacing: 0;
      .code{
        width: 180px;
        margin-left: 8px;
        >div{
          padding: 0;
          input:{
            border: none;
          }
        }
      }
    }
    .text{
      font-size: 15px;
      color: #cccccc;
      margin: 10px 0 0 23px;
    }
    .button{
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 62px;
      >button{
        width: 331px;
        height: 46px;
        border: none;
        background: #3C64EE;
        border-radius: 4px;
        color: #ffffff;
        font-size: 16px;
      }

    }
  }
</style>
