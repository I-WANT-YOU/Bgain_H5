<template>
  <sticky>
    <nav-bar v-bind="$attrs" :border="false" v-on="$listeners" @click-left="onClickLeft">
      <template v-slot:left v-if="showArrow">
        <svg-icon icon-class="go-back" class="icon-go-back"></svg-icon>
      </template>
      <template v-slot:right>
        <slot name="right"></slot>
      </template>
    </nav-bar>
  </sticky>
</template>

<script>
import { NavBar, Sticky } from 'vant';

export default {
  name: 'BgainNavBar',
  props: {
    showArrow: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
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
  .van-nav-bar {
    height: 44px;
    line-height: 44px;
  }

  .van-nav-bar__title {
    font-size: 17px;
    font-weight: normal;
    color: #0f3256;
  }

  .icon-go-back {
    width: 10px;
    height: 18px;
  }
</style>
