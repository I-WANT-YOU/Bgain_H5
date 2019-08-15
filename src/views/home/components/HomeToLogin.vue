<template>
  <div class="homeToLogin">
    <div class="register">
      <router-link to="/register">
        <button>注册</button>
      </router-link>
    </div>
    <div class="login">
    <router-link to="/login">已有账号？登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeToLogin',
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
    width: 100%;
    height: 38px;
    margin-top: 16px;
    > a {
      width: 105px;
      font-size: 15px;
      color: #3C64EE;
      line-height: 37.36px;
      text-decoration-line: none;
    }
  }
}
</style>
