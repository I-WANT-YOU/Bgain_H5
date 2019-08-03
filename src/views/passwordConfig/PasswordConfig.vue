<template>
  <div class="config">
    <BgainNavBar title="密码设置" />
    <div class="password-config">
      <div @click="$router.push('/passwordConfig/ResetLoginPassword')">
        <span>修改登录密码</span>
        <svg-icon icon-class="next" class="next" />
      </div>
      <div class="line"></div>
      <div @click="$router.push('/passwordConfig/ResetTradePassword')">
        <span>重置交易密码</span>
        <svg-icon icon-class="next" class="next" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import Footer from '@component/Footer.vue';

export default {
  name: 'PasswordConfig',
  components: {
    BgainNavBar,
    Footer,
  },
};
</script>

<style lang='scss' scoped>
.config {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  .password-config {
    flex: 1;
    margin-top: 11px;
    > div {
      background: #ffffff;
      height: 59px;
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      box-sizing: border-box;
      padding: 0 23px 0 30px;
      justify-content: space-between;
      &.line {
        height: 0;
        border-bottom: 1px solid #eeeeee;
        transform: scaleY(0.5);
      }
      .next {
        width: 7px;
        height: 11px;
      }
    }
  }
}
</style>
