<template>
  <sticky>
    <nav-bar
      v-bind="$attrs"
      :title="title"
      :border="border"
      v-on="$listeners"
      @click-left="onClickLeft"
    >
      <template v-slot:left v-if="showArrow">
        <svg-icon icon-class="go-back" class="icon-go-back"></svg-icon>
      </template>
      <template v-if="!title" v-slot:title>
        <slot name="title"></slot>
      </template>
      <template v-slot:right>
        <slot name="right"></slot>
      </template>
    </nav-bar>
  </sticky>
</template>

<script>
import { isFunction } from 'lodash';
import { NavBar, Sticky } from 'vant';

export default {
  name: 'BgainNavBar',
  props: {
    showArrow: {
      type: Boolean,
      required: false,
      default: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    border: {
      type: Boolean,
      required: false,
      default: false,
    },
    onArrowClick: {
      type: Function,
      required: false,
    },
  },
  components: {
    NavBar,
    Sticky,
  },
  methods: {
    onClickLeft() {
      if (isFunction(this.onArrowClick)) {
        this.onArrowClick();
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  height: 44px;
  line-height: 44px;
}
.van-nav-bar__left{
  height: 44px;
  display: flex;
  align-items: center;
}

.van-nav-bar__title {
  font-size: 17px;
  font-weight: normal;
  color: #0f3256;
  max-width: 75%;
}

.icon-go-back {
  width: 10px;
  height: 18px;
}
</style>
