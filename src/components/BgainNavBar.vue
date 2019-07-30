<template>
  <nav-bar v-bind="$attrs" :border="false">
    <template v-slot:left>
      <svg-icon icon-class="go-back" class="icon-go-back"></svg-icon>
    </template>
  </nav-bar>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'BgainNavBar',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
  .van-nav-bar__title {
    font-size: 17px;
    color: #0F3256;
  }
  .icon-go-back {
    width: 10px;
    height: 18px;
  }
</style>
