<template>
  <div class="forget-set-password">
    <Header title="找回登录密码" :backPath="'/forgetPassword'" />
    <div class="info">验证码已发送到{{address}}</div>
    <div class="input">
      <!-- <input type="text" placeholder="请输入验证码" /> -->
      <Field v-model="text" placeholder="请输入验证码" />
    </div>
    <div class="input">
      <input type="text" placeholder="请设置8-20位字母及数字组成的密码" />
    </div>
    <div class="input">
      <input type="text" placeholder="请再次输入登录密码" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import { Field } from 'vant';

export default {
  name: 'ForgetPasswordSet',
  components: {
    Header,
    Footer,
    Field,
  },
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.mobile) {
      console.log('mobile');
      this.address = this.$route.params.mobile;
      // 接口
    } else if (this.$route.params.email) {
      console.log('email');
      this.address = this.$route.params.email;
      // 接口
    } else {
      console.log('参数不完整');
      // this.$router.push('/login');
    }
  },
  data() {
    return {
      address: '',
      text: '',
    };
  },
};
</script>

<style lang="scss" scoped>
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
    input {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      border: 0;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #cccccc;
      letter-spacing: 0;
    }
  }
}
</style>
