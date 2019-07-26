<template>
  <div class="forget-set-password">
    <Header title="找回登录密码" :backPath="'/forgetPassword'" />
    <div class="info">验证码已发送到{{address}}</div>
    <Footer />
  </div>
</template>

<script>
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';

export default {
  name: 'ForgetPasswordSet',
  components: {
    Header,
    Footer,
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
      this.$router.push('/login');
    }
  },
  data() {
    return {
      address: '',
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
  }
}
</style>
