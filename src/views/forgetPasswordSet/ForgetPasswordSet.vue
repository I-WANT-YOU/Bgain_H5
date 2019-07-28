<template>
  <div class="forget-set-password">
    <Header title="找回登录密码" :backPath="'/forgetPassword'" />
    <div class="info">验证码已发送到{{address}}</div>
    <div class="input">
      <Field v-model="formData.code" placeholder="请输入验证码">
        <sendCode @onsend="onSend" slot="button" />
      </Field>
    </div>
    <div class="input">
      <Field v-model="formData.password" placeholder="请设置8-20位字母及数字组成的密码" />
    </div>
    <div class="input">
      <Field v-model="formData.confirmPassword" placeholder="请再次输入登录密码" />
    </div>
    <div class="button">
      <Button tag="div" class="submit-btn" type="info" @click="submit">确定</Button>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import sendCode from '@component/SendCode.vue';
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
    if (this.$route.params.mobile) {
      this.address = `${this.$route.params.value} ${this.$route.params.mobile}`;
    } else if (this.$route.params.email) {
      this.address = this.$route.params.email;
    } else {
      console.log('参数不完整');
      // this.$router.push('/login');
    }
  },
  data() {
    return {
      address: '+86 12345678',
      formData: {
        code: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    submit() {
      console.log(this.formData);
      const reg = /^[0-9A-Za-z]{8,20}$/;
      // if (this.formData.code.length === 6) {
      // if (reg.test(this.formData.password)) {
      //   if (this.formData.password === this.formData.confirmPassword) {
      //     Toast('')
      //   } else {
      //     Toast('两次输入的密码不一致');
      //   }
      // } else {
      //   Toast('密码格式不正确');
      // }
      // } else {
      //   Toast('请输入验证码');
      // }
    },
    onSend() {
      // 发送验证码
    },
  },
};
</script>

<style lang="scss">
.forget-set-password {
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
</style>
