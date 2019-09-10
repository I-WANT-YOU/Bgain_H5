<template>
  <div class="homeToLogin">
    <div class="register">
        <button @click="goToRegister">注册</button>
    </div>
    <div class="login" @click="goToLogin">
      <span> 已有账号？</span><span class="loginText">登录</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

export default {
  name: 'HomeToLogin',
  methods: {
    goToLogin() {
      window._czc.push(['_trackEvent', 'click', '首页-登录']);
      this.$router.push({ name: 'login' });
    },
    goToRegister() {
      window._czc.push(['_trackEvent', 'click', '首页-注册']);
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style lang="scss" scoped>
.homeToLogin{
  margin-top:26px;
  .register{
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      width: 325px;
      background: #3C64EE;
      border-radius: 4px;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 37.36px;
      border: none;
    }
  }
  .login {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    font-size: 15px;
    color: #3C64EE;
    .loginText{
      font-weight: 600;
    }
  }
}
</style>
