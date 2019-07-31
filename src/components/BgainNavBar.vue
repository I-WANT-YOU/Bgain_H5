<template>
  <sticky>
    <nav-bar v-bind="$attrs" :border="false" @click-left="onClickLeft">
      <template v-slot:left>
        <svg-icon icon-class="go-back" class="icon-go-back"></svg-icon>
      </template>
    </nav-bar>
  </sticky>
</template>

<script>
import { NavBar, Sticky } from 'vant';

export default {
  name: 'BgainNavBar',
  components: {
    NavBar,
    Sticky,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
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
