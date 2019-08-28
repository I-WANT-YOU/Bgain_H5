<template>
  <div class="register-two">
    <Header></Header>
    <div class="verification-code">
      <div class="code">
        <Field
          type="number"
          maxlength="6"
          v-model="verificationCode" placeholder="请输入验证码" />
      </div>
      <div v-if="isShowTime" class="time">
        <span> {{preTime+countDown+nextTime}}</span>
      </div>
      <div v-else class="send" @click="getVerificationCode()">
        <span>发送验证码</span>
      </div>
    </div>
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
      tokenData: '',
      preTime: '已发送（',
      nextTime: '）',
      isShowTime: true,
    };
  },
  mounted() {
    // 倒计时
    this.setTime();
    if (this.$route.params.registerData) {
      // 获取验证码参数
      this.tokenData = {
        username: this.$route.params.registerData.username,
        geetestOptions: this.$route.params.registerData.geetestOptions,
      };
      if (!this.$route.params.registerData.countryCode) {
        this.registerData = {
          invitationCode: this.$route.params.registerData.invitationCode,
          password: this.$route.params.registerData.password,
          username: this.$route.params.registerData.username,
        };
      } else {
        this.registerData = {
          countryCode: this.$route.params.registerData.countryCode,
          invitationCode: this.$route.params.registerData.invitationCode,
          password: this.$route.params.registerData.password,
          username: this.$route.params.registerData.username,
        };
      }
    }
  },
  methods: {
    // 触发action的方法
    ...mapActions('auth', [
      'register',
      'getToken',
    ]),
    // 设置倒计时
    setTime() {
      this.myTime = setInterval(
        () => { this.countDown = this.countDown - 1; }, 1000,
      );
    },
    // 获取验证码
    getVerificationCode() {
      const tokenData = {
        ...this.tokenData,
      };
      this.getToken(tokenData).then(
        (res) => { console.log(res); },
        (err) => {
          console.log(err);
          this.$toast(errorMessage[err.status]);
        },
      );
    },
    // 点击确定
    confirm() {
      const regPhone = /^[0-9]{1,15}$/;
      if (!regPhone.test(this.verificationCode)) {
        this.$toast('验证码格式不正确');
        return false;
      }
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
      .send{
        display: flex;
        justify-content: flex-end;
        >span{
          color: #3C64EE;
          text-align: right;
        }
      }


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
